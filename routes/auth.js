import checkAuth from "../utils/checkAuth.js";
import * as UserController from "../controllers/UserController.js";
import {
  loginValidation,
  registerValidation,
} from "../validations/validation.js";
import { errorsCheck } from "../utils/errorsCheck.js";
import express from "express";

const authRouter = express.Router();

authRouter.get("/me", checkAuth, UserController.getMe);

authRouter.post("/login", loginValidation, UserController.login);

authRouter.post(
  "/register",
  registerValidation,
  errorsCheck,
  UserController.register
);

export default authRouter;
