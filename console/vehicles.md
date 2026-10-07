# Vehicles

The Vehicles page lists player vehicles, ownership/sharing, location, fuel, and component condition. A player's Vehicles tab narrows the same information to vehicles they own or share.

## Administration

Use the lifecycle filters to distinguish spawned, backed-up, travelling, and **Stored for Recovery** vehicles. A stored vehicle is not sitting at an active map coordinate. Supported recovery records have a separate **Delete Stored Vehicle** action with confirmation and owner-offline checks; do not delete them as ordinary spawned vehicles.

- Review individual modules and their recorded current/maximum durability.
- Open a fitted storage module's cargo hold, inspect capacity and item details, and delete selected cargo with the required safeguards.
- Repair modules below the chosen durability threshold.
- Manage Owner, Co-Owner, and Associate access.
- Transfer an unclaimed vehicle to the Server custodian or permanently delete a vehicle after reviewing its dependent records and confirmation.
- Focus a vehicle from related Console pages.

Vehicle durability is stored across multiple game representations. The Console repairs supported comparable components and reports anything whose maximum cannot be trusted rather than claiming a false repair.

{% hint style="info" %}
Repair is a database-backed operation for an offline player/vehicle state. Follow the action's offline instruction and verify in game after the player reconnects.
{% endhint %}

See [Vehicle Permissions](../technical/console/vehicle-permissions.md), [Vehicle Storage Contents](../technical/console/vehicle-storage.md), and [Vehicle Deletion](../technical/console/vehicle-deletion.md) for detailed behavior.

For experimental tank spawning and its limitations, use [Enable and Spawn Regis Tanks](../how-to/regis-tanks.md).
