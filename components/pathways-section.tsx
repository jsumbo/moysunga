import type { LucideIcon } from "lucide-react";
import { Briefcase, Dumbbell, HeartHandshake, Landmark } from "lucide-react";

import { eventContent } from "@/lib/event-content";

const pathways = eventContent.pathways;

const pillarIcons: Record<
  (typeof pathways.pillars)[number]["number"],
  LucideIcon
> = {
  "01": Briefcase,
  "02": Dumbbell,
  "03": Landmark,
  "04": HeartHandshake,
};

export function PathwaysSection() {
  return (
    <section
      id={pathways.id}
      className="overflow-hidden bg-liberia px-[8.5vw] pt-[34px] text-white max-[760px]:px-[7vw] max-[760px]:pt-[30px]"
    >
      <div className="pb-[83px]">
        <div className="font-meta text-[10px] font-medium tracking-[0.12em] uppercase">
          {pathways.label}
        </div>
      </div>
      <div className="flex items-end justify-between max-[760px]:mt-[50px] max-[760px]:block">
        <div>
          <h2 className="mb-[25px] font-display text-[clamp(37px,4.8vw,64px)] leading-[0.94] font-semibold tracking-[-0.055em]">
            {pathways.titleBefore}
            <br />
            <em className="italic font-semibold">{pathways.titleEmphasis}</em>{" "}
            {pathways.titleAfter}
          </h2>
          <p className="m-0 max-w-[550px] text-base leading-[1.6] text-white/85">
            {pathways.body}
          </p>
        </div>
        <div className="font-display text-[clamp(38px,7vw,88px)] leading-none font-medium tracking-[-0.06em] text-highlight max-[760px]:mt-9">
          {pathways.yearsStart}
          <span className="font-sans font-normal">—</span>
          {pathways.yearsEnd}
        </div>
      </div>
      <div className="mt-[81px] grid grid-cols-4 max-[760px]:mt-[52px] max-[760px]:grid-cols-2">
        {pathways.pillars.map((pillar) => {
          const Icon = pillarIcons[pillar.number];

          return (
            <article
              key={pillar.number}
              className="relative min-h-[215px] overflow-hidden border border-b-0 border-white/35 px-[22px] pt-[25px] pb-9 max-[760px]:min-h-[195px]"
            >
              <Icon
                aria-hidden="true"
                className="pointer-events-none absolute -right-7 -bottom-10 size-[176px] text-highlight/18 max-[760px]:-right-5 max-[760px]:-bottom-8 max-[760px]:size-[140px]"
                strokeWidth={1}
              />
              <div className="relative">
                <span className="font-meta text-[10px] font-medium text-highlight">
                  {pillar.number}
                </span>
                <h3 className="mt-[33px] mb-4 font-display text-[27px] leading-[0.96] font-semibold tracking-[-0.04em] whitespace-pre-line">
                  {pillar.title}
                </h3>
                <p className="m-0 text-[13px] leading-[1.4] text-white/80">
                  {pillar.body}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
