import mongoose from "mongoose";
import { IAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new mongoose.Schema<IAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const AcademicFaculty = mongoose.model<IAcademicFaculty>(
  "AcademicFaculty",
  academicFacultySchema
);
