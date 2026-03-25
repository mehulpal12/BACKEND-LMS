"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const apiError_js_1 = require("../utils/apiError.js");
const jwt_js_1 = require("../utils/jwt.js");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new apiError_js_1.ApiError(401, "Unauthorized: No token provided or wrong format"));
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return next(new apiError_js_1.ApiError(401, "Invalid token format"));
    }
    try {
        const decoded = (0, jwt_js_1.verifyToken)(token);
        req.id = decoded.userId;
        next();
    }
    catch {
        next(new apiError_js_1.ApiError(401, "Invalid token"));
    }
};
exports.authMiddleware = authMiddleware;
