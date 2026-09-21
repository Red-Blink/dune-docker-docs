# First Run

The first login opens guided setup. Complete each step in order; the Console validates required files and services before presenting normal administration pages.

If you are replacing an existing Dune Docker host, choose **Restore a Dune Docker system backup** instead of configuring a new server. Upload the encrypted archive downloaded from the old host, install the game files when prompted, preview the restore, and then apply it. The wizard starts the restored Battlegroup and reloads the Console when it finishes. The archive's passphrase is required and cannot be recovered. See [Backups and Restore](../console/backups-and-restore.md).

## Recommended Order

1. Enter and validate the Funcom hosting token.
2. Set the public server title and initial gameplay choices.
3. Confirm the generated network ports, including whether you want to allow the optional UDP `32000–32015` direct directory-latency range.
4. Start the Battlegroup from **Home** or **Server Control**.
5. Watch **Readiness** until the core services and required maps are ready.
6. Join once locally before opening the server to your community.
7. Create a manual database backup after confirming the initial world loads correctly. Create an encrypted system backup as well if you want a portable copy of the server configuration and credentials.

## Signing In Later

The administrator password is stored on the host at `runtime/secrets/admin-web-password.txt`. Use the Console **Settings** page to change it. Re-running installation does not recover an older password.

{% hint style="warning" %}
The Console is an administrative interface with powerful game and database actions. Give access only to trusted people and use roles/policies when delegating duties.
{% endhint %}
