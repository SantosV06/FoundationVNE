import { T, useLanguage } from "@/lib/i18n";
import { LanguageSelector } from "./language-selector";
import { Link } from "@tanstack/react-router";
import { Mail, Menu, Moon, Phone, Sun } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { legalLinks, nav, org } from "@/data/site";
import { media } from "@/data/media";

function Mark({ className = "h-10 w-auto" }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <img
      src="/favicon.svg?v=4"
      alt={t("Emblema del árbol de Fundación VNE")}
      className={`shrink-0 object-contain ${className}`}
      width={46}
      height={40}
    />
  );
}

function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("vne-theme", next ? "dark" : "light");
    } catch {

    }
    setDark(next);
  }

  return { dark, toggle };
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-gold focus:px-3 focus:py-2 focus:text-navy"
      >
        <T>Saltar al contenido</T>
      </a>
      <Header />
      <main id="contenido">{children}</main>
      <Footer />
    </div>
  );
}

function Header() {
  const { t } = useLanguage();
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const closeMenuOnScroll = () => {
      const menu = document.getElementById("menu");
      if (menu?.matches(":popover-open")) menu.hidePopover();
    };

    window.addEventListener("scroll", closeMenuOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", closeMenuOnScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md dark:border-white/10 dark:bg-navy-deep/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:gap-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" >
          <Mark />
          <span className="min-w-0 leading-tight">
            <span className="block font-display text-sm sm:text-[15px] font-semibold tracking-tight text-navy dark:text-cream">
              <T>Fundación VNE</T>
            </span>
            <span className="hidden text-xs text-mist sm:block dark:text-cream/70">
              <T>Venezuela Nueva Esperanza</T>
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 xl:flex" aria-label={t("Principal")}>
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-full px-2.5 py-2 text-sm font-semibold"
              inactiveProps={{
                className: "text-navy/80 hover:bg-navy/5 dark:text-cream/80 dark:hover:bg-white/10",
              }}
              activeProps={{
                className:
                  "bg-navy text-cream hover:bg-navy-mid dark:bg-gold dark:text-navy dark:hover:bg-gold",
              }}
            >
              <T>{item.label}</T>
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 xl:ml-3">
          <LanguageSelector />
          <button
            type="button"
            onClick={toggle}
            aria-label={t(dark ? "Usar tema claro" : "Usar tema oscuro")}
            className="grid size-11 place-items-center rounded-full text-navy hover:bg-navy/5 dark:text-cream dark:hover:bg-white/10"
          >
            {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <Link
            to="/donaciones"
            className="hidden h-11 items-center rounded-full bg-navy px-4 text-sm font-semibold text-cream sm:inline-flex dark:bg-gold dark:text-navy"
          >
            <T>Donar</T>
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-navy xl:hidden dark:text-cream"
            popoverTarget="menu"
            aria-controls="menu"
          >
            <Menu className="size-5" />
            <span className="sr-only">
              <T>Menú</T>
            </span>
          </button>
        </div>
      </div>

      <nav
          id="menu"
          popover="auto"
          className="border-t border-line bg-paper px-4 py-3 xl:hidden dark:border-white/10 dark:bg-navy-deep"
          aria-label={t("Móvil")}
        >
          <ul className="grid gap-1">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={(event) => event.currentTarget.closest("nav")?.hidePopover()}
                  className="block rounded-lg px-3 py-3 text-base font-semibold"
                  inactiveProps={{
                    className: "text-navy hover:bg-navy/5 dark:text-cream dark:hover:bg-white/10",
                  }}
                  activeProps={{
                    className:
                      "bg-navy text-cream hover:bg-navy-mid dark:bg-gold dark:text-navy dark:hover:bg-gold",
                  }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  <T>{item.label}</T>
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/donaciones"
                onClick={(event) => event.currentTarget.closest("nav")?.hidePopover()}
                className="mt-1 block rounded-lg bg-navy px-3 py-3 text-center text-base font-semibold text-cream dark:bg-gold dark:text-navy"
              >
                <T>Donar</T>
              </Link>
            </li>
          </ul>
      </nav>
    </header>
  );
}

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mt-20 bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <h2 className="font-display text-lg text-gold">
            <T>Contacto</T>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-cream/80">
            <T>Administración y atención</T>
          </p>
          <a
            className="mt-1 inline-flex items-center gap-2 text-sm font-semibold"
            href={`tel:${org.adminTel}`}
          >
            <Phone className="size-4 text-gold" aria-hidden="true" />
            <T>{org.adminPhone}</T>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-cream/80">
            <T>Oficina ejecutiva</T>
          </p>
          <a
            className="mt-1 inline-flex items-center gap-2 text-sm font-semibold"
            href={`tel:${org.executiveTel}`}
          >
            <Phone className="size-4 text-gold" aria-hidden="true" />
            <T>{org.executivePhone}</T>
          </a>
          <a className="mt-4 flex w-fit max-w-full items-center gap-2 break-all text-sm font-semibold underline-offset-4 hover:underline" href={"mailto:" + org.email}>
            <Mail className="size-4 shrink-0 text-gold" aria-hidden="true" />
            <T>{org.email}</T>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-cream/80"><T>Soporte técnico</T></p>
          <a className="mt-1 inline-flex max-w-full break-all text-sm font-semibold underline-offset-4 hover:underline" href={"mailto:" + org.supportEmail}>
            <Mail className="mr-2 size-4 shrink-0 text-gold" aria-hidden="true" />
            <T>{org.supportEmail}</T>
          </a>
          <div className="mt-5 flex gap-2">
            <a
              href={org.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label={t("Instagram de Fundación VNE")}
              className="grid size-11 place-items-center rounded-full border border-gold/50"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="instagram-brand-gradient" x1="3" y1="21" x2="21" y2="3">
                    <stop offset="0%" stopColor="#FEDA75" />
                    <stop offset="48%" stopColor="#D62976" />
                    <stop offset="100%" stopColor="#4F5BD5" />
                  </linearGradient>
                </defs>
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5.2"
                  stroke="url(#instagram-brand-gradient)"
                  strokeWidth="1.8"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4.1"
                  stroke="url(#instagram-brand-gradient)"
                  strokeWidth="1.8"
                />
                <circle cx="17.55" cy="6.55" r="1.15" fill="#D62976" />
              </svg>
            </a>
            <a
              href={`https://wa.me/${org.adminTel.replace("+", "")}`}
              target="_blank"
              rel="noreferrer"
              aria-label={t("WhatsApp de administración")}
              className="grid size-11 place-items-center rounded-full border border-gold/50"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="#25D366" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </a>
            <Link
              to="/donaciones"
              aria-label={t("Donar por Zelle")}
              className="grid size-11 place-items-center rounded-full border border-gold/50"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="#6D1ED4" aria-hidden="true">
                <path d="M13.559 24h-2.841a.483.483 0 0 1-.483-.483v-2.765H5.638a.667.667 0 0 1-.666-.666v-2.234a.67.67 0 0 1 .142-.412l8.139-10.382h-7.25a.667.667 0 0 1-.667-.667V3.914c0-.367.299-.666.666-.666h4.23V.483c0-.266.217-.483.483-.483h2.841c.266 0 .483.217.483.483v2.765h4.323c.367 0 .666.299.666.666v2.137a.67.67 0 0 1-.141.41l-8.19 10.481h7.665c.367 0 .666.299.666.666v2.477a.667.667 0 0 1-.666.667h-4.32v2.765a.483.483 0 0 1-.483.483Z" />
              </svg>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg text-gold">
            <T>La organización</T>
          </h2>
          <p className="mt-4 text-sm leading-7 text-cream/85">
            <T>{org.name}</T>
            <br />
            <T>LLC con propósito social</T>
            <br />
            <T>Registrada en el Estado de Nueva York — </T>
            <T>{org.founded}</T>
          </p>
          <p className="mt-4 text-sm leading-7 text-cream/85">
            <T>{org.addressNy}</T>
            <br />
            <T>EIN: </T>
            <T>{org.ein}</T>
          </p>
          <h3 className="mt-6 font-display text-base text-gold">
            <T>Horario</T>
          </h3>
          <p className="mt-2 text-sm leading-7 text-cream/85">
            <T>{org.hours}</T>
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg text-gold">
            <T>Cumplimiento</T>
          </h2>
          <p className="mt-4 text-sm leading-7 text-cream/80">
            <T>
              Operamos conforme a las regulaciones federales y estatales aplicables, con estándares
              internos de gobernanza, rendición de cuentas y transparencia.
            </T>
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {legalLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-gold underline-offset-4 hover:underline">
                  <T>{item.label}</T>
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("vne:open-cookie-preferences"))}
                className="text-left text-gold underline-offset-4 hover:underline"
              >
                <T>Preferencias de cookies</T>
              </button>
            </li>
          </ul>
          <Link
            to="/"
            aria-label={t("Ir al inicio de Fundación VNE")}
            className="mt-8 inline-block max-w-full rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <img
              src={media.logo}
              alt={t("Logo completo de Fundación VNE")}
              loading="lazy"
              decoding="async"
              width={256}
              height={107}
              className="h-auto w-60 max-w-full rounded-md object-contain"
            />
          </Link>
        </div>
      </div>
      <div className="bg-card px-5 py-4 text-center text-xs leading-5 text-ink">
        <T>© 2022–2026 </T>
        <T>{org.name}</T>
        <T>. Todos los derechos reservados.</T>
        <br />
        <T>Este sitio es informativo y no constituye un compromiso legal ni financiero.</T>
        <br />
      </div>
    </footer>
  );
}

export function PageIntro({
  kicker,
  title,
  lede,
  tone = "navy",
}: {
  kicker: string;
  title: string;
  lede: string;
  tone?: "navy" | "forest";
}) {
  const bg = tone === "forest" ? "bg-forest" : "bg-navy";
  return (
    <section className={`${bg} text-cream`}>
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
        <p className="text-xs font-bold tracking-[0.22em] text-gold uppercase">
          <T>{kicker}</T>
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.15] font-semibold text-balance sm:text-5xl">
          <T>{title}</T>
        </h1>
        <p className="editorial-justify mt-5 max-w-2xl text-lg leading-relaxed text-cream/85">
          <T>{lede}</T>
        </p>
      </div>
    </section>
  );
}
