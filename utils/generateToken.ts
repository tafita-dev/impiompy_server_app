import { Response } from "express";
import jwt from "jsonwebtoken";
import { toString } from "lodash";

export const generateToken = (id: string) => {
  console.log(process.env.JWT_SECRET);
  return jwt.sign({ id: id }, toString(process.env.JWT_SECRET), {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

export const sendToken = (
  user: any,
  statusCode: number,
  res: Response,
  token: any
) => {
  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: false,
      expires: new Date(
        Date.now() +
          Number(process.env.COOKIE_EXPIRES_TIME) * 24 * 60 * 60 * 1000
      ),
    })
    .json({
      success: true,
      token,
      user,
    });
};
