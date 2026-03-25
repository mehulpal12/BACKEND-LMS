"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_js_1 = require("./auth.controller.js");
const auth_middleware_js_1 = require("../../middlewares/auth.middleware.js");
const router = express_1.default.Router();
router.route("/register").post(auth_controller_js_1.register);
router.route("/login").post(auth_controller_js_1.login);
router.route("/me").get(auth_middleware_js_1.authMiddleware, auth_controller_js_1.getMe);
exports.default = router;
