import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
} from "./academicSemester.controller";
import { createAcademicSemesterValidation } from "./academicSemester.validation";

const academicSemesterRouter = Router();

academicSemesterRouter.post(
  "/create-semester",
  validateRequest(createAcademicSemesterValidation),
  createAcademicSemester
);
academicSemesterRouter.get("/all-semesters", getAllAcademicSemesters);
academicSemesterRouter.get("/:semesterId", getSingleAcademicSemester);

export default academicSemesterRouter;
