import "../css/About.css";
import { WHY } from "../data/siteData";
import { GoldLine, Tag } from "./UI";
import { T } from "../theme";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          <div className="about-left">
            <Tag>About the Firm</Tag>
            <GoldLine />
            <h2 className="section-h2" style={{ marginTop: 20 }}>
              Your Trusted Partner for
              <br />
              <em style={{ color: T.gold, fontStyle: "italic" }}>Professional Excellence</em>
            </h2>
            <p className="body-text" style={{ marginTop: 22 }}>
              N A M G &amp; Co. brings together four accomplished Chartered Accountants
              with deep expertise across taxation, audit, valuation, RERA advisory,
              and corporate finance. Our firm has built an outstanding track record
              across Chhattisgarh with a client-first, results-driven approach.
            </p>
            <p className="body-text" style={{ marginTop: 14 }}>
              From our strategic offices in Raipur and Bilaspur, we serve a diverse
              client base — from startups and MSMEs to large corporates and
              government-empanelled engagements.
            </p>

            <div className="about-tags">
              {["RBI Empanelled", "95+ RERA Projects", "All India Rank Holder", "IBBI Registered Valuer"].map(
                (t) => (
                  <span key={t} className="about-tag">
                    {t}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="about-right">
            <div className="why-grid">
              {WHY.map((w) => (
                <div key={w.title} className="why-card">
                  <div className="why-icon">{w.icon}</div>
                  <h4 className="why-title">{w.title}</h4>
                  <p className="why-desc">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
