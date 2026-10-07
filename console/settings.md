# Settings and Access

Settings contains installation-wide choices such as Console access, public directory participation, Player Portal behavior, performance and memory options, Discord integration, server hostname and datacenter identity, and other server configuration.

## Privacy Controls

All external community services are optional. Public listing, anonymous project usage reporting, Player Portal, and character-level publication are controlled independently according to the settings shown in the Console.

When Player Portal is disabled, character membership and levels are not read or uploaded for directory character matching. A server can remain publicly listed without exposing Player Portal data.

## Console Access

- Change the shared administrator password from Settings.
- Give integrations scoped API keys rather than sharing the administrator password.
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

Use **Maps → Interactive Modifiers → Custom Settings** for the supported controls. The Console supplies dropdowns and validates numeric values. Some documented maxima are recommendations rather than hard limits; supported overrides can exceed them. The managed source is `runtime/generated/gameplay-profile.ini`, applied to map configuration on startup. Do not change a managed setting by editing only a map's generated file.

Retail client overrides now use `Saved/Config/Windows/Game.ini` and `Saved/Config/Windows/Engine.ini`. Do not install them under `WindowsClient`.

See [Server Custom Settings](../technical/console/server-custom-settings.md) for the exact behavior.

## Common Settings Tasks

- [Control automatic Battlegroup startup](../how-to/server-startup.md).
- [Change the Console browser port](../how-to/change-game-ports.md#change-only-the-browser-console-port).
- [Enable experimental Regis Tanks](../how-to/regis-tanks.md).
- Claim your public listing through **Public Listing Profile**: generate a claim code on the website, paste it into the Console, and verify it.

A Sietch's game password is changed under **Maps**, not Login Password. Follow [Set a Sietch Password](../how-to/sietch-password.md).
