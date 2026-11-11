import { catalog } from "./catalog.ts";

export type Language = "es" | "en" | "pt";
export const languageOptions = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
] as const;
export function isLanguage(value: unknown): value is Language {
  return value === "es" || value === "en" || value === "pt";
}

export function negotiateLanguage(header: string | null | undefined): Language | undefined {
  if (!header) return undefined;
  const ranked = header
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.map((param) => param.trim()).find((param) => param.startsWith("q="));
      const rawQuality = qParam?.slice(2);

      const validQuality = rawQuality === undefined || /^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(rawQuality);
      const quality = validQuality ? (rawQuality === undefined ? 1 : Number(rawQuality)) : 0;
      return { base: tag.toLowerCase().split("-")[0], quality, index };
    })
    .filter((item) => item.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);
  for (const item of ranked) if (isLanguage(item.base)) return item.base;
  return undefined;
}
export function translate(source: string, language: Language) {
  if (language === "es") return source;
  const key = source.replace(/\s+/g, " ").trim();
  const translated = catalog[key]?.[language === "en" ? 0 : 1];
  if (translated === undefined) return source;
  return (source.match(/^\s*/)?.[0] ?? "") + translated + (source.match(/\s*$/)?.[0] ?? "");
}
