import { localizedHead } from "@/lib/i18n/seo";
import { T, useLanguage } from "@/lib/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CitybankGateway } from "@/components/citybank-gateway";
import { PageIntro, Shell } from "@/components/shell";
import { org } from "@/data/site";
import { getCitybankGateway } from "@/lib/citybank-gateway-functions";

export const Route = createFileRoute("/donaciones")({
  head: ({ matches }) =>
    localizedHead(
      {
        meta: [
          { title: "Donaciones | Fundación VNE" },
          {
            name: "description",
            content: "Donaciones voluntarias a Fundación VNE por Zelle o con tarjeta en Citibank.",
          },
        ],
      },
      matches.at(-1)?.search ?? {},
    ),
  loader: () => getCitybankGateway(),
  component: Donaciones,
});

const facts = [
  { label: "Plataforma", value: "Zelle" },
  { label: "Número asociado", value: org.zelle },
  { label: "Banco", value: org.bank },
  { label: "Concepto sugerido", value: "Donación Fundación VNE" },
];

function Donaciones() {
  const { t } = useLanguage();
  const gateway = Route.useLoaderData();
  const [copied, setCopied] = useState(false);

  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(org.zelle);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Shell>
      <PageIntro
        kicker={t("Cómo donar")}
        title={t("Donaciones")}
        lede={t(
          "Voluntarias. La tarjeta se paga en Citibank y Zelle se envía desde el banco. Este sitio no guarda el número de tarjeta.",
        )}
      />
      <CitybankGateway gateway={gateway} />

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <h2 className="font-display text-3xl text-navy dark:text-cream">
          <T>También puedes donar por Zelle</T>
        </h2>
        <p className="editorial-justify mt-3 max-w-3xl leading-relaxed text-mist dark:text-cream/75">
          <T>
            Zelle no pasa por esta página: se usa desde la aplicación del banco, con el número
            publicado.
          </T>
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {facts.map((fact) => (
            <article
              key={fact.label}
              className="rounded-card border border-line bg-card p-6 dark:border-white/10 dark:bg-navy"
            >
              <p className="text-xs font-bold tracking-[0.16em] text-gold-deep uppercase">
                <T>{fact.label}</T>
              </p>
              <p className="mt-2 font-display text-3xl text-navy dark:text-cream">
                <T>{fact.value}</T>
              </p>
            </article>
          ))}
        </div>

        <h2 className="mt-12 font-display text-3xl text-navy dark:text-cream">
          <T>De dónde sale y a dónde va</T>
        </h2>
        <p className="editorial-justify mt-3 max-w-3xl leading-relaxed text-mist dark:text-cream/75">
          <T>El aporte va a Casas VNE y Proyecto Génesis.</T>
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={copyNumber}
            className="inline-flex h-12 items-center justify-center rounded-full bg-navy px-6 text-sm font-bold text-cream dark:bg-gold dark:text-navy"
          >
            <T>{copied ? "Número copiado" : "Copiar número de Zelle"}</T>
          </button>
          <a
            href="https://www.zellepay.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full border border-navy px-6 text-sm font-bold text-navy dark:border-gold dark:text-gold"
          >
            <T>Sitio de Zelle</T>
          </a>
          <a
            href={org.infoWa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full border border-line px-6 text-sm font-bold text-navy dark:border-white/15 dark:text-cream"
          >
            <T>Consulta administrativa</T>
          </a>
        </div>
      </section>
    </Shell>
  );
}
