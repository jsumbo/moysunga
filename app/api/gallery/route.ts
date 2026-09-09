import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { insertGalleryImage } from "@/lib/db";
import { isSameOrigin, jsonError } from "@/lib/http";
import { isValidSessionToken, LIST_SESSION_COOKIE } from "@/lib/list-auth";
import { putObject } from "@/lib/s3";

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return jsonError("Forbidden", 403);
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(LIST_SESSION_COOKIE)?.value;
  if (!(await isValidSessionToken(token))) {
    return jsonError("Unauthorized", 401);
  }

  const bucket = process.env.S3_BUCKET;
  if (!bucket) {
    return jsonError("File storage is not configured", 503);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return jsonError("Invalid form data", 400);
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return jsonError("A file is required", 400);
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return jsonError("Only JPEG, PNG, WebP, or GIF images are allowed", 400);
  }
  if (file.size > MAX_FILE_BYTES) {
    return jsonError("Image must be 8MB or smaller", 400);
  }

  const captionValue = formData.get("caption");
  const caption =
    typeof captionValue === "string" && captionValue.trim().length > 0
      ? captionValue.trim().slice(0, 200)
      : null;

  const extension = file.type.split("/")[1] ?? "jpg";
  const key = `gallery/${crypto.randomUUID()}.${extension}`;

  try {
    const bytes = Buffer.from(await file.arrayBuffer());
    await putObject(bucket, key, bytes, file.type);
    const image = await insertGalleryImage({
      s3Key: key,
      contentType: file.type,
      caption,
    });
    return NextResponse.json({ success: true, image });
  } catch (error) {
    console.error("Failed to upload gallery image", error);
    return jsonError("Unable to upload image. Please try again.", 500);
  }
}

export function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}
