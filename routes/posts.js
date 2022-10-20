import checkAuth from "../utils/checkAuth.js";
import { createPostValidation } from "../validations/validation.js";
import { errorsCheck } from "../utils/errorsCheck.js";
import * as PostController from "../controllers/PostController.js";
import express from "express";

const postRouter = express.Router();

postRouter.post(
  "/",
  checkAuth,
  createPostValidation,
  errorsCheck,
  PostController.createPost
);

postRouter.get("/", PostController.getAll);
postRouter.get("/:id", PostController.getOne);
postRouter.delete("/:id", checkAuth, PostController.deletePost);
postRouter.patch(
  "/:id",
  checkAuth,
  createPostValidation,
  PostController.update
);

export default postRouter;
