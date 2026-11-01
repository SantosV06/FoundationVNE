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
            content:
              "Restaurante de Fundación VNE. Unidad productiva cuya actividad financia a la fundación, distinta del Proyecto Génesis.",
          },
        ],
      },
      matches.at(-1)?.search ?? {},
    ),
  component: PuntoDeComida,
});

const points = [
  {
    title: "Un restaurante de la fundación",
    text: "El punto de comida es la unidad gastronómica de Fundación Venezuela Nueva Esperanza. Es un negocio de la institución, no un programa de asistencia ni una campaña de donación.",
  },
  {
    title: "Financia a la fundación",
    text: "La operación del restaurante está destinada a generar ingresos propios que financian el trabajo institucional: programas, estructura y continuidad.",
  },
  {
    title: "Uno de dos negocios",
    text: "Junto con la unidad de construcción, forma la visión comercial de Fundación VNE: dos negocios que la fundación financia para sostener su misión.",
  },
  {
    title: "No es Proyecto Génesis",
    text: "Génesis es la proyección y el proyecto directo de la fundación. El punto de comida no lo sustituye ni forma parte de ese proyecto.",
  },
];

function PuntoDeComida() {
  const { t } = useLanguage();
  return (
    <Shell>
      <PageIntro
        kicker={t("Unidad productiva")}
        title={t("Punto de comida")}
        lede={t(
          "Restaurante de Fundación VNE. Su actividad comercial está destinada a financiar a la fundación.",
        )}
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
          <T>
            Para consultas sobre esta unidad, comuníquese con administración o con la oficina
            ejecutiva por los teléfonos publicados en este sitio.
          </T>
        </p>
      </section>
    </Shell>
  );
}
