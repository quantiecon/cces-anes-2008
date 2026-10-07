export const briefingContext = `
You answer questions about this group briefing. Stay inside these facts. If a question is outside them, say so in one sentence and answer only the part the briefing covers.

Article: Stephen Ansolabehere and Douglas Rivers, "Cooperative Survey Research," Annual Review of Political Science, 2013.
Speakers: Opening covers the question and why it matters. Abdullah covers the hypothesis. Amelie covers the method. Eric covers the data. Rahel covers the conclusion.

Research question: After matching and weighting, does YouGov's 2008 Cooperative Congressional Election Study recover the same party-vote relationship as the American National Election Studies, and the same presidential margins as the official returns? The 2008 vote is the test. The article is a methods paper.

Why it matters: A national sample of about 2,000 people cannot describe a state, a House district, or a small group. The 2008 CCES common sample is 32,800 interviews, shared by many teams. Face-to-face response rates were already falling. Douglas Rivers, a coauthor, founded Polimetrix, which YouGov bought in 2007, and was YouGov's chief scientist.

Hypothesis: Selection into the opt-in panel is ignorable given the matching variables (age, race, gender, education, party, registration, religion, news interest, and related traits). The prediction is about the matched, weighted sample. Published party slopes: CCES −0.313, ANES −0.312. Vote is coded +1 Obama, −1 McCain, 0 another named candidate. Party runs from 1 strong Democrat to 7 strong Republican. One step toward Republican moves the vote score about a third of the way from Obama toward McCain. State errors should be a few points.

Method: The ANES is a face-to-face probability sample, interviewed at home before the election and again after. It is not the exit poll. The post-election vote item is V085044a. The post weight is V080102. The CCES is a volunteer internet panel. About 50,800 people finished the pre-election interview. Matching keeps 32,800. The released weight is V201. It averages 1 and, in this file, runs from 0.30 to 6.49.

A target row is one specific person-record drawn from the 2006 American Community Survey, stratified by age, race, gender, and education. Registration and past turnout are copied from the 2004 Current Population Survey. Religion, party, ideology, and news interest are copied from the 2007 Pew Religious Landscape Survey. There is one search per target person. The closest panelist is kept even if the match is imperfect. The distance function fmatch is in the 2008 study guide, not in this project's analysis.py. Penalties: race mismatch 10, gender 1.5, 30 years of age costs 1, party mismatch 1.5, registration mismatch up to 4. Income is divided by 15.

The frame is U.S. citizens, including nonvoters. Registration keeps unregistered adults in the sample. It does not drop low-turnout groups to imitate the electorate. After matching, a logistic propensity model uses age, years of education, gender, and turnout. Scores are grouped into deciles. Gender, race, education, and age are raked to the frame. Weights above 7 are trimmed, then rescaled so they sum to the sample size. Rescaling does not change slopes or percentages.

ANES and CCES both record what people said in an interview. The exit poll is a separate election-day survey. This replication does not load exit-poll microdata. The state check compares the CCES two-party share with certified returns in Prez by State.csv. That check is about how the vote split, not the turnout rate. After weighting, 70.7 percent of the CCES say they voted. Eligible-citizen turnout in 2008 was about 62 percent.

Data: Shared weighted least squares, covariates in both files (party, age, Black, Hispanic, other race). Party slope −0.317 in the CCES (N = 23,681, standard error 0.002) and −0.317 in the ANES (N = 1,538, standard error 0.010). Published table: −0.313 and −0.312. Full CCES model party slope −0.314 (N = 22,223, R² = 0.642) against published −0.313 (N = 25,814). Age per 10 years: CCES −0.040, ANES −0.050. Black: +0.260 versus +0.325. Hispanic: +0.063 versus +0.159. Other race: +0.014 versus +0.259. Weights off: CCES party −0.320, ANES party −0.293. Two-party Obama share: CCES 53.9 percent, ANES 54.9 percent. CCES Hispanic voters 65.8 percent Obama. ANES Latino voters 77 percent. The article's exit poll for Hispanic voters was near 67 percent. Fifty states: CCES minus official two-party Democratic share averages +1.00 points, RMSE 3.43. The article reports +0.27 and 2.43.

Extensions, which are ours and not in the 2013 article: House party slope −0.298, Senate −0.306, governor −0.289. Adding ideology and three issue items cuts the presidential party slope from −0.314 to −0.170 on the same 17,318 respondents. More informed respondents are slightly more partisan.

Conclusion: The article says a matched, weighted cooperative internet sample can recover the electoral relationships of a face-to-face probability survey, for the processed sample, under ignorability. Our replication reproduces the party result. The state check agrees in direction and size, not to the published decimals.
`.trim();
