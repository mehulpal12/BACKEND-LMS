"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLessonProgress = exports.getCourseProgress = exports.upsertProgress = void 0;
const index_js_1 = __importDefault(require("../../db/index.js"));
const apiError_js_1 = require("../../utils/apiError.js");
/**
 * Create or update progress for a user on a specific lesson.
 * Uses upsert so calling it twice just toggles the completed flag.
 */
const upsertProgress = async (userId, lessonId, completed) => {
    // Verify the lesson exists
    const lesson = await index_js_1.default.lesson.findUnique({
        where: { id: lessonId },
    });
    if (!lesson) {
        throw new apiError_js_1.ApiError(404, "Lesson not found");
    }
    const progress = await index_js_1.default.progress.upsert({
        where: {
            userId_lessonId: { userId, lessonId },
        },
        update: { completed },
        create: { userId, lessonId, completed },
    });
    return { progress };
};
exports.upsertProgress = upsertProgress;
/**
 * Get progress for every lesson in a course for a specific user.
 */
const getCourseProgress = async (userId, courseId) => {
    // Verify the course exists
    const course = await index_js_1.default.course.findUnique({
        where: { id: courseId },
        include: {
            lessons: {
                select: { id: true, title: true, position: true },
                orderBy: { position: "asc" },
            },
        },
    });
    if (!course) {
        throw new apiError_js_1.ApiError(404, "Course not found");
    }
    const lessonIds = course.lessons.map((l) => l.id);
    const progressRecords = await index_js_1.default.progress.findMany({
        where: {
            userId,
            lessonId: { in: lessonIds },
        },
    });
    // Map progress by lessonId for easy lookup
    const progressMap = new Map(progressRecords.map((p) => [p.lessonId, p.completed]));
    const lessons = course.lessons.map((lesson) => ({
        ...lesson,
        completed: progressMap.get(lesson.id) ?? false,
    }));
    const completedCount = lessons.filter((l) => l.completed).length;
    return {
        courseId,
        totalLessons: lessons.length,
        completedLessons: completedCount,
        progressPercent: lessons.length > 0
            ? Math.round((completedCount / lessons.length) * 100)
            : 0,
        lessons,
    };
};
exports.getCourseProgress = getCourseProgress;
/**
 * Get a single progress record for a user + lesson.
 */
const getLessonProgress = async (userId, lessonId) => {
    const progress = await index_js_1.default.progress.findUnique({
        where: {
            userId_lessonId: { userId, lessonId },
        },
    });
    return { completed: progress?.completed ?? false };
};
exports.getLessonProgress = getLessonProgress;
