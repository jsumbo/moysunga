import { NextRequest, NextResponse } from "next/server";

import { isValidSessionToken, LIST_SESSION_COOKIE } from "@/lib/list-auth";

export async function proxy(request: NextRequest) {
  const user = process.env.LIST_AUTH_USER;
  const pass = process.env.LIST_AUTH_PASSWORD;
  const secret = process.env.LIST_AUTH_SECRET;

  if (!user || !pass || !secret) {
    return new NextResponse("Admin access is not configured.", {
      status: 503,
    });
  }

  const token = request.cookies.get(LIST_SESSION_COOKIE)?.value;
  if (await isValidSessionToken(token)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/list/login", request.url));
}

export const config = {
  matcher: "/list",
};
