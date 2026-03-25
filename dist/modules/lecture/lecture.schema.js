"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLessonSchema = exports.createLessonSchema = void 0;
const zod_1 = require("zod");
exports.createLessonSchema = zod_1.z
    .object({
    title: zod_1.z.string().min(3, "Title must be at least 3 characters"),
    position: zod_1.z.coerce.number().int().min(0, "Position must be 0 or greater"),
    courseId: zod_1.z.string().uuid("Course ID must be a valid UUID"),
})
    .strict();
exports.updateLessonSchema = zod_1.z
    .object({
    title: zod_1.z.string().min(3, "Title must be at least 3 characters").optional(),
    position: zod_1.z.coerce.number().int().min(0, "Position must be 0 or greater").optional(),
})
    .strict();
