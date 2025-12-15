// src/components/Header.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaEnvelope } from "react-icons/fa";
import "./HeaderFooter.css";

export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-inner">

        {/* Logo */}
        <div className="logo">
          🎓 <span>Face Attendance</span>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            <FaHome className="icon" /> Home
          </Link>

          <Link to="/slogin" className={location.pathname === "/slogin" ? "active" : ""}>
            <FaUserGraduate className="icon" /> Student
          </Link>

          <Link to="/tlogin" className={location.pathname === "/tlogin" ? "active" : ""}>
            <FaChalkboardTeacher className="icon" /> Teacher
          </Link>

          <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
            <FaEnvelope className="icon" /> Contact
          </Link>
        </nav>

      </div>
    </header>
  );
}
