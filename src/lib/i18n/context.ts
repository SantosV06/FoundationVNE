import { createContext, useContext } from "react";
import type { Language } from "./translate";
import type { MessageId } from "./message-catalog";

export const LanguageContext = createContext({
  language: "es" as Language,
  setLanguage: (_language: Language) => {},
  t: (source: string) => source,
  tKey: (id: MessageId): string => id,
});
export const useLanguage = () => useContext(LanguageContext);
