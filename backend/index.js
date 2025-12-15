const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",      // your MySQL password
    database: "attendance_portal"
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed:", err);
    } else {
        console.log("Database Connected Successfully");
    }
});

// Multer Storage for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) =>
        cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// ------------------- SIGNUP -------------------
app.post("/signup", upload.single("photo"), (req, res) => {
    const { fullName, rollNo, semester, email, password } = req.body;
    const photo = req.file ? req.file.filename : null;

    const sql = `
        INSERT INTO students (fullName, rollNo, semester, email, password, photo)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [fullName, rollNo, semester, email, password, photo], (err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "Signup Failed" });
        }
        res.json({ message: "Signup Successful" });
    });
});

// ------------------- LOGIN -------------------
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM students WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, result) => {
        if (err) return res.status(500).json({ message: "Server Error" });

        if (result.length === 0) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        res.json({ message: "Login Successful" });
    });
});

// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
