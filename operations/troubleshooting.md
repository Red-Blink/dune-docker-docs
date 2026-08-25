# Troubleshooting

Start with evidence, not a broad restart.

```bash
dune status
dune ready
dune doctor
dune ports
dune ps
```

## Common Checks

### Players cannot see or join the server

Confirm Gateway/Director readiness, the public address, firewall/NAT rules, UDP port range, and Funcom token status. Test from an external network.

### A map repeatedly starts and stops

Identify whether it is Dynamic and whether demand is still present. Check Autoscaler and Director logs, then the affected server container. Repeated server IDs usually mean instances are being recreated, not merely losing one client connection.

### A change is not visible in the browser

The Console carries a build-version watcher and cache headers to refresh stale assets after an update. Wait for the update helper to finish, use **Refresh Now**, and perform one hard refresh only if an older browser/service-worker cache survives the replacement.

### A database-backed repair does not appear in game

Confirm the player was fully offline when required, the operation reported the intended rows, and the relevant map has loaded fresh state. Do not repeat mutations blindly.

### Support request

Run `dune doctor`, capture only relevant logs, redact secrets, and use [Help, Issues, and Requests](../support.md).
