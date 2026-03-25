import { Router } from "express";
import { getDashboard } from "./dashboard.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(authMiddleware,getDashboard);

export default router;