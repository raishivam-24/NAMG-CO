import "../css/Services.css";
import { SERVICES } from "../data/siteData";
import { GoldLineCentre, Tag } from "./UI";

export default function Services() {
  return (
    <section id="services" className="section section--alt">
      <div className="container">
        <div className="section-header-center" style={{ textAlign: "center" }}>
          <Tag>What We Offer</Tag>
          <GoldLineCentre />
          <h2 className="section-h2" style={{ marginTop: 20, textAlign: "center" }}>
            Comprehensive Professional Services
          </h2>
          <p className="body-text" style={{ textAlign: "center", maxWidth: 580, margin: "14px auto 0" }}>
            End-to-end financial, tax, and advisory solutions tailored for every stage of your business journey.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s) => (
            <div key={s.title} className="service-card">
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
