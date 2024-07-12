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
studentRouter.get("/:studentId", getSingleStudent);
studentRouter.patch(
  "/:studentId",
  validateRequest(updateStudentValidationSchema),
  updateStudent
);
studentRouter.delete("/:studentId", deleteStudent);

export default studentRouter;
