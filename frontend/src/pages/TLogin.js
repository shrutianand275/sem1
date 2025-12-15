import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TLogin.css";

export default function TLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    semester: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔐 Teacher Login
  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/teacher/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("teacher_id", data.teacher.id);
      navigate("/teacherdashboard");
    } else {
      alert(data.message);
    }
  };

  // 📝 Teacher Signup
  const handleSignup = async () => {
    const res = await fetch("http://localhost:5000/api/teacher/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Teacher signup successful");
      setIsLogin(true);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="main_container">
      <div className="container">
        <div className="form-container">
          <div className="form-toggle">
            <button
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>

            <button
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              SignUp
            </button>
          </div>

          {isLogin ? (
            <div className="Loginform">
              <h2>Teacher Login</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <button onClick={handleLogin}>Login</button>
            </div>
          ) : (
            <div className="Loginform">
              <h2>Teacher SignUp</h2>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                onChange={handleChange}
              />
              <input
                type="text"
                name="semester"
                placeholder="Semester"
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />

              <button onClick={handleSignup}>SignUp</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


/*import React, {useState} from "react";
import './TLogin.css';

export default function Tlogin() {
    const [isLogin , setIsLogin] = useState(true);
    return(
        <div className='main_container'>
            <div className="container">
            <div className='form-container'>
                <div className='form-toggle'>
                    <button className={isLogin ? 'active' : ""}
                     onClick={()=>setIsLogin(true)}>Login</button>

                    <button className={!isLogin ? 'active' : ""}
                     onClick={()=>setIsLogin(false)}>SignUp</button>
                </div>
                {isLogin ? <>
                <div className='Loginform'>
                    <h2>Teachear Login</h2>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <a href='#'>Forgot Password?</a>
                    <button>Login</button>
                    <p>Not a Member?<a href='#' onClick={()=>setIsLogin(false)}>SignUp Now</a></p>
                </div>
                </> : <>
                    <div className='Loginform'>
                    <h2>SignUp</h2>
                    <input type="text" placeholder="Full Name"/>
                    <input type="text" placeholder="Subject"/>
                    <input type="text" placeholder="Semester"/>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <input type="password" placeholder="Confirm Password"/>

                    <button>SignUp</button>
                    </div>
                </> }
            </div>
            </div>
        </div>
    )
}
*/

