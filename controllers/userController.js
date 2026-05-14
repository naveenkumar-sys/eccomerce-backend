import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendMail from "../utils/nodemailer.js";

dotenv.config();

//register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User is already exist just login" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error });
  }
};

//Login USer
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res
        .status(404)
        .json({ message: "user not found please register first" });
    }

    const checkPassword = await bcrypt.compare(password, findUser.password);

    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: findUser._id, role: findUser.role },
      process.env.JWT_SECRET_KEY,
    );

    res.status(200).json({
      message: "The user logged in successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "unable to login",
      error: error.message,
    });
  }
};

//forget password
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res
        .status(404)
        .json({ message: "Unable to findUser please register" });
    }
    const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "20m",
    });

    await sendMail(
      findUser.email,
      `You are receiving this email because you requested a password reset. 
      Click the link below to reset your password: http://localhost:5173/reset-password/${findUser._id}/${token} 
      This link will expire in 20 minutes.`,
    );

    res.status(200).json({ message: "Email sent Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "unable to reset password", error: error.message });
  }
};
