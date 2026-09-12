# Docker Desktop, WSL2, Hyper-V, and VMware Network Conflict

Use this guide for the specific Windows-hosted case where:

- Dune Docker runs through Docker Desktop and WSL2.
- The server appears in the in-game browser, but players remain stuck on **Connecting**.
- VMware, Hyper-V, WSL2, or several virtual network adapters are installed.
- **VMware Bridge Protocol** is attached to Hyper-V's **vEthernet (Default Switch)**.

That adapter combination can make VMware select Hyper-V's private switch for bridging or leave Docker Desktop and WSL2 using an unintended route. It is only one possible cause of a Connecting failure; collect the checks below before changing Dune settings.

## 1. Correct the Windows Adapter Binding

1. Press **Win + R**.
2. Enter `ncpa.cpl`.
3. Open **Properties** for **vEthernet (Default Switch)**.
4. Find **VMware Bridge Protocol**.
5. If enabled, clear it and select **OK**.

{% hint style="warning" %}
Remove VMware Bridge Protocol only from Hyper-V's Default Switch. Do not remove it from the physical adapter VMware intentionally uses for bridged networking.
{% endhint %}

## 2. Restart WSL2 and Docker Desktop in Order

Completely quit Docker Desktop. Then open PowerShell as Administrator and run:

```powershell
wsl --shutdown
```

Start Docker Desktop again and wait until its engine reports Running. Then reopen the WSL distribution.

## 3. Verify WSL2 and Docker Routes

Inside WSL2:

```bash
ip -4 route get 1.1.1.1
```

It should return a default route and source address without an error. Check the route visible to a Docker Desktop host-network container:

```bash
docker run --rm --network host --entrypoint sh redblink-dune-docker-console:dev \
  -c 'ip -4 route get 1.1.1.1'
```

The WSL2 and Docker Desktop source addresses do not need to match. Docker Desktop can use its own internal address. If `--network host` is unavailable, review Docker's current [host network driver requirements](https://docs.docker.com/engine/network/drivers/host/) and Docker Desktop settings before continuing.

## 4. Check Dune Network Detection

```bash
cd "$HOME/dune-awakening-selfhost-docker"
runtime/scripts/dune network status
runtime/scripts/network-addresses.sh status
runtime/scripts/dune doctor
```

For a public server:

- `SERVER_IP` is the public IPv4 address advertised to players.
- `SERVER_BIND_IP` is the local address used by game sockets.
- Do not advertise a private WSL2 `172.x.x.x` address to internet players.
- Leave `SERVER_BIND_IP` and RabbitMQ host overrides unset unless the diagnostics show automatic detection is wrong.

If `dune network status` specifically reports `status=risk`, run:

```bash
runtime/scripts/dune network fix
```

This command only corrects the detected public-NAT `net.ipv4.ip_nonlocal_bind` risk. It does not change Windows adapters, port forwarding, `SERVER_IP`, or unrelated network settings.

## 5. Restart the Battlegroup

{% hint style="danger" %}
The following stop/start disconnects all players and restarts the complete game stack. Notify players and run it only after the adapter or bind issue has been corrected.
{% endhint %}

```bash
runtime/scripts/dune stop
runtime/scripts/dune start
runtime/scripts/dune ready
```

## 6. Confirm Core Services

```bash
docker ps --format 'table {{.Names}}\t{{.Status}}'
```

For the standard basic layout, confirm these core containers are running:

- `dune-rmq-admin`
- `dune-rmq-game`
- `dune-text-router`
- `dune-director`
- `dune-server-gateway`
- `dune-server-survival-1`
- `dune-server-overmap`

Additional dynamic map containers depend on your configuration and current demand.

Check the primary maps for repeated RabbitMQ or route failures:

```bash
docker logs --since 15m dune-server-survival-1 2>&1 | \
  grep -Ei 'RMQ runnable failed|connection refused|network unreachable|fatal'

docker logs --since 15m dune-server-overmap 2>&1 | \
  grep -Ei 'RMQ runnable failed|connection refused|network unreachable|fatal'
```

No output from these filtered commands is normally a good result. Finish with:

```bash
runtime/scripts/dune doctor
runtime/scripts/dune ready
```

When readiness is healthy, test from an external client. If Connecting still stalls, continue with [Networking and Ports](../getting-started/networking.md) and verify router/firewall forwarding rather than repeatedly restarting the server.
