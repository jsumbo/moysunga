import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ListSignOutButton } from "@/components/list-sign-out-button";
import { ListMobileNav, ListSidebarNav } from "@/components/list-tabs";

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
    <div className="flex min-h-full bg-cream text-ink max-[900px]:flex-col">
      <aside className="flex w-[220px] shrink-0 flex-col border-r border-line bg-white px-5 py-8 max-[900px]:hidden">
        <h1 className="px-4 font-display text-xl font-semibold tracking-[-0.02em]">
          Signups
        </h1>
        <div className="mt-8">
          <ListSidebarNav />
        </div>
        <div className="mt-auto px-4 pt-8">
          <ListSignOutButton />
        </div>
      </aside>

      <div className="min-[901px]:hidden">
        <div className="flex items-center justify-between px-[7vw] pt-[35px]">
          <h1 className="font-display text-[28px] font-semibold tracking-[-0.03em]">
            Signups
          </h1>
          <ListSignOutButton />
        </div>
        <div className="mt-6 px-[7vw]">
          <ListMobileNav />
        </div>
      </div>

      <main className="flex-1 px-[3vw] py-[60px] max-[900px]:px-[7vw] max-[900px]:py-8">
        {children}
      </main>
    </div>
  );
}
