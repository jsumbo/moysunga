import { NextRequest, NextResponse } from "next/server";

import { getObjectBytes } from "@/lib/s3";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string[] }> },
) {
  const { key: keyParts } = await params;
  const key = keyParts.join("/");

  if (!key.startsWith("gallery/")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const bucket = process.env.S3_BUCKET;
  if (!bucket) {
    return NextResponse.json(
      { error: "File storage is not configured" },
      { status: 503 },
    );
  }

  try {
    const { body, contentType } = await getObjectBytes(bucket, key);
    return new NextResponse(new Uint8Array(body), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error(`Failed to load gallery image ${key}`, error);
    return NextResponse.json(
      { error: "Unable to load image" },
      { status: 500 },
    );
  }
}
