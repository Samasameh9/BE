import express from "express";
import cors from "cors";

import { globalErrorHandling } from "./middleware/error.middleware.js";
import { authenticationController } from "./modules/authentication/index.js";
import { blogController } from "./modules/blog/index.js";
import { userController } from "./modules/users/index.js";

const app = express();


app.use(cors(), express.json());

app.use("/auth",authenticationController);
app.use("/blog",blogController);
app.use("/user",userController);


app.get("/", (req, res, next) => {
  res.json({ message: "welcome to BE API" });
});
app.all("{/*dummy}", (req, res, next) => {
  res.status(404).send({ message: "invalid application routing" });
});
app.use(globalErrorHandling)


export default app;


