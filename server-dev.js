// ====== Import Packages ======
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

// ====== Initialize App ======
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("uploads")); // so uploaded files can be accessed

// ====== In-Memory Data Storage for Development ======
let users = [];
let projects = [
  {
    id: 1,
    company_id: 1,
    title: "Build a React Dashboard",
    description: "Create a modern dashboard using React and Chart.js. Include user authentication, responsive design, and data visualization components.",
    deadline: "2025-12-15",
    attachment: null
  },
  {
    id: 2,
    company_id: 1,
    title: "Mobile App UI Design",
    description: "Design a complete UI/UX for a fitness tracking mobile application. Include wireframes, mockups, and interactive prototypes.",
    deadline: "2025-12-20",
    attachment: null
  },
  {
    id: 3,
    company_id: 2,
    title: "Database Design Project",
    description: "Create a database schema for an e-commerce platform. Include normalization, indexing strategies, and sample queries.",
    deadline: "2025-12-10",
    attachment: null
  }
];
let submissions = [];
let nextProjectId = 4;
let nextUserId = 1;

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
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    
    const newUser = {
      id: nextUserId++,
      name,
      email,
      password, // In production, hash this!
      role
    };
    
    users.push(newUser);
    res.json({ message: "User registered successfully!", user: { id: newUser.id, name, email, role } });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// 🔐 Login User (simplified for development)
app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      res.json({ 
        message: "Login successful", 
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// 🏢 Publish Project (with attachment)
app.post("/publish", upload.single("attachment"), (req, res) => {
  try {
    const { company_id, title, description, deadline } = req.body;
    const filePath = req.file ? req.file.filename : null;

    const newProject = {
      id: nextProjectId++,
      company_id: parseInt(company_id),
      title,
      description,
      deadline,
      attachment: filePath
    };
    
    projects.push(newProject);
    res.json({ message: "Project published successfully!", project: newProject, file: filePath });
  } catch (error) {
    res.status(500).json({ error: "Failed to publish project" });
  }
});

// 📥 Student submits project file
app.post("/submit", upload.single("file_link"), (req, res) => {
  try {
    const { student_id, project_id } = req.body;
    const filePath = req.file ? req.file.filename : null;

    const newSubmission = {
      id: submissions.length + 1,
      student_id: parseInt(student_id),
      project_id: parseInt(project_id),
      file_link: filePath,
      submitted_at: new Date().toISOString()
    };
    
    submissions.push(newSubmission);
    res.json({ message: "Submission uploaded successfully!", submission: newSubmission, file: filePath });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit project" });
  }
});

// 🔍 Get all projects
app.get("/projects", (req, res) => {
  try {
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// 📋 Get user submissions
app.get("/submissions/:student_id", (req, res) => {
  try {
    const studentId = parseInt(req.params.student_id);
    const userSubmissions = submissions.filter(s => s.student_id === studentId);
    res.json(userSubmissions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

// 📊 Get project submissions (for companies)
app.get("/project-submissions/:project_id", (req, res) => {
  try {
    const projectId = parseInt(req.params.project_id);
    const projectSubmissions = submissions.filter(s => s.project_id === projectId);
    res.json(projectSubmissions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch project submissions" });
  }
});

// ====== Start Server ======
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("📱 Ready for Android app connections!");
  console.log("💡 Using in-memory storage for development");
});

// ====== Error Handling ======
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});