import { CtaLink } from "@/components/cta-link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main
        id="main"
        className="flex flex-1 flex-col items-start justify-center bg-cream px-[8.5vw] py-[123px] max-[760px]:px-[7vw] max-[760px]:py-[77px]"
      >
        <div className="flex w-[34px] flex-col gap-[3px]">
          <span className="h-[10px] w-full bg-ink" />
          <span className="h-[10px] w-full bg-liberia" />
        </div>
        <p className="mt-6 font-meta text-[10px] font-medium tracking-[0.12em] uppercase">
          404 / Page not found
        </p>
        <h1 className="mt-4 mb-7 font-display text-[clamp(37px,6vw,88px)] leading-[0.94] font-semibold tracking-[-0.055em]">
          This page didn&rsquo;t make the programme.
        </h1>
        <p className="max-w-[480px] text-base leading-[1.6] text-copy">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
          Head back to the event overview to find your way.
        </p>
        <CtaLink href="/" variant="red" className="mt-9">
          Back to the event
        </CtaLink>
      </main>
      <SiteFooter />
    </>
  );
}
