import express from "express";
import cors from "cors";
import db from "./DB/connection.db.js";
import { globalErrorHandling } from "./middleware/error.middleware.js";
import { authenticationController } from "./modules/authentication/index.js";
import { blogController } from "./modules/blog/index.js";
import { userController } from "./modules/users/index.js";

const app = express();


app.use(cors(), express.json());
app.get("/test-db", async (req, res) => {
  try {
    const [result] = await db.execute("SELECT 1 + 1 AS result");

    res.json({
      message: "Database works",
      result
    });
  } catch (error) {
    console.error("DB ERROR:", error);

    res.status(500).json({
      message: "Database failed",
      error: error.message
    });
  }
});
app.use("/auth",authenticationController);
app.use("/blog",blogController);
app.use("/user",userController);


app.get("/test", (req, res, next) => {
  res.send({ message: "welcome to BE API" });
});
app.all("{/*dummy}", (req, res, next) => {
  res.status(404).send({ message: "invalid application routing" });
});


app.use(globalErrorHandling)


export default app;


