"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowUpRight, ImagePlus, Loader2, X } from "lucide-react";

import { FormField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function uploadWithProgress(
  formData: FormData,
  onProgress: (percent: number) => void,
): Promise<{ ok: boolean; data: unknown }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/gallery");
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () => {
      let data: unknown = null;
      try {
        data = JSON.parse(xhr.responseText);
      } catch {
        data = null;
      }
      resolve({ ok: xhr.status >= 200 && xhr.status < 300, data });
    };
    xhr.onerror = () => reject(new Error("Network error. Please try again."));
    xhr.send(formData);
  });
}

export function GalleryUploadForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file?.name ?? null);
    setPreviewUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return file ? URL.createObjectURL(file) : null;
    });
  };

  const resetFile = () => {
    setFileName(null);
    setPreviewUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return null;
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const file = formData.get("file");

    if (!(file instanceof File) || file.size === 0) {
      toast.error("Choose an image to upload");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);
    try {
      const { ok, data } = await uploadWithProgress(formData, setUploadProgress);
      if (!ok) {
        const message =
          data && typeof data === "object" && "error" in data
            ? String((data as { error: unknown }).error)
            : "Unable to upload image. Please try again.";
        throw new Error(message);
      }
      toast.success("Photo uploaded");
      formRef.current?.reset();
      resetFile();
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to upload image. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="flex flex-wrap items-center gap-6 border border-line bg-white p-6"
    >
      <div className="flex shrink-0 flex-col gap-2">
        <Label
          htmlFor="file"
          className="font-meta text-[10px] font-medium tracking-[0.12em] text-ink uppercase"
        >
          Image
        </Label>
        <div className="flex items-center gap-4">
          <div className="relative size-16 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
              className="size-full overflow-hidden border border-line bg-cream text-muted-copy transition-colors hover:border-ink disabled:pointer-events-none disabled:opacity-50"
            >
              {previewUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element -- local object URL, not an optimizable remote asset */
                <img src={previewUrl} alt="" className="size-full object-cover" />
              ) : (
                <ImagePlus aria-hidden="true" className="m-auto size-5" strokeWidth={1.5} />
              )}
            </button>
            {isSubmitting ? (
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-ink/70 px-1">
                <div className="h-1 w-4/5 overflow-hidden bg-white/25">
                  <div
                    className="h-full bg-liberia transition-[width]"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="font-meta text-[9px] text-white/90 tabular-nums">
                  {uploadProgress}%
                </p>
              </div>
            ) : null}
            {previewUrl && !isSubmitting ? (
              <button
                type="button"
                onClick={resetFile}
                aria-label="Remove selected photo"
                className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:bg-liberia hover:text-white"
              >
                <X aria-hidden="true" className="size-3" />
              </button>
            ) : null}
          </div>
          <div className="flex min-w-0 flex-col items-start gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
              className="rounded-none font-meta text-[10px] font-medium tracking-[0.08em] uppercase"
            >
              Choose photo
            </Button>
            <p className="max-w-[200px] truncate text-xs text-muted-copy">
              {fileName ?? "No file chosen"}
            </p>
          </div>
          <input
            ref={fileInputRef}
            id="file"
            name="file"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={onFileChange}
            disabled={isSubmitting}
            required
            className="sr-only"
          />
        </div>
      </div>
      <FormField id="caption" label="Caption" optional>
        <Input
          id="caption"
          name="caption"
          maxLength={200}
          disabled={isSubmitting}
          className="w-56"
        />
      </FormField>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-auto w-fit gap-3 rounded-none bg-ink px-[17px] py-[11px] font-meta text-[11px] font-medium tracking-[0.08em] text-white uppercase hover:bg-ink"
      >
        {isSubmitting ? "Uploading" : "Upload photo"}
        {isSubmitting ? (
          <Loader2 aria-hidden="true" className="size-3.5 animate-spin" />
        ) : (
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        )}
      </Button>
    </form>
  );
}
