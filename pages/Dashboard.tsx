import { CalendarTab } from "@/components/dashboard/CalendarTab";
import { ExpenseDialog } from "@/components/dashboard/ExpenseDialog";
import { HomeTab } from "@/components/dashboard/HomeTab";
import { SettingsTab } from "@/components/dashboard/SettingsTab";
import { StatementTab } from "@/components/dashboard/StatementTab";
import { LanguageMenu } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useExpenses } from "@/hooks/use-expenses";
import { useIncomes, type IncomeDraft } from "@/hooks/use-incomes";
import { useLanguage } from "@/hooks/use-language";
import type { Expense, ExpenseDraft } from "@/lib/expense-store";
import type { CategoryKey } from "@/lib/i18n";
import {
  CalendarDays,
  ChartPie,
  House,
  Plus,
  Settings,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type Tab = "home" | "calendar" | "report" | "settings";

const TABS: Array<{
  id: Tab;
  icon: typeof House;
  labelKey: "nav.home" | "nav.calendar" | "nav.report" | "nav.settings";
}> = [
  { id: "home", icon: House, labelKey: "nav.home" },
  { id: "calendar", icon: CalendarDays, labelKey: "nav.calendar" },
  { id: "report", icon: ChartPie, labelKey: "nav.report" },
  { id: "settings", icon: Settings, labelKey: "nav.settings" },
];

export default function Dashboard() {
  const { user, signOut, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const {
    expenses,
    budgets,
    addExpense,
    updateExpense,
    deleteExpenses,
    saveBudget,
    clearLocalData,
  } = useExpenses();
  const { incomes, addIncome, deleteIncome, clearIncomes } = useIncomes();

  const [tab, setTab] = useState<Tab>("home");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [draftCategory, setDraftCategory] = useState<CategoryKey>("food");
  // Pinned when the dialog opens so background re-renders cannot reset the form.
  const [draftDate, setDraftDate] = useState(() => Date.now());

  const userName =
    user?.name || user?.email?.split("@")[0] || t("home.guestName");
  const syncNote = t("home.sync.local");

  const openNew = (category: CategoryKey = "food") => {
    setEditing(null);
    setDraftCategory(category);
    setDraftDate(Date.now());
    setDialogOpen(true);
  };

  const openEdit = (expense: Expense) => {
    setEditing(expense);
    setDraftCategory(expense.category);
    setDraftDate(expense.date);
    setDialogOpen(true);
  };

  const handleSubmit = (drafts: ExpenseDraft[]) => {
    if (editing) {
      const draft = drafts[0];
      if (draft) updateExpense(editing.localId, draft);
      toast.success(t("expense.updated"));
    } else {
      for (const draft of drafts) addExpense(draft);
      toast.success(t("expense.added"));
    }
    setEditing(null);
  };

  const handleIncomeSubmit = (draft: IncomeDraft) => {
    addIncome(draft);
  };

  const handleDeleteIncome = (localId: string) => {
    deleteIncome(localId);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };    return (
        <div className="min-h-screen bg-background text-foreground">
          <div className="mx-auto flex w-full max-w-6xl gap-8 px-4 pb-28 pt-6 sm:px-6 lg:pb-10">
            <aside className="sticky top-6 hidden h-fit w-60 shrink-0 flex-col gap-6 lg:flex">
              <div className="flex items-center gap-2.5">
                <Logo size="md" />
                <div>
                  <p className="text-sm font-semibold leading-none">{t("app.name")}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {t("app.currency")}
                  </p>
                </div>
              </div>

              <nav className="flex flex-col gap-1">
                {TABS.map((entry) => {
                  const Icon = entry.icon;
                  const active = tab === entry.id;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => setTab(entry.id)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                        active
                          ? "bg-card text-foreground"
                          : "text-muted-foreground hover:bg-card/60 hover:text-foreground"
                      }`}
                    >
                      <Icon className={`size-4 ${active ? "text-bronze" : ""}`} />
                      {t(entry.labelKey)}
                    </button>
                  );
                })}
              </nav>

              <Button
                type="button"
                onClick={() => openNew()}
                className="gap-2 bg-bronze text-ink hover:bg-bronze/90"
              >
                <Plus className="size-4" />
                {t("expense.newTitle")}
              </Button>

              <div className="rounded-2xl border border-border bg-card p-3">
                <div className="flex items-center gap-2">
                  <Wallet className="size-4 text-bronze" />
                  <p className="text-xs font-medium text-foreground">{userName}</p>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  {syncNote}
                </p>
              </div>

              <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                <p className="max-w-[150px] text-[10px] leading-tight text-muted-foreground">
                  {t("footer.copyright")}
                </p>
                <ThemeToggle />
              </div>
            </aside>

            <main className="w-full min-w-0 lg:max-w-2xl">
              <div className="mb-4 flex items-center justify-between gap-2 lg:hidden">
                <div className="flex min-w-0 items-center gap-2">
                  <Logo size="md" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold leading-none">
                      {t("app.name")}
                    </p>
                    <p className="mt-1 truncate text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {syncNote}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <ThemeToggle />
                  <LanguageMenu />
                </div>
              </div>

              {tab === "home" ? (
                <HomeTab
                  expenses={expenses}
                  incomes={incomes}
                  userName={userName}
                  feeNote={syncNote}
                  onAdd={openNew}
                  onEdit={openEdit}
                  onOpenStatement={() => setTab("report")}
                  onOpenCalendar={() => setTab("calendar")}
                />
              ) : null}

              {tab === "calendar" ? (
                <CalendarTab
                  expenses={expenses}
                  onEdit={openEdit}
      onDelete={(ids) => {
    deleteExpenses(ids);
    toast.success(t("delete.done"));
  }}
                />
              ) : null}

              {tab === "report" ? (
                <StatementTab
                  expenses={expenses}
                  incomes={incomes}
                  budgets={budgets}
                  onSaveBudget={saveBudget}
                  onEdit={openEdit}
                />
              ) : null}

              {tab === "settings" ? (
                <SettingsTab
                  userName={userName}
                  isAuthenticated={isAuthenticated}
                  expenseCount={expenses.length}
                  onSignOut={handleSignOut}
                  onClearLocal={() => {
                    clearLocalData();
                    clearIncomes();
                    toast.success(t("settings.cleared"));
                  }}
                />
              ) : null}
            </main>
          </div>            <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-3 py-2 backdrop-blur lg:hidden">
            <div className="mx-auto flex max-w-md items-center justify-between">
              {TABS.slice(0, 2).map((entry) => (
                <NavButton
                  key={entry.id}
                  active={tab === entry.id}
                  icon={entry.icon}
                  label={t(entry.labelKey)}
                  onClick={() => setTab(entry.id)}
                />
              ))}
              <button
                type="button"
                onClick={() => openNew()}
                aria-label={t("expense.newTitle")}
                className="flex size-12 -translate-y-3 items-center justify-center rounded-2xl bg-bronze text-ink"
              >
                <Plus className="size-5" />
              </button>
              {TABS.slice(2).map((entry) => (
                <NavButton
                  key={entry.id}
                  active={tab === entry.id}
                  icon={entry.icon}
                  label={t(entry.labelKey)}
                  onClick={() => setTab(entry.id)}
                />
              ))}
            </div>
          </nav>

          <ExpenseDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            initial={editing}
            defaultDate={draftDate}
            defaultCategory={draftCategory}
            incomes={incomes}
            onSubmit={handleSubmit}
            onAddIncome={handleIncomeSubmit}
            onDeleteIncome={handleDeleteIncome}
          />
        </div>
      );
    }

    function NavButton({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: typeof House;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-16 flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] transition-colors ${
        active ? "text-bronze" : "text-muted-foreground"
      }`}
    >
      <span
        className={`flex size-8 items-center justify-center rounded-lg ${
          active ? "bg-bronze/15" : "bg-transparent"
        }`}
      >
        <Icon className="size-4" />
      </span>
      <span className="line-clamp-1">{label}</span>
    </button>
  );
}
