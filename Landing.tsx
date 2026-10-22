import { CategoryMark } from "@/components/CategoryMark";
import { LanguageMenu } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { formatAriary } from "@/lib/format";
import { CATEGORIES, type CategoryKey, type TranslationKey } from "@/lib/i18n";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  ChartPie,
  HardDrive,
  Eye,
  Languages,
  Plus,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

const SAMPLE_TOTAL = 2480000;
const SAMPLE_MONTH = 615000;
const SAMPLE_TODAY = 84000;

const BREAKDOWN: Array<[CategoryKey, number]> = [
  ["food", 240000],
  ["transport", 132000],
  ["bills", 98000],
];

const SAMPLE_ROWS: Array<{ category: CategoryKey; note: string; amount: number; day: string }> = [
  { category: "food", note: "Gargotte Analakely", amount: 24000, day: "12" },
  { category: "transport", note: "Taxi-be Behoririka", amount: 12000, day: "12" },
  { category: "bills", note: "JIRAMA prépayé", amount: 65000, day: "11" },
  { category: "shopping", note: "Marché Andravoahangy", amount: 48000, day: "10" },
];

function PhoneFrame({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="w-[260px] shrink-0 rounded-[2rem] border border-border bg-card p-2.5 shadow-none">
      <div className="mb-2 flex items-center justify-between px-2 pt-1">
        <span className="text-[10px] font-semibold tracking-wide text-muted-foreground">19:27</span>
        <span className="h-1.5 w-14 rounded-full bg-muted" />
        <span className="text-[10px] font-semibold tracking-wide text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="rounded-[1.6rem] bg-background p-3">{children}</div>
    </div>
  );
}

function HeroPhone() {
  const { t, language } = useLanguage();
  return (
    <PhoneFrame label={t("landing.mock.balance")}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-rust text-[10px] font-bold text-sand">
            JS
          </span>
          <div>
            <p className="text-[9px] text-muted-foreground">{t("home.welcomeBack")}</p>
            <p className="text-[11px] font-semibold text-foreground">Jennifer Smith</p>
          </div>
        </div>
        <span className="flex size-7 items-center justify-center rounded-full border border-border text-muted-foreground">
          <Plus className="size-3.5" />
        </span>
      </div>

      <p className="mt-3 text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
        {t("home.totalBalance")}
      </p>
      <div className="flex items-center gap-2">
        <p className="tabular text-xl font-bold text-foreground">
          {formatAriary(SAMPLE_TOTAL, language)}
        </p>
        <Eye className="size-3.5 text-muted-foreground" />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-sand p-2 text-ink">
          <p className="text-[8px] font-semibold uppercase tracking-wider text-ink/60">
            {t("home.thisMonth")}
          </p>
          <p className="tabular mt-1 text-[11px] font-bold">{formatAriary(SAMPLE_MONTH, language)}</p>
          <div className="mt-2 flex gap-0.5">
            {CATEGORIES.slice(0, 4).map((category) => (
              <CategoryMark key={category} category={category} className="size-5 rounded-md" />
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-rust p-2 text-sand">
          <p className="text-[8px] font-semibold uppercase tracking-wider text-sand/70">
            {t("home.todaySpend")}
          </p>
          <p className="tabular mt-1 text-[11px] font-bold">{formatAriary(SAMPLE_TODAY, language)}</p>
          <p className="mt-2 text-[8px] text-sand/70">{t("nav.calendar")} →</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-[10px] font-semibold text-foreground">{t("home.quickAdd")}</p>
        <p className="text-[8px] text-bronze">{t("common.viewAll")}</p>
      </div>
      <div className="mt-2 flex gap-2">
        {CATEGORIES.slice(0, 4).map((category) => (
          <CategoryMark key={category} category={category} className="size-9 rounded-lg" />
        ))}
        <span className="flex size-9 items-center justify-center rounded-lg border border-dashed border-bronze/60 text-bronze">
          <Plus className="size-3.5" />
        </span>
      </div>

      <p className="mt-3 text-[10px] font-semibold text-foreground">{t("home.recent")}</p>
      <ul className="mt-2 flex flex-col gap-1.5">
        {SAMPLE_ROWS.map((row) => (
          <li
            key={row.note}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-2 py-1.5"
          >
            <CategoryMark category={row.category} className="size-6 rounded-md" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[9px] font-medium text-foreground">{row.note}</p>
              <p className="text-[8px] text-muted-foreground">
                {row.day} · {t(`category.${row.category}` as const)}
              </p>
            </div>
            <span className="tabular text-[9px] font-semibold text-bronze">
              −{formatAriary(row.amount, language)}
            </span>
          </li>
        ))}
      </ul>
    </PhoneFrame>
  );
}

function CalendarPhone() {
  const { t, language } = useLanguage();
  const days = Array.from({ length: 30 }, (_, index) => index + 1);
  const spend = (day: number) => (day * 37) % 90;

  return (
    <PhoneFrame label={t("nav.calendar")}>
      <p className="text-[11px] font-semibold text-foreground">{t("calendar.title")}</p>
      <p className="text-[8px] text-muted-foreground">{t("calendar.subtitle")}</p>
      <div className="mt-3 grid grid-cols-7 gap-1">
        {days.map((day) => {
          const level = spend(day);
          const tone = level > 70 ? "bg-bronze/40" : level > 40 ? "bg-bronze/25" : "bg-bronze/10";
          return (
            <span
              key={day}
              className={`flex h-6 items-center justify-center rounded-md text-[8px] font-medium text-foreground ${
                day % 11 === 0 ? "border border-bronze" : tone
              }`}
            >
              {day}
            </span>
          );
        })}
      </div>
      <div className="mt-3 rounded-xl bg-bronze px-2 py-1.5 text-ink">
        <p className="text-[8px] font-semibold uppercase tracking-wider">
          {t("calendar.busiest")}
        </p>
        <p className="tabular text-[11px] font-bold">{formatAriary(384000, language)}</p>
      </div>
      <div className="mt-2 rounded-xl border border-border bg-card px-2 py-1.5">
        <p className="text-[9px] font-semibold text-foreground">{t("calendar.multiSelect")}</p>
        <p className="text-[8px] text-muted-foreground">{t("calendar.selected", { count: 3 })}</p>
      </div>
    </PhoneFrame>
  );
}

function StatementPhone() {
  const { t, language } = useLanguage();
  const bars = [38, 52, 30, 74, 46, 88, 60, 42, 70, 34, 56, 92];

  return (
    <PhoneFrame label={t("nav.report")}>
      <p className="text-[11px] font-semibold text-foreground">{t("report.title")}</p>
      <p className="text-[8px] text-muted-foreground">{t("report.subtitle")}</p>
      <p className="tabular mt-3 text-lg font-bold text-foreground">
        {formatAriary(SAMPLE_TOTAL, language)}
      </p>
      <div className="mt-1 flex gap-1">
        <span className="rounded-md bg-bronze px-1.5 py-0.5 text-[8px] font-semibold text-ink">
          {t("landing.mock.income")}
        </span>
        <span className="rounded-md border border-border px-1.5 py-0.5 text-[8px] text-muted-foreground">
          {t("landing.mock.expenses")}
        </span>
      </div>
      <div className="mt-3 flex h-20 items-end gap-1">
        {bars.map((height, index) => (
          <span
            key={index}
            className={`flex-1 rounded-sm ${index === 11 ? "bg-sand" : "bg-bronze/70"}`}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-col gap-1.5">
        {BREAKDOWN.map(([category, amount]) => (
          <div key={category} className="flex items-center gap-2">
            <CategoryMark category={category} className="size-6 rounded-md" />
            <span className="flex-1 text-[9px] text-foreground">
              {t(`category.${category}` as const)}
            </span>
            <span className="tabular text-[9px] font-semibold text-bronze">
              {formatAriary(amount, language)}
            </span>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

export default function Landing() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${t("app.name")} — ${t("app.tagline")}`;
  }, [t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <Logo size="md" />
            <span className="text-sm font-semibold tracking-tight">{t("app.name")}</span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageMenu />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="hidden border-border bg-card/60 sm:inline-flex"
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
            >
              {isAuthenticated ? t("nav.home") : t("settings.signIn")}
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 pt-12 sm:px-6 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_auto]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t("landing.title")}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("landing.subtitle")}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                type="button"
                size="lg"
                className="gap-2 bg-bronze text-ink hover:bg-bronze/90"
                onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
              >
                {t("landing.primaryCta")}
                <ArrowRight className="size-4" />
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="border-border bg-transparent"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t("landing.secondaryCta")}
              </Button>
            </div>

            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-bronze" />
              {t("landing.trustLine")}
            </p>

            <dl className="mt-9 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                [t("landing.stats.currency"), t("app.currency")],
                [t("landing.stats.languages"), "5"],
                [t("landing.stats.storage"), t("landing.stats.storageValue")],
                [t("landing.stats.sync"), t("landing.stats.syncValue")],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-border bg-card px-3 py-2.5">
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center lg:justify-end"
          >
            <HeroPhone />
          </motion.div>
        </div>
      </section>

      <section className="border-y border-border bg-card/40 py-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("home.totalBalance")} · {t("nav.calendar")} · {t("nav.report")}
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
              {t("landing.featuresSubtitle")}
            </p>
          </div>

          <div className="mt-10 flex snap-x gap-6 overflow-x-auto pb-4 lg:justify-center">
            <div className="snap-center">
              <HeroPhone />
            </div>
            <div className="snap-center">
              <CalendarPhone />
            </div>
            <div className="snap-center">
              <StatementPhone />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("landing.featuresTitle")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t("landing.featuresSubtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <motion.article
              key={feature.titleKey}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-border bg-card p-5"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-coffee/40 text-bronze">
                <feature.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {t(feature.titleKey)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(feature.bodyKey)}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="how" className="border-t border-border bg-card/40 py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("landing.stepsTitle")}
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <div key={step.titleKey} className="rounded-3xl border border-border bg-background p-5">
                <span className="flex size-9 items-center justify-center rounded-xl bg-bronze text-sm font-bold text-ink">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {t(step.titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(step.bodyKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10 sm:py-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-12">
          {/* Left: brand, tagline, then the product meta line underneath. */}
          <div className="flex flex-col items-center gap-2.5 md:items-start">
            <div className="flex items-center gap-3">
              <Logo size="sm" />
              <p className="text-sm font-medium text-foreground">
                {t("landing.footerRights")}
              </p>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground md:pl-[44px]">
              {t("app.name")} · {t("landing.stats.currency")} {t("app.currency")} ·{" "}
              {t("landing.stats.languages")} 5
            </p>
          </div>

          {/* Right: the full copyright notice, then the product note. */}
          <div className="flex flex-col items-center gap-1.5 md:items-end md:text-right">
            <p className="max-w-md text-xs font-medium text-foreground">
              {t("footer.copyright")}
            </p>
            <p className="max-w-md text-[11px] leading-relaxed text-muted-foreground">
              {t("footer.madeIn")} {t("footer.note")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FEATURES: Array<{
  icon: typeof CalendarDays;
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
}> = [
  { icon: CalendarDays, titleKey: "landing.feature.calendar.title", bodyKey: "landing.feature.calendar.body" },
  { icon: ChartPie, titleKey: "landing.feature.report.title", bodyKey: "landing.feature.report.body" },
  { icon: UserRound, titleKey: "landing.feature.auth.title", bodyKey: "landing.feature.auth.body" },
  { icon: HardDrive, titleKey: "landing.feature.sync.title", bodyKey: "landing.feature.sync.body" },
  { icon: CalendarCheck, titleKey: "landing.feature.multi.title", bodyKey: "landing.feature.multi.body" },
  { icon: Languages, titleKey: "landing.feature.language.title", bodyKey: "landing.feature.language.body" },
];

const STEPS: Array<{ titleKey: TranslationKey; bodyKey: TranslationKey }> = [
  { titleKey: "landing.step1.title", bodyKey: "landing.step1.body" },
  { titleKey: "landing.step2.title", bodyKey: "landing.step2.body" },
  { titleKey: "landing.step3.title", bodyKey: "landing.step3.body" },
];
