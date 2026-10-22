import { useLanguage } from "@/hooks/use-language";
import { formatAriary, formatFullDay } from "@/lib/format";
import { useMemo } from "react";

export type HistoryRowData = {
  /** Stable key (localId of the expense or income). */
  id: string;
  kind: "expense" | "income";
  /** Local midnight of the day this entry belongs to. */
  date: number;
  /** Exact timestamp used for the HH:MM display and sorting. */
  time: number;
  label: string;
  category: string;
  amount: number;
};

function timeOf(timestamp: number): string {
  const d = new Date(timestamp);
  return `${`${d.getHours()}`.padStart(2, "0")}:${`${d.getMinutes()}`.padStart(2, "0")}`;
}

export function HistoryRow({
  data,
  onClick,
}: {
  data: HistoryRowData;
  onClick?: () => void;
}) {
  const { language } = useLanguage();
  const income = data.kind === "income";
  const signed = income ? "+" : "−";

  const content = (
    <div className="flex items-start gap-3">
      <span
        className={`mt-1.5 size-2 shrink-0 rounded-full ${
          income ? "bg-emerald-500" : "bg-bronze"
        }`}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-foreground">
          {data.label}
        </p>
        <p className="text-xs text-muted-foreground">
          {data.category} · {signed}
          {formatAriary(data.amount, language)}
        </p>
        <span className="mt-1 block text-[11px] text-muted-foreground">
          {formatFullDay(data.date, language)} ·{" "}
          <span className="tabular font-medium text-bronze">
            {timeOf(data.time)}
          </span>
        </span>
      </div>
      <span
        className={`tabular shrink-0 text-xs font-semibold ${
          income ? "text-emerald-600 dark:text-emerald-400" : "text-foreground/80"
        }`}
      >
        {signed}
        {formatAriary(data.amount, language)}
      </span>
    </div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full rounded-xl border border-border bg-card/50 p-3 text-left transition-colors hover:border-bronze/50"
      >
        {content}
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card/50 p-3">
      {content}
    </div>
  );
}

/** Newest first, using the exact timestamp within a day. */
export function useHistory(events: HistoryRowData[]): HistoryRowData[] {
  return useMemo(
    () =>
      [...events].sort(
        (a, b) => b.time - a.time || b.date - a.date || a.id.localeCompare(b.id),
      ),
    [events],
  );
}
