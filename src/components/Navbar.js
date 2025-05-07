import React from "react";
import "./Navbar.css";
import { FaPhoneAlt } from 'react-icons/fa';
import { Link, useLocation } from "react-router-dom";
import { FaWhatsapp } from 'react-icons/fa';

export default function Navbar() {
  const whatsappNumber = "9876542211";
  const whatsappMessage = encodeURIComponent("Hi, I want to connect to you for some Product query");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const callLink = `tel:${whatsappNumber}`;
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    // Only scroll if we're on the home page
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // If not on home page, navigate to home and then scroll
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src={process.env.PUBLIC_URL + "/61ee283f-278d-43e8-8c23-8e0cdbbc61d6.png"}
          alt="Sahu Metals Logo"
          className="navbar-logo-img"
          onClick={() => scrollToSection('home')}
          style={{ cursor: 'pointer' }}
        />
        <span>Sahu Metals</span>
      </div>
      <ul className="navbar-menu">
        <li onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>Home</li>
        <li><Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>About Us</Link></li>
        <li><Link to="/products" style={{ textDecoration: "none", color: "inherit" }}>Products</Link></li>
        <li onClick={() => scrollToSection('Contact')} style={{ cursor: 'pointer' }}>Contact Us</li>
        <li onClick={() => scrollToSection('Dealer')} style={{ cursor: 'pointer' }}>Become Dealer</li>
      </ul>
      <div className="navbar-buttons">
        <a href={whatsappLink} className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="icon" />
          <span className="btn-text">WhatsApp</span>
        </a>

        <a href={callLink} className="call-btn">
          <FaPhoneAlt className="icon" />
          <span className="btn-text">Call Us</span>
        </a>
      </div>
    </nav>
  );
}

// Add the floating language toggle button
function LangToggleButton() {
  return (
    <button
      className="lang-toggle-btn-fixed"
      onClick={() => {
        const lang = (document.cookie.match('(^|;) ?googtrans=([^;]*)(;|$)') || [])[2] || '/en/en';
        const newLang = lang.endsWith('/hi') ? '/en/en' : '/en/hi';
        document.cookie = `googtrans=${newLang};path=/`;
        document.cookie = `googtrans=${newLang};domain=.${window.location.hostname};path=/`;
        window.location.reload();
      }}
    >
      हिंदी / English
    </button>
  );
}

// Export both components
export function NavbarWithLangToggle() {
  return (
    <>
      <Navbar />
      <LangToggleButton />
    </>
  );
} 