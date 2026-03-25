"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /modules/enrollment/enrollment.routes.js
const express_1 = __importDefault(require("express"));
const enrollment_controller_js_1 = require("./enrollment.controller.js");
const auth_middleware_js_1 = require("../../middlewares/auth.middleware.js");
const router = express_1.default.Router();
router.post("/:courseId", auth_middleware_js_1.authMiddleware, enrollment_controller_js_1.enrollCourse);
exports.default = router;
