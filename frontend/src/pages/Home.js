import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-overlay">
        <div className="hero-text">
          <h1>Face Attendance Portal</h1>
          <p>
            AI-powered face recognition system for secure, accurate, and
            real-time student attendance tracking.
          </p>
        </div>
      </div>
    </div>
  );
}