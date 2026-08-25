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

See [Restart Queue](../technical/console/restart-queue.md) for the precise countdown and recovery behavior.
