import express from 'express';
import { forgetPassword, login, registerUser, resetPassword } from '../controllers/userController.js';

const router = express.Router();


router.post('/register',registerUser);
router.post("/login",login);
router.post("/forget-password",forgetPassword);
router.post("/reset-password/:id/:token",resetPassword)

export default router