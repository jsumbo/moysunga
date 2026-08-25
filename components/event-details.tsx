import type { ReactNode } from "react";
import { Syne } from "next/font/google";
import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { eventContent } from "@/lib/event-content";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const details = eventContent.details;

function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4 border-r border-ink/20 pr-8 max-[760px]:border-r-0 max-[760px]:border-b max-[760px]:pr-0 max-[760px]:pb-6">
      <span className="mt-1 flex size-11 shrink-0 items-center justify-center border border-ink/25 bg-ink text-highlight">
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
      </span>
      <div>
        <p className="text-[12px] font-semibold tracking-[0.2em] uppercase">
          {label}
        </p>
        <div className="mt-2 text-[clamp(22px,2.4vw,32px)] leading-[1.08] font-extrabold tracking-[-0.03em]">
          {children}
        </div>
      </div>
    </div>
  );
}

export function EventDetails() {
  const [weekday, date] = details.dateValue.split(", ");
  const [starts, ends] = details.timeValue.split(" - ");

  return (
    <section
      className={`${syne.className} bg-highlight px-[8.5vw] py-10 text-ink max-[760px]:px-[7vw] max-[760px]:py-8`}
      aria-label="Event details"
    >
      <div className="grid grid-cols-[1.1fr_1.15fr_1.25fr_auto] items-center gap-8 max-[760px]:grid-cols-1 max-[760px]:gap-0">
        <Detail icon={CalendarDays} label={details.dateLabel}>
          <span className="block">{weekday}</span>
          {date ? (
            <span className="block font-semibold whitespace-nowrap">
              {date}
            </span>
          ) : null}
        </Detail>
        <Detail icon={Clock} label={details.timeLabel}>
          <span className="block whitespace-nowrap">{starts}</span>
          {ends ? (
            <span className="block font-semibold whitespace-nowrap">
              {ends}
            </span>
          ) : null}
        </Detail>
        <Detail icon={MapPin} label={details.venueLabel}>
          <span className="block whitespace-nowrap">{details.venueValue}</span>
          <span className="block font-semibold whitespace-nowrap">
            {details.venueCity}
          </span>
        </Detail>
        <Link
          href={details.programmeHref}
          aria-label="View programme"
          className="inline-flex items-center justify-center gap-3 self-center bg-ink px-6 py-4 text-[15px] font-bold tracking-[0.08em] text-highlight no-underline uppercase transition-colors duration-200 hover:bg-liberia hover:text-white max-[760px]:mt-7 max-[760px]:w-full"
        >
          {details.programmeLabel}
          <ArrowRight aria-hidden="true" className="size-5" strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
}
