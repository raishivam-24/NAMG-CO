import "../css/Footer.css";
import { NAV_LINKS } from "../data/siteData";
import { T } from "../theme";

export default function Footer({ scrollTo }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <div className="brand-badge" style={{ width: 36, height: 36, fontSize: 12 }}>
                CA
              </div>
              <div>
                <div className="brand-name">NAMG &amp; CO.</div>
                <div className="brand-sub">Chartered Accountants</div>
              </div>
            </div>
            <p className="footer-tagline">
              Your trusted partner for professional excellence in chartered
              accountancy and business advisory services across Chhattisgarh.
            </p>
          </div>

          <div>
            <div className="footer-section-title">Quick Links</div>
            {NAV_LINKS.map((l) => (
              <button key={l} className="footer-link" onClick={() => scrollTo(l)}>
                {l}
              </button>
            ))}
          </div>

          <div>
            <div className="footer-section-title">Services</div>
            {["RERA", "GST Advisory", "Income Tax", "Audit & Assurance", "Valuation", "Virtual CFO"].map((s) => (
              <div key={s} className="footer-service">
                {s}
              </div>
            ))}
          </div>

          <div>
            <div className="footer-section-title">Contact</div>
            <div className="footer-contact-item">
              ✉ <a href="mailto:ankit@namg.in" className="footer-contact-link">ankit@namg.in</a>
            </div>
            <div className="footer-contact-item">
              📞 <a href="tel:9806509694" className="footer-contact-link">+91 98065 09694</a>
            </div>
            <div className="footer-contact-item">
              📞 <a href="tel:8770132482" className="footer-contact-link">+91 87701 32482</a>
            </div>
            <div className="footer-contact-item">
              📞 <a href="tel:9021185551" className="footer-contact-link">+91 90211 85551</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2025 N A M G &amp; Co. All rights reserved.</div>
          <div style={{ color: T.dim }}>
            ICAI Reg. No.: 021640C &nbsp;|&nbsp; RBI Empanelled &nbsp;|&nbsp; IBBI Registered Valuer
          </div>
        </div>
      </div>
    </footer>
  );
}
