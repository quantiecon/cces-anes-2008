"""Compare the 2008 ANES and CCES the way Ansolabehere and Rivers do.

The review's claim is that a matched, weighted opt-in sample (CCES) produces
the same vote regression as the face-to-face ANES. This script:

1. Rebuilds their linear vote model on the 2008 CCES common content.
2. Fits the same model, on the variables both files share, to the ANES subset.
3. Refits both as a logit of Obama versus McCain, and again with weights off.
4. Compares weighted state-level CCES presidential shares with official returns.

Run from the project directory:

    .venv/bin/python analysis.py
"""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
import pandas as pd
import statsmodels.api as sm

# Published Table 5, all respondents. Obama = 1, McCain = -1, other = 0.
PUBLISHED = {
    "CCES": {
        "n": 25814,
        "party": -0.313,
        "age10": -0.028,
        "female": -0.003,
        "education": 0.031,
        "income": 0.001,
        "homeowner": -0.092,
        "black": 0.236,
        "hispanic": 0.066,
        "other_race": -0.009,
        "const": 1.297,
    },
    "ANES": {
        "n": 1436,
        "party": -0.312,
        "age10": -0.041,
        "female": 0.002,
        "education": 0.000,
        "income": -0.004,
        "homeowner": -0.109,
        "black": 0.303,
        "hispanic": 0.184,
        "other_race": 0.248,
        "const": 1.556,
    },
}

FULL_COVARIATES = [
    "party",
    "age10",
    "female",
    "education",
    "income",
    "homeowner",
    "black",
    "hispanic",
    "other_race",
]
SHARED_COVARIATES = ["party", "age10", "black", "hispanic", "other_race"]


def anes_party(frame: pd.DataFrame) -> pd.Series:
    """7-point party ID from the three ANES branching items.

    1 is Strong Democrat and 7 is Strong Republican, matching CC307a.
    """
    j1 = frame["v083097"]
    strength = frame["v083098a"]
    lean = frame["v083098b"]
    pid = pd.Series(np.nan, index=frame.index, dtype=float)
    pid[(j1 == 1) & (strength == 1)] = 1
    pid[(j1 == 1) & (strength == 5)] = 2
    pid[(j1 == 1) & pid.isna()] = 2
    pid[lean == 5] = 3
    pid[lean == 3] = 4
    pid[(j1 == 3) & lean.isin([-1, -8, -9])] = 4
    pid[lean == 1] = 5
    pid[(j1 == 2) & (strength == 5)] = 6
    pid[(j1 == 2) & (strength == 1)] = 7
    pid[(j1 == 2) & pid.isna()] = 6
    return pid


def load_anes(path: Path) -> pd.DataFrame:
    raw = pd.read_csv(path)
    raw.columns = [c.strip().lower() for c in raw.columns]
    for col in raw.columns:
        raw[col] = pd.to_numeric(raw[col], errors="coerce")

    vote = raw["v085044a"]
    outcome = pd.Series(np.nan, index=raw.index, dtype=float)
    outcome[vote == 1] = 1.0  # Obama
    outcome[vote == 3] = -1.0  # McCain
    outcome[vote == 7] = 0.0  # other candidate

    race = raw["v081102"]
    latino = raw["v081103"]
    age = raw["v081104"]
    out = pd.DataFrame(
        {
            "outcome": outcome,
            "party": anes_party(raw),
            "age10": age / 10.0,
            "black": np.where(race == 2, 1.0, np.where(race.isin([1, 3, 4, 5, 6, 7]), 0.0, np.nan)),
            "hispanic": np.where(latino == 1, 1.0, np.where(latino == 2, 0.0, np.nan)),
            "weight": raw["v080102"],
            "obama_twoparty": np.where(vote == 1, 1.0, np.where(vote == 3, 0.0, np.nan)),
            "white": ((race == 1) & (latino == 2)).astype(float),
        }
    )
    out.loc[age < 18, "age10"] = np.nan
    out.loc[~race.isin([1, 2, 3, 4, 5, 6, 7]), "black"] = np.nan
    # "Other race" is everyone who is neither white, Black, nor Latino.
    out["other_race"] = np.where(
        out["hispanic"].eq(1) | out["black"].eq(1) | (race == 1),
        0.0,
        np.where(out["black"].notna() & out["hispanic"].notna(), 1.0, np.nan),
    )
    out.loc[out["weight"] <= 0, "weight"] = np.nan
    out["survey"] = "ANES"
    return out


def load_cces(path: Path) -> pd.DataFrame:
    needed = [
        "v201",
        "v206",
        "v207",
        "v208",
        "v211",
        "v213",
        "v246",
        "cc307a",
        "cc308a",
        "cc333",
        "cc410",
        "cc411",
        "cc412",
        "cc413",
        "cc417",
        "cc420",
        "cc422",
        "v243",
        "v244",
    ]
    with pd.read_stata(path, iterator=True) as reader:
        names = list(reader.read(1).columns)
    lookup = {name.lower(): name for name in names}
    missing = [name for name in needed if name not in lookup]
    if missing:
        raise SystemExit(
            "CCES file is missing "
            + ", ".join(missing)
            + ". First columns: "
            + ", ".join(names[:25])
        )
    frame = pd.read_stata(
        path,
        columns=[lookup[name] for name in needed],
        convert_categoricals=False,
    )
    frame.columns = [col.lower() for col in frame.columns]

    vote = frame["cc410"]
    outcome = pd.Series(np.nan, index=frame.index, dtype=float)
    outcome[vote == 2] = 1.0  # Obama
    outcome[vote == 1] = -1.0  # McCain
    outcome[vote.isin([3, 4, 5, 6, 7])] = 0.0  # other candidate

    race = frame["v211"]
    age = 2008 - frame["v207"]
    out = pd.DataFrame(
        {
            "outcome": outcome,
            "party": frame["cc307a"].where(frame["cc307a"].between(1, 7)),
            "age10": age.where(age.between(18, 100)) / 10.0,
            "female": np.where(frame["v208"] == 2, 1.0, np.where(frame["v208"] == 1, 0.0, np.nan)),
            "education": frame["v213"].where(frame["v213"].between(1, 6)),
            "income": frame["v246"].where(frame["v246"].between(1, 14)),
            "homeowner": np.where(
                frame["cc333"] == 2,
                1.0,
                np.where(frame["cc333"].isin([1, 3, 4]), 0.0, np.nan),
            ),
            "black": np.where(race == 2, 1.0, np.where(race.isin([1, 3, 4, 5, 6, 7, 8]), 0.0, np.nan)),
            "hispanic": np.where(race == 3, 1.0, np.where(race.isin([1, 2, 4, 5, 6, 7, 8]), 0.0, np.nan)),
            "weight": frame["v201"],
            "state": frame["v206"],
            "obama_twoparty": np.where(vote == 2, 1.0, np.where(vote == 1, 0.0, np.nan)),
            "male": (frame["v208"] == 1).astype(float),
            "white": (race == 1).astype(float),
            "senate": office_outcome(frame["cc411"], 1, 2, [3]),
            "house": office_outcome(frame["cc412"], 1, 2, [3]),
            "governor": office_outcome(frame["cc413"], 1, 2, [3]),
            "ideology": frame["v243"].where(frame["v243"].between(1, 5)),
            "health_oppose": frame["cc417"].where(frame["cc417"].between(1, 4)),
            "tax_cut10": frame["cc420"].where(frame["cc420"].between(0, 100)) / 10.0,
            "carbon_oppose": np.where(
                frame["cc422"] == 2,
                1.0,
                np.where(frame["cc422"] == 1, 0.0, np.nan),
            ),
            "high_interest": np.where(
                frame["v244"] == 1,
                1.0,
                np.where(frame["v244"].isin([2, 3, 4]), 0.0, np.nan),
            ),
            # Democrats held the House in 2008, so code 2 is the correct answer.
            "knows_house": np.where(
                frame["cc308a"] == 2,
                1.0,
                np.where(frame["cc308a"].isin([1, 3, 4]), 0.0, np.nan),
            ),
        }
    )
    out["other_race"] = np.where(
        out["hispanic"].eq(1) | out["black"].eq(1) | (race == 1),
        0.0,
        np.where(race.isin([4, 5, 6, 7, 8]), 1.0, np.nan),
    )
    out.loc[out["weight"] <= 0, "weight"] = np.nan
    out["party_x_interest"] = out["party"] * out["high_interest"]
    out["party_x_knows"] = out["party"] * out["knows_house"]
    out["survey"] = "CCES"
    return out


def office_outcome(series: pd.Series, dem_code: float, rep_code: float, other_codes: list[float]) -> pd.Series:
    """Democrat = 1, Republican = -1, other named candidate = 0."""
    outcome = pd.Series(np.nan, index=series.index, dtype=float)
    outcome[series == dem_code] = 1.0
    outcome[series == rep_code] = -1.0
    outcome[series.isin(other_codes)] = 0.0
    return outcome


def fit_ols(
    frame: pd.DataFrame,
    covariates: list[str],
    weighted: bool,
    outcome: str = "outcome",
) -> sm.regression.linear_model.RegressionResultsWrapper:
    cols = [outcome, "weight", *covariates]
    sample = frame[cols].dropna()
    y = sample[outcome]
    x = sm.add_constant(sample[covariates], has_constant="add")
    weights = sample["weight"] if weighted else np.ones(len(sample))
    return sm.WLS(y, x, weights=weights).fit(cov_type="HC1")


def combined_slope(result, names: list[str]) -> tuple[float, float]:
    """Point estimate and robust SE for the sum of named coefficients."""
    estimate = float(sum(result.params[name] for name in names))
    cov = result.cov_params().loc[names, names].to_numpy()
    se = float(np.sqrt(np.ones(len(names)) @ cov @ np.ones(len(names))))
    return estimate, se


def fit_logit(frame: pd.DataFrame, covariates: list[str], weighted: bool):
    sample = frame.loc[frame["outcome"].isin([-1.0, 1.0]), ["outcome", "weight", *covariates]].dropna()
    y = (sample["outcome"] == 1.0).astype(float)
    x = sm.add_constant(sample[covariates], has_constant="add")
    weights = sample["weight"] if weighted else np.ones(len(sample))
    return sm.GLM(y, x, family=sm.families.Binomial(), freq_weights=weights).fit(cov_type="HC1")


def coef_row(result, label: str) -> dict:
    row = {"model": label, "n": int(result.nobs)}
    for name in result.params.index:
        row[name] = result.params[name]
        row[f"{name}_se"] = result.bse[name]
    row["r2"] = getattr(result, "rsquared", np.nan)
    return row


def group_share(frame: pd.DataFrame, mask: pd.Series) -> tuple[float, int]:
    sample = frame.loc[mask & frame["obama_twoparty"].notna() & frame["weight"].notna(), ["obama_twoparty", "weight"]]
    if sample.empty:
        return np.nan, 0
    share = np.average(sample["obama_twoparty"], weights=sample["weight"])
    return float(share), int(len(sample))


def state_accuracy(cces: pd.DataFrame, returns_path: Path) -> pd.DataFrame:
    official = pd.read_csv(returns_path)
    official.columns = [c.strip() for c in official.columns]
    official["state_code"] = pd.to_numeric(official["v206"], errors="coerce")
    for col in ["%Obama", "%McCain"]:
        official[col] = (
            official[col].astype(str).str.replace("%", "", regex=False).astype(float) / 100.0
        )
    official["actual_two_party"] = official["%Obama"] / (official["%Obama"] + official["%McCain"])

    voters = cces.loc[
        cces["obama_twoparty"].notna() & cces["weight"].notna() & cces["state"].notna(),
        ["state", "obama_twoparty", "weight"],
    ]
    rows = []
    for state, g in voters.groupby("state"):
        rows.append(
            {
                "state_code": state,
                "survey_two_party": np.average(g["obama_twoparty"], weights=g["weight"]),
                "n": len(g),
            }
        )
    survey = pd.DataFrame(rows)
    merged = survey.merge(official, on="state_code", how="inner")
    merged["error"] = merged["survey_two_party"] - merged["actual_two_party"]
    return merged.sort_values("state_code")


def format_model(result, title: str) -> str:
    lines = [title, f"  N = {int(result.nobs)}"]
    if hasattr(result, "rsquared"):
        lines.append(f"  R-squared = {result.rsquared:.3f}")
    width = max(len(name) for name in result.params.index)
    for name in result.params.index:
        lines.append(
            f"  {name:<{width}}  {result.params[name]:+.3f}  ({result.bse[name]:.3f})"
        )
    return "\n".join(lines)


ISSUE_COVARIATES = ["ideology", "health_oppose", "tax_cut10", "carbon_oppose"]


def same_sample_pair(frame: pd.DataFrame, outcome: str, extra: list[str]):
    """Baseline and expanded model on the rows that have every extra covariate."""
    sample = frame[["weight", outcome, *FULL_COVARIATES, *extra]].dropna()
    base = fit_ols(sample, FULL_COVARIATES, True, outcome)
    expanded = fit_ols(sample, FULL_COVARIATES + extra, True, outcome)
    return base, expanded


def run_extensions(cces: pd.DataFrame, states: pd.DataFrame) -> str:
    lines = ["Extensions beyond Table 5"]

    lines.append("\n1. Same covariates, different office. Democrat = 1, Republican = -1.")
    for label, outcome in [
        ("President", "outcome"),
        ("U.S. House", "house"),
        ("U.S. Senate", "senate"),
        ("Governor", "governor"),
    ]:
        result = fit_ols(cces, FULL_COVARIATES, True, outcome)
        lines.append(
            f"  {label:<12} party {result.params['party']:+.3f} "
            f"({result.bse['party']:.3f})   "
            f"R2 {result.rsquared:.3f}   N {int(result.nobs)}"
        )

    lines.append(
        "\n2. Presidential vote with ideology and issues, same respondents in both columns."
    )
    lines.append("  Ideology is 1 very liberal to 5 very conservative.")
    lines.append("  Health opposition is 1 strongly support guaranteed insurance to 4 strongly oppose.")
    lines.append("  Tax-cut scale is 0 all tax increases to 10 all spending cuts.")
    lines.append("  Carbon oppose is 1 if opposed and 0 if supported.")
    base_issues, with_issues = same_sample_pair(cces, "outcome", ISSUE_COVARIATES)
    lines.append(
        f"  Party without issues  {base_issues.params['party']:+.3f} "
        f"({base_issues.bse['party']:.3f})   R2 {base_issues.rsquared:.3f}   "
        f"N {int(base_issues.nobs)}"
    )
    lines.append(
        f"  Party with issues     {with_issues.params['party']:+.3f} "
        f"({with_issues.bse['party']:.3f})   R2 {with_issues.rsquared:.3f}"
    )
    for name in ISSUE_COVARIATES:
        lines.append(
            f"  {name:<16} {with_issues.params[name]:+.3f} ({with_issues.bse[name]:.3f})"
        )

    lines.append("\n3. Party slope by information, presidential vote.")
    base_interest, interest = same_sample_pair(
        cces, "outcome", ["high_interest", "party_x_interest"]
    )
    hi, hi_se = combined_slope(interest, ["party", "party_x_interest"])
    lines.append(
        f"  Follows news most of the time (N reference group is the complement):"
    )
    lines.append(
        f"    Less attentive     party {interest.params['party']:+.3f} "
        f"({interest.bse['party']:.3f})"
    )
    lines.append(f"    Most attentive     party {hi:+.3f} ({hi_se:.3f})")
    lines.append(
        f"    Difference         {interest.params['party_x_interest']:+.3f} "
        f"({interest.bse['party_x_interest']:.3f})   "
        f"N {int(interest.nobs)}   baseline party on this sample "
        f"{base_interest.params['party']:+.3f}"
    )

    _, knowledge = same_sample_pair(cces, "outcome", ["knows_house", "party_x_knows"])
    knows, knows_se = combined_slope(knowledge, ["party", "party_x_knows"])
    lines.append("  Knows Democrats held the House:")
    lines.append(
        f"    Does not know      party {knowledge.params['party']:+.3f} "
        f"({knowledge.bse['party']:.3f})"
    )
    lines.append(f"    Knows              party {knows:+.3f} ({knows_se:.3f})")
    lines.append(
        f"    Difference         {knowledge.params['party_x_knows']:+.3f} "
        f"({knowledge.bse['party_x_knows']:.3f})   N {int(knowledge.nobs)}"
    )

    lines.append("\n4. Why state presidential errors differ.")
    voters = cces.loc[
        cces["obama_twoparty"].notna() & cces["weight"].notna() & cces["black"].notna()
    ]
    composition = []
    for state, group in voters.groupby("state"):
        composition.append(
            {
                "state_code": state,
                "black_pct": 100 * np.average(group["black"], weights=group["weight"]),
                "hispanic_pct": 100 * np.average(group["hispanic"], weights=group["weight"]),
            }
        )
    reg = states.merge(pd.DataFrame(composition), on="state_code", how="inner")
    reg["error_pp"] = 100 * reg["error"]
    reg["log_n"] = np.log(reg["n"])
    x = sm.add_constant(reg[["log_n", "black_pct", "hispanic_pct"]])
    state_fit = sm.OLS(reg["error_pp"], x).fit(cov_type="HC1")
    lines.append(
        "  Outcome is survey minus official two-party Democratic share, in points."
    )
    lines.append(f"  N states {int(state_fit.nobs)}   R2 {state_fit.rsquared:.3f}")
    for name in state_fit.params.index:
        lines.append(
            f"  {name:<14} {state_fit.params[name]:+.3f} ({state_fit.bse[name]:.3f})"
        )
    reg.to_csv(Path("results") / "state_error_model.csv", index=False)
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--anes",
        type=Path,
        default=Path("/Users/picksuniapp/Downloads/subfiles/sub-data.txt"),
    )
    parser.add_argument(
        "--cces",
        type=Path,
        default=Path("/Users/picksuniapp/Downloads/dataverse_files/cces_2008_common.dta"),
    )
    parser.add_argument(
        "--returns",
        type=Path,
        default=Path("/Users/picksuniapp/Downloads/dataverse_files/Prez by State.csv"),
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=Path("results"),
    )
    args = parser.parse_args()
    args.out.mkdir(parents=True, exist_ok=True)

    print("Loading ANES subset...")
    anes = load_anes(args.anes)
    print("Loading CCES common content...")
    cces = load_cces(args.cces)

    cces_full = fit_ols(cces, FULL_COVARIATES, weighted=True)
    cces_full_unweighted = fit_ols(cces, FULL_COVARIATES, weighted=False)
    cces_shared = fit_ols(cces, SHARED_COVARIATES, weighted=True)
    anes_shared = fit_ols(anes, SHARED_COVARIATES, weighted=True)
    anes_shared_unweighted = fit_ols(anes, SHARED_COVARIATES, weighted=False)
    cces_logit = fit_logit(cces, FULL_COVARIATES, weighted=True)
    anes_logit = fit_logit(anes, SHARED_COVARIATES, weighted=True)

    blocks = [
        format_model(
            cces_full,
            "CCES weighted linear model (paper's covariate list)",
        ),
        format_model(
            cces_full_unweighted,
            "CCES unweighted linear model (same covariates)",
        ),
        format_model(
            cces_shared,
            "CCES weighted linear model (covariates also in the ANES file)",
        ),
        format_model(
            anes_shared,
            "ANES weighted linear model (covariates also in the ANES file)",
        ),
        format_model(
            anes_shared_unweighted,
            "ANES unweighted linear model (same shared covariates)",
        ),
        format_model(
            cces_logit,
            "CCES weighted logit, Obama vs McCain (other candidates dropped)",
        ),
        format_model(
            anes_logit,
            "ANES weighted logit, Obama vs McCain (shared covariates)",
        ),
    ]

    published_lines = [
        "Published Table 5 party coefficients: "
        f"ANES {PUBLISHED['ANES']['party']:+.3f} (N={PUBLISHED['ANES']['n']}), "
        f"CCES {PUBLISHED['CCES']['party']:+.3f} (N={PUBLISHED['CCES']['n']}).",
        "ANES file has no gender, education, self-reported income, or home ownership,",
        "so those four coefficients are estimated on the CCES only.",
        "CCES race is one question (Hispanic is a category). ANES asks race and Latino status separately.",
    ]

    share_lines = ["Weighted two-party Obama share (Obama / (Obama + McCain))"]
    specs = [
        ("CCES all", cces, cces["obama_twoparty"].notna()),
        ("CCES men", cces, cces["male"] == 1),
        ("CCES women", cces, cces["female"] == 1),
        ("CCES white", cces, cces["white"] == 1),
        ("CCES black", cces, cces["black"] == 1),
        ("CCES hispanic", cces, cces["hispanic"] == 1),
        ("ANES all", anes, anes["obama_twoparty"].notna()),
        ("ANES white, non-Latino", anes, anes["white"] == 1),
        ("ANES black", anes, anes["black"] == 1),
        ("ANES latino", anes, anes["hispanic"] == 1),
    ]
    for label, frame, mask in specs:
        share, n = group_share(frame, mask)
        share_lines.append(f"  {label:<24} {share:6.1%}   n={n}")

    states = state_accuracy(cces, args.returns)
    bias = states["error"].mean()
    rmse = np.sqrt(np.mean(states["error"] ** 2))
    big = states[states["n"] >= 200]
    state_lines = [
        f"Presidential two-party Democratic share, {len(states)} states.",
        f"  Mean survey minus actual: {bias:+.2%}",
        f"  RMSE: {rmse:.2%}",
        f"  Among states with at least 200 two-party voters (n={len(big)}): "
        f"bias {big['error'].mean():+.2%}, RMSE {np.sqrt(np.mean(big['error'] ** 2)):.2%}",
        "  Paper's 2008 presidential row: bias +0.27 points, RMSE 2.43 points.",
    ]

    extensions = run_extensions(cces, states)
    report = "\n\n".join(
        [
            "\n".join(published_lines),
            "\n\n".join(blocks),
            "\n".join(share_lines),
            "\n".join(state_lines),
            extensions,
        ]
    )
    print()
    print(report)
    (args.out / "comparison.txt").write_text(report + "\n")
    states.to_csv(args.out / "state_presidential_error.csv", index=False)

    rows = [
        coef_row(cces_full, "cces_full_weighted"),
        coef_row(cces_full_unweighted, "cces_full_unweighted"),
        coef_row(cces_shared, "cces_shared_weighted"),
        coef_row(anes_shared, "anes_shared_weighted"),
        coef_row(anes_shared_unweighted, "anes_unweighted"),
        coef_row(cces_logit, "cces_logit_weighted"),
        coef_row(anes_logit, "anes_logit_weighted"),
    ]
    pd.DataFrame(rows).to_csv(args.out / "coefficients.csv", index=False)
    print(f"\nWrote {args.out / 'comparison.txt'}")
    print(f"Wrote {args.out / 'coefficients.csv'}")
    print(f"Wrote {args.out / 'state_presidential_error.csv'}")


if __name__ == "__main__":
    main()
