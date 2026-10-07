# Cooperative Survey Research

Ansolabehere and Rivers, *Annual Review of Political Science* (2013).
Group replication of the 2008 Cooperative Congressional Election Study against the American National Election Studies.

**Speakers**

| Question | Speaker |
|---|---|
| What is the research question? | Opening (not assigned) |
| Why does the question matter? | Opening (not assigned) |
| What is the hypothesis? | Abdullah |
| What method is used? | Amelie |
| What do the data reveal? | Eric |
| What is the article’s conclusion? | Rahel |

The slides in `presentation/CCES-ANES-slides.pptx` follow this order. Each content slide is labeled with the speaker. The notes under each slide are a spoken script.

---

## 1. What is the research question?

Opt-in internet surveys are large and inexpensive. The people who join them are volunteers. They are not a random draw from the adult population, and people without internet never appear. The American National Election Studies is the benchmark the field has used for decades: an interviewer visits a probability sample of Americans at home. That design is slow, expensive, and, by 2008, already struggling with falling response rates. The ANES post-election sample in 2008 is about 2,100 people. A sample that size can describe the nation. It cannot say much about a single state, a congressional district, or a small demographic group.

The puzzle in the article is whether a different design can stand in for that benchmark. The Cooperative Congressional Election Study, fielded by YouGov, recruits volunteers online, matches them to a Census-like portrait of the country, and weights the matched cases. The research question is:

**After matching and weighting, does this voluntary internet survey recover the same relationship between party identification and the presidential vote as the ANES, and the same vote margins as the official election returns?**

The article is a methods paper. It is not a paper about why Obama won. The outcome, the 2008 vote, is the test. If a cheap matched sample and an expensive probability sample tell the same story about a fact we can also check against the certified vote, the matched sample can be used for the questions the ANES is too small to answer.

---

## 2. Why is it important to answer?

Three stakes follow from the question.

**Scale.** Representation, House elections, and state politics are studied one district or one state at a time. A national sample of 2,000 people leaves only a handful of respondents in a typical district. The 2008 CCES common-content sample is 32,800 interviews. Many academic teams share that sample. Each team buys a module of extra questions asked of about 1,000 people, and every team can use the common questions asked of everyone. Cooperation is what makes the large sample affordable.

**The collapse of the old design.** Face-to-face and telephone probability surveys depend on people answering the door or the phone. Response rates had fallen sharply by the time of this article. A method that only works when most sampled people cooperate is a method the field was already losing. Political science needed evidence on whether an opt-in panel, handled carefully, could replace it for electoral research.

**The cost of being wrong.** By 2013 a large share of new election studies used cooperative internet samples. If matching and weighting leave the volunteer bias in place, those studies are describing the panel, not the electorate. If matching and weighting succeed, the field has a practical way to study small electorates and to let many researchers share one instrument.

The article’s own disclosure belongs in this section. Douglas Rivers, a coauthor, founded Polimetrix, the firm YouGov bought in 2007, and he was YouGov’s chief scientist. The survey being validated is a survey his firm fielded. That does not decide the result. It is a reason to check the result against the ANES and against the official vote, which is what the paper does and what this replication does again.

---

## 3. What is the hypothesis? — Abdullah

The hypothesis has two layers: a statistical assumption, and the empirical prediction that follows from it.

### The assumption

People who join an internet panel differ from people who do not. The raw panel is too white, too old, and too educated. The paper’s claim is that those differences are carried by observable characteristics: age, race, gender, education, income, marital status, registration, party, ideology, religion, and news interest. If, once you know those characteristics, knowing that someone volunteered for the panel tells you nothing more about how they voted, then selection is ignorable. Conditioning on the characteristics is enough to remove the bias.

That is the hypothesis in one sentence. **Selection into the opt-in sample is independent of the vote, given the matching variables.** If the assumption fails, matching on those variables leaves a bias the weights cannot see. A taste for internet surveys that also happens to be a taste for a candidate, unrelated to age, race, education, and party, would survive the procedure.

### What the hypothesis predicts in the data

If ignorability holds, three things should be true for 2008.

1. The regression of presidential vote on party identification and demographics in the CCES should match the same regression in the ANES. The published party coefficients are −0.313 in the CCES and −0.312 in the ANES.
2. CCES vote shares for groups should sit close to the exit poll. The paper’s comparison is especially pointed for Hispanic voters, where the ANES share is the one that misses.
3. CCES state estimates of the presidential vote should sit close to the certified returns. The paper reports an average error of +0.27 percentage points and a root mean square error of 2.43 points.

The hypothesis is about the **matched and weighted** sample. It is not a claim that the list of volunteers, before matching, looks like the country.

### How to read the number the hypothesis is about

Presidential vote is coded Obama = +1, McCain = −1, and any other named candidate = 0. Party identification runs from 1 (strong Democrat) to 7 (strong Republican). A party coefficient of about −0.31 means that one step toward the Republicans is associated with the vote score moving about a third of the way from Obama toward McCain, holding age and race fixed. “The slopes match” means both surveys estimate that same step.

---

## 4. What method is being used? — Amelie

The method has two pieces. YouGov builds the CCES sample. The article, and this replication, then estimate the same equation in the CCES and the ANES.

### The two surveys

The **ANES 2008 Time Series** is a face-to-face probability sample. Addresses are drawn so that eligible adults have a known chance of selection. Respondents are interviewed before the election and again after. The post-election weight (`V080102`) adjusts for unequal selection probabilities and for who completed the second interview. It is scaled so the average weight is 1. A weight of 0 means there is no post-election interview, and that person is dropped.

The **2008 CCES** is a volunteer internet survey run by YouGov, formerly Polimetrix. Respondents had already joined a panel. YouGov also drew interviews from the E-Rewards and Western Wats panels. About 50,800 people finished the pre-election questionnaire. Matching keeps 32,800. The weight on the public file is column `V201`. In the file we use, those weights average exactly 1 and run from 0.30 to 6.49.

### How YouGov turns volunteers into the CCES sample

**The target.** YouGov builds a synthetic portrait of U.S. citizens from the 2006 American Community Survey: age, race, gender, education, marital status, children, family income, employment, citizenship, state, and metropolitan area. Registration and turnout come from the November 2004 Current Population Survey. Religion, church attendance, born-again status, news interest, party identification, and ideology come from the 2007 Pew Religious Landscape Survey. A target sample is then drawn so that age, race, gender, and education match the country. Each target row is a description, not a person who can be emailed.

**The distance.** For each description, YouGov searches the completed interviews and keeps the panelist with the smallest weighted distance. The 2008 formula, printed in the study guide, is a sum of penalties:

- gender difference costs 1.5
- each year of age costs 1/30, so a 30-year gap costs 1
- a race mismatch costs 10
- a region mismatch costs 1
- six years of education costs 1
- a party-identification mismatch costs 1.5
- a registration mismatch costs up to 4
- income is divided by 15, so income is allowed to be somewhat off

A larger penalty means that factor has to match. Because race costs 10 and almost everything else costs about 1, the nearest panelist is almost always someone of the same race. The kept sample is forced to have nearly the same mix of race, gender, age, education, region, party, and registration as the target. That is how a skewed panel becomes a sample whose margins look like the country **on the factors in the formula**. An attitude that is unrelated to those factors is not balanced.

This function does not live in our analysis code. YouGov ran it before releasing the file. The code reads the weight column that the matching and the next step left behind.

**The propensity score.** Matching is close, not exact. YouGov stacks the matched interviews and the target frame and estimates a logistic regression for the probability that a row came from the frame. In 2008 that regression uses age, years of education, gender, and turnout. Logistic regression is a regression whose output is a probability between 0 and 1. That probability is the propensity score. People whose characteristics are common in the internet sample and rare in the frame are down-weighted. The scores are cut into ten bins and adjusted so each bin is a tenth of the weighted sample. A further raking step forces the weighted margins of gender, race, education, and age to match the frame. Any weight above 7 is cut to 7, so one unusual person cannot count as more than seven interviews.

**Rescaling.** Multiplying every weight by the same constant does not change a weighted percentage or a regression slope. After trimming and raking, YouGov divides through so the weights sum to the number of interviews. The average weight is then 1. A weight of 2 means “count this interview twice.” The reported sample size stays the number of people who answered.

### The comparison equation

Both files are put through the same regression. The outcome is the coded presidential vote. The predictors are the covariates: the variables held constant so that the party coefficient is the association between party and vote among people of the same age, race, and so on.

The ANES extract does not contain gender, education, self-reported income, or home ownership. The comparison that can be made in both files uses party, age (in decades), and indicators for Black, Hispanic, and other race. A separate CCES-only regression uses the paper’s full list, which adds gender, education, income, and home ownership.

The estimator is weighted least squares. Each person’s pull on the line is multiplied by their survey weight. The unweighted runs set every weight to 1. The number in parentheses in the results is a robust standard error. A separate logit drops anyone who named a candidate other than Obama or McCain and predicts the probability of an Obama vote. Logit coefficients are log-odds. They are compared with each other, not with the linear slopes of −0.32.

A second check ignores the regression and compares weighted CCES state shares of the two-party presidential vote with the official returns.

---

## 5. What do the data reveal? — Eric

### What the files actually contain

The CCES file, `cces_2008_common.dta`, has 32,800 rows and 477 columns. One row is one person who finished the interview and was kept after matching. The unmatched pool and the Census target are not in the download. Values are integer codes. A real row is a weight of 0.55, state code 26, birth year 1950, gender 2 (female), race 1 (white), education 2, income 12, party 2 (not very strong Democrat), and vote 2 (Obama). Vote code 1 is McCain. About 8,800 rows have no presidential vote. Party code 8, “not sure,” is 867 people. The regression drops missing votes, missing covariates, and nonpositive weights.

The ANES file is the Berkeley extract: 2,323 rows and the 10 columns that were downloaded. It has the pre and post weights, race, Latino status, age, the three pieces of party identification, an interviewer income estimate, and the presidential vote. Vote code 1 is Obama and code 3 is McCain. It does not have gender, education, home ownership, or self-reported income. That is why the full published covariate list is estimated on the CCES only.

The analysis code recodes vote to +1, 0, or −1, builds the 7-point party scale, and divides age by 10. It does not recompute YouGov’s distance or propensity model.

### The result the article is about

On the shared covariates, the party slope is **−0.317 in the CCES** (N = 23,681) and **−0.317 in the ANES** (N = 1,538). The published table reports −0.313 and −0.312. One step toward Republican corresponds to the same shift in the vote score in both surveys.

The standard errors are 0.002 and 0.010. The CCES line is estimated much more precisely because the sample is about fifteen times larger. A gap of a few hundredths between the slopes would still be ordinary noise on the ANES side. There is no gap.

The full CCES model, with gender, education, income, and home ownership added, gives a party slope of **−0.314** (N = 22,223, R² = 0.642). The published coefficient is −0.313 (N = 25,814, R² = 0.635). Our N is smaller because people who refused income, said “not sure” on party, or named no candidate are dropped. The slope still matches.

R² near 0.64 means the covariates, above all party identification, account for about 64 percent of the variation in the coded vote. That is a high number for an individual vote equation, and it is high in both surveys (ANES shared-model R² is 0.588).

### The other coefficients

These are the shared-model slopes. Each one is the change in the vote score associated with that covariate, holding the others fixed. The comparison is CCES minus the pattern in the ANES, coefficient by coefficient.

| Covariate | CCES | ANES | How to read it |
|---|---|---|---|
| Party (1–7) | −0.317 | −0.317 | The slopes match. |
| Age, per 10 years | −0.040 | −0.050 | Older respondents are slightly more Republican. The gap is one hundredth. |
| Black | +0.260 | +0.325 | Relative to non-Black respondents, Black respondents score closer to Obama. Both surveys show a large gap. The ANES gap is larger. |
| Hispanic | +0.063 | +0.159 | Both positive. The ANES association is more than twice the CCES association. This is the subgroup the article already flags. |
| Other race | +0.014 | +0.259 | The ANES coefficient is large and imprecise (standard error 0.097). The CCES coefficient is about zero. |

On the full CCES list, the extra slopes are small or moderate and match the published table: education +0.031, home ownership −0.093, income +0.002, female −0.006. Income and gender are distinguishable from zero only in the sense that the estimates are near zero. Home ownership is associated with a more Republican vote score of about 0.09.

Race is not coded the same way in the two files. The CCES puts Hispanic inside the race question. The ANES asks race and Latino status separately. Part of the Hispanic gap can come from that difference in the question, not only from the sample.

### Weights on and off

Turning the CCES weights off moves the party slope from −0.317 to −0.320 on the shared list, and from −0.314 to −0.320 on the full list. The relationship is already in the interviews. Matching has done most of the work before the weight column is applied.

Turning the ANES weights off moves the party slope from −0.317 to −0.293. In a sample of about 1,500, the weights move the answer. They do not move it to a different conclusion. Both numbers are still a slope of about −0.3.

### Vote shares, which are not regression coefficients

Among people who voted for Obama or McCain, the weighted Obama share is **53.9 percent in the CCES** (n = 23,585) and **54.9 percent in the ANES** (n = 1,539). Within the CCES: men 50.7, women 57.0, white respondents 46.5, Black respondents 96.3, Hispanic respondents 65.8. The ANES Latino share is 77.0 (n = 275). The article reports that the exit poll was near 67 percent and that the CCES, not the ANES, landed on it. Our CCES Hispanic figure of 65.8 is that finding. Our ANES Latino figure of 77 is the miss the article describes.

### States

Averaged over 50 states, the weighted CCES two-party Democratic share minus the official share is **+1.00 percentage points**. The root mean square error is **3.43 points**. The article reports **+0.27 and 2.43**. The survey leans slightly Democratic relative to the certified vote, and a typical state is off by a few points. The sign and the size agree. The exact published figures do not. This is the weaker half of the replication. Likely sources of the difference are the official-returns file, the treatment of third-party votes, and listwise differences in who counts as a voter. They are not large enough to reverse the article’s claim that state error is a few points rather than ten.

### What this replication added, beyond the article

These are our extensions. They are not in the 2013 article, and they should be described that way.

The same party slope appears down the ballot: president −0.314, U.S. House −0.298, U.S. Senate −0.306, governor −0.289. Party structures House, Senate, and governor votes almost as strongly as the presidential vote. The fit is weaker (R² falls from 0.64 to 0.49 for governor) because those contests are less national.

Adding ideology and three issue items, on the same 17,318 respondents, cuts the party slope from −0.314 to −0.170 and raises R² from 0.649 to 0.741. A large part of what looks like a party effect is shared issue and ideology position. Opposition to guaranteed health insurance has a slope of −0.281 on the four-point scale.

More informed respondents are slightly more partisan, not less. The party slope is −0.320 among people who follow news most of the time and −0.304 among everyone else. It is −0.322 among people who know Democrats held the House and −0.290 among people who do not.

State errors are only partly systematic. A regression of the 50 state errors on the log of the state sample size and the state’s Black and Hispanic shares has R² = 0.149. Larger state samples are associated with less Democratic overstatement. The Hispanic share of the state sample is not.

---

## 6. What is the article’s ultimate conclusion? — Rahel

The article concludes that a cooperative opt-in internet survey, after sample matching and propensity weighting, can recover the electoral quantities that a face-to-face probability survey recovers.

The evidence it treats as decisive is the agreement of the regressions. In the published 2008 table the party coefficient is −0.313 in the CCES and −0.312 in the ANES. Age, education, income, and home ownership line up as well. The CCES also tracks official state returns with an error on the order of sampling variation, and it tracks group vote shares, including Hispanic voters, at least as well as the ANES. From that, the authors draw a practical conclusion: many teams can share one large matched sample and study states, districts, and subgroups that a 2,000-person face-to-face study cannot resolve.

The conclusion is conditional. It holds for the matched and weighted sample, under the ignorability assumption, for outcomes tied to the characteristics in the match. It is not a conclusion that volunteers are a random sample, and it is not a conclusion that every opt-in poll, without this procedure, is interchangeable with the ANES. The raw panel remains skewed. Representativeness is produced by the distance match and the weights. A bias that is independent of those variables is still in the data.

Our replication supports the part of the conclusion the article leans on. The shared party slope is −0.317 in both surveys, and the full CCES slope is −0.314 against a published −0.313. Turning the CCES weights off does not change that story. The state check agrees in direction and in order of magnitude, and it does not reproduce +0.27 and 2.43. The right summary for the group is: the article’s claim about the party-vote relationship is reproduced; the article’s claim about state accuracy is supported more loosely; both are claims about YouGov’s processed sample, not about the unprocessed list of volunteers.

---

## What each person can say, in order

**Opening, about one minute.** State the puzzle in two sentences: volunteers online versus a probability sample at the door. Then say why the answer matters: the ANES is too small for states and districts, response rates were already falling, and a large part of election research now uses this cooperative design.

**Abdullah, about two minutes.** State ignorability without the jargon first: once we know the matching characteristics, volunteering itself should not predict the vote. Then give the prediction: party slopes near −0.31 in both surveys, and state errors of a few points. Close on the limit: the hypothesis is about the matched sample, and it fails if the remaining bias is unrelated to the matching variables.

**Amelie, about three minutes.** Walk the four YouGov steps: Census-like target, distance match, propensity weight, rescale to sample size. Name the race penalty of 10 so the distance is concrete. Then say what we estimate: the same vote equation in both files, weights on, and a state comparison with the official returns. Mention that our code uses the finished weight and does not rerun the match.

**Eric, about three minutes.** Put the −0.317 and −0.317 result up first. Then one sentence on the standard errors, one on weights barely moving the CCES, and one on the Hispanic share and the state error of +1.0 and 3.4 against the article’s +0.27 and 2.43. If there is time, the issue model is the new finding: party falls from −0.314 to −0.170 once ideology and issues are included.

**Rahel, about two minutes.** Give the article’s sentence: the matched cooperative sample recovers the ANES relationships and the official margins closely enough to use. Then the condition: only after matching and weighting, and only if ignorability holds. Then our sentence: we reproduce the party result exactly in the shared model, and we reproduce the state result in size but not to the published decimal.
