# Generator refill caps

**Status:** Current | **Last Updated:** August 2026

`POST /api/bases/:baseId/refill-generators` tops every power device at a base
up to a per-type fuel cap. The defaults live in the `refill` block of
`GENERATOR_TYPES` (`console/api/src/duneDb.js`, ~line 3704) alongside the
existing display name / accepted-fuel / building-type metadata for each
generator type. See [generator-fuel-burn-rates.md](generator-fuel-burn-rates.md)
for how those same generator types map to burn durations.

## Default caps

| Type key | Fuel item | Stack size | Max stacks | Total cap |
|---|---|---:|---:|---:|
| `fuel` | Fuel Cell (`Oil`) | 499 | 1 | 499 |
| `spice` | Spice-infused Fuel Cell (`SpicedFuelCell`) | 499 | 1 | 499 |
| `windTurbineOmni` | Low-grade Lubricant (`WindTurbineLubricant1`) | 100 | 5 | 499 |
| `windTurbineDirectional` | Industrial-grade Lubricant (`WindTurbineLubricant2`) | 100 | 5 | 499 |

Turbines cap at 499 across 5 stacks (4x100 + 1x99) because the game's stack
size for lubricant is 100, unlike the 499-cap Fuel Cell and Spice-infused
Fuel Cell items.

## Overriding the defaults

Operators can retune caps without a rebuild by creating
`runtime/data/generator-refill-caps.json`, the same override-layering pattern
used by `runtime/data/admin-items.json` (loaded by `console/api/src/adminCatalog.js`).
The file is optional — nothing is created by default, and its absence is not
an error.

Loaded by `refillCaps(repoRoot)` in `console/api/src/duneDb.js` (~line 3752),
called once per refill request. Shape: an object keyed by the same type keys
as the table above, each value overriding any subset of `stackSize`,
`maxStacks`, and `totalCap`:

```json
{
  "fuel": { "totalCap": 999 },
  "windTurbineOmni": { "maxStacks": 10, "totalCap": 999 }
}
```

Fields not present in a type's override object keep their default. Types not
present in the file keep all their defaults.

**`templateId` is never overridable.** It's the game's fixed item id for that
type's fuel and is always taken from the built-in default, regardless of what
an override file contains — retuning capacity can't be used to swap what item
gets inserted.

**Every numeric field is clamped**, so a malformed or malicious override file
can't request an oversized insert:

| Field | Min | Max |
|---|---:|---:|
| `stackSize` | 1 | 10000 |
| `maxStacks` | 1 | 50 |
| `totalCap` | 1 | `stackSize * maxStacks` (post-clamp) |

A non-numeric or out-of-range value falls back to that type's default rather
than erroring the whole request. An unreadable or invalid JSON file is logged
as a warning and treated as no overrides (defaults apply everywhere).

## How it's used

`refillBaseGenerators(db, repoRoot, baseId)` (`console/api/src/duneDb.js`,
~line 4730) calls `refillCaps(repoRoot)` once, then for each power device at
the base: tops up existing partial stacks first, then inserts new stacks
bounded by `maxStacks`, `totalCap`, and the inventory's free slot count. A
device already at or above `totalCap` is left untouched (`added: 0`).

The response's `capped: true` flag on a device means it hit `maxStacks` or ran
out of inventory slots before reaching `totalCap` — not an error, just a
partial refill worth surfacing to the operator.

See [generator-fuel-burn-rates.md](generator-fuel-burn-rates.md) for how these
same generator types map to their normal per-unit fuel burn rates.


