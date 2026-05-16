import User from "../models/userModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
// This is for whether the user is able to access the anything or not
export const authorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(404).json({ message: "The token is missing" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(404).json("User is not found");
    }
    if (req.user.role !== "seller") {
      return res
        .status(404)
        .json("Access denied only seller can access this page");
    } // this is for check the role to user will valid or not
    next();
  } catch (error) {
    res.status(500).message;
  }
};
