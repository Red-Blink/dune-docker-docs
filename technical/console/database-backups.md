# Database backups and Battlegroup identity

**Status:** Current | **Last Updated:** August 2026

Database backups contain character and world data associated with a Battlegroup
ID. Restoring a backup into a deployment with a different ID therefore requires
an explicit identity choice before any restore changes are made.

- **Adopt Backup ID** is for moving the same server to new hardware or a fresh
  installation. The restore verifies that the saved Funcom token belongs to the
  backup Battlegroup before proceeding.
- **Keep Current ID** is for intentionally importing data into a different
  server. Characters associated with the backup ID may not appear in game.

The Backups page shows this choice whenever both IDs are known and differ. The
command line has the same safety behavior:

```bash
dune db restore BACKUP --adopt-backup-battlegroup
dune db restore BACKUP --keep-current-battlegroup
```

An unattended restore with mismatched IDs fails before changing the database
unless one of these options is supplied. Adoption is also refused if the backup
metadata has no usable ID or the configured Funcom token does not match it.

Manual, automatic, imported, and pre-operation backups follow the same rules;
the decision is based on the recorded Battlegroup IDs, not the backup's origin.


