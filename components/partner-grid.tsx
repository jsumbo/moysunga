import Image from "next/image";

import { CtaLink } from "@/components/cta-link";
import { eventContent } from "@/lib/event-content";
import type { PartnerLogo } from "@/lib/event-content";

const partners = eventContent.partners;
const poweredBy = partners.logos.filter((logo) => logo.group === "powered-by");
const partnerLogos = partners.logos.filter((logo) => logo.group === "partner");

function LogoTile({
  partner,
  large = false,
}: {
  partner: PartnerLogo;
  large?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center border-r border-b border-line px-2 text-center text-sm leading-[1.1] font-semibold tracking-[0.03em] ${
        large ? "min-h-[150px]" : "min-h-[119px]"
      }`}
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
          width={large ? 260 : 140}
          height={large ? 120 : 64}
          className={
            large
              ? "h-28 w-full max-w-[260px] object-contain"
              : "h-16 w-full max-w-[140px] object-contain"
          }
          unoptimized
        />
      )}
    </div>
  );
}

export function PartnerGrid() {
  return (
    <section
      id={partners.id}
      className="px-[8.5vw] pt-16 pb-16 max-[760px]:px-[7vw] max-[760px]:pt-12 max-[760px]:pb-12"
    >
      <h2 className="font-meta text-[10px] font-medium tracking-[0.12em] uppercase">
        {partners.label}
      </h2>
      <p className="mt-[13px] mb-10 max-w-[550px] text-base leading-[1.6] text-copy">
        {partners.body}
      </p>
      <div className="flex flex-wrap gap-x-16 gap-y-10">
        <div>
          <p className="mb-3 font-meta text-[10px] font-medium tracking-[0.1em] text-muted-copy uppercase">
            {partners.poweredByLabel}
          </p>
          <div
            className="grid w-[220px] grid-cols-1 border-t border-l border-line"
            aria-label={partners.poweredByLabel}
          >
            {poweredBy.map((partner) => (
              <LogoTile key={partner.slug} partner={partner} large />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 font-meta text-[10px] font-medium tracking-[0.1em] text-muted-copy uppercase">
            {partners.partnersLabel}
          </p>
          <div
            className="grid grid-cols-5 border-t border-l border-line max-[760px]:grid-cols-3"
            aria-label={partners.partnersLabel}
          >
            {partnerLogos.map((partner) => (
              <LogoTile key={partner.slug} partner={partner} />
            ))}
          </div>
        </div>
      </div>
      <CtaLink href={partners.inquiryHref} variant="text-dark" className="mt-10">
        {partners.inquiryLabel}
      </CtaLink>
    </section>
  );
}
