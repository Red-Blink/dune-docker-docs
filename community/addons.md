---
---

# Community Addons

Community Addons extend the Console with optional pages and automation. Browse and manage them from **Addons**.

## Permission Model

- Every addon declares capabilities from a platform-defined permission list.
- Installation does not silently grant requested permissions.
- The owner reviews and approves permissions.
- An update that adds permissions requires approval for those additions.
- Installed settings, schedules, and enabled state are preserved across compatible updates.
- Provenance and download validation protect the install path from untrusted assets.

Browse the [Community Addons repository](https://github.com/Red-Blink/dune-docker-addons). Developers should begin with the [Official Addon Template](https://github.com/Red-Blink/dune-docker-addon-template) and [Addon Development](../developers/addon-development.md).

{% hint style="warning" %}
An addon can be safe only within the permissions you approve. Review new permissions after every update and remove addons you no longer trust or use.
{% endhint %}

