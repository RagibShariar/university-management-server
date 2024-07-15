import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  deletedStudents,
  deleteStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
} from "./student.controller";
import { updateStudentValidationSchema } from "./student.validation";

const studentRouter = Router();

// Routes
// studentRouter.post("/create-student", createStudent);
studentRouter.get("/", getAllStudents);
studentRouter.get("/bin", deletedStudents);
studentRouter.get("/:id", getSingleStudent);
studentRouter.patch(
  "/:id",
  validateRequest(updateStudentValidationSchema),
  updateStudent
);
studentRouter.delete("/:id", deleteStudent);

export default studentRouter;
