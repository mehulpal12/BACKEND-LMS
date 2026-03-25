import prisma from "../db/index.js";
import { NextFunction, Request, Response } from "express";

export const checkEnrollment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.id as string;
    const { courseId } = req.params as { courseId: string };

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (!enrollment) {
      return res.status(403).json({
        message: "Access denied. Not enrolled in this course.",
      });
    }

    next();
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};