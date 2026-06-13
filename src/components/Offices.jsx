import "../css/Offices.css";
import { OFFICES } from "../data/siteData";
import { GoldLineCentre, Tag } from "./UI";

export default function Offices() {
  return (
    <section id="offices" className="section">
      <div className="container">
        <div className="section-header-center" style={{ textAlign: "center" }}>
          <Tag>Our Locations</Tag>
          <GoldLineCentre />
          <h2 className="section-h2" style={{ marginTop: 20, textAlign: "center" }}>
            Strategic Offices
          </h2>
        </div>

        <div className="offices-grid">
          {OFFICES.map((o) => (
            <div key={o.city} className="office-city-block">
              <div className="office-city-label">{o.city}</div>
              {o.offices.map((off, i) => (
                <div key={i} className="office-card">
                  <div className="office-icon">📍</div>
                  <div>
                    <div className="office-addr">{off.addr}</div>
                    <a href={`tel:${off.ph}`} className="office-ph">
                      📞 {off.ph}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
