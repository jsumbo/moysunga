import { NextRequest, NextResponse } from "next/server";

import { insertPartnershipInquiry } from "@/lib/db";
import { partnershipInquirySchema } from "@/lib/schemas";
import { handleSubmission } from "@/lib/submission";

export async function POST(request: NextRequest) {
  return handleSubmission({
    request,
    schema: partnershipInquirySchema,
    prefix: "PI",
    message: "Partnership inquiry received. The convening team will follow up.",
    persist: (data, reference) => insertPartnershipInquiry(data, reference),
  });
}

export function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}
