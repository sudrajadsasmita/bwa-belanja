import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapZodError(error: ZodError): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  error.errors.forEach((err) => {
    const field = err.path[0] as string; // e.g. 'name', 'image'
    if (!errors[field]) {
      errors[field] = [];
    }
    errors[field].push(err.message);
  });

  return errors;
}
