# Addon Development

Start from the [Official Addon Template](https://github.com/Red-Blink/dune-docker-addon-template). It provides the supported manifest structure and packaging conventions.

## Design Rules

1. Request only the permissions the addon genuinely needs.
2. Keep game/database writes behind platform-owned permissioned actions.
3. Validate all user-controlled values and use idempotent request identifiers where supported.
4. Preserve addon state across upgrades.
5. Package immutable release assets and update the community index through review.
6. Document setup, permissions, schedules, recovery, and removal.

## Test Inside the Console Sandbox

An ordinary static preview does not reproduce an installed addon. The Console's iframe and content CSP allow scripts but keep an opaque origin, block direct network connections, and disallow native modal dialogs. Required JavaScript, styles, and setup data should be self-contained. Use bridge-backed persistence instead of browser storage, and render confirmations inside the addon rather than calling `window.confirm()`.

Test the immutable package with the same sandbox/CSP and authenticated content rules. Mock database writes and reward delivery first. Cover initial setup, saved-state reload, canceled confirmations, failures, and pending/uncertain delivery recovery. Do not run an unreviewed companion daemon against a production server as the first test.

See [Browser Sandbox](../technical/addons/addon-runtime-api.md#browser-sandbox) for the runtime contract.

## Supported Runtime Services

With the matching approved permissions, an addon can use typed player summaries and supported progression data, private addon-owned JSON storage, durable idempotent delivery for supported rewards, and queued private player messages. Core-owned delivery queues continue after the addon page closes and survive Console restarts.

Prefer these permissioned services over direct game-database writes. Treat a reward as complete only after its delivery state is `delivered`, and give every delivery a permanent deterministic request ID so retries cannot duplicate it.

The [Community Addons index](https://github.com/Red-Blink/dune-docker-addons) is the official catalog consumed by the Console. Addon manifests are validated and permission changes require fresh approval.

Detailed contracts: [Addon Runtime API](../technical/addons/addon-runtime-api.md), [Addon Item Grants](../technical/addons/addon-item-grants.md), [Addon Scheduled Jobs](../technical/addons/addon-scheduled-jobs.md), and [Addon Hardware Status](../technical/addons/hardware-status.md).
