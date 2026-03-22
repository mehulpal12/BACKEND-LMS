import prisma from "../../db/index.js";
import { ApiError } from "../../utils/apiError.js";

export const createCourse = async (
  title: string,
  description: string,
  instructorId: string,
  thumbnail?: string,
  price?: number
) => {
  const course = await prisma.course.create({
    data: {
      title,
      description,
      instructorId,
      thumbnail,
      price,
    },
  });

  return { course };
};

export const getCourseById = async (courseId: string) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      instructor: {
        select: { id: true, name: true, email: true },
      },
      lessons: {
        orderBy: { position: "asc" },
      },
    },
  });

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  return { course };
};

export const updateCourse = async (
  courseId: string,
  userId: string,
  data: { title?: string; description?: string; thumbnail?: string; price?: number }
) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  if (course.instructorId !== userId) {
    throw new ApiError(403, "You can only update your own courses");
  }

  const updatedCourse = await prisma.course.update({
    where: { id: courseId },
    data,
  });

  return { course: updatedCourse };
};

export const deleteCourse = async (courseId: string, userId: string) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  if (course.instructorId !== userId) {
    throw new ApiError(403, "You can only delete your own courses");
  }

  await prisma.course.delete({
    where: { id: courseId },
  });

  return { message: "Course deleted successfully" };
};

export const getAllCourses = async () => {
  const courses = await prisma.course.findMany({
    include: {
      instructor: {
        select: { id: true, name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return { courses };
};
