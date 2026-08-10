import "../css/WhatsAppFloat.css";
import { WHATSAPP_NUMBER } from "../data/siteData";

export default function WhatsAppFloat() {
  const text = encodeURIComponent("Hello NAMG & Co., I'd like to enquire about your services.");
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff" aria-hidden="true">
        <path d="M16 3C9.1 3 3.5 8.6 3.5 15.5c0 2.5.7 4.8 1.9 6.8L3 29l6.9-2.3c1.9 1.1 4.1 1.7 6.1 1.7 6.9 0 12.5-5.6 12.5-12.5S22.9 3 16 3zm0 22.7c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.1 1.4 1.4-4-.3-.4c-1.1-1.7-1.7-3.7-1.7-5.8 0-5.8 4.7-10.5 10.5-10.5S26.5 9.7 26.5 15.5 21.8 25.7 16 25.7zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.5.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6-.1-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.7 5 .8.3 1.4.6 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.4z" />
      </svg>
    </a>
  );
}
