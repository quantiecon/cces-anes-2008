import type { ReactNode } from "react";
import { statePaths } from "./state-paths";

const anes = "#1e4d5c";
const cces = "#8a4528";
const election = "#1c1915";

function Chart({
  kicker,
  title,
  note,
  children,
}: {
  kicker: string;
  title: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-10 border border-ink bg-card">
      <figcaption className="border-b border-line px-5 py-4">
        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted">{kicker}</p>
        <p className="serif mt-1 text-2xl leading-tight">{title}</p>
      </figcaption>
      <div className="px-5 py-5">{children}</div>
      <p className="border-t border-line px-5 py-4 text-sm leading-relaxed text-muted">{note}</p>
    </figure>
  );
}

function Legend() {
  return (
    <p className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-xs font-semibold tracking-[0.12em] uppercase">
      <span className="flex items-center gap-2">
        <span className="inline-block h-2.5 w-2.5" style={{ background: anes }} />
        ANES
      </span>
      <span className="flex items-center gap-2">
        <span className="inline-block h-2.5 w-2.5" style={{ background: cces }} />
        CCES
      </span>
    </p>
  );
}

export function OpeningStats() {
  const cells = [
    { label: "ANES, pre-election", value: "2,323", color: anes },
    { label: "CCES, matched", value: "32,800", color: cces },
    { label: "ANES party slope", value: "−0.317", color: anes },
    { label: "CCES party slope", value: "−0.317", color: cces },
  ];
  return (
    <div className="my-10 grid gap-px border border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4">
      {cells.map((cell) => (
        <div key={cell.label} className="bg-card px-5 py-5">
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted">{cell.label}</p>
          <p className="serif mt-2 text-5xl leading-none tracking-tight" style={{ color: cell.color }}>
            {cell.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export function Scoreboard() {
  const cards = [
    {
      label: "Party slope",
      value: "−0.317",
      line: "The same figure in both surveys.",
      aside: "The article reported −0.313 and −0.312.",
    },
    {
      label: "Average state miss",
      value: "+1.0",
      line: "The CCES, minus the official vote.",
      aside: "A typical state misses by 3.4 points. The article reported +0.27 and 2.43.",
    },
    {
      label: "Hispanic Obama share",
      value: "65.8%",
      line: "In the CCES. The exit poll was about 67 percent.",
      aside: "The ANES share among Latino voters was 77 percent.",
    },
  ];
  return (
    <div className="my-10 grid gap-px border border-ink bg-ink md:grid-cols-3">
      {cards.map((card) => (
        <div key={card.label} className="bg-card px-5 py-5">
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted">{card.label}</p>
          <p className="serif mt-3 text-5xl leading-none tracking-tight">{card.value}</p>
          <p className="mt-3 text-sm leading-relaxed">{card.line}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{card.aside}</p>
        </div>
      ))}
    </div>
  );
}

const flow = [
  { label: "Finished the pre-election interview", n: "~50,800", width: 100, note: "Study guide count" },
  { label: "Kept after matching", n: "32,800", width: 64.6, note: "Public file" },
  { label: "Used in the shared vote model", n: "23,681", width: 46.6, note: "Named a candidate and a party" },
];

export function FlowChart() {
  return (
    <Chart
      kicker="How the CCES shrinks"
      title="From the volunteer list to the vote model."
      note="About 50,800 is the study guide’s count of finished pre-election interviews. The public file keeps 32,800. The shared model in this rerun uses 23,681, after setting aside respondents who named no candidate or no party."
    >
      <div className="space-y-4">
        {flow.map((row) => (
          <div key={row.label}>
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <span>{row.label}</span>
              <span className="tabular-nums">{row.n}</span>
            </div>
            <p className="text-xs text-muted">{row.note}</p>
            <div className="mt-1 h-3 bg-line">
              <div className="h-3" style={{ width: `${row.width}%`, background: cces }} />
            </div>
          </div>
        ))}
      </div>
    </Chart>
  );
}

const penalties = [
  ["Race", 10],
  ["Registration", 4],
  ["Gender", 1.5],
  ["Party", 1.5],
  ["Region", 1],
  ["Ideology", 1],
  ["30 years of age", 1],
  ["6 years of school", 1],
  ["One age-group step", 0.5],
  ["Religion", 0.5],
  ["News interest", 0.5],
];

export function DistanceChart() {
  return (
    <Chart
      kicker="The match score"
      title="What a mismatch costs."
      note="These penalties are the 2008 study guide’s distance function. A higher score is a poorer match, and the lowest total is kept. Age groups are 18–29, 30–64, and 65 or older; crossing one boundary costs 0.5. Income, marital status, church attendance, and metro or non-metro status use separate distance tables, then are divided by 15, 4, 10, and 2. Those terms rarely decide the match."
    >
      <div className="space-y-2">
        {penalties.map(([label, cost]) => (
          <div key={String(label)} className="grid grid-cols-[11rem_1fr_3rem] items-center gap-3 text-sm">
            <span>{label}</span>
            <div className="h-3 bg-line">
              <div className="h-3" style={{ width: `${(Number(cost) / 10) * 100}%`, background: cces }} />
            </div>
            <span className="text-right tabular-nums">{Number(cost).toFixed(1)}</span>
          </div>
        ))}
      </div>
    </Chart>
  );
}

const matchRows = [
  ["Gender", "0", "1.5", "0"],
  ["Age, six years", "0.20", "0", "0"],
  ["Age group", "0", "0", "0"],
  ["Race", "0", "0", "10"],
  ["Region", "0", "0", "0"],
  ["Years of school", "0", "0", "0"],
  ["Party", "0", "0", "0"],
  ["Religion", "0", "0", "0"],
  ["Registration", "0", "0", "0"],
  ["Income", "0", "0", "0"],
];

export function MatchExample() {
  return (
    <Chart
      kicker="One target"
      title="The lowest total is the interview YouGov keeps."
      note="The target is a woman, age 34, white, 16 years of school, South, married, Democrat, Catholic, and registered. The first interview is the same woman six years older, so the age term is 6 ÷ 30. The second differs only in gender. The third differs only in race. Married status matches in all three, and the income brackets match, so those terms are zero. Source: the distance function in the 2008 CCES study guide."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[11px] tracking-[0.12em] uppercase text-muted">
              <th className="py-2 pr-3 font-semibold">Penalty</th>
              <th className="px-3 py-2 font-semibold" style={{ color: cces }}>
                Age 40, same traits
              </th>
              <th className="px-3 py-2 font-semibold">Man, age 34</th>
              <th className="px-3 py-2 font-semibold">Different race, age 34</th>
            </tr>
          </thead>
          <tbody>
            {matchRows.map(([label, near, gender, race]) => (
              <tr key={label} className="border-b border-line/70">
                <th className="py-2 pr-3 font-normal">{label}</th>
                <td className="px-3 py-2 tabular-nums">{near}</td>
                <td className="px-3 py-2 tabular-nums">{gender}</td>
                <td className="px-3 py-2 tabular-nums">{race}</td>
              </tr>
            ))}
            <tr>
              <th className="pt-3 pr-3 font-semibold">Distance</th>
              <td className="px-3 pt-3 font-semibold tabular-nums" style={{ color: cces }}>
                0.20
              </td>
              <td className="px-3 pt-3 font-semibold tabular-nums">1.50</td>
              <td className="px-3 pt-3 font-semibold tabular-nums">10.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Chart>
  );
}

const shared = [
  { name: "Party", cces: -0.317, anes: -0.317 },
  { name: "Age / 10 years", cces: -0.04, anes: -0.05 },
  { name: "Black", cces: 0.26, anes: 0.325 },
  { name: "Hispanic", cces: 0.063, anes: 0.159 },
  { name: "Other race", cces: 0.014, anes: 0.259 },
];

export function SlopeDots() {
  const min = -0.4;
  const max = 0.4;
  const place = (value: number) => ((value - min) / (max - min)) * 100;
  return (
    <Chart
      kicker="Shared model"
      title="The other coefficients, survey beside survey."
      note="Each dot is a coefficient from the shared model, which includes only party, age, and race. The scale runs from −0.40 to +0.40. A positive number raises the predicted Obama score. Hispanic voters are the gap the article already notes. The CCES sample is 23,681. The ANES sample is 1,538."
    >
      <Legend />
      <div>
        <div className="space-y-4">
          {shared.map((row) => (
            <div key={row.name} className="grid items-center gap-3 sm:grid-cols-[8.5rem_1fr_auto]">
              <span className="text-sm">{row.name}</span>
              <div className="relative h-6 bg-line/60">
                <span className="absolute top-0 left-1/2 h-full w-px bg-ink" />
                <span className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left: `${place(row.anes)}%`, background: anes }} />
                <span className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-card" style={{ left: `${place(row.cces)}%`, background: cces }} />
              </div>
              <span className="text-right text-xs tabular-nums text-muted">
                {row.cces.toFixed(3)} / {row.anes.toFixed(3)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 grid text-[11px] tabular-nums text-muted sm:grid-cols-[8.5rem_1fr_auto]">
          <span />
          <span className="flex justify-between">
            <span>−0.40</span>
            <span>0</span>
            <span>+0.40</span>
          </span>
        </div>
      </div>
    </Chart>
  );
}

const groups = [
  { name: "All", cces: 53.9, anes: 54.9, election: 53.7, ccesN: "23,585", anesN: "1,539" },
  { name: "White", cces: 46.5, anes: 44.2, election: 43.9, ccesN: "19,889", anesN: "799" },
  { name: "Black", cces: 96.3, anes: 99.6, election: 96.0, ccesN: "1,361", anesN: "418" },
  { name: "Hispanic / Latino", cces: 65.8, anes: 77.0, election: 68.4, ccesN: "1,191", anesN: "275" },
  { name: "Other race", cces: 52.3, anes: 80.1, election: 66.4, ccesN: "1,144", anesN: "48" },
];

export function GroupChart() {
  return (
    <Chart
      kicker="Two-party vote"
      title="Obama’s share, group by group."
      note="Each survey bar is the weighted Obama share among respondents who chose Obama or McCain. The election bar uses that same ratio. For all voters it is the certified national count. For the race rows it is the 2008 National Election Pool exit poll, because no official tally breaks the vote out by race. The published exit-poll shares, which still count other ballots, are 43 percent of white voters, 95 percent of Black voters, and 67 percent of Latino voters. Other race pools the exit poll’s Asian voters (62 percent) and its other voters (66 percent). The CCES records Hispanic as a race category. The ANES asks Latino status separately, and its white bar is white and non-Latino. The ANES other-race bar rests on 48 voters."
    >
      <p className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-xs font-semibold tracking-[0.12em] uppercase">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5" style={{ background: anes }} />
          ANES
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5" style={{ background: cces }} />
          CCES
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5" style={{ background: election }} />
          Election
        </span>
      </p>
      <div className="space-y-5">
        {groups.map((row) => (
          <div key={row.name}>
            <p className="text-sm">{row.name}</p>
            <Bar name="ANES" value={row.anes} n={row.anesN} color={anes} />
            <Bar name="CCES" value={row.cces} n={row.ccesN} color={cces} />
            <Bar name="Election" value={row.election} color={election} />
          </div>
        ))}
      </div>
    </Chart>
  );
}

function Bar({ name, value, n, color }: { name: string; value: number; n?: string; color: string }) {
  return (
    <div className="mt-1.5 grid grid-cols-[4.5rem_1fr_7.5rem] items-center gap-3 text-sm">
      <span className="text-xs text-muted">{name}</span>
      <div className="h-3 bg-line">
        <div className="h-3" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-right tabular-nums">
        {value.toFixed(1)}%{n ? <span className="text-xs text-muted"> n {n}</span> : null}
      </span>
    </div>
  );
}

const states: [string, number, number][] = [
  ["UT", 9.95, 230],
  ["MD", 7.16, 373],
  ["VA", 7.15, 607],
  ["RI", 6.88, 75],
  ["SC", 5.71, 301],
  ["NE", 5.53, 161],
  ["AR", 5.03, 269],
  ["DE", 4.82, 88],
  ["ND", 4.61, 76],
  ["NC", 3.87, 669],
  ["WV", 3.34, 161],
  ["CT", 3.15, 329],
  ["NJ", 3.02, 599],
  ["SD", 2.52, 93],
  ["TX", 2.52, 1462],
  ["MT", 2.4, 131],
  ["IN", 1.97, 578],
  ["OH", 1.89, 1040],
  ["FL", 1.62, 1564],
  ["WA", 1.62, 684],
  ["OK", 1.13, 316],
  ["MO", 0.79, 651],
  ["MA", 0.7, 434],
  ["HI", 0.42, 55],
  ["MS", 0.3, 188],
  ["KS", 0.22, 298],
  ["AZ", 0.2, 606],
  ["AL", 0.19, 257],
  ["WY", 0.07, 38],
  ["KY", -0.04, 332],
  ["NY", -0.16, 1258],
  ["NM", -0.28, 197],
  ["TN", -0.53, 440],
  ["GA", -0.7, 590],
  ["CO", -0.92, 371],
  ["NH", -0.99, 179],
  ["IL", -1.03, 829],
  ["PA", -1.1, 1416],
  ["AK", -1.12, 55],
  ["VT", -1.34, 92],
  ["WI", -1.67, 542],
  ["ID", -1.81, 125],
  ["MN", -1.91, 444],
  ["MI", -2.05, 772],
  ["LA", -2.3, 265],
  ["CA", -2.57, 2051],
  ["ME", -2.88, 186],
  ["IA", -3.1, 334],
  ["OR", -5.67, 432],
  ["NV", -6.7, 300],
];

export function StateChart() {
  const halves = [states.slice(0, 25), states.slice(25)];
  return (
    <Chart
      kicker="Fifty states"
      title="Where the CCES missed the official vote."
      note="Each bar is the CCES two-party Democratic share minus the certified state share, in percentage points. Rust means the survey is more Democratic than the official result. The scale runs 12 points to either side of zero. The average miss is +1.00, and the typical miss is 3.43. The article reported +0.27 and 2.43. The count at the right is the number of CCES respondents in that state who chose Obama or McCain."
    >
      <div className="mb-3 flex justify-between text-[11px] font-semibold tracking-[0.12em] uppercase text-muted">
        <span style={{ color: anes }}>More Republican than the count</span>
        <span style={{ color: cces }}>More Democratic than the count</span>
      </div>
      <div className="grid gap-x-16 gap-y-8 lg:grid-cols-2">
        {halves.map((half, index) => (
          <div key={half[0][0]} className={index === 1 ? "lg:border-l lg:border-line lg:pl-10" : ""}>
            <div className="mb-1 grid grid-cols-[1.75rem_1fr_3.4rem_3.2rem] gap-2 text-[11px] tracking-[0.12em] uppercase text-muted">
              <span />
              <span />
              <span className="text-right">Pts</span>
              <span className="text-right">N</span>
            </div>
            <div className="space-y-1">
              {half.map(([state, error, n]) => (
                <StateRow key={state} state={state} error={error} n={n} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Chart>
  );
}

function StateRow({ state, error, n }: { state: string; error: number; n: number }) {
  const width = `${(Math.abs(error) / 12) * 50}%`;
  const style =
    error >= 0
      ? { left: "50%", width, background: cces }
      : { right: "50%", width, background: anes };
  return (
    <div className="grid grid-cols-[1.75rem_1fr_3.4rem_3.2rem] items-center gap-2 text-xs">
      <span>{state}</span>
      <div className="relative h-2.5 bg-line/70">
        <span className="absolute top-0 left-1/2 h-full w-px bg-ink" />
        <span className="absolute top-0 h-full" style={style} />
      </div>
      <span className="text-right tabular-nums">{error > 0 ? `+${error.toFixed(2)}` : error.toFixed(2)}</span>
      <span className="text-right tabular-nums text-muted">{n.toLocaleString("en-US")}</span>
    </div>
  );
}

const offices = [
  ["President", -0.314, "22,223"],
  ["U.S. Senate", -0.306, "10,730"],
  ["U.S. House", -0.298, "18,878"],
  ["Governor", -0.289, "3,298"],
];

export function OfficeChart() {
  return (
    <Chart
      kicker="Beyond the article"
      title="The party coefficient stays near −0.30 down the ballot."
      note="These estimates are the group’s. Each figure is the party coefficient for that office, using the same traits as the full presidential model. Governor and Senate include only the states that held the election. The scale runs from 0 to −0.40."
    >
      <div className="space-y-3">
        {offices.map(([office, slope, n]) => (
          <div key={office}>
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <span>{office}</span>
              <span className="tabular-nums">
                {Number(slope).toFixed(3)} <span className="text-xs text-muted">n {n}</span>
              </span>
            </div>
            <div className="mt-1 h-3 bg-line">
              <div className="h-3" style={{ width: `${(Math.abs(Number(slope)) / 0.4) * 100}%`, background: cces }} />
            </div>
          </div>
        ))}
      </div>
    </Chart>
  );
}

export function IssueChart() {
  const rows = [
    ["Party, before the issue items", -0.314],
    ["Party, with ideology and issues", -0.17],
    ["Oppose guaranteed health insurance", -0.281],
    ["Oppose a carbon cap", -0.12],
    ["Ideology, toward conservative", -0.074],
    ["Prefer spending cuts to tax increases", -0.015],
  ];
  return (
    <Chart
      kicker="Same 17,318 people"
      title="Issues absorb part of the party coefficient."
      note="Both party figures use the same respondents, so the change comes from the added questions. Ideology and three issue items move the party coefficient from −0.314 to −0.170, and the share of variation explained rises from 0.649 to 0.741. The scale runs from 0 to −0.40."
    >
      <div className="space-y-3">
        {rows.map(([label, slope]) => (
          <div key={String(label)}>
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <span>{label}</span>
              <span className="tabular-nums">{Number(slope).toFixed(3)}</span>
            </div>
            <div className="mt-1 h-3 bg-line">
              <div className="h-3 bg-ink" style={{ width: `${(Math.abs(Number(slope)) / 0.4) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Chart>
  );
}

export function AttentionChart() {
  const pairs = [
    { label: "Follows the news", low: ["Less often", -0.304], high: ["Most of the time", -0.32], n: "22,133" },
    { label: "Knows which party held the House", low: ["Does not know", -0.29], high: ["Knows", -0.322], n: "22,142" },
  ];
  return (
    <Chart
      kicker="Information"
      title="Better informed respondents are slightly more partisan."
      note="Each bar is the presidential party coefficient inside that group. The gaps are small: −0.016 for attention to the news, and −0.032 for knowing which party held the House. Closer attention leaves the link between party and vote intact, and slightly steeper."
    >
      <div className="grid gap-8 md:grid-cols-2">
        {pairs.map((pair) => (
          <div key={pair.label}>
            <p className="text-sm">
              {pair.label} <span className="text-muted">n {pair.n}</span>
            </p>
            {[pair.low, pair.high].map(([name, slope]) => (
              <div key={String(name)} className="mt-3">
                <div className="flex justify-between text-sm">
                  <span>{name}</span>
                  <span className="tabular-nums">{Number(slope).toFixed(3)}</span>
                </div>
                <div className="mt-1 h-3 bg-line">
                  <div className="h-3" style={{ width: `${(Math.abs(Number(slope)) / 0.4) * 100}%`, background: cces }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Chart>
  );
}

function fillFor(error: number) {
  if (error <= -5) return "#1e4d5c";
  if (error <= -2) return "#3f6d7c";
  if (error <= -0.5) return "#8aabb6";
  if (error < 0.5) return "#e4ddd0";
  if (error < 2) return "#e2c2b0";
  if (error < 5) return "#c17a5a";
  return "#8a4528";
}

const swatches = [
  ["−5 or more", "#1e4d5c"],
  ["−5 to −2", "#3f6d7c"],
  ["−0.5 to −2", "#8aabb6"],
  ["within 0.5", "#e4ddd0"],
  ["+0.5 to +2", "#e2c2b0"],
  ["+2 to +5", "#c17a5a"],
  ["+5 or more", "#8a4528"],
];

export function ElectionMap() {
  return (
    <figure className="border border-ink bg-card">
      <figcaption className="border-b border-line px-5 py-4">
        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted">The election</p>
        <p className="serif mt-1 text-2xl leading-tight">Who carried each state.</p>
      </figcaption>
      <img
        src="/images/electoral-2008.svg"
        alt="Map of the 2008 Electoral College. Blue states voted for Obama. Red states voted for McCain."
        className="w-full bg-card"
      />
      <p className="border-t border-line px-5 py-4 text-sm leading-relaxed text-muted">
        Blue states cast their electoral votes for Obama. Red states cast them for McCain. Maine and Nebraska may divide their votes by congressional district. The map records the winner in each state. The popular-vote margin appears in the comparison beside it. Map by Gage, public domain, via Wikimedia Commons.
      </p>
    </figure>
  );
}

export function ErrorMap() {
  const byState = Object.fromEntries(states.map(([state, error, n]) => [state, { error, n }]));
  return (
    <figure className="border border-ink bg-card">
      <figcaption className="border-b border-line px-5 py-4">
        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted">The same outlines</p>
        <p className="serif mt-1 text-2xl leading-tight">Where the survey missed the official share.</p>
      </figcaption>
      <svg viewBox="0 0 1020 593" role="img" aria-label="States shaded by how far the CCES two-party vote was from the official result" className="w-full">
        {Object.entries(statePaths).map(([state, d]) => {
          const row = byState[state];
          const label = row
            ? `${state}, ${row.error > 0 ? "+" : ""}${row.error.toFixed(2)} points, ${row.n.toLocaleString("en-US")} voters`
            : state;
          return (
            <path key={state} d={d} fill={row ? fillFor(row.error) : "#d9d0c2"} stroke="#f3efe6" strokeWidth="0.8">
              <title>{label}</title>
            </path>
          );
        })}
      </svg>
      <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-line px-5 py-4">
        {swatches.map(([label, color]) => (
          <span key={label} className="flex items-center gap-2 text-xs text-muted">
            <span className="inline-block h-3 w-3 border border-line" style={{ background: color }} />
            {label}
          </span>
        ))}
      </div>
      <p className="border-t border-line px-5 py-4 text-sm leading-relaxed text-muted">
        Rust marks states where the weighted CCES was more Democratic than the certified two-party share. Teal marks states where it was more Republican. States in the paper color fall within half a point. Utah, the darkest rust, is off by +9.95. Nevada, the darkest teal, is off by −6.70. The outlines come from the public-domain map beside this one.
      </p>
    </figure>
  );
}
