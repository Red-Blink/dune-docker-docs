# Set Up Automatic Restarts and Updates

Daily restarts and game updates are separate schedules. Enabling one does not enable the other.

## Daily Restart

Open **Admin Tools → Schedule Server Restart → Daily Restart**. Enable the service, choose **Daily Restart Time**, set **In-Game Notice Before (Min)**, and save.

The displayed schedule uses **local server time**, not necessarily your browser's timezone. Check the status and time shown after saving. Use the Restart Queue for supported changes you want to collect for a later restart rather than applying each immediately.

## Automatic Game Updates

Open **Updates** and configure automatic game updates. Review all of these choices:

- Whether update checking is enabled and how often it runs.
- Whether available updates should actually be applied.
- Whether players should be notified and the warning times.
- Whether to wait for an empty server, and the maximum wait.
- **Update the Console after a game update**: check for and install a newer official Dune Docker release after updating the game.
- **Disable before, restore after the update** under Regis Tanks: explicitly allow the automatic update workflow to turn tanks off before downloading game files.

Checking for updates alone does not install them. A busy server can delay application according to the wait policy. Without the tank-management option, an update is blocked while tanks are enabled. With it, the workflow must confirm tanks are off before continuing. It restores them only after a newer official Dune Docker release has been installed and supports the updated game build; otherwise tanks remain off. Review the reported restore status. See [Regis Tanks](regis-tanks.md).

Automatic Console updating is optional; checking for game updates does not by itself enable it.

## If a Schedule Does Not Run

From your project directory, collect:

```bash
runtime/scripts/dune restart-schedule status
runtime/scripts/dune update auto status
```

If the status reports a host systemd timer, inspect that timer and its service:

```bash
sudo systemctl status dune-awakening-scheduled-restart.timer dune-awakening-scheduled-restart.service --no-pager -l
sudo systemctl status dune-awakening-auto-update.timer dune-awakening-auto-update.service --no-pager -l
```

For a coordinator-managed installation, collect the coordinator logs through the Console instead. Not every installation has host timers or `runtime/generated/restart-schedule.log`. Missing that file alone is not evidence of failure.

Report the configured time, server timezone, Console version, schedule status, and logs around the missed run. An enabled timer without a next trigger needs investigation; “enabled” alone is not proof that it is scheduling work.
