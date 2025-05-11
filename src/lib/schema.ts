import { StockProduct } from "@prisma/client";
import { z } from "zod";

export const ALLOW_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export const schemaSignIn = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const schemaCategory = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(4, { message: "Name must be at least 4 characters" }),
});

export const schemaLocation = schemaCategory.extend({});

export const schemaBrand = schemaCategory.extend({
  image: z
    .any()
    .refine((file: File) => ALLOW_MIME_TYPES.includes(file.type), {
      message: "File type not allowed",
    })
    .refine((file: File) => file.size <= 2 * 1024 * 1024, {
      message: "File size must be less than 2MB",
    })
    .refine((file: File) => file?.name, {
      message: "File is required",
    }),
});
export const schemaProduct = z.object({
  brandId: z.number().min(1, { message: "Brand is required" }),
  locationId: z.number().min(1, { message: "Location is required" }),
  categoryId: z.number().min(1, { message: "Category is required" }),
  name: z
    .string({ required_error: "Name is required" })
    .min(4, { message: "Name must be at least 4 characters" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(4, { message: "Description must be at least 4 characters" }),
  price: z
    .number({ required_error: "Price is required" })
    .min(1, { message: "Price must be at least 1" }),
  stock: z.nativeEnum(StockProduct, {
    required_error: "Stock is required",
    invalid_type_error: "Stock must be a number",
  }),
  images: z
    .array(
      z
        .instanceof(File)
        .refine((file) => ALLOW_MIME_TYPES.includes(file.type), {
          message: "File type not allowed",
        })
        .refine((file) => file.size <= 2 * 1024 * 1024, {
          message: "File size must be less than 2MB",
        })
        .refine((file) => file.name.length > 0, {
          message: "File is required",
        }),
    )
    .max(5, { message: "You can only upload up to 5 files" }), // batasi jumlah file maksimal 5
});
