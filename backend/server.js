import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";

import "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/teacher", teacherRoutes);


app.listen(5000, () => {
    console.log("Server running on port 5000");
});
