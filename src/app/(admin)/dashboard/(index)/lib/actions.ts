"use server";

import { invalidateSession, validateSessionToken } from "@/lib/auth";
import { ActionResult } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function LogOut(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const cookie = await cookies();
  const token = cookie.get("session");
  if (!token) {
    return { error: "Unauthorized" };
  }
  const { session, user } = await validateSessionToken(token.value);
  if (!session) {
    return { error: "Unauthorized" };
  }
  await invalidateSession(session.id);
  cookie.delete("session");
  return redirect("/dashboard/sign-in");
}
