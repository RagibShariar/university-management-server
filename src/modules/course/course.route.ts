import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getSingleCourse,
} from "./course.controller";
import { createCourseValidationSchema } from "./course.validation";

const courseRouter = Router();

courseRouter.post(
  "/create-course",
  validateRequest(createCourseValidationSchema),
  createCourse
);
courseRouter.get("/all-courses", getAllCourses);
courseRouter.get("/:id", getSingleCourse);
courseRouter.delete("/:id", deleteCourse);

export default courseRouter;
