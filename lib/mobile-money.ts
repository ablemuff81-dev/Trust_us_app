/** Mobile money operators supported for sync, with brand accents. */

export type MobileMoneyId = "orange" | "airtel" | "mvola";

export type MobileMoneyLinks = Record<MobileMoneyId, boolean>;

export const MOBILE_MONEY_OPERATORS: Array<{
  id: MobileMoneyId;
  label: string;
  /** Brand accent used for the operator badge. */
  accent: string;
}> = [
  { id: "orange", label: "Orange Money", accent: "#FF7900" },
  { id: "airtel", label: "Airtel Money", accent: "#E4002B" },
  { id: "mvola", label: "MVola", accent: "#0054A6" },
];

const STORAGE_KEY = "truste-us.mobile-money.v1";

const DEFAULT_LINKS: MobileMoneyLinks = {
  orange: false,
  airtel: false,
  mvola: false,
};

export function readLinks(): MobileMoneyLinks {
  if (typeof window === "undefined") return DEFAULT_LINKS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_LINKS;
    const parsed = JSON.parse(raw) as Partial<MobileMoneyLinks>;
    return {
      orange: parsed.orange === true,
      airtel: parsed.airtel === true,
      mvola: parsed.mvola === true,
    };
  } catch {
    return DEFAULT_LINKS;
  }
}

export function writeLinks(links: MobileMoneyLinks) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  } catch {
    // storage unavailable
  }
}
