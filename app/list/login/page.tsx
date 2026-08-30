"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LockKeyhole } from "lucide-react";

import { FormField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ListLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/list-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data: unknown = await response.json().catch(() => null);
        const message =
          data && typeof data === "object" && "error" in data
            ? String((data as { error: unknown }).error)
            : "Unable to sign in. Please try again.";
        setError(message);
        setIsSubmitting(false);
        return;
      }

      router.push("/list");
    } catch {
      setError("Unable to sign in. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-full items-center justify-center bg-ink px-6 py-16">
      <div className="w-full max-w-sm bg-cream p-8">
        <LockKeyhole
          aria-hidden="true"
          className="size-7 text-liberia"
          strokeWidth={1.5}
        />
        <h1 className="mt-5 font-display text-[28px] font-semibold tracking-[-0.03em] text-ink">
          Signups
        </h1>
        <p className="mt-1 text-sm text-copy">
          Sign in to view registrations and partnership inquiries.
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-5">
          <FormField id="username" label="Username">
            <Input
              id="username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </FormField>
          <FormField id="password" label="Password">
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </FormField>

          {error ? (
            <p role="alert" className="font-meta text-[10px] text-liberia">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-auto w-full gap-2 rounded-none bg-liberia py-[13px] font-meta text-[11px] font-medium tracking-[0.08em] text-white uppercase hover:bg-liberia"
          >
            {isSubmitting ? "Signing in" : "Sign in"}
            {isSubmitting ? (
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            ) : null}
          </Button>
        </form>
      </div>
    </main>
  );
}
