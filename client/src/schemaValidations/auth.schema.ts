import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(26),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  name: z.string().min(3),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
