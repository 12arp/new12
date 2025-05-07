import React from "react";
import "./Hero.css";
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

export default function Hero() {
  const whatsappNumber = "9876542211";
  const whatsappMessage = encodeURIComponent("I want to connect to you for some query");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const callLink = `tel:${whatsappNumber}`;

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>
          <span className="highlight">Empowering</span><br />
          <span className="dark-text">Farmers,</span>
          <span className="highlight"> Enhancing</span><br />
          <span className="dark-text">Harvests</span>
        </h1>
        <p>
          Get the best farm equipment for a bountiful harvest! Our machines
          are designed to make farming easier, faster, and more efficient.<br />
          From plowing to harvesting, we've got you covered.
        </p>
        <div className="hero-buttons">
          <a href={callLink} className="call-btn">
            <FaPhoneAlt />
            <span className="btn-text">Call Us</span>
          </a>
          <a href={whatsappLink} className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
            <span className="btn-text">WhatsApp</span>
          </a>
        </div>
      </div>
      <div className="hero-image">
        <img 
          src={process.env.PUBLIC_URL + "/e1746ce1-3775-4413-9a33-c1e020abfa92.png"} 
          alt="Farm Equipment"
        />
      </div>
    </section>
  );
}
