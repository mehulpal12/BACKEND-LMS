import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { upsertProgressSchema } from "./progress.schema.js";
import * as progressService from "./progress.service.js";

export const upsert = catchAsync(async (req: Request, res: Response) => {
  const userId = req.id as string;
  const data = upsertProgressSchema.parse(req.body);
  const result = await progressService.upsertProgress(
    userId,
    data.lessonId,
    data.completed
  );
  return res.status(200).json({ success: true, data: result });
});

export const getCourseProgress = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.id as string;
    const { courseId } = req.params;
    const result = await progressService.getCourseProgress(
      userId,
      courseId as string
    );
    return res.status(200).json({ success: true, data: result });
  }
);

export const getLessonProgress = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.id as string;
    const { lessonId } = req.params;
    const result = await progressService.getLessonProgress(
      userId,
      lessonId as string
    );
    return res.status(200).json({ success: true, data: result });
  }
);
