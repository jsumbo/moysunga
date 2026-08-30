import { ArrowUp } from "lucide-react";
import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";
import { eventContent } from "@/lib/event-content";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-cream text-ink">
      <div className="relative z-10 border-t border-line px-[8.5vw] pt-[60px] pb-[30px] max-[760px]:px-[7vw] max-[760px]:pt-10">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <BrandLockup />
          <a
            href="#top"
            className="inline-flex items-center gap-1 font-meta text-[10px] font-medium tracking-[0.08em] text-ink no-underline uppercase transition-opacity duration-200 hover:opacity-70"
          >
            {eventContent.footer.backToTop}
            <ArrowUp aria-hidden="true" className="size-3" />
          </a>
        </div>

        <nav
          aria-label="Footer"
          className="mt-[60px] flex flex-wrap items-center gap-x-10 gap-y-4 max-[760px]:mt-10"
        >
          <Link
            href={eventContent.registerCta.href}
            className="font-sans text-base font-medium text-ink underline decoration-1 underline-offset-4 transition-opacity duration-200 hover:opacity-70"
          >
            {eventContent.registerCta.label}
          </Link>
          <Link
            href={eventContent.partners.inquiryHref}
            className="font-sans text-base font-medium text-ink underline decoration-1 underline-offset-4 transition-opacity duration-200 hover:opacity-70"
          >
            {eventContent.partners.inquiryLabel}
          </Link>
          <a
            href={`mailto:${eventContent.footer.email}`}
            className="font-sans text-base font-medium text-ink underline decoration-1 underline-offset-4 transition-opacity duration-200 hover:opacity-70"
          >
            {eventContent.footer.email}
          </a>
        </nav>

        <p className="mt-[60px] max-w-[420px] text-xs leading-[1.45] text-muted-copy whitespace-pre-line max-[760px]:mt-10">
          {eventContent.footer.credit}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none -mt-[1vw] -mb-[3vw] w-full overflow-hidden select-none"
      >
        <p className="font-display text-[15vw] leading-none font-semibold tracking-[-0.03em] text-ink/8 whitespace-nowrap">
          {eventContent.footer.wordmark}
        </p>
      </div>
    </footer>
  );
}
