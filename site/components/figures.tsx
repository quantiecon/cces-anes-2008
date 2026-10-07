const slopes = [
  { name: "CCES, this rerun", value: -0.317, note: "N = 23,681 · SE 0.002" },
  { name: "ANES, this rerun", value: -0.317, note: "N = 1,538 · SE 0.010" },
  { name: "CCES, published", value: -0.313, note: "N = 25,814" },
  { name: "ANES, published", value: -0.312, note: "N = 1,436" },
];

const shares = [
  { name: "CCES, all", value: 53.9 },
  { name: "ANES, all", value: 54.9 },
  { name: "CCES, Hispanic", value: 65.8 },
  { name: "ANES, Latino", value: 77 },
];

export function PartyFigure() {
  const max = 0.4;
  return (
    <figure className="my-10 border border-line p-5">
      <figcaption>
        <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted">Figure 1</p>
        <p className="serif mt-1 text-2xl">Party coefficient in the shared model</p>
      </figcaption>
      <div className="mt-6 space-y-4">
        {slopes.map((row) => (
          <div key={row.name}>
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <span>{row.name}</span>
              <span className="tabular-nums">{row.value.toFixed(3)}</span>
            </div>
            <div className="mt-1 h-3 bg-line">
              <div className="h-3 bg-ink" style={{ width: `${(Math.abs(row.value) / max) * 100}%` }} />
            </div>
            <p className="mt-1 text-xs text-muted">{row.note}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Each bar is the party coefficient: how much the vote score changes for one step toward Republican on the party scale. The vote score is +1 Obama, −1 McCain, 0 another candidate. The shared model uses only party, age, and race, the traits both surveys contain. Bar length is the size of the negative slope. The scale runs from 0 to −0.40. N is the number of respondents. SE is the standard error, a measure of how precise the estimate is. Source: rerun bars from this replication; published bars from Table 5 of Ansolabehere and Rivers (2013).
      </p>
    </figure>
  );
}

export function ShareFigure() {
  return (
    <figure className="my-10 border border-line p-5">
      <figcaption>
        <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted">Figure 2</p>
        <p className="serif mt-1 text-2xl">Obama share of the two-party vote</p>
      </figcaption>
      <div className="mt-6 space-y-4">
        {shares.map((row) => (
          <div key={row.name}>
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <span>{row.name}</span>
              <span className="tabular-nums">{row.value.toFixed(1)}%</span>
            </div>
            <div className="mt-1 h-3 bg-line">
              <div className="h-3 bg-ink" style={{ width: `${row.value}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Each bar is the weighted percent who chose Obama, out of everyone who chose Obama or McCain. Votes for other candidates are left out. The bar scale is 0 to 100 percent. Source: this replication, using the weighted 2008 CCES and ANES. For comparison, the article’s exit poll, a survey of voters leaving the polls, puts Hispanic voters at about 67 percent Obama.
      </p>
    </figure>
  );
}

export function StateFigure() {
  const rows = [
    ["Mean error, this rerun", "+1.00 points"],
    ["RMSE, this rerun", "3.43 points"],
    ["Mean error, article", "+0.27 points"],
    ["RMSE, article", "2.43 points"],
  ];
  return (
    <figure className="my-10 border border-line p-5">
      <figcaption>
        <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted">Figure 3</p>
        <p className="serif mt-1 text-2xl">CCES state vote minus the official two-party share</p>
      </figcaption>
      <table className="mt-6 w-full text-left text-sm">
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label} className="border-t border-line">
              <th className="py-3 pr-4 font-normal">{label}</th>
              <td className="py-3 text-right tabular-nums">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Each state error is the CCES two-party Democratic share minus the certified state count, in percentage points. Positive means the survey is more Democratic than the official result. Mean error is the average across fifty states. RMSE, the root mean square error, is the typical size of a state error, ignoring direction. Source: rerun rows from this replication; article rows from Ansolabehere and Rivers (2013).
      </p>
    </figure>
  );
}
