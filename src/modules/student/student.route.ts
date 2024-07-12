import { Router } from "express";
import {
  deletedStudents,
  deleteStudent,
  getAllStudents,
  getSingleStudent,
} from "./student.controller";

const studentRouter = Router();

// Routes
// studentRouter.post("/create-student", createStudent);
studentRouter.get("/", getAllStudents);
studentRouter.get("/bin", deletedStudents);
studentRouter.get("/:studentId", getSingleStudent);
studentRouter.delete("/:studentId", deleteStudent);
// studentRouter.patch("/:studentId", updateStudent);

export default studentRouter;
