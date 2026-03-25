import prisma from "../../db/index.js";
import { ApiError } from "../../utils/apiError.js";
import { comparePassword, hashPassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";


export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = generateToken(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: token },
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      refreshToken: token,
    },
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordCorrect = await comparePassword(password, user.password!);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: token },
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      refreshToken: token,
    },
  };
};

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return {
    user,
  };
};