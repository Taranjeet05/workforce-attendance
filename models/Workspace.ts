// This store the "company" details and the GeoFencing rules:
import { IWorkspace } from "@/types/modelTypes";
import mongoose, { model, models, Schema } from "mongoose";

const workspaceSchema = new Schema<IWorkspace>({
  name: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },

  radiusInMeters: {
    type: Number,
    required: true,
  },
  qrRotationSeconds: {
    type: Number,
    required: true,
  },
});

workspaceSchema.index({ ownerId: 1 });
workspaceSchema.index({ location: "2dsphere" });

const Workspace =
  models.Workspace || model<IWorkspace>("Workspace", workspaceSchema);

export default Workspace;
