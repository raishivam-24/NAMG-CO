import { useState, useEffect } from "react";
import "./css/Common.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CredentialsStrip from "./components/CredentialsStrip";
import About from "./components/About";
import Services from "./components/Services";
import Rera from "./components/Rera";
import Team from "./components/Team";
import Offices from "./components/Offices";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Resources from "./components/Resources";
import WhatsAppFloat from "./components/WhatsAppFloat";

export default function App() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setActiveNav(id);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Navbar
        activeNav={activeNav}
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />

      <Hero scrollTo={scrollTo} />

      <CredentialsStrip />

      <About />

      <Services />

      <Rera />

      <Resources/>

      <Team />

      <Offices />

      <Contact />

      <WhatsAppFloat />

      <Footer scrollTo={scrollTo} />
    </div>
  );
}
