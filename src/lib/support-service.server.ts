import { randomUUID } from "node:crypto";
import { database, enforceLimit } from "./volunteer-service.server.ts";
import type { StoredSupportRequest } from "./support-schema.ts";

export async function saveSupportRequest(input: StoredSupportRequest) {
  const sql = await database();

  const existing = await sql.query<{ id: string }>(
    "SELECT id FROM support_requests WHERE request_key = $1",
    [input.requestKey],
  );
  if (existing.length) return { ok: true, created: false };

  await enforceLimit(sql, "support", 30, 60);
  await enforceLimit(sql, "support", 5, 60, `email:${input.correo.toLowerCase()}`);

  const inserted = await sql.query<{ id: string }>(
    `INSERT INTO support_requests (id, nombre, apellido, correo, descripcion, request_key)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (request_key) DO NOTHING RETURNING id`,
    [randomUUID(), input.nombre, input.apellido, input.correo, input.descripcion, input.requestKey],
  );

  return { ok: true, created: inserted.length > 0 };
}
