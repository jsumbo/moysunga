import type { Metadata } from "next";

import { ConceptNoteCard } from "@/components/concept-note-card";
import { RegistrationForm } from "@/components/registration-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { eventContent } from "@/lib/event-content";

const page = eventContent.registerPage;

export const metadata: Metadata = {
  title: "Register",
  description: page.intro,
  alternates: {
    canonical: "/register",
  },
  openGraph: {
    url: "/register",
    title: "Register | Rooting & Rising",
    description: page.intro,
  },
  twitter: {
    title: "Register | Rooting & Rising",
    description: page.intro,
  },
};

export default function RegisterPage() {
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
              for <em className="italic font-semibold">{page.titleEmphasis}</em>
            </h1>
            <p className="max-w-[420px] text-base leading-[1.6] text-copy">
              {page.intro}
            </p>
            <ConceptNoteCard />
          </div>
          <div className="border-t border-line pt-8">
            <RegistrationForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
