import { T, useLanguage } from "@/lib/i18n";
import type { CitybankGatewayView } from "@/lib/citybank-gateway";

function statusCopy(status: CitybankGatewayView["status"]): string {
  if (status === "ready") {
    return "El cobro se abre aquí, en la página de City Bank. Fundación VNE no ve ni guarda el número de la tarjeta.";
  }
  if (status === "awaiting-url") {
    return "El token de City Bank ya está configurado. Falta la dirección HTTPS del iframe para abrir la pasarela.";
  }
  if (status === "invalid") {
    return "La configuración de la pasarela no es válida. El pago con tarjeta permanece cerrado hasta corregirla.";
  }
  return "Este espacio queda reservado para embeber la pasarela de City Bank. El formulario de tarjeta aparecerá aquí cuando el banco entregue el token y la dirección HTTPS.";
}

export function CitybankGateway({ gateway }: { gateway: CitybankGatewayView }) {
  const { t } = useLanguage();
  const ready = gateway.status === "ready";

  return (
    <section aria-labelledby="pasarela-citybank" className="mx-auto max-w-6xl px-5 pt-14 sm:px-6">
      <div className="rounded-card border border-line bg-card p-6 sm:p-8 dark:border-white/10 dark:bg-navy">
        <p className="text-xs font-bold tracking-[0.16em] text-gold-deep uppercase">
          <T>Pasarela de pago</T>
        </p>
        <h2 id="pasarela-citybank" className="mt-2 font-display text-3xl text-navy dark:text-cream">
          <T>Pago con tarjeta en City Bank</T>
        </h2>
        <p className="editorial-justify mt-3 max-w-3xl leading-relaxed text-mist dark:text-cream/75">
          <T>{statusCopy(gateway.status)}</T>
        </p>
        <div
          id="citybank-gateway"
          className="mt-6 overflow-hidden rounded-card border border-dashed border-navy/20 bg-paper dark:border-white/15 dark:bg-navy-deep"
        >
          {ready ? (
            <iframe
              title={t("Pasarela de pago de City Bank")}
              src={gateway.src}
              className="h-[720px] w-full bg-white"
              allow="payment"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <div className="flex h-[420px] flex-col items-center justify-center px-6 text-center sm:h-[560px]">
              <p className="text-xs font-bold tracking-[0.16em] text-gold-deep uppercase">
                <T>City Bank</T>
              </p>
              <p className="mt-3 max-w-md font-display text-2xl text-navy dark:text-cream">
                <T>Espacio reservado para el iframe</T>
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-mist dark:text-cream/70">
                <T>
                  Aquí se embeberá la pasarela cuando City Bank entregue el token y la dirección
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
