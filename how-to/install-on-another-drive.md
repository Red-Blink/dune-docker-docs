# Install on Another Drive

Choose a **mounted folder**, not a disk device name. For example, `/mnt/games` can be a folder on your NVMe drive; `/dev/nvme0n1` is the disk itself and is not an installation folder.

Before installing, check where your intended folder lives:

```bash
lsblk -f
df -h /mnt/games
docker info --format '{{.DockerRootDir}}'
```

Replace `/mnt/games` with your actual mounted folder. Make sure your normal Linux user can write there and that the drive is mounted automatically before Docker starts after a reboot.

## New Installation

With the destination's parent folder already mounted and writable, choose a new project directory:

```bash
curl -fsSL https://raw.githubusercontent.com/Red-Blink/dune-awakening-selfhost-docker/main/bootstrap.sh | DUNE_INSTALL_DIR=/mnt/games/dune-awakening-selfhost-docker sh
```

Run this as your normal sudo-capable user. Do not use a disk device as `DUNE_INSTALL_DIR`, and do not overwrite an existing installation with the bootstrap installer.

## Project Files and Docker Storage Are Different

Moving the project directory does not automatically move Docker's images, layers, and volumes. Docker's storage location is shown by the command above. Both locations need free space.

If the drive containing Docker's data is full, selecting another project folder alone will not fix it. Moving Docker storage is a host-wide maintenance operation that affects other containers too. Back up first and follow the storage instructions for your Docker installation; do not copy a running database or delete Docker's data directory.

For an existing Dune installation, use [Backups and Restore](../console/backups-and-restore.md) and a planned migration, not a second fresh install over its files. On Windows, see [Ubuntu WSL2](windows-wsl2.md); Windows free space and the Linux/Docker virtual disks are not interchangeable.
