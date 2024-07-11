import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
} from "./academicDepartment.controller";
import {
  academicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
} from "./academicDepartment.validation";

const academicDepartmentRouter = Router();

academicDepartmentRouter.post(
  "/create-department",
  validateRequest(academicDepartmentValidationSchema),
  createAcademicDepartment
);

academicDepartmentRouter.get("/", getAllAcademicDepartments);
academicDepartmentRouter.get("/:departmentId", getSingleAcademicDepartment);
academicDepartmentRouter.patch(
  "/:departmentId",
  validateRequest(updateAcademicDepartmentValidationSchema),
  updateAcademicDepartment
);

export default academicDepartmentRouter;
