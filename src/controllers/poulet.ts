import { NextFunction, Request, Response } from "express";
import { HandlerError, Poulet } from "../class/class";
import { isEmpty, isString, isUndefined, toString } from "lodash";
import { isNull } from "lodash";
import { generateToken, sendToken } from "../../utils/generateToken";
import { UserModel } from "../models/User";
import { UploadedFile } from "express-fileupload";
const poulet = new Poulet();
import fs from "fs";
import { uploadFile } from "../../utils/uploadFile";

export const CreatePoulet = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const images = req.files?.image as UploadedFile;

    const imageUrl = await uploadFile(images.tempFilePath);
    if (!imageUrl) {
      throw new HandlerError("creation image impossible", 400, {});
    }

    const newPoulet = await poulet.Create({
      ...req.body,
      image: imageUrl,
      user: req.user._id,
    });
    fs.unlinkSync(images.tempFilePath);

    if (newPoulet.id) {
      throw new HandlerError("Polet créér avec succes", 200, newPoulet);
    }
  } catch (error) {
    next(error);
  }
};
