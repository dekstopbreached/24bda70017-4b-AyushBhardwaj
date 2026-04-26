🎯 AIM
To develop a backend REST API using Node.js and Express.js, integrate MongoDB Atlas for data storage, and implement authentication using JWT, following MVC architecture and testing APIs with Postman.

📌 OBJECTIVES
Understand backend development using Node.js

Build REST APIs using Express.js

Connect cloud database (MongoDB Atlas)

Perform CRUD operations

Implement authentication using JWT

Test APIs using Postman

Follow MVC architecture

🛠️ REQUIREMENTS
Node.js

VS Code

Postman

MongoDB Atlas account

pnpm / npm

📂 PROJECT STRUCTURE (MVC)
project/
│── node_modules/
│── config/
│     └── db.js
│── models/
│     └── student.model.js
│── controllers/
│     └── student.controller.js
│── routes/
│     └── student.routes.js
│── middleware/
│     └── auth.middleware.js
│── .env
│── index.js
│── package.json
⚙️ STEP-BY-STEP IMPLEMENTATION
1️⃣ Install Dependencies
pnpm add express mongoose cors dotenv jsonwebtoken
pnpm add -D nodemon
2️⃣ index.js (Main Server)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/student.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/students", studentRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
3️⃣ Database Connection
config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
4️⃣ Model
models/student.model.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

export default mongoose.model("Student", studentSchema);
5️⃣ Controller
controllers/student.controller.js
import Student from "../models/student.model.js";

export const createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
};

export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

export const updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(student);
};

export const deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
6️⃣ Routes
routes/student.routes.js
import express from "express";
import {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent
} from "../controllers/student.controller.js";

const router = express.Router();

router.post("/", createStudent);
router.get("/", getStudents);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
🔐 JWT AUTH (Experiment 6)
middleware/auth.middleware.js
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
Example Login Route
import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const user = { id: 1, name: "Ayush" };

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });

  res.json({ token });
};
🔗 MONGODB SETUP (.env)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
📬 POSTMAN TESTING
Endpoints:
Method	Endpoint	Work
POST	/api/students	Create
GET	/api/students	Read
PUT	/api/students/:id	Update
DELETE	/api/students/:id	Delete
📊 ALGORITHM (CRUD)
Create:
Receive data

Validate

Store in DB

Return response

Read:
Fetch all records

Return data

Update:
Find by ID

Update values

Return updated data

Delete:
Find by ID

Remove record

Return confirmation

