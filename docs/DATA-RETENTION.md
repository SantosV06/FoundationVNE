# Volunteer data retention and deletion

## Current implementation

The repository contains `scripts/retention.mjs`, exposed as:

```bash
npm run data:retention
```

The command is read-only by default. It counts volunteer requests in the trash whose `deleted_at` timestamp is older than the configured retention period.

The script requires:

- `DATABASE_URL`: a Neon PostgreSQL connection string using SSL.
- `DATA_RETENTION_DAYS`: an integer between 30 and 3650.

To execute deletion, an operator must explicitly pass:

```bash
npm run data:retention -- --apply
```

The apply operation permanently deletes eligible soft-deleted rows from `volunteer_requests` and records a retention event in `admin_events`. It does not purge active requests and does not currently define a purge policy for `admin_events`.

## No automatic deletion

There is intentionally no scheduled deletion workflow. Setting `DATA_RETENTION_DAYS` in Vercel does not trigger deletion by itself.

Do not add a scheduled `--apply` task until the organization has approved, in writing:

- the retention period and its legal/operational basis;
- the categories of records covered;
- the handling of requests subject to disputes, legal holds, or investigations;
- the treatment of audit events and security logs;
- who may authorize and execute deletion;
- how deletion and exceptions are documented.

The code's technical minimum of 30 days is a validation constraint, not a legal recommendation.

## Operator procedure

1. Obtain the approved retention period from the organization.
2. Set `DATA_RETENTION_DAYS` as a non-secret Vercel Production environment variable only if the operational process requires it. The value must be an integer from 30 to 3650.
3. Run a dry-run against the intended database and review the eligible count.
4. Confirm the target is the correct database and the approval covers the records identified.
5. Obtain a second-person approval before running `--apply`.
6. Record the operator, date, approved period, eligible count, removed count, and relevant audit event identifier without copying personal data into the record.
7. Verify the result with a read-only query.

Never test `--apply` against Production. Use the existing isolated test database or a disposable Neon branch.

## Privacy policy implications

The public privacy notice currently does not specify a concrete retention period. Do not add a number to the public policy until the organization approves it and the technical process can reliably enforce it. Do not imply that all backups, provider logs, or audit events are deleted on the same schedule unless that behavior has been verified.
