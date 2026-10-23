import type { CategoryKey } from "./i18n";

export type Expense = {
  /** Client generated id, also used as the sync key with the server. */
  localId: string;
  amount: number;
  description: string;
  category: CategoryKey;
  /** Local midnight timestamp of the day the expense belongs to. */
  date: number;
  updatedAt: number;
};

export type ExpenseDraft = {
  amount: number;
  description: string;
  category: CategoryKey;
  date: number;
};

export type Budget = {
  category: CategoryKey;
  amount: number;
};

type Store = {
  expenses: Expense[];
  /** localIds deleted on this device, so a merge cannot resurrect them. */
  deleted: Record<string, number>;
};

const STORE_KEY = "truste-us.store.v1";

const EMPTY: Store = { expenses: [], deleted: {} };

export function createLocalId(): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `exp_${Date.now().toString(36)}_${random}`;
}

function isExpense(value: unknown): value is Expense {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.localId === "string" &&
    typeof candidate.amount === "number" &&
    typeof candidate.description === "string" &&
    typeof candidate.category === "string" &&
    typeof candidate.date === "number"
  );
}

export function readStore(): Store {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Store>;
    return {
      expenses: Array.isArray(parsed.expenses)
        ? parsed.expenses.filter(isExpense).map((item) => ({
            ...item,
            updatedAt: typeof item.updatedAt === "number" ? item.updatedAt : item.date,
          }))
        : [],
      deleted:
        parsed.deleted && typeof parsed.deleted === "object" ? parsed.deleted : {},
    };
  } catch {
    return EMPTY;
  }
}

export function writeStore(store: Store) {
  if (typeof window === "undefined") return;
  try {
    // Keep the tombstone list short: it only protects recent deletions.
    const tombstones = Object.entries(store.deleted)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 300);
    window.localStorage.setItem(
      STORE_KEY,
      JSON.stringify({
        expenses: store.expenses,
        deleted: Object.fromEntries(tombstones),
      }),
    );
  } catch {
    // Storage full or unavailable: the in-memory state still works.
  }
}

export function clearStore() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORE_KEY);
    window.localStorage.removeItem(BUDGET_KEY);
  } catch {
    // ignore
  }
}

const BUDGET_KEY = "truste-us.budgets.v1";

/** Budgets are stored as `year-month-category` -> amount (in MGA). */
export function budgetKey(year: number, month: number, category: string) {
  return `${year}-${month}-${category}`;
}

export function readBudgets(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(BUDGET_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const result: Record<string, number> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "number") result[key] = value;
    }
    return result;
  } catch {
    return {};
  }
}

export function writeBudgets(budgets: Record<string, number>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(BUDGET_KEY, JSON.stringify(budgets));
  } catch {
    // ignore
  }
}

export function startOfDay(value: number | Date): number {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

export function dayKey(value: number | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function keyToDate(key: string): Date {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

export function sortExpenses(items: Expense[]): Expense[] {
  return [...items].sort((a, b) => b.date - a.date || b.updatedAt - a.updatedAt);
}

export type ExpenseMap = Map<string, Expense>;

export function toMap(items: Expense[]): ExpenseMap {
  const map: ExpenseMap = new Map();
  for (const item of items) {
    const current = map.get(item.localId);
    if (!current || item.updatedAt > current.updatedAt) {
      map.set(item.localId, item);
    }
  }
  return map;
}

/**
 * Union of the local and remote expenses, newest version winning for each id.
 * Remote records that were deleted on this device are reported separately so
 * the caller can delete them server side.
 */
export function mergeExpenses(
  local: Expense[],
  remote: Expense[],
  deleted: Record<string, number>,
): { merged: Expense[]; toPush: Expense[]; toDeleteRemote: string[] } {
  const merged = toMap(local);
  const remoteMap = toMap(remote);
  const toPush: Expense[] = [];

  // A local deletion always wins, on both sides of the merge.
  for (const localId of Object.keys(deleted)) {
    merged.delete(localId);
  }

  for (const item of local) {
    if (deleted[item.localId] !== undefined) continue;
    const remoteItem = remoteMap.get(item.localId);
    if (!remoteItem || item.updatedAt > remoteItem.updatedAt) {
      toPush.push(item);
    }
  }

  for (const item of remote) {
    if (deleted[item.localId] !== undefined) continue;
    const current = merged.get(item.localId);
    if (!current || item.updatedAt >= current.updatedAt) {
      merged.set(item.localId, item);
    }
  }

  const toDeleteRemote = Object.keys(deleted).filter((id) => remoteMap.has(id));

  return { merged: sortExpenses([...merged.values()]), toPush, toDeleteRemote };
}

export function totalOf(items: Expense[]): number {
  return items.reduce((sum, item) => sum + item.amount, 0);
}

export function groupByDay(items: Expense[]): Map<string, Expense[]> {
  const groups: Map<string, Expense[]> = new Map();
  for (const item of sortExpenses(items)) {
    const key = dayKey(item.date);
    const bucket = groups.get(key);
    if (bucket) bucket.push(item);
    else groups.set(key, [item]);
  }
  return groups;
}

export function sumByCategory(items: Expense[]): Map<CategoryKey, number> {
  const totals: Map<CategoryKey, number> = new Map();
  for (const item of items) {
    totals.set(item.category, (totals.get(item.category) ?? 0) + item.amount);
  }
  return totals;
}
