import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // if (!token) {
  return NextResponse.redirect(new URL("/dashboard/sign-in", request.url));
  // }
  // return NextResponse.next();
}
