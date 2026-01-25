// A User Role-Based Access Control (RBAC) to keep data secure.

import { IUser, UserRole } from "@/types/modelTypes";
import mongoose, { model, models, Schema } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },
    workspaceId: {
      type: mongoose.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    active: { type: Boolean, required: true }, // Better to deactivate than delete
  },
  { timestamps: true },
);

userSchema.index({ workspaceId: 1 });

const User = models.User || model<IUser>("User", userSchema);
export default User;
