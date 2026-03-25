"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const progress_controller_js_1 = require("./progress.controller.js");
const auth_middleware_js_1 = require("../../middlewares/auth.middleware.js");
const router = express_1.default.Router();
router.route("/").post(auth_middleware_js_1.authMiddleware, progress_controller_js_1.upsert);
router.route("/course/:courseId").get(auth_middleware_js_1.authMiddleware, progress_controller_js_1.getCourseProgress);
router.route("/lesson/:lessonId").get(auth_middleware_js_1.authMiddleware, progress_controller_js_1.getLessonProgress);
exports.default = router;
