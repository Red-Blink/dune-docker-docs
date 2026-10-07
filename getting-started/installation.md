# Installation

Run the installer as a normal Linux user with sudo access. It downloads the latest public release, prepares the Console, and prints the browser address. Install curl and tar with your distribution's package manager first if they are missing.

```bash
curl -fsSL https://raw.githubusercontent.com/Red-Blink/dune-awakening-selfhost-docker/main/bootstrap.sh | sh
```

Do not run the installer as root or prefix it with sudo. The [GitHub README](https://github.com/Red-Blink/dune-awakening-selfhost-docker#installation) also provides download-tool alternatives.

## What Happens Next

1. Open the Console URL printed by the installer, normally on port `8088`.
2. Sign in with the generated administrator password.
3. Complete the guided setup with your Funcom token and server choices.
4. Start the Battlegroup and wait for readiness checks to pass.
5. Configure [firewall and router rules](networking.md) before inviting internet players.

The default project folder is `~/dune-awakening-selfhost-docker`. To choose a mounted drive, follow [Install on Another Drive](../how-to/install-on-another-drive.md). The fresh installer requires a new destination; do not use it over an existing installation. Use the Console's Updates page instead.

On Windows, choose either [VMware with Ubuntu](install-dune-docker-on-windows.md) or [Ubuntu WSL2 with Docker Desktop](../how-to/windows-wsl2.md). Do not run this Linux installer inside Docker Desktop's internal distribution.
