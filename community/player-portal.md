# Player Portal and Privacy

The optional Player Portal lets a server owner offer private, Steam-linked character information through DuneDocker.app without exposing the Console itself.

Depending on enabled features, a player can see character and Sietch information, server-scoped market/buyback status, a private Live Map view limited to data the server publishes for that authenticated player, and other private portal views supported by the current release.

## Opt-In Boundary

- Disabling Player Portal prevents the Console from reading or uploading character membership for directory matching.
- Enabling the public server listing does not automatically enable Player Portal data.
- Steam/account identifiers are used only for the requested private match and are not displayed in the public directory.
- Character levels in the public directory are available only from updated servers that have the relevant portal option enabled.
- Private Live Map publication is independently controlled and must not expose another player's private location or activity.

This distinction allows an owner to publish a server listing while keeping all player data local.
