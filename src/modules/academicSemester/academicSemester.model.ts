import mongoose, { Schema } from "mongoose";
import {
  IAcademicSemester,
  IMonths,
  ISemesterCode,
  ISemesterName,
} from "./academicSemester.interface";

const months: IMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const academicSemesterName: ISemesterName[] = ["Spring", "Summer", "Fall"];
const academicSemesterCode: ISemesterCode[] = ["01", "02", "03"];

//! Academic Semester Schema
const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: "string",
      enum: academicSemesterName,
      required: true,
    },
    year: {
      type: "string",
      required: true,
    },
    code: {
      type: "string",
      enum: academicSemesterCode,
      required: true,
    },
    startMonth: {
      type: "string",
      enum: months,
      required: true,
    },
    endMonth: {
      type: "string",
      enum: months,
      required: true,
    },
  },
  { timestamps: true }
);

export const AcademicSemester = mongoose.model<IAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
