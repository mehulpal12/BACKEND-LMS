import express from "express";
import { upsert, getCourseProgress, getLessonProgress } from "./progress.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").post(authMiddleware, upsert);
router.route("/course/:courseId").get(authMiddleware, getCourseProgress);
router.route("/lesson/:lessonId").get(authMiddleware, getLessonProgress);

export default router;
