import mongoose, { Schema } from "mongoose";
import { IFaculty, Name } from "./faculty.interface";

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

//! Faculty Schema
const facultySchema = new Schema<IFaculty>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
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
    dateOfBirth: { type: String },
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
    image: { type: String, trim: true },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "academicFaculty",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

//! Mongoose Virtual
facultySchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//! faculty model
export const Faculty = mongoose.model("Faculty", facultySchema);
