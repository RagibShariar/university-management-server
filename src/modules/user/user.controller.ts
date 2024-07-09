import { NextFunction, Request, Response } from "express";
import { createStudentToDB } from "./user.service";
import createHttpError from "http-errors";

// Create a new student
const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password,  student: studentData } = req.body;
    // const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await createStudentToDB(password, studentData);

    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (err: any) {
    // res.status(400).json({
    //   success: false,
    //   message: err.message,
    //   error: err,
    // });
    next(err)
  }
};

export const userController = {
  createStudent,
};
