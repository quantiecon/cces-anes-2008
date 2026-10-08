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
  lede: "Stephen Ansolabehere and Douglas Rivers posed a practical question about the 2008 election. Could an internet survey of volunteers, once each interview was matched to a Census profile, tell the same story as interviewers who went to people’s homes? Their article, published in 2013, compares the Cooperative Congressional Election Study with the American National Election Studies, and then with the official vote.",
  blocks: [
    {
      heading: "Two very different samples",
      paragraphs: [
        "For the ANES, an interviewer sat down with each respondent at home. About 2,100 people completed the interview after Election Day. That is enough to describe the country. It is too small to say much about a single state, a House district, or a small group of voters.",
        "The CCES was fielded online by YouGov, among people who had already joined a survey panel. Matching kept 32,800 interviews, and many research teams share that one file. Weights allow some interviews to count more than others, so the file resembles the country. The article’s wager is that those two steps make the larger file reliable enough for questions a 2,000-person survey cannot answer.",
      ],
    },
    {
      heading: "The result that matters",
      paragraphs: [
        "The outcome is the 2008 presidential vote, scored +1 for Barack Obama, −1 for John McCain, and 0 for any other named candidate. Party runs from 1, strong Democrat, to 7, strong Republican. The party coefficient is the change in that vote score when a respondent moves one step toward the Republicans. A coefficient near −0.31 lowers the predicted score by about 0.31 points, on a scale from +1 to −1.",
        "Ansolabehere and Rivers report −0.313 in the CCES and −0.312 in the ANES. A model limited to the traits in both files returns −0.317 in each. That agreement is the heart of the finding. The state comparison is gentler in its support. The CCES runs about 1 point more Democratic than the official vote, and a typical state is off by 3.4 points. The article reports 0.27 and 2.43.",
      ],
    },
  ],
  roles: [
    ["Abdullah", "Hypothesis", "/hypothesis", "The claim, and the three findings that would confirm it."],
    ["Amelie and Eric", "Method and data", "/method", "How the samples were built, then the slopes, the groups, and the states."],
    ["Rahel", "Conclusion", "/conclusion", "What held, and the condition attached to that result."],
    ["Whole group", "Replication", "/replication", "What the rerun repeated, and what it added."],
  ],
  sources: [sources.paper, sources.cces, sources.anes],
};

export const hypothesis = {
  kicker: "Hypothesis",
  byline: "Abdullah",
  title: "Volunteering should reveal nothing further about the vote.",
  lede: "People who join an internet panel have already agreed to take surveys, and they are not a random draw from the country. Ansolabehere and Rivers argue that a short list of traits accounts for that difference: age, race, education, party, registration, and a few others. Matching pairs each volunteer with a similar person on the list. After the pair is made, the mere fact of having volunteered should say nothing more about how that person voted.",
  blocks: [
    {
      heading: "What would count as support",
      paragraphs: [
        "The party coefficient should agree in the two surveys. In the article, it is −0.313 in the CCES and −0.312 in the ANES. State estimates of the presidential vote should land within a few points of the certified result. Shares for groups of voters, including Hispanic voters, should sit near the exit poll taken as people left the polls. On that last point, the article finds that the CCES came close and the ANES share for Hispanic voters did not.",
        "The claim is about the matched, weighted file of 32,800 interviews, in which some respondents count more than others so the sample resembles the country. The raw volunteer list is a different matter. It is too white, too old, and too educated. One risk remains. If some reason for joining the panel also predicts the vote, and that reason is missing from the matching list, the distortion stays in the file.",
      ],
    },
  ],
  sources: [sources.paper, sources.rosenbaum],
};

export const method = {
  kicker: "Method and data",
  byline: "Amelie and Eric",
  title: "Two surveys, one equation, then the official count.",
  lede: "The American National Election Studies selects adults at random, each with a known chance of being chosen. An interviewer visits the home before the election and returns afterward. Exit polls, taken as voters leave the polling place, are a separate source. The Cooperative Congressional Election Study is YouGov’s volunteer panel. About 50,800 people finished the pre-election interview. YouGov then searched once for each target person and kept 32,800.",
  steps: [
    ["Draw target rows", "Each target is a person-record from the 2006 American Community Survey, drawn so that age, race, gender, and education appear in the same mix as among U.S. citizens. Registration and past turnout come from the Current Population Survey. Religion, party, and interest in the news come from the Pew Religious Landscape Study. The interviews were invited with a five-way split of age, gender, race, education, and state. Citizens who do not vote remain in the frame."],
    ["Keep the closest interview", "YouGov scores every finished interview against that one record. The score is a distance: each difference adds a penalty, and the lowest total wins. A difference in race costs 10. Gender costs 1.5, party costs 1.5, and a registration mismatch costs as much as 4. Thirty years of age costs 1, and six years of school costs 1. Income is divided by 15, so a nearby bracket barely counts. The closest interview is kept even when the fit is imperfect."],
    ["Weight, then rescale", "Matching chooses who is in the file. A weight then decides how much each interview counts. A yes-or-no model first uses age, education, gender, and turnout. Gender, race, education, and age are brought back into line with the citizen population. Any weight above 7 is cut to 7, so one person cannot count as more than seven interviews. That 7 is a ceiling on the weight, not a limit on how often the matcher may select someone. Dividing every weight by the same constant brings the average to 1, and leaves every percentage and every slope unchanged."],
  ],
  exampleLead: "One target might be a woman, age 34, white, with 16 years of school, living in the South, married, a Democrat, Catholic, and registered. Three finished interviews are scored against her below. News interest, ideology, church attendance, and metropolitan status are treated as matches, so they add nothing. The woman who is six years older is the closest. A perfect match on everything except race is the worst of the three, because race alone costs 10.",
  afterTrim: "After that cut, every weight is divided by the same constant, the one that makes the weights add up to 32,800. The average is then 1, and in this file the finished weights run from 0.30 to 6.49. The largest sits under 7 because the division comes after the cut. An Obama voter counted as 2 and a McCain voter counted as 1 put Obama at two thirds. Multiply both weights by any constant and the share is still two thirds. The vote equation uses that finished weight, column V201. Setting every CCES weight to 1 moves the full-model party coefficient from −0.314 to −0.320. Removing the ANES weight moves its party coefficient from −0.317 to −0.293.",
  resultLead: "The shared model keeps only the traits available in both files: party, age, and race. On that comparison, the party coefficient is the same number in both surveys.",
  otherLead: "Age lines up. The CCES race coefficients sit closer to zero. A coefficient nearer zero means that, once party and age are held fixed, race moves the predicted vote score less. The group’s Obama share is a separate number. The next chart sets the election under both surveys, which is the comparison this rerun just added. Removing the CCES weights moves the party coefficient only from −0.317 to −0.320. The pattern is already in the interviews.",
  shareLead: "Each group has three bars. The top bar is the ANES, the middle bar is the CCES, and the bottom bar is Obama’s share of the Obama–McCain vote in the election. The article had checked Hispanic voters against an exit poll near 67 percent. The third bar now runs that check through every row.",
  shareRead: [
    "All voters. The certified two-party share is 53.7 percent. The CCES bar is 53.9. The ANES bar is 54.9. The CCES is two tenths of a point from the count.",
    "White voters. The exit poll is 43.9 percent. The ANES is 44.2, three tenths away. The CCES is 46.5, about two and a half points more Democratic than the election. That same lean shows up again in the states.",
    "Black voters. The exit poll is 96.0 percent. The CCES is 96.3. The ANES is 99.6. The larger ANES race coefficient is this same gap, left over after party and age.",
    "Hispanic and Latino voters. The exit poll’s two-party share is 68.4 percent. The published figure, the one the article cites, is 67. The CCES is 65.8. The ANES is 77.0. The election bar sits with the CCES.",
    "Other race. The exit poll, pooling Asian voters at 62 percent and the remaining voters at 66 percent, comes to 66.4. The CCES is 52.3. The ANES is 80.1, from 48 voters. The surveys fall on opposite sides of the election. A CCES coefficient near zero is what the regression says about a 52 percent share, and the election puts that share low.",
    "On the rows the election can score, the CCES is the closer survey for the country, for Black voters, and for Hispanic voters. The ANES is closer for white voters. Other race misses on both sides. The smaller CCES race coefficients are the leftover after party and age, in the survey that still matches the Black and Hispanic shares.",
  ],
  turnout: "Both surveys record what people said about voting. Neither checks the official list of who cast a ballot. After weighting, 70.7 percent of the CCES say they voted. Turnout among eligible citizens in 2008 was about 62 percent.",
  sources: [sources.paper, sources.cces, sources.anes, sources.acs, sources.cps, sources.pew, sources.yougov, sources.fec, sources.turnout],
};

export const conclusion = {
  kicker: "Conclusion",
  byline: "Rahel",
  title: "The matched CCES can stand in for the ANES on this vote question.",
  lede: "That is the article’s conclusion. Many research teams share the CCES, a single online survey. Matching pairs each volunteer with a similar person in the Census, and weighting lets some interviews count more than others. After both steps, the CCES recovered the same link between party and vote as the face-to-face ANES. One large file can then speak to states, districts, and groups that a 2,000-person study measures poorly.",
  blocks: [
    {
      heading: "The condition",
      paragraphs: [
        "The finding applies to the finished file, and it depends on volunteering adding nothing about the vote once the matching traits are known. The raw panel remains skewed. A distortion tied to something outside that list would still be in the data.",
        "Rivers founded the firm YouGov later bought, and he served as its chief scientist. The article discloses this. The outside checks, the ANES and the certified vote, are what make the result credible.",
      ],
    },
    {
      heading: "What the rerun adds",
      paragraphs: [
        "The shared party coefficient is −0.317 in both surveys. The fuller CCES model gives −0.314, against −0.313 in the published table. The state comparison agrees in direction and in size: +1.0 and 3.4 points here, +0.27 and 2.43 in the article. The decimals themselves differ.",
        "The smaller CCES race coefficients are not a smaller Obama vote. They are what race still adds after party and age. Against the certified two-party share and the exit poll, the CCES is closer for the country, for Black voters, and for Hispanic voters. The ANES is closer for white voters. Neither survey matches the exit poll for other race, and that ANES cell is 48 voters.",
      ],
    },
  ],
  sources: [sources.paper, sources.yougov, sources.repo],
};

export const replication = {
  kicker: "Replication",
  byline: "Whole group",
  title: "What the rerun repeated, and what it left alone.",
  lede: "The group estimated the same vote equation in two files: the 2008 CCES and a Berkeley extract of the 2008 ANES. An extract is a selection of columns from the full study. The script reads the finished CCES weight, column V201. YouGov’s distance match, the step that chooses the closest interview for each target, lives in the 2008 study guide and was left as published.",
  blocks: [
    {
      heading: "The files",
      paragraphs: [
        "The CCES file holds 32,800 interviews and 477 columns. The ANES extract holds 2,323 rows and ten columns: weights, race, Latino status, age, the party items, and the post-election vote. Gender, education, self-reported income, and home ownership are absent, so the article’s full list of traits can be estimated only in the CCES.",
        "Respondents missing a vote, a party, or a positive weight drop out. The shared model uses 23,681 CCES interviews and 1,538 ANES interviews. The article’s CCES sample is 25,814. This one is smaller because it sets aside people who skipped income, answered “not sure” on party, or named no candidate. The party coefficient still agrees.",
      ],
    },
    {
      heading: "Beyond the article",
      paragraphs: [
        "The figures that follow are the group’s, beyond the article. Party coefficients for offices further down the ballot stay near −0.3: House −0.298, Senate −0.306, governor −0.289. Among the same 17,318 respondents, adding ideology and three issue questions moves the presidential party coefficient from −0.314 to −0.170.",
      ],
    },
  ],
  sources: [sources.repo, sources.cces, sources.anes, sources.sda, sources.paper, sources.fec],
};
