// src/components/Footer.js
import React from "react";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import "./HeaderFooter.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Center Section */}
        <div className="footer-center">
          <p>© {new Date().getFullYear()} Face Attendance Portal</p>
          <p>Making attendance smarter, faster, and secure.</p>
          <p className="dev-note">🚧 Development in Progress</p>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <h4>Connect with us</h4>
          <div className="social-icons">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
