import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-foreground"
    >
      <Logo size="lg" />
      <p className="tabular mt-6 text-5xl font-bold tracking-tight">404</p>
      <h1 className="mt-2 text-lg font-semibold">{t("app.name")}</h1>
      <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
        {t("app.tagline")}
      </p>
      <Button asChild className="mt-6 gap-2 bg-bronze text-ink hover:bg-bronze/90">
        <Link to="/">
          <ArrowLeft className="size-4" />
          {t("auth.backHome")}
        </Link>
      </Button>
      <footer className="mt-8 text-center text-[11px] text-muted-foreground">
        <p className="font-medium text-foreground">{t("footer.copyright")}</p>
        <p className="mt-1">{t("footer.madeIn")}</p>
      </footer>
    </motion.main>
  );
}
