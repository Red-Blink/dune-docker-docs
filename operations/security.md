---
---

# Security

Dune Docker is an administrative control plane. Protect it like any service that can change a production database.

## Essentials

- Keep the Console restricted to trusted administrators.
- Do not expose PostgreSQL, Docker, RabbitMQ administration, or generated secret files.
- Use strong passwords and narrow IAM policies when delegating access.
- Review addon permissions and provenance.
- Keep secrets out of Git, screenshots, logs, Discord, and support tickets.
- Back up before destructive changes and retain an off-host copy.
- Install public releases from the official repository.

The Console uses session authentication, CSRF protection, rate limits, explicit confirmation phrases, allowlisted command arguments, audit records, response redaction, and permission-specific addon/API actions. These controls reduce risk; they do not make an internet-exposed owner account safe.

