import Image from "next/image";

import { CtaLink } from "@/components/cta-link";
import { eventContent } from "@/lib/event-content";

const registration = eventContent.registration;

export function RegistrationCta() {
  return (
    <section
      id={registration.id}
      className="grid min-h-[555px] grid-cols-2 overflow-hidden bg-highlight max-[760px]:grid-cols-1"
    >
      <div className="relative min-h-[430px] overflow-hidden bg-navy max-[760px]:min-h-[300px]">
        <Image
          src="/photo-1.jpg"
          alt="Young woman looking at a smartphone"
          fill
          className="object-cover object-center"
          sizes="(max-width: 760px) 100vw, 50vw"
        />
      </div>
      <div className="px-[10%] py-[85px] max-[760px]:px-[7vw] max-[760px]:py-[65px]">
        <p className="font-meta text-[11px] font-medium tracking-[0.1em] uppercase">
          {registration.eyebrow}
        </p>
        <h2 className="mt-[17px] mb-[29px] font-display text-[clamp(37px,4.8vw,64px)] leading-[0.94] font-semibold tracking-[-0.055em]">
          {registration.titleBefore}
          <br />
          for <em className="italic font-semibold">{registration.titleEmphasis}</em>
        </h2>
        <p className="max-w-[420px] text-base leading-[1.6] text-[#425349]">
          {registration.body}
        </p>
        <CtaLink
          href="/register"
          variant="red"
          className="mt-5"
        >
          {registration.actionLabel}
        </CtaLink>
        <small className="mt-[18px] block text-[10px] text-[#506052]">
          {registration.supportingText}
        </small>
      </div>
    </section>
  );
}
