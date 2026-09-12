# Restore a Previous Version

Use the self-update command to install an earlier published Dune Docker release by tag.

{% hint style="warning" %}
Downgrading can be incompatible with configuration or Console-owned data created by a newer release. Use it for a specific rollback reason, keep a current backup, and return to the latest release if the older version cannot read the current state safely.
{% endhint %}

## 1. Review Available Releases

```bash
cd "$HOME/dune-awakening-selfhost-docker"
runtime/scripts/dune self-update list
```

Choose an exact published tag such as `v1.4.17`. Do not guess a tag or use a branch name.

## 2. Take a Database Backup

```bash
runtime/scripts/dune db backup
```

The self-update helper also creates a project-files backup under `runtime/backups/self-update/`, but a current database backup gives you a separate recovery point for game data.

## 3. Install the Selected Release

```bash
runtime/scripts/dune self-update install v1.4.17
```

Replace `v1.4.17` with the exact version you selected. Do not run the command with `sudo`.

The helper downloads and verifies the release, preserves supported local configuration and secrets, installs the selected files, and rebuilds the Console. The Console is briefly unavailable during replacement; the command does not restart the game Battlegroup.

## 4. Verify

```bash
runtime/scripts/dune version
runtime/scripts/dune console status
runtime/scripts/dune doctor
```

Open the Console and confirm the expected version and settings. To return to the newest public release:

```bash
runtime/scripts/dune self-update install latest
```
