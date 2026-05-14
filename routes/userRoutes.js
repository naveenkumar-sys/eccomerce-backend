import express from 'express';
import { forgetPassword, login, registerUser } from '../controllers/userController.js';

const router = express.Router();


router.post('/register',registerUser);
router.post("/login",login);
router.post("/forget-password",forgetPassword);

export default router