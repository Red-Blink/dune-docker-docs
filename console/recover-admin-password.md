# Recover the Admin Web Password

The generated Dune Docker Console password is stored locally on the server. Run these commands from the account that owns the installation.

{% hint style="warning" %}
The password grants administrative access. Read it only in a private terminal and do not paste it into chat, screenshots, issue reports, or shell history.
{% endhint %}

## View the Current Password

For the standard installation path:

```bash
cat "$HOME/dune-awakening-selfhost-docker/runtime/secrets/admin-web-password.txt"
```

If Dune Docker was installed elsewhere, use that project path instead.

## Change It While Signed In

The preferred method is **Settings → Login Password** in Dune Docker Console. Enter the current password and a new password that is at least 13 characters and includes lowercase, uppercase, a number, and a special character. The Console signs you out after saving so you can sign in with the new password.

## Reset It from the Server

If you cannot sign in, edit the local password file:

```bash
cd "$HOME/dune-awakening-selfhost-docker"
nano runtime/secrets/admin-web-password.txt
chmod 600 runtime/secrets/admin-web-password.txt
runtime/scripts/dune console restart
```

Store exactly one password line that meets the same requirements. The running Console keeps its password in memory, so the Console restart is required after a manual file edit. This rebuilds and replaces the Console container; it does not restart the game maps.

{% hint style="info" %}
If the Console says the password is managed by `ADMIN_PASSWORD`, the environment value overrides this file. Update that configured value securely, then run `runtime/scripts/dune console restart`.
{% endhint %}
