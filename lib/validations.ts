import * as z from "zod";

export const TeamSchema = z.object({
  name: z.string().min(5).max(50),
  description: z.string().min(20).max(100),
  church: z.string().min(5).max(50),
  photo: z.instanceof(File).optional(),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});
