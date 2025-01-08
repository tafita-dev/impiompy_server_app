import { Document, Model } from "mongoose";

export interface userInterface {
  name: string;
  logo?: string;
  email: string;
  tel: string;
  password: string;
  role?: string;
  createdAt?: Date;
  status?: number;
}

export interface UserDocument extends Document, userInterface {
  matchPassword: (password: string) => Promise<Boolean>;
}

export interface UserModelDocument extends Model<UserDocument> {}
