"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowUpRight, Loader2 } from "lucide-react";

import { FormField } from "@/components/form-field";
import { SubmissionSuccessDialog } from "@/components/submission-success-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { eventContent } from "@/lib/event-content";
import { parseApiResponse } from "@/lib/http";
import {
  attendanceCategories,
  submissionResponseSchema,
  registrationSchema,
  type RegistrationInput,
} from "@/lib/schemas";
import { useState } from "react";

export function RegistrationForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const form = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      organization: "",
      role: "",
      country: "",
      attendanceCategory: "",
      accessibilityNeeds: "",
      consent: false,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const response = await fetch("/api/registrations", {
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
          : "Unable to submit registration. Please try again.";
      toast.error(message);
    }
  });

  const errors = form.formState.errors;

  return (
    <>
      <SubmissionSuccessDialog
        open={showSuccess}
        onOpenChange={setShowSuccess}
        title={eventContent.registerPage.successTitle}
        body={eventContent.registerPage.successBody}
      />
      <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          id="firstName"
          label="First name"
          error={errors.firstName?.message}
        >
          <Input
            id="firstName"
            autoComplete="given-name"
            aria-invalid={Boolean(errors.firstName)}
            {...form.register("firstName")}
          />
        </FormField>
        <FormField
          id="lastName"
          label="Last name"
          error={errors.lastName?.message}
        >
          <Input
            id="lastName"
            autoComplete="family-name"
            aria-invalid={Boolean(errors.lastName)}
            {...form.register("lastName")}
          />
        </FormField>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="email" label="Email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...form.register("email")}
          />
        </FormField>
        <FormField
          id="phone"
          label="Phone"
          error={errors.phone?.message}
        >
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            {...form.register("phone")}
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
        <FormField
          id="role"
          label="Role / title"
          error={errors.role?.message}
        >
          <Input
            id="role"
            autoComplete="organization-title"
            aria-invalid={Boolean(errors.role)}
            {...form.register("role")}
          />
        </FormField>
      </div>
      <FormField id="country" label="Country" error={errors.country?.message}>
        <Input
          id="country"
          autoComplete="country-name"
          aria-invalid={Boolean(errors.country)}
          {...form.register("country")}
        />
      </FormField>
      <FormField
        id="attendanceCategory"
        label="Attendance category"
        error={errors.attendanceCategory?.message}
      >
        <Controller
          control={form.control}
          name="attendanceCategory"
          render={({ field }) => (
            <Select
              value={field.value === "" ? null : field.value}
              onValueChange={(value) => {
                field.onChange(value ?? "");
              }}
            >
              <SelectTrigger
                id="attendanceCategory"
                className="w-full"
                aria-invalid={Boolean(errors.attendanceCategory)}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent align="start" alignItemWithTrigger={false}>
                {attendanceCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormField>
      <FormField
        id="accessibilityNeeds"
        label="Dietary / accessibility requirements"
        optional
        error={errors.accessibilityNeeds?.message}
      >
        <Textarea
          id="accessibilityNeeds"
          rows={4}
          aria-invalid={Boolean(errors.accessibilityNeeds)}
          {...form.register("accessibilityNeeds")}
        />
      </FormField>
      <div className="flex items-start gap-3">
        <Controller
          control={form.control}
          name="consent"
          render={({ field }) => (
            <Checkbox
              id="consent"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
              aria-invalid={Boolean(errors.consent)}
              className="mt-0.5 rounded-none"
            />
          )}
        />
        <label htmlFor="consent" className="text-sm leading-[1.5] text-copy">
          I understand that attendance is capacity-managed and that this request
          does not confirm a place until I receive confirmation.
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
        {form.formState.isSubmitting ? "Submitting" : "Submit registration"}
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
