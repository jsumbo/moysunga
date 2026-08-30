import Image from "next/image";

import { eventContent } from "@/lib/event-content";

const programme = eventContent.programme;

export function Agenda() {
  return (
    <section
      id={programme.id}
      className="grid grid-cols-[34%_1fr] gap-[6vw] bg-white px-[8.5vw] py-[123px] max-[760px]:grid-cols-1 max-[760px]:gap-7 max-[760px]:px-[7vw] max-[760px]:py-[77px]"
    >
      <div className="flex flex-col">
        <h2 className="font-meta text-[10px] font-medium tracking-[0.12em] uppercase">
          {programme.label}
        </h2>
        <div className="relative mt-6 min-h-[420px] flex-1 overflow-hidden bg-cream max-[760px]:min-h-[320px]">
          <Image
            src="/image.png"
            alt="Panelist speaking into a microphone at a press briefing"
            fill
            className="object-cover object-center"
            sizes="(max-width: 760px) 86vw, 34vw"
          />
        </div>
      </div>
      <div className="border-t border-line">
        {programme.items.map((item) => (
          <div
            key={item.number}
            className="grid grid-cols-[80px_1fr_24px] gap-[18px] border-b border-line py-6"
          >
            <time className="font-meta text-xs font-medium text-liberia">
              {item.time}
            </time>
            <div>
              <h3 className="mb-[7px] font-display text-[21px] leading-none font-semibold tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="m-0 text-[13px] leading-[1.4] text-muted-copy">
                {item.detail}
              </p>
            </div>
            <span className="font-meta text-xs font-medium text-liberia">
              {item.number}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
