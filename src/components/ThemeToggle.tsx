import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      onClick={toggleTheme}
      className={`border-border bg-card/60 ${className}`}
    >
      {dark ? (
        <Sun className="size-4 text-bronze" />
      ) : (
        <Moon className="size-4 text-bronze" />
      )}
    </Button>
  );
}
