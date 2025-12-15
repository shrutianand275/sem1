import db from "../config/db.js";
import bcrypt from "bcryptjs";

// ---------------- TEACHER SIGNUP ----------------
export const teacherSignup = (req, res) => {
    const { fullName, subject, semester, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = `INSERT INTO teachers (full_name, subject, semester, email, password)
                 VALUES (?, ?, ?, ?, ?)`;

    db.query(
        sql,
        [fullName, subject, semester, email, hashedPassword],
        (err) => {
            if (err) {
                return res.status(500).json({ message: "Signup failed", error: err });
            }

            res.json({ message: "Teacher Signup Successful" });
        }
    );
};



// ---------------- TEACHER LOGIN ----------------
export const teacherLogin = (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM teachers WHERE email = ?", [email], (err, results) => {
        if (err) return res.status(500).json({ message: "DB Error" });

        if (results.length === 0)
            return res.status(400).json({ message: "Teacher not found" });

        const teacher = results[0];

        const isMatch = bcrypt.compareSync(password, teacher.password);

        if (!isMatch) return res.status(400).json({ message: "Incorrect Password" });

        res.json({
            message: "Login Successful!",
            teacher: {
                id: teacher.id,
                name: teacher.full_name,
                subject: teacher.subject,
                semester: teacher.semester,
                email: teacher.email
            }
        });
    });
};
