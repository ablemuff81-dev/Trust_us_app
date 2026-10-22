import { CategoryMark } from "@/components/CategoryMark";
import { Button } from "@/components/ui/button";
import type { Income } from "@/hooks/use-incomes";
import { useCategoryLabel } from "@/hooks/use-categories";
import { useLanguage } from "@/hooks/use-language";
import { formatAriary, formatDay, formatMonth } from "@/lib/format";
import type { Expense } from "@/lib/expense-store";
import { CATEGORIES, type CategoryKey } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ArrowUpRight, Eye, EyeOff, Plus, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

const QUICK_CATEGORIES: CategoryKey[] = ["food", "transport", "shopping", "bills"];

function initialsOf(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 0) return "TU";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

export function HomeTab({
  expenses,
  incomes,
  userName,
  feeNote,
  onAdd,
  onEdit,
  onOpenStatement,
  onOpenCalendar,
}: {
  expenses: Expense[];
  incomes: Income[];
  userName: string;
  feeNote: string;
  onAdd: (category?: CategoryKey) => void;
  onEdit: (expense: Expense) => void;
  onOpenStatement: () => void;
  onOpenCalendar: () => void;
}) {
  const { t, language } = useLanguage();
  const categoryLabel = useCategoryLabel();
  const [hidden, setHidden] = useState(false);

  const now = useMemo(() => new Date(), []);
  const stats = useMemo(() => {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    ).getTime();

    const monthItems = expenses.filter((item) => item.date >= startOfMonth);
    const todayItems = expenses.filter((item) => item.date >= startOfToday);
    const spentTotal = expenses.reduce((sum, item) => sum + item.amount, 0);
    const incomeTotal = incomes.reduce((sum, item) => sum + item.amount, 0);
    const monthTotal = monthItems.reduce((sum, item) => sum + item.amount, 0);
    const todayTotal = todayItems.reduce((sum, item) => sum + item.amount, 0);

    return {
      // Total balance: everything received minus everything spent.
      balance: incomeTotal - spentTotal,
      monthTotal,
      todayTotal,
      monthCount: monthItems.length,
    };
  }, [expenses, incomes, now]);

  const recent = expenses.slice(0, 6);
  const masked = (value: number) => (hidden ? "•••••• Ar" : formatAriary(value, language));

  return (
    <div className="flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full border border-bronze/40 bg-coffee/40 text-sm font-semibold text-sand">
            {initialsOf(userName)}
          </span>
          <div>
            <p className="text-xs text-muted-foreground">{t("home.welcomeBack")}</p>
            <p className="text-sm font-semibold text-foreground">{userName}</p>
          </div>
        </div>
      </header>

      <section className="rounded-3xl border border-border bg-card p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {t("home.totalBalance")}
            </p>
            <p className="tabular mt-2 text-4xl font-bold leading-none text-foreground sm:text-5xl">
              {hidden ? "••••••" : formatAriary(stats.balance, language)}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              {formatMonth(now, language)} · {t("home.entries", { count: expenses.length })}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setHidden((value) => !value)}
            aria-label={hidden ? t("home.showBalance") : t("home.hideBalance")}
            className="size-9 text-muted-foreground"
          >
            {hidden ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </Button>
        </div>
        <p className="mt-4 rounded-xl bg-muted/60 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
          {feeNote}
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.99 }}
          onClick={onOpenStatement}
          className="rounded-2xl bg-sand p-4 text-left text-ink"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/60">
              {t("home.monthSpend", { month: formatMonth(now, language) })}
            </span>
            <Sparkles className="size-4 text-ink/50" />
          </div>
          <p className="tabular mt-3 text-2xl font-bold">{masked(stats.monthTotal)}</p>
          <div className="mt-3 flex items-center gap-1.5">
            {CATEGORIES.slice(0, 5).map((category) => (
              <CategoryMark key={category} category={category} className="size-6" />
            ))}
          </div>
          <p className="mt-3 text-[11px] text-ink/60">
            {t("home.entries", { count: stats.monthCount })}
          </p>
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.99 }}
          onClick={onOpenCalendar}
          className="rounded-2xl bg-rust p-4 text-left text-sand"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-sand/70">
              {t("home.todaySpend")}
            </span>
            <ArrowUpRight className="size-4 text-sand/60" />
          </div>
          <p className="tabular mt-3 text-2xl font-bold">{masked(stats.todayTotal)}</p>
          <div className="mt-4 flex items-end justify-between">
            <span className="rounded-lg bg-ink/25 px-2 py-1 text-[10px] font-semibold tracking-wide">
              {formatDay(now, language)}
            </span>
            <span className="text-[11px] text-sand/70">{t("nav.calendar")}</span>
          </div>
        </motion.button>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">{t("home.quickAdd")}</h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 gap-1 px-2 text-xs text-bronze"
            onClick={() => onAdd()}
          >
            <Plus className="size-3.5" />
            {t("common.add")}
          </Button>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {QUICK_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onAdd(category)}
              className="flex w-16 shrink-0 flex-col items-center gap-2"
            >
              <CategoryMark category={category} className="size-12 rounded-2xl" />
              <span className="line-clamp-1 text-[10px] text-muted-foreground">
                {categoryLabel(category)}
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => onAdd()}
            className="flex w-16 shrink-0 flex-col items-center gap-2"
          >
            <span className="flex size-12 items-center justify-center rounded-2xl border border-dashed border-bronze/60 text-bronze">
              <Plus className="size-5" />
            </span>
            <span className="line-clamp-1 text-[10px] text-muted-foreground">
              {t("expense.newTitle")}
            </span>
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">{t("home.recent")}</h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-bronze"
            onClick={onOpenStatement}
          >
            {t("common.viewAll")}
          </Button>
        </div>

        {recent.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-6 text-center">
            <p className="text-sm font-medium text-foreground">{t("home.empty")}</p>
            <p className="mt-1 text-xs text-muted-foreground">{t("home.emptyHint")}</p>
            <Button
              type="button"
              onClick={() => onAdd()}
              className="mt-4 bg-bronze text-ink hover:bg-bronze/90"
            >
              {t("home.quickAdd")}
            </Button>
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {recent.map((expense) => (
              <li key={expense.localId}>
                <button
                  type="button"
                  onClick={() => onEdit(expense)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-3 py-3 text-left transition-colors hover:border-bronze/50"
                >
                  <CategoryMark category={expense.category} className="size-10" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {expense.description || categoryLabel(expense.category)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDay(expense.date, language)} ·{" "}
                      {categoryLabel(expense.category)}
                    </p>
                  </div>
                  <span className="tabular shrink-0 text-sm font-semibold text-bronze">
                    −{formatAriary(expense.amount, language)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
