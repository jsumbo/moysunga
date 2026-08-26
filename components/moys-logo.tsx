import Image from "next/image";

import { cn } from "@/lib/utils";

type MoysLogoProps = {
  className?: string;
  priority?: boolean;
};

export function MoysLogo({ className, priority = false }: MoysLogoProps) {
  return (
    <Image
      src="/partners/Logo.png"
      alt=""
      width={268}
      height={263}
      className={cn("h-9 w-auto max-[760px]:h-7", className)}
      unoptimized
      {...(priority ? { priority: true } : {})}
    />
  );
}
