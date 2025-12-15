import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import "./App.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import SLogin from "./pages/SLogin";
import TLogin from "./pages/TLogin";
import Contact from "./pages/Contact";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";



function AppWrapper() {
  const location = useLocation();

  // Normalize pathname to lowercase for consistency
  const path = location.pathname.toLowerCase();

  // Pages without header/footer
  const noHeaderFooter = ["/slogin", "/tlogin"];

  const showHeaderFooter = !noHeaderFooter.includes(path);

  return (
    <>
      {showHeaderFooter && <Header />}

      <main style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/slogin" element={<SLogin />} />
          <Route path="/tlogin" element={<TLogin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />


        </Routes>
      </main>

      {showHeaderFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}