import React, { useState, useEffect } from "react";
import "./StudentDashboard.css";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"; //added for pie chart


export default function StudentDashboard() {
  
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    
    // Get student ID stored in localStorage after login
    const studentId = localStorage.getItem("student_id");
    if (!studentId) return;

    fetch(`http://localhost:5000/api/auth/student/${studentId}`)

      .then(res => res.json())
      .then(data => setStudent(data))
      .catch(err => console.log("Error fetching student:", err));
  }, []);
  // TEMPORARY / DUMMY attendance data
    const totalLectures = 42;
    const presentDays = 34;
    const absentDays = totalLectures - presentDays;

    const attendanceData = [
      { name: "Present", value: presentDays },
      { name: "Absent", value: absentDays }
    ];

    const COLORS = ["#7fcdfaff", "#0d5781ff"];


  if (!student) return <p>Loading...</p>;
  


  return (
    <div className="dashboard-container">

      <div className="sidebar">
        <h2>Student</h2>
        <ul>
          <li className="active">Dashboard</li>

          <li
           onClick={() => navigate("/student/profile")}
           style={{ cursor: "pointer" }}
          >
          Profile
          </li>

          <li>Mark Attendance</li>
          <li
          onClick={() => {
          if (window.confirm("Are you sure you want to logout?")) {
          localStorage.removeItem("student_id");
          navigate("/slogin");
          }
          }}
          style={{ cursor: "pointer" }}
          >
          Logout
          </li>

        </ul>

      </div>

      <div className="main-content">
        <h1>Welcome {student.fullName} 👋</h1>

        <div className="dashboard-main-wrapper"> {/* <-- WRAPPER START */}
          <div className="left-content">   {/* <-- LEFT START */}

           <div className="profile-card">
              <img 
                src={`http://localhost:5000/uploads/${student.photo}`} 
                alt="student" 
              />
              <div>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Roll No:</strong> {student.rollNo}</p>
                <p><strong>Semester:</strong> {student.semester}</p>
                <p><strong>Email:</strong> {student.email}</p>
              </div>
            </div>

            <div className="notice-board">
              <h2>📢 Latest Notices</h2>
              <ul>
                <li>College will remain closed on Friday.</li>
                <li>Internal exams start next week.</li>
                <li>Submit assignments by Monday.</li>
              </ul>
            </div>
          </div>   {/* <-- LEFT END */}

          <div className="right-content">   {/* <-- RIGHT START */}
            <div className="attendance-chart-card">
            <h2>📊 Attendance Overview</h2>

            <PieChart width={300} height={300}>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                label
                outerRadius={100}
                dataKey="value"
              >
                {attendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>

              <p className="attendance-percent">
                Attendance: {Math.round((presentDays / totalLectures) * 100)}%
              </p>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

