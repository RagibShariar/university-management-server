import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
} from "./academicSemester.controller";
import { createAcademicSemesterValidation } from "./academicSemester.validation";

const academicSemesterRouter = Router();

academicSemesterRouter.get("/all-semesters", getAllAcademicSemesters);
academicSemesterRouter.post(
  "/create-semester",
  validateRequest(createAcademicSemesterValidation),
  createAcademicSemester
);
academicSemesterRouter.get("/:semesterId", getSingleAcademicSemester);
academicSemesterRouter.patch(
  "/:semesterId",

  updateSingleAcademicSemester
);

export default academicSemesterRouter;
