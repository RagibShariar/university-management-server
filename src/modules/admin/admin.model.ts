import mongoose, { Schema } from "mongoose";
import { IAdmin, Name } from "./admin.interface";

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

const adminSchema = new Schema<IAdmin>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: nameSchema,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Admin = mongoose.model<IAdmin>("Admin", adminSchema);
