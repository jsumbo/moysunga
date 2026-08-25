import Image from "next/image";

import { CtaLink } from "@/components/cta-link";
import { eventContent } from "@/lib/event-content";

const partners = eventContent.partners;

export function PartnerGrid() {
  return (
    <section
      id={partners.id}
      className="px-[8.5vw] pt-[123px] pb-[100px] max-[760px]:px-[7vw] max-[760px]:pt-[77px]"
    >
      <h2 className="font-meta text-[10px] font-medium tracking-[0.12em] uppercase">
        {partners.label}
      </h2>
      <p className="mt-[13px] mb-[57px] max-w-[550px] text-base leading-[1.6] text-copy">
        {partners.body}
      </p>
      <div
        className="grid grid-cols-6 border-t border-l border-line max-[760px]:grid-cols-3"
        aria-label="Convening partners"
      >
        {partners.logos.map((partner) => (
          <div
            key={partner.slug}
            className="flex min-h-[119px] flex-col items-center justify-center border-r border-b border-line px-2 text-center text-sm leading-[1.1] font-semibold tracking-[0.03em]"
          >
            {partner.isPlaceholder ? (
              <>
                <span className="whitespace-pre-line">{partner.primary}</span>
                {"secondary" in partner && partner.secondary ? (
                  <small className="mt-1 font-sans text-[8px] leading-[1.25] font-normal whitespace-pre-line">
                    {partner.secondary}
                  </small>
                ) : null}
                <span className="mt-2 font-meta text-[8px] font-medium tracking-[0.1em] text-[#75808e] uppercase">
                  Placeholder
                </span>
              </>
            ) : (
              <Image
                src={partner.src}
                alt={partner.name}
                width={140}
                height={64}
                className="h-16 w-full max-w-[140px] object-contain"
                unoptimized
              />
            )}
          </div>
        ))}
      </div>
      <p className="mt-[13px] font-meta text-[10px] font-medium tracking-[0.05em] text-[#75808e]">
        {partners.note}
      </p>
      <CtaLink href={partners.inquiryHref} variant="text-dark" className="mt-4">
        {partners.inquiryLabel}
      </CtaLink>
    </section>
  );
}
