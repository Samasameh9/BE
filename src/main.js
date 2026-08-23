import express from "express";
import cors from "cors";
import db from "./DB/connection.db.js";
import { globalErrorHandling } from "./middleware/error.middleware.js";
import { authenticationController } from "./modules/authentication/index.js";
import { blogController } from "./modules/blog/index.js";
import { userController } from "./modules/users/index.js";
import { NODE_ENV, PORT } from "./config.js";

const app = express();

app.use(cors(), express.json());

app.use("/auth", authenticationController);
app.use("/blog", blogController);
app.use("/user", userController);

app.get("/", (req, res, next) => {
  res.send({ message: "welcome to BE API" });
});
app.all("{/*dummy}", (req, res, next) => {
  res.status(404).send({ message: "invalid application routing" });
});


app.use(globalErrorHandling);


NODE_ENV === "development" &&
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

export default app;
