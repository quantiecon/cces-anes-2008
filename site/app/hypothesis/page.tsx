import { Article, Blocks } from "@/components/article";
import { Scoreboard } from "@/components/charts";
import { hypothesis } from "@/content/copy";

export default function HypothesisPage() {
  return (
    <Article
      path="/hypothesis"
      kicker={hypothesis.kicker}
      byline={hypothesis.byline}
      title={hypothesis.title}
      lede={hypothesis.lede}
      sources={hypothesis.sources}
    >
      <Blocks blocks={hypothesis.blocks} />
      <p className="mt-10 max-w-3xl text-lg leading-relaxed">
        Three comparisons would confirm the claim. The method page shows where the numbers come from. The conclusion reports which of them held.
      </p>
      <Scoreboard />
    </Article>
  );
}
