# Bases and Land Claims

The global Bases page lists all detected claims. Expand a base to work with power, water, inventory, permissions, blueprints, and land-claim data. The player-scoped Bases tab uses the same tools but shows only bases owned by or shared with that player.

## Common Actions

- Inspect building-piece and placeable counts.
- Refill generators or water manually, or configure automatic refill.
- Tune generator and water auto-refill thresholds and scan intervals from the Bases settings control. These policies are separate from enrolling an individual base.
- Inspect storage and supported container contents.
- Manage owner, co-owner, and associate permissions.
- Set Public, Guild, Associate, Co-Owner, or Owner access on individual doors and devices. Changes for a running map are queued until restart so the Console does not show permissions the game has not loaded.
- Transfer an unclaimed base to the Server custodian before assigning access.
- Open a base from its marker on the Live Map.
- Permanently delete a base with confirmation and a safety backup.

## Land Claim Editor

The Land Claim Editor displays the horizontal staking-unit grid and vertical expansion around the selected Sub-Fief. It can add or remove claim segments and set vertical expansion within the game's effective limit. Changes create a **Restore Safety Backup** and require a Hagga Basin restart before the game loads the edited claim geometry.

{% hint style="danger" %}
Database-level claim editing can place a claim across a region where the game still independently prohibits construction. Claim ownership does not guarantee every world blocker becomes buildable.
{% endhint %}

Detailed behavior: [Base Inventory](../technical/console/base-inventory.md), [Sub-Fief Permissions](../technical/console/base-permissions.md), [Per-Piece Base Permissions](../technical/console/base-child-permissions.md), and [Base Deletion](../technical/console/base-deletion.md).
