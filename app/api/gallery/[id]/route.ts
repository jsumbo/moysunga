import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { deleteGalleryImage, getGalleryImage } from "@/lib/db";
import { isSameOrigin, jsonError } from "@/lib/http";
import { isValidSessionToken, LIST_SESSION_COOKIE } from "@/lib/list-auth";
import { deleteObject } from "@/lib/s3";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

  const { id } = await params;
  const image = await getGalleryImage(id);
  if (!image) {
    return jsonError("Not found", 404);
  }

  try {
    await deleteObject(bucket, image.s3_key);
    await deleteGalleryImage(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Failed to delete gallery image ${id}`, error);
    return jsonError("Unable to delete image. Please try again.", 500);
  }
}
