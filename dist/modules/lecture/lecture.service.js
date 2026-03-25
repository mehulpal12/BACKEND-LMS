"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLesson = exports.updateLesson = exports.getLessonsByCourse = exports.getLessonById = exports.createLesson = void 0;
const index_js_1 = __importDefault(require("../../db/index.js"));
const apiError_js_1 = require("../../utils/apiError.js");
const cloudinary_js_1 = __importDefault(require("../../config/cloudinary.js"));
const createLesson = async (title, position, courseId, filePath) => {
    // Verify the course exists
    const course = await index_js_1.default.course.findUnique({
        where: { id: courseId },
    });
    if (!course) {
        throw new apiError_js_1.ApiError(404, "Course not found");
    }
    // Upload video to Cloudinary
    const uploadResult = await cloudinary_js_1.default.uploader.upload(filePath, {
        resource_type: "video",
        folder: "main-course/lectures",
    });
    const lesson = await index_js_1.default.lesson.create({
        data: {
            title,
            position,
            courseId,
            videoUrl: uploadResult.secure_url,
        },
    });
    return { lesson };
};
exports.createLesson = createLesson;
const getLessonById = async (lessonId) => {
    const lesson = await index_js_1.default.lesson.findUnique({
        where: { id: lessonId },
        include: {
            course: {
                select: { id: true, title: true },
            },
        },
    });
    if (!lesson) {
        throw new apiError_js_1.ApiError(404, "Lesson not found");
    }
    return { lesson };
};
exports.getLessonById = getLessonById;
const getLessonsByCourse = async (courseId) => {
    const course = await index_js_1.default.course.findUnique({
        where: { id: courseId },
    });
    if (!course) {
        throw new apiError_js_1.ApiError(404, "Course not found");
    }
    const lessons = await index_js_1.default.lesson.findMany({
        where: { courseId },
        orderBy: { position: "asc" },
    });
    return { lessons };
};
exports.getLessonsByCourse = getLessonsByCourse;
const updateLesson = async (lessonId, data) => {
    const lesson = await index_js_1.default.lesson.findUnique({
        where: { id: lessonId },
    });
    if (!lesson) {
        throw new apiError_js_1.ApiError(404, "Lesson not found");
    }
    const updatedLesson = await index_js_1.default.lesson.update({
        where: { id: lessonId },
        data,
    });
    return { lesson: updatedLesson };
};
exports.updateLesson = updateLesson;
const deleteLesson = async (lessonId) => {
    const lesson = await index_js_1.default.lesson.findUnique({
        where: { id: lessonId },
    });
    if (!lesson) {
        throw new apiError_js_1.ApiError(404, "Lesson not found");
    }
    // Extract Cloudinary public ID from the URL and delete the video
    const urlParts = lesson.videoUrl.split("/");
    const publicIdWithExt = urlParts.slice(-1)[0];
    const publicId = publicIdWithExt.split(".")[0];
    try {
        await cloudinary_js_1.default.uploader.destroy(publicId, { resource_type: "video" });
    }
    catch {
        // Log but don't block deletion if Cloudinary cleanup fails
        console.warn("Failed to delete video from Cloudinary:", publicId);
    }
    await index_js_1.default.lesson.delete({
        where: { id: lessonId },
    });
    return { message: "Lesson deleted successfully" };
};
exports.deleteLesson = deleteLesson;
