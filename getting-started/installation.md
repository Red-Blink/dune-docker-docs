---
icon: download
---

# Installation

Run the installer as a normal user with `sudo` access. It downloads the latest public release, prepares the required services, starts the Console, and prints the browser address.

```bash
sh -c 'set -eu; mkdir -p "$HOME/dune-awakening-selfhost-docker"; cd "$HOME/dune-awakening-selfhost-docker"; latest_url="$(curl -fsSLI -o /dev/null -w "%{url_effective}" https://github.com/Red-Blink/dune-awakening-selfhost-docker/releases/latest)"; version="${latest_url##*/}"; curl -fSL "https://github.com/Red-Blink/dune-awakening-selfhost-docker/archive/refs/tags/${version}.tar.gz" | tar -xz --strip-components=1; chmod +x install.sh; ./install.sh'
```

{% hint style="info" %}
The root [GitHub README](https://github.com/Red-Blink/dune-awakening-selfhost-docker#installation) always carries the canonical cross-distribution installer command. Use it if this shorter `curl` example does not match your host.
{% endhint %}

## What Happens Next

1. Open the Console URL printed by the installer, normally on port `8088`.
2. Sign in with the generated administrator password.
3. Complete the guided setup using your Funcom token and server choices.
4. Start the Battlegroup and wait until the readiness checks pass.
5. Configure firewall/NAT rules before inviting internet players.

The project directory is created at `~/dune-awakening-selfhost-docker` unless you deliberately install it elsewhere.
