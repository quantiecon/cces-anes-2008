import { Article, Blocks } from "@/components/article";
import { PartyFigure, StateFigure } from "@/components/figures";
import { replication } from "@/content/copy";

const rows = [
  ["Shared party slope, CCES", "−0.317", "23,681"],
  ["Shared party slope, ANES", "−0.317", "1,538"],
  ["Full CCES party slope", "−0.314", "22,223"],
  ["Published CCES / ANES", "−0.313 / −0.312", "25,814 / 1,436"],
  ["CCES weights off", "−0.320", "same people"],
  ["ANES weights off", "−0.293", "same people"],
  ["State mean error / RMSE", "+1.00 / 3.43 pts", "50 states"],
  ["Article state mean / RMSE", "+0.27 / 2.43 pts", "50 states"],
];

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
      <table className="mt-8 w-full text-left text-sm">
        <thead className="border-b border-ink text-xs tracking-[0.14em] uppercase text-muted">
          <tr>
            <th className="py-2 font-semibold">Check</th>
            <th className="py-2 font-semibold">Result</th>
            <th className="py-2 font-semibold">N</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-line">
              {row.map((cell, index) => (
                <td key={`${row[0]}-${index}`} className="py-2 pr-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <PartyFigure />
      <StateFigure />
    </Article>
  );
}
