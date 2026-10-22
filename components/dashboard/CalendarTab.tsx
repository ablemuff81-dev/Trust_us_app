import { CategoryMark } from "@/components/CategoryMark";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useCategoryLabel } from "@/hooks/use-categories";
import { useLanguage } from "@/hooks/use-language";
import {
  dayKey,
  groupByDay,
  keyToDate,
  startOfDay,
  totalOf,
  type Expense,
} from "@/lib/expense-store";
import { formatAriary, formatCompact, formatFullDay, formatMonth, localeOf } from "@/lib/format";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

const WEEK_LENGTH = 7;

function monthMatrix(cursor: Date): Array<Array<Date | null>> {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7; // week starts on Monday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: Array<Date | null> = [];
  for (let i = 0; i < offset; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(new Date(year, month, day));
  while (cells.length % WEEK_LENGTH !== 0) cells.push(null);

  const weeks: Array<Array<Date | null>> = [];
  for (let i = 0; i < cells.length; i += WEEK_LENGTH) {
    weeks.push(cells.slice(i, i + WEEK_LENGTH));
  }
  return weeks;
}

function weekdayLabels(language: Parameters<typeof localeOf>[0]): string[] {
  const formatter = new Intl.DateTimeFormat(localeOf(language), { weekday: "short" });
  // 2024-01-01 was a Monday, so the labels line up with the Monday-first grid.
  return Array.from({ length: WEEK_LENGTH }, (_, index) =>
    formatter.format(new Date(2024, 0, 1 + index)),
  );
}

export function CalendarTab({
  expenses,
  onEdit,
  onDelete,
}: {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (localIds: string[]) => void;
}) {
  const { t, language } = useLanguage();
  const categoryLabel = useCategoryLabel();
  const [cursor, setCursor] = useState(() => new Date());
  const [multi, setMulti] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const byDay = useMemo(() => groupByDay(expenses), [expenses]);
  const weeks = useMemo(() => monthMatrix(cursor), [cursor]);
  const todayKey = dayKey(new Date());
  const maxDayTotal = useMemo(
    () => Math.max(0, ...[...byDay.values()].map((items) => totalOf(items))),
    [byDay],
  );

  const selectedExpenses = useMemo(
    () =>
      selected.flatMap((key) => byDay.get(key) ?? []).sort((a, b) => b.amount - a.amount),
    [selected, byDay],
  );

  const selectedTotal = totalOf(selectedExpenses);

  const toggleDay = (key: string) => {
    setSelected((current) => {
      if (multi) {
        return current.includes(key)
          ? current.filter((entry) => entry !== key)
          : [...current, key];
      }
      return current.includes(key) && current.length === 1 ? [] : [key];
    });
  };

  const shiftMonth = (delta: number) => {
    setCursor((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  };

  const confirmDelete = () => {
    onDelete(selectedExpenses.map((item) => item.localId));
    setSelected([]);
    setConfirmOpen(false);
  };

  const intensityFor = (items: Expense[] | undefined) => {
    if (!items || items.length === 0) return "";
    const total = totalOf(items);
    const ratio = maxDayTotal > 0 ? total / maxDayTotal : 1;
    if (ratio > 0.66) return "bg-bronze/30";
    if (ratio > 0.33) return "bg-bronze/20";
    return "bg-bronze/10";
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-foreground">{t("calendar.title")}</h1>
        <p className="text-xs text-muted-foreground">{t("calendar.subtitle")}</p>
      </header>

      <section className="rounded-3xl border border-border bg-card p-4">
        <div className="mb-4 flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8 border-border bg-background"
            onClick={() => shiftMonth(-1)}
            aria-label={t("calendar.back")}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">
              {formatMonth(cursor, language)}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {t("calendar.busiest")}:{" "}
              {maxDayTotal > 0
                ? formatAriary(
                    Math.max(...[...byDay.values()].map((items) => totalOf(items))),
                    language,
                  )
                : "—"}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8 border-border bg-background"
            onClick={() => shiftMonth(1)}
            aria-label={t("calendar.next")}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 pb-1">
          {weekdayLabels(language).map((label) => (
            <span
              key={label}
              className="text-center text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
            >
              {label}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {weeks.flat().map((day, index) => {
            if (!day) return <span key={`empty-${index}`} className="h-14 rounded-xl" />;
            const key = dayKey(day);
            const items = byDay.get(key);
            const isSelected = selected.includes(key);
            const dayTotal = items ? totalOf(items) : 0;
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleDay(key)}
                onDoubleClick={() => {
                  const first = items?.[0];
                  if (first) onEdit(first);
                }}
                className={`flex h-14 flex-col items-center justify-center gap-0.5 rounded-xl border transition-colors ${
                  isSelected
                    ? "border-bronze bg-bronze/25"
                    : key === todayKey
                      ? "border-bronze/60 bg-background"
                      : `border-transparent ${intensityFor(items)} hover:border-bronze/40`
                }`}
              >
                <span
                  className={`text-xs font-semibold ${
                    key === todayKey ? "text-bronze" : "text-foreground"
                  }`}
                >
                  {day.getDate()}
                </span>
                {dayTotal > 0 ? (
                  <span className="tabular text-[9px] leading-none text-bronze">
                    {formatCompact(dayTotal, language)}
                  </span>
                ) : (
                  <span className="text-[9px] leading-none text-transparent">·</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-2xl bg-background px-3 py-2">
          <div className="flex items-center gap-2">
            <Switch checked={multi} onCheckedChange={setMulti} id="multi-select" />
            <label htmlFor="multi-select" className="text-xs font-medium text-foreground">
              {t("calendar.multiSelect")}
            </label>
          </div>
          <span className="text-[11px] text-muted-foreground">{t("calendar.selectHint")}</span>
        </div>
      </section>

      {selected.length > 0 ? (
        <section className="rounded-2xl border border-bronze/40 bg-card p-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {selected.length === 1
                  ? t("calendar.selectedOne")
                  : t("calendar.selected", { count: selected.length })}
              </p>
              <p className="tabular text-xs text-muted-foreground">
                {t("calendar.dayTotal", {
                  count: selectedExpenses.length,
                  total: formatAriary(selectedTotal, language),
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={() => setSelected([])}
              >
                {t("calendar.clearSelection")}
              </Button>
              <Button
                type="button"
                size="sm"
                className="gap-2 bg-destructive text-foreground hover:bg-destructive/90"
                disabled={selectedExpenses.length === 0}
                onClick={() => setConfirmOpen(true)}
              >
                <Trash2 className="size-4" />
                {t("calendar.deleteSelected")}
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      {selected.length > 0 ? (
        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-foreground">
            {selected.length === 1
              ? formatFullDay(keyToDate(selected[0]), language)
              : t("calendar.dayListTitle")}
          </h2>
          {selectedExpenses.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
              {t("calendar.noExpenses")}
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {selectedExpenses.slice(0, 40).map((expense) => (
                <li key={expense.localId}>
                  <button
                    type="button"
                    onClick={() => onEdit(expense)}
                    className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-3 py-2.5 text-left transition-colors hover:border-bronze/50"
                  >
                    <CategoryMark category={expense.category} className="size-9" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {expense.description || categoryLabel(expense.category)}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {formatFullDay(expense.date, language)} ·{" "}
                        {startOfDay(expense.date) === startOfDay(Date.now())
                          ? t("calendar.today")
                          : formatDayLabel(expense.date, language)}
                      </p>
                    </div>
                    <span className="tabular text-sm font-semibold text-bronze">
                      −{formatAriary(expense.amount, language)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="border-border bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("delete.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedExpenses.length === 1
                ? t("delete.bodyOne")
                : t("delete.body", { count: selectedExpenses.length })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="rounded-2xl bg-background px-3 py-2 text-xs text-muted-foreground">
            {selected.length === 1
              ? t("calendar.selectedOne")
              : t("calendar.selected", { count: selected.length })}{" "}
            · {formatAriary(selectedTotal, language)}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("calendar.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-foreground hover:bg-destructive/90"
            >
              {t("delete.confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function formatDayLabel(value: number, language: Parameters<typeof localeOf>[0]): string {
  return new Intl.DateTimeFormat(localeOf(language), {
    day: "numeric",
    month: "short",
  }).format(value);
}
