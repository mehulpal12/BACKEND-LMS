"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCourses = exports.deleteCourse = exports.updateCourse = exports.getCourseById = exports.createCourse = void 0;
const index_js_1 = __importDefault(require("../../db/index.js"));
const apiError_js_1 = require("../../utils/apiError.js");
const createCourse = async (title, description, instructorId, thumbnail, price) => {
    const course = await index_js_1.default.course.create({
        data: {
            title,
            description,
            instructorId,
            thumbnail,
            price,
        },
    });
    return { course };
};
exports.createCourse = createCourse;
const getCourseById = async (courseId) => {
    const course = await index_js_1.default.course.findUnique({
        where: { id: courseId },
        include: {
            instructor: {
                select: { id: true, name: true, email: true },
            },
            lessons: {
                orderBy: { position: "asc" },
            },
        },
    });
    if (!course) {
        throw new apiError_js_1.ApiError(404, "Course not found");
    }
    return { course };
};
exports.getCourseById = getCourseById;
const updateCourse = async (courseId, userId, data) => {
    const course = await index_js_1.default.course.findUnique({
        where: { id: courseId },
    });
    if (!course) {
        throw new apiError_js_1.ApiError(404, "Course not found");
    }
    if (course.instructorId !== userId) {
        throw new apiError_js_1.ApiError(403, "You can only update your own courses");
    }
    const updatedCourse = await index_js_1.default.course.update({
        where: { id: courseId },
        data,
    });
    return { course: updatedCourse };
};
exports.updateCourse = updateCourse;
const deleteCourse = async (courseId, userId) => {
    const course = await index_js_1.default.course.findUnique({
        where: { id: courseId },
    });
    if (!course) {
        throw new apiError_js_1.ApiError(404, "Course not found");
    }
    if (course.instructorId !== userId) {
        throw new apiError_js_1.ApiError(403, "You can only delete your own courses");
    }
    await index_js_1.default.course.delete({
        where: { id: courseId },
    });
    return { message: "Course deleted successfully" };
};
exports.deleteCourse = deleteCourse;
const getAllCourses = async () => {
    const courses = await index_js_1.default.course.findMany({
        include: {
            instructor: {
                select: { id: true, name: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });
    return { courses };
};
exports.getAllCourses = getAllCourses;
