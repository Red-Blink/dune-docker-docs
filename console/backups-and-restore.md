---
icon: box-archive
---

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

{% hint style="danger" %}
A restore replaces the active database state. Download or preserve important backups before cleanup, and read the identity warning carefully.
{% endhint %}

See [Database Backup Identity](../technical/console/database-backups.md) for the full decision matrix.
