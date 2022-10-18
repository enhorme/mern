import { body } from "express-validator";

export const loginValidation = [
  body("email").isEmail(),
  body("password").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "Incorrect email").isEmail(),
  body("fullName").isLength({ min: 3 }),
  body("password", "Min length err").isLength({ min: 5 }),
  body("avatarURL").optional().isURL(),
];

export const createPostValidation = [
  body("title", "Title error").isLength({ min: 5 }).isString(),
  body("text").isLength({ min: 5 }).isString(),
  body("tags", "Tags format error").optional().isArray(),
];
