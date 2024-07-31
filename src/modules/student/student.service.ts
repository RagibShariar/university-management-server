import httpStatus from "http-status";
import mongoose from "mongoose";
import ApiError from "../../utils/ApiError";
import { User } from "../user/user.model";
import { IStudent } from "./student.interface";
import { Student } from "./student.model";

// get all students
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  console.log("base query: ", query);
  console.log("queryObj: ", queryObj);

  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const searchableFields = [
    "id",
    "email",
    "name.firstName",
    "name.middleName",
    "name.lastName",
  ];
  // { "email": { $regex: query.searchTerm, $options:'i' } }
  const searchQuery = Student.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  // filtering
  const excludeFields = ["searchTerm", "sort", "page", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  const result = await searchQuery.find(queryObj);
  // .populate("user")
  // .populate("admissionSemester")
  // .populate({
  //   path: "academicDepartment",
  //   populate: {
  //     path: "academicFaculty", // nested populate
  //   },
  // });
  return result;
};

// get a single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate("user")
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

// update a single student - primitive and non primitive fields together
const updateStudentToDb = async (id: string, payload: Partial<IStudent>) => {
  // destructure non primitive fields
  const { name, guardian, localGuardian, ...remainingPayload } = payload;
  const updatedData: Record<string, unknown> = { ...remainingPayload };

  // for updating non primitive fields
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      updatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      updatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      updatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete a student from the database
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession(); // start a session

  try {
    session.startTransaction(); //  start transaction

    // delete student --  transaction -1
    const deletedStudent = await Student.findByIdAndUpdate(
      id,
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
    const deletedUser = await User.findByIdAndUpdate(
      id,
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
    throw new Error("Something went wrong while deleting a student");
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
  updateStudentToDb,
};
