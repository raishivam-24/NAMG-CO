import "../css/Contact.css";
import { GoldLine, Tag } from "./UI";
import { T } from "../theme";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="section section--alt">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-left">
            <Tag>Get In Touch</Tag>
            <GoldLine />
            <h2 className="section-h2" style={{ marginTop: 20 }}>
              Ready to Work
              <br />
              <em style={{ color: T.gold, fontStyle: "italic" }}>Together?</em>
            </h2>
            <p className="body-text" style={{ marginTop: 18 }}>
              Whether you need assistance with RERA registrations, tax advisory,
              audit services, or strategic business consulting, our team is ready
              to support your success.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <span className="contact-info-icon">✉</span>
                <div>
                  <div className="contact-info-label">Primary Email</div>
                  <a href="mailto:ankit@namg.in" className="contact-info-val">
                    ankit@namg.in
                  </a>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-icon">📞</span>
                <div>
                  <div className="contact-info-label">Primary Mobile</div>
                  <a href="tel:9806509694" className="contact-info-val">
                    +91 98065 09694
                  </a>
                </div>
              </div>
              {/* <div className="contact-info-item">
                <span className="contact-info-icon">🏢</span>
                <div>
                  <div className="contact-info-label">Headquarters</div>
                  <div className="contact-info-val">Samta Colony, Raipur, CG – 492001</div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="contact-right">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
