import type { ReactNode } from "react";
import Link from "next/link";
import type { Source } from "@/content/copy";

const next: Record<string, { href: string; label: string }> = {
  "/": { href: "/hypothesis", label: "Hypothesis" },
  "/hypothesis": { href: "/method", label: "Method & data" },
  "/method": { href: "/conclusion", label: "Conclusion" },
  "/conclusion": { href: "/replication", label: "Replication" },
  "/replication": { href: "/", label: "Overview" },
};

export function Article({
  path,
  kicker,
  byline,
  title,
  lede,
  sources,
  children,
}: {
  path: string;
  kicker: string;
  byline: string;
  title: string;
  lede: string;
  sources: Source[];
  children?: ReactNode;
}) {
  const following = next[path];
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted">{kicker}</p>
      <h1 className="serif mt-3 text-4xl leading-tight tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-muted">{byline}</p>
      <p className="mt-8 text-xl leading-relaxed">{lede}</p>
      {children}
      <section className="mt-14 border-t border-line pt-6">
        <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-muted">Sources</h2>
        <ol className="mt-3 space-y-2 text-sm leading-relaxed">
          {sources.map((source) => (
            <li key={source.href}>
              <a className="underline decoration-line underline-offset-4 hover:decoration-ink" href={source.href}>
                {source.label}
              </a>
            </li>
          ))}
        </ol>
      </section>
      {following && (
        <p className="mt-8 text-sm">
          <Link className="underline decoration-line underline-offset-4" href={following.href}>
            Next: {following.label}
          </Link>
        </p>
      )}
    </article>
  );
}

export function Blocks({ blocks }: { blocks: { heading: string; paragraphs: string[] }[] }) {
  return (
    <>
      {blocks.map((block) => (
        <section key={block.heading} className="mt-10">
          <h2 className="serif text-2xl">{block.heading}</h2>
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </>
  );
}
