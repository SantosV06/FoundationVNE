# Security hardening — November 2026

This note records the safeguards added after the review of commit `9c603d3`.

## Preview database isolation

Preview remains disabled unless an isolated database is deliberately configured. Do not copy Production's `DATABASE_URL` into Preview.

To enable database-backed Preview testing, configure these **Preview-only** Vercel variables:

- `PREVIEW_DATABASE_URL`: pooled Neon connection string for a dedicated preview branch.
- `PRODUCTION_DATABASE_HOST`: hostname of the Production Neon endpoint (hostname only; this is not a credential).
- `PREVIEW_DATABASE_ISOLATED=true`: explicit opt-in after the two values above are verified.

Do not define `DATABASE_URL` in the Preview environment. Runtime selection and deploy-time migrations use `PREVIEW_DATABASE_URL` for Preview and `DATABASE_URL` only for Production. Both the deploy validator and runtime reject a Preview database host matching `PRODUCTION_DATABASE_HOST`.

If these variables are absent, keep `PREVIEW_DATABASE_ISOLATED` unset: the volunteer form, admin panel, and Preview migrations remain disabled. No Preview database or secret is provisioned by this change.

## Administrative password resets

Resetting any administrator password now requires the owner's current password. The admin panel requests it before sending a reset. Password verification is repeated on the server, and the update is conditioned on the owner's credential hash remaining unchanged. Existing session revocation and audit logging remain in place.

Access enable/disable operations do not require a password reset and retain their existing owner authorization.

## Login-failure audit

Failed login events now store keyed HMAC fingerprints for the submitted username and client address. Raw usernames, addresses, and submitted passwords are not added to the audit event.

## Email formatting

Volunteer status notifications use actual line breaks in their plain-text alternative.

## Release blockers and decisions still required

- **Nitro:** do not downgrade the current Nitro v3 Vite integration to Nitro v2 without a compatibility migration. At this review date, Nitro v3 is published as a release candidate, while the npm package page identifies v2 as the stable major. Reassess when Nitro v3 is stable and update the lockfile through a real npm install; do not hand-edit dependency metadata.
- **Retention:** automatic deletion must not be enabled until the organization approves a documented retention period for active requests, trashed requests, and audit events. The existing manual retention command is not a substitute for that policy.
- **CSP on non-GET HTML responses:** verify the final deployed headers and error-response behavior before removing the static fallback policy.
- **Session inactivity and 2FA policy:** decide whether to introduce idle expiry and make 2FA mandatory for every administrator. Do not silently change the existing owner recovery process.

## Deployment boundary

This branch does not change Production environment variables, configure Citibank, enable Brevo in Preview, or merge itself into the Production branch. Production deployment remains a separate, explicitly authorized step.
