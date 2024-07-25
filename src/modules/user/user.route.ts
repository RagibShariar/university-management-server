import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createStudentValidationSchema } from "../student/student.validation";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const userRouter = Router();

userRouter.post(
  "/create-student",
  auth(USER_ROLE.admin),
  validateRequest(createStudentValidationSchema),
  userController.createStudent
);

userRouter.post(
  "/create-faculty",
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty
);

export default userRouter;
