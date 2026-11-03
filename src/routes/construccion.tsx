import { localizedHead } from "@/lib/i18n/seo";
import { T, useLanguage } from "@/lib/i18n";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, Shell } from "@/components/shell";

export const Route = createFileRoute("/construccion")({
  head: ({ matches }) =>
    localizedHead(
      {
        meta: [
          { title: "Construcción | Fundación VNE" },
          {
            name: "description",
            content: "Unidad de construcción de Fundación VNE.",
          },
        ],
      },
      matches.at(-1)?.search ?? {},
    ),
  component: Construccion,
});

const points = [
  {
    title: "Qué es",
    text: "Unidad de obra y oficios.",
  },
  {
    title: "Para qué sirve",
    text: "La fundación la financia para sostener sus programas.",
  },
];

function Construccion() {
  const { t } = useLanguage();
  return (
    <Shell>
      <PageIntro
        kicker={t("Unidad productiva")}
        title={t("Construcción")}
        lede={t("Obra y encargos. La fundación financia esta unidad.")}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <ol className="grid gap-4 md:grid-cols-2">
          {points.map((item, index) => (
            <li
              key={item.title}
              className="rounded-card border-t-4 border-clay bg-card p-6 dark:bg-navy"
            >
              <p className="font-display text-sm text-gold-deep">0{index + 1}</p>
              <h2 className="mt-2 font-display text-2xl text-navy dark:text-cream">
                <T>{item.title}</T>
              </h2>
              <p className="editorial-justify mt-3 leading-relaxed text-mist dark:text-cream/75">
                <T>{item.text}</T>
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/punto-de-comida"
            className="inline-flex h-12 items-center justify-center rounded-full bg-navy px-6 text-sm font-bold text-cream dark:bg-gold dark:text-navy"
          >
            <T>Ver el punto de comida</T>
          </Link>
          <Link
            to="/genesis"
            className="inline-flex h-12 items-center justify-center rounded-full border border-navy px-6 text-sm font-bold text-navy dark:border-gold dark:text-gold"
          >
            <T>Ver Proyecto Génesis</T>
          </Link>
        </div>
        <p className="editorial-justify mt-8 max-w-3xl text-sm leading-relaxed text-mist dark:text-cream/70">
          <T>Consultas por los teléfonos de administración o de la oficina ejecutiva.</T>
        </p>
      </section>
    </Shell>
  );
}
