import { USER_ROLE } from "./user.constant";

export type IUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: "student" | "faculty" | "admin";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
};

export type IUserRole = keyof typeof USER_ROLE;