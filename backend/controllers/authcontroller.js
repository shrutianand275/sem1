import db from "../config/db.js";
import bcrypt from "bcryptjs";

// ---------------- SIGNUP ----------------
export const signup = (req, res) => {
    const { fullName, rollNo, semester, email, password } = req.body;
    const photo = req.file?.filename;

    if (!photo) return res.status(400).json({ message: "Photo is required" });

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = `INSERT INTO students (fullName, rollNo, semester, email, password, photo)
                 VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(
        sql,
        [fullName, rollNo, semester, email, hashedPassword, photo],
        (err) => {
            if (err) {
                return res.status(500).json({ message: "Signup failed", error: err });
            }
            res.json({ message: "Signup successful" });
        }
    );
};

// ---------------- LOGIN ----------------
export const login = (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM students WHERE email = ?", [email], (err, result) => {
        if (err) return res.status(500).json({ message: "DB error" });

        if (result.length === 0)
            return res.status(400).json({ message: "User not found" });

        const user = result[0];

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) return res.status(400).json({ message: "Wrong password" });

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.fullName,
                email: user.email,
                photo: user.photo
            }
        });
    });
};
