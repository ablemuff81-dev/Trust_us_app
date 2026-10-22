import { LanguageGrid } from "@/components/LanguageSwitcher";
import { MobileMoneyPanel } from "@/components/dashboard/MobileMoneyPanel";
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
import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "@/hooks/use-theme";
import {
  type MobileMoneyId,
  readLinks,
  writeLinks,
  type MobileMoneyLinks,
} from "@/lib/mobile-money";
import { Database, HardDrive, LogIn, LogOut, Moon, Save, Sun, Trash2, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export function SettingsTab({
  userName,
  isAuthenticated,
  expenseCount,
  onSignOut,
  onClearLocal,
}: {
  userName: string;
  isAuthenticated: boolean;
  expenseCount: number;
  onSignOut: () => void;
  onClearLocal: () => void;
}) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [moneyLinks, setMoneyLinks] = useState<MobileMoneyLinks>(readLinks);

  const handleMoneyLink = (id: MobileMoneyId, linked: boolean) => {
    setMoneyLinks((current) => {
      const next = { ...current, [id]: linked };
      writeLinks(next);
      return next;
    });
  };

  const syncLabel = t("home.sync.local");

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-foreground">{t("settings.title")}</h1>
        <p className="text-xs text-muted-foreground">{t("settings.subtitle")}</p>
      </header>

      <section className="rounded-3xl border border-border bg-card p-4">
        <h2 className="mb-3 text-sm font-semibold text-foreground">{t("settings.language")}</h2>
        <LanguageGrid />
        <p className="mt-3 text-[11px] text-muted-foreground">{t("settings.languageHint")}</p>
      </section>

      <section className="rounded-3xl border border-border bg-card p-4">
        <h2 className="mb-3 text-sm font-semibold text-foreground">
          {t("settings.appearance")}
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
              theme === "light"
                ? "border-bronze bg-bronze/15 text-foreground"
                : "border-border bg-card text-muted-foreground hover:border-bronze/50 hover:text-foreground"
            }`}
          >
            <Sun className="size-4 text-bronze" />
            {t("settings.appearance.light")}
          </button>
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
              theme === "dark"
                ? "border-bronze bg-bronze/15 text-foreground"
                : "border-border bg-card text-muted-foreground hover:border-bronze/50 hover:text-foreground"
            }`}
          >
            <Moon className="size-4 text-bronze" />
            {t("settings.appearance.dark")}
          </button>
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">
          {t("settings.appearanceHint")}
        </p>
      </section>

      <section className="rounded-3xl border border-border bg-card p-4">
        <h2 className="mb-3 text-sm font-semibold text-foreground">
          {t("settings.mobileMoney")}
        </h2>
        <MobileMoneyPanel links={moneyLinks} onChange={handleMoneyLink} />
      </section>

      <section className="rounded-3xl border border-border bg-card p-4">
        <h2 className="mb-3 text-sm font-semibold text-foreground">{t("settings.account")}</h2>
        <div className="flex items-center gap-3 rounded-2xl bg-background p-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-coffee/40 text-sand">
            <User className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {isAuthenticated ? t("settings.signedInAs", { name: userName }) : t("settings.guest")}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {isAuthenticated ? syncLabel : t("settings.guestHint")}
            </p>
          </div>
        </div>
        <div className="mt-3">
          {isAuthenticated ? (
            <Button
              type="button"
              variant="outline"
              className="w-full gap-2 border-border bg-background"
              onClick={onSignOut}
            >
              <LogOut className="size-4" />
              {t("settings.signOut")}
            </Button>
          ) : (
            <Button
              type="button"
              className="w-full gap-2 bg-bronze text-ink hover:bg-bronze/90"
              onClick={() => navigate("/auth?returnTo=%2Fdashboard")}
            >
              <LogIn className="size-4" />
              {t("settings.signIn")}
            </Button>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card p-4">
        <h2 className="mb-3 text-sm font-semibold text-foreground">{t("settings.data")}</h2>
        <ul className="flex flex-col gap-2">
          <Row
            icon={<Save className="size-4 text-bronze" />}
            label={t("settings.backup")}
            value={syncLabel}
          />
          <Row
            icon={<HardDrive className="size-4 text-bronze" />}
            label={t("settings.storage")}
            value={t("settings.storageValue", { count: expenseCount })}
          />
          <Row
            icon={<Database className="size-4 text-bronze" />}
            label={t("app.currency")}
            value={`${t("app.name")} · ${t("landing.stats.storageValue")}`}
          />
        </ul>

        <Button
          type="button"
          variant="outline"
          className="mt-3 w-full gap-2 border-destructive/60 bg-background text-destructive hover:bg-destructive/10"
          onClick={() => setConfirmOpen(true)}
        >
          <Trash2 className="size-4" />
          {t("settings.clearData")}
        </Button>
      </section>

      <section className="rounded-3xl border border-border bg-card p-4">
        <h2 className="mb-2 text-sm font-semibold text-foreground">{t("settings.aboutTitle")}</h2>
        <p className="text-xs leading-relaxed text-muted-foreground">{t("settings.aboutBody")}</p>
        <div className="mt-3 border-t border-border pt-3">
          <p className="text-[11px] font-medium text-foreground">
            {t("footer.copyright")}
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            {t("footer.madeIn")}
          </p>
        </div>
      </section>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="border-border bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("settings.clearTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("settings.clearBody", { count: expenseCount })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-foreground hover:bg-destructive/90"
              onClick={onClearLocal}
            >
              {t("settings.clearConfirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-center gap-3 rounded-2xl bg-background px-3 py-2.5">
      <span className="flex size-8 items-center justify-center rounded-lg bg-muted/60">
        {icon}
      </span>
      <span className="flex-1 text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="max-w-[52%] truncate text-right text-xs font-medium text-foreground">
        {value}
      </span>
    </li>
  );
}
