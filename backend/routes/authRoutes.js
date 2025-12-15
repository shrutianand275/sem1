import express from "express";
import multer from "multer";
import { signup, login } from "../controllers/authcontroller.js";
import db from "../config/db.js";

const router = express.Router();

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) =>
        cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage: storage });

// Routes
router.post("/signup", upload.single("photo"), signup);
router.post("/login", login);

//  NEW ROUTE: Get student details
router.get("/student/:id", (req, res) => {
    const studentId = req.params.id;

    const sql = "SELECT * FROM students WHERE id = ?";
    db.query(sql, [studentId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        const user = result[0];

        res.json({
            id: user.id,
            name: user.fullName,
            rollNo: user.rollNo,
            semester: user.semester,
            email: user.email,
            photo: user.photo
        });
    });
});

export default router;

