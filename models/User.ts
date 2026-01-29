// A User Role-Based Access Control (RBAC) to keep data secure.

import { IUser } from "@/types/modelTypes";
import { model, models, Schema } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = models.User || model<IUser>("User", userSchema);
export default User;
