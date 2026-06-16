import "../css/Team.css";
import { TEAM } from "../data/siteData";
import { GoldLineCentre, Tag } from "./UI";

export default function Team() {
  return (
    <section id="team" className="section section--alt">
      <div className="container">
        <div className="section-header-center" style={{ textAlign: "center" }}>
          <Tag>Leadership</Tag>
          <GoldLineCentre />
          <h2 className="section-h2" style={{ marginTop: 20, textAlign: "center" }}>
            Meet Our Leadership Team
          </h2>
        </div>

        <div className="team-grid">
          {TEAM.map((m) => (
            <div key={m.name} className="team-card">
              <div className="team-avatar">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} className="team-photo" />
                ) : (
                  <div className="team-initials">{m.initials}</div>
                )}
                <div className="team-avatar-ring" />
              </div>
              <h3 className="team-name">{m.name}</h3>
              <div className="team-quals">{m.quals}</div>
              <div className="team-mem">ICAI: {m.mem}</div>
              <div className="team-rank-badge">{m.rank}</div>
              <p className="team-expertise">{m.expertise}</p>
              <div className="team-contacts">
                <a href={`mailto:${m.email}`} className="team-contact-link">
                  ✉ {m.email}
                </a>
                <a href={`tel:${m.mobile}`} className="team-contact-link">
                  📞 {m.mobile}
                </a>
                {m.linkedin && (
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="team-contact-link">
                  💼 LinkedIn
                </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
