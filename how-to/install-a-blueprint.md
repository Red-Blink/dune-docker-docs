# Install a Blueprint

Bring a design from [Blueprint Studio](https://blueprints.dunedocker.app/) into your character's inventory using the Dune Docker Console. You do not need the Windows Blueprint Installer for a Dune Docker server.

## Before You Begin

- You need administrator access to the server's Console. If you are a player, send the blueprint to your server administrator.
- Keep a recent [server backup](backups.md).
- Leave a free backpack slot for each blueprint you import.

An import adds a blueprint item, not a completed base. You still place and build the design in game. Terrain, building limits, stability rules, and DLC ownership can affect what you can build.

## Download and Import

1. Open a design in Blueprint Studio and choose **Download**. For your own design in the editor, choose **Export**. Keep the downloaded JSON file.
2. Open your server's Dune Docker Console and go to **Players**.
3. Select the character who should receive the blueprint, then open their **Blueprints** tab.
4. In **Player Blueprints**, select the downloaded JSON file in the import section and confirm the import. You can import up to ten files at once if the character has enough free backpack slots.
5. Wait for the success message, then log the character out and back in. The blueprint appears in their backpack.
6. Use the blueprint item in game to preview and place the design in a suitable location.

The Blueprints tab also offers a community browser for installing shared designs directly. A manual JSON download is useful for private designs or files someone sends you.

## If It Does Not Appear

Check that the import succeeded for the correct character, that their backpack has space, and that they logged out and back in after the import. If it failed, read the Console's result message before trying again. Do not restore a whole server backup just because a blueprint is not visible yet.

## Playing Solo Instead?

The [Base Installer on Blueprint Studio](https://blueprints.dunedocker.app/) provides a signed Windows installer for Retail Solo saves. Close the game, wait for Steam Cloud to finish, and keep a separate copy of your save before importing. The installer does not require Dune Docker or a game server.
