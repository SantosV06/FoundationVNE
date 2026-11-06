# Security audit status

This document records source-level and platform-configuration findings from the November 2026 review. It is not a penetration-test certification or a legal opinion.

## Addressed in this branch

- Correct the availability workflow's default target so this repository monitors `https://foundationvne.com`, not the unrelated Prueba-724 deployment.
- Keep the monitor's checks for the public homepage and `/api/health`.
- Update the availability test fixture to use the FoundationVNE production origin.
- Resolve the canonical origin used in Brevo administrative emails from `SITE_URL`, with Vercel's production hostname as a fallback.
- Validate the configured origin as HTTPS and reject credentials, paths, query strings, and fragments.
- Add tests for Vercel hostname fallback and invalid origins.
- Document production operations, environment-variable classification, retention controls, and the boundaries of the current audit.

## Existing controls observed in source

The review found implementations for password hashing with scrypt, hashed session tokens, secure HttpOnly cookies, bounded session lifetime, encrypted TOTP secrets, one-time recovery codes, parameterized SQL, Zod input validation, rate limiting, Turnstile hostname verification, private no-store responses, and administrative event logging.

These are source-level observations. Their presence does not independently establish that every production route is correctly configured or that the deployed behavior has been penetration-tested.

## Legacy volunteer endpoint

The current repository search and route-tree review did not find `/api/get-voluntarios`. No matching rewrite was found in `vercel.json`.

This does not prove that the live domain returns HTTP 404. A direct production HTTP verification is still required. If the route is reachable, treat it as a security incident and investigate the deployed source, rewrites, functions, caches, and database access immediately.

## Outstanding work outside this code change

1. Verify GitHub branch protection and require pull requests plus successful required checks for `main`. The visible ruleset alone did not demonstrate these requirements; classic branch protection could not be fully verified during the audit.
2. Perform direct production HTTP checks for `/`, `/api/health`, `/api/get-voluntarios`, and relevant private routes using a controlled test account. Do not expose volunteer records during testing.
3. Complete an isolated Neon restore rehearsal and record recovery time and integrity checks.
4. Obtain institutional approval for data-retention periods and audit-log retention before scheduling deletion.
5. Verify legal entity, EIN, addresses, donation destination, tax statements, and other institutional claims against authoritative records. No legal or tax status is inferred by this audit.
6. Review the public privacy notice after retention and data-flow decisions are approved.
7. Expand translation coverage for user-facing strings stored in data modules, after mapping which fields are actually rendered and translated.
8. Review current production security headers and CSP behavior against the live site, including required third-party resources.

## Verification boundaries

- GitHub CI, CodeQL, and dependency-audit runs previously inspected completed successfully.
- The Vercel deployment associated with the merged main commit was reported READY.
- A short recent Vercel runtime-log window had no errors; this is not evidence about longer periods.
- Direct production HTTP checks could not be completed during the earlier review because the inspection environment could not reliably resolve/retrieve the live endpoints.
- A READY deployment is not a substitute for functional, authorization, privacy, or recovery testing.

## Severity and change control

Fixes that affect data deletion, credentials, authentication, access control, or Production environment settings require explicit review. Do not merge this branch or run a Production deployment until the pull-request checks and human review are complete.
