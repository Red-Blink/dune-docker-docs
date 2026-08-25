---
---

# Updates and QA Builds

The Updates page separates the game server from Dune Docker Console updates.

## Game Update

Checks and installs Funcom's current dedicated-server content through SteamCMD. Automatic game-update checks can be enabled on a rolling interval.

## Console Update

Checks the latest public GitHub release and installs a selected release. The update helper rebuilds and replaces the Console, then the page reconnects to the new build. If reconnection does not occur, **Refresh Now** becomes available.

## QA Tester Access

Approved community members can authorize with Discord. The authorization broker verifies an allowed role and grants access to **Apply Pre-Release**, which installs current GitHub `main` when it is newer than the local build. **Reinstall Latest Public Release** returns the installation to the clean released codebase.

The recognized roles are managed by the project community. Authorization is per Console and should only be completed from a Console the user trusts.

{% hint style="warning" %}
Pre-release builds are for testing. Back up first, expect unfinished behavior, and report results—including a clear follow-up—through the QA channel.
{% endhint %}

