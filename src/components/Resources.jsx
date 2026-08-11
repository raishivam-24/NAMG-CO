import { useMemo, useState } from "react";
import "../css/Resources.css";
import {
  INCOME_TAX_NEW_REGIME,
  INCOME_TAX_OLD_REGIME,
  CAPITAL_GAINS,
  DEDUCTION_LIMITS,
  GST_RATE_SLABS,
  GST_RATE_NOTE,
  RERA_FEE_RATES,
  RERA_FEE_CAP,
  USEFUL_LINKS,
} from "../data/siteData";
import { GoldLineCentre, Tag } from "./UI";

const TABS = ["Income Tax Calculator", "RERA Fee Calculator", "GST Rates", "Useful Links"];

function formatINR(n) {
  if (!isFinite(n)) return "-";
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

/* ── Income Tax Calculator engine ──
   Mirrors the method used on the Income Tax Dept's own calculator for AY 2026-27:
   1) Salary (Basic + HRA + other allowances) less standard deduction, HRA exemption (old
      regime) and employer NPS 80CCD(2) (both regimes)
   2) Other income + house property income (loss set-off capped per regime rules)
   3) Old-regime-only deductions: 80C, 80D, NPS 80CCD(1B), home loan interest (Sec 24b)
   4) Slab tax on the resulting taxable income, with Section 87A rebate + marginal relief
   5) Capital gains (STCG 20% u/s 111A, LTCG 12.5% above ₹1.25L u/s 112A) taxed separately,
      any unused basic exemption first offset against them, no 87A rebate against these
   6) Surcharge by income bracket with marginal relief at each threshold (capped at 15% for
      the capital-gains portion), then 4% Health & Education Cess on everything */
function slabTax(taxable, slabs) {
  let tax = 0;
  let last = 0;
  for (const slab of slabs) {
    if (taxable > last) {
      const amountInSlab = Math.min(taxable, slab.upto) - last;
      tax += (amountInSlab * slab.rate) / 100;
      last = slab.upto;
    }
  }
  return tax;
}

function applyRebate(taxable, tax, cfg, regime) {
  if (taxable <= cfg.rebateLimit) return 0;
  if (regime === "new") {
    const excess = taxable - cfg.rebateLimit;
    return Math.min(tax, excess);
  }
  return tax;
}

function surchargeRateFor(taxable, cfg) {
  for (const s of cfg.surcharge) {
    if (taxable <= s.upto) return s.rate;
  }
  return cfg.surcharge[cfg.surcharge.length - 1].rate;
}

function hraExemption(basic, hraReceived, rentPaid, metro) {
  if (!basic || !rentPaid) return 0;
  const pctLimit = ((metro ? DEDUCTION_LIMITS.hraMetroPct : DEDUCTION_LIMITS.hraNonMetroPct) / 100) * basic;
  const rentMinus10 = Math.max(rentPaid - 0.1 * basic, 0);
  return Math.max(Math.min(hraReceived, rentMinus10, pctLimit), 0);
}

function computeRegime(inputs, regime) {
  const cfg = regime === "new" ? INCOME_TAX_NEW_REGIME : INCOME_TAX_OLD_REGIME;
  const grossSalary = inputs.basic + inputs.hraReceived + inputs.otherAllow;

  let deductions = inputs.salaried ? cfg.standardDeduction : 0;

  const employerNpsCap = (cfg.employerNpsPct / 100) * inputs.basic;
  const employerNps = Math.min(inputs.employerNps || 0, employerNpsCap);
  deductions += employerNps;

  let hraExempt = 0;
  if (regime === "old") {
    hraExempt = hraExemption(inputs.basic, inputs.hraReceived, inputs.rentPaid, inputs.metro);
    deductions += hraExempt;
    deductions += Math.min(inputs.sec80C || 0, DEDUCTION_LIMITS.section80C);
    deductions += Math.min(inputs.sec80D || 0, DEDUCTION_LIMITS.section80D);
    deductions += Math.min(inputs.nps1B || 0, DEDUCTION_LIMITS.nps80CCD1B);
    deductions += Math.min(inputs.homeLoanInt || 0, DEDUCTION_LIMITS.homeLoanInterest24b);
  }

  const salaryTaxable = Math.max(grossSalary - deductions, 0);

  let hp = inputs.houseProperty || 0;
  if (regime === "new" && hp < 0) hp = 0;
  if (regime === "old" && hp < 0) hp = Math.max(hp, -200000);

  const slabIncome = Math.max(salaryTaxable + (inputs.otherIncome || 0) + hp, 0);

  // Unexhausted basic exemption offset against capital gains — STCG first (higher rate)
  let stcg = inputs.stcg || 0;
  let ltcgTaxableBase = Math.max((inputs.ltcg || 0) - CAPITAL_GAINS.ltcgExemption, 0);
  let unexhausted = Math.max(cfg.basicExemption - slabIncome, 0);
  const usedOnStcg = Math.min(stcg, unexhausted);
  stcg -= usedOnStcg;
  unexhausted -= usedOnStcg;
  const usedOnLtcg = Math.min(ltcgTaxableBase, unexhausted);
  ltcgTaxableBase -= usedOnLtcg;

  const baseTax = slabTax(slabIncome, cfg.slabs);
  const tax = applyRebate(slabIncome, baseTax, cfg, regime);

  const stcgTax = stcg * (CAPITAL_GAINS.stcgRate / 100);
  const ltcgTax = ltcgTaxableBase * (CAPITAL_GAINS.ltcgRate / 100);
  const cgTax = stcgTax + ltcgTax;

  const totalForSurcharge = slabIncome + stcg + ltcgTaxableBase;
  const rate = surchargeRateFor(totalForSurcharge, cfg);
  let surcharge = (tax * rate) / 100;
  if (rate > 0) {
    const idx = cfg.surcharge.findIndex((s) => s.upto >= totalForSurcharge);
    const prevBand = cfg.surcharge[idx - 1];
    if (prevBand) {
      const threshold = prevBand.upto;
      const taxAtThresholdBase = slabTax(threshold, cfg.slabs);
      const taxAtThreshold = applyRebate(threshold, taxAtThresholdBase, cfg, regime);
      const totalAtThreshold = taxAtThreshold * (1 + prevBand.rate / 100);
      const maxAllowed = totalAtThreshold + (totalForSurcharge - threshold);
      if (tax + surcharge > maxAllowed) surcharge = Math.max(maxAllowed - tax, 0);
    }
  }
  const cgSurchargeRate = Math.min(rate, CAPITAL_GAINS.surchargeCapPct);
  const cgSurcharge = cgTax * (cgSurchargeRate / 100);

  const cess = (tax + surcharge + cgTax + cgSurcharge) * 0.04;
  const total = tax + surcharge + cgTax + cgSurcharge + cess;

  // Slab-by-slab breakdown for display
  const breakdown = [];
  let last = 0;
  for (const slab of cfg.slabs) {
    if (slabIncome > last) {
      const amt = Math.min(slabIncome, slab.upto) - last;
      breakdown.push({ from: last, to: Math.min(slabIncome, slab.upto), rate: slab.rate, amt, tax: (amt * slab.rate) / 100 });
      last = slab.upto;
    }
  }

  return {
    grossSalary,
    deductions,
    hraExempt,
    slabIncome,
    breakdown,
    tax,
    surcharge,
    cgTax,
    cgSurcharge,
    cess,
    total,
  };
}

function emptyInputs() {
  return {
    basic: 0,
    hraReceived: 0,
    otherAllow: 0,
    salaried: true,
    employerNps: 0,
    otherIncome: 0,
    houseProperty: 0,
    stcg: 0,
    ltcg: 0,
    rentPaid: 0,
    metro: false,
    sec80C: 0,
    sec80D: 0,
    nps1B: 0,
    homeLoanInt: 0,
  };
}

const numField = (v) => (v === "" ? 0 : parseFloat(v) || 0);

function TaxCalculator() {
  const [f, setF] = useState({ ...emptyInputs(), basic: "800000", hraReceived: "320000", otherAllow: "120000" });
  const [activeRegime, setActiveRegime] = useState("new");
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const { oldResult, newResult, better, breakdownRegime } = useMemo(() => {
    const inputs = {
      ...f,
      basic: numField(f.basic),
      hraReceived: numField(f.hraReceived),
      otherAllow: numField(f.otherAllow),
      employerNps: numField(f.employerNps),
      otherIncome: numField(f.otherIncome),
      houseProperty: numField(f.houseProperty),
      stcg: numField(f.stcg),
      ltcg: numField(f.ltcg),
      rentPaid: numField(f.rentPaid),
      sec80C: numField(f.sec80C),
      sec80D: numField(f.sec80D),
      nps1B: numField(f.nps1B),
      homeLoanInt: numField(f.homeLoanInt),
    };
    const oldR = computeRegime(inputs, "old");
    const newR = computeRegime(inputs, "new");
    const better = newR.total <= oldR.total ? "new" : "old";
    return { oldResult: oldR, newResult: newR, better, breakdownRegime: activeRegime === "new" ? newR : oldR };
  }, [f, activeRegime]);

  const suggestions = useMemo(() => {
    const list = [];
    if (numField(f.sec80C) < DEDUCTION_LIMITS.section80C) {
      const room = DEDUCTION_LIMITS.section80C - numField(f.sec80C);
      list.push(
        `You still have ₹${room.toLocaleString("en-IN")} of Section 80C room (ELSS, PPF, life insurance, principal repayment) — only usable in the Old Regime.`
      );
    }
    if (numField(f.nps1B) < DEDUCTION_LIMITS.nps80CCD1B) {
      list.push(
        `An additional ₹${(DEDUCTION_LIMITS.nps80CCD1B - numField(f.nps1B)).toLocaleString("en-IN")} in NPS under Section 80CCD(1B) is available (Old Regime only) — on top of the 80C limit.`
      );
    }
    if (!numField(f.employerNps)) {
      list.push(
        "Ask your employer to route part of your CTC through Section 80CCD(2) (employer NPS contribution) — it's deductible in both regimes and doesn't come out of your take-home."
      );
    }
    if (better === "old" && activeRegime === "new") {
      list.push(`Based on what you've entered, the Old Regime saves you ${formatINR(newResult.total - oldResult.total)} this year — switch the tab below to see the Old Regime breakdown.`);
    }
    if (better === "new" && activeRegime === "old") {
      list.push(`Based on what you've entered, the New Regime saves you ${formatINR(oldResult.total - newResult.total)} this year — switch the tab below to see the New Regime breakdown.`);
    }
    if (numField(f.ltcg) > 0 && numField(f.ltcg) <= CAPITAL_GAINS.ltcgExemption) {
      list.push("Your equity LTCG is within the ₹1.25 lakh annual exemption — consider booking gains up to this limit each year to reset your cost basis tax-free.");
    }
    return list;
  }, [f, better, activeRegime, oldResult, newResult]);

  return (
    <div className="res-panel">
      <div className="tc-section-title">Income Details</div>
      <div className="tc-fields">
        <Field label="Basic Salary (₹/yr)" value={f.basic} onChange={set("basic")} />
        <Field label="HRA Received (₹/yr)" value={f.hraReceived} onChange={set("hraReceived")} />
        <Field label="Other Salary Allowances / Bonus (₹/yr)" value={f.otherAllow} onChange={set("otherAllow")} />
        <Field label="Other Income — interest, etc. (₹/yr)" value={f.otherIncome} onChange={set("otherIncome")} />
        <Field
          label="House Property Income (₹/yr, enter negative for loss)"
          value={f.houseProperty}
          onChange={set("houseProperty")}
        />
        <Field label="Short-Term Capital Gains — equity, Sec 111A (₹/yr)" value={f.stcg} onChange={set("stcg")} />
        <Field label="Long-Term Capital Gains — equity, Sec 112A (₹/yr)" value={f.ltcg} onChange={set("ltcg")} />
      </div>
      <label className="res-checkbox" style={{ marginTop: 4 }}>
        <input type="checkbox" checked={f.salaried} onChange={set("salaried")} />
        Salaried / Pensioner (apply standard deduction)
      </label>

      <div className="tc-section-title">Deductions</div>
      <div className="tc-fields">
        <Field label="Employer NPS — Sec 80CCD(2) (₹/yr)" value={f.employerNps} onChange={set("employerNps")} tag="Both regimes" />
        <Field label="Rent Paid Annually (₹/yr)" value={f.rentPaid} onChange={set("rentPaid")} tag="Old regime" />
        <Field label="Section 80C — ELSS/PPF/LIC/etc. (₹/yr)" value={f.sec80C} onChange={set("sec80C")} tag="Old regime" />
        <Field label="Section 80D — Health Insurance (₹/yr)" value={f.sec80D} onChange={set("sec80D")} tag="Old regime" />
        <Field label="NPS — Sec 80CCD(1B) (₹/yr)" value={f.nps1B} onChange={set("nps1B")} tag="Old regime" />
        <Field label="Home Loan Interest — Sec 24(b) (₹/yr)" value={f.homeLoanInt} onChange={set("homeLoanInt")} tag="Old regime" />
      </div>
      <label className="res-checkbox" style={{ marginTop: 4 }}>
        <input type="checkbox" checked={f.metro} onChange={set("metro")} />
        Living in a metro city (affects HRA exemption — Old Regime)
      </label>

      <p className="res-note" style={{ marginTop: 16 }}>
        FY 2025-26 (AY 2026-27) rules, resident individual below 60. Includes Section 87A rebate with marginal
        relief, surcharge with marginal relief at each threshold, capital gains at their special rates, and 4%
        health &amp; education cess — the same method the Income Tax Department's own calculator uses. This is an
        estimate; complex situations (multiple properties, carried-forward losses, non-equity capital assets) need a
        proper review with us.
      </p>

      {/* Regime comparison */}
      <div className="tc-section-title">New vs Old Regime</div>
      <div className="tc-compare">
        <div className={"tc-compare-card" + (better === "new" ? " tc-compare-card--win" : "")}>
          <div className="tc-compare-label">New Regime{better === "new" && <span className="tc-badge">Recommended</span>}</div>
          <div className="tc-compare-amt">{formatINR(newResult.total)}</div>
          <div className="tc-compare-sub">Monthly: {formatINR(newResult.total / 12)}</div>
        </div>
        <div className={"tc-compare-card" + (better === "old" ? " tc-compare-card--win" : "")}>
          <div className="tc-compare-label">Old Regime{better === "old" && <span className="tc-badge">Recommended</span>}</div>
          <div className="tc-compare-amt">{formatINR(oldResult.total)}</div>
          <div className="tc-compare-sub">Monthly: {formatINR(oldResult.total / 12)}</div>
        </div>
      </div>

      {/* Slab breakdown for whichever regime is selected */}
      <div className="tc-section-title">
        Tax Breakdown by Slab
        <div className="res-toggle tc-inline-toggle">
          <button className={activeRegime === "new" ? "active" : ""} onClick={() => setActiveRegime("new")}>
            New Regime
          </button>
          <button className={activeRegime === "old" ? "active" : ""} onClick={() => setActiveRegime("old")}>
            Old Regime
          </button>
        </div>
      </div>
      <table className="res-table">
        <thead>
          <tr>
            <th>Slab</th>
            <th>Rate</th>
            <th>Taxable Amount</th>
            <th>Tax</th>
          </tr>
        </thead>
        <tbody>
          {breakdownRegime.breakdown.map((b, i) => (
            <tr key={i}>
              <td>
                {formatINR(b.from)} – {b.to === Infinity ? "above" : formatINR(b.to)}
              </td>
              <td>{b.rate}%</td>
              <td>{formatINR(b.amt)}</td>
              <td>{formatINR(b.tax)}</td>
            </tr>
          ))}
          {breakdownRegime.cgTax > 0 && (
            <tr>
              <td>Capital Gains (special rate)</td>
              <td>—</td>
              <td>—</td>
              <td>{formatINR(breakdownRegime.cgTax)}</td>
            </tr>
          )}
          {breakdownRegime.surcharge + breakdownRegime.cgSurcharge > 0 && (
            <tr>
              <td>Surcharge</td>
              <td>—</td>
              <td>—</td>
              <td>{formatINR(breakdownRegime.surcharge + breakdownRegime.cgSurcharge)}</td>
            </tr>
          )}
          <tr>
            <td>Health &amp; Education Cess</td>
            <td>4%</td>
            <td>—</td>
            <td>{formatINR(breakdownRegime.cess)}</td>
          </tr>
        </tbody>
      </table>
      <div className="tc-monthly">
        <span>Estimated Monthly Tax Outgo ({activeRegime === "new" ? "New" : "Old"} Regime)</span>
        <strong>{formatINR(breakdownRegime.total / 12)}</strong>
      </div>

      {suggestions.length > 0 && (
        <>
          <div className="tc-section-title">Tax-Saving Suggestions</div>
          <ul className="tc-suggestions">
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Field({ label, value, onChange, tag }) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {tag && <span className="tc-tag">{tag}</span>}
      </label>
      <input className="form-input" type="number" min="0" value={value} onChange={onChange} />
    </div>
  );
}

/* ── RERA Fee Calculator ── */
function ReraFeeCalculator() {
  const [type, setType] = useState(RERA_FEE_RATES[0].key);
  const [area, setArea] = useState("2000");

  const result = useMemo(() => {
    const a = parseFloat(area) || 0;
    const rateInfo = RERA_FEE_RATES.find((r) => r.key === type);
    const rate = a <= 1000 ? rateInfo.upto1000 : rateInfo.above1000;
    const raw = a * rate;
    const capped = Math.min(raw, RERA_FEE_CAP);
    return { rate, raw, capped };
  }, [type, area]);

  return (
    <div className="res-panel">
      <div className="res-grid">
        <div className="res-form">
          <div className="form-group">
            <label className="form-label">Project Type</label>
            <select className="form-input" value={type} onChange={(e) => setType(e.target.value)}>
              {RERA_FEE_RATES.map((r) => (
                <option key={r.key} value={r.key}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Project Area (sq. m)</label>
            <input
              className="form-input"
              type="number"
              min="0"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <p className="res-note">
            Based on the CG RERA registration fee schedule (₹/sq.m by project category and area slab, capped per
            project). Exact fees are set by the authority and can be revised — confirm the current figure with us
            before filing.
          </p>
        </div>

        <div className="res-result">
          <div className="res-result-row">
            <span>Applicable Rate</span>
            <strong>₹{result.rate} / sq.m</strong>
          </div>
          <div className="res-result-row">
            <span>Calculated Fee</span>
            <strong>{formatINR(result.raw)}</strong>
          </div>
          <div className="res-result-row res-result-total">
            <span>Estimated Fee Payable</span>
            <strong>{formatINR(result.capped)}</strong>
          </div>
          {result.raw > RERA_FEE_CAP && <p className="res-note">Capped at an indicative maximum of {formatINR(RERA_FEE_CAP)}.</p>}
        </div>
      </div>
    </div>
  );
}

/* ── GST Rates ── */
function GstRates() {
  const [amount, setAmount] = useState("10000");
  const [rate, setRate] = useState("18");
  const [mode, setMode] = useState("exclusive");
  const [supply, setSupply] = useState("intra");

  const result = useMemo(() => {
    const amt = parseFloat(amount) || 0;
    const r = parseFloat(rate) || 0;
    let base, gst, total;
    if (mode === "exclusive") {
      gst = (amt * r) / 100;
      base = amt;
      total = amt + gst;
    } else {
      base = amt / (1 + r / 100);
      gst = amt - base;
      total = amt;
    }
    if (supply === "intra") {
      return { base, gst, total, cgst: gst / 2, sgst: gst / 2, igst: 0 };
    }
    return { base, gst, total, cgst: 0, sgst: 0, igst: gst };
  }, [amount, rate, mode, supply]);

  return (
    <div className="res-panel">
      <table className="res-table">
        <thead>
          <tr>
            <th>Slab</th>
            <th>Applies to</th>
            <th>Examples</th>
          </tr>
        </thead>
        <tbody>
          {GST_RATE_SLABS.map((s) => (
            <tr key={s.rate}>
              <td className="res-table-rate">{s.rate}</td>
              <td>{s.desc}</td>
              <td>{s.examples}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="res-note">{GST_RATE_NOTE}</p>

      <div className="res-subhead">Quick GST Calculator</div>
      <div className="res-grid">
        <div className="res-form">
          <div className="form-group">
            <label className="form-label">Amount (₹)</label>
            <input className="form-input" type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">GST Rate</label>
            <select className="form-input" value={rate} onChange={(e) => setRate(e.target.value)}>
              <option value="0">0%</option>
              <option value="5">5%</option>
              <option value="18">18%</option>
              <option value="40">40%</option>
            </select>
          </div>
          <div className="res-toggle">
            <button className={mode === "exclusive" ? "active" : ""} onClick={() => setMode("exclusive")}>
              Add GST
            </button>
            <button className={mode === "inclusive" ? "active" : ""} onClick={() => setMode("inclusive")}>
              Remove GST
            </button>
          </div>
          <div className="res-toggle">
            <button className={supply === "intra" ? "active" : ""} onClick={() => setSupply("intra")}>
              Intra-state (CGST+SGST)
            </button>
            <button className={supply === "inter" ? "active" : ""} onClick={() => setSupply("inter")}>
              Inter-state (IGST)
            </button>
          </div>
        </div>
        <div className="res-result">
          <div className="res-result-row">
            <span>Base Amount</span>
            <strong>{formatINR(result.base)}</strong>
          </div>
          {supply === "intra" ? (
            <>
              <div className="res-result-row">
                <span>CGST</span>
                <strong>{formatINR(result.cgst)}</strong>
              </div>
              <div className="res-result-row">
                <span>SGST</span>
                <strong>{formatINR(result.sgst)}</strong>
              </div>
            </>
          ) : (
            <div className="res-result-row">
              <span>IGST</span>
              <strong>{formatINR(result.igst)}</strong>
            </div>
          )}
          <div className="res-result-row res-result-total">
            <span>Total</span>
            <strong>{formatINR(result.total)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Useful Links ── */
function UsefulLinks() {
  return (
    <div className="res-panel">
      <div className="res-links-grid">
        {USEFUL_LINKS.map((l) => (
          <a key={l.title} href={l.url} target="_blank" rel="noopener noreferrer" className="res-link-card">
            <div className="res-link-title">{l.title}</div>
            <div className="res-link-desc">{l.desc}</div>
            <div className="res-link-url">{l.url.replace("https://", "")} →</div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Resources() {
  const [tab, setTab] = useState(TABS[0]);

  return (
    <section id="resources" className="section section--alt">
      <div className="container">
        <div className="section-header-center" style={{ textAlign: "center" }}>
          <Tag>Free Tools</Tag>
          <GoldLineCentre />
          <h2 className="section-h2" style={{ marginTop: 20, textAlign: "center" }}>
            Calculators &amp; Resources
          </h2>
          <p className="body-text" style={{ textAlign: "center", maxWidth: 580, margin: "14px auto 0" }}>
            Quick estimates for tax and RERA planning, current GST slabs, and links to the official portals we work
            with every day.
          </p>
        </div>

        <div className="res-tabs">
          {TABS.map((t) => (
            <button key={t} className={"res-tab" + (tab === t ? " res-tab--active" : "")} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>

        {tab === "Income Tax Calculator" && <TaxCalculator />}
        {tab === "RERA Fee Calculator" && <ReraFeeCalculator />}
        {tab === "GST Rates" && <GstRates />}
        {tab === "Useful Links" && <UsefulLinks />}
      </div>
    </section>
  );
}