"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { BrandLockup } from "@/components/brand-lockup";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { eventContent } from "@/lib/event-content";
import { cn } from "@/lib/utils";

function NavLinks({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <>
      {eventContent.navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          {...(onNavigate ? { onClick: onNavigate } : {})}
          className={cn(
            "text-[13px] font-semibold text-ink no-underline transition-opacity duration-200 hover:opacity-70",
            className,
          )}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      id="top"
      className="relative z-50 flex h-[83px] items-center justify-between bg-cream px-[5.5vw] max-[760px]:h-[67px] max-[760px]:px-[6vw]"
    >
      <BrandLockup priority />

      <nav
        aria-label="Primary navigation"
        className="flex items-center gap-[27px] max-[760px]:hidden"
      >
        <NavLinks />
        <Link
          href={eventContent.registerCta.href}
          className="inline-flex items-center gap-2 bg-ink px-[17px] py-[11px] text-[13px] font-semibold text-white no-underline transition-opacity duration-200 hover:opacity-80"
        >
          {eventContent.registerCta.label}
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </Link>
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          className="hidden size-9 items-center justify-center border-0 bg-transparent text-ink max-[760px]:inline-flex"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? (
            <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
          ) : (
            <Menu aria-hidden="true" className="size-5" strokeWidth={1.75} />
          )}
        </SheetTrigger>
        <SheetContent
          side="top"
          showCloseButton={false}
          overlayClassName="top-[67px] bg-ink/20"
          className="gap-0 rounded-none border-x-0 border-t-0 border-b border-line bg-cream px-[6vw] py-5 shadow-none data-[side=top]:top-[67px]"
        >
          <SheetHeader className="sr-only p-0">
            <SheetTitle>Primary navigation</SheetTitle>
          </SheetHeader>
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col items-start gap-[19px]"
          >
            <NavLinks onNavigate={() => setOpen(false)} />
            <Link
              href={eventContent.registerCta.href}
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 bg-ink px-[17px] py-[11px] text-[13px] font-semibold text-white no-underline"
            >
              {eventContent.registerCta.label}
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
