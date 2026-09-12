# Repair Permission Errors

Current releases repair project-managed runtime ownership during normal startup and self-update flows. Use this guide after upgrading from an affected older release, after accidentally running project commands with `sudo`, or when logs identify host-file ownership as the cause.

## 1. Run the Built-In Repair

```bash
cd "$HOME/dune-awakening-selfhost-docker"
runtime/scripts/repair-host-runtime-permissions.sh
runtime/scripts/dune start
```

The repair targets Dune Docker-managed runtime paths, verifies they are writable by the installation owner, and synchronizes `DUNE_HOST_UID` and `DUNE_HOST_GID` in `.env`. It does not recursively change unrelated external paths.

The helper normally builds its `dune-orchestrator:dev` image automatically when the standard Dockerfile is present. If that build was unavailable or a custom helper image is configured, build the standard image and retry:

```bash
docker compose build orchestrator
runtime/scripts/repair-host-runtime-permissions.sh
runtime/scripts/dune start
```

## 2. Repair a Root-Owned Repository Only When Confirmed

First inspect the project owner:

```bash
cd "$HOME/dune-awakening-selfhost-docker"
stat -c '%U:%G %n' . runtime
```

If the repository itself is incorrectly owned by `root` because project commands were run with `sudo`, verify the directory before changing it:

```bash
test -f docker-compose.yml && test -x runtime/scripts/dune
sudo chown -R "$(id -u):$(id -g)" "$PWD"
runtime/scripts/repair-host-runtime-permissions.sh
runtime/scripts/dune start
```

Do not use this recursive ownership command on a shared directory or a path you have not verified.

## Important Notes

- Do not run normal Dune, Console, install, or update commands with `sudo`.
- Do not use broad recursive `chmod` commands.
- Replace the standard path if the project is installed elsewhere.
- `dune start` starts the Battlegroup; respect any intentional manual stop and expected player impact.
- This repair does not fix Docker group access, external custom paths, network failures, rootless-Docker UID mapping restrictions, or installations intentionally managed entirely as `root`.

Finish with:

```bash
runtime/scripts/dune doctor
runtime/scripts/dune ready
```
