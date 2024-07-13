import httpStatus from "http-status";
import mongoose, { Schema } from "mongoose";
import ApiError from "../../utils/ApiError";
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

// pre save hook to check if department is already exists
academicDepartmentSchema.pre("save", async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Department is already exists");
  }
  next();
});

// pre update hook to check if the department is exists
academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();

  const isDepartmentExist = await AcademicDepartment.findOne(query);
  if (!isDepartmentExist) {
    throw new ApiError(404, "This department does not exists");
  }
  next();
});

export const AcademicDepartment = mongoose.model<IAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);
