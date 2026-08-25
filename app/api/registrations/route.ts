import { NextRequest, NextResponse } from "next/server";

import { handleMockSubmission } from "@/lib/mock-submission";
import { registrationSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  return handleMockSubmission({
    request,
    schema: registrationSchema,
    prefix: "RR",
    message:
      "Registration received. Confirmation is required and will follow if a place is available.",
  });
}

export function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}
