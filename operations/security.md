# Security

Dune Docker is an administrative control plane. Protect it like any service that can change a production database.

## Essentials

- Keep the Console restricted to trusted administrators.
- Do not expose PostgreSQL, Docker, RabbitMQ administration, or generated secret files.
- Use strong passwords and narrow IAM policies when delegating access.
- Review addon permissions and provenance.
- Treat addon code as trusted administrator software. A checksum verifies the downloaded bytes, not the author's intent. Install only reviewed versions, approve the minimum permissions, and keep unsupported addons disabled until their developers confirm compatibility.
- Keep secrets out of Git, screenshots, logs, Discord, and support tickets.
- Back up before destructive changes and retain an off-host copy.
- Install public releases from the official repository.

## Safe maintenance

Use HTTPS for browser access and keep the Console behind a trusted network or VPN where possible. Restrict the Console port separately from game ports. Some game services require public connectivity; do not close documented game ports based on generic database or message-broker advice.

Keep dependencies, container images, and the host patched. Test upgrades with disposable data first, review release notes, and verify backups can be restored. A source fix or clean dependency audit does not mean a running service has been updated: record the deployed version and verify it after an authorized maintenance window.

Never attach generated runtime files, `.env`, session stores, database dumps, or addon data to a public issue. If a credential is exposed, revoke or rotate it at its source; deleting the public copy alone does not invalidate it. Use a private channel for security reports and include the affected version and a description without credentials or player data.

The Console uses session authentication, CSRF protection, rate limits, explicit confirmation phrases, allowlisted command arguments, audit records, response redaction, and permission-specific addon/API actions. These controls reduce risk; they do not make an internet-exposed owner account safe.
