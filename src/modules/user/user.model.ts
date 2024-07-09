import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.interface";
import { config } from "../../config";

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlength: [6, "password must be at least 6 characters or longer"],
      required: [true, "Password is required"],
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
      required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//! pre save middleware / hook 👇
userSchema.pre("save", async function (next) {
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
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

export const User = mongoose.model<IUser>("User", userSchema);
