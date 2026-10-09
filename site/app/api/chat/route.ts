import { briefingContext } from "@/lib/briefing";
import knowledge from "@/data/knowledge.json";

type Note = { id: string; title: string; text: string; source: string };

function relevantNotes(question: string) {
  const words = question.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 3);
  const ranked = (knowledge as Note[])
    .map((note) => {
      const haystack = `${note.title} ${note.text}`.toLowerCase();
      const score = words.reduce((sum, word) => sum + (haystack.includes(word) ? 1 : 0), 0);
      return { note, score };
    })
    .sort((a, b) => b.score - a.score);
  const picked = ranked.filter((item) => item.score > 0).slice(0, 4);
  const notes = (picked.length > 0 ? picked : ranked.slice(0, 3)).map((item) => item.note);
  return notes.map((note) => `${note.title}: ${note.text} Source: ${note.source}`).join("\n");
}

const MODEL = process.env.EUDAI_MODEL || "google/gemini-3.5-flash";
const MAX_MESSAGES = 12;
const MAX_CHARS = 2000;

type Incoming = { role?: unknown; content?: unknown };

function cleanMessages(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.slice(-MAX_MESSAGES).flatMap((item) => {
    const message = item as Incoming;
    const role = message.role === "assistant" ? "assistant" : message.role === "user" ? "user" : null;
    const content = typeof message.content === "string" ? message.content.trim().slice(0, MAX_CHARS) : "";
    if (!role || !content) return [];
    return [{ role, content }];
  });
}

export async function POST(request: Request) {
  const apiKey = process.env.EUDAI_OPENROUTER_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "This site has no model key yet. Add a new EUDAI_OPENROUTER_API_KEY on the eudai project, then ask again." },
      { status: 503 },
    );
  }

  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send a JSON body with a messages array." }, { status: 400 });
  }

  const messages = cleanMessages(body.messages);
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "The last message has to be a question." }, { status: 400 });
  }

  const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://eudai-ivory.vercel.app",
      "X-Title": "CCES ANES briefing",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: `You are the briefing assistant for a political science group presentation. Answer only the question that was asked. Leave out related topics, background tours, and extra sections. Simplicity matters more than coverage. Use one or two short paragraphs. Use a third paragraph only when the question is genuinely complex and a shorter answer would be misleading. Never use more than three paragraphs. Answer in ordinary sentences, the way you would say it out loud. Plain text only: no Markdown, no headings, no bold or italics, no bullets, no numbered lists, and no horizontal rules. Do not open with a title. Start with the answer. Note titles are labels for you, not lines to repeat. Use the notes when they answer the question, and cite a source URL when you rely on one. Do not invent coefficients, sample sizes, or method steps. Notes:\n${relevantNotes(messages[messages.length - 1].content)}\n\n${briefingContext}`,
        },
        ...messages,
      ],
      reasoning: { effort: "low" },
    }),
  });

  const payload = (await upstream.json().catch(() => null)) as {
    error?: { message?: string };
    choices?: { message?: { content?: string | { type?: string; text?: string }[] } }[];
  } | null;

  if (!upstream.ok) {
    const detail = payload?.error?.message || "OpenRouter did not return an answer.";
    return Response.json({ error: detail }, { status: 502 });
  }

  const content = payload?.choices?.[0]?.message?.content;
  const reply = Array.isArray(content)
    ? content.map((part) => part.text || "").join("")
    : content || "";

  const plain = toPlainProse(reply, messages[messages.length - 1].content);
  if (!plain) {
    return Response.json({ error: "The model returned an empty answer." }, { status: 502 });
  }

  return Response.json({ reply: plain, model: MODEL });
}

function toPlainProse(raw: string, question = "") {
  let text = raw.replace(/\r\n/g, "\n").trim();
  text = text.replace(/```[\w-]*\n?([\s\S]*?)```/g, (_, code: string) => code.trim());
  text = text.replace(/`([^`]+)`/g, "$1");
  text = text.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1");
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, "$1 ($2)");
  text = text.replace(/^[ \t]*#{1,6}[ \t]+/gm, "");
  text = text.replace(/^[ \t]*[-*_]{3,}[ \t]*$/gm, "");
  text = text.replace(/\*\*(.+?)\*\*/g, "$1");
  text = text.replace(/__(.+?)__/g, "$1");
  text = text.replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,;:!?]|$)/gm, "$1$2");
  text = text.replace(/(^|[\s(])_([^_\n]+)_(?=[\s).,;:!?]|$)/gm, "$1$2");
  text = text.replace(/^[ \t]*[-*+][ \t]+/gm, "");
  text = text.replace(/^[ \t]*\d+[.)][ \t]+/gm, "");

  const paragraphs = text
    .split(/\n{2,}/)
    .map((block) => {
      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      const kept = lines.filter((line, index) => {
        const title = line.length <= 80 && !/[.!?]$/.test(line) && !line.includes(": ");
        return !(title && lines[index + 1]);
      });
      return kept
        .join(" ")
        .replace(/[ \t]{2,}/g, " ")
        .replace(/^(?:[A-Z][A-Za-z'’-]{1,24} ){0,3}[A-Z][A-Za-z'’-]{1,24}:[ \t]+(?=[A-Za-z])/, "")
        .trim();
    })
    .filter(Boolean)
    .filter((paragraph, index, all) => {
      const title = paragraph.length <= 80 && !/[.!?]$/.test(paragraph) && !paragraph.includes(": ");
      return !(title && all[index + 1]);
    });

  return keepBrief(paragraphs, question);
}

function asksForMore(question: string) {
  const marks = (question.match(/\?/g) ?? []).length;
  if (marks >= 2) return true;
  const asks = question.toLowerCase().match(/\b(how|why|what|when|where|whether)\b/g) ?? [];
  if (asks.length >= 2) return true;
  return /\b(compare|comparison|difference between|versus|vs\.?)\b/i.test(question);
}

function isCaveat(paragraph: string) {
  return /^(however|but|still|even so|one caveat|the caveat|the exception|the limit|except|that does not|this does not)\b/i.test(
    paragraph,
  );
}

function keepBrief(paragraphs: string[], question: string) {
  if (paragraphs.length <= 2) return paragraphs.join("\n\n");
  const allowThird = asksForMore(question) || isCaveat(paragraphs[2]);
  return paragraphs.slice(0, allowThird ? 3 : 2).join("\n\n");
}
