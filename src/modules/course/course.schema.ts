import { z } from "zod";

export const createCourseSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
    price: z.number().min(0, "Price cannot be negative").optional(),
  })
  .strict();

export const updateCourseSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters").optional(),
    description: z.string().min(10, "Description must be at least 10 characters").optional(),
    thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
    price: z.number().min(0, "Price cannot be negative").optional(),
  })
  .strict();
