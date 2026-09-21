# Database and System Backups

**Status:** Current | **Last Updated:** September 2026

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

## Moving to a new host with a system backup

A plain database download contains the PostgreSQL dump and its `.yaml`
metadata. It does not include the Console configuration or credentials.

An encrypted system backup contains a fresh database dump together with:

- `.env`
- `runtime/generated/`, including IAM policies and Console-owned state
- `runtime/secrets/`, including the Funcom token, Console password, session
  secret, RabbitMQ credentials, and Sietch join password

Create one from **Backups -> System Backups (Encrypted)** or from a shell:

```bash
dune db backup-system
```

The archive is a point-in-time capture. It is encrypted by GnuPG with
AES-256-OCB authenticated encryption, so corruption or tampering is detected
when it is decrypted.

{% hint style="danger" %}
There is no way to recover a system backup without its passphrase. Store the
passphrase in a password manager, separate from the archive. Anyone who has the
archive and passphrase has the server's credentials.
{% endhint %}

The passphrase is not written to the audit log or task log and is not passed on
a process command line. The Console requires at least 12 characters and five
different characters, and asks for it twice when creating an archive.

### Retention and downloads

System backups are kept under `runtime/backups/system/`. They are not deleted
automatically unless `DUNE_SYSTEM_BACKUP_KEEP` is set to a positive number;
the default `0` keeps every archive.

The Console download is one uncompressed `.tar` containing the encrypted
`.tar.gz.enc` archive and its non-secret `.yaml` sidecar. The outer file is not
compressed because encrypted data is already incompressible and a known size
lets the Console stream it instead of loading it into memory.

### Importing on another host

On the destination host, open **Backups -> System Backups (Encrypted)** and
select **Import Backup**. Import accepts the `.tar` downloaded from the Console
or a bare `.tar.gz.enc` archive. Import only stores and validates the upload; it
does not apply it or check the passphrase.

When a name already exists, the Console asks whether to keep both archives or
replace the stored one. Replacement is never assumed because the stored archive
may be the only copy of its credentials.

On a new installation, the first-run wizard offers **Restore a Dune Docker
system backup**. If the Funcom container images are not installed yet, use the
wizard's **Install Game Files** action or run:

```bash
dune update install-assets
```

This downloads and loads the required images without creating or migrating a
database. It refuses while a world server is active unless `--force` is used.

### Previewing and applying a restore

Select **Restore**, enter the passphrase, and run **Preview Restore**. Preview
decrypts and reports what the archive would replace without modifying the host.
**Apply Restore** remains locked until the same browser session or API key has
successfully previewed the same archive within 15 minutes. A changed archive,
expired preview, or preview from a different caller is rejected.

The command-line equivalent uses typed confirmation instead of a browser
preview receipt:

```bash
dune db restore-system <archive> --dry-run
dune db restore-system <archive>
```

The restore writes the database first, then `.env`, `runtime/generated/`, and
`runtime/secrets/`. If the database restore fails, configuration and secrets
remain unchanged. Before replacing local state it creates a plaintext safety
copy under `runtime/backups/restore-<timestamp>/`; the newest five are retained
by default through `DUNE_RESTORE_SAFETY_KEEP`.

If both hosts have an admin audit log, choose deliberately:

- **Adopt Backup History** when moving the same server to new hardware.
- **Keep Current History** when rolling back the same host or intentionally
  restoring into a different server.

The unselected copy remains in the pre-restore safety directory. The same
choices are available as `--adopt-backup-audit-log` and
`--keep-current-audit-log`.

After a successful restore from the Backups page, the Console recreates its own
container so it reads the restored `.env`. A restored password ends the old
browser session, and the restored password is then required. Dune services
remain stopped so the operator can review the result before starting them:

```bash
dune start
```

The first-run restore wizard completes that final `dune start` step itself. If
the Battlegroup cannot start, the restore is still reported as successful and
the wizard tells the operator to start it from Home after the Console reloads.

The Console-only reload is also available as `dune console reload`; it does not
rebuild the image or restart the Battlegroup.
