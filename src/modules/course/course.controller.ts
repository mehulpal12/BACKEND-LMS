import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { createCourseSchema, updateCourseSchema } from "./course.schema.js";
import * as courseService from "./course.service.js";

export const create = catchAsync(async (req: Request, res: Response) => {
  const data = createCourseSchema.parse(req.body);
  const instructorId = req.id as string;
  const result = await courseService.createCourse(
    data.title,
    data.description,
    instructorId,
    data.thumbnail,
    data.price
  );
  return res.status(201).json({ success: true, data: result });
});

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await courseService.getAllCourses();
  return res.status(200).json({ success: true, data: result });
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await courseService.getCourseById(id as string);
  return res.status(200).json({ success: true, data: result });
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = updateCourseSchema.parse(req.body);
  const userId = req.id as string;
  const result = await courseService.updateCourse(id as string, userId, data);
  return res.status(200).json({ success: true, data: result });
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.id as string;
  const result = await courseService.deleteCourse(id as string, userId);
  return res.status(200).json({ success: true, data: result });
});
