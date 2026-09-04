import type { Metadata } from "next";

import { RegistrationsTable } from "@/components/list-tables";
import { listRegistrations, type RegistrationRow } from "@/lib/db";

export const metadata: Metadata = {
  title: "Registrations",
};

export default async function ListSignupsPage() {
  let registrations: RegistrationRow[] = [];
  let loadError: string | null = null;

  try {
    registrations = await listRegistrations();
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : "Failed to load registrations.";
  }

  if (loadError) {
    return <p className="text-sm text-liberia">{loadError}</p>;
  }

  return (
    <section>
      <h2 className="mb-4 font-meta text-[11px] font-medium tracking-[0.1em] uppercase">
        Registrations ({registrations.length})
      </h2>
      <RegistrationsTable rows={registrations} />
    </section>
  );
}
