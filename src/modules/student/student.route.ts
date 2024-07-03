import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getSingleStudent,
} from "./student.controller";

const studentRouter = Router();

// Routes
studentRouter.post("/create-student", createStudent);
studentRouter.get("/", getAllStudents);
studentRouter.get("/:studentId", getSingleStudent);
studentRouter.delete("/:studentId", deleteStudent);

export default studentRouter;
