import { NextRequest, NextResponse } from "next/server";

import { insertRegistration } from "@/lib/db";
import { registrationSchema } from "@/lib/schemas";
import { handleSubmission } from "@/lib/submission";

export async function POST(request: NextRequest) {
  return handleSubmission({
    request,
    schema: registrationSchema,
    prefix: "RR",
    message:
      "Registration received. Confirmation is required and will follow if a place is available.",
    persist: (data, reference) => insertRegistration(data, reference),
  });
}

export function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}
