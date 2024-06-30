import mongoose, { Schema } from "mongoose";
import {
  Guardian,
  Student as IStudent,
  LocalGuardian,
  Name,
} from "./student.interface";
import { boolean } from "zod";

const nameSchema = new Schema<Name>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, "First name can not be more than 20 characters."],
  },
  middleName: { type: String, trim: true },
  lastName: { type: String, required: true, trim: true },
});
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true, trim: true },
  fatherOccupation: { type: String, required: true, trim: true },
  fatherContactNo: { type: String, required: true, trim: true },
  fatherEmail: { type: String, trim: true },
  motherName: { type: String, required: true, trim: true },
  motherOccupation: { type: String, required: true, trim: true },
  motherContactNo: { type: String, required: true, trim: true },
  motherEmail: { type: String, trim: true },
});
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true, trim: true },
  occupation: { type: String, required: true, trim: true },
  contactNo: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  address: { type: String, trim: true },
  relation: { type: String, required: true, trim: true },
});

//! Student Schema
const studentSchema = new Schema<IStudent>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
      trim: true,
    },
    name: {
      type: nameSchema,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: { type: Date },
    contactNo: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency contact number is required"],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "{VALUES} is not a valid blood group!!!",
      },
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
      trim: true,
    },
    nationality: {
      type: String,
      required: [true, "Nationality is required"],
      trim: true,
    },
    religion: {
      type: String,
      required: [true, "Religion is required"],
      trim: true,
    },
    maritalStatus: {
      type: String,
      enum: [
        "Single",
        "Married",
        "Divorced",
        "Widowed",
        "Separated",
        "Partnered",
      ],
    },
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian information is required"],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, "Local guardian information is required"],
    },
    image: { type: String, trim: true },
    isActive: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

//! Student model
export const Student = mongoose.model<IStudent>("Student", studentSchema);
