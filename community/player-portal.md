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

## Map Freshness

World layers must come from a recent server snapshot. When the snapshot is missing, older than three minutes, or belongs to an expired Deep Desert cycle, the portal shows **Awaiting Server Sync** and withholds stale world markers, seed and countdown. It checks more frequently while waiting for a fresh upload.

The countdown clears the old world layers at cycle rollover. Static spice spawn locations indicate possible locations, not proof that a large spice blow is currently active. Decoded positions are approximate. The portal's map and the Console's terrain renderer are separate interfaces; a fresh snapshot does not turn the portal into the Console's 3D terrain view.
