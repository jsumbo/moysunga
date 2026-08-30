import {
  ogImageAlt,
  ogImageContentType,
  ogImageSize,
  renderEventOgImage,
} from "@/lib/og-image";

export const alt = ogImageAlt;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function TwitterImage() {
  return renderEventOgImage();
}
