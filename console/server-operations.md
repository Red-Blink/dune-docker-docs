# Server Control, Logs, and Health

## Home and Server Control

Use **Home** for Battlegroup-level Start, Stop, and Restart actions and a summarized readiness view. **Server Control** exposes individual services and map processes when a narrower restart is appropriate.

The Restart Queue can delay a restart, announce checkpoints in game, and avoid unexpectedly disconnecting active players. A deferred restart leaves the current process running and applies the change at the next restart.

## Logs

The Logs page streams allowlisted service logs. Game and infrastructure logs are stored in UTC by design. Enable **Show in Local Time** to convert recognized timestamps for display without changing the original log text.

Common targets include Gateway, Director, Survival, Overland, PostgreSQL, RabbitMQ, Text Router, Autoscaler, and dynamic map containers.

## Health Checks

- **Status** shows service/container state.
- **Readiness** checks whether the Battlegroup is actually ready to serve players.
- **Doctor** gathers safe diagnostics for common installation and runtime problems.
- **Ports/Ping** help separate local service health from external connectivity.

Readiness totals count the checks that are currently ready. For example, a Funcom/FLS token mismatch must reduce a previously complete total rather than leave **4 of 4** while that service reports an error. Performance warnings such as **Critical** describe resource pressure; they are not proof that a service has failed.

Status and readiness are refreshed independently of slower diagnostics, so the main controls can become usable while Doctor is still loading. During a Start, Stop, or Restart, the Console requests fresh readings rather than treating an older ready snapshot as completion.

See [Restart Queue](../technical/console/restart-queue.md) for the precise countdown and recovery behavior.

## Startup and Restart History

[Server Startup](../how-to/server-startup.md) controls whether the Battlegroup automatically starts after the host boots. It is separate from starting or stopping it now.

Use **Restart History** to inspect recorded restart activity and affected targets. An empty or filtered history is not proof that the Linux host never restarted; it is a record of operations captured by the Console/runtime, not a complete operating-system audit.

Restart History is closed by default; select its bar to expand it. **Last Battlegroup Restart** refers to recorded Battlegroup activity, not every individual map restart.

## Disk Cleanup

Server Control can clean obsolete Docker images or build cache. Review the action's scope and wait for its final result. Cleanup progress and its result remain visible when you leave the page and return within the same Console session.

Image/cache cleanup does not expand a filesystem or replace backup management. See [Memory and Map Capacity](../operations/memory-and-capacity.md#disk-space-and-host-storage) when the host's available space is smaller than its virtual disk.
