import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ListSignOutButton } from "@/components/list-sign-out-button";
import { ListTabs } from "@/components/list-tabs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    template: "%s | Signups",
    default: "Signups",
  },
  robots: { index: false, follow: false },
};

export default function ListDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-full bg-cream px-[5vw] py-[60px] text-ink">
      <div className="flex items-start justify-between gap-6">
        <h1 className="font-display text-[clamp(28px,3.4vw,40px)] font-semibold tracking-[-0.03em]">
          Signups
        </h1>
        <ListSignOutButton />
      </div>
      <ListTabs />
      <div className="mt-10">{children}</div>
    </main>
  );
}
