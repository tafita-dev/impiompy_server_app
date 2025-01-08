import { toString } from "lodash";
import mongoose from "mongoose";

export const ConnectionDatabase = () => {
  mongoose
    .connect(toString(process.env.MONGO_URL))
    .then((e) => {
      console.log(`MongoDB database is connected in ${e.connection.host}`);
    })
    .catch((er) => {
      console.log(`error : ${er}`);
    });
};
