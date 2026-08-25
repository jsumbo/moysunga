import { NextRequest, NextResponse } from "next/server";

import { handleMockSubmission } from "@/lib/mock-submission";
import { partnershipInquirySchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  return handleMockSubmission({
    request,
    schema: partnershipInquirySchema,
    prefix: "PI",
    message: "Partnership inquiry received. The convening team will follow up.",
  });
}

export function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}
