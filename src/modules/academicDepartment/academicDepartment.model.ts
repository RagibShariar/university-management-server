import mongoose, { Schema } from "mongoose";
import { IAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },
  },
  { timestamps: true }
);

export const AcademicDepartment = mongoose.model<IAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);
