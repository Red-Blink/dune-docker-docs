# Frequently Asked Questions

## General

**Q: What is this bot for?**

It monitors your Dune Awakening game server and shows its health, status,
players, and services through Discord slash commands. Instead of logging into
the WebUI console, you can check everything from Discord.

**Q: Can I add this bot to my server right now?**

Not as a shared public bot. Each Dune server operator runs their own instance
of the bot connected to their own console. This keeps your tokens and server
data private.

**Q: Do I need coding experience to set this up?**

The basic setup (creating a Discord app, inviting the bot, configuring roles)
requires no coding. If someone else handles the server hosting, you can set up
the Discord side in about 15 minutes.

**Q: Is this bot secure?**

The companion bot uses the protected Console adapter rather than direct Docker,
game-file, or database access. Security still depends on keeping tokens private,
limiting roles and permissions, and leaving writes disabled unless needed.

---

## Commands

**Q: Why can't I see the `/dune` commands in my server?**

Two possible reasons:
1. Commands haven't been registered yet. Run `npm run register`.
2. Global registration can take up to an hour. Use `DISCORD_GUILD_ID` for
   instant guild-scoped commands.

**Q: Why do I see "/dune" twice?**

You have both global and guild-scoped commands registered. The fix is to
delete the global registration and use guild-only. Ask your bot admin to
clear the global commands.

**Q: What's the difference between `/dune server status` and `/dune server summary`?**

`status` generates a custom image card with maps, stats, and a Dune quote.
`summary` shows a compact text version — good for scheduled channel posts.

**Q: Why can't I use admin commands like `/dune admin doctor`?**

Admin commands require the Admin role as configured by your server owner.
Regular members with the Observer role can only use read-only commands.

**Q: What does "diagnostic mode" mean?**

Adding `diagnostic:true` to `/dune server status` or `/dune server readiness`
shows detailed technical output — similar to running `dune status` on the
command line. Only available to admins.

---

## Setup

**Q: How do I get my bot token?**

1. Go to [discord.com/developers/applications](https://discord.com/developers/applications)
2. Select your application → **Bot** tab
3. Click **Reset Token** → **Copy**

**Q: Where do I find my role/channel/server IDs?**

1. Enable Developer Mode in Discord: Settings → Advanced → Developer Mode
2. Right-click any role, channel, or server → **Copy ID**

**Q: Can I use this bot on multiple Discord servers?**

Follow the bot's supported deployment configuration. The documented setup pairs
a bot deployment with its configured Console; do not assume that inviting it to
another Discord server automatically gives it a separate Console connection.

**Q: Do I need to open ports on my firewall?**

No. The bot connects OUT to Discord (WebSocket) and OUT to your console API
(localhost). It never listens for incoming connections.

**Q: Can I run the bot on the same machine as the game server?**

Yes, and this is the recommended setup. The bot is lightweight (~100MB RAM)
and communicates with the console over localhost.

---

## Status Updates

**Q: How often does the bot post status updates?**

Every 30 minutes by default. You can change this with
`DUNE_SCHEDULER_INTERVAL_MS` (in milliseconds).

**Q: Can I change which channel the bot posts to?**

Yes — set `DUNE_POST_ALLOWED_CHANNELS` to a comma-separated list of channel
IDs. The bot will post to all listed channels.

**Q: What kinds of updates can I schedule?**

| Setting | Content |
|---------|---------|
| `status-summary` | Compact status with overall/region/mode/population |
| `status` | Full status details |
| `readiness` | Readiness checks |
| `services` | Service container list |
| `none` | Disabled |

---

## Security

**Q: Are my tokens safe?**

Use file-based secrets (`DISCORD_BOT_TOKEN_FILE` with a Docker volume mount),
restrict secret files to their owner, and exclude them from Git and shared logs.
A gitignore rule does not protect a token copied into chat or an exposed backup.

**Q: What if my token gets leaked?**

1. Reset the token immediately in the Discord Developer Portal
2. Update the token file
3. Restart the bot
4. The old token becomes invalid instantly

**Q: Can the bot do anything destructive?**

Commands are read-only by default. Enabling writes permits the configured write
operations through the adapter, subject to its role and action checks. Review
those permissions before enabling them; do not treat write access as harmless.

**Q: Does the bot see my Discord messages?**

No. The bot only uses the Guilds gateway intent — it never reads message
content. It only responds to slash commands.

---

## Troubleshooting

**Q: The bot shows as offline in my server.**

The bot process isn't running on the host machine. Check the Docker container
or Node.js process.

**Q: I see "application did not respond" when using commands.**

Same issue — the bot process needs to be running. This error means Discord
sent the command but nobody was home to answer it.

**Q: Commands aren't showing up in my server.**

Run `npm run register`. If using global registration, wait up to 1 hour.
Use `DISCORD_GUILD_ID` for instant registration.

**Q: I get "not authorized" on commands I should have access to.**

Check that your Discord role ID matches the IDs in the `.env` file under
`DISCORD_OBSERVER_ROLE_IDS` or `DISCORD_ADMIN_ROLE_IDS`.

For a full troubleshooting guide, see [Troubleshooting](troubleshooting.md).

## Sources

- [Admin Guide](admin-guide.md) — full server setup instructions
- [User Guide](../discord-control-bot/user-guide.md) — how to use all commands
- [Troubleshooting](troubleshooting.md) — error messages and fixes
- [Configuration Reference](admin-guide.md#step-10-create-the-configuration-file) — all settings explained
