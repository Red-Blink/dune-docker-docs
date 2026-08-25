---
---

# CLI Reference

Run commands from the project directory with `dune` available on the path. Use `dune --help` on your installed version for the exact current syntax.

## Core and Diagnostics

```text
dune init
dune start | stop | status | version
dune doctor | ps | servers | ports | ping | ready
dune logs <service> [--raw]
dune restart <service>
dune console restart | status
```

## Maps and Runtime

```text
dune spawn <map-name|partition-id>
dune despawn <map-name|partition-id|container-name>
dune autoscaler [status|start|stop|restart|logs|run]
dune maps list
dune maps mode [map]
dune maps set <map> <dynamic|always-on|overmap-active|disabled>
dune maps reconcile
dune deepdesert layout [status|set|repair]
dune deepdesert dual [status|enable|disable|bootstrap|repair]
dune coriolis [status|scan-once]
```

## Sietches

```text
dune sietches list
dune sietches show <map-name>
dune sietches dimensions <map-name>
dune sietches set-max <map-name> <count>
dune sietches set-active <map-name> <count>
dune sietches set-display <partition-id> <display-name>
dune sietches set-password <partition-id> [password]
dune sietches sync | validate
```

## Updates and Schedules

```text
dune update check
dune update [--yes]
dune update auto enable [interval-minutes]
dune update auto disable | status
dune self-update check | list
dune self-update install [latest|<tag>]
dune restart-schedule enable <HH:MM> [notify-minutes]
dune restart-schedule disable | status
dune ip-change-restart [enable|disable|status|check-now]
```

`dune update` updates Funcom game content. `dune self-update` updates Dune Docker Console itself.

## Backups and Database

```text
dune db backup [output-dir]
dune db list | status | health
dune db import <backup-file>
dune db restore <backup-file>
dune db restore <backup-file> --adopt-backup-battlegroup
dune db restore <backup-file> --keep-current-battlegroup
dune db delete <backup-file> | --all
dune db auto enable <HH:MM> [retention-days]
dune db auto disable | status
dune db auto retention <days|off>
dune db transfer [options] <old-fls-id> <new-fls-id>
dune database [status|schemas|tables|counts|columns|preview|sql|export]
```

## Memory, Storage, and Metrics

```text
dune storage [status|cleanup [--dry-run] [--build-cache]]
dune memory status | list-maps
dune memory set <map-name|default> <memory>
dune memory unset <map-name|default>
dune memory-swap status | enable | disable
dune metrics [start|stop|restart|status|logs|config|pull]
dune shutdown-protection [enable|disable|remove|status]
dune network [status|fix]
```

## Player Administration

```text
dune admin players [--online] [--show-full-ids]
dune admin kick <player-fls-id> [--dry-run] [--yes]
dune admin item-search <query>
dune admin item-list [category]
dune admin grant-item <player-id|*> <item-name> [quantity] [durability]
dune admin grant-item-id <player-id|*> <item-id> [quantity] [durability]
dune admin award-xp <player-id|*> <amount>
dune admin skill-points <player-id|*> <points>
dune admin specialization-xp <character-name> [options]
dune admin specialization-max <character-name> [options]
dune admin refill-water <player-id|*> [amount]
dune admin clean-inventory <player-id|*>
dune admin reset-progression <player-id|*>
dune admin teleport <player-id> <x> <y> <z> [yaw]
dune admin spawn-vehicle <player-id> <vehicle-id> <template-name> [offset]
dune admin broadcast-restart-warning <minutes>
dune admin history
```

{% hint style="info" %}
The Console is preferred for interactive administration because it supplies validation, current context, confirmations, and result messages. Use the CLI for automation and support workflows.
{% endhint %}

