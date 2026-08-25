# Discord Integration

Dune Docker supports an optional protected adapter for companion Discord tooling. It is disabled by default and does not require exposing the Console session to Discord.

The adapter uses bearer authentication, role mapping, rate limits, audit records, and explicit write enablement. Read-only command groups can report server status and data; write-capable operations remain separately gated.

For community support, announcements, addon discussion, and issue triage, join the [Dune Docker Discord](https://discord.gg/duneawakeningdocker).

For configuration details, start with the [Discord Adapter Setup](../technical/integrations/discord-integration/README.md). Developers integrating a companion bot should also review the [Discord API Adapter Contract](../technical/integrations/discord-control-bot/api-adapter-contract.md).
