import type { Metadata } from "next";

import { PartnershipForm } from "@/components/partnership-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { eventContent } from "@/lib/event-content";

const page = eventContent.partnersPage;

export const metadata: Metadata = {
  title: "Partners",
  description: page.caseStudy[0],
  alternates: {
    canonical: "/partners",
  },
  openGraph: {
    url: "/partners",
    title: "Partners | Rooting & Rising",
    description: page.caseStudy[0],
  },
  twitter: {
    title: "Partners | Rooting & Rising",
    description: page.caseStudy[0],
  },
};

export default function PartnersPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 bg-cream">
        <section className="grid gap-[6vw] px-[8.5vw] py-[123px] lg:grid-cols-[34%_1fr] max-[760px]:px-[7vw] max-[760px]:py-[77px]">
          <div>
            <p className="font-meta text-[10px] font-medium tracking-[0.12em] uppercase">
              {page.label}
            </p>
            <h1 className="mt-4 mb-7 font-display text-[clamp(37px,4.8vw,64px)] leading-[0.94] font-semibold tracking-[-0.055em]">
              {page.titleBefore}
              <br />
              <em className="italic font-semibold">{page.titleEmphasis}</em>
            </h1>
            <div className="max-w-[420px] space-y-4 text-base leading-[1.6] text-copy">
              {page.caseStudy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="border-t border-line pt-8">
            <PartnershipForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
