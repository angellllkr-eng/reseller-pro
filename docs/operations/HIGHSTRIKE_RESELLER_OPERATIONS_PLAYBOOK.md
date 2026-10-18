# HighStrike Reseller Operations Playbook

## Purpose

Define a safe, measurable operating model for growth and service operations in Reseller Pro. This document is an integration plan, not evidence that campaign dispatch, billing, provisioning, support automation, or production telemetry is currently implemented.

## Operating principles

- Default every new campaign, webhook, billing workflow, and provider action to dry-run until an explicit, reviewed release enables it.
- Keep customer data, credentials, payment details, provider secrets, and personal contact data out of logs, fixtures, public issues, and campaign exports.
- Treat repository documentation and test results as evidence; do not claim a feature is live merely because it is planned here.
- Use least-privilege credentials, scoped permissions, environment separation, rate limits, idempotency, and auditable operator approvals.
- Do not contact customers, charge or refund payments, register/transfer domains, provision hosting, change DNS, or modify production accounts without a specifically approved and verified workflow.

## Reseller journey and campaign stages

1. **Plan** — define audience, geography, offer, owner, budget ceiling, customer impact, data source, and measurable outcome.
2. **Qualify** — validate audience eligibility, consent/lawful basis, suppression lists, regional requirements, and offer accuracy.
3. **Approve** — record an accountable approver, versioned campaign plan, change summary, and rollback/stop conditions.
4. **Preview** — generate a deterministic preview of landing-page copy, channels, audience counts, and intended actions without external side effects.
5. **Stage** — test against synthetic or explicitly approved test records and sandbox providers.
6. **Authenticate** — validate webhook signatures over raw request bytes, enforce timestamp freshness and payload limits, validate event schemas, and reject invalid requests before side effects.
7. **Deduplicate** — use a durable, atomic idempotency store keyed by provider and event ID. A process-local map is test-only and is not production replay protection.
8. **Dispatch** — enqueue only approved actions; apply bounded retries, rate limits, provider timeouts, dead-letter handling, and a kill switch.
9. **Verify** — reconcile the provider response with internal state and retain a minimal, tamper-evident audit receipt.
10. **Measure and review** — report funnel conversion, delivery failures, complaints/opt-outs, cost, and incidents with definitions, time windows, and source evidence.

## Reseller-specific integration boundaries

Potential integration points must be discovered in the codebase before implementation:

- **Customer onboarding:** account status, verification state, plan eligibility, and consent preferences.
- **Domains and hosting:** availability checks and quote previews may be read-only; registration, transfer, provisioning, DNS changes, and renewals are consequential actions requiring explicit approval and idempotent provider handling.
- **Billing:** use provider sandbox mode for tests; verify signed payment events and reconcile payment state server-side. Never trust browser redirects as proof of payment. Do not store card data or expose secrets.
- **Support and service levels:** define priority, ownership, response target, escalation path, and auditable resolution state. Avoid claiming an SLA is met without timestamped evidence.
- **Regional acquisition:** UK, Germany, and Bulgaria landing pages require localized copy, accurate offer terms, appropriate privacy notices, consent/suppression behavior, and region-specific legal review before publication or outreach.
- **Analytics:** collect only necessary events, document event names and retention, avoid sensitive payloads, and separate synthetic test traffic from production metrics.

These are design targets, not assertions that the corresponding modules or provider integrations exist.

## Webhook security requirements

- Verify the signature over the exact raw request bytes using the provider's documented scheme and a secret supplied through a secret manager or protected environment variable.
- Use constant-time comparison for equal-length signature bytes; reject malformed encodings and unsupported algorithms.
- Enforce timestamp freshness and a strict request-body size limit.
- Validate JSON shape, event type, provider/account scope, and required event identifiers.
- Claim idempotency atomically in durable storage only after authentication and validation. Define retention and recovery behavior.
- A storage failure, duplicate event, invalid signature, stale timestamp, or unsupported event must fail closed and must not trigger an external action.
- Redact secrets and personal data from logs. Emit a correlation ID and a minimal security outcome.
- Test valid, altered-body, wrong-secret, stale, malformed, oversized, unsupported, duplicate, and storage-unavailable cases.

## Auditability and incident response

Keep append-only event receipts with event ID, action type, approval reference, actor/service identity, timestamps, outcome, correlation ID, and a digest or provider receipt where appropriate. Do not label storage “immutable” or “WORM” unless that property is configured and independently verified. Restrict read access and set retention/deletion rules consistent with privacy obligations.

For repeated failures, suspected replay, unexpected billing/provisioning actions, or customer-impacting incidents: stop the affected workflow, preserve minimal evidence, notify the responsible operator, reconcile provider and internal state, and document recovery before re-enabling.

## Required release gates

- [ ] Repository structure and existing architecture inspected.
- [ ] Threat model and data-flow map reviewed.
- [ ] Consent, suppression, privacy notice, retention, and regional requirements reviewed.
- [ ] Unit and integration tests pass; security edge cases included.
- [ ] Durable atomic idempotency and queue behavior verified.
- [ ] Provider sandbox tests and reconciliation verified.
- [ ] Logs redact secrets and minimize personal data.
- [ ] Rate limits, bounded retries, dead-letter queue, alert ownership, and kill switch tested.
- [ ] Billing, domain, hosting, DNS, messaging, and production credentials isolated by environment.
- [ ] Rollback plan, accountable operator, and approval evidence recorded.
- [ ] Production activation approved separately after evidence review.

## Initial implementation sequence

1. Inventory the repository and identify the actual application framework, existing services, test runner, CI workflows, and current integrations.
2. Add this playbook and a concise implementation-status document without changing production behavior.
3. Implement schema validation and deterministic dry-run previews that cannot make network calls or external changes.
4. Add security-focused webhook tests and a provider-neutral verification interface.
5. Select and implement durable idempotency and queue adapters only after the runtime and storage architecture are confirmed.
6. Add sandbox integration tests, audit receipts, operator alerts, and documented recovery procedures.
7. Release through a reviewed pull request; retain production features as disabled until all release gates have evidence.

## Status and evidence

This document records intended controls and a proposed sequence. It does not prove that the application has been inspected end-to-end or that any provider, billing, campaign, provisioning, telemetry, durable audit, or alerting integration is operational. Update this section only with verifiable paths, tests, workflow runs, and deployment evidence.
