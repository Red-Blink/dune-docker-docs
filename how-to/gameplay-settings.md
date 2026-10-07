# Change Gameplay Settings

Use **Maps → Interactive Modifiers → Custom Settings** for the official supported gameplay controls. Choose **Global** when you want the value to apply across the Battlegroup, then search for the setting or choose its category.

Change the value, save, and follow the restart prompt. Confirm the task completed before testing in game. Some legacy controls require an exported client configuration as well; read the setting's help text rather than assuming every setting is server-only.

## Base Reconstruction Cooldown

**Base Reconstruction Cooldown (Hours)** / `BaseBackupToolTimeRestriction` is measured in **hours**. Its minimum is `0.2` hours, or 12 minutes.

| Desired cooldown | Custom Settings value | Synchronized legacy seconds |
| --- | --- | --- |
| 12 minutes | `0.2` | `720` |
| 15 minutes | `0.25` | `900` |
| 6 hours | `6` | `21600` |

Current Console versions synchronize the legacy `m_BaseBackupToolTimeRestrictionInSeconds` value. Do not maintain two conflicting values or enter `21600` into the **Hours** field. Update the Console if you are still on an older version without the synchronization fix.

To test repacking, build a small base, pack it, place it again, wait for the configured cooldown, and try packing it a second time. A successful first pickup does not test the reconstruction cooldown.

If a client configuration export is required, use the Console's generated export. Retail client files belong under `Saved/Config/Windows`, not `WindowsClient`.

## Building Limits

**Building Piece Limit Multiplier** and **Fiefdom Limit** are different controls. Fiefdom Limit changes the allowed claims; it is not a multiplier for every base-piece cap.

The Console allows values above the recommended maximum for settings that support an override, including Building Piece Limit Multiplier. That does not guarantee the game honors every value or that the subfief's displayed 5,000-piece limit scales with it. Test the actual placement limit as well as the displayed number, and consider server and client performance before raising limits substantially.

## Where Settings Are Saved

The managed gameplay profile is `runtime/generated/gameplay-profile.ini`. Dune Docker applies it to each map's native configuration when that map starts. Editing a generated map copy is not a reliable way to change a managed setting.

An old, stopped dynamic-map folder can contain older values; it does not prove the running Hagga has the wrong configuration. Check the active map's file and restart result. If a read command returns permission denied, do not treat the missing output as an absent setting.

See [Server Custom Settings](../technical/console/server-custom-settings.md) for file behavior, and [Maps and Sietches](../console/maps-and-sietches.md) for other modifier categories.
