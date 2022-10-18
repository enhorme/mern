import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "Auth Error",
      });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Auth Error pass",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Auth ERROR",
    });
  }
};

export const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = req.body.password;
    const hash = await bcrypt.hash(password, salt);
    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash: hash,
    });

    const user = await doc.save();
    const { passwordHash, ...userData } = user._doc;

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "sercret123",
      { expiresIn: "30d" }
    );
    res.json({ ...userData, token });
  } catch (e) {
    console.log(e);
    res.status(500).json("Register error");
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { passwordHash, ...userData } = user._doc;
    res.json(userData);
  } catch (e) {
    res.status(404).json({ message: "No access" });
  }
};
