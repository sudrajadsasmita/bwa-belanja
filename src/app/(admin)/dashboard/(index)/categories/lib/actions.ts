"use server";

import { schemaCategory } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma/prisma";
import { Category } from "@prisma/client";

export async function postCategory(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const validate = schemaCategory.safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }
  try {
    await prisma.category.create({
      data: {
        name: validate.data.name,
      },
    });
  } catch (error) {
    console.log(error);
    return redirect("/dashboard/categories/create");
  }
  return redirect("/dashboard/categories");
}

export async function getCategory(id: string): Promise<Category | null> {
  try {
    const category = await prisma.category.findFirst({
      where: {
        id: Number(id),
      },
    });
    return category;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateCategory(
  _: unknown,
  formData: FormData,
  id: number | undefined,
): Promise<ActionResult | undefined> {
  const validate = schemaCategory.safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  if (id === undefined) {
    return {
      error: "id is undefined",
    };
  }

  try {
    await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name: validate.data.name,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update category",
    };
  }
  return redirect("/dashboard/categories");
}

export async function deleteCategory(
  _: unknown,
  formData: FormData,
  id: number,
): Promise<ActionResult> {
  try {
    await prisma.category.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete category",
    };
  }
  return redirect("/dashboard/categories");
}
