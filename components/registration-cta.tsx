import { CtaLink } from "@/components/cta-link";
import { VideoEmbed } from "@/components/video-embed";
import { eventContent } from "@/lib/event-content";

const registration = eventContent.registration;
const documentary = eventContent.documentary;

export function RegistrationCta() {
  return (
    <section
      id={registration.id}
      className="grid min-h-[555px] grid-cols-2 overflow-hidden bg-highlight max-[760px]:grid-cols-1"
    >
      <div className="flex flex-col justify-center bg-navy px-8 py-10 max-[760px]:px-[7vw] max-[760px]:py-8">
        <VideoEmbed youtubeId={documentary.youtubeId} title={documentary.title} />
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
