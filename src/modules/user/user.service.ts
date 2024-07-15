import httpStatus from "http-status";
import mongoose from "mongoose";
import { config } from "../../config";
import ApiError from "../../utils/ApiError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IFaculty } from "../faculty/faculty.interface";
import { Faculty } from "../faculty/faculty.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateFacultyId, generateStudentId } from "./user.utils";

//? create a new Student - using transaction and rollback
const createStudentToDB = async (password: string, studentData: IStudent) => {
  //todo: Static method to check if the student is already existed
  // if (await Student.isStudentExists(studentData.id)) {
  //   throw new Error("Student already exists!");
  // }

  //* create a user oject
  const user: Partial<IUser> = {};

  //* set role as student
  user.role = "student";

  //* if password is not given, then set default password
  user.password = password || config.default_password;

  //* find academic semester
  const admissionSemester = (await AcademicSemester.findById(
    studentData.admissionSemester
  )) as IAcademicSemester;

  const session = await mongoose.startSession();
  try {
    session.startTransaction(); // session start

    //* set generated student id
    user.id = await generateStudentId(admissionSemester);

    //* create a user into DB -- transaction - 1
    // pass array of user object
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    studentData.id = newUser[0].id; // newUser is array
    studentData.user = newUser[0]._id; // reference id

    //* create a student into DB -- transaction - 2
    const result = await Student.create([studentData], { session });
    if (!result.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    await session.commitTransaction(); // session commit
    await session.endSession(); // session end
    return result;
  } catch (error) {
    await session.abortTransaction(); // session abort
    await session.endSession(); // session end
    throw new ApiError(500, "Something went wrong while creating a student");
  }
};

//? Create a new faculty - using transaction and rollback
const createFacultyToDB = async (password: string, payload: IFaculty) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set faculty role
  userData.role = "faculty";

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new ApiError(404, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export { createFacultyToDB, createStudentToDB };
