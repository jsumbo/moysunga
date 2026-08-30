import { neon } from "@neondatabase/serverless";

import type {
  PartnershipInquiryPayload,
  RegistrationPayload,
} from "@/lib/schemas";

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }
  return neon(databaseUrl);
}

export async function insertRegistration(
  data: RegistrationPayload,
  reference: string,
): Promise<void> {
  const sql = getSql();
  await sql`
    insert into registrations (
      reference, first_name, last_name, email, phone,
      organization, role, country, attendance_category, accessibility_needs
    ) values (
      ${reference}, ${data.firstName}, ${data.lastName}, ${data.email}, ${data.phone || null},
      ${data.organization}, ${data.role}, ${data.country}, ${data.attendanceCategory}, ${data.accessibilityNeeds || null}
    )
  `;
}

export async function insertPartnershipInquiry(
  data: PartnershipInquiryPayload,
  reference: string,
): Promise<void> {
  const sql = getSql();
  await sql`
    insert into partnership_inquiries (
      reference, name, email, organization, role, message
    ) values (
      ${reference}, ${data.name}, ${data.email}, ${data.organization}, ${data.role}, ${data.message}
    )
  `;
}

export type RegistrationRow = {
  id: string;
  reference: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  organization: string;
  role: string;
  country: string;
  attendance_category: string;
  accessibility_needs: string | null;
  created_at: string;
};

export type PartnershipInquiryRow = {
  id: string;
  reference: string;
  name: string;
  email: string;
  organization: string;
  role: string;
  message: string;
  created_at: string;
};

export async function listRegistrations(): Promise<RegistrationRow[]> {
  const sql = getSql();
  return (await sql`
    select * from registrations order by created_at desc
  `) as RegistrationRow[];
}

export async function listPartnershipInquiries(): Promise<
  PartnershipInquiryRow[]
> {
  const sql = getSql();
  return (await sql`
    select * from partnership_inquiries order by created_at desc
  `) as PartnershipInquiryRow[];
}
