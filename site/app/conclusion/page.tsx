import { Article, Blocks } from "@/components/article";
import { Scoreboard } from "@/components/charts";
import { conclusion } from "@/content/copy";

export default function ConclusionPage() {
  return (
    <Article
      path="/conclusion"
      kicker={conclusion.kicker}
      byline={conclusion.byline}
      title={conclusion.title}
      lede={conclusion.lede}
      sources={conclusion.sources}
    >
      <p className="mt-10 max-w-3xl text-lg leading-relaxed">
        The three comparisons from the hypothesis, with the results filled in.
      </p>
      <Scoreboard />
      <Blocks blocks={conclusion.blocks} />
    </Article>
  );
}
