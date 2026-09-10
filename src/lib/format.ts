/** Formats a CMS price/rate value as "{CURRENCY} {amount}"; null if not a positive number. */
export function formatCurrencyAmount(
  value?: string | number,
  currency?: string,
): string | null {
  const numeric =
    typeof value === "number" ? value : Number(String(value ?? "").replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(numeric) || numeric <= 0) return null;

  // CMS `currency` values occasionally carry stray characters (e.g. "NPR`").
  const cleanCurrency = String(currency ?? "").replace(/[^A-Za-z]/g, "") || "NPR";
  return `${cleanCurrency} ${numeric.toLocaleString()}`;
}

/** Today's date in the viewer's local timezone as "YYYY-MM-DD" (matches `<input type="date">` value format). */
export function todayIso(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}
