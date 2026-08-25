---
---

# System Architecture

Dune Docker separates orchestration, administration, game services, and optional community services so each can be updated and recovered independently.

```text
Operator
  ├─ Browser → Console Web → Console API
  └─ SSH → dune CLI
                  │
                  ├─ Docker orchestrator / SteamCMD content
                  ├─ PostgreSQL game database
                  ├─ RabbitMQ + Text Router
                  ├─ Battlegroup Director + Gateway
                  ├─ Survival / Overland / dynamic map servers
                  └─ Optional metrics and public directory probe
```

## Console

The web frontend is React/TypeScript. The Node.js API uses the built-in HTTP server, executes allowlisted runtime actions, reads/writes PostgreSQL through narrowly scoped services, and maintains generated Console state under `runtime/generated`. Session/CSRF authentication, IAM, rate limits, confirmations, auditing, and redaction protect mutations.

## Runtime

The `dune` CLI and scripts under `runtime/scripts` manage containers, readiness, updates, backups, map lifecycle, Sietch dimensions, autoscaling, memory, and network diagnostics. Gameplay services run as named Docker containers. Dynamic partitions are created from Director/database state and reconciled by runtime services.

## Data Ownership

- Funcom owns the game schema and can change it in game updates.
- Dune Docker stores configuration, secrets, generated state, logs, and backup metadata outside source-controlled files.
- Console-owned database features use separate schemas/tables where practical.
- Public directory and Player Portal data are opt-in and minimized before leaving the host.

For the code-level maintained reference, read [System Architecture Overview on GitHub](https://github.com/Red-Blink/dune-awakening-selfhost-docker/blob/main/docs/architecture/SYSTEM-OVERVIEW.md).
