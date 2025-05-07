import React, { useState } from "react";
import "./Contact.css";

const ACCESS_KEY = "4d9f7a62-4b12-487d-9ec3-199da11ea174";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      const json = await response.json();

      if (json.success) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: "Message sent successfully!" }
        });
        setFormData({
          name: "",
          email: "",
          message: ""
        });
      } else {
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: true, msg: json.message || "An error occurred. Please try again later." }
        });
      }
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: "An error occurred. Please try again later." }
      });
    }
  };

  return (
    <section id="Contact" className="contact-section">
      <p>Contact Us</p>
      <h2>Get In Touch With Us For Any Inquiries.</h2>
      <div className="contact-main">
        <div className="contact-details">
          <div className="contact-logo">Sahu Metals Kota</div>
          <div className="contact-info">
            <div><span role="img" aria-label="location">🌍</span> G-510(1st),IPIA, Road no. 7, Anantpura, Kota, Rajasthan</div>
            <div><span role="img" aria-label="phone">☎</span> +91 9928398987</div>
            <div><span role="img" aria-label="phone">☎</span> +91 9829961487</div>
            <div><span role="img" aria-label="phone">☎</span> +91 6378140573</div>
            <div><span role="img" aria-label="email">📩</span> sahumetalskota@gmail.com</div>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-title">Send Us a Message</div>
          {status.info.msg && (
            <div className={`form-message ${status.info.error ? "error" : "success"}`}>
              {status.info.msg}
            </div>
          )}
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            required
          />
          <button type="submit" disabled={status.submitting}>
            {status.submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
} 