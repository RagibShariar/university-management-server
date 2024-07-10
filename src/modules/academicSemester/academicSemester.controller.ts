import httpStatus from "http-status";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import {
  createAcademicSemesterToDb,
  getAllAcademicSemestersFromDB,
} from "./academicSemester.service";

// Create a new academic semester
const createAcademicSemester = asyncHandler(async (req, res) => {
  const result = await createAcademicSemesterToDb(req.body);

  ApiResponse(res, httpStatus.CREATED, "Semester created successfully", result);
});

// Get all academic semesters
const getAllAcademicSemesters = asyncHandler(async (req, res) => {
  const result = await getAllAcademicSemestersFromDB();
  ApiResponse(res, httpStatus.OK, "Semesters retrieved successfully", result);
});

// Get a single academic semester

// Update a single academic semester

export { createAcademicSemester, getAllAcademicSemesters };
