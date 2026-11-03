import { localizedHead } from "@/lib/i18n/seo";
import { T, useLanguage } from "@/lib/i18n";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, Shell } from "@/components/shell";

export const Route = createFileRoute("/punto-de-comida")({
  head: ({ matches }) =>
    localizedHead(
      {
        meta: [
          { title: "Punto de comida | Fundación VNE" },
          {
            name: "description",
            content: "Restaurante de Fundación VNE. Sus ingresos financian a la fundación.",
          },
        ],
      },
      matches.at(-1)?.search ?? {},
    ),
  component: PuntoDeComida,
});

const points = [
  {
    title: "El restaurante",
    text: "Unidad de comida de la fundación.",
  },
  {
    title: "Para qué sirve",
    text: "Los ingresos se usan en los programas de la fundación.",
  },
];

function PuntoDeComida() {
  const { t } = useLanguage();
  return (
    <Shell>
      <PageIntro
        kicker={t("Unidad productiva")}
        title={t("Punto de comida")}
        lede={t("Restaurante de Fundación VNE. Sus ingresos financian a la fundación.")}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <ol className="grid gap-4 md:grid-cols-2">
          {points.map((item, index) => (
            <li
              key={item.title}
              className="rounded-card border-t-4 border-gold bg-card p-6 dark:bg-navy"
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
            to="/construccion"
            className="inline-flex h-12 items-center justify-center rounded-full bg-navy px-6 text-sm font-bold text-cream dark:bg-gold dark:text-navy"
          >
            <T>Ver construcción</T>
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
