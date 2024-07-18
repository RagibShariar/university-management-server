import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authController } from "./auth.controller";
import {
  changePasswordValidationSchema,
  loginValidationSchema,
} from "./auth.validation";

const authRouter = Router();

authRouter.post(
  "/login",
  validateRequest(loginValidationSchema),
  authController.loginUser
);

authRouter.post(
  "/change-password",
  validateRequest(changePasswordValidationSchema),
  authController.changePassword
);

export default authRouter;
