import "../css/Rera.css";
import { RERA_STEPS, RERA_CITIES } from "../data/siteData";
import { GoldLine, Tag } from "./UI";
import { T } from "../theme";

export default function Rera() {
  return (
    <section id="rera" className="section rera-section">
      <div className="rera-bg-accent" />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="rera-top">
          <div className="rera-top-left">
            <Tag>Our Signature Achievement</Tag>
            <GoldLine />
            <h2 className="section-h2" style={{ marginTop: 20 }}>
              RERA Excellence
              <br />
              <em style={{ color: T.gold, fontStyle: "italic" }}>Across Chhattisgarh</em>
            </h2>
            <p className="body-text" style={{ marginTop: 18 }}>
              N A M G &amp; Co. has achieved an outstanding milestone in Real Estate
              (Regulation and Development) Act services. Our dedicated RERA practice
              has successfully registered{" "}
              <strong style={{ color: T.goldLight }}>more than 95 projects</strong> throughout
              the state, covering all major cities including Raipur, Bilaspur, Durg,
              Bhilai, Korba, and Raigarh.
            </p>
          </div>

          <div className="rera-counter-box">
            <div className="rera-big-num">
              95<span style={{ color: T.gold }}>+</span>
            </div>
            <div className="rera-big-lbl">
              RERA Projects
              <br />
              Successfully Registered
            </div>
            <div className="rera-cities">
              {RERA_CITIES.map((c) => (
                <span key={c} className="rera-city-tag">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="rera-steps">
          {RERA_STEPS.map((s) => (
            <div key={s.num} className="rera-step">
              <div className="rera-step-num">{s.num}</div>
              <div className="rera-step-line" />
              <h4 className="rera-step-title">{s.title}</h4>
              <p className="rera-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
