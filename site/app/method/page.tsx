import { Article } from "@/components/article";
import { DistanceChart, ElectionMap, ErrorMap, FlowChart, GroupChart, MatchExample, SlopeDots, StateChart } from "@/components/charts";
import { ComparisonTables, DesignFigure } from "@/components/figures";
import { method } from "@/content/copy";

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
      <p className="mt-10 max-w-3xl text-lg leading-relaxed">
        The panel below sets the two designs side by side. YouGov builds the CCES column in the three steps that follow.
      </p>
      <DesignFigure />
      <ol className="mt-10 max-w-3xl space-y-6">
        {method.steps.slice(0, 2).map(([title, body], index) => (
          <li key={title}>
            <h2 className="serif text-2xl">
              {index + 1}. {title}
            </h2>
            <p className="mt-3 leading-relaxed">{body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-8 max-w-3xl leading-relaxed">
        The second step keeps the closest interview. The chart shows the penalty for each kind of mismatch. A difference in race outweighs the rest.
      </p>
      <DistanceChart />
      <p className="max-w-3xl leading-relaxed">{method.exampleLead}</p>
      <MatchExample />
      <ol className="max-w-3xl space-y-6" start={3}>
        {method.steps.slice(2).map(([title, body]) => (
          <li key={title}>
            <h2 className="serif text-2xl">3. {title}</h2>
            <p className="mt-3 leading-relaxed">{body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-8 max-w-3xl leading-relaxed">{method.afterTrim}</p>
      <p className="mt-8 max-w-3xl leading-relaxed">
        Matching and weighting leave a smaller file than the list of people who finished the interview. The shared model is smaller still.
      </p>
      <FlowChart />
      <section className="mt-12">
        <div className="max-w-3xl">
          <h2 className="serif text-2xl">The shared result</h2>
          <p className="mt-4 leading-relaxed">{method.resultLead}</p>
        </div>
        <ComparisonTables />
        <p className="max-w-3xl leading-relaxed">{method.otherLead}</p>
        <SlopeDots />
        <p className="max-w-3xl leading-relaxed">{method.shareLead}</p>
        <GroupChart />
        <div className="max-w-3xl">
          <h2 className="serif text-2xl">What the election bar shows</h2>
          <div className="mt-4 space-y-4">
            {method.shareRead.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed">
          The party coefficient can agree even where a state is off. The first map shows who won. The second, drawn on the same outlines, shows where the CCES missed the official share. The bars below give the points.
        </p>
        <div id="maps" className="mt-6 grid scroll-mt-20 gap-6 lg:grid-cols-2">
          <ElectionMap />
          <ErrorMap />
        </div>
        <StateChart />
        <p className="max-w-3xl leading-relaxed">{method.turnout}</p>
      </section>
    </Article>
  );
}
