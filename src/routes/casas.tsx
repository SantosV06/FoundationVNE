import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/casas")({
  beforeLoad: ({ search }) => {
    throw redirect({ to: "/genesis", search, replace: true });
  },
});
