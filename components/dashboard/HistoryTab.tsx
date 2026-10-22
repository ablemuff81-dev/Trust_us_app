import {
  HistoryRow,
  type HistoryRowData,
  useHistory,
} from "@/components/dashboard/HistoryRow";
import { Button } from "@/components/ui/button";
import { useCategoryLabel } from "@/hooks/use-categories";
import { useLanguage } from "@/hooks/use-language";
import type { Expense } from "@/lib/expense-store";
import { startOfDay } from "@/lib/expense-store";
import { formatAriary, formatFullDay } from "@/lib/format";
import { useMemo } from "react";

/** Evaluated once at module load — React's purity rules forbid Date.now() in render. */
const TODAY = startOfDay(Date.now());

export type HistoryIncome = {
  localId: string;
  amount: number;
  description: string;
  source: string;
  /** Timestamp of the income (date + time of day). */
  date: number;
  updatedAt: number;
};

export function HistoryTab({
  expenses,
  incomes,
  onEditExpense,
  onAddExpense,
  onAddIncome,
}: {
  expenses: Expense[];
  incomes: HistoryIncome[];
  onEditExpense: (expense: Expense) => void;
  onAddExpense: () => void;
  onAddIncome: () => void;
}) {
  const { t, language } = useLanguage();
  const categoryLabel = useCategoryLabel();

  const events = useMemo<HistoryRowData[]>(() => {
    const rows: HistoryRowData[] = [];
    for (const expense of expenses) {
      rows.push({
        id: expense.localId,
        kind: "expense",
        date: startOfDay(expense.date),
        // The stored date is midnight; updatedAt carries the recording time,
        // which is what the HH:MM column should show.
        time: expense.updatedAt,
        label:
          expense.description.trim() || categoryLabel(expense.category),
        category: categoryLabel(expense.category),
        amount: expense.amount,
      });
    }
    for (const income of incomes) {
      rows.push({
        id: income.localId,
        kind: "income",
        date: startOfDay(income.date),
        time: income.date,
        label:
          income.description.trim() ||
          income.source.trim() ||
          t("history.incomeFallback"),
        category: income.source.trim() || t("history.incomeFallback"),
        amount: income.amount,
      });
    }
    return rows;
  }, [expenses, incomes, t, categoryLabel]);

  const sorted = useHistory(events);

  const groups = useMemo(() => {
    const byDay = new Map<number, HistoryRowData[]>();
    for (const row of sorted) {
      const bucket = byDay.get(row.date);
      if (bucket) bucket.push(row);
      else byDay.set(row.date, [row]);
    }
    return [...byDay.entries()].sort((a, b) => b[0] - a[0]);
  }, [sorted]);

  return (
    <section className="rounded-3xl border border-border bg-card p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1 text-left">
          <h2 className="text-lg font-semibold text-foreground">
            {t("history.title")}
          </h2>
          <p className="text-xs text-muted-foreground">
            {t("history.subtitle")}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5 border-border bg-background/60"
            onClick={onAddExpense}
          >
            <span className="text-sm leading-none">+</span>
            {t("history.addExpense")}
          </Button>
          <Button
            type="button"
            size="sm"
            className="gap-1.5 bg-bronze text-ink hover:bg-bronze/90"
            onClick={onAddIncome}
          >
            <span className="text-sm leading-none">+</span>
            {t("history.addIncome")}
          </Button>
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="rounded-xl border border-dotted border-border bg-card/50 p-6 text-center">
          <p className="text-sm font-medium text-foreground">
            {t("history.empty")}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("history.emptyHint")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {groups.map(([day, rows]) => {
            const dayIncome = rows
              .filter((row) => row.kind === "income")
              .reduce((sum, row) => sum + row.amount, 0);
            const dayExpense = rows
              .filter((row) => row.kind === "expense")
              .reduce((sum, row) => sum + row.amount, 0);
            return (
              <div
                key={day}
                className="rounded-2xl border border-border bg-background/50 p-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {TODAY === day
                      ? t("common.today")
                      : formatFullDay(day, language)}
                  </h3>
                  <p className="tabular text-[11px] text-muted-foreground">
                    {dayIncome > 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400">
                        +{formatAriary(dayIncome, language)}
                      </span>
                    ) : null}
                    {dayIncome > 0 && dayExpense > 0 ? " · " : null}
                    {dayExpense > 0 ? (
                      <span>−{formatAriary(dayExpense, language)}</span>
                    ) : null}
                  </p>
                </div>

                <div className="mt-2 space-y-1">
                  {rows.map((row) => (
                    <HistoryRow
                      key={row.id}
                      data={row}
                      onClick={
                        row.kind === "expense"
                          ? () => {
                              const expense = expenses.find(
                                (item) => item.localId === row.id,
                              );
                              if (expense) onEditExpense(expense);
                            }
                          : undefined
                      }
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {sorted.length > 0 ? (
        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          {t("history.count", { count: sorted.length })}
        </p>
      ) : null}
    </section>
  );
}
