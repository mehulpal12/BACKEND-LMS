import express from "express";
import { getMe, login, register, googleLogin } from "./auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/google/callback").post(googleLogin);
router.route("/me").get(authMiddleware, getMe);

export default router;