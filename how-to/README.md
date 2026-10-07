# How Do I...?

Start with what you want to do. These guides use the browser Console first; terminal commands are included only when they help with setup or diagnosis.

## Set Up My Server

- [Change game ports](change-game-ports.md)
- [Set, change, or remove a Sietch password](sietch-password.md)
- [Rename my server or add another Sietch](manage-sietches.md)
- [Keep the Battlegroup stopped after a reboot](server-startup.md)
- [Install on another drive](install-on-another-drive.md)
- [Install using Ubuntu WSL2 and Docker Desktop](windows-wsl2.md)

## Run and Customize My World

- [Change gameplay settings and building limits](gameplay-settings.md)
- [Set up automatic restarts and updates](automation.md)
- [Back up and restore safely](backups.md)
- [Allow or block character transfers](character-transfers.md)
- [Enable and spawn Regis Tanks](regis-tanks.md)
- [Hide inactive players without deleting them](inactive-players.md)
- [Update the Console or the game](updates.md)
- [Find out why players cannot join](connection-problems.md)

## Understand the Names

| Name | What it means |
| --- | --- |
| Console | The administration website you open in your browser. Its password is not the game password. |
| Battlegroup | Your connected game-server services and maps. Stopping it disconnects players. |
| Sietch / Hagga Basin | A playable Hagga instance. The primary one is identified internally as `Survival_1`. |
| Overmap | The world-travel map connecting destinations; not another Hagga Sietch. |
| Deep Desert | A separate map that can be stopped, always running, or started on demand according to its configured mode. |
| Dynamic map | A map started when needed. Being stopped while unused is not necessarily a fault. |
| Console update | Updates the management software. It is separate from a Funcom game-server update. |
| Game update | Downloads and deploys the dedicated-server files used by the game containers. |

For the complete feature tour, open [Console Overview](../console/overview.md). For command-line administration, use the [CLI Reference](../reference/cli-reference.md).
