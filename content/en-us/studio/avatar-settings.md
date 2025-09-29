---
title: Avatar Settings
description: The Avatar Settings window contains all Studio-level settings and customization options for an experience.
---

The **Avatar Settings** window, accessible from Studio's **File** menu or the **Avatar** tab, allows you to control the look and behavior of user avatars across your entire experience.

<img src="../assets/studio/general/Toolbar-Avatar-Settings.png" width="800" alt="Avatar Settings indicated in Studio's toolbar" />

Most experiences will find that the default avatar settings work perfectly right out of the box, offering a seamless player experience. The extensive controls in **Avatar Settings** are primarily for advanced creators looking to finely tune avatar appearance and behavior for specific gameplay needs.

<Alert severity="warning">
**Avatar Settings** modifies underlying experience defaults that are not visible outside of the settings interface or accessible with scripts. This can lead to difficult-to-debug behaviors, especially when working across teams or on a universe with multiple place files.

Test your changes by using the window's preview and by playtesting in Studio so that you fully understand the impact on player avatars before publishing changes to your live experience.
</Alert>

The top bar of the **Avatar Settings** window provides easy access to quickly set the avatar type, assign a preset, and enable preview.

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Preset**</td>
    <td>Displays which Settings preset is enabled and allows you to toggle between them (for descriptions of each setting, see [General](#general)). <br /><br />If the preset displays `--`, this indicates that the current settings are customized and do not match a preset.<br /> </td>
  </tr>
  <tr>
    <td>**Preview**</td>
    <td>Toggles a preview lineup of avatars based off the avatar settings applied. <br/><br/>This creates an `AvatarPreview` folder under **Workspace**&nbsp;⟩ **Camera** with four representative avatar types. You can add or remove avatars to the lineup by dragging them into or out of the folder. <br/> <br/>This folder is removed during Studio runtime playtesting and it is not saved to your place file.</td>
  </tr>
  <tr>
    <td>**&ctdot;**</td>
    <td>Sets the default avatar type to either **R6**, **R15**, or **R15 & R6**.</td>
  </tr>

</tbody>
</table>

## General

The **General** tab offers simple presets tailored to the needs of most experiences. In many cases, one of these presets will fit your experience's avatar use-cases and additional configuration is not necessary. However, advanced developers can further customize avatar behavior using the more detailed settings available in the other tabs.

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>****Player Choice****</td>
    <td>Loads player avatars without any modifications.</td>
  </tr>
  <tr>
    <td>**Consistent Gameplay**</td>
    <td>Sets all avatars to the same height with the same box collider for consistent collision behavior.</td>
  </tr>
</tbody>
</table>

## Body

The **Body** tab contains settings for body proportions, parts, scale.

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Scale**</td>
    <td>
      <ul>
        <li>**Player Choice** (default): Does not modify avatar character scale.</li>
        <li>**Custom Scale**: Allows you to scale avatars to an absolute height in studs, but maintain their proportions. You can set a **Minimum** and **Maximum** range. </li>
      </ul>
      <br />
      <Typography variant='body1'>For reference, classic style avatars are around 5 studs tall. More humanoid style proportions are around 6 - 6.5 studs.</Typography>
    </td>
  </tr>
  <tr>
    <td>**Appearance**</td>
    <td>
      <ul>
        <li>**Player Choice** (default): Does not modify avatar character appearance.</li>
        <li>**Custom Parts**: Lets you override a user's default body part to a custom ID.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>**Build**</td>
    <td>
      <ul>
        <li>**Player Choice** (default): Does not modify avatar character proportions.</li>
        <li>**Custom Build**: Provides customization options that limits the user's avatar body type, height, width, head size, and proportions. </li>
      </ul>
    </td>
  </tr>
</tbody>
</table>

## Clothing

The **Clothing** tab contains controls for layered and classic clothing.

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Clothing Scale</td>
    <td>
      <ul>
        <li>**Player Choice** (default): Keep user's avatar clothing.</li>
        <li>**Custom Limit**: Remove any clothing that exceeds the limit bounds of the avatar.</li>
        <ul>
          <li>**Limit Bounds**: The amount of length, width, and depth padding beyond the avatar body’s bounding box, expressed as a percentage. <br /> <br />0% means no padding and items must be strictly within the bounding box of the body and 100% adds padding equal to the avatar's bounding box on all sides, allowing items to occupy up to three times the body size. <br /> <br />This limit is shown as a blue box around each avatar in the preview lineup.</li>
        </ul>
      </ul>
    </td>
  </tr>
    <tr>
    <td>Custom Clothing</td>
    <td>
      <ul>
        <li>**Player Choice** (default): Keep user's avatar clothing.</li>
        <li>**Custom Clothing**: Lets you override a user's layered clothing equip slot or classic clothing type to a custom ID. If you check the box to override, but leave the **Asset ID** field blank, it will remove all player clothing in that equip slot.</li>
      </ul>
    </td>
  </tr>
</tbody>
</table>

## Accessories

The **Accessories** tab contains settings related to accessories in your experience.

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Accessory Scale**</td>
    <td>
      <ul>
        <li>**Player Choice** (default): Does not change the scale of user's equipped accessories.</li>
        <li>**Custom Limit**: Allows you to **Scale** accessories, or **Remove** accessories that exceed limit bounds.</li>
          <ul>
            <li>**Limit Method**: Allows you to **Scale** accessories to fit within limit bounds, or **Remove** accessories that exceed limit bounds.</li>
            <li>**Limit Bounds**: The amount of length, width, and depth padding beyond the avatar body's bounding box, expressed as a percentage. <br /> <br />0% means no padding and items must be strictly within the bounding box of the body and 100% means pad by 100% of the bounding box on each side, so items can occupy an area three times the size of the body. <br /> <br />The limit bounds are visualized as a blue box around each avatar in the preview lineup.</li>
          </ul>
      </ul>
    </td>
  </tr>
  <tr>
    <td>**Custom Accessories**</td>
    <td>
      <ul>
        <li>**Player Choice** (default): Keep user's avatar accessories.</li>
        <li>**Custom Accessories**: Lets you override a user's accessory types to a custom ID. If you check the box to override, but leave the Asset ID field blank, it will remove all player accessories of that category.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>**Accessory Behaviors**</td>
    <td>Controls to enable/disable accessory behaviors like VFX and Sound.</td>
  </tr>
</tbody>
</table>

## Movement

The **Movement** tab contains collision and animation settings.

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Collision**</td>
    <td>
      <ul>
        <li>**Default**: Use Outer Box method for collisions. This method calculates collisions based off the bounding boxes of avatar parts. </li>
        <li>**Single Collider**: Use a single consistently sized box for collisions.</li>
          <ul>
            <li>**Size**: Set the length, width, and depth of the collider box.</li>
            <li>**Hit & Touch Detection**: Set hit and touch events to use avatar **parts** or **colliders**.</li>
          </ul>
        <li>**Legacy**: Use Inner Box Collision method (for backwards compatibility only).</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>**Animation Packs**</td>
    <td>
      <ul>
        <li>**Player Choice** (default): Keep user's platform animation style, including style packs</li>
        <li>**Standard R15**: All avatars will use the Standard R15 platform animations.</li>
        <li>**Standard R6**: All avatars will use the Standard R6 platform animations.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>**Animation Clips**</td>
    <td>
      <ul>
        <li>**Player Choice** (default): Keep user's platform animations.</li>
        <li>**Custom Clips**: Lets you override and preview any default animation type with a custom ID. These overrides are applied **on top of your selection of Animation Pack**.</li>
      </ul>
    </td>
  </tr>
</tbody>
</table>
