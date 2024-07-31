import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
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
studentRouter.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  getAllStudents
);
studentRouter.get("/bin", deletedStudents);
studentRouter.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  getSingleStudent
);
studentRouter.patch(
  "/:id",
  validateRequest(updateStudentValidationSchema),
  updateStudent
);
studentRouter.delete("/:id", deleteStudent);

export default studentRouter;
