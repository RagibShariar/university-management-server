import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
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
  auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
  validateRequest(changePasswordValidationSchema),
  authController.changePassword
);

authRouter.post("/refresh-token", authController.refreshToken);

export default authRouter;
