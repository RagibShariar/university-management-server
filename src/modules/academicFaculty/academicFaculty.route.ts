import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createAcademicFaculty } from "./academicFaculty.controller";
import { academicFacultyValidationSchema } from "./academicFaculty.validation";

const academicFacultyRouter = Router();

academicFacultyRouter.post(
  "/create-academic-faculty",
  validateRequest(academicFacultyValidationSchema),
  createAcademicFaculty
);

export default academicFacultyRouter;