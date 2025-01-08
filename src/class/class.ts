import { UserModel } from "../models/User";
import { userInterface } from "../types/User";

export class User {
  //create user
  public Create = async (user: userInterface) => {
    const NewUser = await UserModel.create(user);
    return NewUser;
  };

  //get single user
  public getUserByEmail = async (email: string) => {
    const user = await UserModel.findOne({ email: email });
    return user;
  };

  public getUserByID = async (id: string) => {
    const user = await UserModel.findById(id);
    return user;
  };

  public getAllUserCompanies = async () => {
    const usersCompanies = await UserModel.find().sort({ createdAt: -1 });
    return usersCompanies;
  };
}

// handlerError.ts
export class HandlerError extends Error {
  public statusCode: number;
  public success: string;
  public isOperational: boolean;
  public data: {} | [];

  constructor(message: string, statusCode = 500, data: {} | []) {
    super(message);
    this.statusCode = statusCode;
    this.success = `${statusCode}`.startsWith("4") ? "false" : "error";
    this.isOperational = true;
    this.data = data;

    // Maintenir le prototype pour les instances d'erreur personnalisées
    Object.setPrototypeOf(this, HandlerError.prototype);
  }
}
