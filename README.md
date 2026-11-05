# Fundación VNE

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![CI](https://github.com/SantosV06/FoundationVNE/actions/workflows/ci.yml/badge.svg)](https://github.com/SantosV06/FoundationVNE/actions/workflows/ci.yml)

Sitio oficial de **Fundación Venezuela Nueva Esperanza** y panel de voluntariado.

Stack: React, TanStack Start, TypeScript, Vite, Tailwind. Datos en Neon (en local, PGLite si no hay `DATABASE_URL`). Despliegue en Vercel.

## Uso

Node 24 y npm 11.9.0.

```bash
npm ci --include=dev
cp .env.example .env.local
npm run dev
```

Variables en `.env.example`. **No subas secretos.**

| Comando | Para qué |
| --- | --- |
| `npm run check` | Tipos, lint y pruebas |
| `npm run build` | Build y migraciones |
| `npm run db:migrate` | Migraciones pendientes |
| `npm run test:e2e` | Pruebas de navegador |
| `npm run admin:recover -- admin` | Recuperar al propietario con acceso a la base |

## Qué incluye

Páginas públicas (inicio, Casas VNE, Génesis, liderazgo, soporte, donaciones, voluntariado y textos legales), español / English / português, formulario con Turnstile y panel `/solicitudes`. Restaurante y construcción no se publican hasta nuevo aviso.

Correo con Brevo solo si están `BREVO_API_KEY`, `BREVO_SENDER_EMAIL` y, para el aviso interno, `VOLUNTEER_NOTIFICATION_EMAIL`. El pago con tarjeta en `/donaciones` queda cerrado hasta `CITIBANK_GATEWAY_TOKEN` y `CITIBANK_IFRAME_URL` (`CITYBANK_*` sigue valiendo). Zelle no se procesa en el sitio.

## Seguridad

Para reportar vulnerabilidades de seguridad, consulta [SECURITY.md](SECURITY.md).

- Seguridad: **info@foundationvne.com**
- Soporte / navegación: **soporte@foundationvne.com**

## Código de conducta

Este proyecto sigue el [Contributor Covenant](CODE_OF_CONDUCT.md).

## Licencia

Distribuido bajo la licencia [MIT](LICENSE).
