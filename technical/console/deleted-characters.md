# Deleted Characters

Players → **Deleted Characters**.

Finds characters that no longer exist on the server but still hold bases or vehicles, and
lists what each one left behind. Base rows link through to the Bases tab. Vehicle rows
provide a direct, confirmed Delete action so the operator can remain in this view; the same
safety backup and live-map queue used by the Vehicles tab still apply.

This is a different feature from **Recover Deleted Character** (Players → select a living
character → Admin → Repair). That one is account-scoped and restores a deleted character's
saved data onto the account's current character. This one is server-wide and is about the
buildings and vehicles a deleted character left on the map.

## Why the obvious query finds nothing

The intuitive approach — look for permission rows whose player no longer has a character —
returns zero rows on a healthy server, always. Two independent mechanisms guarantee it:

1. `dune.permission_actor_rank.player_id` references `dune.actors(id)` **`ON DELETE
   CASCADE`**. A permanently deleted character (`dune.delete_account_permanently`) has its
   controller, pawn and state actors deleted, so its permission rows cascade away with them.
2. `dune.ownership_handle_actor_delete()` — called by **both** `dune.delete_account` (the
   ordinary soft-delete path) and `delete_account_permanently` — collects every
   `permission_actor_id` on which the player holds rank 1, then deletes *every* rank row on
   those actors, not only the owner's.

Measured against a live server: 44 `permission_actor_rank` rows, none of them dangling.
`dune.actors.owner_account_id` is also NULL on every base claim actor and every vehicle, so
that column resolves nothing either.

In other words, the game deliberately severs the link between a character and its property
at the moment of deletion. The base and the vehicle survive; the ownership record does not.

## What the console uses instead

### Finding the orphans

An asset is treated as orphaned when it has a `dune.permission_actor` row but **no rank on
it resolves to a living character**:

```sql
not exists (
  select 1
  from dune.permission_actor_rank par
  join dune.actors holder on holder.id = par.player_id
  join dune.player_state ps on ps.account_id = holder.owner_account_id
  where par.permission_actor_id = <actor id>
)
```

The `permission_actor` row is what makes this specific. It is the record that the asset was
claimed by somebody at some point, and `ownership_handle_actor_delete` leaves it in place
while deleting the ranks beneath it. Two things are correctly excluded as a result:

- **Unclaimed world content.** CHOAM vehicle spawns (`BP_Sandbike_CHOAM` and friends, with
  an `m_SpawnerName` in `actors.properties`) have no `permission_actor` row at all. On the
  reference server, 6 of the 8 rank-less vehicles were world spawns.
- **Bases picked up with the base-backup tool.** That tool unclaims a base by deleting its
  `permission_actor` *and* `permission_actor_rank` rows, so the fingerprint already skips
  it. The query additionally excludes anything registered in
  `dune.base_backup_linked_actors`, in case a redeploy ever restores `permission_actor`
  without its ranks.

The single `not exists` also covers a second, defensive case: ranks that survive but resolve
to no `Active` character. That produces no rows today, but it would if a future game patch
stopped cascading.

### Naming the deleted character

`dune.player_state` is a view over `dune.encrypted_player_state` filtered to
`character_state = 'Active'`. A soft-deleted character keeps its `encrypted_player_state`
row with `character_state = 'Deleted'`, and its name is readable through
`dune.decrypt_user_data(encrypted_character_name)`.

`dune.account_removal_log` supplies the reason and timestamp. It has no key back to the
character-state row it deleted — only `account_id`, which an account reuses every time the
player recreates — so the console correlates the two within a ±5 second window around
`last_character_state_change`, nearest first. The two known reasons are surfaced as:

| `account_removal_log.reason` | Shown as | Means |
| --- | --- | --- |
| `new char in fls` | Recreated Character | The player deleted this character and immediately made another on the same Funcom account. The account is still active under a new name, shown in **Replacement Character**. |
| `deleted in fls` | Deleted In FLS | An outright deletion. Usually no replacement character. |

### Tying the two together

`dune.player_respawn_locations` is the surviving link:

```
player_respawn_locations
  character_id      -> encrypted_player_state(id)  ON UPDATE CASCADE ON DELETE CASCADE
  locator_actor_id  -> actors(id)                  ON DELETE CASCADE
```

The cascade to `encrypted_player_state` gives it exactly the right lifetime. It outlives a
soft delete, because the `encrypted_player_state` row stays; it dies with a permanent
delete, where nothing about the character is recoverable anyway.

Only the asset-bearing groups are used — `BaseTotem`, `Vehicle` and `RespawnBeacon`. The
remaining groups (`Checkpoint`, `CheckpointSafe`, `PlayerStart`) are world spawn points and
would attribute shared map furniture to individual players. The group is shown in the
**Matched By** column so it is always visible *why* an asset was attributed:

| Group | Matched By |
| --- | --- |
| `BaseTotem` | Base Totem |
| `Vehicle` | Respawn Point |
| `RespawnBeacon` | Respawn Beacon |

## Unattributed Orphans

Attribution is best-effort by construction, and the page says so rather than hiding it.

A character who owned three bases but only ever set a respawn point at one of them leaves
one attributed base and two orphans with no trail. Those appear in the **Unattributed
Orphans** toggle at the bottom of the page. It is closed by default and remains available
when empty. An asset
listed there is just as abandoned as one listed under a name — the console simply cannot
prove whose it was.

An asset whose respawn record points at a deleted character that the page did not load (past
the result cap, or deleted between two queries) also falls back to unattributed rather than
being dropped.

## Reading the page

- The summary line states how many deleted characters hold assets, and how many other
  deleted characters hold none — the latter are not listed, but they are counted.
- Each character row expands to its bases and vehicles, with account id, character-state id,
  FLS id and last-seen time.
- **Open** on a base jumps to that base on the Bases tab, with the ID already in the search
  box.
- The trash icon on a vehicle asks for confirmation, then deletes it in place or reports
  that deletion was safely queued until its running map next restarts or stops.

Results are capped at 500 characters and 2000 assets. If a cap is hit the page says so
rather than quietly truncating.

## Limitations

- **No vehicle condition percentage.** `dune.vehicle_modules` stores durability inside a
  `stats` jsonb that needs the Vehicles tab's parsing machinery. The fitted-module count is
  shown instead.
- **`RespawnBeacon` is matched literally.** The locator is the beacon actor, not the base
  totem it stands inside, so a beacon-only trail does not roll up to its containing base.
  Resolving that would need land-claim geometry.
- **A database restored across time zones loses the removal reason.**
  `encrypted_player_state.last_character_state_change` is `timestamp` *without*
  time zone, so it only means anything relative to the Postgres `TimeZone` in force
  when `dune.delete_account` wrote it. The console anchors it back to the database's
  current `TimeZone`, which is correct as long as that hasn't changed. Restore a
  backup onto a host in a different zone and the ±5s correlation stops matching:
  **Status** falls back to "Reason Unrecorded" rather than showing a wrong reason.
  The window is deliberately not widened to cover arbitrary offsets — Recover
  Deleted Character keys its `recoverable` flag off the same reason, and a wrong
  match there would restore the wrong character.

- **Hard-deleted accounts leave nothing.** `delete_account_permanently` removes the
  `encrypted_accounts` row, which cascades `encrypted_player_state` away. Assets from such
  an account can still appear as unattributed orphans, but no name can ever be recovered
  for them.

## Schema requirements

Required, or the page reports itself unsupported and names what is missing:
`dune.encrypted_player_state`, `dune.account_removal_log`, `dune.player_respawn_locations`,
`dune.permission_actor`, `dune.permission_actor_rank`, `dune.actors`, `dune.player_state`,
`dune.buildings`, `dune.building_instances`, `dune.actor_fgl_entities`, `dune.vehicles`,
and the function `dune.decrypt_user_data(bytea)`.

Optional — absent, these degrade one field rather than failing the page:
`dune.world_partition` (Sietch labels), `dune.accounts` (FLS ids),
`dune.base_backup_linked_actors` (base-backup exclusion), `dune.placeables` (placeable
counts), `dune.vehicle_modules` (fitted-module counts).

## API

`GET /api/players/deleted-characters` — see [API-REFERENCE.md](API-REFERENCE.md).
