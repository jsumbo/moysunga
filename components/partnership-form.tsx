"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";

import { ConfirmationPanel } from "@/components/confirmation-panel";
import { FormField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { eventContent } from "@/lib/event-content";
import { parseApiResponse } from "@/lib/http";
import {
  mockSubmissionResponseSchema,
  partnershipInquirySchema,
  type PartnershipInquiryInput,
} from "@/lib/schemas";

export function PartnershipForm() {
  const [reference, setReference] = useState<string | null>(null);
  const form = useForm<PartnershipInquiryInput>({
    resolver: zodResolver(partnershipInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      role: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const response = await fetch("/api/partnership-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await parseApiResponse(
        response,
        mockSubmissionResponseSchema,
      );
      setReference(data.reference);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to submit inquiry. Please try again.";
      toast.error(message);
    }
  });

  if (reference) {
    return (
      <ConfirmationPanel
        title={eventContent.partnersPage.successTitle}
        body={eventContent.partnersPage.successBody}
        reference={reference}
      />
    );
  }

  const errors = form.formState.errors;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="name" label="Name" error={errors.name?.message}>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...form.register("name")}
          />
        </FormField>
        <FormField id="email" label="Email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...form.register("email")}
          />
        </FormField>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          id="organization"
          label="Organization"
          error={errors.organization?.message}
        >
          <Input
            id="organization"
            autoComplete="organization"
            aria-invalid={Boolean(errors.organization)}
            {...form.register("organization")}
          />
        </FormField>
        <FormField id="role" label="Role / title" error={errors.role?.message}>
          <Input
            id="role"
            autoComplete="organization-title"
            aria-invalid={Boolean(errors.role)}
            {...form.register("role")}
          />
        </FormField>
      </div>
      <FormField
        id="message"
        label="How would you like to partner?"
        error={errors.message?.message}
      >
        <Textarea
          id="message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          {...form.register("message")}
        />
      </FormField>
      <div className="flex items-start gap-3">
        <Controller
          control={form.control}
          name="consent"
          render={({ field }) => (
            <Checkbox
              id="partnership-consent"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
              aria-invalid={Boolean(errors.consent)}
              className="mt-0.5 rounded-none"
            />
          )}
        />
        <label
          htmlFor="partnership-consent"
          className="text-sm leading-[1.5] text-copy"
        >
          I consent to being contacted about this inquiry.
        </label>
      </div>
      {errors.consent ? (
        <p role="alert" className="font-meta text-[10px] text-liberia">
          {errors.consent.message}
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="h-auto w-fit gap-7 rounded-none bg-liberia px-[18px] py-[15px] font-meta text-[11px] font-medium tracking-[0.08em] text-white uppercase hover:bg-liberia"
      >
        {form.formState.isSubmitting ? "Submitting" : "Submit inquiry"}
        <ArrowUpRight aria-hidden="true" className="size-[19px]" />
      </Button>
    </form>
  );
}
