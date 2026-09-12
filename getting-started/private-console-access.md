---
description: "Access Dune Docker Console privately through Tailscale without exposing its admin port to the internet."
---

# Private Console Access with Tailscale

Do **not** expose Console port `8088` directly to the public internet. The recommended setup keeps the Console bound to the server itself and uses [Tailscale Serve](https://tailscale.com/docs/features/tailscale-serve) to provide a private HTTPS address to devices in your tailnet.

{% hint style="info" %}
This does not require port forwarding for `8088`, and it does not expose the Console through Tailscale Funnel. Only devices allowed by your Tailscale network policy can connect.
{% endhint %}

## 1. Install Tailscale on the server

Run this on the Dune Docker host:

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

Open the login link shown in the terminal and sign in. See Tailscale's [Linux installation guide](https://tailscale.com/docs/install/linux) if your distribution needs different steps.

## 2. Install Tailscale on your computer

[Install Tailscale](https://tailscale.com/download) on the computer you use to manage the server, then sign in to the same tailnet.

## 3. Keep the Console private

Open the Dune Docker environment file:

```bash
cd ~/dune-awakening-selfhost-docker
nano .env
```

Set these values:

```env
ADMIN_BIND_HOST=127.0.0.1
ADMIN_BIND_PORT=8088
ADMIN_AUTH_DISABLED=0
ADMIN_SECURE_COOKIES=1
```

- `127.0.0.1` prevents direct access to the Console from the public network and local network.
- Authentication remains enabled even though access is private.
- Secure cookies are enabled because Tailscale Serve provides HTTPS.

Save the file, then restart only the Console:

```bash
runtime/scripts/dune console restart
```

{% hint style="warning" %}
Restarting the Console signs out active Console browser sessions. It does not restart the Battlegroup, game maps, database, Director, Gateway, or Autoscaler.
{% endhint %}

## 4. Publish it privately with Tailscale Serve

Run:

```bash
tailscale serve --bg http://127.0.0.1:8088
tailscale serve status
```

The first command may ask you to enable HTTPS for the tailnet. Open the private `https://...ts.net` address displayed by Tailscale, then sign in to the Dune Docker Console normally.

Do not use `tailscale funnel`; Funnel makes a service available to the public internet.

## 5. Verify the setup

On the server, confirm that the Console responds locally and that Tailscale Serve is active:

```bash
curl -I http://127.0.0.1:8088
tailscale serve status
```

From a device that is signed in to the same tailnet, open the private HTTPS address. From a device outside the tailnet, the address should not be accessible.

No router port forwarding, provider firewall rule, or public UFW allowance is required for port `8088` with this setup. If you previously exposed `8088`, remove that public forwarding or firewall rule.

## Stop private access

To remove the Tailscale Serve configuration:

```bash
tailscale serve reset
```

This removes the private proxy but does not stop the Dune Docker Console itself.
