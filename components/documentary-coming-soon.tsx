import { Play } from "lucide-react";

import { eventContent } from "@/lib/event-content";

const documentary = eventContent.documentary;

export function DocumentaryComingSoon() {
  return (
    <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-5 overflow-hidden border border-white/15 bg-navy px-6">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_65%)]"
        aria-hidden="true"
      />
      <span className="relative flex size-14 items-center justify-center rounded-full bg-liberia">
        <Play
          aria-hidden="true"
          className="size-5 translate-x-0.5 fill-white text-white"
          strokeWidth={0}
        />
      </span>
      <div className="relative text-center">
        <p className="font-meta text-[10px] font-medium tracking-[0.14em] text-white/60 uppercase">
          {documentary.label}
        </p>
        <p className="mt-2 font-display text-xl leading-[1.1] font-semibold tracking-[-0.02em] text-white">
          {documentary.title}
        </p>
        <span className="mt-4 inline-block border border-white/25 px-3 py-[6px] font-meta text-[9px] font-medium tracking-[0.14em] text-white/80 uppercase">
          {documentary.placeholderLabel}
        </span>
      </div>
    </div>
  );
}
