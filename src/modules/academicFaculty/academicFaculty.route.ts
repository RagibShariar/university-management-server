import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
} from "./academicFaculty.controller";
import { academicFacultyValidationSchema } from "./academicFaculty.validation";

const academicFacultyRouter = Router();

academicFacultyRouter.post(
  "/create-academic-faculty",
  validateRequest(academicFacultyValidationSchema),
  createAcademicFaculty
);

academicFacultyRouter.get("/", getAllAcademicFaculties);
academicFacultyRouter.get("/:academicFacultyId", getSingleAcademicFaculty);
export default academicFacultyRouter;
