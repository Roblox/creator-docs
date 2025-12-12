---
title: Release experience updates
description: Explains how to release updates for experiences.
---

When you publish an updated version of an experience to Roblox, players aren't immediately removed from old versions of the experience. Instead, you can migrate players to the updated version by restarting all of your outdated servers.

If you don't restart servers, players transition to the new version of the experience as the servers running old versions eventually empty and shut down. This option is non‑disruptive, but your player base might be playing different versions of the experience for a prolonged period of time; if your underlying player data format changes, you should probably restart servers.

For time-sensitive updates, you might prefer to deploy early, hide content behind a [config](../production/configs.md), and then change the config value to release your new content.

## Restart servers

To restart servers for release updates:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select the experience you want to restart servers for.
2. Go to **Configure** ⟩ **Server Management**.
3. Select the places you want to restart.
4. Click **Restart Servers**.
5. In the **Confirm Server Restart** dialog:
   1. Select one or both of the following restart options:
      - **Restart only servers with outdated versions** to avoid restarting servers that are running the latest published place version.
      - **Delay server restart** to delay the shutdown of servers and allow players a set time between 1 and 60 minutes to leave the experience on their own instead of being temporarily disconnected. This is also known as server bleed-off.
   2. Click **Restart**.

<Alert severity="warning">
   Unless you have an experience update workflow that is independent of place version, it's recommended that you always select **Restart only servers with outdated versions** to avoid unnecessarily disconnecting players.
</Alert>

After you restart servers, Roblox:

1. Stops all matchmaking to servers designated for shutdown. Players who join your experience by clicking the **Play** button will not be matched to these servers, but they can still join them by accepting invites, teleporting, or joining another user from their profile.
2. Waits for the configured delay time, if you selected the **Delay server restart** option.
3. Automatically teleports players to the updated version of the experience. All players on the same old server are sent to the same replacement server running the new version.

<Alert severity="info">
   If you want to completely shut down your experience and not allow players to reconnect after you restart your servers, you must make the experience private.
</Alert>
