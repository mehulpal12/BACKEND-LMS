"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const apiError_js_1 = require("../utils/apiError.js");
const index_js_1 = __importDefault(require("../db/index.js"));
const roleMiddleware = (...allowedRoles) => {
    return async (req, res, next) => {
        const userId = req.id;
        if (!userId) {
            return next(new apiError_js_1.ApiError(401, "Unauthorized"));
        }
        const user = await index_js_1.default.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });
        if (!user) {
            return next(new apiError_js_1.ApiError(404, "User not found"));
        }
        if (!allowedRoles.includes(user.role)) {
            return next(new apiError_js_1.ApiError(403, "Forbidden: Insufficient permissions"));
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
