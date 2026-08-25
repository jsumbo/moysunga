import { NextRequest, NextResponse } from "next/server";
import type { z } from "zod";

import { createConfirmationReference, type ConfirmationPrefix } from "@/lib/confirmation";
import {
  isSameOrigin,
  jsonError,
  readJsonBody,
} from "@/lib/http";
import { getClientKey, rateLimit } from "@/lib/rate-limit";

export async function handleMockSubmission<T extends z.ZodType>({
  request,
  schema,
  prefix,
  message,
}: {
  request: NextRequest;
  schema: T;
  prefix: ConfirmationPrefix;
  message: string;
}): Promise<NextResponse> {
  if (!isSameOrigin(request)) {
    return jsonError("Forbidden", 403);
  }

  const limited = rateLimit(getClientKey(request.headers));
  if (!limited.ok) {
    return jsonError("Too many requests", 429);
  }

  const body = await readJsonBody(request);
  if (body instanceof NextResponse) {
    return body;
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return jsonError("Validation failed", 400, parsed.error.flatten());
  }

  return NextResponse.json({
    success: true,
    reference: createConfirmationReference(prefix),
    message,
  });
}
