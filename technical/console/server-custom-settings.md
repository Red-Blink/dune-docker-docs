# Server Custom Settings

Reviewed against Console v1.4.47 behavior, October 2026.

Use **Maps → Interactive Modifiers → Custom Settings**. Select the intended target, edit the supported controls, save, and follow the restart prompt. Use **Global** for Battlegroup-wide settings.

## Managed Source and Native Files

The managed source is `runtime/generated/gameplay-profile.ini`. Global official settings use this section:

```ini
[ServerCustomGlobal:/Script/DuneSandbox.UserServerCustomSettings]
```

Dune Docker materializes those settings into each applicable map's native file:

```text
runtime/game/<server>/Saved/Config/LinuxServer/ServerCustomSettings.ini
```

It keeps `DifficultyLevel=Custom`, preserves unmanaged native values, and applies managed settings after the old game process stops so shutdown does not overwrite them. Do not edit an individual generated map file as the source of truth for a managed setting. Stopped dynamic-map folders can contain older values until their next start.

## Validation and Overrides

Enumerations use supported choices; booleans use switches. Numeric validation distinguishes required bounds from recommended bounds where overrides are supported. Building Piece Limit Multiplier can exceed its recommended maximum; this does not guarantee that the game enforces every requested value or scales every category of building limit.

The **Building Restriction Limits** control materializes the patch-1.5 `bIsBuildingRestrictionsEnabled` key as well as retaining the legacy profile value needed by older builds.

## Base Reconstruction Synchronization

`BaseBackupToolTimeRestriction` is in **hours**, with a minimum of `0.2`. Current Console versions synchronize `m_BaseBackupToolTimeRestrictionInSeconds` in the legacy settings: `0.2` hours becomes `720` seconds, and `6` hours becomes `21600` seconds. Do not independently maintain conflicting values.

Client overrides, where required, belong in the exported retail `Saved/Config/Windows/Game.ini` or `Engine.ini`, not `WindowsClient`. Use the Console export rather than inventing a second value.

See [Change Gameplay Settings](../../how-to/gameplay-settings.md) for beginner examples and a meaningful repack test.
