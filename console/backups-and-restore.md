# Backups and Restore

The Backups page manages full PostgreSQL backups and clearly labels why each backup was created.

| Type | Meaning |
|---|---|
| Manual Backup | Created directly by an administrator. |
| Automatic Backup | Created by the scheduled backup service. |
| Restore Safety Backup | Created before a risky repair/editor action so that change can be reversed. |
| Market Bot Backup | Created before Market Bot mutates exchange data. |

## Restore Identity

If a backup's Battlegroup ID differs from the current deployment, choose deliberately:

- **Adopt Backup ID** when moving the same server to replacement hardware.
- **Keep Current ID** when importing data into a different server identity.

The Console refuses to guess because characters and server identity are related.

During a restore, Console and addon database activity pauses automatically until PostgreSQL has finished replaying the backup and restoring project-owned triggers. This prevents background tasks from recreating a trigger in the middle of `pg_restore`; no market-history or addon data needs to be deleted manually.

{% hint style="danger" %}
A restore replaces the active database state. Download or preserve important backups before cleanup, and read the identity warning carefully.
{% endhint %}

See [Database Backup Identity](../technical/console/database-backups.md) for the full decision matrix.

To move an existing Funcom Hyper-V server, follow [Migrate a Hyper-V Database](../getting-started/migrate-hyper-v-database.md) to export, transfer, import, and restore both required backup files safely.

## Encrypted System Backups

A database backup contains game data but not the host configuration. Use **System Backups (Encrypted)** when moving or rebuilding an entire Dune Docker installation. A system backup contains a fresh database dump together with `.env`, `runtime/generated`, and `runtime/secrets`, including the Funcom token and Console credentials.

Choose a strong passphrase and keep it somewhere separate from the archive. The passphrase cannot be recovered by the project. The Console can create, download, import, preview, and restore these archives without buffering a multi-gigabyte upload in memory.

On a new host, the first-run wizard can install the required game files and restore a system backup before the Battlegroup is started. A restore previews its effects first, preserves the replaced local state in a safety copy, restores the database and configuration, starts the restored Battlegroup, and reloads the Console. A restore launched later from the Backups page instead leaves Dune services stopped for you to start from Server Control after reviewing the result.

See [Database and System Backups](../technical/console/database-backups.md) for migration steps, identity choices, retention, security, and command-line equivalents.
