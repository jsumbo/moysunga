"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { GalleryImageRow } from "@/lib/db";

export function GalleryImageGrid({ images }: { images: GalleryImageRow[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const onDelete = (id: string) => {
    toast("Delete this photo?", {
      description: "This can't be undone.",
      action: {
        label: "Delete",
        onClick: () => performDelete(id),
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };

  const performDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      const data: unknown = await response.json();
      if (!response.ok) {
        const message =
          data && typeof data === "object" && "error" in data
            ? String((data as { error: unknown }).error)
            : "Unable to delete photo. Please try again.";
        throw new Error(message);
      }
      toast.success("Photo deleted");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to delete photo. Please try again.";
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
      {images.map((image) => (
        <div
          key={image.id}
          className="group relative aspect-square w-full overflow-hidden border border-line bg-white"
        >
          <Image
            src={`/api/gallery/image/${image.s3_key}`}
            alt={image.caption ?? "Gallery photo"}
            fill
            sizes="(max-width: 540px) 50vw, (max-width: 900px) 33vw, 20vw"
            unoptimized
            className="object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon-sm"
            onClick={() => onDelete(image.id)}
            disabled={deletingId === image.id}
            aria-label="Delete photo"
            className="absolute top-2 right-2 rounded-none bg-ink/70 text-white opacity-0 transition-opacity hover:bg-liberia hover:text-white focus-visible:opacity-100 group-hover:opacity-100"
          >
            {deletingId === image.id ? (
              <Loader2 aria-hidden="true" className="size-3.5 animate-spin" />
            ) : (
              <Trash2 aria-hidden="true" className="size-3.5" />
            )}
          </Button>
        </div>
      ))}
    </div>
  );
}
