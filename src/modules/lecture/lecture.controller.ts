import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { createLessonSchema, updateLessonSchema } from "./lecture.schema.js";
import * as lectureService from "./lecture.service.js";
import "multer";

export const create = catchAsync(async (req: Request, res: Response) => {
  const data = createLessonSchema.parse(req.body);

  if (!req.file) {
    return res.status(400).json({ success: false, error: "No video file uploaded" });
  }

  const result = await lectureService.createLesson(
    data.title,
    data.position,
    data.courseId,
    req.file.path
  );

  return res.status(201).json({ success: true, data: result });
});

export const getByCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const result = await lectureService.getLessonsByCourse(courseId as string);
  return res.status(200).json({ success: true, data: result });
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await lectureService.getLessonById(id as string);
  return res.status(200).json({ success: true, data: result });
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = updateLessonSchema.parse(req.body);
  const result = await lectureService.updateLesson(id as string, data);
  return res.status(200).json({ success: true, data: result });
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await lectureService.deleteLesson(id as string);
  return res.status(200).json({ success: true, data: result });
});