import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { isSameOrigin, jsonError, readJsonBody } from "@/lib/http";
import {
  checkCredentials,
  createSessionToken,
  LIST_SESSION_COOKIE,
} from "@/lib/list-auth";
import { getClientKey, rateLimit } from "@/lib/rate-limit";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return jsonError("Forbidden", 403);
  }

  const limited = rateLimit(getClientKey(request.headers), 10, 60_000);
  if (!limited.ok) {
    return jsonError("Too many attempts. Try again shortly.", 429);
  }

  const body = await readJsonBody(request);
  if (body instanceof NextResponse) {
    return body;
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError("Username and password are required", 400);
  }

  if (!checkCredentials(parsed.data.username, parsed.data.password)) {
    return jsonError("Invalid username or password", 401);
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(LIST_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(LIST_SESSION_COOKIE);
  return NextResponse.json({ success: true });
}
