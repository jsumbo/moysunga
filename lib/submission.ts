import { NextRequest, NextResponse } from "next/server";
import type { z } from "zod";

import { createConfirmationReference, type ConfirmationPrefix } from "@/lib/confirmation";
import {
  isSameOrigin,
  jsonError,
  readJsonBody,
} from "@/lib/http";
import { getClientKey, rateLimit } from "@/lib/rate-limit";

export async function handleSubmission<T extends z.ZodType>({
  request,
  schema,
  prefix,
  message,
  persist,
}: {
  request: NextRequest;
  schema: T;
  prefix: ConfirmationPrefix;
  message: string;
  persist: (data: z.output<T>, reference: string) => Promise<void>;
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

  const reference = createConfirmationReference(prefix);

  try {
    await persist(parsed.data, reference);
  } catch (error) {
    console.error("Failed to persist submission", error);
    return jsonError("Something went wrong. Please try again.", 500);
  }

  return NextResponse.json({
    success: true,
    message,
  });
}
