import { LanguageMenu } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { ArrowLeft, ArrowRight, Check, Loader2, Mail, UserX } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

interface AuthProps {
  redirectAfterAuth?: string;
}

function resolveRedirectAfterAuth(
  returnTo: string | null,
  fallback = "/dashboard",
) {
  if (returnTo?.startsWith("/") && !returnTo.startsWith("//")) {
    return returnTo;
  }
  return fallback;
}

function Auth({ redirectAfterAuth }: AuthProps = {}) {
  const { isLoading: authLoading, isAuthenticated, signIn } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = resolveRedirectAfterAuth(
    searchParams.get("returnTo"),
    redirectAfterAuth,
  );
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(redirect);
    }
  }, [authLoading, isAuthenticated, navigate, redirect]);

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      setStep({ email: formData.get("email") as string });
      setIsLoading(false);
    } catch (error) {
      console.error("Email sign-in error:", error);
      setError(
        error instanceof Error
          ? error.message
          : t("auth.errorEmail"),
      );
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      navigate(redirect);
    } catch (error) {
      console.error("OTP verification error:", error);
      setError(t("auth.errorCode"));
      setIsLoading(false);
      setOtp("");
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn("anonymous");
      navigate(redirect);
    } catch (error) {
      console.error("Guest login error:", error);
      setError(
        `${t("auth.guest")}: ${error instanceof Error ? error.message : "unknown error"}`,
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo size="md" />
          <span className="text-sm font-semibold tracking-tight">{t("app.name")}</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageMenu />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="size-3.5" />
            {t("auth.backHome")}
          </Button>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-16 pt-6 sm:px-6 lg:grid-cols-2 lg:items-center lg:pt-12">
        <section className="hidden flex-col gap-5 lg:flex">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-bronze/40 bg-coffee/30 px-3 py-1 text-[11px] font-medium text-bronze">
            {t("landing.badge")}
          </span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            {t("landing.title")}
          </h1>
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            {t("landing.subtitle")}
          </p>
          <ul className="mt-2 flex flex-col gap-2">
            {[
              t("landing.feature.auth.body"),
              t("landing.feature.sync.body"),
              t("landing.feature.multi.body"),
            ].map((item) => (
              <li key={item} className="flex max-w-lg items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-bronze" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex justify-center lg:justify-end">
          <Card className="w-full max-w-md border-border bg-card shadow-none">
            {step === "signIn" ? (
              <>
                <CardHeader>
                  <CardTitle className="text-2xl">{t("auth.title")}</CardTitle>
                  <CardDescription>{t("auth.subtitle")}</CardDescription>
                </CardHeader>
                <form onSubmit={handleEmailSubmit}>
                  <CardContent className="flex flex-col gap-3">
                    <label
                      htmlFor="auth-email"
                      className="text-xs uppercase tracking-wide text-muted-foreground"
                    >
                      {t("auth.emailLabel")}
                    </label>
                    <div className="relative flex items-center gap-2">
                      <div className="relative flex-1">
                        <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="auth-email"
                          name="email"
                          placeholder={t("auth.emailPlaceholder")}
                          type="email"
                          className="bg-background pl-9"
                          disabled={isLoading}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="gap-1.5 bg-bronze text-ink hover:bg-bronze/90"
                      >
                        {isLoading ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <>
                            {t("auth.continue")}
                            <ArrowRight className="size-4" />
                          </>
                        )}
                      </Button>
                    </div>
                    {error ? <p className="text-sm text-destructive">{error}</p> : null}

                    <div className="relative my-2">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
                        <span className="bg-card px-2 text-muted-foreground">
                          {t("auth.or")}
                        </span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full gap-2 border-border bg-background"
                      onClick={handleGuestLogin}
                      disabled={isLoading}
                    >
                      <UserX className="size-4" />
                      {t("auth.guest")}
                    </Button>
                  </CardContent>
                </form>
              </>
            ) : (
              <>
                <CardHeader>
                  <CardTitle className="text-2xl">{t("auth.verifyTitle")}</CardTitle>
                  <CardDescription>
                    {t("auth.verifySubtitle").replace("{email}", step.email)}
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleOtpSubmit}>
                  <CardContent className="flex flex-col items-center gap-4">
                    <input type="hidden" name="email" value={step.email} />
                    <input type="hidden" name="code" value={otp} />

                    <InputOTP
                      value={otp}
                      onChange={setOtp}
                      maxLength={6}
                      disabled={isLoading}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && otp.length === 6 && !isLoading) {
                          const form = (event.target as HTMLElement).closest("form");
                          form?.requestSubmit();
                        }
                      }}
                    >
                      <InputOTPGroup>
                        {Array.from({ length: 6 }).map((_, index) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>

                    {error ? <p className="text-sm text-destructive">{error}</p> : null}
                    <button
                      type="button"
                      onClick={() => setStep("signIn")}
                      className="text-xs text-bronze underline-offset-4 hover:underline"
                    >
                      {t("auth.useDifferent")}
                    </button>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Button
                      type="submit"
                      className="w-full gap-2 bg-bronze text-ink hover:bg-bronze/90"
                      disabled={isLoading || otp.length !== 6}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          {t("auth.verifying")}
                        </>
                      ) : (
                        <>
                          {t("auth.verify")}
                          <ArrowRight className="size-4" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </>
            )}

            <div className="border-t border-border px-6 py-4 text-center text-[11px] text-muted-foreground">
              <p className="font-medium text-foreground">{t("footer.copyright")}</p>
              <p className="mt-1">{t("footer.madeIn")}</p>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}

export default function AuthPage(props: AuthProps) {
  return (
    <Suspense>
      <Auth {...props} />
    </Suspense>
  );
}
