import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { createFacultyToDB, createStudentToDB } from "./user.service";
import { createAcademicFacultyToDb } from "../academicFaculty/academicFaculty.service";

// Create a new student
const createStudent = asyncHandler(async (req, res) => {
  const { password, student: studentData } = req.body;
  // const zodParsedData = studentValidationSchema.parse(studentData);

  const result = await createStudentToDB(password, studentData);

  // res.status(200).json({
  //   success: true,
  //   message: "Student created successfully",
  //   data: result,
  // });
  ApiResponse(res, httpStatus.CREATED, "Student created successfully", result);
});


// create a new faculty 
const createFaculty = asyncHandler(async (req, res) => {
  const { password, faculty: facultyData } = req.body;
  const result = await createFacultyToDB(password, facultyData);

  ApiResponse(res, httpStatus.CREATED, "Faculty created successfully", result);
})

export const userController = {
  createStudent,
  createFaculty
};
