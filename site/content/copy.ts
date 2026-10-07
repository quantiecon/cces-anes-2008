export type Source = { label: string; href: string };

export const sources = {
  paper: {
    label: "Ansolabehere and Rivers, “Cooperative Survey Research,” Annual Review of Political Science (2013)",
    href: "https://doi.org/10.1146/annurev-polisci-022811-160625",
  },
  cces: {
    label: "2008 Cooperative Congressional Election Study (CCES), Harvard Dataverse",
    href: "https://doi.org/10.7910/DVN/YUYIVB",
  },
  anes: {
    label: "2008 ANES Time Series, American National Election Studies",
    href: "https://electionstudies.org/data-center/2008-time-series-study/",
  },
  sda: {
    label: "2008 ANES on Berkeley’s Survey Documentation and Analysis site (dataset nes2008)",
    href: "https://sda.berkeley.edu/sdaweb/analysis/?dataset=nes2008",
  },
  acs: {
    label: "American Community Survey, U.S. Census Bureau",
    href: "https://www.census.gov/programs-surveys/acs",
  },
  cps: {
    label: "Voting and registration, Current Population Survey, U.S. Census Bureau",
    href: "https://www.census.gov/topics/public-sector/voting.html",
  },
  pew: {
    label: "Religious Landscape Study, Pew Research Center",
    href: "https://www.pewresearch.org/religion/religious-landscape-study/",
  },
  yougov: {
    label: "YouGov, the survey firm that runs the CCES panel",
    href: "https://yougov.com/about/about",
  },
  rosenbaum: {
    label: "Rosenbaum and Rubin, “The central role of the propensity score,” Biometrika (1983)",
    href: "https://doi.org/10.1093/biomet/70.1.41",
  },
  fec: {
    label: "Federal election results, Federal Election Commission",
    href: "https://www.fec.gov/introduction-campaign-finance/election-results-and-voting-information/",
  },
  turnout: {
    label: "2008 general election turnout, United States Elections Project",
    href: "https://www.electproject.org/2008g",
  },
  repo: {
    label: "This group’s replication code and results",
    href: "https://github.com/quantiecon/cces-anes-2008",
  },
} as const;

export const overview = {
  kicker: "Overview",
  byline: "Opening",
  title: "Can a matched internet survey stand in for the ANES?",
  lede: "Ansolabehere and Rivers ask a practical question about the 2008 election. The Cooperative Congressional Election Study (CCES) is an internet survey of volunteers. YouGov, the survey firm that runs it, matches each volunteer interview to a Census profile of U.S. citizens. After that matching, does the CCES give the same presidential result as the American National Election Studies (ANES), a face-to-face survey? And does it give the same margins as the official vote?",
  blocks: [
    {
      heading: "The two samples",
      paragraphs: [
        "The ANES sent interviewers to people’s homes. About 2,100 people finished the interview after the election. That is enough to describe the whole country. It is too few to describe one state, one House district, or a small group.",
        "The CCES is run online by YouGov, using volunteers. Matching kept 32,800 interviews. Many research teams share this one file. Weighting counts some interviews more than others so the sample looks like the country. The article’s bet is that matching plus weighting make this large file usable. Then it can answer questions a 2,000-person survey cannot.",
      ],
    },
    {
      heading: "What the group is checking",
      paragraphs: [
        "The outcome is the 2008 presidential vote. It is coded +1 for Obama, −1 for McCain, and 0 for anyone else. Party runs from 1, strong Democrat, to 7, strong Republican. The party coefficient is how much the vote score changes for each one-step move on that party scale. A party coefficient near −0.31 means one step toward the Republicans lowers the predicted vote score by about 0.31 points. That score runs from +1 for Obama to −1 for McCain.",
        "The article reports a party slope, another name for this coefficient, of −0.313 in the CCES and −0.312 in the ANES. Our shared model, which uses only traits both surveys contain, gets −0.317 in both. That match is the main result. The state check, which compares the CCES vote in each state with the official result, is weaker. We are about 1 point too Democratic on average. The typical state error is 3.4 points. The article reports 0.27 and 2.43.",
      ],
    },
  ],
  roles: [
    ["Abdullah", "Hypothesis", "/hypothesis"],
    ["Amelie and Eric", "Method and data", "/method"],
    ["Rahel", "Conclusion", "/conclusion"],
    ["Whole group", "Replication", "/replication"],
  ],
  sources: [sources.paper, sources.cces, sources.anes],
};

export const hypothesis = {
  kicker: "Hypothesis",
  byline: "Abdullah",
  title: "Volunteering should not tell us anything extra about the vote.",
  lede: "An internet panel is a standing pool of people who agree to take surveys. People who join one are not a random slice of the country. The claim is that a short list of traits explains how they differ: age, race, education, party, registration, and a few related traits. Matching pairs each volunteer with a similar person on those traits. Once the traits are matched, knowing that someone volunteered should tell you nothing more about how they voted.",
  blocks: [
    {
      heading: "What would count as support",
      paragraphs: [
        "First, the party slope should match across the two surveys. The party slope is how much the vote changes with each step toward Republican on the party scale. It should be the same in the CCES, the online volunteer survey, and the ANES, the face-to-face survey. The article’s numbers are −0.313 and −0.312. Second, state estimates of the presidential vote should miss the certified result, the official count, by a few points, not by ten. Third, vote shares for groups, including Hispanic voters, should sit near the exit poll, a survey of voters leaving the polls. The article says the CCES did that and the ANES Hispanic share did not.",
        "The claim is about the matched and weighted file of 32,800. Weighted means some interviews count more than others so the file looks like the country. The claim is not that the raw volunteer list looks like the country. That list is too white, too old, and too educated. One risk remains. Suppose a reason for joining the panel also predicts the vote, and it is not one of the matching traits. That bias would survive the whole procedure.",
      ],
    },
  ],
  sources: [sources.paper, sources.rosenbaum],
};

export const method = {
  kicker: "Method and data",
  byline: "Amelie and Eric",
  title: "Two surveys, one equation, then the official count.",
  lede: "The American National Election Studies (ANES) is a probability sample, meaning people were chosen at random with a known chance of selection. They were interviewed at home before the election and again after. It is not the exit poll. The Cooperative Congressional Election Study (CCES) is YouGov’s volunteer panel. About 50,800 people finished the pre-election interview. YouGov ran one search per target person, described below, and kept 32,800.",
  steps: [
    ["Draw target rows", "A target row is one real person-record from the 2006 American Community Survey, a large Census Bureau survey. Each target sits inside an age × race × gender × education cell, meaning one combination of those traits. Registration and past turnout are copied in from the Current Population Survey. Religion, party, and news interest are copied in from the Pew Religious Landscape Study. The frame, the population the targets stand for, is U.S. citizens. It includes people who do not vote."],
    ["Keep the closest interview", "YouGov gives every finished interview a distance score against that one row. A higher score means a worse match. It keeps the interview with the lowest score. A race mismatch costs 10. A gender mismatch costs 1.5. Thirty years of age difference costs 1. A party mismatch costs 1.5. A registration mismatch costs up to 4. The closest interview is kept even when the match is weak."],
    ["Weight, then rescale", "A weight sets how much each interview counts. First, a logistic model, a regression for a yes-or-no outcome, uses age, education, gender, and turnout. Next, gender, race, education, and age are forced back to the citizen frame. Any weight above 7 is cut. Last, all weights are divided by the same constant so the average weight is 1. This does not change any percentage or slope."],
  ],
  resultLead: "The shared model uses only the traits both files contain: party, age, and race. The party slope is how much the vote score changes for each step toward Republican on the party scale. In the shared model, the party slope is the same number in both surveys.",
  otherLead: "The other shared slopes are close. A covariate, in the table below, is a trait the model holds constant. Hispanic is the one gap, and the article already flags it. Turning the CCES weights off moves the party slope only from −0.317 to −0.320. So the relationship is already in the interviews.",
  shareLead: "The two-party share counts only people who chose Obama or McCain. Among them, the weighted Obama share is 53.9% in the CCES and 54.9% in the ANES. The state check compares the CCES with the official vote in each of the 50 states. The CCES is +1.0 point too Democratic on average. The typical state error is 3.4 points.",
  turnout: "Both surveys record what people said about voting. Neither checks the voter file, the official record of who voted. After weighting, 70.7% of the CCES say they voted. Actual turnout among eligible citizens in 2008 was about 62%.",
  sources: [sources.paper, sources.cces, sources.anes, sources.acs, sources.cps, sources.pew, sources.yougov, sources.fec, sources.turnout],
};

export const conclusion = {
  kicker: "Conclusion",
  byline: "Rahel",
  title: "The matched CCES can stand in for the ANES on this vote question.",
  lede: "That is the article’s conclusion. The CCES is a cooperative internet sample, meaning many research teams share one online survey. Matching pairs each volunteer with a similar person in Census data. Weighting makes some interviews count more than others. After both steps, the CCES found the same party–vote link as the ANES, the face-to-face survey. So teams can share one large file. They can study states, districts, and groups that a 2,000-person study cannot measure well.",
  blocks: [
    {
      heading: "The condition",
      paragraphs: [
        "The result holds only for the processed sample. It also holds only if volunteering adds nothing about the vote once the matching traits are known. The raw panel is still skewed. A bias unrelated to those traits is still in the data.",
        "Rivers founded the firm YouGov bought and was its chief scientist. The article says so. That is why the outside checks matter: the ANES and the certified vote, meaning the official count.",
      ],
    },
    {
      heading: "What our rerun adds",
      paragraphs: [
        "The party slope is how much the vote score changes for each step toward Republican on the party scale. Our shared party slope is −0.317 in both surveys. Our full CCES slope is −0.314. The published table gives −0.313. The state check agrees in direction and in size: +1.0 and 3.4 points here, +0.27 and 2.43 in the article. It does not reproduce those exact decimals.",
      ],
    },
  ],
  sources: [sources.paper, sources.yougov, sources.repo],
};

export const replication = {
  kicker: "Replication",
  byline: "Whole group",
  title: "What we reran, and what we did not.",
  lede: "We estimated the same vote equation in two files. One is the 2008 CCES, the online volunteer survey. The other is a Berkeley extract of the 2008 ANES, the face-to-face survey. An extract is a set of columns downloaded from the full file. Our script reads the finished CCES weight, column V201. It does not rerun YouGov’s distance match, the step that picks the closest interview for each target person. That function lives in the 2008 study guide, not in our code.",
  blocks: [
    {
      heading: "The files",
      paragraphs: [
        "The CCES file has 32,800 rows and 477 columns. Each row is one kept interview. The ANES extract has 2,323 rows and the ten columns we downloaded: weights, race, Latino status, age, the party items, and the post-election vote. It has no gender, education, self-reported income, or home ownership. So the full published covariate list, the traits the article’s model holds constant, can only be used in the CCES.",
        "People missing a vote, a party, or a positive weight are dropped. The shared model uses 23,681 CCES interviews and 1,538 ANES interviews. The paper’s CCES sample is 25,814. Ours is smaller because we drop people who skipped income, said “not sure” on party, or named no candidate. The party slope, how much the vote changes per step on the party scale, still matches.",
      ],
    },
    {
      heading: "Beyond the article",
      paragraphs: [
        "These next numbers are ours, not the article’s. Party slopes for races lower on the ballot stay near −0.3: House −0.298, Senate −0.306, governor −0.289. On the same 17,318 respondents, adding ideology and three issue questions cuts the presidential party slope from −0.314 to −0.170.",
      ],
    },
  ],
  sources: [sources.repo, sources.cces, sources.anes, sources.sda, sources.paper, sources.fec],
};
