import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createStudentValidationSchema } from "../student/student.validation";
import { userController } from "./user.controller";

const userRouter = Router();

userRouter.post(
  "/create-student",
  validateRequest(createStudentValidationSchema),
  userController.createStudent
);

userRouter.post(
  "/create-faculty",
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty
);

export default userRouter;
