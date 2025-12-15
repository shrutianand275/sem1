// src/pages/Contact.js
import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-card">
        <h1>Contact Us</h1>
        <p className="subtitle">
          Face Authentication Attendance System <br />
          For School & College
        </p>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="4" required></textarea>

          <button type="submit">Send Message</button>
        </form>

        <div className="contact-footer">
          <p>
            Developed by <strong>Shruti</strong> & <strong>Gautami</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
