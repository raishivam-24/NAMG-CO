import { useMemo, useState } from "react";
import "../css/Resources.css";
import {
  INCOME_TAX_NEW_REGIME,
  INCOME_TAX_OLD_REGIME,
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

/* ── Income Tax Calculator ── */
function computeTax(income, regime, isSalaried) {
  const cfg = regime === "new" ? INCOME_TAX_NEW_REGIME : INCOME_TAX_OLD_REGIME;
  const deduction = isSalaried ? cfg.standardDeduction : 0;
  const taxable = Math.max(income - deduction, 0);

  let tax = 0;
  let last = 0;
  for (const slab of cfg.slabs) {
    if (taxable > last) {
      const amountInSlab = Math.min(taxable, slab.upto) - last;
      tax += (amountInSlab * slab.rate) / 100;
      last = slab.upto;
    }
  }

  const rebateApplies = taxable <= cfg.rebateLimit;
  if (rebateApplies) tax = 0;

  const cess = tax * 0.04;
  return { taxable, tax, cess, total: tax + cess };
}

function TaxCalculator() {
  const [income, setIncome] = useState("1200000");
  const [regime, setRegime] = useState("new");
  const [salaried, setSalaried] = useState(true);

  const result = useMemo(() => {
    const n = parseFloat(income) || 0;
    return computeTax(n, regime, salaried);
  }, [income, regime, salaried]);

  return (
    <div className="res-panel">
      <div className="res-grid">
        <div className="res-form">
          <div className="form-group">
            <label className="form-label">Annual Gross Income (₹)</label>
            <input
              className="form-input"
              type="number"
              min="0"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tax Regime</label>
            <div className="res-toggle">
              <button className={regime === "new" ? "active" : ""} onClick={() => setRegime("new")}>
                New Regime
              </button>
              <button className={regime === "old" ? "active" : ""} onClick={() => setRegime("old")}>
                Old Regime
              </button>
            </div>
          </div>

          <label className="res-checkbox">
            <input type="checkbox" checked={salaried} onChange={(e) => setSalaried(e.target.checked)} />
            Salaried / Pensioner (apply standard deduction)
          </label>

          <p className="res-note">
            FY 2025-26 (AY 2026-27) slabs, resident individual below 60. Includes 4% health &amp; education cess.
            Surcharge for income above ₹50 lakh is not included here — talk to us for an exact figure.
          </p>
        </div>

        <div className="res-result">
          <div className="res-result-row">
            <span>Taxable Income</span>
            <strong>{formatINR(result.taxable)}</strong>
          </div>
          <div className="res-result-row">
            <span>Income Tax</span>
            <strong>{formatINR(result.tax)}</strong>
          </div>
          <div className="res-result-row">
            <span>Health &amp; Education Cess (4%)</span>
            <strong>{formatINR(result.cess)}</strong>
          </div>
          <div className="res-result-row res-result-total">
            <span>Estimated Total Tax</span>
            <strong>{formatINR(result.total)}</strong>
          </div>
        </div>
      </div>
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
            Indicative CG RERA registration fee based on the publicly published per-sq.m rate slabs. Actual fees
            depend on the final project category and are subject to change — confirm the exact amount with us before
            filing.
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

  const result = useMemo(() => {
    const amt = parseFloat(amount) || 0;
    const r = parseFloat(rate) || 0;
    if (mode === "exclusive") {
      const gst = (amt * r) / 100;
      return { base: amt, gst, total: amt + gst };
    }
    const base = amt / (1 + r / 100);
    return { base, gst: amt - base, total: amt };
  }, [amount, rate, mode]);

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
        </div>
        <div className="res-result">
          <div className="res-result-row">
            <span>Base Amount</span>
            <strong>{formatINR(result.base)}</strong>
          </div>
          <div className="res-result-row">
            <span>GST</span>
            <strong>{formatINR(result.gst)}</strong>
          </div>
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
