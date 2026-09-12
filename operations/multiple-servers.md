# Multiple Servers on One IP

Multiple isolated Battlegroups can share one public IPv4 address only when every instance has a non-overlapping port profile and the router/firewall forwards each range correctly.

Each installation needs unique Console, messaging, HTTP, Gateway, and UDP map ports, plus an isolated Compose/project identity and data paths. Hairpin/NAT behavior must also work for local clients using the public address.

The optional public-directory probe uses UDP `32000–32015` for direct latency. Its fixed range is not rewritten by the multi-server profile tool; relay fallback remains available where the direct path cannot be routed.

{% hint style="danger" %}
Do not start a second installation by copying only part of an existing profile. A single overlapping game or messaging port can produce intermittent registration and travel failures that resemble a game bug.
{% endhint %}

Follow the complete [multi-server implementation guide](https://github.com/Red-Blink/dune-awakening-selfhost-docker/blob/main/docs/runtime/MULTI-SERVER-SINGLE-PUBLIC-IP.md) before deploying this layout.
