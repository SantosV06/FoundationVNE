import { localizedHead } from "@/lib/i18n/seo";
import { T, useLanguage } from "@/lib/i18n";
import { media } from "@/data/media";
import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/liderazgo")({
  head: ({ matches }) =>
    localizedHead(
      {
        meta: [
          { title: "Liderazgo | Fundación VNE" },
          {
            name: "description",
            content:
              "Fundación Venezuela Nueva Esperanza, organización con propósito social fundada en 2022, con sede en Nueva York y operaciones en Caracas. Impulsa Casas VNE y Proyecto Génesis para desarrollar autonomía, capacidad productiva y modelos sostenibles y replicables.",
          },
        ],
      },
      matches.at(-1)?.search ?? {},
    ),
  component: Liderazgo,
});

const people = [
  {
    initials: "WS",
    photo: media.director,
    role: "Dirección y Liderazgo",
    name: "Wilmer J. Solorzano",
    charge: "CEO y fundador",
    text: "Responsable de la visión estratégica, las decisiones institucionales y la proyección de largo plazo.",
  },
  {
    initials: "SS",
    photo: media.coordinator,
    role: "Coordinación General",
    name: "Stefany V. Solorzano",
    charge: "Planificación estratégica",
    text: "Planificación institucional, coordinación de proyectos y alineación entre las áreas de la organización.",
  },
  {
    initials: "FD",
    photo: null,
    role: "Tecnología / Desarrollo y Seguridad",
    name: "Felipe D. Santo",
    charge: "Desarrollo tecnológico",
    text: "Responsable del desarrollo y mantenimiento de las plataformas digitales, la infraestructura tecnológica y la implementación de medidas de seguridad informática.",
  },
];

function Liderazgo() {
  const { t } = useLanguage();
  return (
    <Shell>
      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-6">
        <img
          src={media.logo}
          alt={t("Logotipo de Fundación Venezuela Nueva Esperanza")}
          width={520}
          height={520}
          fetchPriority="high"
          className="mx-auto mb-12 max-h-64 max-w-[min(100%,20rem)] object-contain"
        />
        <div className="editorial-justify space-y-6 text-base leading-relaxed text-mist sm:text-lg dark:text-cream/80">
          <div>
            <h1 className="mb-3 font-display text-3xl text-navy sm:text-4xl dark:text-cream">
              <T>Una fundación con propósito social, no con vocación asistencial</T>
            </h1>
            <p>
              <T>
                Fundación Venezuela Nueva Esperanza es una organización con propósito social fundada en 2022, con sede principal en Brooklyn, Nueva York, y sede operativa en Caracas, Venezuela. Nació de una convicción sencilla y exigente: el desarrollo no se resuelve con ayudas puntuales, se construye con actividad productiva, capacidad propia y estructuras que puedan sostenerse cuando el contexto cambia.
              </T>
            </p>
          </div>
          <p>
            <T>
              Nuestra misión es el desarrollo social y económico de comunidades hoy excluidas, mediante proyectos productivos que devuelvan autonomía y dignidad. Trabajamos sobre cuatro principios que ordenan cada decisión: impacto que dura más allá de la asistencia inmediata, fortalecimiento de habilidades productivas, modelos escalables que puedan replicarse en otros territorios y comunidades capaces de organizarse de forma inclusiva.
            </T>
          </p>
          <p>
            <T>
              Ese enfoque se materializa en dos programas. Casas VNE es nuestro modelo territorial: formación para niños y jóvenes, participación activa de adultos, colaboración comunitaria y articulación de sectores productivos en un mismo espacio, hasta conformar una microeconomía capaz de sostenerse sola. Proyecto Génesis es la inversión social privada que lo valida: un piloto agroturístico en zona rural de Nueva York concebido como núcleo productivo, con ingresos propios, reinversión y evidencia para escalar. Ambos responden a la misma lógica: producir antes que depender.
            </T>
          </p>
          <p>
            <T>
              La fundación opera con una estructura institucional de roles definidos y representación pública concentrada en la dirección. Esa claridad no es formalismo: garantiza que el modelo se ejecute con método, que las alianzas se sostengan en el tiempo y que cada proyecto rinda cuentas de sus resultados. Crecemos con quienes aportan conocimiento, experiencia o trabajo, y medimos el avance por unidades económicas formales creadas, no por coberturas temporales.
            </T>
          </p>
          <p>
            <T>
              Fundación VNE existe para dejar capacidad instalada donde antes solo había urgencia.
            </T>
          </p>
        </div>
      </section>

      <section className="bg-card dark:bg-navy">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
          <div className="mb-6"><h2 className="font-display text-3xl text-navy dark:text-cream"><T>Dirección y roles clave</T></h2><p className="mt-2 max-w-2xl leading-relaxed text-mist dark:text-cream/80"><T>Responsabilidades institucionales y técnicas identificadas con transparencia.</T></p></div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {people.map((person) => (
              <article
                key={person.initials}
                className="rounded-card border border-line bg-paper p-6 dark:border-white/10 dark:bg-navy-deep"
              >
                <div className="flex items-center gap-4">
                  {person.photo ? (
                    <img src={person.photo} alt={t(person.name)} loading="lazy" width={64} height={64} className="size-16 shrink-0 rounded-full object-cover" />
                  ) : (
                    <div role="img" aria-label={t("Fotografía pendiente de Felipe D. Santo")} className="grid size-16 shrink-0 place-items-center rounded-full border border-gold/40 bg-navy/10 font-display text-xl font-semibold text-navy dark:bg-white/10 dark:text-cream">
                      {person.initials}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold tracking-[0.16em] text-gold-deep uppercase">
                      <T>{person.role}</T>
                    </p>
                    <h2 className="font-display text-2xl text-navy dark:text-cream">
                      <T>{person.name}</T>
                    </h2>
                    <p className="text-sm text-mist dark:text-cream/70">
                      <T>{person.charge}</T>
                    </p>
                  </div>
                </div>
                <p className="editorial-justify mt-4 leading-relaxed text-mist dark:text-cream/75">
                  <T>{person.text}</T>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}
