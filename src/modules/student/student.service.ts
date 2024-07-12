import httpStatus from "http-status";
import mongoose from "mongoose";
import ApiError from "../../utils/ApiError";
import { User } from "../user/user.model";
import { Student } from "./student.model";

// get all students
const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty", // nested populate
      },
    });
  return result;
};

// get a single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty", // nested populate
      },
    });
  // const result = await Student.aggregate([{ $match: { id} }]);
  return result;
};

// delete a student from the database
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession(); // start a session

  try {
    session.startTransaction(); //  start transaction

    // delete student --  transaction -1
    const deletedStudent = await Student.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session: session }
    );

    if (!deletedStudent) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to delete student"
      );
    }

    // delete user --  transaction -2
    const deletedUser = await User.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session: session }
    );

    if (!deletedUser) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to delete user"
      );
    }

    await session.commitTransaction(); // commit transaction
    await session.endSession(); // end session

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

// get deleted students from the database
const deletedStudentsFromDB = async () => {
  const result = await Student.find({
    isDeleted: { $eq: true },
  });
  return result;
};

export {
  deletedStudentsFromDB,
  deleteStudentFromDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
