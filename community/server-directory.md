# Public Server Directory

[DuneDocker.app](https://dunedocker.app/) helps players discover community servers and lets owners present live, useful information about their Battlegroup.

## Listing Features

- Online state, current player count, region, capacity, and Sietches.
- Personalized latency checks where the server opts into the public probe, with a direct path when available and automatic relay fallback.
- Community description, rules, Discord invite, and active gameplay modifiers.
- Modifier values grouped by Global, each Sietch, and each Deep Desert instance.
- Character-level badges for Steam-linked users when that server enables Player Portal data.

Claim the listing from Console **Settings** to verify ownership and manage its public profile. Local/LAN-only servers are not listed.

## Personalized Latency

The directory tests latency from the visitor's browser to participating servers. A direct result uses the server's dedicated UDP `32000–32015` probe range. Permit or forward that range through the host firewall and any upstream internet-to-DMZ firewall or router for the fastest measurement.

Opening this optional range is not required for listing or joining a server. If the direct path is unavailable, the check automatically uses the Dune Docker relay and may report higher latency.

## Character View

On the directory, **My Characters** keeps the full server list visible but moves servers containing the signed-in user's characters to the top. The LVL column shows a highlighted level badge where a matching character exists and `-` otherwise.

{% hint style="info" %}
Directory ranking is recalculated from the website's ranking period; it is not a permanent position and does not update from a single momentary player-count spike.
{% endhint %}
