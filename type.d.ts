import { userInterface } from "./src/types/User";
declare module "cryptlib";
declare module "lodash";
declare global {
  namespace Express {
    interface Request {
      user?: userInterface; // Remplacez FidelityMember par le type correspondant à vos utilisateurs
    }
  }
}
