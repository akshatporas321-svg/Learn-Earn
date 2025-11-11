// ====== Import Packages ======
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

// ====== Initialize App ======
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("uploads")); // so uploaded files can be accessed

// ====== MySQL Connection ======
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Akshat@1221", // replace this with your real password
  database: "learn_earn"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database!");
  }
});

// ====== Multer Setup for File Uploads ======
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // saves files in backend/uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  }
});

const upload = multer({ storage });

// ====== ROUTES ======

// 🧍 Register User
app.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;
  const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, password, role], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "User registered successfully!" });
  });
});

// 🏢 Publish Project (with attachment)
app.post("/publish", upload.single("attachment"), (req, res) => {
  const { company_id, title, description, deadline } = req.body;
  const filePath = req.file ? req.file.filename : null;

  const sql = "INSERT INTO projects (company_id, title, description, deadline, attachment) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [company_id, title, description, deadline, filePath], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Project published successfully!", file: filePath });
  });
});

// 📥 Student submits project file
app.post("/submit", upload.single("file_link"), (req, res) => {
  const { student_id, project_id } = req.body;
  const filePath = req.file ? req.file.filename : null;

  const sql = "INSERT INTO submissions (student_id, project_id, file_link) VALUES (?, ?, ?)";
  db.query(sql, [student_id, project_id, filePath], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Submission uploaded successfully!", file: filePath });
  });
});

// 🔍 Get all projects
app.get("/projects", (req, res) => {
  db.query("SELECT * FROM projects", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ====== Start Server ======
app.listen(8080, () => console.log("🚀 Server running on http://localhost:8080"));
