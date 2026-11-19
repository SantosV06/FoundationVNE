import test from "node:test";
import assert from "node:assert/strict";
import { supportRequestSchema } from "./support-schema.ts";

const valid = {
  nombre: "Ana",
  apellido: "Pérez",
  correo: "ana@example.com",
  descripcion: "No carga el formulario de contacto.",
  requestKey: "8e2e74f5-54f2-4bb1-bd61-83f11f56a8d9",
  turnstileToken: "turnstile-token",
};

test("support request accepts complete contact and issue details", () => {
  assert.equal(supportRequestSchema.parse(valid).descripcion, valid.descripcion);
});

test("support request rejects invalid email and short descriptions", () => {
  assert.equal(supportRequestSchema.safeParse({ ...valid, correo: "not-an-email" }).success, false);
  assert.equal(supportRequestSchema.safeParse({ ...valid, descripcion: "Error" }).success, false);
});

test("support request limits description length", () => {
  assert.equal(
    supportRequestSchema.safeParse({ ...valid, descripcion: "x".repeat(5001) }).success,
    false,
  );
});
