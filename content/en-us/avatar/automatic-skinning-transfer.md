---
title: Automatic Skinning Transfer
description: Automatic Skinning Transfer can create deformation data for character accessories without manual skinning.
---

**Automatic Skinning Transfer** allows layered accessories and facial accessories to deform accurately along with the character body model it's attached to without you having to skin the accessory itself. Instead of the complex task of manually [rigging and skinning](../art/modeling/rigging.md) models in 3D modeling software, you can use this feature to transfer or generate skinning data to the accessory. When using Automatic Skinning Transfer, the Roblox engine creates and applies skinning at runtime.

**No skinning of accessory geometry is required to use Automatic Skinning Transfer**. In fact, auto-skinned accessories work well and move accurately with most characters they're attached to as they animate, even if those characters have a different number of joints, bones, or use a different kind of skinning.

<center><img src="../assets/avatar/dynamic-heads/creating-face-accessories/Automatic-Skinning-Transfer-Intro.jpg" width="70%" /></center>

<Alert severity="info">
Skinning is still an important concept for character creation, and if you're creating custom characters, you may want to apply skinning data to the model to create a character with more natural looking poses and animations. For information on how to skin a mesh, see [Skin a humanoid model](../art/modeling/skin-a-humanoid-model.md).
</Alert>

## Enable Automatic Skinning Transfer

To enable the Automatic Skinning Transfer process you must:

1. Enable `Class.StarterPlayer.LoadCharacterLayeredClothing` in your game.
2. Enable the `Class.WrapLayer.AutoSkin|AutoSkin` property within the `Class.WrapLayer` instance of the layered `Class.Accessory` you want to automatically skin, then set it to one of the following values:
   - `EnabledOverride`: Enables the Automatic Skinning Transfer process and allows it to override any existing skinning information found on the accessory at runtime.
   - `EnabledPreserve`: Enables the Automatic Skinning Transfer process but doesn't allow it to override any existing skinning information found on the accessory at runtime. If there isn't any skinning to maintain, the Automatic Skinning Transfer process automatically creates new skinning data.

When there isn't any skinning data on the accessory, or if you choose to override any existing skinning data associated with the accessory, the Roblox engine calculates skinning data from the character's geometry and cages, then the new skinning data and rig associated with the accessory drives the accessory's deformations and motions in sync with the source geometry itself.

## Best practices

<Alert severity="info">
Because the Automatic Skinning Transfer process uses a character body's outer cage to help calculate skinning data to apply onto the accessory, it's important that all [layered accessory requirements](../avatar/layered-accessories/specifications.md) are still met when creating accessories.
</Alert>

While Automatic Skinning Transfer often works better than manual skinning, there are some best practices to reduce unexpected behavior with the layered accessory skinning process. Like all modeling processes, constantly test your layered accessories and facial accessories on different avatar types to achieve the results you want.

### Special skinning transfer joints

Automatic Skinning Transfer may not work well for certain detailed accessory types, such as eyelashes or eyebrows. To get a more controlled skinning transfer result, you have the option to skin accessory geometry to one of two specially named joints: `RBX_Leader` and `RBX_Follower`.

<Alert severity = 'info'>
It's best to create these joints/bones directly beneath the `Root` joint in your hierarchy for simplicity and clarity. These joints/bones won't be detected as a part of your character model's [standard](./character-bodies/specifications.md#standard-rigs) rigging armature on import.
</Alert>

Any vertices skinned to `RBX_Leader` undergo the same transfer process that exists today. However, any vertices skinned to `RBX_Follower` transfer based on their nearest leader vertex. This allows for better results in situations like an eyelash where the tip of an eyelash strand would normally transfer to somewhere on the brow area rather than follow the base of the eyelash strand when moving.

<GridContainer numColumns="2">
<figure>
  <video src="../assets/avatar/dynamic-heads/creating-face-accessories/Vertices-Transfer-Off.mov" controls width="100%"></video>
  <figcaption>The upper eyelashes near the bridge of the nose don't follow the eyelids as expected because they do not include transfer joints.</figcaption>
</figure>
<figure>
  <video src="../assets/avatar/dynamic-heads/creating-face-accessories/Vertices-Transfer-On.mov" controls width="100%"></video>
  <figcaption>All eyelashes follow the leading vertices closest to the eyes because they include transfer joints.</figcaption>
</figure>
</GridContainer>

For eyelashes, good candidates for `RBX_Leader` are the ones that are intended to sit right on the eyelid of the character. The remaining vertices can be skinned to `RBX_Follower`.

<GridContainer numColumns="2">
<figure>
  <img alt="Screenshot of vertices assigned as leader." src="../assets/avatar/dynamic-heads/creating-face-accessories/Vertices-Group-Leader.png" />
  <figcaption>Vertices of an eyelash assigned to a `RBX_Leader` bone vertex group.</figcaption>
</figure>
<figure>
  <img alt="Screenshot of vertices assigned as follower." src="../assets/avatar/dynamic-heads/creating-face-accessories/Vertices-Group-Follower.png" />
  <figcaption>Vertices of an eyelash assigned to a `RBX_Follower` bone vertex group.</figcaption>
</figure>
</GridContainer>

For eyebrows, good candidates for `RBX_Leader` are vertices along the edges that span the browline.

<GridContainer numColumns="2">
<figure>
  <img alt="Screenshot of vertices assigned as leader." src="../assets/avatar/dynamic-heads/creating-face-accessories/Eyebrows-Follower-Vertices.png" />
  <figcaption>Vertices of an eyebrow assigned to a `RBX_Leader` bone vertex group.</figcaption>
</figure>
<figure>
  <img alt="Screenshot of vertices assigned as follower." src="../assets/avatar/dynamic-heads/creating-face-accessories/Eyebrows-Leader-Vertices.png" />
  <figcaption>Vertices of an eyebrow assigned to a `RBX_Follower` bone vertex group.</figcaption>
</figure>
</GridContainer>

In Blender, use the **Object Data Properties** > **Vertex Groups** to manage and view your vertex group assignments.

  <img alt="Screenshot of properties panel with vertex group assignments" src="../assets/avatar/dynamic-heads/creating-face-accessories/Vertices-Group-Assign.png" />

<Alert severity = 'info'>
In Blender, vertex groups are automatically created after you make a bone object. This allows you to quickly set vertices to a specific bone vertex group.
</Alert>

No additional work is needed in Studio to support this method. If your layered accessory is set to `Class.WrapLayer.AutoSkin.EnabledOverride` and these joints exist with vertices assigned to them, this skinning transfer variation is in effect.

If you wish to upload an accessory using these joints as a UGC item, there are a few rules to be aware of:

- Vertices cannot be partially weighted to these joints. If you want to use them, you must skin the vertex to the joint with a weight of `1.0`.
- If these joints are present in the mesh, then the accessory must be set to `WrapLayerAutoSkin.EnabledOverride`.
- Body part meshes containing these joints will be rejected by validation.
- Eyebrow and Eyelash accessory types are required to have the special skinning joints and be set to `WrapLayerAutoSkin.EnabledOverride`.

### Modify character cages

<Alert severity = 'error'>
You can't upload assets with a partial cage to the Marketplace. You can use partial cages for assets intended for in-game use, but the Marketplace validation process will reject assets with partial cages.
</Alert>

You can modify character body cages for layered accessories to deform accurately to the expected character surfaces using Automatic Skinning Transfer. For example, auto-skinning may cause layered accessories to deform based on an incorrect body part because the transfer process is based on the closest distance between the accessory and its inner cage.

To demonstrate, the following beard accessory was modeled using a blocky-type full body cage. This causes the beard to deform incorrectly because parts of the beard are closer to the character cage's upper chest instead of the chin:

<img src="../assets/avatar/dynamic-heads/creating-face-accessories/Full-Body-Cage.png" width="60%" />

<video controls width="60%" src="../assets/avatar/dynamic-heads/creating-face-accessories/videos/AutoSkin-With-Full-Cage.mp4">
</video>

To prevent a layered accessory from using skinning data from an undesired area of the character's geometry, you can model your asset on a different character mannequin cage. For example, a blocky-type character will struggle with a beard skinning to the torso, but a character with an actual neck, like a humanoid, won't have this problem.

Alternatively, you can remove parts of the outer cage that the layered accessory shouldn't be skinned to. **This is not a valid workflow for assets intended for the Marketplace**, but you can use this for in-game assets. For example, the following image shows how the outer cage was modified so that it only includes the head geometry. With this improvement to the outer cage, when you automatically transfer skinning data, the beard and partial cage now correctly transfer skinning only from the head geometry.

<img src="../assets/avatar/dynamic-heads/creating-face-accessories/Head-Cage-Only.png" width="60%" />

<video controls width="60%" src="../assets/avatar/dynamic-heads/creating-face-accessories/videos/AutoSkin-With-Specific-Cage.mp4">
</video>

It's important to note that you could also solve the previous example's deformation issue by using a different cage altogether. For example, if you use a humanoid cage with more space between the chest and the chin, the beard is closest to the head instead of being near the chest or neck area so that the Automatic Skinning Transfer won't transfer skinning data from those regions.

<img src="../assets/avatar/dynamic-heads/creating-face-accessories/Beard-Humanoid-Cage.jpg" width="60%" />

By modifying different regions of the character's cage, you can ensure that your layered accessories and facial accessories deform in relation to the correct region of the body or head, such as modifying the character model's arms so dresses don't incorrectly attach to them while a character is running, or modifying pants that incorrectly map to feet.

To demonstrate, review how the following jacket's collar incorrectly moves with the head as the layered accessory deforms in the collar region, which is closest to the head portion of the cage. To resolve this, you can remove the head portion of the cage so that the jacket won't incorrectly deform in relation to the head at all. Instead, it will deform in relation to the shoulder region, which is much more appropriate for this article of clothing.

<video controls width="60%" src="../assets/avatar/dynamic-heads/creating-face-accessories/videos/Jacket-Collar-Issue.mp4">
</video>

<img src="../assets/avatar/dynamic-heads/creating-face-accessories/Jacket-Cage-Comparison.jpg" width="60%" />

<Alert severity="info">
During the asset creation process, it's important to verify what skinning solution works best for your design by testing your individual assets on multiple models and animations. You can always skin your assets manually and choose to use the Automatic Skinning Transfer later.
</Alert>

### Different accessory categories

Automatic Skinning Transfer may not work well for certain accessory categories, such as hat and glasses-type accessories. For example, hat or glasses accessories can introduce deformation in areas that should typically be rigid. In general, those accessories should remain rigid, and you shouldn't associate any skinning data with them.

For a summary of suggested `Class.WrapLayer.AutoSkin` parameters for different accessory categories, review the following table:

<table>
<thead>
  <tr>
    <th>Accessory Category</th>
    <th>Suggested Parameter</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Beard</td>
    <td>`EnabledOverride`</td>
  </tr>
  <tr>
    <td>Eyebrow</td>
    <td>`EnabledOverride`</td>
  </tr>
  <tr>
    <td>Eyelash</td>
    <td>`EnabledOverride`</td>
  </tr>
  <tr>
    <td>Hair</td>
    <td>`Disabled`</td>
  </tr>
  <tr>
    <td>Hat</td>
    <td>`Disabled`</td>
  </tr>
  <tr>
    <td>Glasses</td>
    <td>`Disabled`</td>
  </tr>
  <tr>
    <td>Shirt</td>
    <td>`EnabledOverride` or `EnabledPreserve`</td>
  </tr>
  <tr>
    <td>Pants</td>
    <td>`EnabledOverride` or `EnabledPreserve`</td>
  </tr>
  <tr>
    <td>Shoes</td>
    <td>`EnabledOverride` or `EnabledPreserve`</td>
  </tr>
</tbody>
</table>
