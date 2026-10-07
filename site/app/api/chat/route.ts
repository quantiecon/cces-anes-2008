import { briefingContext } from "@/lib/briefing";

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
          content: `You are the briefing assistant for a political science group presentation. Write in plain sentences. Do not invent coefficients, sample sizes, or method steps. ${briefingContext}`,
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

  if (!reply.trim()) {
    return Response.json({ error: "The model returned an empty answer." }, { status: 502 });
  }

  return Response.json({ reply: reply.trim(), model: MODEL });
}
