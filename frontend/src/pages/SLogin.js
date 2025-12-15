import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SLogin.css";

export default function SLogin() {
    const [isLogin, setIsLogin] = useState(true);

    const navigate = useNavigate();

    // ------------------------- LOGIN STATE -------------------------
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleLoginChange = (e) => {
        const fieldName = e.target.name;   // FIXED ESLINT ERROR
        setLoginData({ ...loginData, [fieldName]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Login Successful!");

                // ⭐ Store student id for dashboard
                localStorage.setItem("student_id", data.user.id);

                console.log("User:", data.user);
                navigate("/studentdashboard");
            } else {
                alert(data.message || "Login failed");
            }
        } catch (err) {
            alert("Failed to connect to server");
        }
    };

    // ------------------------- SIGNUP STATE -------------------------
    const [signupData, setSignupData] = useState({
        fullName: "",
        rollNo: "",
        semester: "",
        email: "",
        password: "",
        photo: null,
    });

    const handleSignupChange = (e) => {
        const fieldName = e.target.name;  // FIXED ESLINT ERROR
        setSignupData({ ...signupData, [fieldName]: e.target.value });
    };

    const handleFileChange = (e) => {
        setSignupData({ ...signupData, photo: e.target.files[0] });
    };

    const handleSignup = async () => {
        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("rollNo", signupData.rollNo);
        formData.append("semester", signupData.semester);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("photo", signupData.photo);

        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                body: formData
            });

            const data = await res.json();

            if (res.ok) {
                alert("Signup Successful!");
                setIsLogin(true); // go to login screen
            } else {
                alert(data.message || "Signup failed");
            }
        } catch (err) {
            alert("Failed to connect to server");
        }
    };

    // ------------------------- JSX -------------------------
    return (
        <div className="main_container">
            <div className="S_container">
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

                    {/* ---------------- LOGIN FORM ---------------- */}
                    {isLogin ? (
                        <div className="Loginform">
                            <h2>Student Login</h2>

                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleLoginChange}
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleLoginChange}
                            />

                            <a href="#">Forgot Password?</a>

                            <button onClick={handleLogin}>Login</button>

                            <p>
                                Not a Member?{" "}
                                <a href="#" onClick={() => setIsLogin(false)}>
                                    SignUp Now
                                </a>
                            </p>
                        </div>
                    ) : (
                        /* ---------------- SIGNUP FORM ---------------- */
                        <div className="Loginform">
                            <h2>SignUp</h2>

                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                onChange={handleSignupChange}
                            />

                            <input
                                type="text"
                                name="rollNo"
                                placeholder="Roll No"
                                onChange={handleSignupChange}
                            />

                            <input
                                type="text"
                                name="semester"
                                placeholder="Semester"
                                onChange={handleSignupChange}
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleSignupChange}
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleSignupChange}
                            />

                            <label>Upload Student Image</label>
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handleFileChange}
                            />

                            <button onClick={handleSignup}>SignUp</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
