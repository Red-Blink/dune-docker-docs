# Local Network NAT Loopback Alternative

Some routers do not support **NAT loopback**, also called **hairpin NAT**. Without it, computers on the same local network may be unable to connect to the Dune server through its public server listing, even though remote players connect normally.

This guide provides a persistent alternative for Windows players connecting to a Linux-hosted Dune server on the same local network.

## When to Use This Guide

Use this guide only when all of the following are true:

- Remote players can connect successfully.
- Local players cannot connect through the public server listing.
- The router does not support NAT loopback.
- The Dune server has a stable local IP reachable from the affected Windows computers.

{% hint style="warning" %}
This does not replace normal port forwarding and does not fix connections for remote players.
{% endhint %}

## 1. Collect the Network Information

On the Dune server, run:

```bash
cd ~/dune-awakening-selfhost-docker

runtime/scripts/dune network status
runtime/scripts/dune ports
ip -4 address
ip route
```

You need:

- The server's public IPv4 address.
- The Linux server's local IPv4 address.
- The local network range.
- The configured Dune port ranges.

An example network might use:

```text
Public IP:        123.123.123.123
Server local IP:  192.168.1.50
Local network:    192.168.1.0/24
```

{% hint style="danger" %}
These addresses are examples only. Do not copy them into your configuration. Use the real addresses reported for your network.
{% endhint %}

If Dune Docker runs inside a Linux virtual machine, use the **Linux VM's local IP**, not the hypervisor's IP.

The default Dune ports are:

```text
UDP 7777-7810
TCP 31982
TCP 31983
```

Use the values reported by `runtime/scripts/dune ports` if your installation differs.

### Keep the local IP stable

Configure a DHCP reservation in your router, or otherwise ensure the Linux server keeps the same local IP. If the address changes, the Linux configuration and every affected Windows route must be updated.

## 2. Create the Linux Configuration

Create the configuration directory:

```bash
sudo install -d -m 0755 /etc/dune-nat-loopback
```

Create the configuration file:

```bash
sudo nano /etc/dune-nat-loopback/config
```

Paste the following configuration and replace every `REPLACE_...` value:

```bash
PUBLIC_IP="REPLACE_WITH_PUBLIC_IPV4"
SERVER_LOCAL_IP="REPLACE_WITH_SERVER_LOCAL_IPV4"
LOCAL_NETWORK="REPLACE_WITH_LOCAL_NETWORK_CIDR"
CLIENT_PORTS="7777:7810"
RMQ_GAME_PORT="31982"
RMQ_HTTP_PORT="31983"
```

Save the file, then review it:

```bash
sudo cat /etc/dune-nat-loopback/config
```

Confirm that:

- No value begins with `REPLACE_`.
- `PUBLIC_IP` is the server's real public IPv4 address.
- `SERVER_LOCAL_IP` is assigned to the Linux server or VM.
- `LOCAL_NETWORK` matches the local network.
- The ports match `runtime/scripts/dune ports`.

## 3. Install the Rule Manager

Create the rule manager:

```bash
sudo tee /usr/local/sbin/dune-nat-loopback >/dev/null <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

readonly CONFIG_FILE="/etc/dune-nat-loopback/config"
readonly CHAIN="DUNE_NAT_LOOPBACK"

fail() {
    echo "Error: $*" >&2
    exit 1
}

is_ipv4() {
    local ip="$1"
    local octet

    [[ "$ip" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]] || return 1

    IFS='.' read -r -a octets <<<"$ip"
    for octet in "${octets[@]}"; do
        ((10#$octet >= 0 && 10#$octet <= 255)) || return 1
    done
}

load_config() {
    [[ -r "$CONFIG_FILE" ]] ||
        fail "Missing configuration: $CONFIG_FILE"

    # This file must remain owned and writable only by root.
    source "$CONFIG_FILE"

    local name
    for name in \
        PUBLIC_IP \
        SERVER_LOCAL_IP \
        LOCAL_NETWORK \
        CLIENT_PORTS \
        RMQ_GAME_PORT \
        RMQ_HTTP_PORT
    do
        [[ -n "${!name:-}" ]] ||
            fail "Missing required setting: $name"

        [[ "${!name}" != REPLACE_* ]] ||
            fail "$name still contains a placeholder value"
    done

    is_ipv4 "$PUBLIC_IP" ||
        fail "PUBLIC_IP is not a valid IPv4 address: $PUBLIC_IP"

    is_ipv4 "$SERVER_LOCAL_IP" ||
        fail "SERVER_LOCAL_IP is not a valid IPv4 address: $SERVER_LOCAL_IP"

    [[ "$PUBLIC_IP" != "$SERVER_LOCAL_IP" ]] ||
        fail "PUBLIC_IP and SERVER_LOCAL_IP must be different"

    ip -4 -o address show |
        awk '{print $4}' |
        cut -d/ -f1 |
        grep -Fxq "$SERVER_LOCAL_IP" ||
        fail "SERVER_LOCAL_IP is not assigned to this Linux server: $SERVER_LOCAL_IP"

    [[ "$LOCAL_NETWORK" == */* ]] ||
        fail "LOCAL_NETWORK must use CIDR notation, such as 192.168.1.0/24"

    [[ "$CLIENT_PORTS" =~ ^[0-9]+:[0-9]+$ ]] ||
        fail "CLIENT_PORTS must be a range such as 7777:7810"

    [[ "$RMQ_GAME_PORT" =~ ^[0-9]+$ ]] ||
        fail "RMQ_GAME_PORT must be numeric"

    [[ "$RMQ_HTTP_PORT" =~ ^[0-9]+$ ]] ||
        fail "RMQ_HTTP_PORT must be numeric"
}

remove_jump_rules() {
    local line_number

    while true; do
        line_number="$(
            iptables -w -t nat -L PREROUTING --line-numbers -n |
                awk -v chain="$CHAIN" '$2 == chain {print $1; exit}'
        )"

        [[ -n "$line_number" ]] || break
        iptables -w -t nat -D PREROUTING "$line_number"
    done
}

remove_rules() {
    remove_jump_rules
    iptables -w -t nat -F "$CHAIN" 2>/dev/null || true
    iptables -w -t nat -X "$CHAIN" 2>/dev/null || true
}

apply_rules() {
    # Remove stale rules first, including rules created with older IP values.
    remove_rules

    iptables -w -t nat -N "$CHAIN"

    iptables -w -t nat -I PREROUTING 1 \
        -s "$LOCAL_NETWORK" \
        -d "$PUBLIC_IP" \
        -j "$CHAIN"

    iptables -w -t nat -A "$CHAIN" \
        -p udp \
        --dport "$CLIENT_PORTS" \
        -j DNAT \
        --to-destination "$SERVER_LOCAL_IP"

    iptables -w -t nat -A "$CHAIN" \
        -p tcp \
        --dport "$RMQ_GAME_PORT" \
        -j DNAT \
        --to-destination "$SERVER_LOCAL_IP"

    iptables -w -t nat -A "$CHAIN" \
        -p tcp \
        --dport "$RMQ_HTTP_PORT" \
        -j DNAT \
        --to-destination "$SERVER_LOCAL_IP"

    echo "Applied Dune NAT loopback:"
    echo "  Public IP:       $PUBLIC_IP"
    echo "  Server local IP: $SERVER_LOCAL_IP"
    echo "  Local network:   $LOCAL_NETWORK"
}

show_status() {
    echo "Configured values:"
    echo "  Public IP:       $PUBLIC_IP"
    echo "  Server local IP: $SERVER_LOCAL_IP"
    echo "  Local network:   $LOCAL_NETWORK"
    echo "  Client ports:    UDP $CLIENT_PORTS"
    echo "  RMQ ports:       TCP $RMQ_GAME_PORT and $RMQ_HTTP_PORT"
    echo
    iptables -w -t nat -L "$CHAIN" -n -v -x
}

case "${1:-apply}" in
    apply|reload)
        load_config
        apply_rules
        ;;
    remove)
        remove_rules
        ;;
    status)
        load_config
        show_status
        ;;
    *)
        echo "Usage: $0 {apply|reload|remove|status}" >&2
        exit 2
        ;;
esac
EOF
```

Secure the configuration and make the manager executable:

```bash
sudo chown root:root \
    /etc/dune-nat-loopback/config \
    /usr/local/sbin/dune-nat-loopback

sudo chmod 0644 /etc/dune-nat-loopback/config
sudo chmod 0755 /usr/local/sbin/dune-nat-loopback
```

Test the configuration before creating the service:

```bash
sudo /usr/local/sbin/dune-nat-loopback apply
sudo /usr/local/sbin/dune-nat-loopback status
```

The script stops with an error if an address is invalid, a placeholder remains, or the local IP is not assigned to the Linux host.

## 4. Create the Persistent Service

Create the systemd service:

```bash
sudo tee /etc/systemd/system/dune-nat-loopback.service >/dev/null <<'EOF'
[Unit]
Description=Dune NAT Loopback Alternative
After=network-online.target docker.service
Wants=network-online.target

[Service]
Type=oneshot
ExecStart=/usr/local/sbin/dune-nat-loopback apply
ExecReload=/usr/local/sbin/dune-nat-loopback reload
ExecStop=/usr/local/sbin/dune-nat-loopback remove
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF
```

Enable and start it:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now dune-nat-loopback.service
```

Verify the service and effective rules:

```bash
systemctl is-enabled dune-nat-loopback.service
systemctl is-active dune-nat-loopback.service
sudo /usr/local/sbin/dune-nat-loopback status
```

The service should report:

```text
enabled
active
```

The displayed configuration must contain the real public and local addresses. An `active` service does not prove that manually entered addresses are correct, so review them before continuing.

## 5. Add the Route to Each Windows Gaming Computer

Complete this step on **every affected Windows computer**.

Open **Command Prompt as Administrator** and inspect any existing route:

```bat
route print YOUR_PUBLIC_IP
```

Delete the old route, if present, and create the correct persistent route:

```bat
route delete YOUR_PUBLIC_IP
route -p add YOUR_PUBLIC_IP mask 255.255.255.255 YOUR_SERVER_LOCAL_IP metric 1
```

For example only:

```bat
route delete 123.123.123.123
route -p add 123.123.123.123 mask 255.255.255.255 192.168.1.50 metric 1
```

If the delete command reports that the route was not found, continue with the add command. The `-p` option preserves the route across Windows restarts.

Verify it:

```bat
route print YOUR_PUBLIC_IP
tracert -d YOUR_PUBLIC_IP
```

The active and persistent route should point to the Linux server's local IP.

## 6. Test the Connection

On the Linux server, monitor the rule counters:

```bash
sudo watch -n 1 /usr/local/sbin/dune-nat-loopback status
```

Launch Dune from the affected Windows computer and connect through the normal public server listing. The UDP counter for the configured game-port range should increase. The TCP counters may also increase during the connection flow.

Stop monitoring with `Ctrl+C`.

No Dune map or Battlegroup restart should be necessary.

## Updating Changed Addresses

If the public IP or Linux server's local IP changes, update the Linux configuration:

```bash
sudo nano /etc/dune-nat-loopback/config
sudo systemctl restart dune-nat-loopback.service
sudo /usr/local/sbin/dune-nat-loopback status
```

Then replace the route on every affected Windows computer:

```bat
route delete OLD_PUBLIC_IP
route delete NEW_PUBLIC_IP
route -p add NEW_PUBLIC_IP mask 255.255.255.255 NEW_SERVER_LOCAL_IP metric 1
route print NEW_PUBLIC_IP
```

## Removing the Alternative

Remove the Windows route from every affected computer:

```bat
route delete YOUR_PUBLIC_IP
```

Then remove the Linux service:

```bash
sudo systemctl disable --now dune-nat-loopback.service
sudo rm -f /etc/systemd/system/dune-nat-loopback.service
sudo rm -f /usr/local/sbin/dune-nat-loopback
sudo rm -rf /etc/dune-nat-loopback
sudo systemctl daemon-reload
```

This removes only the custom NAT-loopback alternative. It does not change Dune Docker's normal port forwarding or server configuration.
