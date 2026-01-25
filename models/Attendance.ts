// The most high-traffic collection. it must be optimized for fast READ/WRITE
import { IAttendance } from "@/types/modelTypes";
import mongoose, { model, models, Schema } from "mongoose";

const attendanceSchema = new Schema<IAttendance>({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    index: true,
  },
  workspaceId: {
    type: mongoose.Types.ObjectId,
    ref: "Workspace",
    index: true,
  },
  date: {
    type: String,
    index: true,
  },
  checkIn: {
    timestamp: { type: Date, required: true },
    location: { type: [Number], required: true }, // [lng, lat]
    isVerified: { type: Boolean, default: false },
  },
  checkOut: {
    timestamp: { type: Date },
    location: { type: [Number] },
  },
  totalMinutes: { type: Number, default: 0 },
});

attendanceSchema.index({ userId: 1, date: 1 });
attendanceSchema.index({ workspaceId: 1, date: 1 });
attendanceSchema.index(
  { workspaceId: 1 },
  {
    partialFilterExpression: { checkOut: { $exists: false } },
  },
);

const Attendance =
  models.Attendance || model<IAttendance>("Attendance", attendanceSchema);
export default Attendance;
