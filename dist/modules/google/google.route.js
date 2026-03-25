"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const google_controller_js_1 = require("./google.controller.js");
const router = express_1.default.Router();
// router.route("/connect").get(authMiddleware, googleAuth);
// for testing only
router.route("/connect").get(google_controller_js_1.googleAuth);
router.route("/callback").get(google_controller_js_1.googleCallback);
exports.default = router;
