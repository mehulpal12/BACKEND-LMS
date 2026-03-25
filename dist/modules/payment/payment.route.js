"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// payment.routes.js
const express_1 = __importDefault(require("express"));
const payment_controller_js_1 = require("./payment.controller.js");
const auth_middleware_js_1 = require("../../middlewares/auth.middleware.js");
const router = express_1.default.Router();
router.post("/create", auth_middleware_js_1.authMiddleware, payment_controller_js_1.createPayment);
router.post("/verify", auth_middleware_js_1.authMiddleware, payment_controller_js_1.verifyPayment);
exports.default = router;
