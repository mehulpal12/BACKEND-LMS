"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
exports.registerUserSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(2, "Name must be atleast 2 characters long"),
    email: zod_1.z.email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be atleast 6 characters long"),
})
    .strict();
exports.loginUserSchema = zod_1.z
    .object({
    email: zod_1.z.email("Invalid email address"),
    password: zod_1.z.string().min(1, "Password cannot be empty"),
})
    .strict();
