# Networking and Ports

For public hosting, forward the game-facing ports to the server running Dune Docker.

| Port | Protocol | Purpose |
|---|---|---|
| `8088` | TCP | Web Console. Restrict this to trusted administrators. |
| `31982` | TCP | RabbitMQ game messaging endpoint. |
| `31983` | TCP | RabbitMQ game HTTP endpoint. |
| `7777–7810` | UDP | Game traffic and map instances. |

The exact UDP assignments and Console port can be changed. Use `dune ports` to inspect the effective profile rather than relying on memory.

## Public IP and NAT

- Forward the configured ports through the router or cloud firewall.
- Make sure the server advertises the public address players can reach.
- NAT loopback behavior differs by router; test from outside your home network.
- Do not publish PostgreSQL or Docker socket access.

Use `dune ping`, `dune ports`, and the Console health checks when diagnosing connectivity. For multiple Battlegroups behind one public IPv4 address, follow [Multiple Servers on One IP](../operations/multiple-servers.md).
