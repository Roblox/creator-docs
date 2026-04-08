---
title: include
---

The CCL is **opt-in** through Studio's [Avatar Settings](../../studio/avatar-settings.md) window. To enable it:

1. From the **Avatar** tab, open [Avatar Settings](../../studio/avatar-settings.md).

   <img src="../../assets/studio/general/Toolbar-Avatar-Settings.png" width="800" alt="Avatar Settings indicated in Studio's toolbar" />

2. Select the **Movement** tab on the left side of the window and, in the **Abilities** section, select **Character&nbsp;Controller&nbsp;Library**.

   <img src="../../assets/studio/general/Avatar-Settings-CCL.png" width="600" alt="Character Controller Library toggle in the Avatar Settings window" />

3. All of the standard abilities like **Running**, **Jumping**, and **Climbing** are enabled by default. To disable any of them at runtime, uncheck the associated box.

   <Alert severity="warning">
	 It's not recommended to disable **Running**, as doing so will prevent characters from moving along the ground. Additionally, you should always keep **Getting&nbsp;Up** enabled if **Falling&nbsp;Down** is enabled, as a mismatch will allow characters to fall down (trip) but never get back up.
	 </Alert>
