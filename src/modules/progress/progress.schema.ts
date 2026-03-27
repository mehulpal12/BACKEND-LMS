import { z } from "zod";

export const upsertProgressSchema = z
  .object({
    lessonId: z.string(),
    completed: z.boolean(),
  })
  .strict();
