import { Request, Response } from "express";
import Jwt, { decode } from "jsonwebtoken";
import { isUndefined, toString } from "lodash";
import { UserModel } from "../models/User";

export const isAuthentificatedUser = async (
  req: Request | any,
  res: Response,
  next: any
) => {
  const header = req.headers.authorization;
  if (isUndefined(header))
    return res.status(401).json({
      success: false,
      message: "Login first to access this ressources",
    });
  const [scheme, token] = header.split(" ");

  console.log(token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Login first to access this ressources",
    });
  }

  if (scheme.toLocaleLowerCase() !== "bearer") {
    return res.status(401).json({
      success: false,
      message: "Login first to access this ressources",
    });
  }

  const decoded: any = Jwt.verify(token, toString(process.env.JWT_SECRET));
  req.user = await UserModel.findById(decoded.id);
  console.log(req.user);

  next();
};

export const authorizeRole = (...roles: any) => {
  return (req: Request | any, res: Response, next: any) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: `Role ${req.user.role} is no allow access this ressources `,
      });
    }
    next();
  };
};
