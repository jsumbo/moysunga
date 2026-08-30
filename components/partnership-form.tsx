"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowUpRight, Loader2 } from "lucide-react";

import { FormField } from "@/components/form-field";
import { SubmissionSuccessDialog } from "@/components/submission-success-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { eventContent } from "@/lib/event-content";
import { parseApiResponse } from "@/lib/http";
import {
  submissionResponseSchema,
  partnershipInquirySchema,
  type PartnershipInquiryInput,
} from "@/lib/schemas";

export function PartnershipForm() {
  const [showSuccess, setShowSuccess] = useState(false);
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
      await parseApiResponse(response, submissionResponseSchema);
      setShowSuccess(true);
      form.reset();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to submit inquiry. Please try again.";
      toast.error(message);
    }
  });

  const errors = form.formState.errors;

  return (
    <>
      <SubmissionSuccessDialog
        open={showSuccess}
        onOpenChange={setShowSuccess}
        title={eventContent.partnersPage.successTitle}
        body={eventContent.partnersPage.successBody}
      />
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
        {form.formState.isSubmitting ? (
          <Loader2 aria-hidden="true" className="size-[19px] animate-spin" />
        ) : (
          <ArrowUpRight aria-hidden="true" className="size-[19px]" />
        )}
      </Button>
      </form>
    </>
  );
}
