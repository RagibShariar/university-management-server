import { Router } from "express";
import { createStudent, getAllStudents } from "./student.controller";

const studentRouter = Router();

// Routes
studentRouter.post("/create-student", createStudent);
studentRouter.get("/", getAllStudents)

export default studentRouter;
