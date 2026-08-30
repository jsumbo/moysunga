import { NextResponse } from "next/server";

import { getPresignedDownloadUrl } from "@/lib/s3";

export function createS3DownloadRoute(keyEnvVar: string) {
  return async function GET() {
    const bucket = process.env.S3_BUCKET;
    const key = process.env[keyEnvVar];

    if (!bucket || !key) {
      return NextResponse.json(
        { error: "File is not configured" },
        { status: 503 },
      );
    }

    try {
      const url = await getPresignedDownloadUrl(bucket, key);
      return NextResponse.redirect(url);
    } catch (error) {
      console.error(`Failed to sign download URL for ${keyEnvVar}`, error);
      return NextResponse.json(
        { error: "Unable to load the file" },
        { status: 500 },
      );
    }
  };
}
