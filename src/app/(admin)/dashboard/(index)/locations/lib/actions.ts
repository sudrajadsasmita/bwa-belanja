"use server";

import { schemaLocation } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma/prisma";
import { Location } from "@prisma/client";

export async function postLocation(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const validate = schemaLocation.safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }
  try {
    await prisma.location.create({
      data: {
        name: validate.data.name,
      },
    });
  } catch (error) {
    console.log(error);
    return redirect("/dashboard/locations/create");
  }
  return redirect("/dashboard/locations");
}

export async function getLocation(id: string): Promise<Location | null> {
  try {
    const locations = await prisma.location.findFirst({
      where: {
        id: Number(id),
      },
    });
    return locations;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateLocation(
  _: unknown,
  formData: FormData,
  id: number | undefined,
): Promise<ActionResult | undefined> {
  const validate = schemaLocation.safeParse({
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
    await prisma.location.update({
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
      error: "Failed to update locations",
    };
  }
  return redirect("/dashboard/locations");
}

export async function deleteLocation(
  _: unknown,
  formData: FormData,
  id: number,
): Promise<ActionResult> {
  try {
    await prisma.location.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete locations",
    };
  }
  return redirect("/dashboard/locations");
}
