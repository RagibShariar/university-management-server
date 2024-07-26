import { USER_ROLE } from "./user.constant";

export type IUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: "student" | "faculty" | "admin";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
};

export type IUserRole = keyof typeof USER_ROLE;