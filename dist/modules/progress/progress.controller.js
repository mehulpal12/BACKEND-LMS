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
exports.getLessonProgress = exports.getCourseProgress = exports.upsert = void 0;
const catchAsync_js_1 = require("../../utils/catchAsync.js");
const progress_schema_js_1 = require("./progress.schema.js");
const progressService = __importStar(require("./progress.service.js"));
exports.upsert = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const userId = req.id;
    const data = progress_schema_js_1.upsertProgressSchema.parse(req.body);
    const result = await progressService.upsertProgress(userId, data.lessonId, data.completed);
    return res.status(200).json({ success: true, data: result });
});
exports.getCourseProgress = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const userId = req.id;
    const { courseId } = req.params;
    const result = await progressService.getCourseProgress(userId, courseId);
    return res.status(200).json({ success: true, data: result });
});
exports.getLessonProgress = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const userId = req.id;
    const { lessonId } = req.params;
    const result = await progressService.getLessonProgress(userId, lessonId);
    return res.status(200).json({ success: true, data: result });
});
