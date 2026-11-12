import { isLanguage, translate, type Language } from "./translate";
export function languageFromSearch(search: Record<string, unknown>): Language {
  return isLanguage(search.lang) ? search.lang : "es";
}
export function languageHref(origin: string, path: string, language: Language) {
  return `${origin}${path}?lang=${language}`;
}
export function localizedHead<
  T extends {
    meta?: { title?: string; name?: string; content?: string; [key: string]: unknown }[];
  },
>(head: T, search: Record<string, unknown>, includeSocial = true): T {
  const language = languageFromSearch(search);
  const localizedMeta = (head.meta ?? []).map((meta) => ({
    ...meta,
    ...(meta.title ? { title: localizedTitle(meta.title, language) } : {}),
    ...(meta.name === "description" && meta.content ? { content: translate(meta.content, language) } : {}),
  }));
  if (!includeSocial) return { ...head, meta: localizedMeta };
  const title = localizedMeta.find((meta) => typeof meta.title === "string")?.title;
  const description = localizedMeta.find((meta) => meta.name === "description")?.content;
  const socialMeta: { property?: string; name?: string; content: string }[] = [
    { property: "og:type", content: "website" },
    ...(title ? [{ property: "og:title", content: title }] : []),
    ...(description ? [{ property: "og:description", content: description }] : []),
    { property: "og:image", content: "https://foundationvne.com/media/impact.webp" },
    { name: "twitter:card", content: "summary_large_image" },
    ...(title ? [{ name: "twitter:title", content: title }] : []),
    ...(description ? [{ name: "twitter:description", content: description }] : []),
    { name: "twitter:image", content: "https://foundationvne.com/media/impact.webp" },
  ];
  const socialKeys = new Set(socialMeta.map((meta) => meta.property ?? meta.name).filter((key): key is string => typeof key === "string"));
  return {
    ...head,
    meta: [
      ...localizedMeta.filter((meta) => {
        const key = typeof meta.property === "string" ? meta.property : meta.name;
        return !key || !socialKeys.has(key);
      }),
      ...socialMeta,
    ],
  };
}
function localizedTitle(title: string, language: Language) {
  const translated = translate(title, language);
  const suffix = " | Fundación VNE";
  return translated === title && title.endsWith(suffix)
    ? `${translate(title.slice(0, -suffix.length), language)}${suffix}`
    : translated;
}
