import express from "express";
import mongoose from "mongoose";
import {
  createPostValidation,
  loginValidation,
  registerValidation,
} from "./validations/validation.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import { errorsCheck } from "./utils/errorsCheck.js";

mongoose
  .connect(
    "mongodb+srv://enhor:wwwwww@cluster0.hk9fo.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("db ok"))
  .catch((err) => console.log(err));

const app = express();
const PORT = 7777;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    get: "success",
    port: "PORT",
  });
});

app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/auth/login", loginValidation, UserController.login);

app.post(
  "/auth/register",
  registerValidation,
  errorsCheck,
  UserController.register
);

//posts

app.post(
  "/posts",
  checkAuth,
  createPostValidation,
  errorsCheck,
  PostController.createPost
);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.delete("/posts/:id", checkAuth, PostController.deletePost);
app.patch("/posts/:id", checkAuth, PostController.update);

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`SERVER HAS BEEN STARTED AT PORT ${PORT}`);
});
