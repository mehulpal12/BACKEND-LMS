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
exports.remove = exports.update = exports.getById = exports.getByCourse = exports.create = void 0;
const catchAsync_js_1 = require("../../utils/catchAsync.js");
const lecture_schema_js_1 = require("./lecture.schema.js");
const lectureService = __importStar(require("./lecture.service.js"));
require("multer");
exports.create = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const data = lecture_schema_js_1.createLessonSchema.parse(req.body);
    if (!req.file) {
        return res.status(400).json({ success: false, error: "No video file uploaded" });
    }
    const result = await lectureService.createLesson(data.title, data.position, data.courseId, req.file.path);
    return res.status(201).json({ success: true, data: result });
});
exports.getByCourse = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const { courseId } = req.params;
    const result = await lectureService.getLessonsByCourse(courseId);
    return res.status(200).json({ success: true, data: result });
});
exports.getById = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const result = await lectureService.getLessonById(id);
    return res.status(200).json({ success: true, data: result });
});
exports.update = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const data = lecture_schema_js_1.updateLessonSchema.parse(req.body);
    const result = await lectureService.updateLesson(id, data);
    return res.status(200).json({ success: true, data: result });
});
exports.remove = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const result = await lectureService.deleteLesson(id);
    return res.status(200).json({ success: true, data: result });
});
