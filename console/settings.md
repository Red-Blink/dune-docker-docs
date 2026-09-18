# Settings and Access

Settings contains installation-wide choices such as Console access, public directory participation, Player Portal behavior, performance and memory options, Discord integration, server hostname and datacenter identity, and other server configuration.

## Privacy Controls

All external community services are optional. Public listing, anonymous project usage reporting, Player Portal, and character-level publication are controlled independently according to the settings shown in the Console.

When Player Portal is disabled, character membership and levels are not read or uploaded for directory character matching. A server can remain publicly listed without exposing Player Portal data.

## Console Access

- Change the shared administrator password from Settings.
- Use authorization policies/roles instead of broadly sharing owner access.
- Create named, revocable API keys with only the Read or Read + Write namespaces an external tool needs. Keys cannot reach setup, Console settings, or raw database operations.
- Keep port `8088` private to trusted administrators or protect it through a secure private network/reverse proxy.
- Never paste tokens into chat, issue reports, screenshots, or public logs.

Use [Private Console Access with Tailscale](../getting-started/private-console-access.md) when trusted administrators need secure remote browser access without exposing the Console port publicly.

If you cannot sign in, follow [Recover the Admin Web Password](recover-admin-password.md).

## Patch 1.5 Configuration Files

The current dedicated server stores its official difficulty controls in each map server's:

```text
Saved/Config/LinuxServer/ServerCustomSettings.ini
```

Stop the Battlegroup before editing this file, set `DifficultyLevel=Custom`, save, and then start the Battlegroup. A running game server can overwrite manual edits while shutting down. The Console's **Building Restriction Limits** setting manages the current `bIsBuildingRestrictionsEnabled` key while preserving the other values in the file.

Retail client overrides now use `Saved/Config/Windows/Game.ini` and `Saved/Config/Windows/Engine.ini`. Do not install them under `WindowsClient`.

See [Server Custom Settings](../technical/console/server-custom-settings.md) for the exact behavior.
