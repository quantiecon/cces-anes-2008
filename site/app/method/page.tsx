import { Article } from "@/components/article";
import { PartyFigure, ShareFigure, StateFigure } from "@/components/figures";
import { method } from "@/content/copy";

const slopes = [
  ["Party, 1 to 7", "−0.317", "−0.317"],
  ["Age, per 10 years", "−0.040", "−0.050"],
  ["Black", "+0.260", "+0.325"],
  ["Hispanic", "+0.063", "+0.159"],
  ["Other race", "+0.014", "+0.259"],
];

export default function MethodPage() {
  return (
    <Article
      path="/method"
      kicker={method.kicker}
      byline={method.byline}
      title={method.title}
      lede={method.lede}
      sources={method.sources}
    >
      <ol className="mt-10 space-y-6">
        {method.steps.map(([title, body], index) => (
          <li key={title}>
            <h2 className="serif text-2xl">
              {index + 1}. {title}
            </h2>
            <p className="mt-3 leading-relaxed">{body}</p>
          </li>
        ))}
      </ol>
      <section className="mt-12">
        <h2 className="serif text-2xl">The shared result</h2>
        <p className="mt-4 leading-relaxed">{method.resultLead}</p>
        <PartyFigure />
        <p className="leading-relaxed">{method.otherLead}</p>
        <table className="mt-6 w-full text-left text-sm">
          <thead className="border-b border-ink text-xs tracking-[0.14em] uppercase text-muted">
            <tr>
              <th className="py-2 font-semibold">Covariate</th>
              <th className="py-2 font-semibold">CCES</th>
              <th className="py-2 font-semibold">ANES</th>
            </tr>
          </thead>
          <tbody>
            {slopes.map((row) => (
              <tr key={row[0]} className="border-b border-line">
                {row.map((cell, index) => (
                  <td key={`${row[0]}-${index}`} className="py-2 pr-4 tabular-nums">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-8 leading-relaxed">{method.shareLead}</p>
        <ShareFigure />
        <StateFigure />
        <p className="leading-relaxed">{method.turnout}</p>
      </section>
    </Article>
  );
}
