import "../css/Navbar.css";
import { NAV_LINKS } from "../data/siteData";

export default function Navbar({ activeNav, scrolled, menuOpen, setMenuOpen, scrollTo }) {
  return (
    <>
      <nav className="navbar" style={{ background: scrolled ? "rgba(246,243,234,0.97)" : "transparent" }}>
        <div className="nav-brand" onClick={() => scrollTo("Home")}>
          <img src="/logo.png" alt="CA India Logo" className="brand-logo" />
          <div>
            <div className="brand-name">NAMG &amp; CO.</div>
            <div className="brand-sub">Chartered Accountants</div>
          </div>
        </div>

        <div className="nav-links-desktop">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              className={`nav-link${activeNav === l ? " nav-link--active" : ""}`}
              onClick={() => scrollTo(l)}
            >
              {l}
            </button>
          ))}
        </div>

        <a href="tel:9806509694" className="nav-cta">
          Contact Us
        </a>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map((l) => (
            <button key={l} className="mobile-link" onClick={() => scrollTo(l)}>
              {l}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
