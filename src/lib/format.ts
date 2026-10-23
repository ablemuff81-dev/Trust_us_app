import { LOCALES, type LanguageCode } from "./i18n";
import { startOfDay } from "./expense-store";

export function localeOf(language: LanguageCode): string {
  return LOCALES[language] ?? "en-GB";
}

/** `12345` -> `12 345 Ar` (grouping follows the active language). */
export function formatAriary(amount: number, language: LanguageCode = "en"): string {
  const value = Math.round(amount);
  return `${new Intl.NumberFormat(localeOf(language), {
    maximumFractionDigits: 0,
  }).format(value)} Ar`;
}

/** Short form for axis labels: `12 000` -> `12k`, `1 250 000` -> `1,3M`. */
export function formatCompact(amount: number, language: LanguageCode = "en"): string {
  const abs = Math.abs(amount);
  if (abs >= 1_000_000) {
    return `${new Intl.NumberFormat(localeOf(language), {
      maximumFractionDigits: 1,
    }).format(amount / 1_000_000)}M`;
  }
  if (abs >= 10_000) {
    return `${new Intl.NumberFormat(localeOf(language), {
      maximumFractionDigits: 0,
    }).format(amount / 1000)}k`;
  }
  return new Intl.NumberFormat(localeOf(language), {
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDay(date: number | Date, language: LanguageCode = "en"): string {
  return new Intl.DateTimeFormat(localeOf(language), {
    day: "numeric",
    month: "short",
  }).format(date);
}

export function formatFullDay(date: number | Date, language: LanguageCode = "en"): string {
  return new Intl.DateTimeFormat(localeOf(language), {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

export function formatMonth(date: number | Date, language: LanguageCode = "en"): string {
  return new Intl.DateTimeFormat(localeOf(language), {
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatMonthShort(date: number | Date, language: LanguageCode = "en"): string {
  return new Intl.DateTimeFormat(localeOf(language), { month: "short" }).format(date);
}

/** Input value for `<input type="date">`. */
export function toDateInput(date: number): string {
  const local = new Date(date);
  const month = `${local.getMonth() + 1}`.padStart(2, "0");
  const day = `${local.getDate()}`.padStart(2, "0");
  return `${local.getFullYear()}-${month}-${day}`;
}

export function fromDateInput(value: string): number {
  const [year, month, day] = value.split("-").map(Number);
  return startOfDay(new Date(year, (month ?? 1) - 1, day ?? 1));
}
