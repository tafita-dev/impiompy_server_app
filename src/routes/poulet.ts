import Express from "express";
import { CreatePoulet } from "../controllers/poulet";
import { isAuthentificatedUser, authorizeRole } from "../middlewares/auth";
export const PouletRouter = Express.Router();

PouletRouter.route("/poulet/create").post(
  isAuthentificatedUser,
  authorizeRole("Admin"),
  CreatePoulet
);
