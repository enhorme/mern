import * as PostController from "../controllers/PostController.js";
import express from "express";

const tagsRouter = express.Router();

tagsRouter.get("/", PostController.getTags);

export default tagsRouter;
