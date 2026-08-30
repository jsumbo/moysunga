import type { LucideIcon } from "lucide-react";
import {
  HandCoins,
  Landmark,
  Network,
  Palette,
  Telescope,
  Trophy,
} from "lucide-react";

import { eventContent } from "@/lib/event-content";

const pathways = eventContent.pathways;

const pillarIcons: Record<
  (typeof pathways.pillars)[number]["number"],
  LucideIcon
> = {
  "01": Landmark,
  "02": Telescope,
  "03": Network,
  "04": Trophy,
  "05": Palette,
  "06": HandCoins,
};

export function PathwaysSection() {
  return (
    <section
      id={pathways.id}
      className="overflow-hidden bg-liberia px-[8.5vw] pt-[34px] pb-[100px] text-white max-[760px]:px-[7vw] max-[760px]:pt-[30px] max-[760px]:pb-[70px]"
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
        <div className="font-display text-[clamp(38px,7vw,88px)] leading-none font-medium tracking-[-0.06em] text-white max-[760px]:mt-9">
          {pathways.yearsStart}
          <span className="font-sans font-normal">—</span>
          {pathways.yearsEnd}
        </div>
      </div>
      <div className="mt-[81px] grid grid-cols-2 border-t border-l border-white/25 max-[760px]:mt-[52px] max-[760px]:grid-cols-1">
        {pathways.pillars.map((pillar) => {
          const Icon = pillarIcons[pillar.number];

          return (
            <article
              key={pillar.number}
              className="relative overflow-hidden border-r border-b border-white/25 px-[26px] pt-[28px] pb-10"
            >
              <Icon
                aria-hidden="true"
                className="pointer-events-none absolute -right-7 -bottom-10 size-[176px] text-white/18"
                strokeWidth={1}
              />
              <div className="relative">
                <span className="font-meta text-[10px] font-medium text-white">
                  {pillar.number}
                </span>
                <h3 className="mt-[18px] mb-1 font-display text-[24px] leading-[1.08] font-semibold tracking-[-0.03em]">
                  {pillar.title}
                </h3>
                {"subtitle" in pillar && pillar.subtitle ? (
                  <p className="font-display text-sm italic text-white/70">
                    {pillar.subtitle}
                  </p>
                ) : null}
                <p className="mt-4 max-w-[440px] text-[14px] leading-[1.6] text-white/85">
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
