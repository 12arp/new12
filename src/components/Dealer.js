import React from "react";
import "./Dealer.css";

export default function Dealer() {
  return (
    <section className="dealer-section">
      <div>
      <p style={{ color: '#5a3ff6', fontWeight: 'bold', textAlign: 'center'}}>Became a dealer</p>

        <h2 id="Dealer">Join Our Network: Become a Dealer Today!</h2>
        <ul className="dealer-benefits">
          <li>Competitive Margins</li>
          <li>Marketing Support</li>
          <li>Training and Support</li>
          <li>Exclusive Territory Rights</li>
        </ul>
      </div>
      <div className="dealer-cta-image">
        <img
          src={process.env.PUBLIC_URL + "/929db075-eef2-45be-b11a-12416933e488 (1).png"}
          alt="Become Our Dealer"
        />
      </div>
    </section>
  );
}
