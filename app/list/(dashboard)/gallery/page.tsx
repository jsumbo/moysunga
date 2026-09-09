import type { Metadata } from "next";

import { GalleryImageGrid } from "@/components/gallery-image-grid";
import { GalleryUploadForm } from "@/components/gallery-upload-form";
import { listGalleryImages, type GalleryImageRow } from "@/lib/db";

export const metadata: Metadata = {
  title: "Gallery",
};

export default async function ListGalleryPage() {
  let images: GalleryImageRow[] = [];
  let loadError: string | null = null;

  try {
    images = await listGalleryImages();
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : "Failed to load photos.";
  }

  return (
    <div className="flex flex-col gap-8">
      <GalleryUploadForm />

      <section>
        <h2 className="mb-4 font-meta text-[11px] font-medium tracking-[0.1em] uppercase">
          Photos ({images.length})
        </h2>
        {loadError ? (
          <p className="text-sm text-liberia">{loadError}</p>
        ) : images.length === 0 ? (
          <p className="text-sm text-copy">No photos uploaded yet.</p>
        ) : (
          <GalleryImageGrid images={images} />
        )}
      </section>
    </div>
  );
}
