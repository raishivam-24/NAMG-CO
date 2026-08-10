import { useState } from "react";
import { T } from "../theme";
import { WHATSAPP_NUMBER } from "../data/siteData";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", msg: "" });
  const [sent, setSent] = useState(false);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const buildWhatsAppText = () => {
    const lines = [
      `Hello NAMG & Co., I'd like to enquire about your services.`,
      `Name: ${form.name || "-"}`,
      form.email ? `Email: ${form.email}` : null,
      form.phone ? `Phone: ${form.phone}` : null,
      form.service ? `Service required: ${form.service}` : null,
      form.msg ? `Message: ${form.msg}` : null,
    ].filter(Boolean);
    return lines.join("\n");
  };

  const sendOnWhatsApp = () => {
    if (!form.name) return;
    const text = encodeURIComponent(buildWhatsAppText());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const submit = () => {
    if (!form.name || !form.email) return;
    setSent(true);
  };

  if (sent)
    return (
      <div className="form-success">
        <div className="form-success-icon">✓</div>
        <h3 style={{ color: T.gold, fontFamily: "'Cormorant Garamond',serif", fontSize: 26 }}>
          Message Sent
        </h3>
        <p style={{ color: T.muted, marginTop: 10 }}>
          Our team will get back to you shortly. If WhatsApp didn't open automatically, tap the button below again.
        </p>
      </div>
    );

  return (
    <div className="contact-form">
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Your Name *</label>
          <input
            className="form-input"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            placeholder="email@example.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input
            className="form-input"
            placeholder="+91 XXXXX XXXXX"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Service Required</label>
          <select className="form-input" value={form.service} onChange={(e) => update("service", e.target.value)}>
            <option value="">Select a service</option>
            <option>RERA Registration</option>
            <option>GST Advisory</option>
            <option>Income Tax</option>
            <option>Audit & Assurance</option>
            <option>Valuation</option>
            <option>Virtual CFO</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div className="form-group" style={{ marginTop: 0 }}>
        <label className="form-label">Message</label>
        <textarea
          className="form-input form-textarea"
          placeholder="Describe your requirements..."
          value={form.msg}
          onChange={(e) => update("msg", e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button className="btn-whatsapp" onClick={sendOnWhatsApp}>
          <span aria-hidden="true">💬</span> Send on WhatsApp
        </button>
        <button className="btn-primary" onClick={submit}>
          Send Enquiry →
        </button>
      </div>
      <p className="form-hint">"Send on WhatsApp" opens a chat with your message pre-filled — nothing is sent until you hit send there.</p>
    </div>
  );
}
