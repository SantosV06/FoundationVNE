import { createServerFn } from "@tanstack/react-start";
import { defaultHomeContent } from "./home-content";
import { homeContentSchema } from "./admin-operations";
export const getPublicHomeContent = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { database } = await import("./volunteer-service.server");
    const sql = await database();
    const [row] = await sql.query<{ content: unknown }>(
      "SELECT content FROM site_content WHERE id=1",
    );
    return row ? homeContentSchema.parse(row.content) : defaultHomeContent;
  } catch {


    console.warn(JSON.stringify({ event: "home-content:unavailable" }));
    return defaultHomeContent;
  }
});
