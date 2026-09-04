import { z } from "zod";

export const attendanceCategoryValues = [
  "un-agency-multilateral",
  "foundation-africa-focused",
  "government-diplomatic",
  "general-public",
  "liberian-diaspora",
] as const;

export const attendanceCategories = [
  {
    value: "un-agency-multilateral",
    label: "UN agency / multilateral",
  },
  {
    value: "foundation-africa-focused",
    label: "Foundation / Africa-focused organization",
  },
  {
    value: "government-diplomatic",
    label: "Government / diplomatic mission",
  },
  {
    value: "general-public",
    label: "General public",
  },
  {
    value: "liberian-diaspora",
    label: "Liberian diaspora",
  },
] as const;

const attendanceCategorySchema = z.enum(attendanceCategoryValues);

export function attendanceCategoryLabel(value: string): string {
  return (
    attendanceCategories.find((category) => category.value === value)
      ?.label ?? value
  );
}

const requiredName = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(80, `${label} must be 80 characters or fewer`);

const optionalNote = z
  .string()
  .trim()
  .max(1000, "Please keep this under 1,000 characters")
  .optional();

export const registrationSchema = z.object({
  firstName: requiredName("First name"),
  lastName: requiredName("Last name"),
  email: z.email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .max(40, "Phone number must be 40 characters or fewer")
    .regex(/^[+0-9() .\-]+$/, "Enter a valid phone number"),
  organization: z
    .string()
    .trim()
    .min(1, "Organization is required")
    .max(120, "Organization must be 120 characters or fewer"),
  role: z
    .string()
    .trim()
    .min(1, "Role or title is required")
    .max(120, "Role or title must be 120 characters or fewer"),
  country: z
    .string()
    .trim()
    .min(2, "Country is required")
    .max(80, "Country must be 80 characters or fewer"),
  attendanceCategory: z
    .string()
    .min(1, "Select an attendance category")
    .pipe(attendanceCategorySchema),
  accessibilityNeeds: optionalNote,
  consent: z.boolean().refine((value) => value, {
    message: "Consent is required to submit this request",
  }),
});

export const partnershipInquirySchema = z.object({
  name: requiredName("Name"),
  email: z.email("Enter a valid email address"),
  organization: z
    .string()
    .trim()
    .min(1, "Organization is required")
    .max(120, "Organization must be 120 characters or fewer"),
  role: z
    .string()
    .trim()
    .min(1, "Role or title is required")
    .max(120, "Role or title must be 120 characters or fewer"),
  message: z
    .string()
    .trim()
    .min(20, "Please share a little more about the partnership")
    .max(2000, "Please keep this under 2,000 characters"),
  consent: z.boolean().refine((value) => value, {
    message: "Consent is required to submit this inquiry",
  }),
});

export const submissionResponseSchema = z.object({
  success: z.literal(true),
  message: z.string().min(1),
});

export const apiErrorResponseSchema = z.object({
  error: z.string(),
  details: z.unknown().optional(),
});

export type RegistrationInput = z.input<typeof registrationSchema>;
export type RegistrationPayload = z.output<typeof registrationSchema>;
export type PartnershipInquiryInput = z.input<typeof partnershipInquirySchema>;
export type PartnershipInquiryPayload = z.output<
  typeof partnershipInquirySchema
>;
export type SubmissionResponse = z.output<typeof submissionResponseSchema>;
export type AttendanceCategory = z.output<typeof attendanceCategorySchema>;
