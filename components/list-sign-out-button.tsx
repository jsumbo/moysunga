"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function ListSignOutButton() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const onSignOut = async () => {
    setIsSigningOut(true);
    await fetch("/api/list-auth", { method: "DELETE" });
    router.push("/list/login");
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={onSignOut}
      disabled={isSigningOut}
      className="h-auto rounded-none px-4 py-2 font-meta text-[10px] font-medium tracking-[0.1em] uppercase"
    >
      {isSigningOut ? "Signing out" : "Sign out"}
    </Button>
  );
}
