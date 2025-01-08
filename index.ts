import Express, { Request, Response } from "express";
import dotenv from "dotenv";
import { ConnectionDatabase } from "./src/config/database";
import { errorMiddleware } from "./src/middlewares/HandlError";
import Body_Parser from "body-parser";
import fileUpload from "express-fileupload";
import { UserRouter } from "./src/routes/user";
const cookieParser = require("cookie-parser");
import cors from "cors";

dotenv.config();

const app = Express();

ConnectionDatabase();

app.use(Body_Parser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(cors());

app.use(cookieParser());
app.use(Express.json());
app.use(Body_Parser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is starting");
});

app.use("/api/v1", UserRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`app is starting in http://localhost:${process.env.PORT}`);
});
