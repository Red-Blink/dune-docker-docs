# Addon Hardware Status Bridge

`server.hardware.status` exposes a bounded, read-only hardware snapshot to an enabled addon with approved `server:status` permission.

Addon request:

```js
const status = await window.DuneAddon.request("server.hardware.status");
```

The Console collects the data itself from fixed Linux interfaces. It never executes scripts, binaries, or commands supplied by an addon package.

## Response

Version 3 is additive: all version 1 and version 2 telemetry fields keep the same names and meanings. Addons should ignore fields they do not recognize. Core snapshots are cached for at least five seconds; addons may keep their own bounded in-memory history from successive snapshots, but should not persist telemetry unless the server owner explicitly asks them to.

```json
{
  "version": 3,
  "sampled_at": "2026-08-28T12:00:00.000Z",
  "temperatures": [
    { "name": "coretemp Package id 0", "temperature": 47.5, "device_id": "cpu:0" },
    { "name": "nvme Composite", "temperature": 39.9, "device_id": "block:nvme0n1" }
  ],
  "fans": [
    { "name": "nct6798 CPU Fan", "rpm": 1450 }
  ],
  "cpu": {
    "id": "cpu:0",
    "manufacturer": "GenuineIntel",
    "model": "Intel(R) Xeon(R) CPU E3-1220 v3 @ 3.10GHz",
    "usage_percent": 32.5,
    "logical_threads": 8,
    "physical_cores": 4
  },
  "storage": [
    {
      "id": "block:nvme0n1",
      "name": "nvme0n1",
      "manufacturer": "Samsung",
      "model": "Samsung SSD 990 PRO 2TB",
      "bus": "nvme",
      "size_bytes": 2000398934016
    }
  ],
  "filesystems": [
    {
      "id": "dune-data",
      "name": "Dune Docker Data",
      "total_bytes": 1000000000000,
      "free_bytes": 400000000000,
      "used_bytes": 600000000000,
      "percent": 60
    }
  ],
  "network": [
    {
      "name": "eth0",
      "status": "up",
      "rx_bytes": 123456789,
      "tx_bytes": 987654321,
      "speed_mbps": 1000
    }
  ],
  "memory": {
    "total_kb": 16777216,
    "available_kb": 8388608,
    "used_kb": 8388608,
    "percent": 50
  },
  "swap": {
    "total_kb": 4194304,
    "free_kb": 4194304,
    "used_kb": 0,
    "percent": 0
  },
  "load": { "one": 0.25, "five": 0.2, "fifteen": 0.18 },
  "uptime_seconds": 86400
}
```

Temperatures and fan speeds are read from `/sys/class/hwmon`. CPU identification and topology come from `/proc/cpuinfo`, while sampled utilization comes from the change between successive `/proc/stat` counters. The first uncached snapshot can therefore return `null` for `cpu.usage_percent`. Storage identification and capacity come from bounded reads under `/sys/class/block`. Filesystem capacity describes the filesystem holding Dune Docker data. Network byte counters come from `/proc/net/dev`, with link state and optional speed read from `/sys/class/net`. Memory and swap are read from `/proc/meminfo`, load from `/proc/loadavg`, and uptime from `/proc/uptime`.

Network values are cumulative counters. An addon can calculate transfer rates from the difference between two snapshots and their `sampled_at` timestamps. Loopback is omitted, output is capped at 32 interfaces, and the bridge does not expose IP addresses or MAC addresses.

Identification fields are optional and omitted when Linux does not expose them. A temperature's optional `device_id` matches the CPU or a storage entry's `id`; `cpu:0` and `block:<name>` are local correlation keys and must not be treated as persistent hardware identities. The bridge does not read or return serial numbers, WWNs, filesystem UUIDs, or other persistent device identifiers.

Missing or unreadable sources return empty identification, sensor, filesystem, or network data—or a zero-valued telemetry section—rather than failing the whole request. Output is capped at 64 storage devices, 128 validated temperature sensors, 128 validated fan sensors, and 32 network interfaces.

Per-container CPU, memory, network, and block I/O remain available through the separate `ops.health.containers` action with `ops:read`. They are intentionally not duplicated into this host-hardware response. GPU telemetry and user-uploaded assets are not part of version 3 because they require separate portability and permission designs.

The addon manifest must request:

```json
{
  "permissions": {
    "server": ["status"]
  }
}
```
