import { Types } from "mongoose";

export type IPreRequisiteCourse = {
  course: Types.ObjectId;
  isDeleted: boolean;
};
export type ICourse = {
  title: string;
  prefix: string;
  code: string;
  credit: number;
  isDeleted: boolean;
  preRequisiteCourse: [IPreRequisiteCourse];
};
