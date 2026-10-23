import { useCallback, useEffect, useState } from "react";
import { createLocalId } from "@/lib/expense-store";

export type Income = {
  localId: string;
  amount: number;
  description: string;
  source: string;
  /** Timestamp of the income (date + time of day). */
  date: number;
  updatedAt: number;
};

export type IncomeDraft = {
  amount: number;
  description: string;
  source: string;
  date: number;
};

const STORAGE_KEY = "truste-us.incomes.v1";

function isValid(value: unknown): value is Income {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.localId === "string" &&
    typeof item.amount === "number" &&
    typeof item.description === "string" &&
    typeof item.source === "string" &&
    typeof item.date === "number"
  );
}

function readIncomes(): Income[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValid).map((item) => ({
      ...item,
      updatedAt:
        typeof item.updatedAt === "number" ? item.updatedAt : item.date,
    }));
  } catch {
    return [];
  }
}

/** Wipes the device copy of the incomes (used by "clear local data"). */
export function clearIncomesStore() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

function writeIncomes(incomes: Income[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(incomes));
  } catch {
    // storage unavailable
  }
}

/** Incomes live on this device first, like expenses. */
export function useIncomes() {
  const [incomes, setIncomes] = useState<Income[]>(readIncomes);

  useEffect(() => {
    writeIncomes(incomes);
  }, [incomes]);

  const addIncome = useCallback((draft: IncomeDraft) => {
    const now = Date.now();
    const income: Income = {
      localId: createLocalId(),
      amount: Math.round(draft.amount),
      description: draft.description.trim(),
      source: draft.source.trim(),
      date: draft.date,
      updatedAt: now,
    };
    setIncomes((current) =>
      [income, ...current].sort((a, b) => b.date - a.date),
    );
    return income;
  }, []);

  const deleteIncome = useCallback((localId: string) => {
    setIncomes((current) => current.filter((item) => item.localId !== localId));
  }, []);

  const clearIncomes = useCallback(() => {
    setIncomes([]);
    clearIncomesStore();
  }, []);

  return { incomes, addIncome, deleteIncome, clearIncomes };
}
