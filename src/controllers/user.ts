import { NextFunction, Request, Response } from "express";
import { HandlerError, User } from "../class/class";
import { isEmpty, isString, isUndefined, toString } from "lodash";
import { isNull } from "lodash";
import { generateToken, sendToken } from "../../utils/generateToken";
import { UserModel } from "../models/User";
import { UploadedFile } from "express-fileupload";
const user = new User();
import fs from "fs";
import { uploadFile } from "../../utils/uploadFile";

export const CreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const images = req.files?.logo as UploadedFile;
    console.log(images);
    const isEmailExist = await user.getUserByEmail(req.body.email);

    //test si email de  l'utilsateur est déja existe
    if (isEmailExist) {
      throw new HandlerError("Adresse email déjà utiliser", 400, {});
    }

    if (!toString(req.body.email).includes("@gmail.com")) {
      throw new HandlerError("adresse email non valide", 400, {});
    }
    const imageUrl = await uploadFile(images.tempFilePath);
    if (!imageUrl) {
      throw new HandlerError("creation image impossible", 400, {});
    }

    const newUser = await user.Create({ ...req.body, logo: imageUrl });
    fs.unlinkSync(images.tempFilePath);

    if (newUser.id) {
      throw new HandlerError("User créér avec succes", 200, newUser);
    }
  } catch (error) {
    next(error);
  }
};

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const User = await user.getUserByEmail(req.body.email);
    if (!User) {
      return res.status(400).json({
        success: false,
        message: "Adresse email incrorrecte",
      });
    }
    if (User && (await User.matchPassword(req.body.password))) {
      sendToken(User, 200, res, generateToken(User.id));
    } else {
      return res.status(400).json({
        success: false,
        message: "Mot de passe incorrecte",
      });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logout",
  });
};

export const UsersCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const usersCompanies = await user.getAllUserCompanies();
    throw new HandlerError("Listes des utilisateur", 200, usersCompanies);
  } catch (error) {
    next(error);
  }
};

export const UUpdateCompanies = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      isNull(req.body.Id) ||
      isEmpty(req.body.Id) ||
      isNull(req.body.status) ||
      isString(req.body.status)
    ) {
      throw new HandlerError("Utilisateur est requis", 400, {});
    }
    const User = await user.getUserByID(req.body.Id);
    console.log(req?.user);

    if (User) {
      User.status = req.body.status;

      const updatedUser = await User.save();

      throw new HandlerError(
        "Utilisateur Modifié avec succès",
        200,
        updatedUser
      );
    } else {
      throw new HandlerError("Utilisateur n'existe pas", 400, {});
    }
  } catch (error) {
    next(error);
  }
};

export const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body || req.params;
  console.log(id);
  try {
    if (!id) {
      throw new HandlerError("Utilisateur est requis", 404, {});
    }
    const OneUser = await user.getUserByID(id);
    if (!OneUser) {
      throw new HandlerError("Utilisateur n'existe pas", 404, {});
    }

    throw new HandlerError("Utilisateur connecté", 200, OneUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
