import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { T, useLanguage } from "@/lib/i18n";

type Consent = {
  version: 1;
  analytics: boolean;
  savedAt: number;
  expiresAt: number;
};

const STORAGE_KEY = "vne-cookie-consent-v1";
const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<Consent>;
    if (
      value.version !== 1 ||
      typeof value.analytics !== "boolean" ||
      typeof value.expiresAt !== "number" ||
      value.expiresAt <= Date.now()
    ) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return value as Consent;
  } catch {
    return null;
  }
}

function saveConsent(analytics: boolean): Consent {
  const savedAt = Date.now();
  const consent: Consent = {
    version: 1,
    analytics,
    savedAt,
    expiresAt: savedAt + CONSENT_LIFETIME,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Without persistent storage, the choice remains valid for this page view only.
  }
  return consent;
}

export function CookieConsent() {
  const { t } = useLanguage();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    const openPreferences = () => setPreferencesOpen(true);
    window.addEventListener("vne:open-cookie-preferences", openPreferences);
    return () => window.removeEventListener("vne:open-cookie-preferences", openPreferences);
  }, []);

  function choose(analytics: boolean) {
    const wasEnabled = consent?.analytics === true;
    const next = saveConsent(analytics);
    setConsent(next);
    setPreferencesOpen(false);
    // A clean document guarantees that previously loaded measurement code cannot
    // continue collecting after consent is withdrawn.
    if (wasEnabled && !analytics) window.location.reload();
  }

  const analyticsEnabled = consent?.analytics === true && pathname !== "/solicitudes";

  return (
    <>
      {analyticsEnabled ? (
        <>
          <Analytics beforeSend={(event) => (event.url.includes("/solicitudes") ? null : event)} />
          <SpeedInsights />
        </>
      ) : null}

      {consent === null ? (
        <aside
          aria-label={t("Preferencias de cookies")}
          className="fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-card p-4 shadow-[0_-12px_40px_rgba(19,30,61,0.16)] dark:border-white/15 dark:bg-navy sm:p-6"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-lg font-semibold text-navy dark:text-cream">
                <T>Tu privacidad importa</T>
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-mist dark:text-cream/75">
                <T>
                  Usamos almacenamiento necesario para que el sitio funcione. La medición de
                  audiencia con Vercel Analytics y Speed Insights solo se activa si la autorizas.
                  Puedes aceptar, rechazar o cambiar tu decisión más adelante.
                </T>
              </p>
              <Link
                to="/legal/$slug"
                params={{ slug: "privacidad" }}
                className="mt-2 inline-flex text-sm font-semibold text-navy underline underline-offset-4 dark:text-gold"
              >
                <T>Leer política de privacidad y cookies</T>
              </Link>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                onClick={() => choose(true)}
                className="min-h-11 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream dark:bg-gold dark:text-navy"
              >
                <T>Aceptar</T>
              </button>
              <button
                type="button"
                onClick={() => choose(false)}
                className="min-h-11 rounded-full border border-navy/30 px-5 py-2.5 text-sm font-semibold text-navy dark:border-white/30 dark:text-cream"
              >
                <T>Rechazar</T>
              </button>
              <button
                type="button"
                onClick={() => setPreferencesOpen(true)}
                className="min-h-11 rounded-full px-4 py-2.5 text-sm font-semibold text-navy underline underline-offset-4 dark:text-gold"
              >
                <T>Configurar</T>
              </button>
            </div>
          </div>
        </aside>
      ) : null}

      {preferencesOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-navy/65 p-3 sm:items-center sm:p-6"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            className="w-full max-w-xl rounded-2xl border border-line bg-card p-5 shadow-2xl dark:border-white/15 dark:bg-navy sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <h2
                id="cookie-preferences-title"
                className="font-display text-2xl font-semibold text-navy dark:text-cream"
              >
                <T>Preferencias de cookies</T>
              </h2>
              <button
                type="button"
                onClick={() => setPreferencesOpen(false)}
                aria-label={t("Cerrar preferencias")}
                className="rounded-full px-3 py-1 text-xl text-navy hover:bg-navy/5 dark:text-cream dark:hover:bg-white/10"
              >
                ×
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-mist dark:text-cream/75">
              <T>
                Las tecnologías necesarias se utilizan para seguridad y funciones básicas. No
                pueden desactivarse desde este panel. Las analíticas son opcionales y permanecen
                desactivadas hasta que las aceptes.
              </T>
            </p>
            <div className="mt-5 rounded-xl border border-line p-4 dark:border-white/15">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-navy dark:text-cream">
                  <T>Necesarias</T>
                </h3>
                <span className="text-xs font-semibold text-forest dark:text-gold">
                  <T>Siempre activas</T>
                </span>
              </div>
              <p className="mt-1 text-sm text-mist dark:text-cream/70">
                <T>
                  Sesión segura del panel, protección contra envíos automatizados y preferencias
                  básicas de idioma, tema y consentimiento.
                </T>
              </p>
            </div>
            <div className="mt-3 rounded-xl border border-line p-4 dark:border-white/15">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-navy dark:text-cream">
                  <T>Analíticas opcionales</T>
                </h3>
                <span className="text-xs text-mist dark:text-cream/70">
                  {consent?.analytics ? t("Aceptadas") : t("No aceptadas")}
                </span>
              </div>
              <p className="mt-1 text-sm text-mist dark:text-cream/70">
                <T>
                  Vercel Analytics y Speed Insights ayudan a conocer el uso y el rendimiento del
                  sitio. Solo se cargan con tu autorización.
                </T>
              </p>
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => choose(false)}
                className="min-h-11 rounded-full border border-navy/30 px-5 py-2.5 text-sm font-semibold text-navy dark:border-white/30 dark:text-cream"
              >
                <T>Rechazar analíticas</T>
              </button>
              <button
                type="button"
                onClick={() => choose(true)}
                className="min-h-11 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream dark:bg-gold dark:text-navy"
              >
                <T>Guardar y aceptar analíticas</T>
              </button>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-mist dark:text-cream/65">
              <T>La decisión se conserva durante seis meses. Puedes modificarla desde el pie de página.</T>
            </p>
          </section>
        </div>
      ) : null}
    </>
  );
}
