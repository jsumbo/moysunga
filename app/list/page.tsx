import type { Metadata } from "next";

import { ListSignOutButton } from "@/components/list-sign-out-button";
import {
  listPartnershipInquiries,
  listRegistrations,
  type PartnershipInquiryRow,
  type RegistrationRow,
} from "@/lib/db";
import { attendanceCategoryLabel } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Signups",
  robots: { index: false, follow: false },
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/New_York",
});

function formatDate(value: string): string {
  return dateFormatter.format(new Date(value));
}

function RegistrationsTable({ rows }: { rows: RegistrationRow[] }) {
  if (rows.length === 0) {
    return <p className="text-sm text-copy">No registrations yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs tracking-[0.06em] text-muted-copy uppercase">
            <th className="py-2 pr-4">Submitted</th>
            <th className="py-2 pr-4">Name</th>
            <th className="py-2 pr-4">Email</th>
            <th className="py-2 pr-4">Phone</th>
            <th className="py-2 pr-4">Organization</th>
            <th className="py-2 pr-4">Role</th>
            <th className="py-2 pr-4">Country</th>
            <th className="py-2 pr-4">Category</th>
            <th className="py-2 pr-4">Accessibility notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-line/60 align-top">
              <td className="py-2 pr-4 whitespace-nowrap">
                {formatDate(row.created_at)}
              </td>
              <td className="py-2 pr-4 whitespace-nowrap">
                {row.first_name} {row.last_name}
              </td>
              <td className="py-2 pr-4">{row.email}</td>
              <td className="py-2 pr-4 whitespace-nowrap">
                {row.phone || "—"}
              </td>
              <td className="py-2 pr-4">{row.organization}</td>
              <td className="py-2 pr-4">{row.role}</td>
              <td className="py-2 pr-4 whitespace-nowrap">{row.country}</td>
              <td className="py-2 pr-4 whitespace-nowrap">
                {attendanceCategoryLabel(row.attendance_category)}
              </td>
              <td className="py-2 pr-4">{row.accessibility_needs || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PartnershipInquiriesTable({
  rows,
}: {
  rows: PartnershipInquiryRow[];
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-copy">No partnership inquiries yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs tracking-[0.06em] text-muted-copy uppercase">
            <th className="py-2 pr-4">Submitted</th>
            <th className="py-2 pr-4">Name</th>
            <th className="py-2 pr-4">Email</th>
            <th className="py-2 pr-4">Organization</th>
            <th className="py-2 pr-4">Role</th>
            <th className="py-2 pr-4">Message</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-line/60 align-top">
              <td className="py-2 pr-4 whitespace-nowrap">
                {formatDate(row.created_at)}
              </td>
              <td className="py-2 pr-4 whitespace-nowrap">{row.name}</td>
              <td className="py-2 pr-4">{row.email}</td>
              <td className="py-2 pr-4">{row.organization}</td>
              <td className="py-2 pr-4">{row.role}</td>
              <td className="py-2 pr-4 max-w-[360px] whitespace-pre-line">
                {row.message}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
