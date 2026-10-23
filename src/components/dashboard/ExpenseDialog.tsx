import { CategoryMark } from "@/components/CategoryMark";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCategories } from "@/hooks/use-categories";
import type { IncomeDraft } from "@/hooks/use-incomes";
import { de, enGB, fr, it, type DayPickerLocale } from "react-day-picker/locale";
import { useLanguage } from "@/hooks/use-language";
import { startOfDay, type Expense, type ExpenseDraft } from "@/lib/expense-store";
import { formatAriary, localeOf } from "@/lib/format";
import type { CategoryKey, LanguageCode } from "@/lib/i18n";
import type { Income } from "@/hooks/use-incomes";
import {
  CalendarDays,
  Check,
  PencilLine,
  Plus,
  X,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const CALENDAR_LOCALES: Record<LanguageCode, DayPickerLocale> = {
  en: enGB,
  // Malagasy has no dedicated date-fns locale: French is the closest fit.
  mg: fr,
  fr: fr,
  it: it,
  de: de,
};


type Mode = "expense" | "income";

function digitsOnly(value: string): string {
  return value.replace(/[^\d]/g, "");
}

function groupDigits(value: string, language: string): string {
  if (!value) return "";
  return new Intl.NumberFormat(language).format(Number(value));
}

function formatDateLabel(value: Date, language: LanguageCode): string {
  return new Intl.DateTimeFormat(localeOf(language), {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(value);
}

function formatDateTimeLabel(value: number, language: LanguageCode): string {
  return new Intl.DateTimeFormat(localeOf(language), {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);
}

function timeValue(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  return `${hours}:${minutes}`;
}

function startOfLocalDay(value: number | Date): Date {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

function dayIdentity(value: Date): string {
  return `${value.getFullYear()}-${value.getMonth()}-${value.getDate()}`;
}

type ExpenseDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial: Expense | null;
  defaultDate: number;
  /** Category pre-selected when creating a new expense. */
  defaultCategory?: CategoryKey;
  incomes: Income[];
  /** One draft per selected day. */
  onSubmit: (drafts: ExpenseDraft[]) => void;
  onAddIncome: (draft: IncomeDraft) => void;
  onDeleteIncome: (localId: string) => void;
};

function deleteButtonIcon(): React.ReactNode {
  return <Trash2 className="size-3.5" />;
}

export function ExpenseDialog({ open, onOpenChange, ...rest }: ExpenseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto border-border bg-card sm:max-w-lg">
        <ExpenseDialogForm {...rest} onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}

/** Mounted only while the dialog is open, so every opening starts fresh. */
function ExpenseDialogForm({
  onOpenChange,
  initial,
  defaultDate,
  defaultCategory = "food",
  incomes,
  onSubmit,
  onAddIncome,
  onDeleteIncome,
}: Omit<ExpenseDialogProps, "open">) {
  const { t, language } = useLanguage();
  const { options, addCategory, renameCategory, deleteCategory } = useCategories();

  const [mode, setMode] = useState<Mode>("expense");
  const [amount, setAmount] = useState(() =>
    initial ? String(Math.round(initial.amount)) : "",
  );
  const [description, setDescription] = useState(initial?.description ?? "");
  const [category, setCategory] = useState<string>(
    initial?.category ?? defaultCategory,
  );
  const [dates, setDates] = useState<Date[]>(() => [
    startOfLocalDay(initial?.date ?? defaultDate),
  ]);
  const [error, setError] = useState<string | null>(null);

  const [managing, setManaging] = useState(false);
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [newCategory, setNewCategory] = useState("");

    const [incomeDate, setIncomeDate] = useState<Date>(() =>
    startOfLocalDay(defaultDate),
  );
  const [incomeTime, setIncomeTime] = useState(() => timeValue(Date.now()));
  const [incomeError, setIncomeError] = useState<string | null>(null);
  const [incomeAmount, setIncomeAmount] = useState<string>("");
  const [incomeLabel, setIncomeLabel] = useState<string>("");
  const [incomeSource, setIncomeSource] = useState<string>("");

  // Deleted income list rows are replaced inline by a stateless map of
  // known entries so the component never renders a save/delete twin.

  // A deleted category must never stay selected: fall back during render.
  const activeCategory = options.some((entry) => entry.key === category)
    ? category
    : (options[0]?.key ?? "other");

  const sortedDates = useMemo(
    () => [...dates].sort((a, b) => a.getTime() - b.getTime()),
    [dates],
  );

  const recentIncomes = useMemo(
    () => [...incomes].sort((a, b) => b.date - a.date).slice(0, 5),
    [incomes],
  );

  const calendarLocale = CALENDAR_LOCALES[language];

  const startManaging = () => {
    setLabels(
      Object.fromEntries(options.map((entry) => [entry.key, entry.label])),
    );
    setManaging(true);
  };

  const handleAddCategory = () => {
    const key = addCategory(newCategory);
    if (!key) return;
    setNewCategory("");
    setCategory(key);
    toast.success(t("category.added"));
  };

  const handleRenameCategory = (key: string) => {
    const next = labels[key]?.trim();
    if (!next) return;
    renameCategory(key, next);
    toast.success(t("category.updated"));
  };

  const handleDeleteCategory = (key: string) => {
    deleteCategory(key);
    setLabels((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
    toast.success(t("category.deleted"));
  };

  const handleExpenseSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = Number(digitsOnly(amount));
    if (!value || value <= 0) {
      setError(t("expense.invalidAmount"));
      return;
    }
    if (sortedDates.length === 0) {
      setError(t("expense.pickDates"));
      return;
    }
    const selected = initial ? sortedDates.slice(0, 1) : sortedDates;
    onSubmit(
      selected.map((day) => ({
        amount: value,
        description,
        category: activeCategory as CategoryKey,
        date: startOfDay(day),
      })),
    );
    onOpenChange(false);
  };

  const handleIncomeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = Number(digitsOnly(incomeAmount));
    if (!value || value <= 0) {
      setIncomeError(t("income.invalidAmount"));
      return;
    }
    const [hours, minutes] = incomeTime.split(":").map(Number);
    const stamp = new Date(incomeDate);
    stamp.setHours(hours || 0, minutes || 0, 0, 0);
    onAddIncome({
      amount: value,
      description: incomeLabel,
      source: incomeSource,
      date: stamp.getTime(),
    });
    // Keep the dialog open so the new entry shows up in the history below.
    setIncomeAmount("");
    setIncomeLabel("");
    setIncomeSource("");
    setIncomeError(null);
    toast.success(t("income.added"));
  };

  const title = initial ? t("expense.editTitle") : t("expense.addTitle");
  const dateSummary =
    sortedDates.length === 0
      ? t("expense.pickDates")
      : sortedDates.length === 1
        ? formatDateLabel(sortedDates[0], language)
        : t("expense.datesSelected", { count: sortedDates.length });

  return (
    <>
      <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {mode === "income"
              ? t("income.subtitle")
              : `${t("expense.amount")} · ${t("app.currency")}`}
          </DialogDescription>
        </DialogHeader>

        {!initial ? (
          <div className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-background p-1">
            {(["expense", "income"] as const).map((entry) => {
              const active = mode === entry;
              return (
                <button
                  key={entry}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setMode(entry)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-bronze text-ink"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {entry === "expense" ? t("entry.expense") : t("entry.income")}
                </button>
              );
            })}
          </div>
        ) : null}

        {mode === "expense" ? (
          <form onSubmit={handleExpenseSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="expense-amount"
                className="text-xs uppercase tracking-wide text-muted-foreground"
              >
                {t("expense.amount")}
              </Label>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
                <input
                  id="expense-amount"
                  inputMode="numeric"
                  autoComplete="off"
                  value={groupDigits(amount, language)}
                  onChange={(event) => setAmount(digitsOnly(event.target.value))}
                  placeholder="0"
                  className="tabular w-full bg-transparent text-3xl font-semibold text-foreground outline-none placeholder:text-muted-foreground/50"
                />
                <span className="text-sm font-medium text-bronze">Ar</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("expense.category")}
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 gap-1.5 px-2 text-[11px] text-muted-foreground hover:text-foreground"
                  onClick={() => (managing ? setManaging(false) : startManaging())}
                >
                  {managing ? (
                    <Check className="size-3.5" />
                  ) : (
                    <PencilLine className="size-3.5" />
                  )}
                  {managing
                    ? t("expense.categoryDone")
                    : t("expense.manageCategories")}
                </Button>
              </div>

              {managing ? (
                <div className="flex flex-col gap-2 rounded-2xl border border-border bg-background p-2">
                  {options.map((entry) => (
                    <div key={entry.key} className="flex items-center gap-1.5">
                      <CategoryMark
                        category={entry.key as CategoryKey}
                        className="size-7"
                      />
                      <Input
                        value={labels[entry.key] ?? entry.label}
                        onChange={(event) =>
                          setLabels((current) => ({
                            ...current,
                            [entry.key]: event.target.value,
                          }))
                        }
                        onKeyDown={(event) => {
                          if (event.key !== "Enter") return;
                          event.preventDefault();
                          handleRenameCategory(entry.key);
                        }}
                        aria-label={`${t("category.rename")} ${entry.label}`}
                        className="h-8 flex-1 bg-card text-xs"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={t("category.rename")}
                        className="text-muted-foreground hover:text-bronze"
                        onClick={() => handleRenameCategory(entry.key)}
                      >
                        <Check className="size-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={t("category.deleteHint")}
                        className="text-muted-foreground hover:text-destructive"
                        disabled={options.length <= 1}
                        onClick={() => handleDeleteCategory(entry.key)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  ))}

                  <div className="flex items-center gap-2 border-t border-border pt-2">
                    <Input
                      value={newCategory}
                      onChange={(event) => setNewCategory(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          handleAddCategory();
                        }
                      }}
                      placeholder={t("category.namePlaceholder")}
                      className="h-8 flex-1 bg-card text-xs"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1 px-2 text-xs"
                      disabled={!newCategory.trim()}
                      onClick={handleAddCategory}
                    >
                      <Plus className="size-3.5" />
                      {t("common.add")}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-5 gap-2">
                  {options.map((entry) => {
                    const active = entry.key === activeCategory;
                    return (
                      <button
                        key={entry.key}
                        type="button"
                        onClick={() => setCategory(entry.key)}
                        title={entry.label}
                        className={`flex flex-col items-center gap-1.5 rounded-xl border p-2 transition-colors ${
                          active
                            ? "border-bronze bg-bronze/15"
                            : "border-border bg-background hover:border-bronze/50"
                        }`}
                      >
                        <CategoryMark
                          category={entry.key as CategoryKey}
                          className="size-8"
                        />
                        <span className="line-clamp-1 text-[10px] text-muted-foreground">
                          {entry.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="expense-note"
                className="text-xs uppercase tracking-wide text-muted-foreground"
              >
                {t("expense.description")}
              </Label>
              <Input
                id="expense-note"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder={t("expense.descriptionPlaceholder")}
                className="bg-background"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                {t("expense.dates")}
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start gap-2 bg-background font-normal"
                  >
                    <CalendarDays className="size-4 text-bronze" />
                    <span className="flex-1 text-left">{dateSummary}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  {initial ? (
                    <Calendar
                      mode="single"
                      selected={sortedDates[0]}
                      onSelect={(value) => {
                        if (!value) return;
                        setDates([startOfLocalDay(value)]);
                      }}
                      locale={calendarLocale}
                      className="rounded-none ring-0"
                    />
                  ) : (
                    <Calendar
                      mode="multiple"
                      required={false}
                      selected={sortedDates}
                      onSelect={(value) => {
                        if (!value || value.length === 0) return;
                        setDates(value.map((day) => startOfLocalDay(day)));
                      }}
                      locale={calendarLocale}
                      className="rounded-none ring-0"
                    />
                  )}
                </PopoverContent>
              </Popover>

              {!initial && sortedDates.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {sortedDates.map((day) => (
                    <span
                      key={dayIdentity(day)}
                      className="flex items-center gap-1 rounded-lg border border-border bg-background px-2 py-1 text-[11px] text-muted-foreground"
                    >
                      {formatDateLabel(day, language)}
                      {sortedDates.length > 1 ? (
                        <button
                          type="button"
                          aria-label={t("common.delete")}
                          onClick={() =>
                            setDates((current) =>
                              current.filter(
                                (entry) => dayIdentity(entry) !== dayIdentity(day),
                              ),
                            )
                          }
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="size-3" />
                        </button>
                      ) : null}
                    </span>
                  ))}
                </div>
              ) : null}
              <p className="text-[11px] text-muted-foreground">
                {t("expense.dateHint")}
              </p>
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="submit"
                className="bg-bronze text-ink hover:bg-bronze/90"
              >
                {initial
                  ? t("common.save")
                  : sortedDates.length > 1
                    ? `${t("common.add")} · ${sortedDates.length}`
                    : t("common.add")}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <form onSubmit={handleIncomeSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="income-amount"
                className="text-xs uppercase tracking-wide text-muted-foreground"
              >
                {t("income.amount")}
              </Label>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
                <input
                  id="income-amount"
                  inputMode="numeric"
                  autoComplete="off"
                  value={groupDigits(incomeAmount, language)}
                  onChange={(event) =>
                    setIncomeAmount(digitsOnly(event.target.value))
                  }
                  placeholder="0"
                  className="tabular w-full bg-transparent text-3xl font-semibold text-foreground outline-none placeholder:text-muted-foreground/50"
                />
                <span className="text-sm font-medium text-bronze">Ar</span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="income-label"
                  className="text-xs uppercase tracking-wide text-muted-foreground"
                >
                  {t("income.description")}
                </Label>
                <Input
                  id="income-label"
                  value={incomeLabel}
                  onChange={(event) => setIncomeLabel(event.target.value)}
                  placeholder={t("income.descriptionPlaceholder")}
                  className="bg-background"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="income-source"
                  className="text-xs uppercase tracking-wide text-muted-foreground"
                >
                  {t("income.source")}
                </Label>
                <Input
                  id="income-source"
                  value={incomeSource}
                  onChange={(event) => setIncomeSource(event.target.value)}
                  placeholder={t("income.sourcePlaceholder")}
                  className="bg-background"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("income.date")}
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start gap-2 bg-background font-normal"
                    >
                      <CalendarDays className="size-4 text-bronze" />
                      <span className="flex-1 text-left tabular">
                        {formatDateLabel(incomeDate, language)}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={incomeDate}
                      onSelect={(value) => {
                        if (!value) return;
                        setIncomeDate(startOfLocalDay(value));
                      }}
                      locale={calendarLocale}
                      className="rounded-none ring-0"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="income-time"
                  className="text-xs uppercase tracking-wide text-muted-foreground"
                >
                  {t("income.time")}
                </Label>
                <Input
                  id="income-time"
                  type="time"
                  value={incomeTime}
                  onChange={(event) => setIncomeTime(event.target.value)}
                  placeholder={t("income.timePlaceholder")}
                  className="bg-background tabular"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-2xl border border-border bg-background/60 p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    {t("income.history")}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {t("income.historyHint")}
                  </p>
                </div>
                <span className="tabular rounded-md bg-card px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  {incomes.length}
                </span>
              </div>

              {recentIncomes.length === 0 ? (
                <p className="rounded-xl border border-dotted border-border p-4 text-center text-xs text-muted-foreground">
                  {t("income.historyEmpty")}
                </p>
              ) : (
                <ul className="flex flex-col gap-1.5">
                  {recentIncomes.map((income) => (
                    <li
                      key={income.localId}
                      className="flex items-center gap-2 rounded-xl border border-border bg-card px-2.5 py-2"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {income.description.trim() ||
                            income.source.trim() ||
                            t("history.incomeFallback")}
                        </p>
                        <p className="truncate text-[11px] text-muted-foreground">
                          {income.source.trim()
                            ? `${income.source.trim()} · `
                            : ""}
                          {formatDateTimeLabel(income.date, language)}
                        </p>
                      </div>
                      <span className="tabular shrink-0 text-xs font-semibold text-bronze">
                        +{formatAriary(income.amount, language)}
                      </span>
                      <button
                        type="button"
                        className="flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-destructive hover:text-white"
                        aria-label={t("income.delete")}
                        onClick={() => onDeleteIncome(income.localId)}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {incomeError ? (
              <p className="text-sm text-destructive">{incomeError}</p>
            ) : null}

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="submit"
                className="bg-bronze text-ink hover:bg-bronze/90"
                disabled={!digitsOnly(incomeAmount)}
              >
                {t("common.add")}
              </Button>
            </DialogFooter>
          </form>
        )}
    </>
  );
}
