---
---

# Console HTTP API

The Dune Docker Console API is the local contract used by the browser Console and protected integrations. It covers authentication, setup, tasks, server control, players, inventories, progression, guilds, bases, vehicles, maps, Sietches, Deep Desert layouts, the Live Map, Landsraad, backups, database exploration, exchange tools, messages, updates, addons, settings, and directory services.

{% hint style="warning" %}
This API is an administrative interface, not a public hosted API. Keep it on a trusted network and use the supported authentication flow. Do not place the Console directly on the public internet.
{% endhint %}

## Complete Endpoint Contract

The maintained reference documents every route, method, accepted parameters, response behavior, capability flags, confirmation phrase, and important safety boundary:

<a href="../technical/console/API-REFERENCE.md" class="button primary" data-icon="brackets-curly">Open the Complete API Reference</a>

## Major Resource Groups

| Area | Examples |
|---|---|
| Authentication and setup | Session state, login/logout, CSRF-protected setup and settings |
| Tasks and services | Start/stop/restart, readiness, diagnostics, logs, update tasks |
| Players | Listing, details, inventory, progression, grants, repairs, movement, recovery |
| Bases and vehicles | Listing, scoped ownership, inventory, permissions, refills, claims, deletion |
| Maps | Modes, partitions, display names, Sietches, Deep Desert layout, combat state |
| Market | Exchange board, transaction history, Market Bot schedules/plans/buyback |
| Community | Addons, public directory, Player Portal reporting, QA authorization |

Read [API Authentication and Safety](api-authentication.md) before writing a client. The source dispatcher and tests remain the final authority for behavior on a specific commit.

