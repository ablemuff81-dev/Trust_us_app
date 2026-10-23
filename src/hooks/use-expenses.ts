import {
  budgetKey,
  clearStore,
  createLocalId,
  readBudgets,
  readStore,
  sortExpenses,
  writeBudgets,
  writeStore,
  type Expense,
  type ExpenseDraft,
} from "@/lib/expense-store";
import type { CategoryKey } from "@/lib/i18n";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Everything lives on this device, in localStorage only. There is no cloud
 * copy: a signed-in session no longer mirrors anything, the local store is
 * the single source of truth.
 */
export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(() => readStore().expenses);
  const [budgets, setBudgets] = useState<Record<string, number>>(() => readBudgets());

  const expensesRef = useRef<Expense[]>(expenses);
  const deletedRef = useRef<Record<string, number>>(readStore().deleted);

  useEffect(() => {
    expensesRef.current = expenses;
    writeStore({ expenses, deleted: deletedRef.current });
  }, [expenses]);

  const addExpense = useCallback((draft: ExpenseDraft) => {
    const now = Date.now();
    const expense: Expense = {
      localId: createLocalId(),
      amount: Math.round(draft.amount),
      description: draft.description.trim(),
      category: draft.category,
      date: draft.date,
      updatedAt: now,
    };
    setExpenses((current) => sortExpenses([expense, ...current]));
    return expense;
  }, []);

  const updateExpense = useCallback(
    (localId: string, draft: ExpenseDraft) => {
      const now = Date.now();
      const next = expensesRef.current.map((item) =>
        item.localId === localId
          ? {
              ...item,
              amount: Math.round(draft.amount),
              description: draft.description.trim(),
              category: draft.category,
              date: draft.date,
              updatedAt: now,
            }
          : item,
      );
      setExpenses(sortExpenses(next));
    },
    [],
  );

  const deleteExpenses = useCallback((localIds: string[]) => {
    if (localIds.length === 0) return;
    const targets = new Set(localIds);
    const now = Date.now();
    for (const id of localIds) {
      deletedRef.current[id] = now;
    }
    setExpenses((current) => current.filter((item) => !targets.has(item.localId)));
  }, []);

  const saveBudget = useCallback(
    (category: CategoryKey, amount: number, year: number, month: number) => {
      const key = budgetKey(year, month, category);
      setBudgets((current) => {
        const next = { ...current, [key]: Math.round(amount) };
        writeBudgets(next);
        return next;
      });
    },
    [],
  );

  const clearLocalData = useCallback(() => {
    deletedRef.current = {};
    setExpenses([]);
    setBudgets({});
    clearStore();
  }, []);

  const totalAll = useMemo(
    () => expenses.reduce((sum, item) => sum + item.amount, 0),
    [expenses],
  );

  return {
    expenses,
    totalAll,
    budgets,
    addExpense,
    updateExpense,
    deleteExpenses,
    saveBudget,
    clearLocalData,
  };
}
