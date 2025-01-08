import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserDocument } from "../types/User";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Entrer votre nom du societe"],
  },
  logo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Entrer votre adresse email "],
    unique: true,
  },
  tel: {
    type: Number,
    required: [true, "Entrer votre numéro de telephone"],
  },
  password: {
    type: String,
    required: [true, "Entrer votre mot de passe "],
  },
  role: {
    type: String,
    default: "Admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Number,
    default: 0,
  },
});

UserSchema.methods.matchPassword = async function (
  this: any,
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (this: UserDocument, next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const UserModel = mongoose.model<UserDocument>(
  "UserCompany",
  UserSchema
);
