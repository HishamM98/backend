import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import { userRouter } from "./routes/users.js";
import { recipeRouter } from "./routes/recipes.js";

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/recipes", recipeRouter);
app.use("*", (req, res) => {
  res.send("Error 404 Invalid Endpoint");
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send("something went wrong");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
