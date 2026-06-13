import { CREDENTIALS } from "../data/siteData";

export default function CredentialsStrip() {
  return (
    <div className="cred-strip">
      {CREDENTIALS.map((c) => (
        <div key={c.label} className="cred-item">
          <div className="cred-label">{c.label}</div>
          <div className="cred-sub">{c.sub}</div>
        </div>
      ))}
    </div>
  );
}
