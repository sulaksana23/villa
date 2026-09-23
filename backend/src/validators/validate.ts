import { z } from 'zod';

export function validate<T>(schema: z.ZodSchema<T>, body: unknown): T {
  const result = schema.safeParse(body);
  if (!result.success) {
    const error = new Error('Validasi gagal') as any;
    error.statusCode = 422;
    error.errors = result.error.flatten().fieldErrors;
    throw error;
  }
  return result.data;
}

export function validateQuery<T>(schema: z.ZodSchema<T>, query: unknown): T {
  const result = schema.safeParse(query);
  if (!result.success) {
    const error = new Error('Query parameter tidak valid') as any;
    error.statusCode = 422;
    error.errors = result.error.flatten().fieldErrors;
    throw error;
  }
  return result.data;
}
