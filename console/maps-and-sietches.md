---
icon: map
---

# Maps, Sietches, and Deep Desert

The Maps page controls how each game map is hosted and displays the effective Sietch or instance name.

## Map Modes

- **Dynamic** starts and stops a map according to demand.
- **Always On** keeps a map available continuously.
- **Overmap Active** follows Overland-driven activation behavior where supported.
- **Disabled** prevents normal activation.

Existing per-map settings are retained when changing unrelated maps. The Console reports the exact services affected before applying a change.

## Sietches

Hagga Basin (`Survival_1`) can have multiple Sietch dimensions. Each partition may have a user-facing display name and password. Overland remains **Overland**; Sietch naming applies to Hagga Basin instances, not every map.

## Deep Desert Layouts

Choose one, two, or three Deep Desert instances. In a mixed layout:

- The first instance keeps its existing PvE/PvP role.
- The second receives the opposite role.
- The third is explicitly selectable as PvE or PvP.

Layout changes are incremental. Adding an instance configures only the new partition; removing one despawns only the removed partition; unchanged Deep Desert instances stay online. A role change affects only that instance. Overland restarts to load the updated Kanly selection, while Hagga Basin stays online.

{% hint style="warning" %}
Deep Desert layout changes are blocked while players are connected to an affected Deep Desert. Read the confirmation because players in Overland can be disconnected when Overland reloads.
{% endhint %}
