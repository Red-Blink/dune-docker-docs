---
---

# Exchange and Market Bot

The Exchange page includes three related views.

## Exchange

A read-only CHOAM market board aggregates listings by item and grade, showing current price, stock, listing count, seller/party classification, and drill-down orders. Filters can separate player, NPC broker, and configured bot activity.

## Transactions

The transaction history records completed market activity from the time capture is installed. Filter by item or owner, period, party type, and Exchange ID. Historical orders from before installation are not backfilled because the game tables do not retain a trustworthy event time for every aggregated row.

## Market Bot

Market Bot can reseed NPC listings from the bundled or an imported CSV plan, remove its own listings, configure category multipliers and commodity stacks, schedule reseeds, run buyback sweeps, and inspect sweep results. Every market mutation creates a labeled backup. Player listings are not removed by reseeding or unseeding.

Bot Items provides per-item enable, price, and listing-count overrides, plus carefully validated additions from the Console catalog.

{% hint style="warning" %}
The game database cannot identify every external bot perfectly. Review owner classification settings before relying on bot/player filters for moderation decisions.
{% endhint %}

See [Market Board Internals](../technical/console/exchange.md) for data-model and safety details.
