const contrasts = [
  {
    label: "Who is included",
    anes: "Adults at addresses drawn at random, each with a known chance of selection.",
    cces: "People who had already agreed to take surveys online.",
  },
  {
    label: "The interview",
    anes: "At home, once before the election and once after.",
    cces: "Online. YouGov keeps the interview closest to each Census record.",
  },
  {
    label: "Who it stands for",
    anes: "Eligible adults, through the random draw and the post-election weight.",
    cces: "U.S. citizens in the 2006 Census, including those who do not vote.",
  },
  {
    label: "The vote",
    anes: "What respondents said at the second home visit.",
    cces: "What respondents said online, later checked against the official state count.",
  },
  {
    label: "The file",
    anes: "2,323 rows and 10 columns. Gender, education, income, and home ownership are absent.",
    cces: "32,800 rows and 477 columns, including those four traits.",
  },
];

const counts = [
  { label: "In the shared vote model", anes: 1538, cces: 23681 },
  { label: "Named Obama or McCain", anes: 1539, cces: 23585 },
  { label: "In the article’s table", anes: 1436, cces: 25814 },
];

export function DesignFigure() {
  const scale = 32800;
  return (
    <figure id="designs" className="my-12 -mx-5 overflow-hidden border-y border-ink md:mx-0 md:border">
      <div className="grid md:grid-cols-2">
        <div className="bg-[#1e4d5c] px-5 py-6 text-[#f4efe6]">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase">ANES · face to face</p>
          <p className="serif mt-4 text-6xl leading-none tracking-tight">2,323</p>
          <p className="mt-2 text-sm">pre-election interviews</p>
          <p className="serif mt-6 text-4xl leading-none">2,102</p>
          <p className="mt-2 text-sm">came back after the election</p>
        </div>
        <div className="bg-[#8a4528] px-5 py-6 text-[#faf7f1] md:text-right">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase">CCES · matched internet</p>
          <p className="serif mt-4 text-6xl leading-none tracking-tight">32,800</p>
          <p className="mt-2 text-sm">interviews kept after matching</p>
          <p className="serif mt-6 text-4xl leading-none">~50,800</p>
          <p className="mt-2 text-sm">finished the pre-election survey</p>
        </div>
      </div>

      <div className="bg-card px-5 py-5">
        <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted">Counts in the later models</p>
        <p className="mt-1 text-sm text-muted">The length of each bar is the count. The scale is the matched CCES, 32,800.</p>
        <div className="mt-4 space-y-5">
          {counts.map((row) => (
            <div key={row.label}>
              <p className="text-sm">{row.label}</p>
              <CountBar name="ANES" value={row.anes} scale={scale} color="#1e4d5c" />
              <CountBar name="CCES" value={row.cces} scale={scale} color="#8a4528" />
            </div>
          ))}
        </div>
      </div>

      <div>
        {contrasts.map((row) => (
          <div key={row.label} className="border-t border-line">
            <p className="px-5 pt-4 text-[11px] font-semibold tracking-[0.16em] uppercase text-muted">{row.label}</p>
            <div className="grid md:grid-cols-2">
              <div className="border-l-4 border-[#1e4d5c] px-5 py-3">
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#1e4d5c]">ANES</p>
                <p className="mt-1 text-sm leading-relaxed">{row.anes}</p>
              </div>
              <div className="border-l-4 border-[#8a4528] bg-[#faf7f1] px-5 py-3">
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#8a4528]">CCES</p>
                <p className="mt-1 text-sm leading-relaxed">{row.cces}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <figcaption className="border-t border-line px-5 py-4 text-sm leading-relaxed text-muted">
        The matched CCES is about 14 times the ANES pre-election sample. The ANES counts come from this extract: 2,323 rows, of which 2,102 carry a post-election weight above zero. The matched CCES count is the public file. About 50,800 is the study guide’s count of finished pre-election interviews. The shared-model and two-party counts are from this rerun. The article’s sample sizes are Table 5 of Ansolabehere and Rivers (2013).
      </figcaption>
    </figure>
  );
}

function CountBar({ name, value, scale, color }: { name: string; value: number; scale: number; color: string }) {
  return (
    <div className="mt-2 grid grid-cols-[3.25rem_1fr_4.5rem] items-center gap-3">
      <span className="text-xs text-muted">{name}</span>
      <div className="h-2.5 bg-line">
        <div className="h-2.5" style={{ width: `${(value / scale) * 100}%`, background: color }} />
      </div>
      <span className="text-right text-sm tabular-nums">{value.toLocaleString("en-US")}</span>
    </div>
  );
}

const shares = [
  { name: "CCES, all", value: 53.9 },
  { name: "ANES, all", value: 54.9 },
  { name: "CCES, Hispanic", value: 65.8 },
  { name: "ANES, Latino", value: 77 },
];

function ValueColumns({ rows, note }: { rows: string[][]; note: string }) {
  return (
    <>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-[11px] font-semibold tracking-[0.14em] uppercase">
            <th className="px-5 py-3 font-semibold text-muted" />
            <th className="px-4 py-3 text-right font-semibold text-[#8a4528]">CCES</th>
            <th className="px-5 py-3 text-right font-semibold text-[#1e4d5c]">ANES</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-t border-line">
              <th className="px-5 py-3 font-normal">{row[0]}</th>
              <td className="px-4 py-3 text-right tabular-nums">{row[1]}</td>
              <td className="px-5 py-3 text-right tabular-nums">{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-line px-5 py-4 text-sm leading-relaxed text-muted">{note}</p>
    </>
  );
}

const partyRows = [
  ["This rerun", "−0.317", "−0.317"],
  ["Standard error", "0.002", "0.010"],
  ["Respondents", "23,681", "1,538"],
  ["Published", "−0.313", "−0.312"],
  ["Published N", "25,814", "1,436"],
];

export function PartyFigure({ className = "" }: { className?: string }) {
  return (
    <figure className={`border border-ink bg-card ${className}`}>
      <figcaption className="border-b border-line px-5 py-4">
        <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted">Figure 1</p>
        <p className="serif mt-1 text-2xl">The party coefficient in the shared model</p>
      </figcaption>
      <ValueColumns
        rows={partyRows}
        note="The coefficient is the change in the vote score for one step toward the Republicans. The score is +1 for Obama, −1 for McCain, and 0 for another candidate. The shared model uses only party, age, and race. Published figures are Table 5 of Ansolabehere and Rivers (2013)."
      />
    </figure>
  );
}

const slopeRows = [
  ["Party", "−0.317 (0.002)", "−0.317 (0.010)"],
  ["Age, per 10 years", "−0.040 (0.003)", "−0.050 (0.011)"],
  ["Black", "+0.260 (0.015)", "+0.325 (0.045)"],
  ["Hispanic", "+0.063 (0.022)", "+0.159 (0.055)"],
  ["Other race", "+0.014 (0.024)", "+0.259 (0.097)"],
  ["Respondents", "23,681", "1,538"],
];

const shareRows = [
  ["All", "53.9%", "54.9%"],
  ["All, respondents", "23,585", "1,539"],
  ["White", "46.5%", "44.2%"],
  ["White, respondents", "19,889", "799"],
  ["Black", "96.3%", "99.6%"],
  ["Black, respondents", "1,361", "418"],
  ["Hispanic / Latino", "65.8%", "77.0%"],
  ["Hispanic / Latino, respondents", "1,191", "275"],
];

export function ComparisonTables() {
  return (
    <div className="my-10 grid items-start gap-6 lg:grid-cols-2">
      <PartyFigure />
      <figure className="border border-ink bg-card">
        <figcaption className="border-b border-line px-5 py-4">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted">Two-party vote</p>
          <p className="serif mt-1 text-2xl">Obama’s share, side by side</p>
        </figcaption>
        <ValueColumns
          rows={shareRows}
          note="Shares count respondents who chose Obama or McCain. The ANES white figure is white and non-Latino. The CCES records Hispanic on the race question."
        />
      </figure>
      <figure className="border border-ink bg-card lg:col-span-2">
        <figcaption className="border-b border-line px-5 py-4">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted">Shared model</p>
          <p className="serif mt-1 text-2xl">The other coefficients, side by side</p>
        </figcaption>
        <ValueColumns
          rows={slopeRows}
          note="Figures in parentheses are standard errors. Hispanic respondents in the CCES are the race category. The ANES asks Latino status separately."
        />
      </figure>
    </div>
  );
}

export function ShareFigure() {
  return (
    <figure className="my-10 border border-ink bg-card px-5 py-5">
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
    <figure className="my-10 border border-ink bg-card px-5 py-5">
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
