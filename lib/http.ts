import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { apiErrorResponseSchema, mockSubmissionResponseSchema } from "@/lib/schemas";

export function jsonError(
  message: string,
  status: number,
  details?: unknown,
): NextResponse {
  return NextResponse.json(
    details === undefined ? { error: message } : { error: message, details },
    { status },
  );
}

export function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }

  return origin === request.nextUrl.origin;
}

export async function readJsonBody(
  request: NextRequest,
): Promise<unknown | NextResponse> {
  try {
    return await request.json();
  } catch {
    return jsonError("Invalid JSON payload", 400);
  }
}

export async function parseApiResponse<T extends z.ZodType>(
  response: Response,
  schema: T,
): Promise<z.output<T>> {
  const data: unknown = await response.json();

  if (!response.ok) {
    const parsedError = apiErrorResponseSchema.safeParse(data);
    const message = parsedError.success
      ? parsedError.data.error
      : "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return schema.parse(data);
}

export { mockSubmissionResponseSchema };
