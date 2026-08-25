import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const icons = {
  "up-right": ArrowUpRight,
  down: ArrowDown,
  right: ArrowRight,
  up: ArrowUp,
} satisfies Record<string, LucideIcon>;

type IconName = keyof typeof icons;

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  icon?: IconName;
  variant?: "light" | "red" | "ink" | "text" | "text-dark";
  className?: string;
  onClick?: () => void;
};

export function CtaLink({
  href,
  children,
  icon = "up-right",
  variant = "light",
  className,
  onClick,
}: CtaLinkProps) {
  const Icon = icons[icon];
  const isText = variant === "text" || variant === "text-dark";

  return (
    <Link
      href={href}
      {...(onClick ? { onClick } : {})}
      className={cn(
        "inline-flex items-center no-underline transition-opacity duration-200 hover:opacity-80",
        isText
          ? "text-sm font-semibold"
          : "gap-7 px-[18px] py-[15px] font-meta text-[11px] font-medium tracking-[0.08em] uppercase",
        variant === "light" && "bg-white text-navy",
        variant === "red" && "bg-liberia text-white",
        variant === "ink" && "bg-ink px-[17px] py-[11px] text-white",
        variant === "text" && "text-white",
        variant === "text-dark" && "text-liberia",
        className,
      )}
    >
      {children}
      <Icon
        aria-hidden="true"
        className={cn(
          isText ? "ml-1.5 size-3.5" : "size-[19px]",
          variant === "ink" && "size-3.5",
        )}
      />
    </Link>
  );
}
