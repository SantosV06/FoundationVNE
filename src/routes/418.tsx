import { T } from "@/lib/i18n";
import { ErrorPage } from "@/components/error-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/418")({
  head: () => ({
    meta: [
      { title: "418 · I'm a teapot | Fundación VNE" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: TeapotPage,
});

function TeapotPage() {
  return (
    <ErrorPage
      code="418"
      eyebrow="VNE · HYPOTETICAL PROTOCOL"
      title={<T>I'm a teapot</T>}
      description={<T>La tetera se niega, de manera deliberada, a preparar café. Es una referencia al código HTTP 418.</T>}
      actionLabel={<T>Volver al inicio</T>}
      teapot
    />
  );
}
