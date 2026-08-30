import { CtaLink } from "@/components/cta-link";
import { eventContent } from "@/lib/event-content";

const moment = eventContent.moment;

export function MomentSection() {
  return (
    <section
      id={moment.id}
      className="grid grid-cols-[1fr_minmax(240px,0.72fr)] items-start gap-[6vw] px-[8.5vw] py-[123px] max-[760px]:grid-cols-1 max-[760px]:gap-7 max-[760px]:px-[7vw] max-[760px]:py-[77px]"
    >
      <div>
        <p className="font-meta text-[10px] font-medium tracking-[0.12em] uppercase">
          {moment.label}
        </p>
        <h2 className="mt-4 mb-[29px] font-display text-[clamp(37px,4.8vw,64px)] leading-[0.94] font-semibold tracking-[-0.055em]">
          {moment.titleBefore}
          <br />
          <em className="italic font-semibold">{moment.titleEmphasis}</em>
        </h2>
        <p className="max-w-[640px] text-base leading-[1.6] text-copy">
          {moment.body}
        </p>
        <CtaLink
          href={moment.action.href}
          variant="text-dark"
          className="mt-[17px]"
        >
          {moment.action.label}
        </CtaLink>
      </div>
      <aside className="bg-ink px-[31px] py-[33px] text-white max-[760px]:mt-0">
        <span
          className="block font-display text-[60px] leading-[0.6] text-white"
          aria-hidden="true"
        >
          “
        </span>
        <p className="my-[17px] mb-[33px] font-display text-[22px] leading-[1.2] font-semibold">
          {moment.quote}
        </p>
        <span className="font-meta text-[9px] font-medium tracking-[0.12em] text-white/70">
          {moment.quoteSource}
        </span>
      </aside>
    </section>
  );
}
