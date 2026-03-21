import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError.js";
import { verifyToken } from "../utils/jwt.js";
import { IJwtUserPayload } from "../types/index.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Unauthorized: No token provided or wrong format"));
}

  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(new ApiError(401, "Invalid token format"));
}

  try {
    const decoded = verifyToken(token);
    req.id = decoded.userId;
    next();
  } catch {
    next(new ApiError(401, "Invalid token"));
  }
};