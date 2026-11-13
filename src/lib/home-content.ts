import type { HomeContent } from "./admin-operations";
import { translate } from "./i18n/translate";
const title = "Desarrollo productivo que deja capacidad instalada.";
const description = "No nos limitamos a la asistencia puntual: impulsamos proyectos productivos que fortalecen capacidades, autonomía y oportunidades sostenibles mediante Casas VNE y Proyecto Génesis.";
export const defaultHomeContent: HomeContent = {
  title: { es: title, en: translate(title, "en"), pt: translate(title, "pt") },
  description: {
    es: description,
    en: translate(description, "en"),
    pt: translate(description, "pt"),
  },
};
