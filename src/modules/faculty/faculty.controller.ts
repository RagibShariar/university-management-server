import { NextFunction, Request, Response } from "express";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import {
  deleteFacultyFromDB,
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyToDb,
} from "./faculty.service";

// get all faculties
const getAllFaculties = asyncHandler(async (req: Request, res: Response) => {
  const result = await getAllFacultiesFromDB();

  ApiResponse(res, 200, "All faculties are retrieved successfully ", result);
});

// get a single faculty
const getSingleFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await getSingleFacultyFromDB(id);

    // res.status(200).json({
    //   success: true,
    //   message: "Faculty retrieved successfully",
    //   data: result,
    // });
    ApiResponse(res, 200, "Faculty retrieved successfully", result);
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: "Something went wrong while getting a single faculty",
    //   error: error,
    // });
    return next(err);
  }
};

// update a single faculty
const updateFaculty = asyncHandler(async (req, res) => {
  const { facultyId } = req.params;
  const { faculty } = req.body;
  const result = await updateFacultyToDb(facultyId, faculty);

  ApiResponse(res, 200, "Faculty updated successfully", result);
});

// Delete a single faculty
const deleteFaculty = async (req: Request, res: Response) => {
  try {
    const { facultyId } = req.params;
    const result = await deleteFacultyFromDB(facultyId);

    res.status(200).json({
      success: true,
      message: "Faculty deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        error.message || "Something went wrong while getting a single faculty",
      error: error,
    });
  }
};

export { deleteFaculty, getAllFaculties, getSingleFaculty, updateFaculty };
