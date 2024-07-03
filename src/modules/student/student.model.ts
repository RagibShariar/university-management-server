import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";
import { config } from "../../config";
import {
  Guardian,
  Student as IStudent,
  LocalGuardian,
  Name,
  StudentModel,
} from "./student.interface";

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
const studentSchema = new Schema<IStudent, StudentModel>(
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
    password: {
      type: String,
      minlength: [6, "password must be at least 6 characters or longer"],
      required: [true, "Password is required"],
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
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

//! pre save middleware / hook 👇
studentSchema.pre("save", async function (next) {
  // if password is not modified/updated then next();
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

//!  post save (after save) middleware / hook 👇
// when controller send response to client, client will see password empty string
studentSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

//! Query middleware / hook
// ডেটাবেজ কুয়েরি করার আগে মডেলে কুয়েরি করবে
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({
    $match: {
      isDeleted: { $ne: true },
    },
  });
  next();
});

//! Mongoose Virtual
studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//todo: Creating a Mongoose custom instance methods
// studentSchema.methods.isStudentExists = async function (id: string) {
//   const existingStudent = await Student.findOne(id);
//   return existingStudent;
// };

//todo: Creating a Mongoose custom static method
studentSchema.statics.isStudentExists = async function (id: string) {
  const existingStudent = await Student.findOne({ id: id });
  return existingStudent;
};

//! Student model
export const Student = mongoose.model<IStudent, StudentModel>(
  "Student",
  studentSchema
);
