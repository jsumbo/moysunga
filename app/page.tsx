import { Agenda } from "@/components/agenda";
import { EventDetails } from "@/components/event-details";
import { EventHero } from "@/components/event-hero";
import { MomentSection } from "@/components/moment-section";
import { PartnerGrid } from "@/components/partner-grid";
import { PathwaysSection } from "@/components/pathways-section";
import { RegistrationCta } from "@/components/registration-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <EventHero />
        <EventDetails />
        <MomentSection />
        <PathwaysSection />
        <Agenda />
        <RegistrationCta />
        <PartnerGrid />
      </main>
      <SiteFooter />
    </>
  );
}
