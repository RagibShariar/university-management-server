import httpStatus from "http-status";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import {
  createAdminToDB,
  createFacultyToDB,
  createStudentToDB,
} from "./user.service";

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
});

// create a new admin
const createAdmin = asyncHandler(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await createAdminToDB(password, adminData);

  ApiResponse(res, httpStatus.CREATED, "Admin created successfully", result);
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
};
