---
---

# Addon Development

Start from the [Official Addon Template](https://github.com/Red-Blink/dune-docker-addon-template). It provides the supported manifest structure and packaging conventions.

## Design Rules

1. Request only the permissions the addon genuinely needs.
2. Keep game/database writes behind platform-owned permissioned actions.
3. Validate all user-controlled values and use idempotent request identifiers where supported.
4. Preserve addon state across upgrades.
5. Package immutable release assets and update the community index through review.
6. Document setup, permissions, schedules, recovery, and removal.

The [Community Addons index](https://github.com/Red-Blink/dune-docker-addons) is the official catalog consumed by the Console. Addon manifests are validated and permission changes require fresh approval.

Detailed contracts: [Addon Item Grants](https://github.com/Red-Blink/dune-awakening-selfhost-docker/blob/main/docs/addons/addon-item-grants.md), [Addon Scheduled Jobs](https://github.com/Red-Blink/dune-awakening-selfhost-docker/blob/main/docs/addons/addon-scheduled-jobs.md), and [Addon Hardware Status](https://github.com/Red-Blink/dune-awakening-selfhost-docker/blob/main/docs/addons/hardware-status.md).
