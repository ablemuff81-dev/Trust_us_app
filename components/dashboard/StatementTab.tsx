import { CategoryMark, CATEGORY_BARS } from "@/components/CategoryMark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategoryLabel } from "@/hooks/use-categories";
import { useLanguage } from "@/hooks/use-language";
import type { LanguageCode } from "@/lib/i18n";
import type { Income } from "@/hooks/use-incomes";
import {
  dayKey,
  groupByDay,
  totalOf,
  type Expense,
} from "@/lib/expense-store";
import { formatAriary, formatCompact, formatDay, formatMonth } from "@/lib/format";
import { CATEGORIES, type CategoryKey } from "@/lib/i18n";
import { ChevronLeft, ChevronRight, TrendingUp, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

function budgetKeyOf(year: number, month: number, category: string) {
  return `${year}-${month}-${category}`;
}

function timeOf(timestamp: number): string {
  const date = new Date(timestamp);
  return `${`${date.getHours()}`.padStart(2, "0")}:${`${date.getMinutes()}`.padStart(2, "0")}`;
}

type HistoryEntry = {
  id: string;
  kind: "expense" | "income";
  date: number;
  /** Exact timestamp used to order entries recorded on the same day. */
  time: number;
  label: string;
  sub: string;
  amount: number;
  expense?: Expense;
};

export function StatementTab({
  expenses,
  incomes,
  budgets,
  onSaveBudget,
  onEdit,
}: {
  expenses: Expense[];
  incomes: Income[];
  budgets: Record<string, number>;
  onSaveBudget: (category: CategoryKey, amount: number, year: number, month: number) => void;
  onEdit: (expense: Expense) => void;
}) {
  const { t, language } = useLanguage();
  const categoryLabel = useCategoryLabel();
  const [cursor, setCursor] = useState(() => new Date());

  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  const period = useMemo(() => {
    const start = new Date(year, month, 1).getTime();
    const end = new Date(year, month + 1, 1).getTime();
    return expenses
      .filter((item) => item.date >= start && item.date < end)
      .sort((a, b) => b.date - a.date);
  }, [expenses, year, month]);

  const periodIncomes = useMemo(() => {
    const start = new Date(year, month, 1).getTime();
    const end = new Date(year, month + 1, 1).getTime();
    return incomes
      .filter((item) => item.date >= start && item.date < end)
      .sort((a, b) => b.date - a.date);
  }, [incomes, year, month]);

  const total = totalOf(period);
  const totalIncome = periodIncomes.reduce((sum, item) => sum + item.amount, 0);
  const net = totalIncome - total;
  const activeDays = groupByDay(period).size;
  const average = activeDays > 0 ? total / activeDays : 0;

  const categoryTotals = useMemo(() => {
    const map = new Map<CategoryKey, number>();
    for (const item of period) {
      map.set(item.category, (map.get(item.category) ?? 0) + item.amount);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [period]);

  const monthBudget = CATEGORIES.reduce(
    (sum, category) => sum + (budgets[budgetKeyOf(year, month + 1, category)] ?? 0),
    0,
  );
  const budgetLeft = monthBudget - total;

  // Income has no categories, so the statement breaks it down by source
  // (falling back to the label, then to a generic word) — same idea as the
  // category breakdown for expenses.
  const incomeBySource = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of periodIncomes) {
      const key =
        item.source.trim() ||
        item.description.trim() ||
        t("history.incomeFallback");
      map.set(key, (map.get(key) ?? 0) + item.amount);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [periodIncomes, t]);

  // One chronological list for the whole period: expenses and incomes together.
  const historyRows = useMemo<HistoryEntry[]>(() => {
    const rows: HistoryEntry[] = [];
    for (const expense of period) {
      rows.push({
        id: expense.localId,
        kind: "expense",
        date: expense.date,
        time: expense.updatedAt,
        label: expense.description.trim() || categoryLabel(expense.category),
        sub: `${formatDay(expense.date, language)} · ${dayKey(expense.date)}`,
        amount: expense.amount,
        expense,
      });
    }
    for (const income of periodIncomes) {
      rows.push({
        id: income.localId,
        kind: "income",
        date: income.date,
        time: income.date,
        label:
          income.description.trim() ||
          income.source.trim() ||
          t("history.incomeFallback"),
        sub: `${formatDay(income.date, language)} · ${timeOf(income.date)}`,
        amount: income.amount,
      });
    }
    return rows.sort((a, b) => b.time - a.time || b.date - a.date);
  }, [period, periodIncomes, categoryLabel, language, t]);

  const rangeLabel = `${formatMonth(new Date(year, month, 1), language)}`;
  const shiftMonth = (delta: number) =>
    setCursor((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));

  const copyStatement = async () => {
    const signed = (amount: number, sign: "+" | "−") =>
      `${sign}${formatAriary(Math.abs(amount), language)}`;
    const lines = [
      `Trust Us — ${rangeLabel}`,
      `${t("report.totalSpent")}: ${formatAriary(total, language)}`,
      `${t("report.totalIncome")}: ${formatAriary(totalIncome, language)}`,
      `${t("report.net")}: ${signed(net, net >= 0 ? "+" : "−")}`,
      `${t("report.entries")}: ${period.length}`,
      "",
      ...categoryTotals.map(
        ([category, amount]) =>
          `${categoryLabel(category)}: ${formatAriary(amount, language)}`,
      ),
      ...(incomeBySource.length > 0
        ? [
            "",
            `${t("report.bySource")}:`,
            ...incomeBySource.map(
              ([source, amount]) => `${source}: ${formatAriary(amount, language)}`,
            ),
          ]
        : []),
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      toast.success(t("report.copied"));
    } catch {
      toast.error(t("report.share"));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-foreground">{t("report.title")}</h1>
        <p className="text-xs text-muted-foreground">{t("report.subtitle")}</p>
      </header>

      <section className="flex items-center justify-between rounded-2xl border border-border bg-card px-3 py-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => shiftMonth(-1)}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <span className="text-sm font-semibold text-foreground">{rangeLabel}</span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => shiftMonth(1)}
        >
          <ChevronRight className="size-4" />
        </Button>
      </section>

      <section className="rounded-3xl border border-border bg-card p-5">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {t("report.totalSpent")}
        </p>
        <p className="tabular mt-2 text-4xl font-bold text-foreground">
          {formatAriary(total, language)}
        </p>
        {monthBudget > 0 ? (
          <p className="mt-2 text-xs text-bronze">
            {budgetLeft >= 0
              ? t("report.budgetLeft", { amount: formatAriary(budgetLeft, language) })
              : t("report.overBudget", { amount: formatAriary(Math.abs(budgetLeft), language) })}
          </p>
        ) : (
          <p className="mt-2 text-xs text-muted-foreground">{t("report.noBudget")}</p>
        )}

        <div className="mt-5 grid grid-cols-3 gap-3">
          <Stat label={t("report.average")} value={formatAriary(average, language)} />
          <Stat label={t("report.entries")} value={String(period.length)} />
          <Stat
            label={t("report.topCategory")}
            value={categoryTotals[0] ? categoryLabel(categoryTotals[0][0]) : "—"}
          />
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card p-5">
        <p className="mt-4 text-center text-xs text-muted-foreground">
          {t("report.noIncome")}
        </p>
      </section>

      <section className="rounded-3xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {t("report.totalIncome")}
          </p>
          <span className="text-[11px] text-muted-foreground">
            {t("report.incomeEntries", { count: periodIncomes.length })}
          </span>
        </div>
        <p className="tabular mt-2 text-4xl font-bold text-emerald-600 dark:text-emerald-400">
          +{formatAriary(totalIncome, language)}
        </p>

        <div className="mt-4 flex items-center justify-between rounded-2xl bg-background px-3 py-2">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {t("report.net")}
          </span>
          <span
            className={`tabular text-sm font-semibold ${
              net >= 0 ? "text-foreground" : "text-destructive"
            }`}
          >
            {net >= 0 ? "+" : "−"}{formatAriary(Math.abs(net), language)}
          </span>
        </div>

        {incomeBySource.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
            {t("report.noIncome")}
          </p>
        ) : (
          <div className="mt-5 flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-foreground">
              {t("report.bySource")}
            </h2>
            <ul className="flex flex-col gap-3">
              {incomeBySource.map(([source, amount]) => {
                const percent =
                  totalIncome > 0
                    ? Math.round((amount / totalIncome) * 100)
                    : 0;
                return (
                  <li key={source} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="min-w-0 truncate text-sm font-medium text-foreground">
                        {source}
                      </p>
                      <span className="tabular text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        +{formatAriary(amount, language)}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-emerald-500/70"
                        style={{ width: `${Math.max(percent, 2)}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {t("report.ofIncome", { percent })}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">{t("report.byCategory")}</h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-bronze"
            onClick={copyStatement}
          >
            {t("report.share")}
          </Button>
        </div>

        {categoryTotals.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-5 text-center text-xs text-muted-foreground">
            {t("report.noData")}
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {categoryTotals.map(([category, amount]) => {
              const percent = total > 0 ? Math.round((amount / total) * 100) : 0;
              const budget = budgets[budgetKeyOf(year, month + 1, category)] ?? 0;
              const overBudget = budget > 0 && amount > budget;
              return (
                <li key={category} className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-3">
                    <CategoryMark category={category} className="size-8" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {categoryLabel(category)}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {t("report.ofTotal", { percent })}
                        {budget > 0
                          ? ` · ${t("report.budget")} ${formatAriary(budget, language)}`
                          : ""}
                      </p>
                    </div>
                    <span className="tabular text-sm font-semibold text-foreground">
                      {formatAriary(amount, language)}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full ${overBudget ? "bg-destructive" : CATEGORY_BARS[category]}`}
                      style={{ width: `${Math.max(percent, 2)}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="rounded-3xl border border-border bg-card p-4">
        <h2 className="mb-4 text-sm font-semibold text-foreground">{t("report.split")}</h2>

        {categoryTotals.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-5 text-center text-xs text-muted-foreground">
            {t("report.noData")}
          </p>
        ) : (
          <>
            <div className="flex flex-col items-center gap-5">
              <CategoryDonut
                data={categoryTotals}
                total={total}
                language={language}
              />
              <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-2">
                {categoryTotals.map(([category, amount]) => {
                  const percent = total > 0 ? Math.round((amount / total) * 100) : 0;
                  return (
                    <li key={category} className="flex items-center gap-2 text-[11px]">
                      <span
                        className="size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: DONUT_COLORS[category] }}
                      />
                      <span className="min-w-0 flex-1 truncate text-muted-foreground">
                        {categoryLabel(category)}
                      </span>
                      <span className="tabular font-semibold text-foreground">{percent}%</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Stat
                label={t("report.categoriesUsed")}
                value={String(categoryTotals.length)}
              />
              <Stat label={t("report.budget")} value={formatAriary(monthBudget, language)} />
            </div>
          </>
        )}
      </section>

      <section className="rounded-3xl border border-border bg-card p-4">
        <h2 className="mb-3 text-sm font-semibold text-foreground">{t("expense.category")}</h2>
        <ul className="flex flex-col gap-2">
          {CATEGORIES.map((category) => {
            const key = budgetKeyOf(year, month + 1, category);
            const value = budgets[key] ?? 0;
            return (
              <li key={category} className="flex items-center gap-3">
                <CategoryMark category={category} className="size-8" />
                <span className="flex-1 text-sm text-foreground">
                  {categoryLabel(category)}
                </span>
                <Input
                  inputMode="numeric"
                  defaultValue={value > 0 ? String(value) : ""}
                  placeholder="0"
                  onBlur={(event) => {
                    const amount = Number(event.target.value.replace(/[^\d]/g, "")) || 0;
                    if (amount !== value) onSaveBudget(category, amount, year, month + 1);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      (event.target as HTMLInputElement).blur();
                      toast.success(t("common.save"));
                    }
                  }}
                  className="tabular h-8 w-28 bg-background text-right text-xs"
                />
              </li>
            );
          })}
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-foreground">{t("nav.history")}</h2>
        {historyRows.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-5 text-center text-xs text-muted-foreground">
            {t("history.empty")}
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {historyRows.slice(0, 60).map((row) => (
              <li key={row.id}>
                {row.expense ? (
                  <button
                    type="button"
                    onClick={() => onEdit(row.expense as Expense)}
                    className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-3 py-2.5 text-left transition-colors hover:border-bronze/50"
                  >
                    <CategoryMark
                      category={row.expense.category}
                      className="size-9"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {row.label}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {row.sub}
                      </p>
                    </div>
                    <span className="tabular text-sm font-semibold text-bronze">
                      −{formatAriary(row.amount, language)}
                    </span>
                  </button>
                ) : (
                  <div className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-3 py-2.5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <TrendingUp className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {row.label}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {row.sub}
                      </p>
                    </div>
                    <span className="tabular text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      +{formatAriary(row.amount, language)}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-background px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="tabular mt-1 truncate text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

/** One slice per category, coloured with the brand palette. */
const DONUT_COLORS: Record<CategoryKey, string> = {
  food: "var(--bronze)",
  transport: "var(--rust)",
  housing: "var(--coffee)",
  shopping: "color-mix(in oklab, var(--bronze) 62%, var(--rust))",
  health: "var(--sand)",
  family: "color-mix(in oklab, var(--rust) 58%, var(--sand))",
  education: "color-mix(in oklab, var(--bronze) 55%, var(--coffee))",
  bills: "color-mix(in oklab, var(--coffee) 55%, var(--sand))",
  leisure: "color-mix(in oklab, var(--rust) 40%, var(--sand))",
  other: "var(--muted-foreground)",
};

function CategoryDonut({
  data,
  total,
  language,
}: {
  data: Array<[CategoryKey, number]>;
  total: number;
  language: LanguageCode;
}) {
  const { t } = useLanguage();
  const size = 172;
  const thickness = 22;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let consumed = 0;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="size-full -rotate-90"
        role="img"
        aria-label={t("report.split")}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={thickness}
        />
        {data.map(([category, amount]) => {
          const length = total > 0 ? (amount / total) * circumference : 0;
          const gap = data.length > 1 ? 2 : 0;
          const dash = `${Math.max(length - gap, 0)} ${circumference}`;
          const offset = -consumed;
          consumed += length;
          return (
            <circle
              key={category}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              strokeWidth={thickness}
              strokeDasharray={dash}
              strokeDashoffset={offset}
              style={{ stroke: DONUT_COLORS[category] }}
            />
          );
        })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
          {t("report.totalSpent")}
        </p>
        <p className="tabular mt-1 text-sm font-bold text-foreground">
          {formatCompact(total, language)} Ar
        </p>
      </div>
    </div>
  );
}
