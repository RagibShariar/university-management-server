import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createStudentValidationSchema } from "../student/student.validation";
import { userController } from "./user.controller";

const userRouter = Router();

userRouter.post(
  "/create-student",
  validateRequest(createStudentValidationSchema),
  userController.createStudent
);

export default userRouter;
