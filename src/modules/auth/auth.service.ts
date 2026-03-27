import prisma from "../../db/index.js";
import { ApiError } from "../../utils/apiError.js";
import { comparePassword, hashPassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



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
      role: true,
      avatar: true,
      createdAt: true,
      enrollments: {
        include: {
          course: {
            include: {
              lessons: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
      progress: {
        select: {
          completed: true,
        },
      },
    },
  });

  return {
    user,
  };
};

export const googleLogin = async (idToken: string) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload || !payload.email) {
    throw new ApiError(400, "Invalid Google token");
  }

  const { email, name, picture } = payload;

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name: name || "Google User",
        avatar: picture,
      },
    });
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