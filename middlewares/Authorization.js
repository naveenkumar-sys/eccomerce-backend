import User from "../models/userModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const authorization = async (req, res, next) => {
  try {
    const token = req.header.authorization?.split(" ")[1];
    if (!token) {
      return res.status(404).json({ message: "The token is missing" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded._id).select("-password");
    if (!req.user) {
      return res.status(404).json("User is not found");
    }
    if (req.user.role !== "seller") {
      return res
        .status(404)
        .json("Access denied only seller can access this page");
    }
    next();
  } catch (error) {
    res.status(500).message;
  }
};
