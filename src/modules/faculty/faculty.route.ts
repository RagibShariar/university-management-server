import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  deleteFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
} from "./faculty.controller";
import { updateFacultyValidationSchema } from "./faculty.validation";

const facultyRouter = Router();

// Routes
facultyRouter.get("/", getAllFaculties);
facultyRouter.get("/:id", getSingleFaculty);
facultyRouter.patch(
  "/:id",
  validateRequest(updateFacultyValidationSchema),
  updateFaculty
);
facultyRouter.delete("/:id", deleteFaculty);

export default facultyRouter;
