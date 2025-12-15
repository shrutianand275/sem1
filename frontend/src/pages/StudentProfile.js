import React, { useEffect, useState } from "react";
import "./StudentProfile.css";

export default function StudentProfile() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const studentId = localStorage.getItem("student_id");

    if (!studentId) return;

    fetch(`http://localhost:5000/api/auth/student/${studentId}`)
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((err) => console.error("Error fetching student:", err));
  }, []);

  if (!student) {
    return <div className="profile-loading">Loading...</div>;
  }

  return (
    <div className="profile-bg">
      <div className="id-card">
        
        
        <img
        src={`http://localhost:5000/uploads/${student.photo}`}
        alt="student"
        className="profile-photo"
        />

        <h2>{student.fullName}</h2>

        <div className="info">
          <p><b>Roll No:</b> {student.rollNo}</p>
          <p><b>Semester:</b> {student.semester}</p>
          <p><b>Email:</b> {student.email}</p>
        </div>
      </div>
    </div>
  );
}
