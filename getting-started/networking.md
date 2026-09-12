# Networking and Ports

For public hosting, forward the game-facing ports to the server running Dune Docker.

| Port | Protocol | Purpose |
|---|---|---|
| `8088` | TCP | Web Console. Restrict this to trusted administrators. |
| `31982` | TCP | RabbitMQ game messaging endpoint. |
| `31983` | TCP | RabbitMQ game HTTP endpoint. |
| `7777–7810` | UDP | Game traffic and map instances. |
| `32000–32015` | UDP | Optional direct public-directory latency checks. Relay fallback remains available when closed. |

The exact UDP assignments and Console port can be changed. Use `dune ports` to inspect the effective profile rather than relying on memory.

## Public IP and NAT

- Forward the configured ports through the router or cloud firewall.
- For the fastest public-directory latency result, permit or forward UDP `32000–32015` through both the host firewall and any upstream internet-to-DMZ firewall or router. This range is optional.
- Make sure the server advertises the public address players can reach.
- NAT loopback behavior differs by router; test from outside your home network.
- Do not publish PostgreSQL or Docker socket access.

If remote players can connect but computers on the server's local network cannot, the router may not support hairpin NAT. Follow the [Local Network NAT Loopback Alternative](nat-loopback.md) to configure a persistent Linux rule and a route on each affected Windows gaming computer.

Use `dune ping`, `dune ports`, and the Console health checks when diagnosing connectivity. For multiple Battlegroups behind one public IPv4 address, follow [Multiple Servers on One IP](../operations/multiple-servers.md).

{% hint style="info" %}
Closing UDP `32000–32015` does not remove a server from the directory. Personalized latency automatically uses the Dune Docker relay when a direct measurement is unavailable.
{% endhint %}
