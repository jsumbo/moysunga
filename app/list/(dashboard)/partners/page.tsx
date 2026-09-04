import type { Metadata } from "next";

import { PartnershipInquiriesTable } from "@/components/list-tables";
import { listPartnershipInquiries, type PartnershipInquiryRow } from "@/lib/db";

export const metadata: Metadata = {
  title: "Partners",
};

export default async function ListPartnersPage() {
  let partnershipInquiries: PartnershipInquiryRow[] = [];
  let loadError: string | null = null;

  try {
    partnershipInquiries = await listPartnershipInquiries();
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : "Failed to load partnership inquiries.";
  }

  if (loadError) {
    return <p className="text-sm text-liberia">{loadError}</p>;
  }

  return (
    <section>
      <h2 className="mb-4 font-meta text-[11px] font-medium tracking-[0.1em] uppercase">
        Partnership inquiries ({partnershipInquiries.length})
      </h2>
      <PartnershipInquiriesTable rows={partnershipInquiries} />
    </section>
  );
}
