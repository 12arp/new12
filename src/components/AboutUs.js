import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-hero">
        <h1>About Sahu Metals</h1>
        <p className="subtitle">Your Trusted Partner in Agricultural Equipment</p>
      </div>

      <div className="about-us-content">
        <div className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon">🏢</div>
            <h3>Established</h3>
            <p>1990</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Location</h3>
            <p>Kota, Rajasthan</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌾</div>
            <h3>Industry</h3>
            <p>Agricultural Equipment</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Customers</h3>
            <p>10000+ Satisfied</p>
          </div>
        </div>

        <div className="about-section">
          <div className="about-image">
            <img src={process.env.PUBLIC_URL + "/61ee283f-278d-43e8-8c23-8e0cdbbc61d6.png"} alt="Our Factory" />
          </div>
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Founded with a vision to revolutionize farming practices, Sahu Metals has been serving
              the agricultural community since its inception. We take pride in manufacturing and
              distributing high-quality agricultural equipment that helps farmers increase their
              productivity and efficiency.
            </p>
            <div className="achievement-cards">
              <div className="achievement-card">
                <span className="number">50+</span>
                <span className="label">Products</span>
              </div>
              <div className="achievement-card">
                <span className="number">35+</span>
                <span className="label">Years</span>
              </div>
              <div className="achievement-card">
                <span className="number">5+</span>
                <span className="label">States</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mission-vision-section">
          <div className="mission-card">
            <div className="card-header">
              <span className="icon">🎯</span>
              <h2>Our Mission</h2>
            </div>
            <p>
              To empower farmers with innovative and reliable agricultural equipment, making farming
              more efficient, sustainable, and profitable.
            </p>
          </div>
          <div className="vision-card">
            <div className="card-header">
              <span className="icon">👁️</span>
              <h2>Our Vision</h2>
            </div>
            <p>
              To be the leading manufacturer of agricultural implements while maintaining the highest
              standards of quality and customer service.
            </p>
          </div>
        </div>

        <div className="values-section">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">⭐</div>
              <h3>Quality First</h3>
              <p>Never compromising on product quality and durability</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Customer Focus</h3>
              <p>Dedicated to customer satisfaction and support</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>Continuous improvement in products and processes</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌿</div>
              <h3>Sustainability</h3>
              <p>Promoting eco-friendly farming practices</p>
            </div>
          </div>
        </div>

        <div className="team-section">
          <h2>Leadership Team</h2>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-image">👨‍💼</div>
              <h3>Rajesh Sahu</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-card">
              <div className="team-image">👨‍💼</div>
              <h3>Amit Sahu</h3>
              <p>Managing Director</p>
            </div>
            <div className="team-card">
              <div className="team-image">👨‍💼</div>
              <h3>Suresh Sahu</h3>
              <p>Technical Director</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 