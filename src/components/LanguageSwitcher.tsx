import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/hooks/use-language";
import { Check, Globe } from "lucide-react";

export function LanguageMenu({ className = "" }: { className?: string }) {
  const { language, setLanguage, languages } = useLanguage();
  const current = languages.find((entry) => entry.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={`gap-2 border-border bg-card/60 font-medium ${className}`}
        >
          <Globe className="size-4 text-bronze" />            {current?.code ?? "EN"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {languages.map((entry) => (
          <DropdownMenuItem
            key={entry.code}
            onSelect={() => setLanguage(entry.code)}
            className="flex items-center justify-between"
          >
            <span>{entry.label}</span>              {entry.code === language ? (
              <Check className="size-4 text-bronze" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LanguageGrid() {
  const { language, setLanguage, languages } = useLanguage();

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {languages.map((entry) => {
        const active = entry.code === language;
        return (
          <button
            key={entry.code}
            type="button"
            onClick={() => setLanguage(entry.code)}
            className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
              active
                ? "border-bronze bg-bronze/15 text-foreground"
                : "border-border bg-card text-muted-foreground hover:border-bronze/50 hover:text-foreground"
            }`}
          >
            <span className="font-medium">{entry.label}</span>
            <span
              className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold tracking-wider ${
                active ? "bg-bronze text-ink" : "bg-muted text-muted-foreground"
              }`}
            >
              {entry.code}
            </span>
          </button>
        );
      })}
    </div>
  );
}
