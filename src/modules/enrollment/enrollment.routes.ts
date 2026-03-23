// /modules/enrollment/enrollment.routes.js
import express from "express";
import { enrollCourse } from "./enrollment.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:courseId", authMiddleware, enrollCourse);

export default router;