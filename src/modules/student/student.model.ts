import mongoose, { Schema } from "mongoose";
import { Student as IStudent } from "./student.interface";

//! Student Schema
const studentSchema = new Schema<IStudent>(
  {
    id: { type: String, unique: true },
    name: {
      firstName: { type: String, required: true },
      middleName: { type: String },
      lastName: { type: String, required: true },
    },
    email: { type: String, required: true },
    gender: ["male", "female"],
    dateOfBirth: { type: Date },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    nationality: { type: String, required: true },
    religion: { type: String, required: true },
    maritalStatus: [
      "Single",
      "Married",
      "Divorced",
      "Widowed",
      "Separated",
      "Partnered",
    ],
    guardian: {
      fatherName: { type: String, required: true },
      fatherOccupation: { type: String, required: true },
      fatherContactNo: { type: String, required: true },
      fatherEmail: { type: String },
      motherName: { type: String, required: true },
      motherOccupation: { type: String, required: true },
      motherContactNo: { type: String, required: true },
      motherEmail: { type: String },
    },
    localGuardian: {
      name: { type: String, required: true },
      occupation: { type: String, required: true },
      contactNo: { type: String, required: true },
      email: { type: String },
      address: { type: String, required: true },
      relation: { type: String, required: true },
    },
    image: { type: String },
    isActive: ["active", "blocked"],
  },
  { timestamps: true }
);

//! Student model
export const Student = mongoose.model<IStudent>("Student", studentSchema);
