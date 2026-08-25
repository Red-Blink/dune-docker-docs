---
---

# First Run

The first login opens guided setup. Complete each step in order; the Console validates required files and services before presenting normal administration pages.

## Recommended Order

1. Enter and validate the Funcom hosting token.
2. Set the public server title and initial gameplay choices.
3. Confirm the generated network ports.
4. Start the Battlegroup from **Home** or **Server Control**.
5. Watch **Readiness** until the core services and required maps are ready.
6. Join once locally before opening the server to your community.
7. Create a manual database backup after confirming the initial world loads correctly.

## Signing In Later

The administrator password is stored on the host at `runtime/secrets/admin-web-password.txt`. Use the Console **Settings** page to change it. Re-running installation does not recover an older password.

{% hint style="warning" %}
The Console is an administrative interface with powerful game and database actions. Give access only to trusted people and use roles/policies when delegating duties.
{% endhint %}

