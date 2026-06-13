import { useState } from "react";
import { T } from "../theme";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", msg: "" });
  const [sent, setSent] = useState(false);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = () => {
    if (!form.name || !form.email) return;
    setSent(true);
  };

  if (sent)
    return (
      <div className="form-success">
        <div className="form-success-icon">✓</div>
        <h3 style={{ color: T.gold, fontFamily: "'Cormorant Garamond',serif", fontSize: 26 }}>
          Message Received
        </h3>
        <p style={{ color: T.muted, marginTop: 10 }}>Our team will get back to you shortly.</p>
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
          <label className="form-label">Email *</label>
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
      <button className="btn-primary" style={{ width: "100%", marginTop: 4 }} onClick={submit}>
        Send Enquiry →
      </button>
    </div>
  );
}
