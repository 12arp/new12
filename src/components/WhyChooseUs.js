import React from "react";
import { FaFlag, FaRupeeSign, FaCheckCircle, FaRocket, FaChartLine } from "react-icons/fa";
import "./WhyChooseUs.css";

export default function WhyChooseUs() {
  return (
    <section className="why-choose-section">
      <p>FEATURES</p>
      <h2>Why Choose Us?</h2>
      <div className="features-list">
        <div className="feature-card">
          <FaFlag className="card-icon-1" />
          <div className="feature-title">Made in India</div>
          <div className="feature-desc">Proudly manufactured in India, supporting local innovation and growth.</div>
        </div>
        <div className="feature-card">
          <FaRupeeSign className="card-icon-2" />
          <div className="feature-title">Government Subsidy</div>
          <div className="feature-desc">Our products are eligible for government subsidy, so you save more whenever you buy from us.</div>
        </div>
        <div className="feature-card">
          <FaCheckCircle className="card-icon-3" />
          <div className="feature-title">ISI Marked</div>
          <div className="feature-desc">Highest quality, tested and ISI marked for reliability and peace of mind.</div>
        </div>
      </div>
      <div className="features-list">
        <div className="feature-card">
          <FaRocket className="card-icon-4" />
          <div className="feature-title">Increased Efficiency</div>
          <div className="feature-desc">Our equipment helps you get more done in less time, with less effort.</div>
        </div>
        <div className="feature-card">
          <FaChartLine className="card-icon-5" />
          <div className="feature-title">Improved Productivity</div>
          <div className="feature-desc">Boost your agricultural output and maximize your harvest with our advanced solutions.</div>
        </div>
      </div>
    </section>
  );
}
