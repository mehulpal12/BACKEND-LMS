import { z } from "zod";

export const upsertProgressSchema = z
  .object({
    lessonId: z.string().uuid("Lesson ID must be a valid UUID"),
    completed: z.boolean(),
  })
  .strict();
