# Keep the Battlegroup Stopped After a Reboot

You can keep the Console available without automatically starting the game servers.

1. Open **Settings → Server Startup**.
2. Turn off **Start Battlegroup Automatically** using the **Automatic Startup** switch.
3. Wait for the saved confirmation.
4. If the Battlegroup is currently running and you want it stopped now, stop it separately from the server controls.

After the Linux host boots, the Console can start, but you start the Battlegroup manually when you want to play. Turn the switch back on when you want automatic startup again.

Do not change Docker restart policies or disable the orchestrator as a substitute. Those changes can conflict with the installation's managed lifecycle. Scheduled restarts and automatic updates are separate controls; review [Automation](automation.md) as well if you want no scheduled activity.
