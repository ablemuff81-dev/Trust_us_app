import type { CategoryKey } from "@/lib/i18n";
import {
  Bus,
  CircleEllipsis,
  Coffee,
  GraduationCap,
  HeartPulse,
  Home,
  Receipt,
  ShoppingBag,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

type CategoryStyle = {
  icon: LucideIcon;
  /** Tailwind classes for the flat (never gradient) category chip. */
  chip: string;
};

export const CATEGORY_STYLES: Record<CategoryKey, CategoryStyle> = {
  food: { icon: UtensilsCrossed, chip: "bg-bronze/15 text-bronze" },
  transport: { icon: Bus, chip: "bg-rust/20 text-bronze" },
  housing: { icon: Home, chip: "bg-coffee/40 text-sand" },
  shopping: { icon: ShoppingBag, chip: "bg-rust/25 text-sand" },
  health: { icon: HeartPulse, chip: "bg-sand/15 text-sand" },
  family: { icon: Users, chip: "bg-bronze/20 text-bronze" },
  education: { icon: GraduationCap, chip: "bg-coffee/30 text-bronze" },
  bills: { icon: Receipt, chip: "bg-rust/15 text-bronze" },
  leisure: { icon: Coffee, chip: "bg-coffee/25 text-sand" },
  other: { icon: CircleEllipsis, chip: "bg-muted text-muted-foreground" },
};

/** Flat bar colours used by charts and budget tracks. */
export const CATEGORY_BARS: Record<CategoryKey, string> = {
  food: "bg-bronze",
  transport: "bg-rust",
  housing: "bg-coffee",
  shopping: "bg-bronze",
  health: "bg-sand",
  family: "bg-rust",
  education: "bg-bronze",
  bills: "bg-coffee",
  leisure: "bg-rust",
  other: "bg-muted-foreground",
};

export function CategoryMark({
  category,
  className = "size-10",
}: {
  category: CategoryKey;
  className?: string;
}) {
  const style = CATEGORY_STYLES[category] ?? CATEGORY_STYLES.other;
  const Icon = style.icon;
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-xl ${style.chip} ${className}`}
    >
      <Icon className="size-[55%]" strokeWidth={1.75} />
    </span>
  );
}
