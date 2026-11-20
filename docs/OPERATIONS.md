# Production operations

This runbook describes the operational configuration of Fundación VNE. It does not authorize production changes, data deletion, or deployments.

## Canonical production origin

- Canonical site: `https://foundationvne.com`
- Alternate host: `https://www.foundationvne.com` (expected to redirect to the canonical host).
- Health endpoint: `/api/health`

The GitHub Actions workflow `.github/workflows/availability.yml` runs hourly and can also be started manually. It checks the public homepage and `/api/health`. The health endpoint must return a successful response with JSON `{"status":"ok"}`. The monitor follows only the expected same-origin language redirect on the homepage; it rejects unexpected redirects.

Configure this GitHub Actions **variable**:

| Name | Value | Secret? |
| --- | --- | --- |
| `MONITOR_SITE_URL` | `https://foundationvne.com` | No |

Location: GitHub repository → Settings → Secrets and variables → Actions → Variables. Do not create it as a secret.

## Vercel environment variables

Use the scopes shown below. Never copy production database credentials or private API keys into Preview or Development.

| Variable | Production value / source | Sensitive? | Notes |
| --- | --- | --- | --- |
| `SITE_URL` | `https://foundationvne.com` | No | Canonical HTTPS origin; no path or trailing route. Used for internal email links. |
| `DATA_RETENTION_DAYS` | Organization-approved integer from 30 to 3650 | No | Used only when the retention script is run manually. It does not schedule deletion. |
| `DATABASE_URL` | Neon production connection string | Yes | Server-only; use Neon SSL connection string. |
| `ADMIN_PASSWORD` | Provisioned administrator password | Yes | Do not store the value in GitHub or documentation. |
| `ADMIN_SESSION_SECRET` | Random secret of at least 32 characters | Yes | Server-only. |
| `ADMIN_TOTP_ENCRYPTION_KEY` | 32 random bytes encoded as Base64 | Yes | Separate from the session secret. |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret for the production widget | Yes | Server-only; never use a `VITE_` prefix. |
| `VITE_TURNSTILE_SITE_KEY` | Public site key for the same Turnstile widget | No | Public client configuration. |
| `TURNSTILE_EXPECTED_HOSTNAME` | `foundationvne.com` | No | Hostname only; no protocol or path. |
| `BREVO_API_KEY` | Brevo API key | Yes | Server-only. |
| `BREVO_SENDER_EMAIL` | Verified sender address in Brevo | No | Must be authorized by the Brevo account. |
| `BREVO_SENDER_NAME` | `Fundación Venezuela Nueva Esperanza` | No | Display name. |
| `VOLUNTEER_NOTIFICATION_EMAIL` | Approved internal notification mailbox | No | Receives new-volunteer alerts. |
| `SUPPORT_SENDER_EMAIL` | `soporte@foundationvne.com` | No | Verified Brevo sender used by the support form. Production build requires this exact address. |
| `SUPPORT_SENDER_NAME` | `Soporte · Fundación VNE` | No | Display name for support confirmations and alerts. |
| `SUPPORT_NOTIFICATION_EMAIL` | `soporte@foundationvne.com` | No | Receives the complete support report: first name, last name, email and description. Production build requires this exact address. |
| `CITIBANK_GATEWAY_TOKEN` | Only when the bank integration is approved and enabled | Treat as sensitive until bank confirms exposure model | The current application sends this token to the browser; it is not a server API secret. Do not enable without bank confirmation. |
| `CITIBANK_IFRAME_URL` | Bank-provided HTTPS iframe URL with required token placeholder | No | Do not invent or substitute a URL. |

The project also accepts the legacy `CITYBANK_*` names for the card integration. Do not add or enable bank variables merely to make the integration appear active.

### Existing platform-provided fallback

The email module can derive the production origin from Vercel's `VERCEL_PROJECT_PRODUCTION_URL` if `SITE_URL` is absent. Keep `SITE_URL` explicitly configured to the canonical domain to avoid ambiguity.

## Brevo email behavior

The volunteer flow saves the request independently of email delivery. Brevo failures are logged without exposing message bodies, recipient addresses, or API keys. The internal notification includes a link to `/solicitudes` when a valid production origin is available.

## Support form and error reports

The public support channel is available at `/soporte`. Visitors can use **Reportar un problema** to submit a website error, broken link, display issue, or navigation problem. The form collects:

- First name (`nombre`) and last name (`apellido`).
- Contact email (`correo`).
- Problem description (`descripcion`), between 10 and 5,000 characters.

### Request handling

1. The server validates the submitted fields and verifies the Cloudflare Turnstile token against the expected production hostname.
2. A hidden honeypot field is used to discard automated submissions. A request UUID prevents the same submission from being stored twice.
3. Rate limits are applied globally and per email address.
4. A valid report is stored in Neon in the `support_requests` table. The schema is introduced by `migrations/0009_support_requests.sql`.
5. Brevo sends a receipt confirmation to the address supplied by the visitor and a complete internal notification to the support mailbox. The internal notification contains the name, email, and full description; its `Reply-To` is set to the visitor's email so the team can reply directly.

The report is saved before the email notifications are attempted. Email delivery is therefore a separate operation: Brevo API/network failures are logged and do not roll back the saved report. If the support email configuration is missing, the request may already be stored even though the form displays an error. Check Neon and the Vercel runtime logs before asking a visitor to submit the same report again.

### Support-specific Brevo configuration

Set these variables in Vercel → Project → Settings → Environment Variables, with the **Production** scope:

| Variable | Required value | Purpose |
| --- | --- | --- |
| `BREVO_API_KEY` | Private Brevo API key | Authenticates server-side transactional email requests. Reuse the existing key; never expose it to the browser or commit it. |
| `SUPPORT_SENDER_EMAIL` | `soporte@foundationvne.com` | Verified sender address used for both support emails. This exact address is enforced by the Production deployment check. |
| `SUPPORT_SENDER_NAME` | `Soporte · Fundación VNE` | Display name shown as the sender. If omitted, the application uses this default. |
| `SUPPORT_NOTIFICATION_EMAIL` | `soporte@foundationvne.com` | Destination mailbox for the complete internal report. This exact address is enforced by the Production deployment check. |

**Variable naming:** the application uses `SUPPORT_SENDER_EMAIL` (not `SUPPORT_EMAIL_SENDER`). Do not create a second variable with the reversed name; it is not read by the application. The support sender is separate from the volunteer-flow variables `BREVO_SENDER_EMAIL` and `BREVO_SENDER_NAME`.

Before enabling the flow in Production:

1. Verify `soporte@foundationvne.com` as a sender in Brevo under Settings → Senders & IP → Senders.
2. Confirm the Brevo API key is valid and stored only as a Vercel server-side environment variable.
3. Confirm all four variables above are set in the Production scope. The sender and notification addresses must match the exact values shown.
4. Deploy the application and submit one controlled test report using a mailbox you can access.
5. Verify the report appears in Neon `support_requests`, the visitor receives a confirmation, and the support mailbox receives the full report.
6. Review Vercel runtime logs if either email is missing. Do not include real personal data or report contents in public issues or CI logs.

The Production build check requires `BREVO_API_KEY`, `SUPPORT_SENDER_EMAIL`, and `SUPPORT_NOTIFICATION_EMAIL`. `SUPPORT_SENDER_NAME` is optional because the application supplies a default.

## Database migrations

The Vercel build command runs the application build and then `db:migrate`. Before merging database schema changes:

1. Review the migration SQL.
2. Ensure the change is backward-compatible with the currently deployed application where practical.
3. Run the repository's CI and database tests.
4. Confirm the Production deployment logs report migrations as up to date or successfully applied.
5. Do not use Preview with Production database credentials.

## Health and incident response

If the availability workflow fails:

1. Open the failed GitHub Actions run and identify whether the homepage or `/api/health` failed.
2. Check the current Vercel Production deployment and runtime logs.
3. Check Neon status and connection availability.
4. Do not publish volunteer records, database responses, request bodies, or secrets in an issue or chat.
5. If data exposure is suspected, restrict the affected endpoint or credential, preserve relevant logs, rotate compromised credentials, and follow the organization's incident-response process.
6. Verify recovery with the monitor and a controlled test. Do not treat a green homepage check as proof that every application feature works.

## Neon restore rehearsal

A restore rehearsal must use an isolated Neon branch/database, never overwrite Production:

1. Confirm the Neon project plan and available restore/PITR window.
2. Select an approved restore point in Neon.
3. Restore or branch that point into a separate, clearly named rehearsal branch.
4. Use a temporary connection string kept outside Git and never printed in CI logs.
5. Run the documented schema verification and read-only integrity checks.
6. Record elapsed time, row/table checks, and any missing prerequisites.
7. Delete the rehearsal branch only after the test evidence is recorded and approved.

Do not claim a successful backup or restore until an actual rehearsal has been completed and documented.
