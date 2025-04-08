"use server";

import { schemaSignIn } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import prisma from "../../../../../../../lib/prisma/prisma";
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "@/lib/auth";

export async function SignIn(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  console.log(formData.get("email"));
  const validate = schemaSignIn.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    return { error: validate.error.errors[0].message };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
      type: "superadmin",
    },
  });
  if (!existingUser) {
    return { error: "User not found" };
  }

  const comparePassword = bcrypt.compareSync(
    validate.data.password,
    existingUser.password,
  );

  if (!comparePassword) {
    return { error: "Email/password incorrect..." };
  }

  const token = generateSessionToken();

  const { expiresAt } = await createSession(token, existingUser.id);

  setSessionTokenCookie(token, expiresAt);

  return redirect("/dashboard");
}
