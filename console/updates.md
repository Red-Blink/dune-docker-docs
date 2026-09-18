# Updates and QA Builds

The Updates page separates the game server from Dune Docker Console updates.

## Game Update

Checks and installs Funcom's current dedicated-server content through SteamCMD. Automatic game-update checks can be enabled on a rolling interval. Read-only checks use short, bounded retries and cache a successful result, while an actual installation keeps the longer download retry policy.

After new game files are installed, Dune Docker runs Funcom's database migration before starting the Battlegroup. Project-owned addon schemas and triggers are detached safely for the migration and restored afterward. Do not interrupt this step or close the SSH session when updating from the command line.

If a migration fails, the update stops instead of starting newer game binaries against an older database. Run `runtime/scripts/update-db.sh` to retry it and keep the complete output if support is needed.

## Console Update

Checks the latest public GitHub release and installs a selected release. The update helper rebuilds and replaces the Console, then the page reconnects to the new build. If reconnection does not occur, **Refresh Now** becomes available. Finished, failed, and cancelled updates replace the temporary **Updating** state so the page does not remain stuck on stale progress.

## QA Tester Access

Approved community members can authorize with Discord. The authorization broker verifies an allowed role and grants access to **Apply Pre-Release**, which installs current GitHub `main` when it is newer than the local build. **Reinstall Latest Public Release** returns the installation to the clean released codebase.

The recognized roles are managed by the project community. Authorization is per Console and should only be completed from a Console the user trusts.

Need to return to an earlier release? Follow [Restore a Previous Version](restore-previous-version.md).

{% hint style="warning" %}
Pre-release builds are for testing. Back up first, expect unfinished behavior, and report results—including a clear follow-up—through the QA channel.
{% endhint %}
