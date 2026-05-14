import User from "../models/userModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
export const authentication = async (req, res, next) => {
  try {
    const token = req.header.authorization?.split(" ")[1];
    if (!token) {
      return res.status(404).json({ message: "Token is missing" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded._id).select("-password"); // adding the particular user to the request object with property called user
    if (!req.user) {
      return res.status(404).json({ message: "User is not found" });
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Invalid token or server error", error: error.message });
  }
};
