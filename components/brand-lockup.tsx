import Link from "next/link";

import { MoysLogo } from "@/components/moys-logo";
import { cn } from "@/lib/utils";

type BrandLockupProps = {
  inverted?: boolean;
  priority?: boolean;
  className?: string;
};

export function BrandLockup({
  inverted = false,
  priority = false,
  className,
}: BrandLockupProps) {
  return (
    <Link
      href="/#top"
      aria-label="Ministry of Youth and Sports home"
      className={cn("inline-flex items-center no-underline", className)}
    >
      <MoysLogo
        {...(inverted ? { className: "h-8 max-[760px]:h-6" } : {})}
        {...(priority ? { priority: true } : {})}
      />
    </Link>
  );
}
