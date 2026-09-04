"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/list", label: "Overview" },
  { href: "/list/signups", label: "Signups" },
  { href: "/list/partners", label: "Partners" },
];

export function ListTabs() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Signups sections"
      className="mt-8 flex gap-6 border-b border-line"
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={`border-b-2 pb-3 font-meta text-[11px] font-medium tracking-[0.08em] uppercase no-underline transition-colors ${
              isActive
                ? "border-liberia text-ink"
                : "border-transparent text-muted-copy hover:text-ink"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
