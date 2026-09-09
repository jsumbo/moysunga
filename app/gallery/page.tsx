import type { Metadata } from "next";
import Image from "next/image";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { listGalleryImages, type GalleryImageRow } from "@/lib/db";
import { eventContent } from "@/lib/event-content";

const page = eventContent.galleryPage;

export const metadata: Metadata = {
  title: "Gallery",
  description: page.intro,
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    url: "/gallery",
    title: "Gallery | Rooting & Rising",
    description: page.intro,
  },
  twitter: {
    title: "Gallery | Rooting & Rising",
    description: page.intro,
  },
};

export const revalidate = 0;

export default async function GalleryPage() {
  let images: GalleryImageRow[] = [];
  let loadError: string | null = null;

  try {
    images = await listGalleryImages();
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Failed to load photos.";
  }

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 bg-cream">
        <section className="px-[8.5vw] py-[123px] max-[760px]:px-[7vw] max-[760px]:py-[77px]">
          <h1 className="font-meta text-[10px] font-medium tracking-[0.12em] uppercase">
            {page.label}
          </h1>

          {loadError ? (
            <p className="mt-8 text-sm text-liberia">{loadError}</p>
          ) : images.length === 0 ? (
            <p className="mt-8 text-sm text-copy">{page.emptyState}</p>
          ) : (
            <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(420px,1fr))] gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-white"
                >
                  <Image
                    src={`/api/gallery/image/${image.s3_key}`}
                    alt={image.caption ?? "Rooting and Rising gallery photo"}
                    fill
                    sizes="(max-width: 540px) 100vw, (max-width: 1000px) 50vw, 33vw"
                    unoptimized
                    className="object-cover"
                  />
                  {image.caption ? (
                    <p className="absolute inset-x-0 bottom-0 bg-ink/70 px-3 py-2 text-xs leading-[1.4] text-white">
                      {image.caption}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
