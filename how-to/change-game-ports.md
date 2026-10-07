# Change Game Ports

Use this when your router needs a different game-port range or another service already occupies the defaults. Changing the Console's browser port is a separate operation, explained below.

## Before You Change Anything

Arrange a maintenance window: the game services need to restart, and connected players will be disconnected. Record the old values and router rules so you can put them back if necessary.

Two settings control the UDP pools:

| Setting | Default | Purpose |
| --- | --- | --- |
| `Port` | `7777` | Starting port for game clients; the primary Overmap uses this port and primary Hagga uses the next one. |
| `IGWPort` | `7888` | Starting port for game-server communication. It must not overlap the client pool. |

Allow room for additional Sietches and dynamic maps, not just the two primary maps. The standard ranges reserve 34 ports each: `7777–7810` and `7888–7921`.

## Change the Ports in the Console

1. Open **Maps** and let its settings finish loading.
2. Open **Advanced**, then the **UserEngine.ini** editor.
3. Find the existing `[Global:URL]` section. Change only its `Port` and `IGWPort` values. For example:

   ```ini
   [Global:URL]
   Port=8777
   IGWPort=8888
   ```

4. Preserve the rest of the file, including names and passwords. Save your changes and choose the manual/deferred restart option so you can finish the network changes before restarting.
5. Update host firewall and router rules for the new client range. In this example it is UDP `8777–8810`. Keep the corresponding internal communication range, `8888–8921`, available between game services.
6. Restart the Battlegroup to apply the changed port configuration consistently. Wait until the required maps are ready, then test joining and travelling between Hagga and Overmap.

This raw editor changes the shared configuration, not only the map selected in Interactive Modifiers. Do not create duplicate `[Global:URL]` sections or use the same pool for both settings.

## Router and Firewall Rules

Forward the new client UDP range to the Linux server's LAN address. Keep external and internal port numbers consistent with what the server advertises. Changing only the router's external port does not change the game's advertised port.

The RabbitMQ game endpoints, normally TCP `31982` and `31983`, are still needed. Changing `Port` does not change them. Do not expose the database or administration endpoints to solve a game connection problem. See [Networking and Ports](../getting-started/networking.md) for the full list.

## Check the Result

From your project folder:

```bash
runtime/scripts/dune ports
runtime/scripts/dune doctor
```

These check the local configuration and listeners. They cannot prove your router forwards traffic correctly; also test with a player outside your home network.

Do not rely on editing `CLIENT_PORT_BASE` or `IGW_PORT_BASE` in `.env` alone. The game port bases are resolved from UserEngine settings.

## Change Only the Browser Console Port

Open **Settings → Web Console Port**, enter the new **Console Port**, and choose **Save And Restart Console**. Reconnect using the displayed address and new port. This restarts the Console, not the Battlegroup.

For multiple Battlegroups on one public IP, use [Multiple Servers on One IP](../operations/multiple-servers.md): changing only the game UDP ports is not enough.
