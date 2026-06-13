import "../css/Hero.css";
import { STATS } from "../data/siteData";
import { T } from "../theme";

export default function Hero({ scrollTo }) {
  return (
    <section id="home" className="hero">
      <div className="hero-bg-grid" />
      <div className="hero-glow" />

      <div className="hero-badges-row">
        <span className="hero-badge hero-badge--red">ESTABLISHED 2016</span>
        <span className="hero-badge">RBI EMPANELLED</span>
        <span className="hero-badge">ICAI Reg: 021640C</span>
      </div>

      <div className="hero-firm-row">
        <div className="hero-ca-seal">
          <div className="seal-outer">
            <div className="seal-inner">CA</div>
          </div>
        </div>
      </div>

      <h1 className="hero-title">
        <span className="hero-title-namg">NAMG &amp; CO.</span>
        <span className="hero-title-ca">Chartered Accountants</span>
      </h1>

      <p className="hero-desc">
        A premier multidisciplinary professional services firm delivering comprehensive financial,
        tax, and business advisory solutions across diverse industries. With strategic offices in{" "}
        <strong style={{ color: T.goldLight }}>Raipur</strong> and{" "}
        <strong style={{ color: T.goldLight }}>Bilaspur</strong>.
      </p>

      <div className="hero-stats">
        {STATS.map((s) => (
          <div key={s.lbl} className="hero-stat">
            <div className="hero-stat-num">{s.num}</div>
            <div className="hero-stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      <div className="hero-actions">
        <button className="btn-primary" onClick={() => scrollTo("Contact")}>
          Get in Touch
        </button>
        <button className="btn-outline" onClick={() => scrollTo("Services")}>
          Our Services
        </button>
      </div>
    </section>
  );
}
