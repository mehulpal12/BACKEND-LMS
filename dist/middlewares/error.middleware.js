"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    // Prisma duplicate error
    if (err.code === "P2002") {
        statusCode = 400;
        message = "Duplicate field value";
    }
    // Zod validation error
    if (err instanceof zod_1.ZodError) {
        // console.log(err);
        statusCode = 400;
        message = err.issues.map((e) => e.message).join(", ");
    }
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.errorHandler = errorHandler;
