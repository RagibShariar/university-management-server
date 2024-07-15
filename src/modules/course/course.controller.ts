import * as httpStatus from "http-status";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import {
  createCourseToDb,
  deleteCourseFromDB,
  getAllCoursesFromDb,
  getSingleCourseFromDb,
} from "./course.service";

// Create a new course
const createCourse = asyncHandler(async (req, res) => {
  const result = await createCourseToDb(req.body);

  ApiResponse(res, httpStatus.CREATED, "Course created successfully", result);
});

// Get all courses
const getAllCourses = asyncHandler(async (req, res) => {
  const result = await getAllCoursesFromDb();
  ApiResponse(
    res,
    httpStatus.OK,
    "All Courses are retrieved successfully",
    result
  );
});

// Get a single course
const getSingleCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleCourseFromDb(id);

  ApiResponse(res, httpStatus.OK, "Course retrieved successfully", result);
});

// Update a single course
// const updateCourse = asyncHandler(async (req, res) => {
//   const { id, course:courseData } = req.params;
//   const result = await updateCourseToDb(id, courseData);
//   ApiResponse(res, httpStatus.OK, "Course updated successfully", result);
// });

// soft Delete a single course
const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteCourseFromDB(id);
  ApiResponse(res, httpStatus.OK, "Course deleted successfully", result);
});

export { createCourse, deleteCourse, getAllCourses, getSingleCourse };
