import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidationSchema } from "../student/student.validation";
import { userController } from "./user.controller";

const userRouter = Router();

userRouter.post(
  "/create-student",
  validateRequest(studentValidationSchema),
  userController.createStudent
);

export default userRouter;
