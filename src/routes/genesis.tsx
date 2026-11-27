import { localizedHead } from "@/lib/i18n/seo";
import { T, useLanguage } from "@/lib/i18n";
import { media } from "@/data/media";
import { type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Sprout, GraduationCap, Users, Factory, Compass, Recycle } from "lucide-react";
import { PageIntro, Shell } from "@/components/shell";

export const Route = createFileRoute("/genesis")({
  head: ({ matches }) =>
    localizedHead(
      {
        meta: [
          { title: "Proyecto Génesis | Desarrollo productivo y autonomía comunitaria" },
          {
            name: "description",
            content:
              "Génesis integra formación, organización comunitaria y unidades productivas en un modelo de desarrollo social y económico sostenible. Casas VNE forma parte de este proyecto.",
          },
        ],
      },
      matches.at(-1)?.search ?? {},
    ),
  component: Genesis,
});

function Section({ title, eyebrow, children }: { title: string; eyebrow?: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-20">
      {eyebrow ? <p className="text-xs font-bold tracking-[0.2em] text-gold-deep uppercase">{eyebrow}</p> : null}
      <h2 className="mt-2 max-w-4xl font-display text-3xl leading-tight text-navy dark:text-cream sm:text-4xl">
        <T>{title}</T>
      </h2>
      <div className="editorial-justify mt-6 max-w-4xl space-y-4 text-base leading-relaxed text-mist dark:text-cream/80">
        {children}
      </div>
    </section>
  );
}

const pillars = [
  { icon: GraduationCap, title: "Formación y capacidades", text: "Aprendizaje práctico para niñas, niños, jóvenes y personas adultas: conocimientos, habilidades y acompañamiento para participar activamente en la vida comunitaria y económica." },
  { icon: Sprout, title: "Producción y emprendimiento", text: "Actividades agroalimentarias, transformación de productos, servicios y pequeños emprendimientos conectados con necesidades y oportunidades reales." },
  { icon: Users, title: "Organización comunitaria", text: "Participación con responsabilidades claras, colaboración entre generaciones y espacios para que cada persona pueda aportar experiencia, trabajo o conocimiento." },
];

const sectors = [
  { icon: Sprout, title: "Sector primario", text: "Agricultura, producción de alimentos y aprovechamiento responsable del territorio." },
  { icon: Factory, title: "Sector secundario", text: "Transformación, manufactura ligera y generación de valor agregado a partir de la producción local." },
  { icon: Compass, title: "Sector terciario", text: "Comercio, turismo, gastronomía y servicios que conectan la producción con las personas y los mercados." },
];

function Genesis() {
  const { t } = useLanguage();
  return (
    <Shell>
      <PageIntro
        tone="forest"
        kicker={t("Un proyecto integral de desarrollo social y económico")}
        title={t("Génesis: convertir el potencial de una comunidad en oportunidades sostenibles.")}
        lede={t("Un modelo que une formación, organización comunitaria y actividad productiva. Casas VNE se integra en Génesis como su dimensión territorial y humana: el espacio donde las capacidades se desarrollan, la comunidad se organiza y las oportunidades toman forma.")}
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:items-center lg:py-20">
        <div className="rounded-card bg-card p-7 dark:bg-navy">
          <img src={media.genesisLogo} alt={t("Identidad del Proyecto Génesis")} className="mx-auto max-h-48 max-w-full object-contain" />
        </div>
        <div className="space-y-5">
          <p className="text-xs font-bold tracking-[0.2em] text-gold-deep uppercase"><T>La idea central</T></p>
          <h2 className="font-display text-3xl leading-tight text-navy dark:text-cream sm:text-4xl"><T>No se trata solo de ayudar hoy. Se trata de crear las condiciones para avanzar mañana.</T></h2>
          <p className="editorial-justify leading-relaxed text-mist dark:text-cream/80"><T>Génesis parte de una convicción: el desarrollo duradero requiere más que respuestas aisladas. Necesita personas con herramientas, comunidades capaces de organizarse y actividades económicas que generen valor. Por eso articula la dimensión social y la productiva dentro de una misma estrategia.</T></p>
          <a className="inline-flex items-center gap-2 font-semibold text-forest underline underline-offset-4 dark:text-gold" href={media.genesisPdf} download><T>Consultar el documento del proyecto</T><ArrowUpRight className="size-4" /></a>
        </div>
      </section>

      <section className="bg-card dark:bg-navy">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-20">
          <p className="text-xs font-bold tracking-[0.2em] text-gold-deep uppercase"><T>Una sola estrategia, componentes conectados</T></p>
          <h2 className="mt-2 max-w-3xl font-display text-3xl text-navy dark:text-cream sm:text-4xl"><T>Casas VNE: la dimensión comunitaria de Génesis.</T></h2>
          <p className="editorial-justify mt-5 max-w-3xl text-lg leading-relaxed text-mist dark:text-cream/80"><T>Casas VNE deja de presentarse como un proyecto separado. Se integra en Génesis como un modelo territorial de formación, convivencia, participación y desarrollo productivo. Es el componente que conecta a las personas con el proceso: desde el aprendizaje y la colaboración hasta la participación en iniciativas económicas.</T></p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-card border border-line bg-paper p-6 dark:border-white/10 dark:bg-navy-deep">
                <Icon className="size-8 text-gold-deep" aria-hidden="true" />
                <h3 className="mt-5 font-display text-2xl text-navy dark:text-cream"><T>{title}</T></h3>
                <p className="editorial-justify mt-3 leading-relaxed text-mist dark:text-cream/75"><T>{text}</T></p>
              </article>
            ))}
          </div>
          <div className="mt-8 overflow-hidden rounded-card">
            <MediaImage src={media.houses} alt={t("Representación del modelo territorial integrado en Génesis")} />
          </div>
        </div>
      </section>

      <Section eyebrow="Cómo se construye" title="Una economía local conectada de principio a fin">
        <p><T>El modelo busca articular actividades complementarias para que la producción no termine en la cosecha ni la formación se quede en teoría. Cada sector puede aportar oportunidades, empleo, servicios y valor al conjunto, de acuerdo con la viabilidad del territorio y los recursos disponibles.</T></p>
        <div className="grid gap-4 pt-3 md:grid-cols-3">
          {sectors.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-card border border-line bg-card p-6 dark:border-white/10 dark:bg-navy">
              <Icon className="size-7 text-gold-deep" aria-hidden="true" />
              <h3 className="mt-4 font-display text-xl text-navy dark:text-cream"><T>{title}</T></h3>
              <p className="mt-2 leading-relaxed text-mist dark:text-cream/75"><T>{text}</T></p>
            </article>
          ))}
        </div>
        <p><T>La integración permite explorar cadenas de valor a escala local: producir, transformar, ofrecer servicios, comercializar y reinvertir. La combinación concreta se definirá mediante estudios de demanda, costos, permisos, capacidades y condiciones del lugar.</T></p>
      </Section>

      <section className="bg-navy text-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-6 md:grid-cols-2 lg:py-20">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-gold uppercase"><T>Primera etapa</T></p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl"><T>Un piloto agroturístico en Nueva York.</T></h2>
            <p className="editorial-justify mt-5 leading-relaxed text-cream/80"><T>La propuesta contempla desarrollar en una zona rural del estado de Nueva York un núcleo agroturístico y productivo. Su función será probar, con alcance controlado, cómo pueden convivir producción agroalimentaria, transformación básica, experiencias turísticas, comercialización y servicios asociados.</T></p>
          </div>
          <div className="rounded-card bg-forest p-7 sm:p-9">
            <h3 className="font-display text-2xl"><T>Aprender antes de escalar.</T></h3>
            <p className="mt-4 leading-relaxed text-cream/85"><T>El piloto permitirá contrastar la propuesta con datos reales: inversión inicial, costos de operación, demanda, ingresos, empleos y capacidades necesarias. Las decisiones de expansión dependerán de los resultados y de la sostenibilidad demostrada.</T></p>
            <ul className="mt-6 space-y-3 text-sm text-cream/85">
              <li>• <T>Validación operativa y comercial</T></li>
              <li>• <T>Medición de costos e ingresos</T></li>
              <li>• <T>Aprendizajes documentados y replicables</T></li>
            </ul>
          </div>
        </div>
      </section>

      <Section eyebrow="Sostenibilidad" title="Que el impacto pueda mantenerse en el tiempo">
        <p><T>La autosostenibilidad no se declara: se construye y se demuestra. Génesis aspira a que las actividades productivas generen ingresos suficientes para cubrir, progresivamente, sus costos, mantener la infraestructura y reinvertir en nuevas capacidades e iniciativas.</T></p>
        <p><T>La dimensión comunitaria y la económica se evaluarán juntas. El desempeño no se medirá únicamente por cuánto se produce o se vende, sino también por las habilidades desarrolladas, la participación, las oportunidades creadas y la capacidad de la comunidad para sostener procesos propios.</T></p>
        <div className="grid gap-4 pt-3 sm:grid-cols-2">
          <div className="rounded-card bg-card p-6 dark:bg-navy"><Recycle className="size-7 text-gold-deep" /><h3 className="mt-3 font-display text-xl text-navy dark:text-cream"><T>Reinversión responsable</T></h3><p className="mt-2 leading-relaxed"><T>Priorizar continuidad operativa, mantenimiento y crecimiento respaldado por resultados.</T></p></div>
          <div className="rounded-card bg-card p-6 dark:bg-navy"><Users className="size-7 text-gold-deep" /><h3 className="mt-3 font-display text-xl text-navy dark:text-cream"><T>Autonomía y participación</T></h3><p className="mt-2 leading-relaxed"><T>Fortalecer capacidades y responsabilidades para que las personas sean protagonistas del desarrollo.</T></p></div>
        </div>
      </Section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6">
        <div className="grid gap-8 rounded-card bg-forest p-8 text-cream sm:p-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-gold uppercase"><T>Visión de largo plazo</T></p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl"><T>Un modelo que aprende, se fortalece y puede replicarse.</T></h2>
            <p className="mt-4 leading-relaxed text-cream/85"><T>La experiencia del piloto podrá orientar futuras adaptaciones en otros territorios, incluidos Panamá y Venezuela, siempre que existan condiciones, alianzas y viabilidad comprobables.</T></p>
          </div>
          <div className="space-y-4">
            <img src={media.scalability} alt={t("Visión de escalabilidad del Proyecto Génesis")} loading="lazy" className="w-full rounded-card" />
            <img src={media.impact} alt={t("Visión de impacto social y productivo")} loading="lazy" className="w-full rounded-card" />
          </div>
        </div>
      </section>

      <Section title="Cómo sabremos si avanzamos">
        <p><T>El seguimiento combinará indicadores económicos y sociales, definidos para cada etapa y publicados cuando exista información verificable. Entre ellos podrán considerarse la continuidad de las unidades productivas, ingresos frente a costos, empleos y actividades creadas, personas formadas, participación comunitaria y recursos reinvertidos.</T></p>
        <p><T>Génesis se encuentra en fase de desarrollo y planificación. Las metas, los presupuestos, los plazos y los resultados se comunicarán a medida que sean aprobados y puedan respaldarse. Esta presentación describe la visión y el modelo propuesto; no constituye una promesa de rentabilidad ni una oferta de inversión.</T></p>
      </Section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6">
        <div className="rounded-card border border-line bg-card p-8 dark:border-white/10 dark:bg-navy sm:p-10">
          <p className="text-xs font-bold tracking-[0.2em] text-gold-deep uppercase"><T>Construyamos alianzas con propósito</T></p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl text-navy dark:text-cream sm:text-4xl"><T>El futuro del proyecto se construye con conocimiento, trabajo y colaboración.</T></h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-mist dark:text-cream/75"><T>Buscamos personas, organizaciones y aliados que quieran contribuir con experiencia, capacidades, investigación y participación responsable en el desarrollo de esta iniciativa.</T></p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/voluntariado" className="inline-flex h-12 items-center justify-center rounded-full bg-forest px-6 text-sm font-bold text-cream"><T>Participar como voluntario</T></Link>
            <Link to="/soporte" className="inline-flex h-12 items-center justify-center rounded-full border border-forest px-6 text-sm font-bold text-forest dark:border-gold dark:text-gold"><T>Contactar con Fundación VNE</T></Link>
            <Link to="/donaciones" className="inline-flex h-12 items-center justify-center rounded-full border border-line px-6 text-sm font-bold text-navy dark:text-cream"><T>Conocer las formas de apoyo</T></Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}

function MediaImage({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} loading="lazy" className="max-h-[28rem] w-full object-cover" />;
}
