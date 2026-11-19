import { localizedHead } from "@/lib/i18n/seo";
import { T, useLanguage } from "@/lib/i18n";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageIntro, Shell } from "@/components/shell";
import { org } from "@/data/site";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitSupportRequest } from "@/lib/support-functions";

export const Route = createFileRoute("/soporte")({
  head: ({ matches }) =>
    localizedHead(
      {
        meta: [
          { title: "Soporte | Fundación VNE" },
          {
            name: "description",
            content:
              "Canales de información institucional y formulario de soporte técnico de Fundación VNE.",
          },
        ],
      },
      matches.at(-1)?.search ?? {},
    ),
  component: Soporte,
});

type Fields = {
  nombre: string;
  apellido: string;
  correo: string;
  descripcion: string;
};

const empty: Fields = { nombre: "", apellido: "", correo: "", descripcion: "" };

function Soporte() {
  const { t } = useLanguage();
  const [fields, setFields] = useState<Fields>(empty);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);
  const requestKey = useRef<string | null>(null);
  const submitting = useRef(false);

  useEffect(() => setInteractive(true), []);

  function update(key: keyof Fields, value: string) {
    requestKey.current = null;
    setFields((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    const data = {
      nombre: fields.nombre.trim(),
      apellido: fields.apellido.trim(),
      correo: fields.correo.trim(),
      descripcion: fields.descripcion.trim(),
    };

    if (!data.nombre || !data.apellido || !data.correo || !data.descripcion) {
      setError("Completa todos los campos.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo)) {
      setError("Escribe un correo electrónico válido.");
      return;
    }
    if (data.descripcion.length < 10) {
      setError("Describe el problema con al menos 10 caracteres.");
      return;
    }
    if (!turnstileToken) {
      setError("Completa la verificación de seguridad de Cloudflare.");
      return;
    }

    submitting.current = true;
    requestKey.current ??= crypto.randomUUID();
    setError("");
    setSending(true);
    try {
      await submitSupportRequest({
        data: {
          ...data,
          website,
          requestKey: requestKey.current,
          turnstileToken,
        },
      });
      setSent(true);
      setFields(empty);
      setWebsite("");
      requestKey.current = null;
      setTurnstileToken("");
      setTurnstileKey((current) => current + 1);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "No se pudo enviar el reporte. Inténtalo nuevamente.",
      );
    } finally {
      submitting.current = false;
      setSending(false);
    }
  }

  return (
    <Shell>
      <PageIntro
        kicker={t("Atención")}
        title={t("Información clara y un canal si algo del sitio falla.")}
        lede={t(
          "Desde aquí puedes hablar con el equipo sobre el trabajo de la fundación o reportar un error de visualización o funcionamiento de la página.",
        )}
      />
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-14 sm:px-6 md:grid-cols-2">
        <article className="rounded-card bg-navy p-8 text-cream">
          <h2 className="font-display text-3xl">
            <T>Más información</T>
          </h2>
          <p className="editorial-justify mt-3 leading-relaxed text-cream/80">
            <T>
              Orientación institucional y detalle sobre programas, sedes y formas de participar.
            </T>
          </p>
          <a
            href={`mailto:${org.email}`}
            className="mt-8 inline-flex h-12 max-w-full items-center rounded-full bg-gold px-5 text-sm font-bold break-all text-navy"
          >
            {org.email}
          </a>
          <a
            href={org.infoWa}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex h-12 items-center rounded-full border border-cream/40 px-5 text-sm font-bold text-cream"
          >
            <T>Escribir por WhatsApp</T>
          </a>
        </article>
        <article className="rounded-card border border-line bg-card p-8 dark:border-white/10 dark:bg-navy">
          <h2 className="font-display text-3xl text-navy dark:text-cream">
            <T>Soporte del sitio</T>
          </h2>
          <p className="editorial-justify mt-3 leading-relaxed text-mist dark:text-cream/75">
            <T>
              Si ves un error, un enlace roto o un problema al navegar, este canal es el correcto.
            </T>
          </p>
          <a
            href={`mailto:${org.supportEmail}`}
            className="mt-8 inline-flex h-12 max-w-full items-center rounded-full bg-navy px-5 text-sm font-bold break-all text-cream dark:bg-gold dark:text-navy"
          >
            {org.supportEmail}
          </a>
          <a
            href="#formulario-soporte"
            className="mt-3 inline-flex h-12 items-center rounded-full border border-navy px-5 text-sm font-bold text-navy dark:border-gold dark:text-gold"
          >
            <T>Reportar un problema</T>
          </a>
          <p className="mt-6 text-sm text-mist dark:text-cream/60">
            <T>Horario</T>
            {": "}
            <T>{org.hours}</T>
          </p>
        </article>
      </section>

      <section
        id="formulario-soporte"
        className="mx-auto max-w-4xl scroll-mt-24 px-5 pb-16 sm:px-6"
      >
        <div className="mb-7">
          <p className="text-xs font-bold tracking-[0.2em] text-gold-deep uppercase">
            <T>Soporte técnico</T>
          </p>
          <h2 className="mt-2 font-display text-3xl text-navy dark:text-cream">
            <T>Cuéntanos qué ocurrió</T>
          </h2>
          <p className="mt-3 leading-relaxed text-mist dark:text-cream/75">
            <T>Completa el formulario. Guardaremos tu reporte y enviaremos una confirmación a tu correo.</T>
          </p>
        </div>

        {sent ? (
          <div
            className="rounded-card border border-forest/30 bg-card p-7 dark:border-gold/30 dark:bg-navy"
            role="status"
          >
            <h3 className="font-display text-2xl text-navy dark:text-cream">
              <T>Reporte recibido</T>
            </h3>
            <p className="mt-3 leading-relaxed text-mist dark:text-cream/75">
              <T>Tu reporte quedó registrado. Hemos enviado una confirmación al correo indicado. Gracias por ayudarnos a mejorar el sitio.</T>
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-5 inline-flex h-12 items-center rounded-full border border-line px-5 text-sm font-bold dark:border-white/15"
            >
              <T>Enviar otro reporte</T>
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-card border border-line bg-card p-6 dark:border-white/10 dark:bg-navy sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label={t("Nombre")}
                value={fields.nombre}
                onChange={(value) => update("nombre", value)}
                disabled={sending || !interactive}
                autoComplete="given-name"
              />
              <Field
                label={t("Apellido")}
                value={fields.apellido}
                onChange={(value) => update("apellido", value)}
                disabled={sending || !interactive}
                autoComplete="family-name"
              />
              <div className="sm:col-span-2">
                <Field
                  label={t("Correo electrónico")}
                  type="email"
                  value={fields.correo}
                  onChange={(value) => update("correo", value)}
                  disabled={sending || !interactive}
                  autoComplete="email"
                />
              </div>
            </div>

            <label className="mt-4 block text-sm font-semibold text-navy dark:text-cream">
              <T>Descripción del problema</T>
              <textarea
                required
                rows={6}
                maxLength={5000}
                value={fields.descripcion}
                onChange={(event) => update("descripcion", event.target.value)}
                disabled={sending || !interactive}
                placeholder={t("Describe el error, dónde ocurrió y qué estabas intentando hacer.")}
                className="mt-1.5 w-full rounded-xl border border-line bg-paper px-3 py-3 text-base font-normal text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold dark:border-white/15 dark:bg-navy-deep dark:text-cream"
              />
              <span className="mt-1 block text-xs font-normal text-mist">
                {fields.descripcion.length}/5000
              </span>
            </label>

            <div className="mt-5">
              <p className="mb-2 text-sm font-semibold text-navy dark:text-cream">
                <T>Verificación de seguridad</T>
              </p>
              <Turnstile
                key={turnstileKey}
                siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                onSuccess={(token: string) => {
                  setTurnstileToken(token);
                  setError("");
                }}
                onExpire={() => {
                  setTurnstileToken("");
                  setError("La verificación expiró. Vuelve a verificarte.");
                }}
                onError={() => {
                  setTurnstileToken("");
                  setError("No se pudo cargar la verificación de seguridad.");
                }}
                options={{ theme: "auto", size: "flexible" }}
              />
            </div>

            <label className="absolute -left-[9999px]" aria-hidden="true">
              <T>Sitio web</T>
              <input
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </label>

            <p className="mt-4 text-sm text-mist dark:text-cream/75">
              <T>Usaremos estos datos únicamente para revisar y responder tu reporte. Consulta la</T>{" "}
              <Link to="/legal/$slug" params={{ slug: "privacidad" }} className="underline">
                <T>política de privacidad</T>
              </Link>.
            </p>
            {error ? (
              <p className="mt-3 text-sm font-semibold text-clay" role="alert">
                <T>{error}</T>
              </p>
            ) : null}
            <button
              type="submit"
              disabled={sending || !interactive || !turnstileToken}
              className="mt-5 inline-flex h-12 items-center rounded-full bg-forest px-6 text-sm font-bold text-cream disabled:cursor-not-allowed disabled:opacity-60"
            >
              <T>{sending ? "Enviando…" : "Enviar reporte"}</T>
            </button>
          </form>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-14 sm:px-6">
        <article className="rounded-card border border-line bg-card p-6 dark:border-white/10 dark:bg-navy">
          <h2 className="font-display text-2xl text-navy dark:text-cream">
            <T>Cómo protegemos los datos</T>
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-mist dark:text-cream/80">
            <T>Limitamos la información a la necesaria para atender cada solicitud, protegemos el acceso interno con controles de autenticación y segundo factor, filtramos envíos automatizados y mantenemos las analíticas opcionales desactivadas hasta recibir autorización. No pedimos ni almacenamos números de tarjeta o credenciales bancarias.</T>
          </p>
          <p className="mt-3 text-sm text-mist dark:text-cream/75">
            <T>Para consultas sobre datos personales, escribe a</T>{" "}
            <a className="font-semibold underline" href={"mailto:" + org.email}>
              {org.email}
            </a>.
          </p>
        </article>
      </section>
    </Shell>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block text-sm font-semibold text-navy dark:text-cream">
      <T>{label}</T>
      <input
        required
        maxLength={type === "email" ? 254 : 100}
        disabled={disabled}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1.5 h-12 w-full rounded-xl border border-line bg-paper px-3 text-base font-normal text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold dark:border-white/15 dark:bg-navy-deep dark:text-cream"
      />
    </label>
  );
}
