import { Article, Blocks } from "@/components/article";
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
    </Article>
  );
}
