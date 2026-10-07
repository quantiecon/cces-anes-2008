import { Chat } from "./chat";

const nav = [
  { href: "#question", label: "Question", who: "Opening" },
  { href: "#why", label: "Why it matters", who: "Opening" },
  { href: "#hypothesis", label: "Hypothesis", who: "Abdullah" },
  { href: "#method", label: "Method", who: "Amelie" },
  { href: "#data", label: "Data", who: "Eric" },
  { href: "#conclusion", label: "Conclusion", who: "Rahel" },
];

const colors: Record<string, string> = {
  Opening: "var(--opening)",
  Abdullah: "var(--abdullah)",
  Amelie: "var(--amelie)",
  Eric: "var(--eric)",
  Rahel: "var(--rahel)",
};

function Speaker({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase">
      <span className="h-2 w-2 rounded-full" style={{ background: colors[name] }} />
      <span style={{ color: colors[name] }}>{name}</span>
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-full">
      <header className="border-b border-line bg-paper/95 sticky top-0 z-10 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3">
          <a href="#top" className="text-sm font-semibold tracking-[0.18em] uppercase">
            Eudai
          </a>
          <nav className="flex flex-wrap justify-end gap-x-4 gap-y-1 text-sm text-muted">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-ink">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-5">
        <section className="grid gap-10 border-b border-line py-16 md:grid-cols-[1.4fr_0.8fr] md:py-24">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-muted">
              Temporary briefing · group presentation
            </p>
            <h1 className="serif mt-4 max-w-3xl text-5xl leading-[1.05] tracking-tight md:text-6xl">
              Can a matched internet sample stand in for the ANES?
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Stephen Ansolabehere and Douglas Rivers, “Cooperative Survey Research,”
              Annual Review of Political Science, 2013. This page is the group’s
              replication of the 2008 Cooperative Congressional Election Study against
              the American National Election Studies.
            </p>
          </div>
          <aside className="border border-line bg-card p-6">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted">Who speaks</p>
            <ul className="mt-4 space-y-4">
              {[
                ["Opening", "Research question and why it matters"],
                ["Abdullah", "Hypothesis"],
                ["Amelie", "Method"],
                ["Eric", "What the data reveal"],
                ["Rahel", "The article’s conclusion"],
              ].map(([name, job]) => (
                <li key={name}>
                  <Speaker name={name} />
                  <p className="mt-1 text-sm leading-snug">{job}</p>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section id="question" className="scroll-mt-20 grid gap-8 border-b border-line py-16 md:grid-cols-[180px_1fr]">
          <Speaker name="Opening" />
          <div className="max-w-3xl">
            <h2 className="serif text-4xl">What is the research question?</h2>
            <p className="mt-6 text-lg leading-relaxed">
              Opt-in internet surveys are large and cheap, and the people who join them are volunteers.
              The American National Election Studies is the benchmark: an interviewer visits a probability
              sample at home, and that sample is small. The 2008 ANES post-election interview covers about
              2,100 people. The 2008 CCES common sample, after matching, is 32,800.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              The puzzle is whether YouGov’s matched and weighted volunteer survey recovers the same
              relationship between party identification and the presidential vote as the ANES, and the same
              presidential margins as the official returns. The vote is the test, because both checks exist.
            </p>
          </div>
        </section>

        <section id="why" className="scroll-mt-20 grid gap-8 border-b border-line py-16 md:grid-cols-[180px_1fr]">
          <Speaker name="Opening" />
          <div>
            <h2 className="serif text-4xl">Why the answer matters</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Scale", "A national sample of 2,000 people cannot describe a state, a House district, or a small group. Many teams share one CCES and add their own questions."],
                ["The old design", "Face-to-face response rates were already falling by 2013. A method that needs most sampled people to answer the door was a method the field was losing."],
                ["The cost of being wrong", "If matching leaves the volunteer bias in place, a large share of election research describes the panel rather than the electorate."],
              ].map(([title, body]) => (
                <article key={title} className="border border-line bg-card p-5">
                  <h3 className="serif text-2xl">{title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{body}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 max-w-3xl leading-relaxed">
              Rivers, a coauthor, founded Polimetrix, the firm YouGov bought in 2007, and was YouGov’s
              chief scientist. The survey under review is one his firm fielded. That is a reason to check
              it against the ANES and the certified vote.
            </p>
          </div>
        </section>

        <section id="hypothesis" className="scroll-mt-20 grid gap-8 border-b border-line py-16 md:grid-cols-[180px_1fr]">
          <Speaker name="Abdullah" />
          <div className="max-w-3xl">
            <h2 className="serif text-4xl">The hypothesis</h2>
            <p className="mt-6 text-lg leading-relaxed">
              Volunteers differ from the country. The claim is that those differences are carried by
              observable traits: age, race, gender, education, party, registration, religion, and news
              interest. Given those traits, the fact that someone volunteered should say nothing further
              about how they voted. The paper calls that assumption ignorability.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              If it holds, the party slope in the CCES should match the ANES. The published figures are
              −0.313 and −0.312. Vote is coded +1 for Obama, −1 for McCain, and 0 for anyone else, so one
              step toward Republican on the seven-point party scale moves the vote score about a third of
              the way from Obama toward McCain. State errors should be a few points. The prediction is
              about the matched, weighted sample.
            </p>
          </div>
        </section>

        <section id="method" className="scroll-mt-20 grid gap-8 border-b border-line py-16 md:grid-cols-[180px_1fr]">
          <Speaker name="Amelie" />
          <div>
            <h2 className="serif text-4xl">The method</h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed">
              The ANES is a face-to-face probability sample, interviewed at home before the election and
              again after. It is not the exit poll. The CCES is YouGov’s volunteer panel. About 50,800
              people finished the pre-election interview. Matching keeps 32,800.
            </p>
            <ol className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                ["1", "Draw the target", "Real person-records from the 2006 American Community Survey, stratified by age, race, gender, and education. Registration and past turnout are copied on from the Current Population Survey. Religion, party, and news interest come from the 2007 Pew survey."],
                ["2", "Search once per target", "Each target row is one specific person, not a quota bin. YouGov scores completed interviews against that row and keeps the closest panelist. There are about 32,800 searches."],
                ["3", "Charge mismatches", "A race mismatch costs 10. Gender costs 1.5. Thirty years of age costs 1. A party mismatch costs 1.5. A registration mismatch costs up to 4. A poor match is still kept."],
                ["4", "Weight the result", "A logistic propensity score uses age, education, gender, and turnout. Gender, race, education, and age are raked back to the citizen frame. Weights above 7 are cut. The weights are then rescaled so they average 1."],
              ].map(([n, title, body]) => (
                <li key={n} className="border border-line bg-card p-5">
                  <p className="serif text-3xl text-muted">{n}</p>
                  <h3 className="serif mt-2 text-2xl">{title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 max-w-3xl leading-relaxed">
              The target is U.S. citizens, including people who do not vote. Registration keeps unregistered
              people in the sample at roughly their share of adults. It does not drop low-turnout groups to
              imitate the electorate. Our code does not rerun this match. It reads the finished weight, column V201.
            </p>
          </div>
        </section>

        <section id="data" className="scroll-mt-20 border-b border-line py-16">
          <div className="grid gap-8 md:grid-cols-[180px_1fr]">
            <Speaker name="Eric" />
            <div>
              <h2 className="serif text-4xl">What the data reveal</h2>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed">
                On the covariates both files contain — party, age, and race — the party slope is the same
                number in both surveys.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-px bg-line md:grid-cols-3">
            {[
              ["CCES", "−0.317", "Standard error 0.002", "N = 23,681"],
              ["ANES", "−0.317", "Standard error 0.010", "N = 1,538"],
              ["Published table", "−0.313", "ANES published −0.312", "N = 25,814 and 1,436"],
            ].map(([label, value, mid, foot]) => (
              <article key={label} className="bg-ink px-6 py-8 text-paper">
                <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#d9d0c2]">{label}</p>
                <p className="serif mt-3 text-6xl tracking-tight">{value}</p>
                <p className="mt-4">{mid}</p>
                <p className="mt-1 text-[#d9d0c2]">{foot}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-sm text-muted">
            Shared weighted least squares. Outcome is +1 Obama, −1 McCain, 0 another candidate.
            Source: 2008 CCES common content and the 2008 ANES Time Series post-election interview.
          </p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <caption className="sr-only">Shared-model coefficients, CCES and ANES</caption>
              <thead className="border-b border-ink text-xs tracking-[0.14em] uppercase text-muted">
                <tr>
                  <th className="py-3 font-semibold">Covariate</th>
                  <th className="py-3 font-semibold">CCES</th>
                  <th className="py-3 font-semibold">ANES</th>
                  <th className="py-3 font-semibold">Reading</th>
                </tr>
              </thead>
              <tbody className="text-[15px]">
                {[
                  ["Party, 1 to 7", "−0.317", "−0.317", "The slopes match."],
                  ["Age, per 10 years", "−0.040", "−0.050", "Older respondents lean slightly Republican."],
                  ["Black", "+0.260", "+0.325", "A large Obama gap in both surveys."],
                  ["Hispanic", "+0.063", "+0.159", "The subgroup the article already flags."],
                  ["Other race", "+0.014", "+0.259", "The ANES estimate is large and imprecise."],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-line">
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`} className="py-3 pr-4">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["Weights off", "The CCES party slope moves only to −0.320. The ANES slope moves to −0.293. The internet-sample relationship is already in the interviews."],
              ["Vote shares", "Two-party Obama is 53.9% in the CCES and 54.9% in the ANES. CCES Hispanic voters are 65.8% Obama. ANES Latino voters are 77%."],
              ["Official returns", "Across 50 states the CCES is +1.0 point too Democratic, with a typical error of 3.4 points. The article reports +0.27 and 2.43."],
            ].map(([title, body]) => (
              <article key={title} className="border border-line p-5">
                <h3 className="serif text-2xl">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="conclusion" className="scroll-mt-20 grid gap-8 py-16 md:grid-cols-[180px_1fr]">
          <Speaker name="Rahel" />
          <div className="max-w-3xl">
            <h2 className="serif text-4xl">The article’s conclusion</h2>
            <p className="serif mt-6 text-3xl leading-snug">
              A matched, weighted cooperative internet sample can recover the electoral relationships measured by a face-to-face probability survey.
            </p>
            <p className="mt-6 text-lg leading-relaxed">
              In the published table the party slopes agree to the third decimal. State estimates miss by a
              few points, which is what a sample of that size should do. The practical claim is that many
              teams can share one large survey and study states, districts, and groups the ANES cannot resolve.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              The claim covers the processed sample, and it depends on ignorability. The raw panel remains
              too white, too old, and too educated. Our replication reproduces the party result. The state
              check agrees in size and direction, and it does not land on the published decimals. Both
              surveys still overstate turnout: after weighting, 70.7 percent of the CCES say they voted,
              against an eligible-citizen turnout of about 62 percent.
            </p>
          </div>
        </section>
      </main>

      <Chat />
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 pb-24 text-sm text-muted md:flex-row md:justify-between">
          <p>Ansolabehere & Rivers 2013 · 2008 CCES · 2008 ANES Time Series</p>
          <p>Abdullah · Amelie · Eric · Rahel</p>
        </div>
      </footer>
    </div>
  );
}
