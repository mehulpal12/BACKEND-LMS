import { z } from "zod";

export const createLessonSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    position: z.coerce.number().int().min(0, "Position must be 0 or greater"),
    courseId: z.string().uuid("Course ID must be a valid UUID"),
  })
  .strict();

export const updateLessonSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters").optional(),
    position: z.coerce.number().int().min(0, "Position must be 0 or greater").optional(),
  })
  .strict();
