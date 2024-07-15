import mongoose from "mongoose";
import { ICourse, IPreRequisiteCourse } from "./course.interface";

const preRequisiteCourseSchema = new mongoose.Schema<IPreRequisiteCourse>({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new mongoose.Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    prefix: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    credit: {
      type: Number,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    preRequisiteCourse: [preRequisiteCourseSchema],
  },
  { timestamps: true }
);

export const Course = mongoose.model<ICourse>("Course", courseSchema);
