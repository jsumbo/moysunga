"use client";

import { CircleCheck, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type SubmissionSuccessDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  body: string;
};

export function SubmissionSuccessDialog({
  open,
  onOpenChange,
  title,
  body,
}: SubmissionSuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="rounded-none bg-ink p-8 text-white ring-0 sm:max-w-md"
      >
        <DialogClose
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-3 right-3 text-white hover:bg-white/10 hover:text-white"
            />
          }
        >
          <X aria-hidden="true" className="size-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader className="gap-0">
          <CircleCheck
            aria-hidden="true"
            className="size-8 text-highlight"
            strokeWidth={1.5}
          />
          <p className="mt-5 font-meta text-[10px] font-medium tracking-[0.12em] text-highlight uppercase">
            Request received
          </p>
          <DialogTitle className="mt-[17px] mb-[21px] font-display text-[clamp(28px,3.4vw,38px)] leading-[0.98] font-semibold tracking-[-0.04em] text-white">
            {title}
          </DialogTitle>
          <DialogDescription className="text-base leading-[1.6] text-white/85">
            {body}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
