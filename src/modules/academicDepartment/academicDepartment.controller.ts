import httpStatus from "http-status";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import {
  createAcademicDepartmentToDb,
  getAllAcademicDepartmentsFromDb,
  getSingleAcademicDepartmentFromDb,
  updateAcademicDepartmentToDb,
} from "./academicDepartment.service";

// Create a new academic department
const createAcademicDepartment = asyncHandler(async (req, res) => {
  const result = await createAcademicDepartmentToDb(req.body);

  ApiResponse(
    res,
    httpStatus.CREATED,
    "Department is created successfully",
    result
  );
});

// Get all academic departments
const getAllAcademicDepartments = asyncHandler(async (req, res) => {
  const result = await getAllAcademicDepartmentsFromDb();
  ApiResponse(
    res,
    httpStatus.OK,
    "All Academic departments are retrieved successfully",
    result
  );
});

// Get a single academic department
const getSingleAcademicDepartment = asyncHandler(async (req, res) => {
  const { departmentId } = req.params;
  const result = await getSingleAcademicDepartmentFromDb(departmentId);
  ApiResponse(
    res,
    httpStatus.OK,
    "Academic department is retrieved successfully",
    result
  );
});

// Update a single academic department
const updateAcademicDepartment = asyncHandler(async (req, res) => {
  const { departmentId } = req.params;
  const result = await updateAcademicDepartmentToDb(departmentId, req.body);
  ApiResponse(
    res,
    httpStatus.OK,
    "Academic department is updated successfully",
    result
  );
});

export {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
