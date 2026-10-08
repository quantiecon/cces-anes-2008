import { Article, Blocks } from "@/components/article";
import { ElectionMap, OpeningStats } from "@/components/charts";
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
      <OpeningStats />
      <p className="max-w-3xl text-lg leading-relaxed">
        The surveys differ sharply in size. On the question that matters, the party coefficient, they agree.
      </p>
      <Blocks blocks={overview.blocks} />
      <p className="mt-10 max-w-3xl text-lg leading-relaxed">
        Those coefficients describe the election mapped below. Blue states cast their electoral votes for Obama, and red states cast them for McCain. The state-by-state check later in the briefing uses the official popular vote.
      </p>
      <div className="mt-6">
        <ElectionMap />
      </div>
      <section className="mt-10">
        <h2 className="serif text-2xl">Where to read</h2>
        <p className="mt-3 max-w-3xl leading-relaxed">The sections follow the argument. Each one takes up the question the previous page leaves open.</p>
        <ul className="mt-4 grid border border-ink sm:grid-cols-2">
          {overview.roles.map(([who, what, href, hint]) => (
            <li key={href} className="border-b border-line last:border-b-0 sm:[&:nth-child(odd)]:border-r sm:[&:nth-last-child(-n+2)]:border-b-0">
              <Link href={href} className="block px-5 py-5 hover:bg-card">
                <span className="serif block text-2xl">{what}</span>
                <span className="mt-1 block text-sm text-muted">{who}</span>
                <span className="mt-3 block text-sm leading-relaxed">{hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Article>
  );
}
