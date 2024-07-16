import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { login } from "./auth.controller";
import { loginValidationSchema } from "./auth.validation";

const authRouter = Router();

authRouter.post("/login", validateRequest(loginValidationSchema), login);

export default authRouter;
