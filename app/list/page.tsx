import type { Metadata } from "next";

import { ListSignOutButton } from "@/components/list-sign-out-button";
import {
  PartnershipInquiriesTable,
  RegistrationsTable,
} from "@/components/list-tables";
import {
  listPartnershipInquiries,
  listRegistrations,
  type PartnershipInquiryRow,
  type RegistrationRow,
} from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Signups",
  robots: { index: false, follow: false },
};

function hoursAgo(hours: number): number {
  return Date.now() - hours * 60 * 60 * 1000;
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border border-line bg-white px-5 py-4">
      <p className="font-meta text-[10px] font-medium tracking-[0.1em] text-muted-copy uppercase">
        {label}
      </p>
      <p className="mt-2 font-display text-[32px] leading-none font-semibold tracking-[-0.03em] text-ink">
        {value}
      </p>
    </div>
  );
}

function countRegisteredSince(registrations: RegistrationRow[], since: number): number {
  return registrations.filter(
    (row) => new Date(row.created_at).getTime() >= since,
  ).length;
}

function SummaryCards({
  registrations,
  partnershipInquiries,
  oneDayAgo,
}: {
  registrations: RegistrationRow[];
  partnershipInquiries: PartnershipInquiryRow[];
  oneDayAgo: number;
}) {
  const registeredToday = countRegisteredSince(registrations, oneDayAgo);
  const countriesRepresented = new Set(
    registrations.map((row) => row.country.trim().toLowerCase()),
  ).size;
  const accessibilityRequests = registrations.filter(
    (row) => row.accessibility_needs && row.accessibility_needs.trim().length > 0,
  ).length;

  return (
    <div className="grid grid-cols-5 gap-4 max-[900px]:grid-cols-3 max-[540px]:grid-cols-2">
      <StatCard label="Registrations" value={registrations.length} />
      <StatCard label="Last 24 hours" value={registeredToday} />
      <StatCard label="Partnership inquiries" value={partnershipInquiries.length} />
      <StatCard label="Countries represented" value={countriesRepresented} />
      <StatCard label="Accessibility requests" value={accessibilityRequests} />
    </div>
  );
}

export default async function ListPage() {
  let registrations: RegistrationRow[] = [];
  let partnershipInquiries: PartnershipInquiryRow[] = [];
  let loadError: string | null = null;

  try {
    [registrations, partnershipInquiries] = await Promise.all([
      listRegistrations(),
      listPartnershipInquiries(),
    ]);
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : "Failed to load signups.";
  }

  return (
    <main className="min-h-full bg-cream px-[5vw] py-[60px] text-ink">
      <div className="flex items-start justify-between gap-6">
        <h1 className="font-display text-[clamp(28px,3.4vw,40px)] font-semibold tracking-[-0.03em]">
          Signups
        </h1>
        <ListSignOutButton />
      </div>

      {loadError ? (
        <p className="mt-6 text-sm text-liberia">{loadError}</p>
      ) : (
        <div className="mt-10 flex flex-col gap-14">
          <SummaryCards
            registrations={registrations}
            partnershipInquiries={partnershipInquiries}
            oneDayAgo={hoursAgo(24)}
          />

          <section>
            <h2 className="mb-4 font-meta text-[11px] font-medium tracking-[0.1em] uppercase">
              Registrations ({registrations.length})
            </h2>
            <RegistrationsTable rows={registrations} />
          </section>

          <section>
            <h2 className="mb-4 font-meta text-[11px] font-medium tracking-[0.1em] uppercase">
              Partnership inquiries ({partnershipInquiries.length})
            </h2>
            <PartnershipInquiriesTable rows={partnershipInquiries} />
          </section>
        </div>
      )}
    </main>
  );
}
