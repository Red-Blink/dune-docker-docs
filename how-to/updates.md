# Update the Console or the Game

Use the **Updates** page. A Console update and a game update are different operations, even when they are released on the same day.

| Operation | What it changes | What to expect |
| --- | --- | --- |
| Console update | Administration software, UI, scripts, and bundled fixes | The Console is replaced; follow the release notes for any required game-service restart. |
| Refresh Game Check | Checks the installed and available game builds | Does not install game files. A failed check is not itself a failed installation. |
| Game update | Funcom dedicated-server files and deployment | Plan for game-service interruption and wait for deployment and readiness to complete. |
| QA build | Unreleased Console changes for authorized testers | Can contain unfinished changes; back up and review what is being tested. |

## Before Updating

Create a backup, check free space, and read the release notes. Disable Regis Tanks before updating game files. Do not close the task as soon as download progress reaches 100%: deployment and startup checks can still be running.

## After Updating

Check the final result, required maps, and game build. Test a real connection and travel between maps. A displayed current build is not proof that every running game process has loaded it.

If a game update reports a failure, retain its **Update Log** before retrying. Record the time, Console version, installed/available builds, and whether the Battlegroup was running. A build displayed as `0` is not evidence that the installed files were successfully identified.

For a read-only version check from the project folder:

```bash
runtime/scripts/dune update check
```

Do not rerun a full update, redeploy, or restore a backup just to obtain logs. Steam download failures, registry DNS failures, and GitHub rate limits are different problems. Follow an explicit retry time when provided; avoid repeatedly launching requests during a rate limit.

See [Updates and QA Builds](../console/updates.md), [Automatic Updates](automation.md), and [Restore a Previous Version](../console/restore-previous-version.md).
