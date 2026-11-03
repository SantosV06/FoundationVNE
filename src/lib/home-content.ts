import type { HomeContent } from "./admin-operations";
import { translate } from "./i18n/translate";
const title = "Somos Fundación VNE, Venezuela Nueva Esperanza.";
const description = "Fundación Venezuela Nueva Esperanza. Casas VNE y Proyecto Génesis.";
export const defaultHomeContent: HomeContent = {
  title: { es: title, en: translate(title, "en"), pt: translate(title, "pt") },
  description: {
    es: description,
    en: translate(description, "en"),
    pt: translate(description, "pt"),
  },
};
