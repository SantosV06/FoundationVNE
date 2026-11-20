import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Home, RefreshCw } from "lucide-react";

type ErrorPageProps = {
  code: string;
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  actionLabel: ReactNode;
  onRetry?: () => void;
  retryLabel?: ReactNode;
  teapot?: boolean;
};

export function ErrorPage({
  code,
  eyebrow,
  title,
  description,
  actionLabel,
  onRetry,
  retryLabel,
  teapot = false,
}: ErrorPageProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-paper px-5 py-16 text-navy dark:bg-navy-deep dark:text-cream">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-40 size-96 rounded-full bg-gold/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -right-32 size-[30rem] rounded-full bg-forest/10 blur-3xl" />
      <section className="relative mx-auto grid w-full max-w-5xl items-center gap-10 rounded-[2rem] border border-line bg-card/90 p-7 shadow-2xl shadow-navy/5 backdrop-blur sm:p-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16 dark:border-white/10 dark:bg-navy">
        <div className="order-2 lg:order-1">
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[0.28em] text-gold-deep uppercase dark:text-gold">
            <span className="h-px w-8 bg-gold" />
            {eyebrow}
          </p>
          <p className="mt-7 font-display text-[clamp(5rem,13vw,9rem)] leading-[0.8] font-medium tracking-[-0.07em] text-navy/10 dark:text-cream/10">
            {code}
          </p>
          <h1 className="mt-6 max-w-xl font-display text-4xl leading-tight tracking-tight text-navy sm:text-5xl dark:text-cream">
            {title}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-8 text-mist dark:text-cream/70">
            {description}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              search={(previous) => previous}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-cream transition hover:-translate-y-0.5 hover:bg-forest dark:bg-gold dark:text-navy dark:hover:bg-[#d4b77f]"
            >
              <Home className="size-4" aria-hidden="true" />
              {actionLabel}
            </Link>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-navy transition hover:bg-paper dark:border-white/15 dark:text-cream dark:hover:bg-white/5"
              >
                <RefreshCw className="size-4" aria-hidden="true" />
                {retryLabel}
              </button>
            )}
          </div>
          <Link
            to="/"
            search={(previous) => previous}
            className="mt-8 inline-flex items-center gap-2 text-xs font-semibold text-mist transition hover:text-gold-deep dark:text-cream/50 dark:hover:text-gold"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Fundación Venezuela Nueva Esperanza
          </Link>
        </div>
        <div className="order-1 flex min-h-52 items-center justify-center lg:order-2 lg:min-h-80">
          {teapot ? (
            <div className="relative flex h-64 w-64 items-center justify-center" role="img" aria-label="Ilustración de una tetera">
              <div className="absolute right-4 top-16 h-20 w-16 rounded-r-full border-[10px] border-gold/70" />
              <div className="absolute left-5 top-24 h-10 w-10 rounded-full border-[9px] border-gold/70" />
              <div className="absolute bottom-10 left-1/2 h-5 w-36 -translate-x-1/2 rounded-full bg-navy/10 dark:bg-black/20" />
              <div className="relative z-10 h-32 w-40 rounded-[2.5rem_2.5rem_3rem_3rem] border-4 border-gold bg-gradient-to-br from-[#f1dfbd] to-[#c59a55] shadow-xl shadow-navy/15">
                <div className="absolute -top-5 left-1/2 h-6 w-16 -translate-x-1/2 rounded-t-full border-4 border-gold bg-[#d7b477]" />
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy/70" />
                <div className="absolute -bottom-3 left-1/2 h-3 w-24 -translate-x-1/2 rounded-full bg-[#b78b4b]" />
              </div>
              <span className="absolute right-3 top-3 font-display text-4xl text-gold">?</span>
              <span className="absolute left-2 top-8 text-xs font-bold tracking-[0.2em] text-gold-deep uppercase dark:text-gold">418</span>
            </div>
          ) : (
            <div className="relative flex size-64 items-center justify-center rounded-full border border-gold/25 bg-gradient-to-br from-gold/10 to-forest/5 sm:size-80">
              <div className="absolute inset-5 rounded-full border border-dashed border-gold/40" />
              <div className="flex size-40 items-center justify-center rounded-full bg-navy text-cream shadow-2xl shadow-navy/20 sm:size-48 dark:bg-forest">
                <span className="font-display text-7xl tracking-tight text-gold">{code}</span>
              </div>
              <span className="absolute right-5 top-10 size-3 rounded-full bg-gold" />
              <span className="absolute bottom-8 left-8 size-2 rounded-full bg-forest dark:bg-gold" />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
