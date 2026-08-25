import { ArrowUp } from "lucide-react";

import { BrandLockup } from "@/components/brand-lockup";
import { eventContent } from "@/lib/event-content";

export function SiteFooter() {
  return (
    <footer className="flex items-end justify-between bg-ink px-[8.5vw] py-[37px] text-white max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-[27px] max-[760px]:px-[7vw] max-[760px]:py-[35px]">
      <BrandLockup inverted className="max-[760px]:order-none" />
      <p className="m-0 text-xs leading-[1.45] text-white/70 whitespace-pre-line">
        {eventContent.footer.credit}
      </p>
      <a
        href="#top"
        className="inline-flex items-center gap-1 font-meta text-[10px] font-medium tracking-[0.08em] text-white no-underline uppercase transition-opacity duration-200 hover:opacity-80"
      >
        {eventContent.footer.backToTop}
        <ArrowUp aria-hidden="true" className="size-3" />
      </a>
    </footer>
  );
}
