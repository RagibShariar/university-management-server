import { Router } from "express";
import {
  createStudent,
  getAllStudents,
  getSingleStudent,
} from "./student.controller";

const studentRouter = Router();

// Routes
studentRouter.post("/create-student", createStudent);
studentRouter.get("/", getAllStudents);
studentRouter.get("/:studentId", getSingleStudent);

export default studentRouter;
