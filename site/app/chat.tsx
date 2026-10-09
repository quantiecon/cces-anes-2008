"use client";

import { FormEvent, useEffect, useRef, useState, type RefObject } from "react";

type Message = { role: "user" | "assistant"; content: string };

const starters = [
  "How does YouGov choose a match?",
  "Why do the party results agree?",
  "Are people who did not vote included?",
];

const WORDS_PER_SECOND = 6;

function initialShown(text: string, pace: boolean) {
  const tokens = text.match(/\S+\s*/g) ?? [];
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!pace || reduce || tokens.length <= 24) return text;
  return tokens.slice(0, 4).join("");
}

function usePacedText(text: string, pace: boolean) {
  const [shown, setShown] = useState(() => initialShown(text, pace));

  useEffect(() => {
    const tokens = text.match(/\S+\s*/g) ?? [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!pace || reduce || tokens.length <= 24) {
      const timer = window.setTimeout(() => setShown(text), 0);
      return () => window.clearTimeout(timer);
    }

    const started = performance.now();
    const timer = window.setInterval(() => {
      const count = Math.min(
        tokens.length,
        Math.max(4, Math.floor(((performance.now() - started) / 1000) * WORDS_PER_SECOND)),
      );
      setShown(tokens.slice(0, count).join(""));
      if (count >= tokens.length) window.clearInterval(timer);
    }, 80);
    return () => window.clearInterval(timer);
  }, [text, pace]);

  return shown;
}

function RevealedReply({
  content,
  pace,
  logRef,
}: {
  content: string;
  pace: boolean;
  logRef: RefObject<HTMLDivElement | null>;
}) {
  const shown = usePacedText(content, pace);

  useEffect(() => {
    const node = logRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [shown, logRef]);

  return (
    <>
      {shown
        .split(/\n{2,}/)
        .filter(Boolean)
        .map((paragraph, paragraphIndex) => (
          <p key={paragraphIndex}>{paragraph}</p>
        ))}
    </>
  );
}

export function Chat() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  async function ask(text: string) {
    const question = text.trim();
    if (!question || pending) return;
    const next = [...messages, { role: "user" as const, content: question }];
    setMessages(next);
    setDraft("");
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const payload = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !payload.reply) {
        setError(payload.error || "The assistant did not answer.");
        return;
      }
      setMessages([...next, { role: "assistant", content: payload.reply }]);
    } catch {
      setError("The assistant could not be reached.");
    } finally {
      setPending(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void ask(draft);
  }

  return (
    <div className="fixed bottom-4 right-4 z-20 flex w-[min(24rem,calc(100vw-2rem))] flex-col items-end gap-3">
      {open && (
        <section className="flex h-[min(34rem,calc(100vh-6rem))] w-full flex-col border border-line bg-paper shadow-none">
          <header className="flex items-start justify-between gap-4 border-b border-line px-4 py-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted">Ask about this briefing</p>
              <p className="mt-1 text-sm text-muted">Gemini 3.5 Flash. Answers draw on this page.</p>
            </div>
            <button type="button" className="text-sm text-muted hover:text-ink" onClick={() => setOpen(false)}>
              Close
            </button>
          </header>
          <div ref={logRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="space-y-2">
                {starters.map((starter) => (
                  <button
                    key={starter}
                    type="button"
                    className="block w-full border border-line bg-card px-3 py-2 text-left text-sm hover:border-ink"
                    onClick={() => void ask(starter)}
                  >
                    {starter}
                  </button>
                ))}
              </div>
            )}
            {messages.map((message, index) =>
              message.role === "user" ? (
                <p key={`${message.role}-${index}`} className="text-sm">
                  <span className="mb-1 block text-xs font-semibold tracking-[0.14em] uppercase">You</span>
                  {message.content}
                </p>
              ) : (
                <div key={`${message.role}-${index}`} className="space-y-3 text-sm leading-relaxed text-muted">
                  <span className="mb-1 block text-xs font-semibold tracking-[0.14em] uppercase">Briefing</span>
                  <RevealedReply content={message.content} pace={index === messages.length - 1} logRef={logRef} />
                </div>
              ),
            )}
            {pending && <p className="text-sm text-muted">Thinking…</p>}
            {error && <p className="text-sm text-[#8a4528]">{error}</p>}
          </div>
          <form onSubmit={onSubmit} className="flex gap-2 border-t border-line p-3">
            <label className="sr-only" htmlFor="briefing-question">
              Question about the briefing
            </label>
            <input
              id="briefing-question"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about the method or the results"
              className="min-w-0 flex-1 border border-line bg-card px-3 py-2 text-sm outline-none focus:border-ink"
            />
            <button type="submit" disabled={pending || !draft.trim()} className="bg-ink px-3 py-2 text-sm text-paper disabled:opacity-40">
              Send
            </button>
          </form>
        </section>
      )}
      <button type="button" className="bg-ink px-4 py-3 text-sm text-paper" onClick={() => setOpen((value) => !value)}>
        {open ? "Hide assistant" : "Ask about the study"}
      </button>
    </div>
  );
}
