# Migrate a Hyper-V Database

Use this guide to move an existing Funcom Hyper-V Battlegroup database into Dune Docker Console. You need the exported database file and its matching metadata sidecar:

```text
<name>.backup
<name>.backup.yaml
```

{% hint style="danger" %}
Restoring replaces the target Battlegroup database and disconnects its players while database-dependent services restart. The Console restore does not create an additional pre-restore backup, so make and download a current Docker backup first if the target contains anything you may need. Stop the old Hyper-V Battlegroup before starting the migrated copy; do not run two servers with the same Battlegroup identity.
{% endhint %}

## Before You Start

- Complete Dune Docker setup and confirm its Console and database are healthy.
- Keep the Funcom self-host token that belongs to the Hyper-V Battlegroup. Adopting the exported Battlegroup identity is blocked unless the configured token matches it.
- Confirm that the Windows computer can reach the Hyper-V VM by SSH.
- Do not create new characters on the restored server until you verify the migration.

## 1. Export from Hyper-V

Run `battlegroup.bat` on the Hyper-V host and choose **export**. Save both paths printed by the tool. They normally resemble:

```text
/funcom/artifacts/database-dumps/.../<name>.backup
/funcom/artifacts/database-dumps/.../<name>.backup.yaml
```

The `.backup.yaml` file is required. It carries the source identity and other metadata Dune Docker uses to validate the restore.

## 2. Prepare File Transfer in the Funcom VM

In `battlegroup.bat`, choose:

```text
shell-vm
```

Install the OpenSSH transfer components inside the Alpine VM:

```bash
sudo apk update
sudo apk add openssh-client openssh-sftp-server
```

## 3. Copy Both Files to Windows

Open PowerShell as Administrator. Replace the example VM address and full paths with the values from the export:

```powershell
scp "dune@192.168.1.50:/funcom/artifacts/database-dumps/.../<name>.backup" "$env:USERPROFILE\Downloads\"
scp "dune@192.168.1.50:/funcom/artifacts/database-dumps/.../<name>.backup.yaml" "$env:USERPROFILE\Downloads\"
```

`$env:USERPROFILE\Downloads\` selects the current Windows user's Downloads folder. Verify that both files finished copying and are not empty.

## 4. Import into Dune Docker Console

1. Open **Dune Docker Console → Backups**.
2. In **Import External Backup**, choose the `.backup` file under **Backup File**.
3. Choose its matching `.backup.yaml` file under **Metadata File**.
4. Select **Import**.

Import copies and validates the pair. It does not restore the database yet. The imported backup appears in the Backups list under a safe local name.

## 5. Restore the Imported Backup

Select **Restore** in the imported backup's Actions column and read the identity prompt carefully:

- Choose **Adopt Backup ID** when moving the same Hyper-V server to Dune Docker on new hardware. The current Funcom token must belong to that exported Battlegroup.
- Choose **Keep Current ID** only when intentionally importing the data into a different Battlegroup. Choosing the wrong identity can make restored characters unavailable.

Confirm the restore. Dune Docker validates the backup, stops database-dependent services, replaces the database, adapts it to the selected identity, and starts the Dune stack again. Keep the Console page open to follow progress.

## 6. Verify the Migration

After the task succeeds:

1. Wait for **Readiness** to report healthy.
2. Confirm the expected players, bases, vehicles, maps, and Sietches in the Console.
3. Join with an existing character before allowing new character creation.
4. Create a fresh Dune Docker backup after confirming the migrated world is correct.

If the restore reports a token or Battlegroup mismatch, stop and correct the token or identity choice. Do not work around that protection by editing the backup metadata.
