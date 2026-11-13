# Dune Docker Base Builder

[Dune Docker Base Builder](https://blueprints.dunedocker.app/) is a browser-based 3D planning and sharing tool for **Dune: Awakening** bases. Use it to experiment with a layout before committing time and materials in game.

## What You Can Do

- Browse a searchable catalog of structures and placeables.
- Place, snap, move, rotate, duplicate, and inspect pieces in 3D.
- Check collisions and plan coverage across multiple land claims.
- Preview a design from different angles, switch between day and night, and walk through the layout.
- Capture screenshots and import or export supported base layouts.
- Save public, unlisted, or private projects after signing in as a community member.
- Explore shared community designs and make an editable copy as a starting point.

The Base Builder is also linked from the Dune Docker Console footer. It runs in your browser and does not require access to your server's Console.

{% hint style="warning" %}
The Base Builder is a planning aid. Game updates, missing assets, terrain, stability rules, and world restrictions can affect whether a design can be built exactly as shown. Keep a backup before importing or replacing game data.
{% endhint %}

[Open Dune Docker Base Builder](https://blueprints.dunedocker.app/)

## Solo Blueprint Installer

The website also provides the signed **Dune Blueprint Installer 0.2.7** for Windows 10/11 x64. It works with supported Retail Solo saves and needs Microsoft Edge WebView2 Runtime. Docker and administrator privileges are not required.

For an import, download a **game-ready Blueprint JSON**, fully exit the game and wait for Steam Cloud synchronization, then select your Solo character and Blueprint. Import delivers the Blueprint to the character's backpack; it does not place the base in the world or grant DLC ownership. Keep a free inventory slot and a separate save backup.

If a newly created character is missing, enter Solo, save and exit normally, then refresh. **Browse Save** can select its `game.db` below `%LOCALAPPDATA%\DuneSandbox\Saved\Cloud\PlayerClientStorage\FLS_retail`. Unknown save schemas remain blocked rather than being modified speculatively.

To export, choose **Export Base** in the character card, select a base and choose **Export JSON**. The export contains supported building pieces and placeables, with relative positions and native rotations. It excludes stored inventory, player progress, ownership identifiers and global coordinates. Unsupported pieces or shield variants can prevent export rather than silently producing a broken layout. The source save is not replaced.

The installer checks for updates on startup and every six hours. **About → Check for Updates** checks manually; an available update opens the official download in your browser. It never replaces itself automatically. Versions older than the notification feature need a manual upgrade first. Previews require internet access for models, while local save operations do not upload the save or Blueprint.
