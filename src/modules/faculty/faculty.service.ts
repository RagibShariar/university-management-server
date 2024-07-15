import httpStatus from "http-status";
import mongoose from "mongoose";
import ApiError from "../../utils/ApiError";
import { User } from "../user/user.model";
import { IFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";

// get all faculties
const getAllFacultiesFromDB = async () => {
  const result = await Faculty.find();
  // .populate("academicFaculty")
  // .populate({
  //   path: "academicDepartment",
  //   populate: {
  //     path: "academicFaculty", // nested populate
  //   },
  // });
  return result;
};

// get a single faculty
const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate("academicDepartment");
  // const result = await Faculty.aggregate([{ $match: { id} }]);
  return result;
};

// update a single faculty - primitive and non primitive fields together
const updateFacultyToDb = async (id: string, payload: Partial<IFaculty>) => {
  // destructure non primitive fields
  const { name, ...remainingPayload } = payload;
  const updatedData: Record<string, unknown> = { ...remainingPayload };

  // for updating non primitive fields
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      updatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findOneAndUpdate({ id: id }, updatedData, {
    new: true,
  });
  return result;
};

// delete a faculty from the database
const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession(); // start a session

  try {
    session.startTransaction(); //  start transaction

    // delete faculty --  transaction -1
    const deletedFaculty = await Faculty.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session: session }
    );

    if (!deletedFaculty) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to delete faculty"
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

    return deletedFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Something went wrong while deleting a faculty");
  }
};

export {
  deleteFacultyFromDB,
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyToDb,
};
