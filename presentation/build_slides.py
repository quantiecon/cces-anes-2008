"""Build the group presentation deck. Run from the project root."""

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.util import Emu, Inches, Pt

OUT = "presentation/CCES-ANES-slides.pptx"

W, H = Inches(13.333), Inches(7.5)
BG = RGBColor(0xF4, 0xF1, 0xEA)
INK = RGBColor(0x1A, 0x22, 0x2C)
MUTED = RGBColor(0x5E, 0x68, 0x72)
RULE = RGBColor(0xC9, 0xBE, 0xAC)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
CARD = RGBColor(0xFF, 0xFC, 0xF7)

SPEAKERS = {
    "Opening": RGBColor(0x6E, 0x60, 0x4E),
    "Abdullah": RGBColor(0x1E, 0x4D, 0x5C),
    "Amelie": RGBColor(0x2F, 0x55, 0x3A),
    "Eric": RGBColor(0x8A, 0x45, 0x28),
    "Rahel": RGBColor(0x3C, 0x38, 0x68),
    "Group": RGBColor(0x1A, 0x22, 0x2C),
}


def set_run(run, text, size, color, bold=False, font="Calibri", italic=False):
    run.text = text
    run.font.size = Pt(size)
    run.font.color.rgb = color
    run.font.bold = bold
    run.font.italic = italic
    run.font.name = font


def add_text(slide, text, x, y, w, h, size, color, bold=False, font="Calibri", align=PP_ALIGN.LEFT, italic=False, anchor=MSO_ANCHOR.TOP):
    box = slide.shapes.add_textbox(x, y, w, h)
    frame = box.text_frame
    frame.word_wrap = True
    frame.auto_size = None
    frame.margin_left = Emu(0)
    frame.margin_right = Emu(0)
    frame.margin_top = Emu(0)
    frame.margin_bottom = Emu(0)
    try:
        frame._txBody.bodyPr.set("anchor", {MSO_ANCHOR.TOP: "t", MSO_ANCHOR.MIDDLE: "ctr", MSO_ANCHOR.BOTTOM: "b"}[anchor])
    except Exception:
        pass
    p = frame.paragraphs[0]
    p.alignment = align
    p.space_before = Pt(0)
    p.space_after = Pt(0)
    set_run(p.add_run(), text, size, color, bold, font, italic)
    return box


def rect(slide, x, y, w, h, fill):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, w, h)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    shape.line.fill.background()
    return shape


def blank(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    rect(slide, 0, 0, W, H, BG)
    return slide


def notes(slide, text):
    frame = slide.notes_slide.notes_text_frame
    frame.text = text


def footer(slide, number, total):
    add_text(
        slide,
        "Ansolabehere & Rivers 2013  ·  2008 CCES and ANES",
        Inches(0.55),
        Inches(7.12),
        Inches(9),
        Inches(0.28),
        11,
        MUTED,
    )
    add_text(
        slide,
        f"{number}  /  {total}",
        Inches(11.2),
        Inches(7.12),
        Inches(1.6),
        Inches(0.28),
        11,
        MUTED,
        align=PP_ALIGN.RIGHT,
    )


def badge(slide, speaker):
    color = SPEAKERS[speaker]
    pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(10.55), Inches(0.32), Inches(2.25), Inches(0.38))
    pill.fill.solid()
    pill.fill.fore_color.rgb = color
    pill.line.fill.background()
    add_text(slide, speaker.upper(), Inches(10.55), Inches(0.36), Inches(2.25), Inches(0.30), 12, WHITE, True, align=PP_ALIGN.CENTER)


def content_slide(prs, kicker, title, speaker, bullets, script, number, total, subtitle=None):
    slide = blank(prs)
    rect(slide, 0, 0, Inches(0.12), H, SPEAKERS[speaker])
    add_text(slide, kicker.upper(), Inches(0.55), Inches(0.32), Inches(9.5), Inches(0.32), 13, SPEAKERS[speaker], True)
    badge(slide, speaker)
    add_text(slide, title, Inches(0.55), Inches(0.85), Inches(12.2), Inches(0.9), 32, INK, True, "Georgia")
    top = 1.9
    if subtitle:
        add_text(slide, subtitle, Inches(0.55), Inches(1.75), Inches(12.2), Inches(0.4), 16, MUTED, italic=True)
        top = 2.25
    y = top
    for bullet in bullets:
        add_text(slide, bullet, Inches(0.55), Inches(y), Inches(12.2), Inches(0.7), 20, INK)
        y += 0.74
    footer(slide, number, total)
    notes(slide, script)
    return slide


def build():
    prs = Presentation()
    prs.slide_width = W
    prs.slide_height = H
    prs.core_properties.title = "Cooperative Survey Research: CCES and the ANES"
    prs.core_properties.author = "Abdullah, Amelie, Eric, Rahel"
    total = 18

    # 1 title
    s = blank(prs)
    rect(s, 0, 0, Inches(0.18), H, SPEAKERS["Group"])
    add_text(s, "GROUP PRESENTATION", Inches(0.7), Inches(1.35), Inches(11), Inches(0.3), 14, MUTED, True)
    add_text(s, "Cooperative Survey Research", Inches(0.7), Inches(1.8), Inches(12), Inches(0.8), 44, INK, True, "Georgia")
    add_text(s, "Can a matched internet sample stand in for the ANES?", Inches(0.7), Inches(2.7), Inches(11.5), Inches(0.5), 24, SPEAKERS["Abdullah"])
    add_text(s, "Ansolabehere & Rivers, Annual Review of Political Science, 2013\nReplication of the 2008 presidential vote comparison", Inches(0.7), Inches(3.5), Inches(11), Inches(0.8), 18, MUTED)
    add_text(s, "Abdullah  ·  Hypothesis          Amelie  ·  Method\nEric  ·  Data                         Rahel  ·  Conclusion", Inches(0.7), Inches(5.15), Inches(10), Inches(0.8), 18, INK)
    notes(s, "Open by naming the article and the four speakers. One sentence: we are asking whether YouGov’s matched volunteer survey gives the same 2008 vote results as the face-to-face ANES.")

    # 2 map
    s = blank(prs)
    rect(s, 0, 0, Inches(0.12), H, SPEAKERS["Group"])
    add_text(s, "ORDER OF THE TALK", Inches(0.55), Inches(0.35), Inches(8), Inches(0.3), 13, MUTED, True)
    add_text(s, "Six questions, four speakers", Inches(0.55), Inches(0.75), Inches(12), Inches(0.7), 34, INK, True, "Georgia")
    rows = [
        ("Opening", "Research question, and why it matters"),
        ("Abdullah", "Hypothesis"),
        ("Amelie", "Method"),
        ("Eric", "What the data reveal"),
        ("Rahel", "The article’s conclusion"),
    ]
    y = 1.85
    for name, job in rows:
        rect(s, Inches(0.55), Inches(y), Inches(2.4), Inches(0.72), SPEAKERS[name])
        add_text(s, name, Inches(0.7), Inches(y + 0.16), Inches(2.1), Inches(0.42), 18, WHITE, True)
        add_text(s, job, Inches(3.2), Inches(y + 0.16), Inches(9), Inches(0.42), 22, INK)
        y += 0.92
    footer(s, 2, total)
    notes(s, "The first two questions were not assigned to a named person. Whoever opens should take both, then hand to Abdullah. Do not spend more than a minute on this slide.")

    content_slide(
        prs,
        "Question 1  ·  Opening",
        "What is the research question?",
        "Opening",
        [
            "Internet surveys are large and cheap. The respondents are volunteers, not a random sample.",
            "The ANES is the benchmark: an interviewer visits a probability sample at home. It is small.",
            "After matching and weighting, does the CCES recover the same party–vote relationship as the ANES?",
            "And does it recover the same presidential margins as the official returns?",
        ],
        "The puzzle is a design puzzle, not a puzzle about why Obama won. Volunteers online versus a random sample at the door. The 2008 vote is the test, because we can check it against the ANES and against the certified count. Say the question once, slowly, then sit down on this slide.",
        3,
        total,
    )

    content_slide(
        prs,
        "Question 2  ·  Opening",
        "Why does the answer matter?",
        "Opening",
        [
            "A 2,000-person national sample cannot describe a state, a House district, or a small group.",
            "The 2008 CCES common sample is 32,800 interviews, shared by many research teams.",
            "Face-to-face response rates were already falling. The field needed a tested alternative.",
            "If the matched sample is biased, a large body of election research describes the panel, not the voters.",
        ],
        "Three stakes: scale, the decline of the old surveys, and the cost of being wrong. Mention, briefly, that Rivers coauthored the paper and was chief scientist of the firm that fielded the survey. That is why checking him against the ANES matters. Then hand to Abdullah.",
        4,
        total,
    )

    content_slide(
        prs,
        "Question 3  ·  Abdullah",
        "The hypothesis",
        "Abdullah",
        [
            "Volunteers differ from the country. The claim is that those differences sit in observable traits.",
            "Age, race, gender, education, party, registration, religion, and news interest carry the selection.",
            "Given those traits, volunteering itself should tell us nothing more about the vote.",
            "That assumption is called ignorability. If it fails, matching leaves the bias in the data.",
        ],
        "Start in plain language. Once we know the matching characteristics, the fact that someone joined an internet panel should not predict how they voted. Then name ignorability. Stress the failure condition: a reason for joining the panel that is also a reason for supporting a candidate, and that is not captured by those variables, survives the whole procedure.",
        5,
        total,
    )

    content_slide(
        prs,
        "Question 3  ·  Abdullah",
        "What would count as support",
        "Abdullah",
        [
            "The party slope in the CCES should match the party slope in the ANES.",
            "Published figures: −0.313 in the CCES and −0.312 in the ANES.",
            "One step toward Republican moves the vote score about a third of the way from Obama toward McCain.",
            "State errors should be a few points, not ten. Group shares should track the exit poll.",
            "The prediction is about the matched, weighted sample, not the raw list of volunteers.",
        ],
        "Vote is coded plus one Obama, minus one McCain, zero for anyone else. Party runs from 1, strong Democrat, to 7, strong Republican. A slope near minus 0.31 is the number to remember. Close by saying the hypothesis is silent about the unmatched panel. Hand to Amelie.",
        6,
        total,
    )

    content_slide(
        prs,
        "Question 4  ·  Amelie",
        "Two samples, one equation",
        "Amelie",
        [
            "CCES: YouGov volunteers, matched to a Census-like target, then weighted. 32,800 kept interviews.",
            "ANES: face-to-face probability sample. About 2,100 post-election interviews.",
            "Same outcome in both: Obama = +1, McCain = −1, another candidate = 0.",
            "Same regression of that vote on party and demographics. Then CCES state shares versus the official vote.",
        ],
        "Set up the comparison before the machinery. Two ways of choosing people, one equation. The ANES weight is V080102. The CCES weight is V201. Both are scaled so the average weight is 1.",
        7,
        total,
    )

    content_slide(
        prs,
        "Question 4  ·  Amelie",
        "How YouGov builds the CCES sample",
        "Amelie",
        [
            "1.  Build a target from the 2006 American Community Survey, plus CPS registration and Pew religion and party.",
            "2.  Interview about 50,800 panelists from PollingPoint, E-Rewards, and Western Wats.",
            "3.  Keep the completed interview closest to each target description.",
            "4.  Weight the matched cases, cut extreme weights, and rescale so the average weight is 1.",
        ],
        "The target row is a description, not someone YouGov can email. Age, race, gender, education, and the rest. The search finds a real panelist who fits. Say that the raw panel is too white, too old, and too educated, and that matching is what throws the surplus people out.",
        8,
        total,
    )

    content_slide(
        prs,
        "Question 4  ·  Amelie",
        "Weighted distance decides who is kept",
        "Amelie",
        [
            "Distance is a sum of penalties. A larger penalty means that factor must match.",
            "A race mismatch costs 10. A gender mismatch costs 1.5. Thirty years of age costs 1.",
            "A party mismatch costs 1.5. A registration mismatch costs up to 4. Income is allowed to be off.",
            "The kept sample is forced to look like the target on those factors. The formula is in the 2008 study guide.",
            "Our code does not recompute it. The released file already contains the finished weight, V201.",
        ],
        "The number 10 is the slide. Race dominates, so the nearest panelist is almost always the same race. Be clear that an attitude unrelated to these factors is not balanced. And be clear that this function is YouGov’s, run before we ever see the file.",
        9,
        total,
    )

    content_slide(
        prs,
        "Question 4  ·  Amelie",
        "Propensity weights, then a rescaling",
        "Amelie",
        [
            "Matching is close, not exact. A logistic regression estimates the chance a row came from the target frame.",
            "In 2008 that model uses age, education, gender, and turnout. The fitted probability is the propensity score.",
            "People who are too common in the internet sample are down-weighted. Weights above 7 are cut to 7.",
            "Dividing all weights by the same constant does not change a slope or a percentage.",
            "They are rescaled to sum to the sample size so the average weight is 1. A 2 counts as two interviews.",
        ],
        "Logistic regression outputs a probability. That probability is the propensity score. Deciles are forced to 10 percent each, then gender, race, education, and age are raked to the frame. The rescaling is for interpretation. It does not move the results. Hand to Eric.",
        10,
        total,
    )

    content_slide(
        prs,
        "Question 4  ·  Amelie",
        "A covariate is a predictor we hold still",
        "Amelie",
        [
            "The equation is: vote = intercept + party + age/10 + race indicators + other demographics.",
            "Holding age and race fixed, the party coefficient is the party–vote link among similar people.",
            "The ANES extract has no gender, education, income, or home ownership.",
            "The fair comparison uses the shared list: party, age, Black, Hispanic, and other race.",
            "The number in parentheses later is the standard error, the noise around the estimate.",
        ],
        "Define covariate in one sentence and move on. The shared list exists because of what the ANES download contains, not because those other variables are unimportant. The full list is estimated on the CCES alone.",
        11,
        total,
    )

    # 12 data result - custom
    s = blank(prs)
    rect(s, 0, 0, Inches(0.12), H, SPEAKERS["Eric"])
    add_text(s, "QUESTION 5  ·  ERIC", Inches(0.55), Inches(0.32), Inches(9), Inches(0.3), 13, SPEAKERS["Eric"], True)
    badge(s, "Eric")
    add_text(s, "The party slopes are the same", Inches(0.55), Inches(0.78), Inches(12), Inches(0.7), 32, INK, True, "Georgia")
    add_text(s, "Shared covariates. Vote coded +1 Obama, −1 McCain, 0 other. Weighted least squares.", Inches(0.55), Inches(1.55), Inches(12), Inches(0.35), 16, MUTED, italic=True)
    cards = [
        ("CCES", "−0.317", "standard error 0.002", "N = 23,681"),
        ("ANES", "−0.317", "standard error 0.010", "N = 1,538"),
        ("Article", "−0.313", "CCES in the published table", "ANES published −0.312"),
    ]
    x = 0.55
    for title, big, mid, small in cards:
        rect(s, Inches(x), Inches(2.15), Inches(3.9), Inches(3.15), CARD)
        rect(s, Inches(x), Inches(2.15), Inches(3.9), Inches(0.1), SPEAKERS["Eric"])
        add_text(s, title, Inches(x + 0.25), Inches(2.45), Inches(3.4), Inches(0.4), 16, MUTED, True)
        add_text(s, big, Inches(x + 0.25), Inches(2.95), Inches(3.4), Inches(0.8), 36, INK, True, "Georgia")
        add_text(s, mid, Inches(x + 0.25), Inches(3.9), Inches(3.4), Inches(0.4), 16, INK)
        add_text(s, small, Inches(x + 0.25), Inches(4.4), Inches(3.4), Inches(0.4), 16, MUTED)
        x += 4.15
    add_text(s, "One step toward Republican moves the vote about a third of the way from Obama toward McCain.", Inches(0.55), Inches(5.55), Inches(12.2), Inches(0.45), 20, INK)
    add_text(s, "The CCES estimate is more precise because that sample is about fifteen times larger.", Inches(0.55), Inches(6.15), Inches(12.2), Inches(0.4), 18, MUTED)
    footer(s, 12, total)
    notes(s, "This is the slide to leave up. Read the two −0.317 figures and stop. Then say the published table was −0.313 and −0.312, so the replication landed on the article’s result. The standard errors tell the audience not to over-read a difference of a few hundredths on the ANES side.")

    content_slide(
        prs,
        "Question 5  ·  Eric",
        "The other slopes, and the weights",
        "Eric",
        [
            "Age, per 10 years: CCES −0.040, ANES −0.050. Black: +0.260 versus +0.325.",
            "Hispanic: CCES +0.063, ANES +0.159. This is the subgroup the article already flags.",
            "Full CCES model, party −0.314. The published coefficient is −0.313.",
            "Weights off, the CCES party slope moves only to −0.320. The relationship is already in the interviews.",
            "Weights off, the ANES party slope moves to −0.293. Weights matter more in the smaller sample.",
        ],
        "Do not read every coefficient. Age is close. The Black gap is large in both and larger in the ANES. Hispanic is where they differ. Then the weight sentence: matching did the work on the CCES; the weight column barely moves the slope. Race questions also differ. CCES puts Hispanic in the race item. ANES asks race and Latino status separately.",
        13,
        total,
    )

    content_slide(
        prs,
        "Question 5  ·  Eric",
        "Vote shares and the states",
        "Eric",
        [
            "Two-party Obama share: CCES 53.9 percent, ANES 54.9 percent.",
            "CCES Hispanic voters: 65.8 percent Obama. ANES Latino voters: 77 percent. The exit poll was near 67.",
            "Across 50 states, CCES minus the official Democratic share averages +1.0 points. RMSE is 3.4.",
            "The article reports +0.27 and 2.43. Same direction, same order of magnitude, not the same digits.",
            "This is the softer check. The party slopes are the result that lines up exactly.",
        ],
        "Separate shares from regression coefficients. A share is a weighted percentage. The Hispanic contrast is the article’s own point: the CCES landed on the exit poll and the ANES did not. On states, own the discrepancy. We support the claim that error is a few points. We do not reproduce their exact 0.27 and 2.43.",
        14,
        total,
    )

    content_slide(
        prs,
        "Question 5  ·  Eric",
        "Beyond the article, same respondents",
        "Eric",
        [
            "These extensions are ours. They are not results from the 2013 article.",
            "Party slopes down the ballot stay near −0.3: House −0.298, Senate −0.306, governor −0.289.",
            "Adding ideology and three issue items cuts the presidential party slope from −0.314 to −0.170.",
            "More informed respondents are slightly more partisan, not less. The difference is about 0.02 to 0.03.",
        ],
        "Only use this slide if there is time. The issue result is the one worth saying: a large part of the party effect is shared ideology and issue position. Label it as our addition so it is not attributed to Ansolabehere and Rivers. Hand to Rahel.",
        15,
        total,
    )

    content_slide(
        prs,
        "Question 6  ·  Rahel",
        "The article’s conclusion",
        "Rahel",
        [
            "A matched, weighted cooperative internet sample can recover the ANES electoral relationships.",
            "In the published table the party slopes agree to the third decimal: −0.313 and −0.312.",
            "State estimates miss by a few points, which is what a sample of that size should do.",
            "Teams can share one large survey and study states, districts, and groups the ANES cannot resolve.",
        ],
        "Give the authors their sentence before our caveats. The conclusion is practical: cooperation plus matching is good enough for electoral research that needs a large N. Do not soften it into 'more research is needed' before you have stated what they actually concluded.",
        16,
        total,
    )

    content_slide(
        prs,
        "Question 6  ·  Rahel",
        "What that conclusion depends on",
        "Rahel",
        [
            "The raw volunteer panel is still skewed. Matching and weighting produce the representativeness.",
            "The claim covers outcomes tied to the matching variables. A bias outside those variables remains.",
            "Rivers helped build the firm that fielded the survey. The article discloses that.",
            "Our replication reproduces the party result. The state error agrees in size, not to the published decimal.",
            "Both claims are about YouGov’s processed sample of 32,800, not about every person who clicked an ad.",
        ],
        "Three limits, in this order: ignorability, the author’s stake in YouGov, and our softer state replication. Then the last line: the file we analyzed had already been matched. End there and go to the closing slide.",
        17,
        total,
    )

    s = blank(prs)
    rect(s, 0, 0, Inches(0.18), H, SPEAKERS["Rahel"])
    add_text(s, "RAHEL  ·  CLOSE", Inches(0.7), Inches(1.7), Inches(11), Inches(0.3), 14, SPEAKERS["Rahel"], True)
    add_text(s, "The matched CCES and the ANES\ngive the same answer.", Inches(0.7), Inches(2.15), Inches(12), Inches(1.6), 36, INK, True, "Georgia")
    add_text(s, "One step toward Republican moves the 2008 vote score by −0.32\nin the volunteer survey and in the probability survey.", Inches(0.7), Inches(4.15), Inches(11.5), Inches(0.9), 22, MUTED)
    add_text(s, "Abdullah   ·   Amelie   ·   Eric   ·   Rahel", Inches(0.7), Inches(5.8), Inches(11), Inches(0.4), 16, INK)
    notes(s, "Read the title and the −0.32 line. Stop. Take questions. If asked what failed: the state RMSE, 3.4 against their 2.43. If asked whether the raw panel is representative: no, the matched sample is the claim.")

    prs.save(OUT)
    print(OUT, "slides", len(prs.slides))


if __name__ == "__main__":
    build()
