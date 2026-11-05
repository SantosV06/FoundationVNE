import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, relative } from "node:path";
import test from "node:test";
import ts from "typescript";
import { catalog } from "../src/lib/i18n/catalog.ts";
import { adminCatalog } from "../src/lib/i18n/admin-catalog.ts";
import { messageCatalog } from "../src/lib/i18n/message-catalog.ts";

const root = fileURLToPath(new URL("../src/", import.meta.url));

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return sourceFiles(path);
      return /\.tsx$/.test(entry.name) ? [path] : [];
    }),
  );
  return nested.flat();
}

function normalize(value) {
  return value.replace(/\s+/g, " ").trim();
}

function literalValue(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  return undefined;
}

test("all literal translations in public routes and UI components exist in both catalogs", async () => {
  const files = [
    ...(await sourceFiles(join(root, "routes"))),
    ...(await sourceFiles(join(root, "components"))),
  ];
  const missing = [];

  for (const filename of files) {
    const sourceText = await readFile(filename, "utf8");
    const source = ts.createSourceFile(
      filename,
      sourceText,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    const relativePath = relative(root, filename);
    const isAdmin =
      relativePath === "routes/solicitudes.tsx" || relativePath.startsWith("components/admin-");

    function check(value, kind) {
      const key = normalize(value);
      if (!key) return;
      const entry = catalog[key] ?? (isAdmin ? adminCatalog[key] : undefined);
      if (!entry || !entry[0]?.trim() || !entry[1]?.trim()) {
        missing.push(`${relativePath}: missing ${kind} translation: ${key}`);
      }
    }

    function visit(node) {
      if (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        (node.expression.text === "t" || node.expression.text === "tKey") &&
        node.arguments.length > 0
      ) {
        const value = literalValue(node.arguments[0]);
        if (value !== undefined) {
          if (node.expression.text === "tKey") {
            const entry = messageCatalog[value];
            if (!entry?.es?.trim() || !entry?.en?.trim() || !entry?.pt?.trim()) {
              missing.push(`${relativePath}: missing stable message translation: ${value}`);
            }
          } else check(value, "function");
        }
      }

      if (
        ts.isJsxElement(node) &&
        ts.isIdentifier(node.openingElement.tagName) &&
        node.openingElement.tagName.text === "T"
      ) {
        for (const child of node.children) {
          if (ts.isJsxText(child)) check(child.text, "component");
          else if (ts.isJsxExpression(child) && child.expression) {
            const value = literalValue(child.expression);
            if (value !== undefined) check(value, "component");
          }
        }
      }

      ts.forEachChild(node, visit);
    }

    visit(source);
  }

  assert.deepEqual(missing, [], missing.join("\n"));
});
