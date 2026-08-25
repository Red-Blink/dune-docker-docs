---
---

# Memory and Map Capacity

Each running game map consumes meaningful memory even while idle. Dynamic mode keeps less-used maps available on demand; Always On trades faster access for a larger steady footprint.

## Tools

- **Memory status** shows host and container use.
- **Memory Balancer** manages map-specific memory targets.
- **Memory Swap** can create a bounded safety pool for map servers; it is not a replacement for sufficient RAM.
- **Autoscaler** reacts to demand for dynamic maps.
- Deep Desert layouts let an operator explicitly run one, two, or three instances.

Start conservatively, observe real peak usage, and add maps gradually. Avoid treating Linux cache or one large idle process as proof of a leak; evaluate sustained growth, swap pressure, OOM events, and service health together.
