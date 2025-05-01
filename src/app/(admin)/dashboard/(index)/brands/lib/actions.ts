"use server";

import { ActionResult } from "@/types";
import prisma from "../../../../../../../lib/prisma/prisma";
import { redirect } from "next/navigation";
import { schemaBrand } from "@/lib/schema";
import { deleteFile, uploadFile } from "@/lib/supabase";
import { mapZodError } from "@/lib/utils";

export async function postBrand(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const name = formData.get("name")?.toString();
  const image = formData.get("image") as File;
  console.log(image);

  const validate = schemaBrand.safeParse({
    name,
    image,
  });
  if (!validate.success) {
    return {
      error: mapZodError(validate.error),
    };
  }

  try {
    const fileName = await uploadFile(validate.data.image, "brands");
    await prisma.brand.create({
      data: {
        name: validate.data.name,
        logo: fileName,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create category",
    };
  }
  return redirect("/dashboard/brands");
}

export async function getBrand(id: string) {
  try {
    const brand = await prisma.brand.findUnique({
      where: {
        id: Number(id),
      },
    });
    return brand;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export async function putBrand(
  _: unknown,
  formData: FormData,
  id: number | undefined,
): Promise<ActionResult> {
  const name = formData.get("name")?.toString();
  const image = formData.get("image") as File;
  let fileName: string = "";
  const validate = schemaBrand
    .pick({
      name: true,
    })
    .safeParse({
      name,
    });
  if (!validate.success) {
    return {
      error: mapZodError(validate.error),
    };
  }
  const brand = await prisma.brand.findUnique({
    where: {
      id: id,
    },
  });
  if (!brand) {
    return {
      error: "Brand not found",
    };
  }
  if (image.size > 0) {
    const deleteLogo = await deleteFile(brand.logo, "brands");
    if (deleteLogo.error) {
      return {
        error: "Failed to delete logo",
      };
    }
    fileName = await uploadFile(image, "brands");
  }
  try {
    await prisma.brand.update({
      where: {
        id: id,
      },
      data: {
        name: validate.data.name,
        logo: fileName !== "" ? fileName : brand.logo,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update category",
    };
  }
  return redirect("/dashboard/brands");
}

export async function deleteBrand(
  _: unknown,
  formData: FormData,
  id: number,
): Promise<ActionResult> {
  try {
    const brand = await prisma.brand.findUnique({
      where: {
        id: id,
      },
    });
    if (brand) {
      const deleteBrand = await prisma.brand.delete({
        where: {
          id: id,
        },
      });
      if (deleteBrand) {
        const deleteLogo = await deleteFile(brand.logo, "brands");
        if (deleteLogo.error) {
          return {
            error: "Failed to delete logo",
          };
        }
      }
    }
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete category",
    };
  }
  return redirect("/dashboard/brands");
}
