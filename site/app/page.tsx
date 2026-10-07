import { Article, Blocks } from "@/components/article";
import { overview } from "@/content/copy";
import Link from "next/link";

export default function OverviewPage() {
  return (
    <Article
      path="/"
      kicker={overview.kicker}
      byline={overview.byline}
      title={overview.title}
      lede={overview.lede}
      sources={overview.sources}
    >
      <Blocks blocks={overview.blocks} />
      <section className="mt-10">
        <h2 className="serif text-2xl">Where to read</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {overview.roles.map(([who, what, href]) => (
            <li key={href}>
              <Link href={href} className="flex items-baseline justify-between gap-4 py-3 hover:bg-card">
                <span>{what}</span>
                <span className="text-sm text-muted">{who}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Article>
  );
}
