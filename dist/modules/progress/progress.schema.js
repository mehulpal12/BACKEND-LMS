"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertProgressSchema = void 0;
const zod_1 = require("zod");
exports.upsertProgressSchema = zod_1.z
    .object({
    lessonId: zod_1.z.string().uuid("Lesson ID must be a valid UUID"),
    completed: zod_1.z.boolean(),
})
    .strict();
