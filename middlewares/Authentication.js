import User from "../models/userModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

//main use is to find whether user is logged in or not  with token
export const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];  // getting the token from header
    if (!token) {
      return res.status(404).json({ message: "Token is missing" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY); // decode the id from token to get decoded._id 
    req.user = await User.findById(decoded.id).select("-password"); // adding the particular user to the request object with property called user
    if (!req.user) {
      return res.status(404).json({ message: "User is not found" });
    }
    next(); //passing to next
  } catch (error) {
    res
      .status(500)
      .json({ message: "Invalid token or server error", error: error.message });
  }
};
