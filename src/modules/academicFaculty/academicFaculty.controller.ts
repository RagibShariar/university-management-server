import httpStatus from "http-status";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import {
  createAcademicFacultyToDb,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDb,
} from "./academicFaculty.service";

// Create a new academic faculty
const createAcademicFaculty = asyncHandler(async (req, res) => {
  const result = await createAcademicFacultyToDb(req.body);

  ApiResponse(
    res,
    httpStatus.CREATED,
    "Academic faculty is created successfully",
    result
  );
});

// Get all academic faculties
const getAllAcademicFaculties = asyncHandler(async (req, res) => {
  const result = await getAllAcademicFacultiesFromDB();
  ApiResponse(
    res,
    httpStatus.OK,
    "All Academic faculties are retrieved successfully",
    result
  );
});

// Get a single academic faculty
const getSingleAcademicFaculty = asyncHandler(async (req, res) => {
  const { academicFacultyId } = req.params;
  const result = await getSingleAcademicFacultyFromDb(academicFacultyId);
  ApiResponse(
    res,
    httpStatus.OK,
    "Academic faculty is retrieved successfully",
    result
  );
});

export {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
};
