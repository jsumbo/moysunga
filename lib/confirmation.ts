export type ConfirmationPrefix = "RR" | "PI";

export function createConfirmationReference(
  prefix: ConfirmationPrefix,
): string {
  const token = crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
  return `${prefix}-2026-${token}`;
}
