import { CtaLink } from "@/components/cta-link";
import { eventContent } from "@/lib/event-content";

const hero = eventContent.hero;

export function EventHero() {
  return (
    <section
      className="relative min-h-[640px] overflow-hidden bg-navy text-white max-[760px]:min-h-0"
      aria-labelledby="hero-title"
    >
      <div className="relative px-[8.5vw] pt-[25px] pb-[74px] max-[760px]:px-[7vw] max-[760px]:pt-[22px] max-[760px]:pb-[54px]">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:66px_66px]"
          aria-hidden="true"
        />
        <div className="relative mt-[91px] max-w-[765px] max-[760px]:mt-[78px]">
          <h1
            id="hero-title"
            className="font-display text-[clamp(48px,7vw,92px)] leading-[0.94] font-semibold tracking-[-0.055em] max-[760px]:text-[55px]"
          >
            <span className="block text-white">{hero.titleLead}</span>
            <span className="block text-liberia">{hero.titleHighlight}</span>
          </h1>
          <p className="mt-6 mb-7 border-l-2 border-accent pl-4 font-display text-lg leading-snug text-white/90 max-[760px]:text-base">
            {hero.eyebrow}
          </p>
          <div className="mt-[35px] flex flex-wrap items-center gap-6">
            <CtaLink href={hero.primaryAction.href} variant="light">
              {hero.primaryAction.label}
            </CtaLink>
            <CtaLink
              href={hero.secondaryAction.href}
              variant="text"
              icon="down"
            >
              {hero.secondaryAction.label}
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
