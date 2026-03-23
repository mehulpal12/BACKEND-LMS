import prisma from "../../db/index.js";
import { ApiError } from "../../utils/apiError.js";

/**
 * Create or update progress for a user on a specific lesson.
 * Uses upsert so calling it twice just toggles the completed flag.
 */
export const upsertProgress = async (
  userId: string,
  lessonId: string,
  completed: boolean
) => {
  // Verify the lesson exists
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });

  if (!lesson) {
    throw new ApiError(404, "Lesson not found");
  }

  const progress = await prisma.progress.upsert({
    where: {
      userId_lessonId: { userId, lessonId },
    },
    update: { completed },
    create: { userId, lessonId, completed },
  });

  return { progress };
};

/**
 * Get progress for every lesson in a course for a specific user.
 */
export const getCourseProgress = async (userId: string, courseId: string) => {
  // Verify the course exists
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      lessons: {
        select: { id: true, title: true, position: true },
        orderBy: { position: "asc" },
      },
    },
  });

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  const lessonIds = course.lessons.map((l) => l.id);

  const progressRecords = await prisma.progress.findMany({
    where: {
      userId,
      lessonId: { in: lessonIds },
    },
  });

  // Map progress by lessonId for easy lookup
  const progressMap = new Map(
    progressRecords.map((p) => [p.lessonId, p.completed])
  );

  const lessons = course.lessons.map((lesson) => ({
    ...lesson,
    completed: progressMap.get(lesson.id) ?? false,
  }));

  const completedCount = lessons.filter((l) => l.completed).length;

  return {
    courseId,
    totalLessons: lessons.length,
    completedLessons: completedCount,
    progressPercent:
      lessons.length > 0
        ? Math.round((completedCount / lessons.length) * 100)
        : 0,
    lessons,
  };
};

/**
 * Get a single progress record for a user + lesson.
 */
export const getLessonProgress = async (userId: string, lessonId: string) => {
  const progress = await prisma.progress.findUnique({
    where: {
      userId_lessonId: { userId, lessonId },
    },
  });

  return { completed: progress?.completed ?? false };
};
