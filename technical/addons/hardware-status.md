# Addon Hardware Status Bridge

`server.hardware.status` exposes a bounded, read-only hardware snapshot to an enabled addon with approved `server:status` permission.

Addon request:

```js
const status = await window.DuneAddon.request("server.hardware.status");
```

The Console collects the data itself from fixed Linux interfaces. It never executes scripts, binaries, or commands supplied by an addon package.

## Response

Version 2 is additive: all version 1 telemetry fields keep the same names and meanings. Addons should ignore fields they do not recognize.

```json
{
  "version": 2,
  "temperatures": [
    { "name": "coretemp Package id 0", "temperature": 47.5, "device_id": "cpu:0" },
    { "name": "nvme Composite", "temperature": 39.9, "device_id": "block:nvme0n1" }
  ],
  "cpu": {
    "id": "cpu:0",
    "manufacturer": "GenuineIntel",
    "model": "Intel(R) Xeon(R) CPU E3-1220 v3 @ 3.10GHz"
  },
  "storage": [
    {
      "id": "block:nvme0n1",
      "name": "nvme0n1",
      "manufacturer": "Samsung",
      "model": "Samsung SSD 990 PRO 2TB",
      "bus": "nvme"
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

Temperatures are degrees Celsius read from `/sys/class/hwmon`. CPU identification comes from `/proc/cpuinfo`, and storage identification comes from bounded reads under `/sys/class/block`. Memory and swap are read from `/proc/meminfo`, load from `/proc/loadavg`, and uptime from `/proc/uptime`.

Identification fields are optional and omitted when Linux does not expose them. A temperature's optional `device_id` matches the CPU or a storage entry's `id`; `cpu:0` and `block:<name>` are local correlation keys and must not be treated as persistent hardware identities. The bridge does not read or return serial numbers, WWNs, filesystem UUIDs, or other persistent device identifiers.

Missing or unreadable sources return empty identification/temperature data or a zero-valued telemetry section rather than failing the whole request. Output is capped at 64 storage devices and 128 validated temperature sensors.

The addon manifest must request:

```json
{
  "permissions": {
    "server": ["status"]
  }
}
```


