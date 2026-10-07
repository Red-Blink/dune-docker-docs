# Maps, Sietches, and Deep Desert

The Maps page controls how each game map is hosted and displays the effective Sietch or instance name.

## Map Modes

- **Dynamic** starts and stops a map according to demand.
- **Always On** keeps a map available continuously.
- **Overmap Active** follows Overland-driven activation behavior where supported.
- **Disabled** prevents normal activation.

Existing per-map settings are retained when changing unrelated maps. The Console reports the exact services affected before applying a change.

## Sietches

For step-by-step instructions, see [Set a Sietch Password](../how-to/sietch-password.md), [Rename or Add Sietches](../how-to/manage-sietches.md), and [Change Game Ports](../how-to/change-game-ports.md). Name/password edits restart the affected running Sietch; changing the active count has additional registration effects described in the guide.

Hagga Basin (`Survival_1`) can have multiple Sietch dimensions. Each partition may have a user-facing display name and password. Overland remains **Overland**; Sietch naming applies to Hagga Basin instances, not every map.

## Party-Isolated Activity Maps

Maps configured by the Director for one party per instance can scale to multiple dimensions when unrelated parties request them. This includes Smugglers Run, Ruins of Tsimpo, and Wind Pass in the current defaults. The Autoscaler counts starting instances as capacity, creates only the dimensions needed for demand, respects the configured maximum, and retires transient instances after use.

Cleanup for these activity maps runs after shutdown. A cleanup problem is reported without blocking the next map start.

## CHOAM Terminal Positions

For ordinary difficulty controls, start with [Change Gameplay Settings](../how-to/gameplay-settings.md). Custom Settings, legacy UserGame/UserEngine controls, Spice Fields, and CHOAM Terminals serve different purposes; they are not interchangeable editors.

Interactive Modifiers can place a CHOAM terminal at a trade post's shipped position or capture a custom position from a standing player. The Console waits for a fresh game position update, validates that the result remains close to the selected trade post, and lets you save or apply it. An installed terminal must be reinstalled to move, and its map must restart before the new position appears in game.

## Current Story Maps

Patch 1.5 introduced the connected story maps **Arrakeen Spaceport & Zanovar** (`CB_Story_DestroyedZanovar`) and **Sardaukar Orbital Monitor** (`CB_Story_OrbitalMonitor`). The first internal map contains both the Spaceport and Zanovar portions of the story; progression transfers the player to the Orbital Monitor map.

## Deep Desert Layouts

Choose one, two, or three Deep Desert instances. In a mixed layout:

- The first instance keeps its existing PvE/PvP role.
- The second receives the opposite role.
- The third is explicitly selectable as PvE or PvP.

Layout changes are incremental. Adding an instance configures only the new partition; removing one despawns only the removed partition; unchanged Deep Desert instances stay online. A role change affects only that instance. Overland restarts to load the updated Kanly selection, while Hagga Basin stays online.

{% hint style="warning" %}
Deep Desert layout changes are blocked while players are connected to an affected Deep Desert. Read the confirmation because players in Overland can be disconnected when Overland reloads.
{% endhint %}
