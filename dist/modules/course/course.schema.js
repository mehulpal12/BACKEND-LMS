"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseSchema = exports.createCourseSchema = void 0;
const zod_1 = require("zod");
exports.createCourseSchema = zod_1.z
    .object({
    title: zod_1.z.string().min(3, "Title must be at least 3 characters"),
    description: zod_1.z.string().min(10, "Description must be at least 10 characters"),
    thumbnail: zod_1.z.string().url("Thumbnail must be a valid URL").optional(),
    price: zod_1.z.number().min(0, "Price cannot be negative").optional(),
})
    .strict();
exports.updateCourseSchema = zod_1.z
    .object({
    title: zod_1.z.string().min(3, "Title must be at least 3 characters").optional(),
    description: zod_1.z.string().min(10, "Description must be at least 10 characters").optional(),
    thumbnail: zod_1.z.string().url("Thumbnail must be a valid URL").optional(),
    price: zod_1.z.number().min(0, "Price cannot be negative").optional(),
})
    .strict();
