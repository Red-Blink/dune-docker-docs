# Players Cannot Find or Join My Server

First identify which connection fails: the **browser Console**, the **in-game server listing**, or **joining/travelling in game**. They use different services and ports.

## The Browser Console Does Not Open

Use the address and port printed by the installer or shown in Settings. Confirm you can reach Docker and inspect the Console log:

```bash
docker ps --filter name=redblink-dune-docker-console
docker logs --tail 100 redblink-dune-docker-console
```

The log should show an API listener. A running container or successful ping alone does not prove the browser port is reachable. Check [Console ports](change-game-ports.md), host firewall rules, and your VM/WSL networking.

## It Is on dunedocker.app but Not in the Game

The community directory and Funcom's in-game listing are separate. Being listed on the website, or having green local containers, does not prove Funcom accepted the server registration.

Check public hosting mode, map readiness, and recent **Director** and **Gateway** logs for registration failures. An `Invalid display name` response is evidence that Funcom rejected the submitted name; it is not a reason to reinstall the server. Capture the exact error and use a simple name to test after arranging any required restart.

## Others Can Join but I Cannot Join from Home

If an external player can connect but a player on the server's LAN times out, investigate NAT loopback and local routing. See [NAT Loopback](../getting-started/nat-loopback.md). Do not change the public IP to a LAN address on a publicly advertised server as a guess.

## Nobody Can Join, or Travel Fails

Check the current game version, configured UDP ranges, messaging TCP ports, map readiness, and the destination involved. Record the exact error and time. A client mismatch, authentication error, timeout, and missing travel destination are not interchangeable diagnoses.

From the project folder:

```bash
runtime/scripts/dune doctor
docker logs --timestamps --since 10m dune-director
docker logs --timestamps --since 10m dune-server-gateway
```

Also collect the affected map's log from the Console. Review output before sharing: remove passwords, tokens, and private player data. Do not delete queues, database rows, or characters to troubleshoot an unexplained connection error.

See [Troubleshooting](../operations/troubleshooting.md) for additional checks.
