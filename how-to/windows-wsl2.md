# Use Ubuntu WSL2 with Docker Desktop

If you use Docker Desktop on Windows, run the Linux installer inside your own **Ubuntu WSL2 distribution**, not Docker Desktop's internal Linux environment. The alternative [VMware installation guide](../getting-started/install-dune-docker-on-windows.md) uses a separate Linux VM and Docker Engine.

## Before Installing

1. Install and open Ubuntu under WSL2, and finish creating your Linux user.
2. Start Docker Desktop and wait until its engine is running.
3. In Docker Desktop's WSL integration settings, enable integration for that Ubuntu distribution and apply the change.
4. Reopen Ubuntu and run:

   ```bash
   docker version
   docker compose version
   ```

`docker version` must show a reachable **Server**, not just the Docker client version. Then follow [Installation](../getting-started/installation.md) from Ubuntu as your normal user.

## Common Problems

**“Unit docker.service does not exist”**: with Docker Desktop, the engine is managed by Windows, not necessarily by a `docker.service` inside Ubuntu. Check Desktop's engine and integration first; do not install a second Docker daemon just to make that message disappear.

**Permission denied on `/var/run/docker.sock`**: this is a Docker-access problem, not a bad Console password. Check Docker access as the same Ubuntu user running the installer. For native Linux Docker, follow [Repair Permission Errors](../operations/repair-permission-errors.md). Do not make the socket world-writable.

**No space left or read-only filesystem**: confirm you are in Ubuntu, not the `docker-desktop` distribution, and check the Linux filesystem and Docker disk capacity. A Windows drive with free space does not prove the installation's current filesystem has space.

**Console says it is running but the browser cannot connect**: collect its logs and check the actual configured port and Docker networking. Being able to ping the machine does not prove the HTTP listener is reachable. See [Connection Problems](connection-problems.md) and [Windows Network Conflicts](../operations/docker-desktop-wsl2-network-conflict.md).
