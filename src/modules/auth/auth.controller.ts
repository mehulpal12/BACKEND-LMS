import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { loginUserSchema, registerUserSchema } from "./auth.schema.js";
import { getUserById, loginUser, registerUser, googleLogin as googleAuthLogin } from "./auth.service.js";
import { z } from "zod";


export const register = catchAsync(async (req: Request, res: Response) => {
  const data = registerUserSchema.parse(req.body);
  const result = await registerUser(data.name, data.email, data.password);
  return res.status(201).json({
    success: true,
    data: result,
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const data = loginUserSchema.parse(req.body);
  const result = await loginUser(data.email, data.password);
  return res.status(200).json({
    success: true,
    data: result,
  });
});

export const googleLogin = catchAsync(async (req: Request, res: Response) => {
  const { idToken } = z.object({ idToken: z.string() }).parse(req.body);
  const result = await googleAuthLogin(idToken);
  return res.status(200).json({
    success: true,
    data: result,
  });
});

export const getMe = catchAsync(async (req: Request, res: Response) => {
  const userId = req.id as string;
  const result = await getUserById(userId);
  return res.status(200).json({
    success: true,
    data: result,
  });
});