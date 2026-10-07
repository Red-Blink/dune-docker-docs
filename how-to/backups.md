# Back Up Before Making Changes

Use **Backups** in the Console and check that the backup completed before starting maintenance. Copy important backups off the server: a backup on the same failed drive cannot protect you from losing that drive.

## Choose the Right Kind

| Backup | Use it for |
| --- | --- |
| Database backup | Saved world and character data held in the database. It is not a copy of every installation setting. |
| System backup | Installation recovery, including a fresh database dump and managed configuration/secrets covered by the backup. Treat the archive as sensitive. |
| In-game Reconstruction Tool / base backup | A particular base. It is not a substitute for backing up the server. |

Review the backup's contents and restore preview, especially when moving to another machine. A system backup is not a complete disk image or a promise to include Docker's entire image cache.

## Restore Carefully

A restore can replace newer world progress. Warn players, keep a backup of the current state, select the intended archive, and review the preview before confirming. Follow the workflow's startup instructions: different recovery screens can leave the Battlegroup stopped or start it as part of setup.

Afterward, verify settings, readiness, and a player login. Do not repeatedly apply older backups to troubleshoot an unrelated network problem.

For exact backup scope, schedules, restore behavior, and command-line options, see [Backups and Restore](../console/backups-and-restore.md) and [Database and System Backups](../technical/console/database-backups.md).
