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

Checking for updates alone does not install them. A busy server can delay application according to the wait policy. Regis Tanks must be disabled before game-server updates; see [Regis Tanks](regis-tanks.md).

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
