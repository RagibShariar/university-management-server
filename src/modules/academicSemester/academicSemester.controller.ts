import httpStatus from "http-status";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { createAcademicSemesterToDb } from "./academicSemester.service";

const createAcademicSemester = asyncHandler(async (req, res) => {
  const result = await createAcademicSemesterToDb(req.body);

  ApiResponse(res, httpStatus.CREATED, "Semester created successfully", result);
});

export { createAcademicSemester };
