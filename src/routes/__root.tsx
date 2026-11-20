import { getDefaultLanguage } from "@/lib/i18n/default-language";
import { browserLanguage, preferredLanguage } from "@/lib/i18n/preference";
import { requestNonce } from "@/lib/csp-nonce";
import { languageFromSearch, languageHref, localizedHead } from "@/lib/i18n/seo";
import { isLanguage } from "@/lib/i18n/translate";
import {
  createRootRoute,
  redirect,
  HeadContent,
  Outlet,
  Scripts,
  retainSearchParams,
  useRouterState,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { LanguageProvider, T } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { ErrorPage } from "@/components/error-page";
import { CookieConsent } from "@/components/cookie-consent";
import appCss from "../styles.css?url";

const themeBoot = `(function(){try{if(localStorage.getItem("vne-theme")==="dark")document.documentElement.classList.add("dark");}catch(e){}})();`;

export const Route = createRootRoute({
  validateSearch: (search: Record<string, unknown>): { lang?: "es" | "en" | "pt" } => ({
    lang: isLanguage(search.lang) ? search.lang : preferredLanguage(),
  }),
  beforeLoad: async ({ location, search }) => {
    if (isLanguage(search.lang)) return;
    const language = browserLanguage() ?? (await getDefaultLanguage());
    if (language !== "es")
      throw redirect({
        to: location.pathname,
        search: { ...search, lang: language },
        replace: true,
      });
  },
  search: { middlewares: [retainSearchParams(["lang"])] },
  head: ({ matches }) =>
    localizedHead(
      {
        meta: [
          { charSet: "utf-8" },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
          { title: "VNE | Fundación Venezuela Nueva Esperanza" },
          { name: "application-name", content: "Fundación VNE" },
          {
            name: "description",
            content:
              "VNE es Fundación Venezuela Nueva Esperanza: organización con propósito social que impulsa proyectos productivos, Casas VNE y Proyecto Génesis para fortalecer la autonomía y el desarrollo sostenible.",
          },
          {
            "script:ld+json": {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://foundationvne.com/#organization",
                  name: "Fundación Venezuela Nueva Esperanza LLC",
                  legalName: "Fundación Venezuela Nueva Esperanza LLC",
                  alternateName: [
                    "Fundación VNE",
                    "VNE",
                    "Venezuela Nueva Esperanza",
                  ],
                  url: "https://foundationvne.com/",
                  description:
                    "VNE es Fundación Venezuela Nueva Esperanza, una organización con propósito social dedicada al desarrollo social y económico mediante proyectos productivos.",
                  email: "info@foundationvne.com",
                  sameAs: ["https://www.instagram.com/fundacionv.n.e/"],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://foundationvne.com/#website",
                  url: "https://foundationvne.com/",
                  name: "Fundación VNE",
                  alternateName: ["VNE", "Venezuela Nueva Esperanza"],
                  publisher: {
                    "@id": "https://foundationvne.com/#organization",
                  },
                  inLanguage: ["es", "en", "pt"],
                },
              ],
            },
          },
          { name: "theme-color", content: "#131e3d" },
          ...(requestNonce() ? [{ name: "vne-csp-nonce", content: requestNonce()! }] : []),
        ],
        links: [
          { rel: "icon", type: "image/svg+xml", sizes: "any", href: "/favicon.svg?v=4" },
          ...(__SITE_ORIGIN__ && matches.at(-1)?.pathname !== "/solicitudes"
            ? [
                {
                  rel: "canonical",
                  href: languageHref(
                    __SITE_ORIGIN__,
                    matches.at(-1)?.pathname ?? "/",
                    languageFromSearch(matches.at(-1)?.search ?? {}),
                  ),
                },
              ]
            : []),
          ...(__SITE_ORIGIN__ && matches.at(-1)?.pathname !== "/solicitudes"
            ? ["es", "en", "pt", "x-default"].map((lang) => ({
                rel: "alternate",
                hrefLang: lang,
                href:
                  lang === "x-default"
                    ? `${__SITE_ORIGIN__}${matches.at(-1)?.pathname ?? "/"}`
                    : languageHref(
                        __SITE_ORIGIN__,
                        matches.at(-1)?.pathname ?? "/",
                        lang === "en" || lang === "pt" ? lang : "es",
                      ),
              }))
            : []),
          { rel: "stylesheet", href: appCss },
        ],
      },
      matches.at(-1)?.search ?? {},
      false,
    ),
  component: RootDocument,
  notFoundComponent: NotFoundPage,
  errorComponent: RootErrorPage,
});

function NotFoundPage() {
  return (
    <ErrorPage
      code="404"
      eyebrow="VNE · NOT FOUND"
      title={<T>Esta dirección no existe</T>}
      description={<T>La página que buscas no está disponible o la dirección fue escrita incorrectamente.</T>}
      actionLabel={<T>Volver al inicio</T>}
    />
  );
}

function RootErrorPage({ reset }: ErrorComponentProps) {
  return (
    <ErrorPage
      code="500"
      eyebrow="VNE · SERVER ERROR"
      title={<T>Algo salió mal</T>}
      description={<T>Se produjo un error inesperado. Puedes intentarlo de nuevo o regresar al inicio.</T>}
      actionLabel={<T>Volver al inicio</T>}
      onRetry={reset}
      retryLabel={<T>Intentar nuevamente</T>}
    />
  );
}
function RootDocument() {
  const search = useRouterState({ select: (state) => state.matches.at(-1)?.search ?? {} });
  return (
    <html lang={languageFromSearch(search)} suppressHydrationWarning>
      <head>
        <HeadContent />
        <script nonce={requestNonce()} dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>
        <LanguageProvider>
          <Outlet />
          <CookieConsent />
        </LanguageProvider>
        <Scripts />
      </body>
    </html>
  );
}
