# Requirements

You do not need to be a Linux expert. The installer checks the essentials and prepares Docker on supported Linux systems.

| Requirement | Guidance |
|---|---|
| Host | A fresh 64-bit Ubuntu server is the simplest recommended option. Other Linux distributions, Windows with WSL2/Docker Desktop, and virtual machines are supported. |
| CPU | AVX/AVX2 support is required. |
| Memory | Start with 20 GB; allow 30–40 GB or more for additional always-on maps and active communities. |
| Storage | 200 GB or more is recommended for the game, images, updates, logs, and backups. |
| Access | A regular user account with `sudo` access. Do not install while logged in as `root`. |
| Funcom token | Required during guided browser setup and stored as a local secret. |

## Memory Planning

| Layout | Recommended RAM |
|---|---:|
| Basic server | 20 GB |
| Main world plus extra story or social maps | 30 GB |
| Main world, extra maps, and Deep Desert | 40 GB |
| Many always-on maps or heavier activity | 60 GB+ |

The Survival server can retain roughly 10–12 GB while idle. That alone does not indicate a memory leak. In `docker stats`, `100%` CPU represents one fully used logical CPU.

{% hint style="danger" %}
Never expose PostgreSQL, RabbitMQ administration, Docker, or other internal service ports to the public internet. The Console should be reachable only by trusted administrators.
{% endhint %}
