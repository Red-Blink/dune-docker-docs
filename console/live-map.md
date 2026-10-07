# Live Map

The Live Map renders selected Hagga Basin or Deep Desert partitions with live and static layers, coordinates, map bounds, Coriolis information, and linked administration actions. Deep Desert uses the game's cartography terrain when the matching assets are available and falls back safely when they are not.

## Layers

Available layers can include online players, bases, vehicles, spice/resource fields, static resources, caves, ecological labs, POIs, trainers, vendors, fortresses, hazards, and other marker types present in the game data. Empty categories are hidden. Save browser-specific default visibility through the Layers settings.

Deep Desert coordinates include their A1–I9 sector where applicable. Vehicles that are traveling, backed up, or awaiting recovery are labeled from their recorded lifecycle state instead of being presented as spawned in a nonexistent partition.

## Actions

When the Deep Desert terrain and layout are available, use **Tilt** or right-drag to tilt and rotate the terrain. **Top-Down** resets the view. **Elevation Lines** is available in the layer controls. This changes the Console map view, not the player's in-game camera.

**Flat Map (Layout Unknown)** means the current layout could not be established; it is not a missing slider that can be enabled independently. Offline partitions can still show saved data, but teleporting requires an eligible running destination. Do not start a map just to interpret saved markers as live positions.

- Click a player, base, vehicle, resource, or POI marker for details.
- Open a base directly in the Bases page.
- Drag an online player marker to teleport that player.
- Teleport an eligible online player to another marker.
- Use **Clear** to remove selected coordinates.

The map resolves the user-defined Sietch/partition display name. Coriolis seed and countdown are read from current game-server evidence rather than guessed from the browser clock.

See [Live Map Internals](../technical/console/live-map.md) for marker sources and coordinate behavior.
