import { IWorkspaceMember, UserRole } from "@/types/modelTypes";
import mongoose, { model, models, Schema } from "mongoose";

const workspaceMemberSchema = new Schema<IWorkspaceMember>(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    workspaceId: {
      type: mongoose.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    // Who invited this member (OWNER / MANAGER)
    invitedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

// preventing Duplicate membership
workspaceMemberSchema.index({ userId: 1, workspaceId: 1 }, { unique: true });

const WorkspaceMember =
  models.WorkspaceMember ||
  model<IWorkspaceMember>("WorkspaceMember", workspaceMemberSchema);

export default WorkspaceMember;
