// When the owner opens the "Punch-In" screen, the app creates a temporary token.

import { IQrSession } from "@/types/modelTypes";
import mongoose, { model, models, Schema } from "mongoose";

const QrSessionSchema = new Schema<IQrSession>({
  workspaceId: {
    type: mongoose.Types.ObjectId,
    ref: "Workspace",
  },
  token: {
    // Random Hash
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: 0,
  },
  // Mongo TTL: index: Auto-deletes in 60s
});

QrSessionSchema.index({ token: 1 }, { unique: true });

const QrSession =
  models.QrSession || model<IQrSession>("QrSession", QrSessionSchema);
export default QrSession;
