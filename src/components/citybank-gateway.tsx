import { openCitybankDonation, type CitybankGatewayPublic } from "@/lib/citybank-gateway-functions";
import type { DonorFieldError, DonorFields } from "@/lib/citybank-gateway";
import { T, useLanguage } from "@/lib/i18n";
import { useState, type FormEvent } from "react";

const presets = ["25", "50", "100", "250"] as const;

function statusCopy(status: CitybankGatewayPublic["status"]): string {
  if (status === "ready") {
    return "El cobro se abre aquí, en la página de Citibank, después de indicar el monto, el nombre y el correo. Fundación VNE no ve ni guarda el número de la tarjeta.";
  }
  if (status === "awaiting-url") {
    return "El token de Citibank ya está configurado. Falta la dirección HTTPS del iframe para abrir la pasarela.";
  }
  if (status === "invalid") {
    return "La configuración de la pasarela no es válida. El pago con tarjeta permanece cerrado hasta corregirla.";
  }
  return "Este espacio queda reservado para embeber la pasarela de Citibank. El formulario de tarjeta aparecerá aquí cuando el banco entregue el token y la dirección HTTPS.";
}

function fieldError(field: DonorFieldError): string {
  if (field === "amount") {
    return "Revisa el monto. Usa dólares, entre 1 y 25 000, con hasta dos decimales.";
  }
  if (field === "name") return "Escribe tu nombre, entre 2 y 80 letras.";
  return "Escribe un correo válido. Citibank lo usa para el comprobante; este sitio no lo guarda.";
}

export function CitybankGateway({ gateway }: { gateway: CitybankGatewayPublic }) {
  const { t } = useLanguage();
  const ready = gateway.status === "ready";
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<DonorFieldError | null>(null);
  const [closed, setClosed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [pending, setPending] = useState(false);
  const [opened, setOpened] = useState<DonorFields | null>(null);
  const [src, setSrc] = useState<string | null>(null);

  async function continueToPay(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setError(null);
    setClosed(false);
    setFailed(false);
    try {
      const result = await openCitybankDonation({ data: { amount, name, email } });
      if (!result.ok) {
        setOpened(null);
        setSrc(null);
        if ("field" in result) setError(result.field);
        else setClosed(true);
        return;
      }
      setOpened(result.donor);
      setSrc(result.src);
      window.requestAnimationFrame(() => {
        document.getElementById("citybank-gateway")?.scrollIntoView({ block: "start" });
      });
    } catch {
      setOpened(null);
      setSrc(null);
      setFailed(true);
    } finally {
      setPending(false);
    }
  }

  const summary = opened
    ? t(
        "Vas a donar USD {amount} como {name}. El número de la tarjeta se escribe en Citibank, no en este sitio.",
      )
        .replace("{amount}", opened.amount)
        .replace("{name}", opened.name)
    : "";
  const buttonLabel = pending
    ? "Abriendo la pasarela"
    : ready
      ? "Continuar al pago"
      : "Revisar datos de la donación";

  return (
    <section aria-labelledby="pasarela-citybank" className="mx-auto max-w-6xl px-5 pt-14 sm:px-6">
      <div className="rounded-card border border-line bg-card p-6 sm:p-8 dark:border-white/10 dark:bg-navy">
        <p className="text-xs font-bold tracking-[0.16em] text-gold-deep uppercase">
          <T>Pasarela de pago</T>
        </p>
        <h2 id="pasarela-citybank" className="mt-2 font-display text-3xl text-navy dark:text-cream">
          <T>Pago con tarjeta en Citibank</T>
        </h2>
        <p className="editorial-justify mt-3 max-w-3xl leading-relaxed text-mist dark:text-cream/75">
          <T>{statusCopy(gateway.status)}</T>
        </p>

        <form className="mt-8 max-w-xl" onSubmit={continueToPay} noValidate>
          <p className="text-sm font-semibold text-navy dark:text-cream">
            <T>Monto a donar</T>
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {presets.map((preset) => {
              const selected = amount === preset || amount === `${preset}.00`;
              return (
                <button
                  key={preset}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setAmount(preset)}
                  className={`inline-flex h-11 items-center justify-center rounded-full border px-4 text-sm font-bold ${
                    selected
                      ? "border-navy bg-navy text-cream dark:border-gold dark:bg-gold dark:text-navy"
                      : "border-line text-navy dark:border-white/15 dark:text-cream"
                  }`}
                >
                  USD {preset}
                </button>
              );
            })}
          </div>
          <label className="mt-4 block text-sm font-semibold text-navy dark:text-cream">
            <T>Monto en dólares</T>
            <input
              inputMode="decimal"
              autoComplete="transaction-amount"
              maxLength={8}
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="mt-1.5 h-12 w-full rounded-xl border border-line bg-paper px-3 text-base font-normal text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold dark:border-white/15 dark:bg-navy-deep dark:text-cream"
            />
          </label>
          <label className="mt-4 block text-sm font-semibold text-navy dark:text-cream">
            <T>Nombre completo</T>
            <input
              autoComplete="name"
              maxLength={80}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1.5 h-12 w-full rounded-xl border border-line bg-paper px-3 text-base font-normal text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold dark:border-white/15 dark:bg-navy-deep dark:text-cream"
            />
          </label>
          <label className="mt-4 block text-sm font-semibold text-navy dark:text-cream">
            <T>Correo electrónico</T>
            <input
              type="email"
              autoComplete="email"
              maxLength={120}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 h-12 w-full rounded-xl border border-line bg-paper px-3 text-base font-normal text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold dark:border-white/15 dark:bg-navy-deep dark:text-cream"
            />
          </label>
          {error ? (
            <p role="alert" className="mt-3 text-sm font-semibold text-navy dark:text-gold">
              <T>{fieldError(error)}</T>
            </p>
          ) : null}
          {closed ? (
            <p role="status" className="mt-3 text-sm font-semibold text-navy dark:text-gold">
              <T>
                La pasarela sigue cerrada: Citibank todavía no entregó el token o la dirección
                HTTPS. No se envió ningún pago y estos datos no se guardan.
              </T>
            </p>
          ) : null}
          {failed ? (
            <p role="alert" className="mt-3 text-sm font-semibold text-navy dark:text-gold">
              <T>No pudimos abrir la pasarela. Inténtalo de nuevo. No se guardó ningún pago.</T>
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="mt-5 inline-flex h-12 items-center justify-center rounded-full bg-navy px-6 text-sm font-bold text-cream disabled:opacity-60 dark:bg-gold dark:text-navy"
          >
            <T>{buttonLabel}</T>
          </button>
        </form>

        <div
          id="citybank-gateway"
          className="mt-8 overflow-hidden rounded-card border border-dashed border-navy/20 bg-paper dark:border-white/15 dark:bg-navy-deep"
        >
          {src ? (
            <>
              <p className="border-b border-line px-4 py-3 text-sm text-navy dark:border-white/10 dark:text-cream">
                {summary}
              </p>
              <iframe
                title={t("Pasarela de pago de Citibank")}
                src={src}
                className="h-[720px] w-full bg-white"
                allow="payment"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </>
          ) : (
            <div className="flex h-[280px] flex-col items-center justify-center px-6 text-center sm:h-[360px]">
              <p className="text-xs font-bold tracking-[0.16em] text-gold-deep uppercase">
                <T>Citibank</T>
              </p>
              <p className="mt-3 max-w-md font-display text-2xl text-navy dark:text-cream">
                <T>Espacio reservado para el iframe</T>
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-mist dark:text-cream/70">
                <T>
                  Aquí se embeberá la pasarela cuando Citibank entregue el token y la dirección
                  HTTPS. Mientras tanto no se abre ningún formulario de tarjeta.
                </T>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
