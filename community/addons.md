# Community Addons

Community Addons extend the Console with optional pages and automation. Browse and manage them from **Addons**.

## Permission Model

- Every addon declares capabilities from a platform-defined permission list.
- Installation does not silently grant requested permissions.
- The owner reviews and approves permissions.
- An update that adds permissions requires approval for those additions.
- Installed settings, schedules, and enabled state are preserved across compatible updates.
- Provenance and download validation protect the install path from untrusted assets.
- Approved addons can use core-owned storage and delivery services without receiving unrestricted access to Funcom's game tables.

Browse the [Community Addons repository](https://github.com/Red-Blink/dune-docker-addons). Developers should begin with the [Official Addon Template](https://github.com/Red-Blink/dune-docker-addon-template) and [Addon Development](../developers/addon-development.md).

## Browse and Update

The table groups the addon name, author, and description together, with separate Version, Permissions, Status, and Actions columns. Long descriptions offer **More**; descriptions that already fit need no expand button. Permissions describe what the addon can do, not whether its code has been proven correct in every environment.

Enable or disable the addon with its status control. Use the **Sub-Menu** option to pin an installed page for easier access. An available update preserves compatible settings and schedules, but additional permissions still require review.

Catalog lifecycle status is maintained by the project owner. It is separate from whether your installed addon is enabled. A passing metadata/package check verifies the package contract; it does not prove every workflow works in the Console sandbox.

## Remove an Addon

Read the Uninstall confirmation. Removal disables the addon and deletes its installed files and Console-managed jobs/data. An independently installed external daemon may require separate cleanup unless the Console explicitly supports that addon's removal.

For the legacy Airdrop addon, the updated Console also cleans up verified companion containers, known automation triggers, and its isolated addon schema. A cleanup failure leaves the addon disabled and installed so you can correct the problem and retry. If an older uninstall left a daemon behind, reinstall Airdrop without enabling or initializing it, then Uninstall again. See [Addon Removal](../technical/addons/addon-runtime-api.md#addon-removal).

{% hint style="warning" %}
An addon can be safe only within the permissions you approve. Review new permissions after every update and remove addons you no longer trust or use.
{% endhint %}
