import httpStatus from "http-status";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import {
  createAcademicSemesterToDb,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDb,
  updateAcademicSemesterIntoDb,
} from "./academicSemester.service";

// Create a new academic semester
const createAcademicSemester = asyncHandler(async (req, res) => {
  const result = await createAcademicSemesterToDb(req.body);

  ApiResponse(res, httpStatus.CREATED, "Semester created successfully", result);
});

// Get all academic semesters
const getAllAcademicSemesters = asyncHandler(async (req, res) => {
  const result = await getAllAcademicSemestersFromDB();
  ApiResponse(
    res,
    httpStatus.OK,
    "Semesters are retrieved successfully",
    result
  );
});

// Get a single academic semester
const getSingleAcademicSemester = asyncHandler(async (req, res) => {
  const { semesterId } = req.params;
  const result = await getSingleAcademicSemesterFromDb(semesterId);

  ApiResponse(res, httpStatus.OK, "Semester retrieved successfully", result);
});

// Update a single academic semester
const updateSingleAcademicSemester = asyncHandler(async (req, res) => {
  const { semesterId } = req.params;
  const result = await updateAcademicSemesterIntoDb(semesterId, req.body);

  ApiResponse(res, httpStatus.OK, "Semester updated successfully", result);
});

export {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
