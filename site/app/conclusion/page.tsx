import { Article, Blocks } from "@/components/article";
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
      <Blocks blocks={conclusion.blocks} />
    </Article>
  );
}
