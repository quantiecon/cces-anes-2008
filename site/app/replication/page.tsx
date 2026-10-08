import { Article, Blocks } from "@/components/article";
import { AttentionChart, IssueChart, OfficeChart, StateChart } from "@/components/charts";
import { PartyFigure } from "@/components/figures";
import { replication } from "@/content/copy";

export default function ReplicationPage() {
  return (
    <Article
      path="/replication"
      kicker={replication.kicker}
      byline={replication.byline}
      title={replication.title}
      lede={replication.lede}
      sources={replication.sources}
    >
      <Blocks blocks={replication.blocks} />
      <p className="mt-10 max-w-3xl text-lg leading-relaxed">The shared party coefficient is the first comparison, set beside the article’s published table.</p>
      <PartyFigure className="my-10" />
      <p className="max-w-3xl text-lg leading-relaxed">The article stops at the presidency. The same model, applied to the other offices on the ballot, stays near −0.30.</p>
      <OfficeChart />
      <p className="max-w-3xl text-lg leading-relaxed">The presidential model is then estimated again, with ideology and three issue questions, among a fixed set of respondents.</p>
      <IssueChart />
      <p className="max-w-3xl text-lg leading-relaxed">Finally, the presidential coefficient is split by how closely the respondent follows politics.</p>
      <AttentionChart />
      <p className="max-w-3xl text-lg leading-relaxed">The state comparison is the result that misses the article’s exact decimals. A map of those misses appears on the method page. The points are below.</p>
      <StateChart />
    </Article>
  );
}
