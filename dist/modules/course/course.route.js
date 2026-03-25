"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_controller_js_1 = require("./course.controller.js");
const auth_middleware_js_1 = require("../../middlewares/auth.middleware.js");
const role_middleware_js_1 = require("../../middlewares/role.middleware.js");
const router = express_1.default.Router();
router.route("/").get(course_controller_js_1.getAll);
router.route("/").post(auth_middleware_js_1.authMiddleware, (0, role_middleware_js_1.roleMiddleware)("ADMIN"), course_controller_js_1.create);
router.route("/:id").get(course_controller_js_1.getById);
router.route("/:id").put(auth_middleware_js_1.authMiddleware, (0, role_middleware_js_1.roleMiddleware)("ADMIN"), course_controller_js_1.update);
router.route("/:id").delete(auth_middleware_js_1.authMiddleware, (0, role_middleware_js_1.roleMiddleware)("ADMIN"), course_controller_js_1.remove);
exports.default = router;
