import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";
import dayjs from "dayjs";

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

export function rupiahFormatter(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(date: Date | null, format: string = "DD MM YYYY") {
  if (!date) {
    return dayjs().format(format);
  }
  return dayjs(date).format(format);
}
