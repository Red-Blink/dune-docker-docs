# Memory and Map Capacity

Each running game map consumes meaningful memory even while idle. Dynamic mode keeps less-used maps available on demand; Always On trades faster access for a larger steady footprint.

## Tools

- **Memory status** shows host and container use.
- **Memory Balancer** manages map-specific memory targets.
- **Memory Swap** can create a bounded safety pool for map servers; it is not a replacement for sufficient RAM.
- **Autoscaler** reacts to demand for dynamic maps.
- Party-isolated activity maps can run more than one dimension when separate parties need them; warming instances count toward capacity and configured maximums still apply.
- Deep Desert layouts let an operator explicitly run one, two, or three instances.

Start conservatively, observe real peak usage, and add maps gradually. Avoid treating Linux cache or one large idle process as proof of a leak; evaluate sustained growth, swap pressure, OOM events, and service health together.

CPU can rise during map startup, world simulation, backups, updates, and Console diagnostics. A short peak alone does not establish a defect. Compare the affected container, timing, sustained load, and logs. Host CPU percentages and `docker stats` use different scales: Docker's `100%` represents one fully used logical CPU.

## Disk Space and Host Storage

The Console reports the space available to the relevant filesystem; assigning a larger disk to a VM does not automatically enlarge Ubuntu's root filesystem or Docker's storage.

Use read-only checks to identify the constrained layer:

```bash
df -hT
lsblk -f
sudo vgs
docker info --format '{{.DockerRootDir}}'
docker system df
```

For example, an 800 GB virtual disk can still have a roughly 100 GB root logical volume, with the remaining space free inside its LVM volume group. Docker on that root filesystem cannot use the unallocated space. Image cleanup can recover space within the current filesystem; enlarging its logical volume and filesystem is a separate host-administration task. Verify the exact device and preserve backups before making storage changes.

Also review retained backups and downloaded game data. Do not delete Docker's data directory, database volumes, or unidentified runtime files to make room. [Install on Another Drive](../how-to/install-on-another-drive.md) explains why project files and Docker storage are separate.
