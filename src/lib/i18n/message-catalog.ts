import type { Language } from "./translate";

export const messageCatalog = {
  "volunteer.confirmation.body": {
    es: ", tu solicitud quedó registrada correctamente. El equipo de voluntariado la revisará y se pondrá en contacto contigo si necesita información adicional.",
    en: ", your application has been registered successfully. The volunteer team will review it and contact you if further information is needed.",
    pt: ", sua solicitação foi registrada com sucesso. A equipe de voluntariado irá analisá-la e entrará em contato se precisar de mais informações.",
  },
} as const;

export type MessageId = keyof typeof messageCatalog;

export function translateMessage(id: MessageId, language: Language): string {
  return messageCatalog[id][language];
}
