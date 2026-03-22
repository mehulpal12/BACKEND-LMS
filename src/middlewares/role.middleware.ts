import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError.js";
import prisma from "../db/index.js";

export const roleMiddleware = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.id;

    if (!userId) {
      return next(new ApiError(401, "Unauthorized"));
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    if (!allowedRoles.includes(user.role)) {
      return next(new ApiError(403, "Forbidden: Insufficient permissions"));
    }

    next();
  };
};
