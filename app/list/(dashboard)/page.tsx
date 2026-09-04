import {
  listPartnershipInquiries,
  listRegistrations,
  type PartnershipInquiryRow,
  type RegistrationRow,
} from "@/lib/db";
import { attendanceCategories } from "@/lib/schemas";

function hoursAgo(hours: number): number {
  return Date.now() - hours * 60 * 60 * 1000;
}

function getLastNDays(n: number): Date[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: n }, (_, i) => {
    const day = new Date(today);
    day.setDate(day.getDate() - (n - 1 - i));
    return day;
  });
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

function CategoryBreakdown({ registrations }: { registrations: RegistrationRow[] }) {
  const counts = attendanceCategories.map((category) => ({
    label: category.label,
    count: registrations.filter(
      (row) => row.attendance_category === category.value,
    ).length,
  }));
  const max = Math.max(1, ...counts.map((item) => item.count));

  return (
    <div className="border border-line bg-white p-6">
      <h3 className="font-meta text-[10px] font-medium tracking-[0.1em] text-muted-copy uppercase">
        Registrations by category
      </h3>
      <div className="mt-6 flex flex-col gap-3">
        {counts.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="w-[190px] shrink-0 text-xs text-copy">
              {item.label}
            </span>
            <div className="h-6 flex-1 bg-cream">
              <div
                className="h-6 rounded-r-[4px] bg-liberia"
                style={{ width: `${Math.max(4, (item.count / max) * 100)}%` }}
              />
            </div>
            <span className="w-6 shrink-0 text-right font-meta text-xs font-medium text-ink tabular-nums">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DailySignups({ registrations }: { registrations: RegistrationRow[] }) {
  const days = getLastNDays(14);
  const counts = days.map((day) => {
    const next = new Date(day);
    next.setDate(next.getDate() + 1);
    const count = registrations.filter((row) => {
      const t = new Date(row.created_at).getTime();
      return t >= day.getTime() && t < next.getTime();
    }).length;
    return { day, count };
  });
  const max = Math.max(1, ...counts.map((item) => item.count));

  return (
    <div className="border border-line bg-white p-6">
      <h3 className="font-meta text-[10px] font-medium tracking-[0.1em] text-muted-copy uppercase">
        Registrations, last 14 days
      </h3>
      <div className="mt-8 flex h-[140px] items-end gap-2">
        {counts.map(({ day, count }) => (
          <div
            key={day.toISOString()}
            className="flex flex-1 flex-col items-center gap-1.5"
          >
            <span className="font-meta text-[10px] font-medium text-ink tabular-nums">
              {count > 0 ? count : ""}
            </span>
            <div
              className="w-full max-w-6 rounded-t-[4px] bg-liberia"
              style={{
                height: `${count > 0 ? Math.max(6, (count / max) * 110) : 2}px`,
              }}
            />
            <span className="font-meta text-[9px] text-muted-copy">
              {day.getDate()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function ListOverviewPage() {
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

  if (loadError) {
    return <p className="text-sm text-liberia">{loadError}</p>;
  }

  return (
    <div className="flex flex-col gap-10">
      <SummaryCards
        registrations={registrations}
        partnershipInquiries={partnershipInquiries}
        oneDayAgo={hoursAgo(24)}
      />
      <div className="grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
        <CategoryBreakdown registrations={registrations} />
        <DailySignups registrations={registrations} />
      </div>
    </div>
  );
}
