# Table of Contents

* [Welcome](README.md)

## How Do I...?

* [Common Tasks and Terminology](how-to/README.md)
* [Change Game Ports](how-to/change-game-ports.md)
* [Set a Sietch Password](how-to/sietch-password.md)
* [Rename or Add Sietches](how-to/manage-sietches.md)
* [Control Startup After Reboot](how-to/server-startup.md)
* [Change Gameplay Settings](how-to/gameplay-settings.md)
* [Automatic Restarts and Updates](how-to/automation.md)
* [Allow or Block Character Transfers](how-to/character-transfers.md)
* [Enable and Spawn Regis Tanks](how-to/regis-tanks.md)
* [Hide Inactive Players](how-to/inactive-players.md)
* [Install a Blueprint](how-to/install-a-blueprint.md)
* [Update the Console or the Game](how-to/updates.md)
* [Back Up Before Making Changes](how-to/backups.md)
* [Install on Another Drive](how-to/install-on-another-drive.md)
* [Ubuntu WSL2 and Docker Desktop](how-to/windows-wsl2.md)
* [Connection Problems](how-to/connection-problems.md)

## Getting Started

* [Requirements](getting-started/requirements.md)
* [Installation](getting-started/installation.md)
* [Install Dune Docker on Windows with VMware](getting-started/install-dune-docker-on-windows.md)
* [First Run](getting-started/first-run.md)
* [Migrate a Hyper-V Database](getting-started/migrate-hyper-v-database.md)
* [Networking and Ports](getting-started/networking.md)
  * [Private Console Access with Tailscale](getting-started/private-console-access.md)
  * [Local Network NAT Loopback Alternative](getting-started/nat-loopback.md)

## Dune Docker Console

* [Console Overview](console/overview.md)
* [Server Control, Logs, and Health](console/server-operations.md)
* [Maps, Sietches, and Deep Desert](console/maps-and-sietches.md)
* [Players and Guilds](console/players-and-guilds.md)
  * [Deleted Characters and Abandoned Assets](technical/console/deleted-characters.md)
* [Bases and Land Claims](console/bases-and-land-claims.md)
* [Vehicles](console/vehicles.md)
* [Exchange and Market Bot](console/exchange-and-market.md)
* [Live Map](console/live-map.md)
* [Landsraad](console/landsraad.md)
* [Admin Tools and Care Packages](console/admin-tools.md)
* [Backups and Restore](console/backups-and-restore.md)
* [Database](console/database.md)
* [Updates and QA Builds](console/updates.md)
  * [Restore a Previous Version](console/restore-previous-version.md)
* [Settings and Access](console/settings.md)
  * [Recover the Admin Web Password](console/recover-admin-password.md)
  * [Server Custom Settings](technical/console/server-custom-settings.md)

## Community Services

* [Dune Docker Base Builder](community/base-builder.md)
* [Public Server Directory](community/server-directory.md)
* [Player Portal and Privacy](community/player-portal.md)
* [Community Addons](community/addons.md)
* [Discord Integration](community/discord-integration.md)

## Operations

* [Day-to-Day Operations](operations/day-to-day.md)
* [Memory and Map Capacity](operations/memory-and-capacity.md)
* [Multiple Servers on One IP](operations/multiple-servers.md)
* [Security](operations/security.md)
* [Troubleshooting](operations/troubleshooting.md)
  * [Repair Permission Errors](operations/repair-permission-errors.md)
  * [Docker Desktop, WSL2, Hyper-V, and VMware Network Conflict](operations/docker-desktop-wsl2-network-conflict.md)

## Reference

* [CLI Reference](reference/cli-reference.md)
* [Console HTTP API](reference/http-api.md)
  * [Complete Endpoint Reference](technical/console/API-REFERENCE.md)
* [API Authentication and Safety](reference/api-authentication.md)
* [Addon Development](developers/addon-development.md)
* [System Architecture](developers/system-architecture.md)
  * [Architecture Overview](technical/architecture/SYSTEM-OVERVIEW.md)
  * [Service Responsibilities](technical/architecture/SERVICES.md)
  * [Database Contracts](technical/architecture/DATABASE.md)
  * [World and Partition Model](technical/architecture/WORLD-MODEL.md)
* [Contributing](developers/contributing.md)

## Detailed Technical Guides

* [Blueprints](technical/console/blueprints.md)
* [Pre-Augmented Gear](technical/console/PRE-AUGMENTED-GEAR.md)
* [Base Inventory](technical/console/base-inventory.md)
* [Base Permissions](technical/console/base-permissions.md)
* [Base Deletion](technical/console/base-deletion.md)
* [Base Backup Actors](technical/console/base-backups.md)
* [Database and System Backups](technical/console/database-backups.md)
* [Restart Queue](technical/console/restart-queue.md)
* [Vehicle Permissions](technical/console/vehicle-permissions.md)
* [Vehicle Storage Contents](technical/console/vehicle-storage.md)
* [Vehicle Deletion](technical/console/vehicle-deletion.md)
* [Per-Piece Base Permissions](technical/console/base-child-permissions.md)
* [Market Board Internals](technical/console/exchange.md)
* [Live Map Internals](technical/console/live-map.md)
* [Generator Refill Caps](technical/console/generator-refill-caps.md)
* [Generator Fuel Burn Rates](technical/console/generator-fuel-burn-rates.md)
* [Addon Item Grants](technical/addons/addon-item-grants.md)
* [Addon Runtime API](technical/addons/addon-runtime-api.md)
* [Addon Scheduled Jobs](technical/addons/addon-scheduled-jobs.md)
* [Addon Hardware Status](technical/addons/hardware-status.md)
* [Console IAM Architecture](technical/console-iam.md)
* [Console Authentication Design](technical/rfc-console-auth.md)
* [Scoped Console API Keys](technical/console/api-keys.md)

### Discord Integration Internals

* [Discord Adapter Setup](technical/integrations/discord-integration/README.md)
* [Discord Administrator Guide](technical/integrations/discord-integration/admin-guide.md)
* [Discord Frequently Asked Questions](technical/integrations/discord-integration/faq.md)
* [Discord Troubleshooting](technical/integrations/discord-integration/troubleshooting.md)
* [Discord Companion Bot Setup](technical/integrations/discord-control-bot/setup-guide.md)
* [Companion Bot Administration](technical/integrations/discord-control-bot/admin-guide.md)
* [Discord Commands for Players and Admins](technical/integrations/discord-control-bot/user-guide.md)
* [Discord API Adapter Contract](technical/integrations/discord-control-bot/api-adapter-contract.md)

### Historical Engineering Records

* [Blueprint Import and Export Test Report](technical/archive/blueprints-report.md)
* [Addon Provenance Security Record](technical/security/addon-provenance.md)
* [Pre-Augmented Gear Grant Record](technical/security/pre-augmented-gear-grant.md)

## Project

* [Help, Issues, and Requests](support.md)
* [Credits and License](credits-and-license.md)
