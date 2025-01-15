import Express from "express";
import {
  CreateUser,
  Login,
  logout,
  UsersCompanies,
  UUpdateCompanies,
  getOneUser,
} from "../controllers/user";
import { isAuthentificatedUser, authorizeRole } from "../middlewares/auth";
export const UserRouter = Express.Router();

UserRouter.route("/user/create").post(CreateUser);
UserRouter.route("/user/login").post(Login);
UserRouter.route("/user/logout").get(logout);
UserRouter.route("/user/oneuser").post(
  isAuthentificatedUser,
  authorizeRole("Admin"),
  getOneUser
);
UserRouter.route("/user/listes").get(
  isAuthentificatedUser,
  authorizeRole("SuperAdmin"),
  UsersCompanies
);
UserRouter.route("/user/update").put(
  isAuthentificatedUser,
  authorizeRole("SuperAdmin"),
  UUpdateCompanies
);
