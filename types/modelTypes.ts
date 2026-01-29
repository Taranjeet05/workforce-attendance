import { Types } from "mongoose";

// User Role // OWNER // MANAGER // EMPLOYEE

export enum UserRole {
  OWNER = "OWNER",
  MANAGER = "MANAGER",
  EMPLOYEE = "EMPLOYEE",
}

export interface IUser {
  // name // email // image // createdAt // updatedAt
  _id?: Types.ObjectId;
  name: string;
  email: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWorkspace {
  // id // name // ownerId // location: lat / lng // radius // QrRotationSeconds
  _id?: Types.ObjectId;
  name: string;
  ownerId: Types.ObjectId;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  radiusInMeters: number;
  qrRotationSeconds: number;
}

export interface IWorkspaceMember {
  //id // userId // WorkspaceId // role // active // invitedBy // joinedAt
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  workspaceId: Types.ObjectId;
  role: UserRole;
  active: boolean;
  invitedBy?: Types.ObjectId; // Who invited this user (OWNER / MANAGER)
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAttendance {
  // id // userId // workspaceId // attendanceDate // checkIn {timestamp location isVerified} // checkOut {timestamp, location} // totalMinutes
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  workspaceId: Types.ObjectId;
  attendanceDate: string;
  checkIn: {
    timestamp: Date;
    location: [number, number];
    isVerified: boolean;
  };
  checkOut?: {
    timestamp: Date;
    location: [number, number];
  };
  totalMinutes?: number;
}

export interface IQrSession {
  _id?: Types.ObjectId;
  workspaceId: Types.ObjectId;
  token: string;
  expiresAt: Date;
}
