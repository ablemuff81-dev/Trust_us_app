import { MOBILE_MONEY_OPERATORS, type MobileMoneyId } from "@/lib/mobile-money";
import { useLanguage } from "@/hooks/use-language";
import { Switch } from "@/components/ui/switch";
import { Smartphone } from "lucide-react";

export function MobileMoneyPanel({
  links,
  onChange,
}: {
  links: Record<MobileMoneyId, boolean>;
  onChange: (id: MobileMoneyId, linked: boolean) => void;
}) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-2">
      {MOBILE_MONEY_OPERATORS.map((operator) => {
        const linked = links[operator.id];
        return (
          <div
            key={operator.id}
            className="flex items-center gap-3 rounded-2xl bg-background px-3 py-2.5"
          >
            <span
              className="flex size-9 items-center justify-center rounded-xl text-[11px] font-bold text-white"
              style={{ backgroundColor: operator.accent }}
            >
              <Smartphone className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">
                {operator.label}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {linked
                  ? t("settings.mobileMoney.linked")
                  : t("settings.mobileMoney.notLinked")}
              </p>
            </div>
            <Switch
              checked={linked}
              onCheckedChange={(checked) => onChange(operator.id, checked)}
              aria-label={operator.label}
            />
          </div>
        );
      })}
      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
        {t("settings.mobileMoneyHint")}
      </p>
    </div>
  );
}
