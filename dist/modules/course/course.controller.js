"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const catchAsync_js_1 = require("../../utils/catchAsync.js");
const course_schema_js_1 = require("./course.schema.js");
const courseService = __importStar(require("./course.service.js"));
exports.create = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const data = course_schema_js_1.createCourseSchema.parse(req.body);
    const instructorId = req.id;
    const result = await courseService.createCourse(data.title, data.description, instructorId, data.thumbnail, data.price);
    return res.status(201).json({ success: true, data: result });
});
exports.getAll = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const result = await courseService.getAllCourses();
    return res.status(200).json({ success: true, data: result });
});
exports.getById = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const result = await courseService.getCourseById(id);
    return res.status(200).json({ success: true, data: result });
});
exports.update = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const data = course_schema_js_1.updateCourseSchema.parse(req.body);
    const userId = req.id;
    const result = await courseService.updateCourse(id, userId, data);
    return res.status(200).json({ success: true, data: result });
});
exports.remove = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const userId = req.id;
    const result = await courseService.deleteCourse(id, userId);
    return res.status(200).json({ success: true, data: result });
});
