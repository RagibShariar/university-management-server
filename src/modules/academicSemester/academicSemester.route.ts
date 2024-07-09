import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createAcademicSemesterValidation } from "./academicSemester.validation";
import { createAcademicSemester } from "./academicSemester.controller";

const academicSemesterRouter = Router();


academicSemesterRouter.post("/create-semester", 
  validateRequest(createAcademicSemesterValidation),
  createAcademicSemester
)

export default academicSemesterRouter