import prisma from "../../db/index.js";
import { ApiError } from "../../utils/apiError.js";
import cloudinary from "../../config/cloudinary.js";

export const createLesson = async (
  title: string,
  position: number,
  courseId: string,
  filePath: string
) => {
  // Verify the course exists
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // Upload video to Cloudinary
  const uploadResult = await cloudinary.uploader.upload(filePath, {
    resource_type: "video",
    folder: "main-course/lectures",
  });

  const lesson = await prisma.lesson.create({
    data: {
      title,
      position,
      courseId,
      videoUrl: uploadResult.secure_url,
    },
  });

  return { lesson };
};

export const getLessonById = async (lessonId: string) => {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      course: {
        select: { id: true, title: true },
      },
    },
  });

  if (!lesson) {
    throw new ApiError(404, "Lesson not found");
  }

  return { lesson };
};

export const getLessonsByCourse = async (courseId: string) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  const lessons = await prisma.lesson.findMany({
    where: { courseId },
    orderBy: { position: "asc" },
  });

  return { lessons };
};

export const updateLesson = async (
  lessonId: string,
  data: { title?: string; position?: number }
) => {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });

  if (!lesson) {
    throw new ApiError(404, "Lesson not found");
  }

  const updatedLesson = await prisma.lesson.update({
    where: { id: lessonId },
    data,
  });

  return { lesson: updatedLesson };
};

export const deleteLesson = async (lessonId: string) => {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });

  if (!lesson) {
    throw new ApiError(404, "Lesson not found");
  }

  // Extract Cloudinary public ID from the URL and delete the video
  const urlParts = lesson.videoUrl.split("/");
  const publicIdWithExt = urlParts.slice(-1)[0];
  const publicId = publicIdWithExt.split(".")[0];

  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
  } catch {
    // Log but don't block deletion if Cloudinary cleanup fails
    console.warn("Failed to delete video from Cloudinary:", publicId);
  }

  await prisma.lesson.delete({
    where: { id: lessonId },
  });

  return { message: "Lesson deleted successfully" };
};
