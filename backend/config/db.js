import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shru@2908",      // your MySQL password
    database: "attendance_portal"
});

db.connect((err) => {
    if (err) {
        console.log("MySQL Connection Error:", err);
    } else {
        console.log("MySQL Connected Successfully!");
    }
});

export default db;
