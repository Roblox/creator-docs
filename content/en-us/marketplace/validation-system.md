---
title: UGC validation system
description: Explains Roblox's technical mechanism that checks if avatar assets meet platform specifications before you can upload and publish them to the Marketplace.
---

The **UGC validation system** is Roblox's technical mechanism that checks if avatar assets meet platform specifications before you can upload and publish them to the Marketplace. This process ensures that avatar bodies, cosmetics, clothing, and accessories behave consistently across the platform.

The UGC validation system runs each time you:

- Try to upload an avatar asset to the Marketplace through Studio.
- Call `Class.AvatarCreationService` APIs for in-experience avatar asset creation.

During this process, the UGC validation system looks at your asset to see if it meets the requirements in validation categories that are specific to its asset type. For a comprehensive list of these requirements, see [Body specifications](../avatar/character-bodies/specifications.md), [Dynamic head specifications](../avatar/dynamic-heads/specifications.md), [Makeup specifications](../avatar/makeup/specifications.md), [Rigid accessory specifications](../avatar/rigid-accessories/specifications.md), and [Layered accessory specifications](../avatar/layered-accessories/specifications.md).

When an avatar asset passes validation, you can proceed with the Studio upload process by paying the upload fee, submitting the asset for moderation, and selling it on the Marketplace, or the player can proceed to purchase the avatar asset they created within an experience.

<br></br>

<img src="../assets/avatar/validation-system/Validation-Success.png" width="100%" alt="Chart of validation system success workflows." />

<br></br>

When an avatar asset fails validation, you or the player receive [error messages](#validation-checks) with information on why the avatar asset didn't pass validation. For troubleshooting assistance, the UGC validation has [visualization tools](#visualization-checks) with checks that provide asset-specific visual guides on how to fix or improve your asset so that it can pass validation.

<img src="../assets/avatar/validation-system/Blocky-Validation.png" width="100%" alt="" />

<Alert severity = 'info'>
Assets that you don't intend to use for the Marketplace, such as those for in-game use only, do **not** need to pass the validation process. Regardless, the validation process can still be useful for troubleshooting and debugging custom bodies and accessories.
</Alert>

## Validation categories

The UGC validation system organizes validation into several high-level categories. For information on these categories and some areas that they validate, review the following table.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Category</th>
    <th>What it validates</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>**Schema**</td>
    <td><ul><li>The asset's object hierarchy</li><li>If child types, tags, and attributes are configured correctly</li><li>If the asset includes any banned scripts</li></ul></td>
  </tr>
  <tr>
    <td>**Mesh geometry**</td>
    <td><ul><li>Triangle budgets</li><li>Bounding box sizes</li><li>Total surface area limits</li><li>If the asset is centered at origin and not too thin along any particular axis</li><li>If the asset's geometry is watertight and without N-gons, vertex colors, or zero-area triangles</li></ul></td>
  </tr>
  <tr>
    <td>**Texture / materials**</td>
    <td><ul><li>Max resolution</li><li>Valid UV maps</li><li>PBR texture validation for `Class.SurfaceAppearance` objects</li><li>If the asset contains any invalid vertex colors</li></ul></td>
  </tr>
  <tr>
    <td>**Rigging / skinning**</td>
    <td><ul><li>Bodies and layered accessories must include skinning data</li><li>Rigid accessories must not include skinning data</li><li>Skin weight count must match vertex count</li></ul></td>
  </tr>
  <tr>
    <td>**Inner and outer cages**</td>
    <td><ul><li>All body parts must include cages for full-body validation</li><li>Cage mesh must closely match the render mesh</li><li>Render mesh must be inside outer cage</li><li>Cage UVs must match Roblox's provided [cage templates](../avatar/resources.md#project-files)</li></ul></td>
  </tr>
  <tr>
    <td>**Attachments**</td>
    <td><ul><li>All attachments must have correct naming for their attachment point</li><li>Position and orientation checks</li></ul></td>
  </tr>
  <tr>
    <td>**Dynamic head**</td>
    <td><ul><li>At least 17 FACS poses</li><li>Cage landmark projection onto the head mesh</li><li>Facial animation detection: landmarks must move for blink, mouth opening, and happy/sad expressions</li></ul></td>
  </tr>
  <tr>
    <td>**Security / moderation**</td>
    <td><ul><li>Asset creator validation, banned class names, proxy attribute anti-spoofing</li></ul></td>
  </tr>
</tbody>
</table>

## Validation checks

When an avatar asset fails validation, Studio returns error messages that describe what needs to be fixed. The following table lists validation error messages, how to fix them, and why each check is important.

<Table tableStyle={{tableLayout:"fixed", width:"100%", wordBreak:"break-word"}}>
  <thead>
    <tr>
    <th style={{width:"25%"}}>Error message</th>
    <th style={{width:"35%"}}>How to fix</th>
    <th style={{width:"40%"}}>Why is this check important?</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>`Animation has a Weight value that is not greater than 0. Please fix the animation.`</td>
    <td>This error triggers when a `Class.NumberValue` named **Weight** inside the animation hierarchy has a value of zero or below.<br /><br />To fix it, open your animation asset and set the **Weight** value to a positive number (typically `1.0`).</td>
    <td>This check ensures that animation weight values are valid for idle animations uploaded to the Marketplace. Weight controls how strongly an animation influences the character, and a zero or negative value would make the animation effectively invisible or behave incorrectly.</td>
  </tr>
  <tr>
    <td>`All MeshParts must have the same value in their AvatarPartScaleType child. Please verify the values match.`</td>
    <td>This error fires when two or more `Class.MeshPart` instances within the same upload have different **AvatarPartScaleType** values, such as one set to `Classic` and another to `ProportionsNormal`.<br /><br />To fix it, ensure every `Class.MeshPart` in the asset has an identical **AvatarPartScaleType** `Class.StringValue` child.</td>
    <td>This check validates that the overall bounding box of a body part or full body asset falls within allowed size limits for its [body scale type](../avatar/character-bodies/specifications.md#body-scale). Each `Class.MeshPart` in a multi-part asset must declare the same **AvatarPartScaleType** so the system knows which size bounds to enforce.</td>
  </tr>
  <tr>
    <td>`Asset meshes are smaller than the minimum allowed bounding box size on one or more axes. You need to scale up the meshes.`</td>
    <td>This error triggers when the mesh extents on the X, Y, or Z axis are below the minimum threshold defined for the asset's body scale type.<br /><br />To fix it, scale up your meshes in your 3D modeling software so the resulting bounding box meets or exceeds the minimum on every axis.</td>
    <td>This check validates that the overall bounding box of a body part or full body asset falls within allowed size limits for its body scale type. The minimum bounds prevent body parts from being so small they become invisible or break avatar proportions at runtime.</td>
  </tr>
  <tr>
    <td>`Asset meshes and joints are larger than the maximum allowed bounding box size on one or more axes. You need to scale down the meshes/joints.`</td>
    <td>This error triggers when the combined extent of meshes and joint positions on the X, Y, or Z axis exceeds the maximum threshold for the asset's body scale type.<br /><br />To fix it, scale down your meshes and/or reposition joints in your 3D modeling software to fit within the allowed bounding box.</td>
    <td>This check validates that the overall bounding box of a body part or full body asset falls within allowed size limits for its body scale type. The maximum bounds prevent body parts from being oversized, which would clip through other avatars or environments.</td>
  </tr>
  <tr>
    <td>`The AvatarPartScaleType value is invalid. Accepted values are Classic, ProportionsSlender, or ProportionsNormal.`</td>
    <td>This error fires when the **AvatarPartScaleType** `Class.StringValue` inside a `Class.MeshPart` contains a value other than `Classic`, `ProportionsSlender`, or `ProportionsNormal`, such as from a typo or custom string.<br /><br />To fix it, update the `Class.StringValue` to one of the three accepted values.</td>
    <td>This check validates that the overall bounding box of a body part or full body asset falls within allowed size limits, which requires knowing the asset's [body scale type](../avatar/character-bodies/specifications.md#body-scale). The system only recognizes three scale type values that correspond to standard avatar proportions.</td>
  </tr>
  <tr>
    <td>`Part has a non-zero transparency. Part transparency should always be exactly zero.`</td>
    <td>This error triggers when a `Class.MeshPart.Transparency` property is set to any value other than `0`.<br /><br />To fix it, set the `Class.MeshPart.Transparency|Transparency` property of all meshes in your asset to exactly `0`.</td>
    <td>This check ensures that avatar [body parts](../avatar/character-bodies/specifications.md#body-parts) are sufficiently visible from all camera angles by rasterizing the combined mesh from six orthographic views and measuring pixel coverage. Roblox requires body parts to be opaque so they render correctly in all lighting conditions and layered accessory scenarios.</td>
  </tr>
  <tr>
    <td>`Failed to load mesh for a MeshPart. Make sure the mesh exists and try again.`</td>
    <td>This error triggers when the mesh data for a body part cannot be loaded from the provided render meshes, typically because the `Class.MeshPart.MeshId` is missing or points to an invalid asset.<br /><br />To fix it, re-import your mesh in Studio and verify that the `Class.MeshPart.MeshId|MeshId` references a valid, accessible mesh asset.</td>
    <td>This check ensures that avatar body parts are sufficiently visible from all camera angles by rasterizing the combined mesh from six orthographic views and measuring pixel coverage. The system must load each mesh's editable mesh data to perform the rasterization-based opacity measurement.</td>
  </tr>
  <tr>
    <td>`Meshes should not have zero size.`</td>
    <td>This error triggers when the combined mesh geometry has zero extent, meaning that all vertices collapse to a single point or line.<br /><br />To fix it, ensure your mesh has actual 3D volume by spreading vertices across all three axes in your 3D modeling software.</td>
    <td>This check ensures that avatar body parts are sufficiently visible from all camera angles by rasterizing the combined mesh from six orthographic views. After transforming all mesh triangles into world space, the system computes the overall bounding box and checks that it has non-zero volume.</td>
  </tr>
  <tr>
    <td>`Mesh has no triangles.`</td>
    <td>This error fires when the combined mesh data contains zero triangle faces, meaning there is no renderable geometry.<br /><br />To fix it, ensure your mesh has valid polygon data by checking that faces are defined in your 3D file before importing.</td>
    <td>This check ensures that avatar body parts are sufficiently visible from all camera angles by rasterizing the combined mesh from six orthographic views. The rasterizer needs at least one triangle to project onto the view plane and measure coverage.</td>
  </tr>
  <tr>
    <td>`Mesh is completely invisible.`</td>
    <td>This error triggers when a view produces zero opaque pixels, meaning the mesh is entirely invisible from that angle, such as a perfectly flat plane viewed edge-on.<br /><br />To fix it, add geometry that provides visible surface area from all six cardinal directions: front, back, left, right, top, and bottom.</td>
    <td>This check ensures that avatar [body parts](../avatar/character-bodies/specifications.md#body-parts) are sufficiently visible from all camera angles by rasterizing the combined mesh from six orthographic views. After rasterizing, the system counts opaque pixels to determine what fraction of the view contains visible geometry.</td>
  </tr>
  <tr>
    <td>`Asset is not opaque enough from a given view direction. Opacity is below the required threshold.`</td>
    <td>This error triggers when the rasterized pixel coverage from a specific view is below the threshold for that asset type and angle.<br /><br />To fix it, add more geometry or adjust the mesh shape so it fills more of the silhouette from the failing view direction.</td>
    <td>This check ensures that avatar body parts are sufficiently visible from all camera angles by rasterizing the combined mesh from six orthographic views: front, back, left, right, top, and bottom. Each view direction has a minimum opacity threshold that must be met so the body part does not appear mostly transparent or hollow.</td>
  </tr>
  <tr>
    <td>`Could not compute bounds for an attachment. The mesh data may be missing or malformed; please re-import the asset and try again.`</td>
    <td>This error triggers when the bounds computation for a specific attachment fails, typically because the mesh data is corrupt or not yet loaded.<br /><br />To fix it, re-import the body part mesh in Studio to regenerate valid mesh data.</td>
    <td>This check validates that all rig and accessory attachments are positioned within acceptable bounds relative to their parent `Class.MeshPart`. The system needs to compute the mesh's bounding volume to define the valid region where attachments can be placed.</td>
  </tr>
  <tr>
    <td>`Could not compute mesh bounds for the asset before checking attachment positions. The mesh data may be missing or malformed; please re-import the asset and try again.`</td>
    <td>This error triggers when that initial bounds computation fails for the whole asset, usually because one or more meshes lack valid geometry data.<br /><br />To fix it, re-import all meshes in the asset to ensure they have proper vertex data.</td>
    <td>This check validates that all rig and accessory attachments are positioned within acceptable bounds relative to their parent `Class.MeshPart`. Before individual attachments can be checked, the system must calculate per-part mesh bounds and transforms for the entire asset.</td>
  </tr>
  <tr>
    <td>`Rig attachment must be placed near the joint boundary where this body part connects to an adjacent part. Current position is too far from the connection plane.`</td>
    <td>This error triggers when a rig attachment (e.g., `LeftElbowRigAttachment`) is positioned too far from the expected connection surface in mesh-normalized space.<br /><br />To fix it, move the rig attachment closer to the edge where this body part meets its neighbor.</td>
    <td>This check validates that all rig attachments are positioned within acceptable bounds relative to their parent `Class.MeshPart` instance's geometry. Rig attachments define where body parts connect at joints and must sit near the physical boundary between adjacent parts for correct avatar assembly.</td>
  </tr>
  <tr>
    <td>`Accessory attachment must be placed close to the surface of the mesh. Current position is outside the valid region.`</td>
    <td>This error triggers when an accessory attachment (e.g., `HatAttachment`) is positioned outside the valid bounding region defined for that attachment type.<br /><br />To fix it, move the accessory attachment so it sits closer to or on the mesh surface where the accessory should visually attach.</td>
    <td>This check validates that all accessory [attachments](../avatar/rigid-accessories/specifications.md#attachment-points) are positioned within acceptable bounds relative to their parent `Class.MeshPart` instance's geometry. Accessory attachments define where hats and accessories snap onto a body part and should sit near the mesh surface for realistic placement.</td>
  </tr>
  <tr>
    <td>`Attachment is placed at a position outside the valid range. Move it closer to the expected position.`</td>
    <td>This error triggers when any attachment falls outside its valid bounding region, providing the current position, closest valid position, and the bounding box dimensions.<br /><br />To fix it, reposition the attachment within the reported bounding box.</td>
    <td>This check validates that all rig and accessory attachments are positioned within acceptable bounds relative to their parent `Class.MeshPart` instance's geometry. Each attachment has a defined valid region in mesh-normalized space that ensures correct avatar joint assembly and accessory placement.</td>
  </tr>
  <tr>
    <td>`Rig attachments cannot be rotated. Please set the orientation to (0,0,0).`</td>
    <td>This error triggers when a rig attachment has a non-identity rotation in its `Datatype.CFrame`.<br /><br />To fix it, reset the attachment's orientation to (`0`, `0`, `0`) in your 3D modeling software or in Studio before upload.</td>
    <td>This check validates that attachment orientations on avatar body parts conform to the expected rotational constraints. Rig attachments define joint connection points between body parts and must remain unrotated so the avatar assembles correctly at runtime.</td>
  </tr>
  <tr>
    <td>`Attachment orientation deviates too far from the expected orientation. Maximum deviation exceeded.`</td>
    <td>This error triggers when a named attachment's rotation differs from the expected orientation by more than the allowed number of degrees for that specific attachment type.<br /><br />To fix it, adjust the attachment's orientation to be within the allowed deviation from the recommended rotation shown in the error.</td>
    <td>This check validates that attachment orientations on avatar body parts conform to the expected rotational constraints. [Non-rig attachments](../avatar/character-bodies/specifications.md#attachments), such as `LeftGrip_Att`, have a recommended orientation derived from the body part's geometry, and deviations beyond a per-attachment threshold are rejected.</td>
  </tr>
  <tr>
    <td>`Instance or its descendants contain Attributes. You need to remove Attributes from the listed instances.`</td>
    <td>This error triggers when any instance in the uploaded asset (or its associated HSR data) has one or more [custom attributes](../scripting/attributes.md) set, excluding the internal GUID attribute used by the system.<br /><br />To fix it, remove all custom attributes from every instance in your asset hierarchy before uploading.</td>
    <td>This check ensures that Marketplace assets do not contain custom attributes on any instance in their hierarchy. Attributes are runtime key-value pairs that could carry hidden data or scripts, and are not permitted on published avatar assets for safety and consistency reasons.</td>
  </tr>
  <tr>
    <td>`Render mesh has zero size on one or more axes. Increase the size of the mesh.`</td>
    <td>This error triggers when a render mesh's size is effectively zero on the X, Y, or Z axis.<br /><br />To fix it, open your 3D modeling software, verify the mesh has non-zero dimensions on all axes, and re-export the asset.</td>
    <td>This check validates that no [body part](../avatar/character-bodies/specifications.md#body-parts) mesh has zero extent on any axis, which would cause downstream geometry calculations (bounds, rasterization, collision) to fail or produce undefined results. Every mesh must have measurable volume in all three dimensions to function correctly as part of an avatar.</td>
  </tr>
  <tr>
    <td>`Mesh failed to load. Make sure the mesh exists and try again.`</td>
    <td>This error triggers when a mesh (either the render mesh or the cage mesh) cannot be loaded, typically because the `Class.MeshPart.MeshId` or `Class.WrapTarget.CageMeshId` references an invalid or inaccessible asset.<br /><br />To fix it, verify that all mesh references point to valid, uploaded mesh assets and re-import if necessary.</td>
    <td>This check validates that the render mesh and the `Class.WrapTarget` [outer cage mesh](../avatar/character-bodies/specifications.md#outer-cages) for each body part are consistent in size, ensuring layered accessories will deform correctly over the body. The system must load both meshes to compare their extents.</td>
  </tr>
  <tr>
    <td>`Mesh is more than the maximum allowed difference in size compared to the other mesh. You need to edit the model to adjust its size.`</td>
    <td>This error triggers when the bounding box corners of the render mesh versus the outer cage mesh differ by more than the allowed threshold.<br /><br />To fix it, adjust either the render mesh or the cage mesh in your 3D modeling software so their overall extents closely match.</td>
    <td>This check validates that the render mesh and the `Class.WrapTarget` outer cage mesh for each body part are consistent in size. If the cage and render mesh differ too much, layered accessory deformation will produce visual artifacts like stretching or clipping.</td>
  </tr>
  <tr>
    <td>`A vertex on the body part's cage mesh is too far from the closest render mesh. Make the cage mesh more closely match the shape and size of the render mesh.`</td>
    <td>This error triggers when the maximum vertex-to-surface distance between any cage vertex and the closest point on the render mesh exceeds the allowed threshold (measured in studs).<br /><br />To fix it, reshape your cage mesh to more closely conform to the body's render mesh surface.</td>
    <td>This check validates that the outer cage mesh for each body part in a full body upload closely follows the shape of the underlying render mesh. The cage defines how a layered accessory wraps around the body, so large gaps between the cage and mesh cause the accessory to float or deform incorrectly.</td>
  </tr>
  <tr>
    <td>`Body part is skinned to a virtual joint which is not part of the R15plus schema.`</td>
    <td>This error triggers when a body part's mesh has vertex weights assigned to a bone/joint name that does not appear in the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy.<br /><br />To fix it, in your 3D modeling software, remove all skin weights from unauthorized joints and reassign those vertices to the official advanced R15 bone hierarchy.</td>
    <td>This check validates that each body part mesh is only skinned (weighted) to joints that are part of the official advanced R15 rig hierarchy. Skinning to unauthorized joints could cause unpredictable deformations or exploit avatar rendering.</td>
  </tr>
  <tr>
    <td>`Bone is too far outside of the MeshPart. Please put it closer to the MeshPart size boundary.`</td>
    <td>This error triggers when a `Class.Bone` instance's world position (transformed into the `Class.MeshPart` instance's local space) exceeds the mesh's half-extents multiplied by the tolerance factor.<br /><br />To fix it, reposition the bone inside or very near the mesh boundary in your 3D modeling software.</td>
    <td>This check validates that all `Class.Bone` instances within a body part are positioned within the physical bounds of their parent `Class.MeshPart`, with a small tolerance multiplier. Bones represent skeletal joints for rigs; if placed far outside the mesh, they would cause extreme deformation artifacts during animation.</td>
  </tr>
  <tr>
    <td>`Bone has a transform property, but this is not yet enabled for Marketplace uploads. Please reset it to the identity CFrame.`</td>
    <td>This error triggers when a `Class.Bone.Transform` property is anything other than the identity `Datatype.CFrame` (no translation, no rotation).<br /><br />To fix it, in Studio or your export pipeline, reset the `Class.Bone.Transform` to `Datatype.CFrame.Identity` before publishing.</td>
    <td>This check validates that all `Class.Bone` instances within a body part have valid `Datatype.CFrame` properties for Marketplace upload. The `Class.Bone.Transform` property is reserved for runtime animation and must not be pre-set during upload, as it would interfere with the animation system.</td>
  </tr>
  <tr>
    <td>`Bone is too close to its parent. Adjust the position of the bone slightly.`</td>
    <td>This error triggers when a child `Class.Bone` instance's position magnitude relative to its parent `Class.Bone` instance is below the minimum joint distance threshold.<br /><br />To fix it, move the bone slightly further from its parent in your 3D modeling software so they have measurable separation.</td>
    <td>This check validates that all `Class.Bone` instances within a body part are positioned at valid distances from their parent bones. Bones that are nearly coincident with their parent create numerical instability in [inverse kinematics](../animation/inverse-kinematics.md) and [skinning](../avatar/character-bodies/specifications.md#skinning) calculations.</td>
  </tr>
  <tr>
    <td>`Bounding box validation failed due to sparse geometry inflating the asset bounds.`</td>
    <td>This error triggers when the raster-based analysis detects that a significant portion of the bounding box is empty space not backed by visible mesh geometry.<br /><br />To fix it, remove any floating vertices, thin protrusions, or disconnected micro-geometry that extends far from the main body of the mesh.</td>
    <td>This check validates that there are no sparse regions of an asset's bounding box caused by low-visibility geometry that artificially inflate the reported bounds, such as thin spikes or floating vertices. Inflated bounds cause issues with collision detection, thumbnail generation, and layered accessory fitting.</td>
  </tr>
  <tr>
    <td>`Average distance between outer cage to mesh is too high. Mesh seems to be outside of the outer cage.`</td>
    <td>This error triggers when the computed average signed distance between the outer cage and the render mesh is negative, indicating the mesh geometry is predominantly outside the cage volume.<br /><br />To fix it, reshape your outer cage to fully enclose the render mesh, or move the render mesh inward so it sits between the inner and outer cages.</td>
    <td>This check validates that the render mesh of a layered accessory is properly contained within its [outer cage](../avatar/layered-accessories/specifications.md#outer-cage). The outer cage defines the deformation volume for the accessory; if the mesh sits outside the cage, the clothing system cannot properly wrap and deform the item.</td>
  </tr>
  <tr>
    <td>`Average distance between outer cage and mesh is too high. Make adjustments to the cage to fit the mesh better.`</td>
    <td>This error triggers when the average cage-to-mesh distance exceeds the configured threshold percentage.<br /><br />To fix it, bring your outer cage vertices closer to the render mesh surface in your 3D modeling software so the cage more tightly conforms to the accessory shape.</td>
    <td>This check validates that the render mesh of a layered accessory is properly contained within its outer cage and the cage fits snugly. A large positive average distance means the cage is much bigger than the mesh, which would cause the clothing to appear bloated or float away from the character when deformed.</td>
  </tr>
  <tr>
    <td>`Too many modified cage UVs are outside the expected body region for this asset type. Move your asset to the correct area of the body.`</td>
    <td>This error triggers when more than the allowed percentage of modified UVs fall in body regions that should not be modified for this shoe type, such as a left shoe modifying right leg UVs.<br /><br />To fix it, adjust your cage deformations so they only affect the correct side of the body.</td>
    <td>This check validates that the modified area of a shoe accessory's outer cage corresponds to the correct body region based on the asset type (left shoe modifies left leg UVs, right shoe modifies right leg UVs). The system compares which cage UVs have been modified against the UV regions that are excluded for the asset type.</td>
  </tr>
  <tr>
    <td>`The WrapLayer CageMesh (outer mesh) must modify a minimum percentage of cage UVs in the primary body area. Move your asset to the correct area of the body.`</td>
    <td>This error triggers when fewer than the required percentage of UVs in the primary area have been modified, meaning the shoe isn't actually deforming the foot area enough.<br /><br />To fix it, ensure your outer cage mesh has visible vertex displacement in the primary foot/shoe region.</td>
    <td>This check validates that a shoe accessory's outer cage has sufficient modification in its primary body region (e.g., `LeftFoot` for a left shoe). The system measures what percentage of the main area's reference UVs have been displaced in the outer cage.</td>
  </tr>
  <tr>
    <td>`Failed to execute testing render mesh inside bounding box of outer cage modified area. Make sure both cage meshes and render mesh exist and try again.`</td>
    <td>This error triggers when the system cannot retrieve the render mesh vertex data needed for the bounds test, typically because the mesh data is missing or failed to load.<br /><br />To fix it, verify that the **Handle** mesh has a valid mesh asset assigned.</td>
    <td>This check validates that a shoe accessory's render mesh is physically located within the modified region of its outer cage. The system must compute the bounding box of the modified cage area and then test how many render mesh vertices fall within it.</td>
  </tr>
  <tr>
    <td>`Too few render mesh vertices are within the modified area of the WrapLayer CageMesh (outer mesh). Move the render mesh to be within the modified area.`</td>
    <td>This error triggers when fewer than the required percentage of render mesh vertices fall inside the bounding box of the outer cage's modified UV region.<br /><br />To fix it, reposition your render mesh geometry so it overlaps with where you've modified the outer cage.</td>
    <td>This check validates that a shoe accessory's render mesh is physically located within the modified region of its outer cage. If the mesh sits outside the area where the cage has been deformed, the clothing system cannot properly wrap the item onto the avatar.</td>
  </tr>
  <tr>
    <td>`Detected zero-area triangle in UV map of the body part. You need to edit the UV map to fix this issue.`</td>
    <td>This error triggers when the engine's UV triangle area validation detects one or more triangles with zero area in the cage mesh's UV space.<br /><br />To fix it, open your cage mesh in a UV editor, identify collapsed triangles, and spread their vertices apart to give each triangle non-zero area.</td>
    <td>This check validates that the [outer cage mesh](../avatar/character-bodies/specifications.md#outer-cages) UV map does not contain degenerate (zero-area) triangles. Zero-area UV triangles indicate collapsed or overlapping vertices in the UV layout, which would cause texture mapping artifacts and break the layered accessory deformation system.</td>
  </tr>
  <tr>
    <td>`Outer cage should have the required number of unique UVs, but has a different count. Please make sure the mesh has the required number of unique UVs and try again.`</td>
    <td>This error triggers when the unique UV count in the cage mesh differs from the required count by more than a small tolerance value.<br /><br />To fix it, re-export your cage mesh from the [official body cage template](../avatar/resources.md#project-files) without adding, removing, or merging UV vertices.</td>
    <td>This check validates that the `Class.WrapTarget` outer cage mesh has exactly the expected number of unique UV coordinates for the body part it represents. Each [body part](../avatar/character-bodies/specifications.md#body-parts) has a precise cage topology with a fixed UV count, and deviations indicate the cage was incorrectly modified or replaced.</td>
  </tr>
  <tr>
    <td>`There are UV values in the cage that do not belong to the template. Please correct the cage UV.`</td>
    <td>This error triggers when the number of UV values not found in the [official body cage template](../avatar/resources.md#project-files) exceeds the allowed threshold for either the inner or outer cage.<br /><br />To fix it, re-derive your cage from the [official body cage template](../avatar/resources.md#project-files) without introducing extra UV points or duplicating existing ones.</td>
    <td>This check validates that the inner and outer cage meshes of a layered accessory do not contain excessive duplicate UV coordinates that deviate from the [official body cage template](../avatar/resources.md#project-files). Extra duplicates indicate manual UV edits that corrupt the cage's ability to properly map clothing deformation.</td>
  </tr>
  <tr>
    <td>`Found invalid UV value outside [0, 1] range for the body part. You need to edit the UV map to fix this issue.`</td>
    <td>This error triggers when any UV coordinate in the cage mesh does not match the expected reference values from the [official body cage template](../avatar/resources.md#project-files).<br /><br />To fix it, re-export your cage from the [official body cage template](../avatar/resources.md#project-files) or manually correct the UV coordinates so they match the standard layout.</td>
    <td>This check validates that all UV values in the `Class.WrapTarget` outer cage mesh match the official reference template values for that body part. The cage UV layout must exactly follow the [official body cage template](../avatar/resources.md#project-files) so that layered accessories can correctly interpolate deformations.</td>
  </tr>
  <tr>
    <td>`MeshPart has incorrect CollisionFidelity. Expected it to be the required fidelity value.`</td>
    <td>This error triggers when any `Class.MeshPart.CollisionFidelity` is set to a value other than the expected one (typically Default).<br /><br />To fix it, in Studio, set each `Class.MeshPart.CollisionFidelity` property to the expected value shown in the error message.</td>
    <td>This check validates that all `Class.MeshPart` instances in a body part upload have the correct `Class.MeshPart.CollisionFidelity|CollisionFidelity` property value. `Class.MeshPart.CollisionFidelity|CollisionFidelity` determines how collision geometry is computed for the part, and Marketplace body parts must use the server-configured default to ensure consistent physics behavior across all avatars.</td>
  </tr>
  <tr>
    <td>`CurveAnimation hierarchy can only contain MarkerCurve, AnimationRigData, Folder, Vector3Curve, EulerRotationCurve, FloatCurve, and ObjectValue. Please remove any other Instance types.`</td>
    <td>This error triggers when any descendant instance has a class not in the error message, such as a `Class.Part`, `Class.MeshPart`, or other unsupported type.<br /><br />To fix this, remove all instances from your animation hierarchy that are not one of the allowed types listed in the error message.</td>
    <td>This check validates that all instances within a `Class.CurveAnimation` are of recognized types that the animation system supports. It iterates through every descendant of the `Class.CurveAnimation` and verifies each one belongs to the list of acceptable classes in the error message.</td>
  </tr>
  <tr>
    <td>`CurveAnimation contains body part Folder which has an invalid hierarchy: unexpected child or structure issue found.`</td>
    <td>This error triggers when an unexpected child is found in a `Class.Folder`, when curve children are incorrectly structured, when `Class.FaceControls` exceed the maximum allowed count, or when grandchildren appear where they should not.<br /><br />To fix this, ensure your animation's `Class.Folder` structure matches the expected [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy with only valid sub-folders and curves at each level.</td>
    <td>This check validates that the bone `Class.Folder` hierarchy within a `Class.CurveAnimation` follows the correct advanced R15 rig hierarchy. It walks the entire tree of body part `Class.Folder` and bone `Class.Folder` instances, verifying that each `Class.Folder` only contains children that are expected for its position in the hierarchy (correct bone names, **Position**/**Rotation** curves, `Class.FaceControls` instances, and child body parts).</td>
  </tr>
  <tr>
    <td>`CurveAnimation contains HRD/DRD bone folders which are not yet supported. Please remove all bone sub-folders before uploading.`</td>
    <td>This error triggers when bone `Class.Folder` instances are detected in the animation, or when the upload is attempted from an [in-game creation](../avatar/in-experience-creation.md) context where bones are not supported.<br /><br />To fix this, remove all bone sub- folders from your animation before uploading.</td>
    <td>This check validates whether the uploading creator has permission to use bone animation features (`Class.HumanoidRigDescription`/`Class.DigitsRigDescription` bones) in their `Class.CurveAnimation`. Bone animations are a gated feature requiring trusted creator status.</td>
  </tr>
  <tr>
    <td>`Folder in CurveAnimation is not a recognized HRD/DRD bone name. Animation sub-folders must be either valid R15 body parts or recognized bone names.`</td>
    <td>This error triggers when a `Class.Folder` has animation data but its name does not correspond to any valid [body part](../avatar/character-bodies/specifications.md#body-parts) or [bone](../avatar/character-bodies/specifications.md#rigging) in the rigging armature (such as `HeadBase`, `Spine`, or `Chest`).<br /><br />To fix this, rename or remove any animation `Class.Folder` that doesn't use the specified official body part or bone names.</td>
    <td>This check validates that all folders containing animation tracks within a `Class.CurveAnimation` use recognized bone or body part names from the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy. It scans every `Class.Folder` descendant that has animation tracks (**Position**/**Rotation** curves) and verifies the `Class.Folder` name matches either a known body part name or a known `Class.HumanoidRigDescription`/`Class.DigitsRigDescription` bone name.</td>
  </tr>
  <tr>
    <td>`Bone folder requires its parent bone to also be present in the animation.`</td>
    <td>This error triggers when a child bone `Class.Folder` is present in the animation but its required parent bone in the skeleton hierarchy is missing.<br /><br />To fix this, add the missing parent bone `Class.Folder` to your animation, or remove the child bone that requires it.</td>
    <td>This check validates that the bone hierarchy in a `Class.CurveAnimation` respects parent-child relationships defined in the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy. When a bone is animated, its parent bone in the skeleton chain must also be present in the animation to maintain a valid kinematic chain.</td>
  </tr>
  <tr>
    <td>`Bone in CurveAnimation has a Position (translation) track. HRD/DRD bones may only be rotated; position tracks cause joint separation and are not allowed. Please remove the position animation from this bone.`</td>
    <td>This error triggers when a bone `Class.Folder` contains a **Position** (`Class.Vector3Curve`) track with keyframes, indicating the bone is being moved rather than just rotated.<br /><br />To fix this, remove the **Position** track from the affected bone `Class.Folder` and animate it using only rotation (`Class.EulerRotationCurve`).</td>
    <td>This check validates that bone folders within a `Class.CurveAnimation` only contain rotation data, not positional translation data. `Class.HumanoidRigDescription`/`Class.DigitsRigDescription` bones in the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy are designed to rotate around their joints; translating them would cause visible joint separation and broken limb connections.</td>
  </tr>
  <tr>
    <td>`Bone in CurveAnimation moves too far from its start position. Maximum allowed translation is limited. Please reduce the bone's positional movement.`</td>
    <td>This error triggers when a bone's **Position** track moves it further than the configured maximum distance threshold (measured in studs from the starting position).<br /><br />To fix this, reduce the magnitude of positional keyframes on the affected bone so its total translation stays within the allowed limit, or remove the **Position** track entirely and use only rotation.</td>
    <td>This check validates that bone folders within a `Class.CurveAnimation` do not translate beyond a maximum allowed distance from their rest position. While small positional adjustments may be tolerated, large translations on bones would cause visible joint separation and break avatar proportions.</td>
  </tr>
  <tr>
    <td>`In CurveAnimation, a body part is below the minimum allowed height from the HumanoidRootPart. Please fix the animation.`</td>
    <td>This error triggers when any body part drops below the minimum allowed height threshold (measured in studs from the `HumanoidRootPart`), which could indicate the character clipping through the floor or performing an impossible pose.<br /><br />To fix this, adjust the animation keyframes so that no body part goes below the minimum height at any point during playback.</td>
    <td>This check validates that all [body parts](../avatar/character-bodies/specifications.md#body-parts) in a `Class.CurveAnimation` stay within acceptable spatial bounds relative to the `HumanoidRootPart` throughout the entire animation. It samples every frame at the configured FPS rate and checks each body part's vertical position.</td>
  </tr>
  <tr>
    <td>`In CurveAnimation, a body part is too far from the HumanoidRootPart. Please fix the animation.`</td>
    <td>This error triggers when any body part exceeds the maximum allowed distance threshold (measured as magnitude in studs from the `HumanoidRootPart`), which could indicate limbs stretching unrealistically far from the body.<br /><br />To fix this, adjust the animation keyframes so that no body part moves further than the maximum allowed distance from the `HumanoidRootPart` at any point during playback.</td>
    <td>This check validates that all body parts in a `Class.CurveAnimation` stay within acceptable spatial bounds relative to the `HumanoidRootPart` throughout the entire animation. It samples every frame and checks each body part's total distance from the root.</td>
  </tr>
  <tr>
    <td>`Body parts in a CurveAnimation cannot be lower than the minimum height or more than the maximum distance from the HumanoidRootPart. Please fix the animation.`</td>
    <td>This error triggers as a general bounds violation when either the lowest body part drops below the minimum height threshold or any body part exceeds the maximum distance from root.<br /><br />To fix this, review your animation to ensure all body parts remain within the allowed spatial envelope around the `HumanoidRootPart` throughout the entire animation duration.</td>
    <td>This check validates that all body parts in a `Class.CurveAnimation` stay within acceptable spatial bounds relative to the `HumanoidRootPart`. It examines every frame across the entire animation to find the minimum height and maximum distance of any body part.</td>
  </tr>
  <tr>
    <td>`Failed to load CurveAnimation data. The animation asset may be invalid or inaccessible.`</td>
    <td>This error triggers when the system fails to fetch or parse the `Class.CurveAnimation` instances or their computed frame data, which can happen if the animation asset is corrupted, improperly formatted, or otherwise inaccessible to the validation system.<br /><br />To fix this, re-export your animation from the Animation Editor and ensure the file is a valid `Class.CurveAnimation` asset.</td>
    <td>This check validates that the `Class.CurveAnimation` data and its computed frame data can be successfully loaded before any other animation checks run. It serves as a prerequisite gate for all subsequent curve animation validations.</td>
  </tr>
  <tr>
    <td>`Referenced Animation is not a CurveAnimation. Please ensure the animation is uploaded correctly.`</td>
    <td>This error triggers when the animation data loads successfully but contains zero `Class.CurveAnimation` instances, meaning the asset is either empty or uses an older animation format that is not supported.<br /><br />To fix this, ensure you are exporting your animation as a `Class.CurveAnimation` from the Animation Editor rather than using legacy `Class.KeyframeSequence` format.</td>
    <td>This check validates that the submitted asset actually contains `Class.CurveAnimation` data, which is the required format for [emote](../avatar/emotes/specifications.md) and animation uploads. It verifies that at least one `Class.CurveAnimation` instance exists in the loaded data.</td>
  </tr>
  <tr>
    <td>`CurveAnimation contains Curves with invalid numerical data. Please fix the animation.`</td>
    <td>This error triggers when any value in the computed animation frames is NaN (Not a Number) or infinite, which would cause unpredictable rendering behavior in-game.<br /><br />To fix this, re-export your animation from the Animation Editor and ensure there are no degenerate keyframes that could produce undefined mathematical results, such as division by zero in interpolation.</td>
    <td>This check validates that all computed frame data in a `Class.CurveAnimation` contains mathematically valid numbers. It examines every `Datatype.CFrame` component and position magnitude across all sampled frames to detect corrupted numerical values.</td>
  </tr>
  <tr>
    <td>`CurveAnimation has too many descendants. Please reduce the number of descendants.`</td>
    <td>This error triggers when the total descendant count exceeds the configured maximum allowed limit, which can happen with extremely complex animations that have too many curves, folders, or other elements.<br /><br />To fix this, simplify your animation by reducing the number of animated tracks, removing unnecessary marker curves, or consolidating animation data.</td>
    <td>This check validates that the overall structure of a `Class.CurveAnimation` does not exceed complexity limits. It counts the total number of descendant instances within the `Class.CurveAnimation` to ensure performance and memory constraints are respected.</td>
  </tr>
  <tr>
    <td>`CurveAnimation contains more than one body part or HumanoidRootPart Folder children. Please ensure there is only one child Folder named after a body part or HumanoidRootPart.`</td>
    <td>This error triggers when more than one such folder is found as a direct child of the `Class.CurveAnimation`, creating an ambiguous hierarchy that the animation system cannot resolve.<br /><br />To fix this, restructure your animation so it has only one root body part `Class.Folder` (typically `HumanoidRootPart`) with all other body parts nested beneath it.</td>
    <td>This check validates the top-level structure of a `Class.CurveAnimation` to ensure it has a single, unambiguous root for the body part hierarchy. A valid animation must have exactly one child `Class.Folder` whose name matches a recognized body part or `HumanoidRootPart`.</td>
  </tr>
  <tr>
    <td>`CurveAnimation contains zero body part or HumanoidRootPart Folder children. Please ensure there is one child Folder named after a body part or HumanoidRootPart.`</td>
    <td>This error triggers when no such `Class.Folder` exists as a direct child of the `Class.CurveAnimation`, meaning the animation has no recognizable body structure to animate.<br /><br />To fix this, ensure your animation contains a root `Class.Folder` named `HumanoidRootPart` (or another valid body part name) that serves as the starting point of the animation hierarchy.</td>
    <td>This check validates the top-level structure of a `Class.CurveAnimation` to ensure it contains the required body part hierarchy root. Every valid animation must have exactly one child `Class.Folder` whose name matches a recognized body part or `HumanoidRootPart`.</td>
  </tr>
  <tr>
    <td>`CurveAnimation child MarkerCurves and AnimationRigData cannot have children.`</td>
    <td>This error triggers when a `Class.MarkerCurve` or `Class.AnimationRigData` that is a direct child of the `Class.CurveAnimation` has one or more children nested beneath it.<br /><br />To fix this, remove any instances nested inside your `Class.MarkerCurve` or `Class.AnimationRigData` instances so they remain childless.</td>
    <td>This check validates the top-level structure of a `Class.CurveAnimation` to ensure `Class.MarkerCurve` or `Class.AnimationRigData` instances are leaf nodes with no children. These instance types serve specific purposes (event markers and rig metadata) and are not designed to contain sub-objects.</td>
  </tr>
  <tr>
    <td>`CurveAnimation contains an unexpected child instance.`</td>
    <td>This error triggers when a direct child of the `Class.CurveAnimation` is neither a recognized body part `Class.Folder` nor an expected utility instance like `Class.MarkerCurve` or `Class.AnimationRigData`.<br /><br />To fix this, remove any unexpected instances from the top level of your `Class.CurveAnimation`, keeping only valid body part folders, `Class.MarkerCurve` instances, and `Class.AnimationRigData` instances.</td>
    <td>This check validates the top-level structure of a `Class.CurveAnimation` to ensure only expected instance types exist as direct children. Valid direct children are body part folders, `Class.MarkerCurve` instances, and `Class.AnimationRigData` instances.</td>
  </tr>
  <tr>
    <td>`CurveAnimation contains a body part Folder which has an invalid hierarchy with children that are not allowed or set up incorrectly.`</td>
    <td>This error triggers when a body part `Class.Folder`'s internal structure does not match the expected hierarchy, such as containing invalid child folders, missing required curves, or having incorrectly named sub-elements.<br /><br />To fix this, restructure the body part `Class.Folder` to contain only the expected children for that body part according to the [specified body part](../avatar/character-bodies/specifications.md#body-parts) hierarchy.</td>
    <td>This check validates that each body part `Class.Folder` within a `Class.CurveAnimation` follows the expected body part hierarchy. Body part folders must contain only recognized child body parts, **Position**/**Rotation** curves, and `Class.FaceControls` instances in the correct arrangement.</td>
  </tr>
  <tr>
    <td>`In CurveAnimation, a joint has a rotation angle exceeding the maximum allowed degrees from rest pose. Please fix the animation.`</td>
    <td>This error triggers when any joint's rotation at any frame exceeds the maximum allowed degrees configured for that specific body part, which prevents unnatural or impossible poses.<br /><br />To fix this, reduce the rotation of the offending joint at the reported timestamp so it stays within the allowed range for that body part.</td>
    <td>This check validates that individual joint rotations in a `Class.CurveAnimation` do not exceed per-body-part rotation limits from the rest pose. It samples the rotation at every frame for each animated body part and computes the angle between the animated pose and the rest pose.</td>
  </tr>
  <tr>
    <td>`CurveAnimation does not contain any joint manipulation.`</td>
    <td>This error triggers when no tracks in the computed animation data contain either position or rotation information, meaning the animation would produce no visible movement when played.<br /><br />To fix this, ensure your animation has at least one body part with keyframed position or rotation data that produces visible motion.</td>
    <td>This check validates that a `Class.CurveAnimation` actually animates something by examining the computed frame data for any position or rotation tracks. An [emote](../avatar/emotes/specifications.md) animation must manipulate at least one joint to be considered valid content.</td>
  </tr>
  <tr>
    <td>`CurveAnimation does not contain any joint manipulation.`</td>
    <td>This error triggers when no body part `Class.Folder` in the animation hierarchy contains the expected curve pair, indicating the animation structure is incomplete or incorrectly organized.<br /><br />To fix this, ensure at least one body part `Class.Folder` in your animation contains properly named **Position** (`Class.Vector3Curve`) and **Rotation** (`Class.EulerRotationCurve`) children.</td>
    <td>This check validates that a `Class.CurveAnimation` contains recognizable joint manipulation by inspecting the body part `Class.Folder` structure for valid Position and Rotation curve tracks. It looks for at least one body part `Class.Folder` that contains both a `Class.Vector3Curve` instance named **Position** and a `Class.EulerRotationCurve` instance named **Rotation**.</td>
  </tr>
  <tr>
    <td>`CurveAnimation must be between the minimum and maximum seconds long. Please fix the animation.`</td>
    <td>This error triggers when the computed animation length is at or below the minimum length threshold, or exceeds the maximum length threshold.<br /><br />To fix this, adjust the duration of your animation by adding or removing keyframes so the total length falls within the allowed range.</td>
    <td>This check validates that a `Class.CurveAnimation` instance's total duration falls within the allowed time range for Marketplace uploads. Animations that are too short may not provide meaningful content, while animations that are too long consume excessive resources.</td>
  </tr>
  <tr>
    <td>`CurveAnimation does not have Loop enabled. Animations uploaded to the Marketplace must loop. Please enable the Loop property.`</td>
    <td>This error triggers when a `Class.CurveAnimation.Loop` property is set to `false`, meaning it would play once and stop rather than repeating. Jump animations are exempt from this requirement.<br /><br />To fix this, enable `Class.CurveAnimation.Loop` in the Animation Editor before exporting.</td>
    <td>This check validates that `Class.CurveAnimation` objects uploaded as Marketplace animations have their `Class.CurveAnimation.Loop|Loop` property enabled. Marketplace animations are expected to loop seamlessly so they can play continuously during gameplay.</td>
  </tr>
  <tr>
    <td>`CurveAnimation contains more than the maximum allowed number of MarkerCurves. Please reduce the number of MarkerCurve descendants.`</td>
    <td>This error triggers when the total count of `Class.MarkerCurve` descendants across the entire `Class.CurveAnimation` exceeds the configured maximum limit.<br /><br />To fix this, reduce the number of `Class.MarkerCurve` instances in your animation by consolidating events into fewer curves or removing unnecessary marker tracks.</td>
    <td>This check validates that a `Class.CurveAnimation` does not contain an excessive number of `Class.MarkerCurve` instances, which are used to embed event markers or audio triggers within animations. Too many marker curves increase asset complexity and processing overhead.</td>
  </tr>
  <tr>
    <td>`CurveAnimation hierarchy contains Scripts, LocalScripts, or ModuleScripts. Please remove them.`</td>
    <td>This error triggers when any `Class.Script`, `Class.LocalScript`, or `Class.ModuleScript` instance is found anywhere in the `Class.CurveAnimation` descendant tree.<br /><br />To fix this, remove all script instances from your animation hierarchy before uploading; animations should contain only animation data (curves, folders, markers, and rig data).</td>
    <td>This check validates that a `Class.CurveAnimation` does not contain any executable code embedded within its hierarchy. Scripts inside animation assets represent a security risk as they could execute arbitrary code when the animation is loaded.</td>
  </tr>
  <tr>
    <td>`CurveAnimation contains a MarkerCurve with too many Markers. Please fix the animation.`</td>
    <td>This error triggers when a single `Class.MarkerCurve` contains more markers than the calculated maximum, which would indicate either an impossibly complex marker track or corrupted data.<br /><br />To fix this, reduce the number of markers in the affected `Class.MarkerCurve` by removing unnecessary event triggers or consolidating closely- spaced markers.</td>
    <td>This check validates that the raw keyframe and marker data within a `Class.CurveAnimation` stays within reasonable complexity limits. It examines each `Class.MarkerCurve` instance's marker count against a maximum derived from the animation's allowed FPS and duration.</td>
  </tr>
  <tr>
    <td>`CurveAnimation contains MarkerCurves with invalid Time or Value, or Value is too long. Please fix the animation.`</td>
    <td>This error triggers when any marker has a missing or non-numeric `Time` value (NaN or infinite), a missing `Value`, or a `Value` string that exceeds the configured maximum character length.<br /><br />To fix this, inspect your `Class.MarkerCurve` instances and ensure all markers have valid timestamps and reasonably-sized value strings.</td>
    <td>This check validates that all markers within `Class.MarkerCurve` instances in a `Class.CurveAnimation` have valid, well-formed data. Each marker must have a valid numeric `Time` property and a `Value` string that does not exceed the maximum allowed length.</td>
  </tr>
  <tr>
    <td>`CurveAnimation contains Curves with too many keys. Please fix the animation.`</td>
    <td>This error triggers when any single `Class.FloatCurve` has more keys than the calculated maximum, indicating either an overly dense animation or data corruption.<br /><br />To fix this, reduce the keyframe density on the affected curves by removing redundant keys, using fewer samples, or simplifying the animation data.</td>
    <td>This check validates that individual `Class.FloatCurve` instances within a `Class.CurveAnimation` do not have an excessive number of keyframes. The maximum key count is calculated from the animation's allowed FPS rate and maximum duration.</td>
  </tr>
  <tr>
    <td>`CurveAnimation contains Curves with invalid Time or Value. Please fix the animation.`</td>
    <td>This error triggers when any key in a `Class.FloatCurve` has a missing, NaN (Not a Number), or infinite `Time` or `Value` property, which would cause undefined interpolation behavior during playback.<br /><br />To fix this, re-export your animation from the Animation Editor and ensure all keyframes have valid numeric values, or manually remove any corrupted keys.</td>
    <td>This check validates that all keyframes within `Class.FloatCurve` instances in a `Class.CurveAnimation` have mathematically valid data. Each key must have a properly defined numeric `Time` and `Value` that are not NaN or infinite.</td>
  </tr>
  <tr>
    <td>`CurveAnimation contains a Curve with keys that are too close together in time for the maximum allowed FPS. Please fix the animation.`</td>
    <td>This error triggers when two consecutive keys in a `Class.FloatCurve` have timestamps closer together than the minimum allowed interval (derived from the maximum FPS with a tolerance factor).<br /><br />To fix this, increase the time spacing between closely- placed keyframes, or re-export your animation at a frame rate that does not exceed the platform maximum.</td>
    <td>This check validates that keyframes within `Class.FloatCurve` instance in a `Class.CurveAnimation` are spaced far enough apart in time to be physically meaningful at the maximum allowed frame rate. Keys that are too close together imply a frame rate exceeding what the system supports.</td>
  </tr>
  <tr>
    <td>`CurveAnimation contains a Curve with a key that has a negative time. Please fix the animation.`</td>
    <td>This error triggers when the first key in a `Class.FloatCurve` has a `Time` value less than zero.<br /><br />To fix this, re-export your animation and ensure it starts at time zero, or manually adjust any keyframes with negative timestamps to begin at zero or later.</td>
    <td>This check validates that all keyframes within `Class.FloatCurve` instances in a `Class.CurveAnimation` have non-negative timestamps. Animation time should always start at zero or a positive value; negative timestamps indicate corrupted or improperly exported data.</td>
  </tr>
  <tr>
    <td>`CurveAnimation contains HRD/DRD bones and a body part has a Position (translation) track. When bones are present, no body parts may translate to prevent joint separation. Please remove all Position tracks from body parts.`</td>
    <td>This error triggers when any body part `Class.Folder` in a bone- containing animation has a **Position** track with keyframes, which would move the body part independently of the bone chain and cause visible disconnection at joints.<br /><br />To fix this, remove all **Position** tracks from body part folders in your animation and rely on the bone rotation hierarchy for movement.</td>
    <td>This check validates that when a `Class.CurveAnimation` contains bone folders, no body part folders have positional translation tracks. When bones are used for detailed skeleton animation, body parts must remain at fixed positions to prevent joints from separating.</td>
  </tr>
  <tr>
    <td>`Body part in CurveAnimation has a Position (translation) track. Animation body parts may only be rotated; position tracks are not allowed. Please remove the Position track from this body part.`</td>
    <td>This error triggers when a body part `Class.Folder` has a **Position** track with keyframes in an Animation-category upload that does not use bones, indicating the body part is being translated rather than just rotated.<br /><br />To fix this, remove the **Position** track from the affected body part folder and animate it using only rotation.</td>
    <td>This check validates that body part folders in an Animation- category `Class.CurveAnimation` do not contain positional translation tracks. For animation pack uploads, body parts should only be rotated to maintain consistent joint connectivity.</td>
  </tr>
  <tr>
    <td>`Body part in CurveAnimation moves too far from its start position. Maximum allowed translation is limited. Please reduce the body part's positional movement.`</td>
    <td>This error triggers when a body part's **Position** track moves it further than the configured maximum distance threshold (measured in studs).<br /><br />To fix this, reduce the magnitude of positional keyframes on the affected body part so its total translation stays within the allowed distance, or remove the **Position** track entirely.</td>
    <td>This check validates that body part folders in a `Class.CurveAnimation` do not translate beyond a maximum allowed distance from their rest position. While small positional adjustments on body parts may be tolerated, large translations cause joint separation.</td>
  </tr>
  <tr>
    <td>`CurveAnimation contains positional separation of body parts. Only LowerTorso can change position. All other body parts can only change their orientation. A body part moves more than the allowed distance from its parent. Please fix the animation.`</td>
    <td>This error triggers when any body part other than `LowerTorso` has a computed position magnitude that exceeds the per-part maximum movement threshold.<br /><br />To fix this, reduce the positional separation of the offending body part by relying on rotation rather than translation for movement.</td>
    <td>This check validates that body parts in a `Class.CurveAnimation` do not separate from their parent joints by more than the allowed distance. In the animation system for avatars with [standard R15 rigs](../avatar/character-bodies/specifications.md#standard-r15-rigs), only the `LowerTorso` is permitted to change position freely; all other body parts should move primarily through rotation relative to their parent.</td>
  </tr>
  <tr>
    <td>`CurveAnimation contains more than one AnimationRigData children. Please ensure there is only one AnimationRigData child.`</td>
    <td>This error triggers when more than one `Class.AnimationRigData` instance is found as a direct child of the `Class.CurveAnimation`, creating ambiguity about which rig definition should be used.<br /><br />To fix this, remove the extra `Class.AnimationRigData` instances so only one remains as a child of the `Class.CurveAnimation`.</td>
    <td>This check validates that a `Class.CurveAnimation` contains exactly one `Class.AnimationRigData` instance, which stores the rig metadata needed for proper playback. `Class.AnimationRigData` defines how the animation maps to the avatar's skeleton.</td>
  </tr>
  <tr>
    <td>`CurveAnimation contains zero AnimationRigData children. Please ensure there is one AnimationRigData child.`</td>
    <td>This error triggers when no `Class.AnimationRigData` instance is found as a direct child of the `Class.CurveAnimation`.<br /><br />To fix this, ensure your animation is exported from the Animation Editor with rig data included; re-exporting from a properly configured rig should automatically generate the `Class.AnimationRigData` instance.</td>
    <td>This check validates that a `Class.CurveAnimation` contains exactly one `Class.AnimationRigData` instance, which is required metadata for the animation system to correctly map tracks to the avatar's skeleton. Without rig data, the animation cannot be properly applied to an avatar.</td>
  </tr>
  <tr>
    <td>`AnimationRigData failed internal R15 validation. Please ensure the AnimationRigData is set up correctly.`</td>
    <td>This error triggers when the `Class.AnimationRigData` instance fails the engine's `IsValidR15()` check, indicating the rig metadata is malformed, incomplete, or does not match the expected [standard R15 rig](../avatar/character-bodies/specifications.md#standard-r15-rigs) hierarchy.<br /><br />To fix this, re-export your animation from a properly configured **standard R15 rig** in the Animation Editor to regenerate valid rig data.</td>
    <td>This check validates that the `Class.AnimationRigData` within a `Class.CurveAnimation` passes the engine's internal standard R15 rig validation. The rig data must correctly describe a valid standard avatar skeleton for the animation to play back properly.</td>
  </tr>
  <tr>
    <td>`AnimationRigData failed R15+ internal validation. Please ensure the AnimationRigData is set up correctly for bone animations.`</td>
    <td>This error triggers when the `Class.AnimationRigData` instance fails the engine's `IsValidR15Plus()` check in an animation that contains bone folders, indicating the rig metadata does not properly describe the extended [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy.<br /><br />To fix this, re-export your animation from a properly configured **advanced R15 rig** that includes the `Class.HumanoidRigDescription`/`Class.DigitsRigDescription` bone definitions.</td>
    <td>This check validates that the `Class.AnimationRigData` within a bone-containing `Class.CurveAnimation` passes the engine's internal advanced R15 rig validation. Bone animations require rig data that includes the extended skeleton definition beyond the standard R15 rig.</td>
  </tr>
  <tr>
    <td>`In CurveAnimation, a body part is rotating too fast. The rotation speed exceeds the maximum allowed degrees per second. Please fix the animation.`</td>
    <td>This error triggers when the rotation delta between two consecutive frames for any body part exceeds the per-frame rotation limit derived from the maximum allowed degrees-per-second speed.<br /><br />To fix this, smooth out the rotation curves for the offending body part to reduce the angular velocity at the reported timestamp.</td>
    <td>This check validates that the angular rotation speed of [body parts](../avatar/character-bodies/specifications.md#body-parts) in a `Class.CurveAnimation` does not exceed a maximum degrees-per- second threshold. Excessively fast rotations appear unnatural and can cause visual glitches or exploitable spinning behavior.</td>
  </tr>
  <tr>
    <td>`In CurveAnimation, a body part is moving at a speed exceeding the maximum allowed studs per second. Please fix the animation.`</td>
    <td>This error triggers when the positional change between two consecutive frames for any body part exceeds the per-frame movement limit, which is calculated from the maximum allowed speed at the animation's sampling rate.<br /><br />To fix this, reduce the movement speed of the offending body part at the reported timestamp by adjusting keyframes to create smoother, slower transitions.</td>
    <td>This check validates that the linear movement speed of body parts in a `Class.CurveAnimation` does not exceed a maximum studs- per-second threshold. Excessively fast movement can appear unnatural, break physics interactions, or enable exploitative gameplay.</td>
  </tr>
  <tr>
    <td>`Body part in CurveAnimation moves more than the maximum allowed studs between frames. Please fix the animation.`</td>
    <td>This error triggers when the positional difference between consecutive frames for any body part exceeds the maximum allowed movement distance per frame.<br /><br />To fix this, reduce the movement distance of the offending body part between frames by adding intermediate keyframes or reducing the total displacement.</td>
    <td>This check validates that the linear movement speed of body parts in a `Class.CurveAnimation` does not exceed frame-to-frame movement limits. This is the legacy version of the speed check that reports the violation as a per-frame distance rather than a per- second speed.</td>
  </tr>
  <tr>
    <td>`Instances within the animation have CollectionService tags, but Marketplace assets cannot have any tags.`</td>
    <td>This error triggers when any child or descendant of the `Class.CurveAnimation` (excluding the `Class.CurveAnimation` instance itself) has one or more `Class.CollectionService` tags applied to it.<br /><br />To fix this, remove all tags from every instance within your animation hierarchy before uploading using `Class.CollectionService: RemoveTag()` or by clearing tags in Studio's properties panel.</td>
    <td>This check validates that instances within a `Class.CurveAnimation` do not have `Class.CollectionService` tags attached to them. Tags on Marketplace assets could be used to interfere with game systems that rely on `Class.CollectionService` for gameplay logic.</td>
  </tr>
  <tr>
    <td>`CurveAnimation can only contain a single timestamp tag. Please remove all other tags.`</td>
    <td>This error triggers when the `Class.CurveAnimation` has more than one tag, or has a single tag that is not a pure numeric string (timestamp).<br /><br />To fix this, remove all `Class.CollectionService` tags from the `Class.CurveAnimation` instance, or ensure only one tag remains and it is a valid numeric timestamp.</td>
    <td>This check validates that the `Class.CurveAnimation` instance itself only has tags that follow the allowed pattern. The only permitted tag on a `Class.CurveAnimation` is a single numeric timestamp (up to 30 digits) used for versioning.</td>
  </tr>
  <tr>
    <td>`Failed to fetch moderation results. Make sure all assets are owned by the current user.`</td>
    <td>This error fires when the system cannot retrieve moderation results for the referenced assets, typically due to a network or service issue.<br /><br />To fix this, verify that all embedded assets are published and owned by your account, then retry the upload.</td>
    <td>This check ensures that all referenced sub-assets (meshes, textures, images) within your upload have passed content moderation and are owned by authorized creators. It queries moderation status for every content ID found in the asset tree.</td>
  </tr>
  <tr>
    <td>`Asset(s) failed to pass moderation.`</td>
    <td>This error triggers when one or more referenced assets have been flagged, are still pending review, or have been rejected by the moderation system.<br /><br />To fix this, you must replace the flagged asset IDs with moderation-approved assets before the upload can succeed.</td>
    <td>This check ensures that all referenced sub-assets (meshes, textures, images) within your upload have passed content moderation and are owned by authorized creators. It queries moderation status for every content ID found in the asset tree.</td>
  </tr>
  <tr>
    <td>`Asset is not owned by an authorized creator.`</td>
    <td>This error fires when a referenced asset (mesh or texture) belongs to a different user or group than the one performing the upload.<br /><br />To fix this, replace the asset with one you own or have [publishing rights](../projects/assets/privacy.md) to.</td>
    <td>This check ensures that all referenced sub-assets (meshes, textures, images) within your upload have passed content moderation and are owned by authorized creators. It verifies ownership of every embedded content ID against the uploading creator's account or group.</td>
  </tr>
  <tr>
    <td>`Upload of model has too many children assets (Meshes, Textures, etc.) and cannot be processed as is. You need to rearrange the model.`</td>
    <td>This error fires when your model references more meshes, textures, or other content IDs than the system can process in one batch.<br /><br />To fix this, simplify your model by reducing the number of unique referenced assets or splitting the upload into smaller pieces.</td>
    <td>This check ensures that all referenced sub-assets (meshes, textures, images) within your upload have passed content moderation and are owned by authorized creators. There is a maximum number of distinct asset references that can be validated in a single upload.</td>
  </tr>
  <tr>
    <td>`Could not parse ContentId. Make sure you are using a valid URL with a valid ID and try again.`</td>
    <td>This error triggers when a content ID field contains text that cannot be parsed into a valid asset URL format.<br /><br />To fix this, ensure the field uses the correct `rbxassetid://` format or a valid HTTP asset URL with a numeric asset ID.</td>
    <td>This check verifies that every content ID field (`Class.MeshPart.MeshId|MeshId`, `Class.MeshPart.TextureID|TextureID`, etc.) in your asset tree contains a properly formatted, parseable reference. Empty optional fields are acceptable, but any non-empty field must resolve to a valid asset ID.</td>
  </tr>
  <tr>
    <td>`Field cannot be empty. Make sure a valid asset is assigned and try again.`</td>
    <td>This error fires when a required content field (such as `Class.MeshPart.MeshId|MeshId` on a `Class.MeshPart`) is left empty.<br /><br />To fix this, assign a valid mesh or texture asset to the empty field before attempting to publish.</td>
    <td>This check verifies that every content ID field (`Class.MeshPart.MeshId|MeshId`, `Class.MeshPart.TextureID|TextureID`, etc.) in your asset tree contains a properly formatted, parseable reference. Required fields must have a valid asset assigned before upload.</td>
  </tr>
  <tr>
    <td>`Asset referenced does not exist or is not loadable. Replace it with a valid asset id.`</td>
    <td>This error fires when the system attempts to load a referenced asset and it either does not exist on the platform or cannot be accessed.<br /><br />To fix this, replace the asset ID with a valid, published asset that exists and is accessible to your account.</td>
    <td>This check verifies that every content ID field (`Class.MeshPart.MeshId|MeshId`, `Class.MeshPart.TextureID|TextureID`, etc.) in your asset tree contains a properly formatted, parseable reference and that the referenced assets actually exist and can be loaded.</td>
  </tr>
  <tr>
    <td>`Head mesh is missing required FACS controls.`</td>
    <td>This error fires when one or more of the required Facial Action Coding System (FACS) control poses are completely absent from the head mesh data.<br /><br />To fix this, add the missing blend shapes to your head mesh in your 3D modeling software and ensure each [required control](../avatar/dynamic-heads/specifications.md#facs-animation) name matches the expected FACS naming convention.</td>
    <td>This check validates that your dynamic head mesh contains all 17 required FACS controls and that those controls are actively deforming the mesh.</td>
  </tr>
  <tr>
    <td>`Head mesh has inactive FACS controls.`</td>
    <td>This error fires when FACS controls exist in the mesh data but do not produce any measurable vertex displacement when driven to their full value.<br /><br />To fix this, adjust the blend shapes in your 3D modeling software so that each control creates visible facial movement when activated.</td>
    <td>This check validates that your dynamic head mesh contains all 17 required FACS controls and that those controls are actively deforming the mesh. Controls must produce visible mesh deformation when activated.</td>
  </tr>
  <tr>
    <td>`Failed validation for dynamic head due to missing FACS information. You need to provide FACS controls for at least 17 poses.`</td>
    <td>This error fires when the head mesh either contains no FACS data at all or has fewer than the minimum 17 [required pose targets](../avatar/dynamic-heads/specifications.md#facs-animation).<br /><br />To fix this, you must author the head mesh with all required FACS blend shapes in your 3D modeling software before exporting.</td>
    <td>This check validates that the dynamic head mesh contains valid FACS format data with at least 17 required facial poses.</td>
  </tr>
  <tr>
    <td>`This asset uses emissive maps which are only available to creators in the Trusted Creator Program. Please remove all emissive map content or join the program before uploading.`</td>
    <td>This error fires when your asset contains an emissive texture map but your account does not have the required permission.<br /><br />To fix this, remove all emissive map textures from your `Class.SurfaceAppearance` instance.</td>
    <td>This check determines whether the uploading creator has permission to use emissive (glow) maps on their asset. Emissive maps allow parts of a mesh to appear self-lit, but this feature is restricted to members of the Trusted Creator Program.</td>
  </tr>
  <tr>
    <td>`To upload an asset to Roblox, you must select exactly 1 instance and the associated upload type.`</td>
    <td>This error fires when the upload contains zero or more than one root instance selected for publishing.<br /><br />To fix this, select exactly one instance (the root of your asset) and ensure the correct upload type is chosen before attempting to publish.</td>
    <td>This check validates that the uploaded asset has a correct top-level structure matching the expected schema for its asset type, including the right root class, name, and required children. It runs as the first gate before any other validation.</td>
  </tr>
  <tr>
    <td>`Uploaded asset should be a specific class but is a different class.`</td>
    <td>This error fires when the root instance is a different class than expected, such as when you upload a `Class.Part` when a `Class.MeshPart` is required.<br /><br />To fix this, change the root instance to the correct class type, or verify you selected the right instance and upload type.</td>
    <td>This check validates that the uploaded asset has a correct top-level structure matching the expected schema for its asset type, including the right root class, name, and required children. The root instance must be the correct Roblox class for the chosen upload category.</td>
  </tr>
  <tr>
    <td>`Uploaded asset should be named correctly but has an unexpected name.`</td>
    <td>This error fires when the root instance name does not match what the schema requires for this asset type.<br /><br />To fix this, rename the root instance to the expected name as defined by the asset type specification, such as 'Head' for dynamic heads.</td>
    <td>This check validates that the uploaded asset has a correct top-level structure matching the expected schema for its asset type, including the right root class, name, and required children. Certain asset types require a specific name on the root instance.</td>
  </tr>
  <tr>
    <td>`Could not find a required child instance inside the asset.`</td>
    <td>This error fires when a required child is missing from the instance tree, such as a `Class.WrapLayer`, `Class.Attachment`, or specific `Class.MeshPart`.<br /><br />To fix this, add the missing instance of the specified class and name as a child of the indicated parent.</td>
    <td>This check validates that the uploaded asset has a correct top-level structure matching the expected schema for its asset type, including the right root class, name, and required children. Each asset type has a defined set of required child instances that must exist.</td>
  </tr>
  <tr>
    <td>`Instances not part of the approved schema should be removed.`</td>
    <td>This error fires when your asset contains extra descendants that are not part of the approved structure for this asset type.<br /><br />To fix this, remove all instances listed in the error message that do not belong to the expected asset schema.</td>
    <td>This check validates that the uploaded asset has a correct top-level structure matching the expected schema for its asset type, including the right root class, name, and required children. Only instances defined in the schema are permitted in the asset tree.</td>
  </tr>
  <tr>
    <td>`A child body part cannot extend above its parent part. Adjust how the parts are put together by moving the rig attachment.`</td>
    <td>This error fires when a child body part's bounding box extends higher than its parent part's bounding box at their connection point.<br /><br />To fix this, move the rig attachment that connects these parts to reposition the child part lower, or adjust the mesh geometry so it stays within the vertical extent of the parent.</td>
    <td>This check ensures that connected body parts in a character body upload maintain proper vertical ordering so that child parts do not extend above their parent parts. This prevents body parts from visually clipping through each other during animation.</td>
  </tr>
  <tr>
    <td>`A parent body part cannot extend below its child part. Adjust how the parts are put together by moving the rig attachment.`</td>
    <td>This error fires when a parent body part's bounding box extends lower than its child part's bounding box at their connection point.<br /><br />To fix this, move the rig attachment that connects these parts to reposition the parent part higher, or adjust the mesh geometry so the parent stays above the child at the joint.</td>
    <td>This check ensures that connected body parts in a character body upload maintain proper vertical ordering so that parent parts do not extend below their child parts. This prevents body parts from visually clipping through each other during animation.</td>
  </tr>
  <tr>
    <td>`FACS was detected shrinking your head, but altering the head size is against Marketplace policy for facial animations.`</td>
    <td>This error fires when one or more [FACS poses](../avatar/dynamic-heads/specifications.md#facs-animation) cause the head mesh to shrink below the minimum allowed percentage of its original size (default: 95%).<br /><br />To fix this, adjust your facial blend shapes so they only move facial features without reducing the overall head volume.</td>
    <td>This check ensures that FACS poses on a dynamic head do not significantly alter the overall head size. The head mesh must remain consistent in scale across all FACS pose combinations to prevent abuse or visual glitches.</td>
  </tr>
  <tr>
    <td>`FACS was detected expanding your head, but altering the head size is against Marketplace policy for facial animations.`</td>
    <td>This error fires when one or more FACS poses cause the head mesh to expand above the maximum allowed percentage of its original size (default: 120%).<br /><br />To fix this, adjust your facial blend shapes so they only move facial features without increasing the overall head volume.</td>
    <td>This check ensures that FACS poses on a dynamic head do not significantly alter the overall head size. The head mesh must remain consistent in scale across all FACS pose combinations to prevent abuse or visual glitches.</td>
  </tr>
  <tr>
    <td>`Failed to validate facial animation joint bounds, please try again later.`</td>
    <td>This error fires when the validation system itself encounters an error while attempting to compute joint distance metrics, rather than indicating a content problem.<br /><br />To fix this, retry the upload; if it persists, ensure the head mesh FACS data is not corrupted.</td>
    <td>This check validates that FACS-driven joint transforms on a dynamic head stay within acceptable distance bounds, preventing joints from being pushed unreasonably far outside the head during facial animations. It measures both direct (single-pose) and accumulated (combined-pose) joint displacement.</td>
  </tr>
  <tr>
    <td>`Head facial animation results in joints being moved substantially outside of the head. Please edit your facial animations and try again.`</td>
    <td>This error fires when a single facial animation pose (such as `JawDrop` or `LeftEyeClosed`) moves a joint too far from its rest position relative to the head size.<br /><br />To fix this, reduce the intensity of the specific FACS control listed so the affected joints stay closer to the head surface.</td>
    <td>This check validates that FACS-driven joint transforms on a dynamic head stay within acceptable distance bounds, preventing joints from being pushed unreasonably far outside the head during facial animations. It measures the maximum displacement any single FACS action causes on any joint.</td>
  </tr>
  <tr>
    <td>`Head facial animations can be combined to extend a joint far outside the head. Please edit your facial animations and try again.`</td>
    <td>This error fires when the additive effect of multiple facial animation poses pushes a specific joint beyond the maximum allowed distance from its rest position.<br /><br />To fix this, reduce the displacement magnitude across multiple FACS controls that affect the named joint so their combined effect stays within bounds.</td>
    <td>This check validates that FACS-driven joint transforms on a dynamic head stay within acceptable distance bounds, preventing joints from being pushed unreasonably far outside the head during facial animations. It measures the worst-case accumulated displacement when multiple FACS poses are combined.</td>
  </tr>
  <tr>
    <td>`Head MeshPart has facial animations for a joint which cannot be used in FACS. Please rename this joint then reimport your head.`</td>
    <td>This error fires when the head mesh's FACS data references a joint name that is reserved for the body skeleton (such as the standardized [rigging](../avatar/character-bodies/specifications.md#rigging) joint names or allowed [skinning transfer](../avatar/automatic-skinning-transfer.md) names).<br /><br />To fix this, rename the conflicting joint in your 3D modeling software to a non-reserved name and re-export the head.</td>
    <td>This check ensures that FACS data on a dynamic head does not drive joints that belong to the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy or skinning transfer schema. FACS should only animate facial-specific joints, not body rig joints.</td>
  </tr>
  <tr>
    <td>`Missing HSR data. Please try again.`</td>
    <td>This error fires when a `Class.BaseWrap` instance in your asset reports that its Hidden Surface Removal (HSR) data is not ready, meaning the pre-processing step was not completed before upload.<br /><br />To fix this, regenerate the asset using the [Accessory Fitting Tool](../avatar/accessory-fitting-tool.md), which will trigger HSR computation, then try uploading again.</td>
    <td>This check validates that all `Class.WrapLayer` and `Class.BaseWrap` instances in your asset have their HSR data fully generated. HSR data allows the engine to efficiently hide parts of the body mesh that are occluded by layered accessories.</td>
  </tr>
  <tr>
    <td>`WrapLayer HSR asset does not have exactly 1 HiddenSurfaceRemovalAsset root.`</td>
    <td>This error fires when the loaded Hidden Surface Removal (HSR) asset does not contain exactly one `Class.HiddenSurfaceRemovalAsset` instance at its root, indicating a malformed or corrupted HSR asset.<br /><br />To fix this, regenerate the HSR data using the [Accessory Fitting Tool](../avatar/accessory-fitting-tool.md), then try uploading again.</td>
    <td>This check validates that the HSR assets linked to each `Class.WrapLayer` have the correct internal structure and that their mesh IDs match the associated clothing mesh. HSR assets enable efficient body-mesh occlusion under layered accessories.</td>
  </tr>
  <tr>
    <td>`WrapLayer HSR asset has children under the HiddenSurfaceRemovalAsset root Instance.`</td>
    <td>This error fires when the `Class.HiddenSurfaceRemovalAsset` root has child instances underneath it, which is not permitted by the expected structure.<br /><br />To fix this, regenerate the Hidden Surface Removal (HSR) data using the [Accessory Fitting Tool](../avatar/accessory-fitting-tool.md) to produce a correctly-structured HSR asset, then try uploading again</td>
    <td>This check validates that the Hidden Surface Removal (HSR) assets linked to each `Class.WrapLayer` have the correct internal structure and that their mesh IDs match the associated layered accessory mesh. The HSR asset must be a leaf node with no descendants.</td>
  </tr>
  <tr>
    <td>`WrapLayer requires an HSRAssetId to be set.`</td>
    <td>This error fires when a `Class.WrapLayer.HSRAssetId` property is empty during a backend publish operation, meaning no Hidden Surface Removal (HSR) data has been associated with the layered accessory layer.<br /><br />To fix this, generate HSR data using the [Accessory Fitting Tool](../avatar/accessory-fitting-tool.md) before publishing.</td>
    <td>This check validates that the HSR assets linked to each `Class.WrapLayer` have the correct internal structure and that their mesh IDs match the associated clothing mesh. On server-side (backend) uploads, the HSR asset reference must be populated.</td>
  </tr>
  <tr>
    <td>`WrapLayer has an HSRAssetId with an invalid URL.`</td>
    <td>This error fires when the `Class.WrapLayer.HSRAssetId` property contains a string that cannot be parsed into a valid asset ID.<br /><br />To fix this, regenerate the Hidden Surface Removal (HSR) data with the [Accessory Fitting Tool](../avatar/accessory-fitting-tool.md) to ensure a properly formatted asset reference is assigned.</td>
    <td>This check validates that the HSR assets linked to each `Class.WrapLayer` have the correct internal structure and that their mesh IDs match the associated clothing mesh. The `Class.WrapLayer.HSRAssetId` field must contain a valid, parseable asset URL.</td>
  </tr>
  <tr>
    <td>`Error occurred while validating HSR Mesh Ids.`</td>
    <td>This error fires when the engine encounters an error while attempting to compare the Hidden Surface Removal (HSR) mesh IDs with the `Class.WrapLayer` mesh IDs, rather than indicating a mismatch.<br /><br />To fix this, retry the upload; if the issue persists, regenerate the HSR data using the [Accessory Fitting Tool](../avatar/accessory-fitting-tool.md).</td>
    <td>This check validates that the HSR assets linked to each `Class.WrapLayer` have the correct internal structure and that their mesh IDs match the associated clothing mesh. The engine performs a mesh ID comparison to ensure the HSR data corresponds to the current clothing mesh.</td>
  </tr>
  <tr>
    <td>`Invalid HSR data detected. Please re-generate the asset using the Accessory Fitting Tool and try again.`</td>
    <td>This error fires when the mesh IDs embedded in the Hidden Surface Removal (HSR) asset do not match the mesh IDs of the current `Class.WrapLayer`, meaning the HSR data is stale or was generated from a different version of the mesh.<br /><br />To fix this, re-run the [Accessory Fitting Tool](../avatar/accessory-fitting-tool.md) on the current mesh to regenerate matching HSR data.</td>
    <td>This check validates that the HSR assets linked to each `Class.WrapLayer` have the correct internal structure and that their mesh IDs match the associated clothing mesh. The HSR data must have been generated from the exact same mesh currently on the `Class.WrapLayer`.</td>
  </tr>
  <tr>
    <td>`Found Bone, but you must use HumanoidRigDescription to use Bones.`</td>
    <td>This error fires when `Class.Bone` instances exist inside a `Class.MeshPart` that does not have a `Class.HumanoidRigDescription` child, meaning the bones cannot be properly interpreted by the animation system.<br /><br />To fix this, either add a correctly configured `Class.HumanoidRigDescription` to the `Class.MeshPart`, or remove the `Class.Bone` instances.</td>
    <td>This check validates that the bone hierarchy within each `Class.MeshPart` of an avatar body or dynamic head conforms to the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy and is correctly registered in the `Class.HumanoidRigDescription`. Any `Class.Bone` instances require an associated `Class.HumanoidRigDescription` to define how the skeleton is structured.</td>
  </tr>
  <tr>
    <td>`You cannot include a DigitsRigDescription without a HumanoidRigDescription.`</td>
    <td>This error fires when a `Class.DigitsRigDescription` exists on a `Class.MeshPart` that has no `Class.HumanoidRigDescription`.<br /><br />To fix this, add a `Class.HumanoidRigDescription` to the same `Class.MeshPart`, or remove the `Class.DigitsRigDescription` if finger articulation is not needed.</td>
    <td>This check validates that the bone hierarchy within each `Class.MeshPart` of an avatar body or dynamic head conforms to the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy and is correctly registered in the `Class.HumanoidRigDescription`. A `Class.DigitsRigDescription` requires an accompanying `Class.HumanoidRigDescription` as the primary rig definition.</td>
  </tr>
  <tr>
    <td>`Instance is in a bone tree but not part of the defined R15plus schema.`</td>
    <td>This error fires when an instance (bone or other object) exists in the bone hierarchy but its name and class combination is not recognized by the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy.<br /><br />To fix this, remove or rename the instance to match one of the allowed bone/attachment names in the advanced R15 rig hierarchy.</td>
    <td>This check validates that the bone hierarchy within each `Class.MeshPart` of an avatar body or dynamic head conforms to the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy and is correctly registered in the `Class.HumanoidRigDescription`. Every instance that appears as a descendant of a `Class.Bone` must be defined in the expected advanced R15 rig hierarchy.</td>
  </tr>
  <tr>
    <td>`Instance shows up more than once, but may only exist once within a bone hierarchy.`</td>
    <td>This error fires when two or more instances share the same name within a single `Class.MeshPart` instance's bone tree, creating ambiguity in the rig definition.<br /><br />To fix this, remove or rename the duplicate instances so each bone name appears exactly once in the hierarchy.</td>
    <td>This check validates that the bone hierarchy within each `Class.MeshPart` of an avatar body or dynamic head conforms to the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy and is correctly registered in the `Class.HumanoidRigDescription`. Each named bone or attachment must appear exactly once in the hierarchy.</td>
  </tr>
  <tr>
    <td>`Bone is allowed, but you must map it explicitly in the HumanoidRigDescription or DigitsRigDescription.`</td>
    <td>This error fires when a bone has a valid schema name and exists in the hierarchy, but is not mapped in the `Class.HumanoidRigDescription` or `Class.DigitsRigDescription`.<br /><br />To fix this, update the `Class.HumanoidRigDescription`/`Class.DigitsRigDescription` to link to this bone instance using the correct joint label.</td>
    <td>This check validates that the bone hierarchy within each `Class.MeshPart` of an avatar body or dynamic head conforms to the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy and is correctly registered in the `Class.HumanoidRigDescription`. Each `Class.Bone` instance must be explicitly linked in the `Class.HumanoidRigDescription` or `Class.DigitsRigDescription` so the animation system knows how to drive it.</td>
  </tr>
  <tr>
    <td>`Instance is underneath the wrong parent based on the existing bone hierarchy.`</td>
    <td>This error fires when an instance is parented to the wrong bone or attachment relative to what the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy expects given the other bones present.<br /><br />To fix this, reparent the instance to the correct parent as indicated in the error message.</td>
    <td>This check validates that the bone hierarchy within each `Class.MeshPart` of an avatar body or dynamic head conforms to the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy and is correctly registered in the `Class.HumanoidRigDescription`. The parent-child relationships between bones and attachments must follow the schema-defined hierarchy.</td>
  </tr>
  <tr>
    <td>`Failed to load texture field for Decal. Make sure TextureContent exists and is valid and try again.`</td>
    <td>This error fires when a specific texture field on the `Class.Decal` instance cannot be loaded, such as `Class.Decal.ColorMap|ColorMap` abd`Class.Decal.MetalnessMap|MetalnessMap`.<br /><br />To fix this, verify that the `Class.Decal.TextureContent` property references a valid, uploaded texture asset and that the asset has not been deleted or corrupted.</td>
    <td>This check validates that all texture maps on a makeup decal can be successfully loaded and read by the system. Makeup assets rely on texture data to render correctly on the avatar's face, so every referenced texture field must point to accessible, valid content.</td>
  </tr>
  <tr>
    <td>`Failed to load texture data. Make sure the texture exists and try again.`</td>
    <td>This error fires when the system locates the texture but cannot extract its pixel dimensions or contents.<br /><br />To fix this, re-upload the texture asset or ensure it was not corrupted during export from your image editor.</td>
    <td>This check validates that the pixel data of a makeup decal texture can be read after the texture reference is resolved. Even if a texture asset exists, its underlying image data must be readable so the system can verify resolution and UV coverage.</td>
  </tr>
  <tr>
    <td>`Texture resolution is higher than the maximum supported size for that texture field.`</td>
    <td>This error fires when a texture's width or height exceeds the per- field maximum, such as 1024x1024 for `Class.Decal.ColorMap`.<br /><br />To fix this, resize the texture in your image editor to fit within the stated limit before re-uploading.</td>
    <td>This check validates that each texture map on a makeup decal does not exceed the maximum allowed pixel dimensions. Oversized textures consume excessive memory and bandwidth, degrading performance for all users.</td>
  </tr>
  <tr>
    <td>`No ColorMap found for Decal. Makeup Decals are required to have a valid ColorMap.`</td>
    <td>This error fires when the `Class.Decal` instance has no valid `Class.Decal.ColorMap|ColorMap` content set.<br /><br />To fix this, add a `Class.Decal.ColorMap|ColorMap` texture to your makeup decal asset before uploading.</td>
    <td>This check validates that every makeup decal has a `Class.Decal.ColorMap|ColorMap` texture assigned. The `Class.Decal.ColorMap|ColorMap` is the primary visual layer that defines what the makeup looks like on the avatar's face, so it is mandatory for all makeup assets.</td>
  </tr>
  <tr>
    <td>`Opaque area of ColorMap does not fall within the allowed UV area for this asset type.`</td>
    <td>This error fires when too many opaque pixels exist outside the allowed UV bounding area.<br /><br />To fix this, adjust your texture so that all visible content falls within the permitted zone for your makeup type.</td>
    <td>This check validates that the visible (opaque) pixels of a makeup `Class.Decal.ColorMap|ColorMap` are positioned within the designated UV region for the makeup type. Each makeup category (lip, eye, face) has a defined include zone on the UV map, and content must stay within it to render correctly.</td>
  </tr>
  <tr>
    <td>`Opaque pixels in ColorMap were found within a restricted UV area for this asset type.`</td>
    <td>This error fires when too many opaque pixels are detected inside a restricted bounding area.<br /><br />To fix this, edit your texture to remove or make transparent any content that overlaps with the excluded region for your makeup type.</td>
    <td>This check validates that the visible (opaque) pixels of a makeup `Class.Decal.ColorMap|ColorMap` do not intrude into restricted UV zones. Certain regions of the UV map are designated as exclusion zones to prevent makeup from rendering in inappropriate areas of the face.</td>
  </tr>
  <tr>
    <td>`Instances have an invalid material. Only approved materials are allowed.`</td>
    <td>This error fires when a `Class.MeshPart` or other `Class.BasePart` uses a material not in the allowed set.<br /><br />To fix this, change the material of the flagged part to one of the accepted values (such as `Plastic`, `SmoothPlastic`, etc.) in your 3D modeling tool or Studio properties.</td>
    <td>This check validates that all `Class.BasePart` instances in the asset use only materials from the approved list. Restricting materials ensures visual consistency across the platform and prevents use of materials that may not render correctly in all contexts.</td>
  </tr>
  <tr>
    <td>`Position is outside of bounds.`</td>
    <td>This error fires when the **Handle** mesh's position or the computed bounds center exceeds the valid coordinate range.<br /><br />To fix this, reset the position of your accessory in your modeling tool so it is near the origin before exporting.</td>
    <td>This check validates that the accessory mesh and its attachment are positioned within a reasonable coordinate range in world space. Extreme positions (beyond 10,000 studs on any axis) indicate a malformed or corrupted asset that would not render correctly.</td>
  </tr>
  <tr>
    <td>`Mesh scale is too small.`</td>
    <td>This error fires when any axis of the mesh scale falls below the minimum allowed value.<br /><br />To fix this, increase the scale of your mesh in your 3D modeling software or verify that the `Class.MeshPart` size is set correctly before re-uploading.</td>
    <td>This check validates that the accessory's render mesh scale meets the minimum threshold on all axes. Meshes scaled to near-zero are effectively invisible and likely indicate an export error or misconfigured asset.</td>
  </tr>
  <tr>
    <td>`Mesh scale is too large.`</td>
    <td>This error fires when any axis of the mesh scale exceeds the maximum allowed value.<br /><br />To fix this, reduce the mesh scale in your 3D modeling software or adjust the `Class.MeshPart` size in Studio to stay within the permitted range.</td>
    <td>This check validates that the accessory's render mesh scale does not exceed the maximum threshold on any axis. Excessively large mesh scales can cause rendering issues, physics instability, and unfair gameplay advantages.</td>
  </tr>
  <tr>
    <td>`Mesh has size larger than the maximum allowed bounding size for its accessory type.`</td>
    <td>This error fires when one or more mesh vertices extend beyond the permitted bounding box.<br /><br />To fix this, reduce the overall size of your mesh or reposition it closer to the attachment point in your modeling tool.</td>
    <td>This check validates that all vertices of the accessory's render mesh fit within the maximum bounding box defined for that attachment point. Each accessory type has a specific allowable volume to prevent oversized items that clip through the environment or other avatars.</td>
  </tr>
  <tr>
    <td>`Mesh data is not centered. Please reimport with the Roblox 3D importer and ensure there is no loose geometry.`</td>
    <td>This error fires when the bounding box center of the mesh exceeds the acceptable distance from the origin.<br /><br />To fix this, re-center your mesh at the origin in your 3D modeling software and remove any stray geometry before re-exporting.</td>
    <td>This check validates that the geometric center of the accessory mesh is near the origin (center of its bounding box). An off-center mesh indicates the instance was not properly aligned before export, which causes it to appear offset when worn.</td>
  </tr>
  <tr>
    <td>`Mesh failed to load. Make sure the mesh exists and try again.`</td>
    <td>This error fires when the mesh data cannot be loaded from the `Class.MeshPart.MeshId|MeshId` reference.<br /><br />To fix this, verify that the `Class.MeshPart` has a valid `Class.MeshPart.MeshId|MeshId` pointing to an uploaded, accessible mesh asset and re-upload if needed.</td>
    <td>This check validates that the render mesh for a [body part](../avatar/character-bodies/specifications.md#body-parts) can be loaded successfully for size verification. The system needs to read the actual mesh geometry to compute its true dimensions and compare against the stored `Class.MeshPart.MeshSize` property.</td>
  </tr>
  <tr>
    <td>`Calculated mesh size does not match the MeshSize property value.`</td>
    <td>This error fires when the computed mesh extents differ from the `Class.MeshPart.MeshSize` value.<br /><br />To fix this, re-import the mesh through the [Importer](../studio/importer.md), which automatically computes the correct `Class.MeshPart.MeshSize` rather than setting it manually.</td>
    <td>This check validates that the `Class.MeshPart.MeshSize` property stored on a `Class.MeshPart` accurately reflects the actual computed dimensions of its mesh geometry. A mismatch indicates the mesh was modified after the property was set, or the property was manually altered, which can cause incorrect physics and rendering behavior.</td>
  </tr>
  <tr>
    <td>`A required attachment must exist exactly once within the body part's descendants.`</td>
    <td>This error fires when a required attachment is missing or appears more than once (or as the wrong class) within a `Class.MeshPart` instance's descendants.<br /><br />To fix this, add the missing attachment to the correct body part in Studio with the [exact expected name](../avatar/character-bodies/specifications.md#attachments) and ensure it is a `Class.Attachment` instance.</td>
    <td>This check validates that each body part mesh contains all required joint and rig attachments defined in the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy. These attachments are necessary for the avatar rig to assemble correctly and for animations and accessories to attach at the proper points.</td>
  </tr>
  <tr>
    <td>`A joint property is set in the HRD/DRD outside the acceptable range.`</td>
    <td>This error fires when a joint's size or range value in the `Class.HumanoidRigDescription` or `Class.DigitsRigDescription` exceeds the permitted minimum or maximum.<br /><br />To fix this, adjust the specified property value in your rig description to fall within the allowed range shown in the error message.</td>
    <td>This check validates that all numeric properties on the `Class.HumanoidRigDescription` and `Class.DigitsRigDescription` fall within acceptable bounds. These properties control joint size, range of motion, and origin offset for the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) skeleton.</td>
  </tr>
  <tr>
    <td>`HumanoidRigDescription has an originOffset outside of bounds. OriginOffset must have no rotation and be within acceptable limits.`</td>
    <td>This error fires when the `LowerTorso` `Class.HumanoidRigDescription.OriginOffset` has a non-identity rotation or its vertical position is outside the allowed Y range.<br /><br />To fix this, reset the `Class.HumanoidRigDescription.OriginOffset|OriginOffset` rotation to identity and ensure the Y position stays within the permitted bounds.</td>
    <td>This check validates that all numeric properties on the `Class.HumanoidRigDescription` and `Class.DigitsRigDescription` fall within acceptable bounds. The `Class.HumanoidRigDescription.OriginOffset|OriginOffset` on the `LowerTorso`'s `Class.HumanoidRigDescription` defines the avatar's ground-level offset and must stay within vertical limits with no rotation.</td>
  </tr>
  <tr>
    <td>`HRD property is referenced by the instance but is not part of the contained joint list for that MeshPart.`</td>
    <td>This error fires when the `Class.HumanoidRigDescription` references a joint that the engine reports is not contained within the current `Class.MeshPart`, which can happen if the `Class.HumanoidRigDescription` is at the wrong level of the hierarchy or if joints are misconfigured.<br /><br />To fix this, ensure each `Class.HumanoidRigDescription` is placed on the correct `Class.MeshPart` that actually contains its referenced joints.</td>
    <td>This check validates that all numeric properties on the `Class.HumanoidRigDescription` and `Class.DigitsRigDescription` fall within acceptable bounds. Each joint referenced in the `Class.HumanoidRigDescription` must belong to the set of joints contained by the `Class.MeshPart` it lives under.</td>
  </tr>
  <tr>
    <td>`A standard R15 joint rig attachment is not connected to the HRD.`</td>
    <td>This error fires when a [standard R15 rig](../avatar/character-bodies/specifications.md#standard-r15-rigs) joint's rig attachment exists on a `Class.MeshPart` but the `Class.HumanoidRigDescription` does not link to it, often because the `Class.HumanoidRigDescription` is configured for `Class.Motor6D` joints instead of `Class.AttachmentConstraint` joints.<br /><br />To fix this, update your `Class.HumanoidRigDescription` to link to the correct rig attachment instance.</td>
    <td>This check validates that all numeric properties on the `Class.HumanoidRigDescription` and `Class.DigitsRigDescription` fall within acceptable bounds and that standard R15 rig joints are properly linked. Each body part that has a rig attachment must have that attachment correctly referenced by the `Class.HumanoidRigDescription`.</td>
  </tr>
  <tr>
    <td>`Optional joint is incorrectly mapped in the HRD. It must be mapped to the correct bone.`</td>
    <td>This error fires when an optional joint in the `Class.HumanoidRigDescription` points to an instance that does not match the expected bone name, indicating a wiring error in the rig description.<br /><br />To fix this, update the `Class.HumanoidRigDescription` joint mapping to point to the correctly-named `Class.Bone` instance.</td>
    <td>This check validates that all numeric properties on the `Class.HumanoidRigDescription` and `Class.DigitsRigDescription` fall within acceptable bounds and that joint mappings point to the correct instances. Optional joints that are present must be mapped to a `Class.Bone` with the matching name.</td>
  </tr>
  <tr>
    <td>`A joint has a range set in the HRD where the minimum is larger than the maximum, which is not a valid range.`</td>
    <td>This error fires when any component of a joint's minimum range vector exceeds the corresponding component of its maximum range vector.<br /><br />To fix this, fix the `Class.HumanoidRigDescription` range values so that `rangeMin` is less than or equal to `rangeMax` on all three axes.</td>
    <td>This check validates that all numeric properties on the `Class.HumanoidRigDescription` and `Class.DigitsRigDescription` fall within acceptable bounds. Joint range values define limits of motion, so the minimum must be less than or equal to the maximum on each axis.</td>
  </tr>
  <tr>
    <td>`DigitsRigDescription side property does not match the body part it is placed on.`</td>
    <td>This error fires when a `Class.DigitsRigDescription.Side` property does not match the hand part it is placed on.<br /><br />To fix this, change the `Side` property to match the `Class.MeshPart` name. A `Class.DigitsRigDescription` on a `LeftHand` must have `Class.DigitsRigDescription.Side|Side` set to `Left`, and `RightHand` must have `Class.DigitsRigDescription.Side|Side` set to `Right`.</td>
    <td>This check validates that all numeric properties on the `Class.HumanoidRigDescription` and `Class.DigitsRigDescription` fall within acceptable bounds and that `Class.DigitsRigDescription` instances are configured for the correct hand.</td>
  </tr>
  <tr>
    <td>`MeshPart mesh size is smaller than the minimum allowed individual part size. Scale up the mesh.`</td>
    <td>This error fires when one axis of a mesh's scaled mesh size falls below the minimum threshold (default: 0.05 studs). The affected part is too small to render or interact with properly.<br /><br />To fix this, scale up the mesh in your 3D modeling software so all axes meet the minimum size requirement.</td>
    <td>This check validates that each individual `Class.MeshPart` in an avatar or dynamic head upload has physical dimensions (width, height, depth) that fall within acceptable size thresholds. Each axis of each part is checked independently against minimum and maximum bounds.</td>
  </tr>
  <tr>
    <td>`MeshPart mesh size is larger than the maximum allowed individual part size. Scale down the mesh.`</td>
    <td>This error fires when one axis of a mesh's scaled mesh size exceeds the maximum threshold (default: 4.0 studs). The affected part is too large for the avatar system.<br /><br />To fix this, scale down the mesh in your 3D modeling software so all axes stay within the maximum size limit.</td>
    <td>This check validates that each individual `Class.MeshPart` in an avatar or dynamic head has physical dimensions (width, height, depth) that fall within acceptable size thresholds. Each axis of each part is checked independently against minimum and maximum bounds.</td>
  </tr>
  <tr>
    <td>`Instance has a name that is reserved and cannot be used in Marketplace assets.`</td>
    <td>This error fires when the root instance or any descendant has a name that matches a reserved/banned name list.<br /><br />To fix this, rename the affected instance to something that does not conflict with Roblox reserved names.</td>
    <td>This check scans all instances in your asset tree for names and class types that are not permitted in Marketplace uploads. Certain instance names are reserved by the Roblox engine for internal use and cannot appear in user-uploaded content.</td>
  </tr>
  <tr>
    <td>`Instance is of a type which is not allowed in Marketplace assets.`</td>
    <td>This error fires when a descendant instance is of a class type that appears on the banned list.<br /><br />To fix this, remove the offending instance entirely, as its class type cannot be included in Marketplace assets regardless of its content.</td>
    <td>This check scans all instances in your asset tree for names and class types that are not permitted in Marketplace uploads. Certain instance classes (such as `Class.Script|Scripts` or other restricted types) are prohibited in Marketplace content for security and compatibility reasons.</td>
  </tr>
  <tr>
    <td>`Instance named JointRotation is reserved for attachments that are children of an attachment.`</td>
    <td>This error fires when an instance named `JointRotation` exists but is not a `Class.Attachment` or its parent is not a `Class.Attachment`.<br /><br />To fix this, ensure any instance named `JointRotation` is of `Class.Attachment` and is a direct child of a rig attachment (e.g., `LeftShoulderRigAttachment` or `RightShoulderRigAttachment`).</td>
    <td>This check validates that `JointRotation` attachment instances in an avatar or dynamic head conform to the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy requirements for joint rotation overrides. `JointRotation` must be a `Class.Attachment` parented to another `Class.Attachment`.</td>
  </tr>
  <tr>
    <td>`Instance has a JointRotation child, but this is not part of the allowed R15plus schema.`</td>
    <td>This error fires when a `JointRotation` attachment is parented to an attachment that is not on the allowed list (`LeftShoulderRigAttachment` and `RightShoulderRigAttachment`).<br /><br />To fix this, move or remove the `JointRotation` from the unsupported parent attachment.</td>
    <td>This check validates that `JointRotation` attachment instances in an avatar or dynamic head conform to the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy requirements for joint rotation overrides. `JointRotation` children are only permitted on specific recognized rig attachments.</td>
  </tr>
  <tr>
    <td>`A rig attachment cannot have more than 1 JointRotation child.`</td>
    <td>This error fires when a single rig attachment has two or more `JointRotation` children.<br /><br />To fix this, remove the extra `JointRotation` instances so that only one remains per parent attachment.</td>
    <td>This check validates that `JointRotation` attachment instances in an avatar or dynamic head conform to the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy requirements for joint rotation overrides. Each allowed parent attachment may contain at most one `JointRotation` child.</td>
  </tr>
  <tr>
    <td>`JointRotation has been rotated, but Marketplace uploads may not adjust this instance yet. Please reset orientation.`</td>
    <td>This error fires when the `JointRotation` attachment's orientation deviates more than the allowed threshold (default: 1 degree) from the expected rotation for this asset type and parent.<br /><br />To fix this, reset the `JointRotation` `Datatype.CFrame` orientation to the expected value shown in the error message.</td>
    <td>This check validates that `JointRotation` attachment instances in an avatar or dynamic head conform to the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy requirements for joint rotation overrides. For specific asset types, the `JointRotation` orientation must match a predefined expected value.</td>
  </tr>
  <tr>
    <td>`JointRotation has been moved, but Marketplace uploads may not adjust this instance yet. Please reset position.`</td>
    <td>This error fires when the `JointRotation` attachment's position deviates more than the allowed threshold from the zero vector.<br /><br />To fix this, reset the `JointRotation` `Datatype.CFrame` position to (`0`, `0`, `0`) relative to its parent attachment.</td>
    <td>This check validates that `JointRotation` attachment instances in an avatar or dynamic head conform to the [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy requirements for joint rotation overrides. `JointRotation` attachments must remain at the origin position of their parent attachment.</td>
  </tr>
  <tr>
    <td>`Detected too many coplanar triangles intersecting in the model mesh. Edit the mesh to reduce coplanar triangle intersections.`</td>
    <td>This error fires when the percentage of coplanar intersecting triangles exceeds the allowed maximum.<br /><br />To fix this, clean up overlapping faces in your 3D modeling software by merging coincident vertices, removing duplicate faces, or adjusting geometry so triangles do not occupy the same plane.</td>
    <td>This check validates that a render mesh does not have an excessive number of coplanar intersecting triangles. Coplanar intersections (overlapping flat triangles in the same plane) cause Z- fighting visual artifacts, degrade rendering performance, and indicate poor mesh topology.</td>
  </tr>
  <tr>
    <td>`Instances have tags but Marketplace assets cannot have any tags.`</td>
    <td>This error fires when one or more instances in the asset tree have tags.<br /><br />To fix this, remove all tags from every instance in your asset before uploading.</td>
    <td>This check validates that no instances in the asset hierarchy, including hidden surface removal assets, have `Class.CollectionService` tags assigned to them. Tags on Marketplace assets could be exploited to interfere with game systems that use tag-based logic, creating security and gameplay integrity risks.</td>
  </tr>
  <tr>
    <td>`Failed to calculate asset CFrame. Make sure the character is in I pose, A pose, or T pose, and the parts are not all in the same position.`</td>
    <td>This error fires when the pose calculation fails entirely, usually because body parts are stacked at the same coordinates or attachments are missing.<br /><br />To fix this, ensure your avatar's body parts are arranged in a valid I, A, or T pose with proper spatial separation between limbs.</td>
    <td>This check validates that the system can compute the orientation and position of an arm or leg body part to verify it is posed correctly. The `Datatype.CFrame` calculation requires the parts to be spatially distinct and properly assembled.</td>
  </tr>
  <tr>
    <td>`Body part is pointing along the world Z vector. Make sure the character is in I pose, A pose, or T pose.`</td>
    <td>This error fires when the Y-axis projection of the limb onto the XY plane has zero length.<br /><br />To fix this, rotate the body part so it points outward or downward (consistent with I, A, or T pose) rather than forward along the Z axis.</td>
    <td>This check validates that arm and leg body parts are not oriented straight along the Z axis (pointing forward or backward). A limb aligned with the Z axis cannot be properly evaluated for its rest pose angle and indicates the model was exported with incorrect orientation.</td>
  </tr>
  <tr>
    <td>`Body part is at too steep an angle from the X,Y plane. Make sure the character is in I pose, A pose, or T pose.`</td>
    <td>This error fires when the limb's angle away from the XY plane exceeds the allowed threshold.<br /><br />To fix this, adjust the rotation of the affected arm or leg in your 3D modeling software so it lies closer to the horizontal plane in your rest pose.</td>
    <td>This check validates that arm and leg body parts do not tilt too far out of the horizontal XY plane. Limbs in a standard rest pose should be roughly parallel to the ground plane, with only minor deviation allowed (default: 20 degrees).</td>
  </tr>
  <tr>
    <td>`Body part angle on the X,Y plane is outside the acceptable range. Make sure the character is in I pose, A pose, or T pose.`</td>
    <td>This error fires when the limb's angle from the X axis on the XY plane is outside the acceptable minimum and maximum range for its type.<br /><br />To fix this, adjust the limb rotation in your 3D modeling software to match a standard I, A, or T pose orientation.</td>
    <td>This check validates that the projected angle of an arm or leg on the XY plane falls within the expected range for that limb type. Arms should extend roughly outward (between I pose and T pose angles) and legs should point roughly downward.</td>
  </tr>
  <tr>
    <td>`Instance has invalid properties that may contain NaN/Inf values or strings that are too long.`</td>
    <td>This error fires when the engine's property validation detects problematic values on an instance.<br /><br />To fix this, inspect the flagged instance's properties in Studio and reset any that show unusual values. Re-import the asset if properties were corrupted during export.</td>
    <td>This check validates that all property values on every instance in the asset are numerically valid and within reasonable size limits. Properties containing NaN (Not a Number), infinity, or excessively long strings can crash clients, corrupt save data, or be used for exploits.</td>
  </tr>
  <tr>
    <td>`A required property was not found on the instance.`</td>
    <td>This error fires when a property that should exist on a given class cannot be read from the instance.<br /><br />To fix this, ensure you are using the correct instance class and that your Studio version is up to date, then re-export the asset.</td>
    <td>This check validates that all instances in the asset have the properties expected for their class according to the validation schema. Missing properties can indicate an incompatible engine version, a corrupted instance, or an incorrect class being used.</td>
  </tr>
  <tr>
    <td>`A property value on the instance is invalid or outside the expected range.`</td>
    <td>This error fires when a property value fails a comparison test, such as being too large, not equal to the expected value, or not in the allowed list.<br /><br />To fix this, check the flagged property on the indicated instance and set it to the expected value as specified in the error details.</td>
    <td>This check validates that properties on asset instances hold values that meet the required constraints, such as exact match, range bounds, or allowed set. Incorrect property values can cause visual glitches, physics problems, or incompatibility with the avatar system.</td>
  </tr>
  <tr>
    <td>`Rigid accessory has skinning data which is not supported. Ensure bones are not imported with the mesh.`</td>
    <td>This error fires when the **Handle** mesh of a rigid accessory contains one or more bones.<br /><br />To fix this, remove all armature/skeleton data from your mesh in your 3D modeling software before exporting, or export without the skeleton option enabled.</td>
    <td>This check validates that rigid accessories do not contain any skinning or bone data in their mesh. Rigid accessories attach to the avatar at a fixed point and should not deform, so the presence of bones indicates an incorrect export configuration.</td>
  </tr>
  <tr>
    <td>`The AvatarPartScaleType value is invalid. Accepted values are Classic, ProportionsSlender, or ProportionsNormal.`</td>
    <td>This error fires when an **AvatarPartScaleType** `Class.StringValue` has a value other than `Classic`, `ProportionsSlender`, or `ProportionsNormal`.<br /><br />To fix this, change the `Value` property of the **AvatarPartScaleType** instance to one of the three accepted strings.</td>
    <td>This check validates that any **AvatarPartScaleType** `Class.StringValue` instances in the asset contain one of the three recognized scale types. The scale type controls how the body part scales with avatar proportions sliders and must be a recognized value for the system to function correctly.</td>
  </tr>
  <tr>
    <td>`To upload an asset to Roblox, you must select exactly 1 instance and the associated upload type.`</td>
    <td>This error fires when the upload input contains anything other than exactly one instance.<br /><br />To fix this, select only a single root instance (the top-level `Class.Accessory`, `Class.MeshPart`, or other asset root) before initiating the upload process.</td>
    <td>This check validates that exactly one root instance has been provided for upload when the asset type does not use the [standard R15 rig](../avatar/character-bodies/specifications.md#standard-r15-rigs) `Class.Folder` structure. Submitting zero or multiple instances would create ambiguity about which instance to publish.</td>
  </tr>
  <tr>
    <td>`Upload format does not match expected folder structure. Please try again or file a bug report.`</td>
    <td>This error fires when the upload does not contain all three required folders, when R6 has unexpected children, or when the `Class.Folder` contents do not match.<br /><br />To fix this, ensure your body part export follows the [standard R15 rig](../avatar/character-bodies/specifications.md#standard-r15-rigs) `Class.Folder` [template](../avatar/resources.md#project-files) with matching `R15ArtistIntent` and `R15Fixed` content.</td>
    <td>This check validates that body part uploads using the [standard R15 rig](../avatar/character-bodies/specifications.md#standard-r15-rigs) `Class.Folder` structure contain exactly three properly named folders (`R15ArtistIntent`, `R15Fixed`, and `R6`) with the correct hierarchy. This structure is required for body parts that support multiple avatar scale configurations.</td>
  </tr>
  <tr>
    <td>`SurfaceAppearance has an invalid AlphaMode. Expected Overlay.`</td>
    <td>This error fires when a `Class.SurfaceAppearance` instance uses any `Class.SurfaceAppearance.AlphaMode|AlphaMode` other than `Overlay`, such as `Transparency`.<br /><br />To fix this, change the `Class.SurfaceAppearance.AlphaMode|AlphaMode` to `Overlay` in Studio's Properties window.</td>
    <td>This check validates that `Class.SurfaceAppearance` instances on rigid accessories have their `Class.SurfaceAppearance.AlphaMode|AlphaMode` set to `Overlay`. The `Overlay` alpha mode is required to ensure consistent transparency handling and prevent visual artifacts on accessories.</td>
  </tr>
  <tr>
    <td>`Your layered clothing deforms beyond the acceptable size when placed on an avatar.`</td>
    <td>This error fires when the layered accessory mesh, after the engine simulates draping it on the body, produces a bounding box larger than the configured maximum for its attachment type.<br /><br />To fix this, reduce the overall size of your clothing mesh or adjust the [outer cage](../avatar/layered-accessories/specifications.md#outer-cage) so the garment conforms more tightly to the body when deformed.</td>
    <td>This check measures the post-deformation size of the layered accessory after it has been fitted onto a reference avatar body, ensuring the deformed garment does not exceed the maximum allowed dimensions. Oversized deformed clothing can cause rendering and clipping issues.</td>
  </tr>
  <tr>
    <td>`Handle contains a skinning transfer joint, which is only allowed when WrapLayer.AutoSkin is set to EnabledOverride.`</td>
    <td>This error fires when the **Handle** mesh contains a [skinning transfer](../avatar/automatic-skinning-transfer.md#special-skinning-transfer-joints) joint, such as `RBX_Leader` or `RBX_Follower`, but the `Class.WrapLayer.AutoSkin` property is not set to `EnabledOverride`.<br /><br />To fix this, set `Class.WrapLayer.AutoSkin|AutoSkin` to `EnabledOverride` to enable skinning transfer, or remove the transfer joints from the mesh.</td>
    <td>This check validates that the skinning (bone weighting) on a layered accessory handle mesh follows the allowed [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy, including correct use of skinning transfer joints for specialized accessory types. Transfer joints enable automatic skin-weight transfer for items like eyelashes.</td>
  </tr>
  <tr>
    <td>`Handle is skinned to a joint which is not part of the allowed schema. Only standard R15 joints and skinning transfer joints are permitted.`</td>
    <td>This error fires when the **Handle** mesh contains a bone/joint that is neither a [standard R15 rig](../avatar/character-bodies/specifications.md#standard-r15-rigs) joint nor an allowed [skinning transfer](../avatar/automatic-skinning-transfer.md#special-skinning-transfer-joints) joint.<br /><br />To fix this, remove the unrecognized joint from your mesh's skinning data in your 3D modeling software, keeping only [standard R15 rig](../avatar/character-bodies/specifications.md#standard-r15-rigs) joints and allowed skinning transfer joints.</td>
    <td>This check validates that the skinning on a layered accessory **Handle** mesh follows the allowed [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy, including correct use of [skinning transfer](../avatar/automatic-skinning-transfer.md#special-skinning-transfer-joints) joints for specialized accessory types. Only recognized joint names are permitted in the mesh bone data.</td>
  </tr>
  <tr>
    <td>`Vertices skinned to transfer joints must be fully weighted.`</td>
    <td>This error fires when one or more vertices that are skinned to a transfer joint like have less than full weight assigned to it, meaning other joints share influence on those vertices.<br /><br />To fix this, in your 3D modeling softwarre, ensure all vertices assigned to transfer joints have their weight fully normalized to those joints alone.</td>
    <td>This check validates that the skinning on a layered accessory **Handle** mesh follows the allowed [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy, including correct use of [skinning transfer](../avatar/automatic-skinning-transfer.md#special-skinning-transfer-joints) joints for specialized accessory types. Vertices assigned to transfer joints must have 100% of their weight on those joints.</td>
  </tr>
  <tr>
    <td>`This asset type must use skinning transfer. Please set WrapLayer. AutoSkin to EnabledOverride.`</td>
    <td>This error fires when an eyebrow or eyelash accessory does not have `Class.WrapLayer.AutoSkin` set to `EnabledOverride`, which is mandatory for these types to properly follow facial deformation.<br /><br />To fix this, set the `Class.WrapLayer.AutoSkin|AutoSkin` property to `EnabledOverride`.</td>
    <td>This check validates that the skinning on a layered accessory **Handle** mesh follows the allowed [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy, including correct use of [skinning transfer](../avatar/automatic-skinning-transfer.md#special-skinning-transfer-joints) joints for specialized accessory types. Certain accessory types are required to use the skinning transfer system, such as eyebrows and eyelashes.</td>
  </tr>
  <tr>
    <td>`This asset type must use skinning transfer, but is missing a required transfer joint.`</td>
    <td>This error fires when an eyebrow or eyelash accessory is missing one of the required skinning transfer joints from its mesh bone data, such as `RBX_Leader` or `RBX_Follower`.<br /><br />To fix this, add the missing transfer joint to your mesh's skeleton and properly weight the relevant vertices to it.</td>
    <td>This check validates that the skinning on a layered accessory **Handle** mesh follows the allowed [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy, including correct use of [skinning transfer](../avatar/automatic-skinning-transfer.md#special-skinning-transfer-joints) joints for specialized accessory types. Eyebrow and eyelash accessories must contain all required skinning transfer joints.</td>
  </tr>
  <tr>
    <td>`Handle is skinned to a standard body joint, but this asset type must only use skinning transfer joints.`</td>
    <td>This error fires when an eyebrow or eyelash accessory has vertices weighted to [standard R15 rig](../avatar/character-bodies/specifications.md#standard-r15-rigs) joints, such as `Head` or `Neck`, instead of exclusively using the required transfer joints.<br /><br />To fix this, re-skin your mesh so all vertices are weighted only to the allowed skinning transfer joints listed in the error.</td>
    <td>This check validates that the skinning on a layered accessory **Handle** mesh follows the allowed [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy, including correct use of [skinning transfer](../avatar/automatic-skinning-transfer.md#special-skinning-transfer-joints) joints for specialized accessory types. Eyebrow and eyelash accessories must be exclusively skinned to transfer joints, not [standard R15 rig](../avatar/character-bodies/specifications.md#standard-r15-rigs) joints.</td>
  </tr>
  <tr>
    <td>`Accessory does not have a Handle. Cannot validate layered clothing out of bounds.`</td>
    <td>This error fires when the layered accessory is missing its **Handle** mesh entirely, which means the clothing cannot be validated or rendered.<br /><br />To fix this, add a **Handle** mesh as a child of your `Class.Accessory` root instance containing the clothing mesh.</td>
    <td>This check validates that the layered accessory, when deformed and placed on an avatar, stays within the engine's render bounds to prevent visual artifacts and performance issues. The accessory must have the standard structure including a **Handle** mesh child.</td>
  </tr>
  <tr>
    <td>`Accessory does not have a WrapLayer. Cannot validate layered clothing out of bounds.`</td>
    <td>This error fires when the accessory's **Handle** mesh does not contain a `Class.WrapLayer` child instance.<br /><br />To fix this, add a `Class.WrapLayer` to the **Handle** mesh using the [Accessory Fitting Tool](../avatar/accessory-fitting-tool.md), which defines the inner and outer [cage meshes](../avatar/layered-accessories/specifications.md#cage-meshes) for body-conforming deformation.</td>
    <td>This check validates that the layered accessory, when deformed and placed on an avatar, stays within the engine's render bounds to prevent visual artifacts and performance issues. The **Handle** mesh must contain a `Class.WrapLayer` that defines how the clothing deforms over the body.</td>
  </tr>
  <tr>
    <td>`Accessory has a non-zero MaxSize.`</td>
    <td>This error fires when the `Class.WrapLayer.MaxSize` property is set to a non-zero vector, which could override the expected render bounds behavior.<br /><br />To fix this, set `Class.WrapLayer.MaxSize|MaxSize` to (`0`, `0`, `0`) in the Properties window before uploading.</td>
    <td>This check validates that the layered accessory, when deformed and placed on an avatar, stays within the engine's render bounds to prevent visual artifacts and performance issues. The `Class.WrapLayer.MaxSize` property must be zero to ensure the engine uses its standard sizing calculation.</td>
  </tr>
  <tr>
    <td>`Accessory has a non-zero Offset.`</td>
    <td>This error fires when the `Class.WrapLayer.Offset` property is set to a non-zero vector, which would shift the clothing's deformation origin away from its expected position.<br /><br />To fix this, set `Class.WrapLayer.Offset|Offset` to (`0`, `0`, `0`) in the Properties window before uploading.</td>
    <td>This check validates that the layered accessory, when deformed and placed on an avatar, stays within the engine's render bounds to prevent visual artifacts and performance issues. The `Class.WrapLayer.Offset` property must be zero to ensure the clothing deforms from its natural position.</td>
  </tr>
  <tr>
    <td>`Layered clothing validation failed. When deformed, layered clothing becomes too large.`</td>
    <td>This error fires when your layered accessory, after being deformed onto a reference avatar body by the engine, extends beyond the maximum render bounds.<br /><br />To fix this, reduce the size of your [outer cage](../avatar/layered-accessories/specifications.md#outer-cage) mesh or make the clothing geometry conform more closely to the body to keep it within bounds when deformed.</td>
    <td>This check validates that the layered accessory, when deformed and placed on an avatar, stays within the engine's render bounds to prevent visual artifacts and performance issues. The engine simulates the clothing on a body and checks whether the result exceeds rendering limits.</td>
  </tr>
  <tr>
    <td>`Engine feature for layered clothing out-of-bounds validation is not enabled.`</td>
    <td>This error fires when the required engine feature (`EngineUGCValidationLCOOB`) is not enabled in the current environment, preventing the bounds check from executing. This is typically a temporary platform state;<br /><br />To fix this, retry your upload later or contact support if this persists.</td>
    <td>This check validates that the layered accessory, when deformed and placed on an avatar, stays within the engine's render bounds to prevent visual artifacts and performance issues. This validation requires a specific engine feature to be active in order to run.</td>
  </tr>
  <tr>
    <td>`Eyelash has vertices skinned to RBX_Leader that are too far away from the eye landmarks on the inner cage.`</td>
    <td>This error fires when vertices skinned to `RBX_Leader` are located too far from the eye landmark positions defined on the inner cage UV reference, meaning the eyelash geometry will not deform correctly with eye movement.<br /><br />To fix this, reposition the `RBX_Leader` instance's weighted vertices in your 3D modeling software to be closer to the eye area of the inner cage.</td>
    <td>This check validates that eyelash accessory vertices weighted to the `RBX_Leader` [skinning transfer](../avatar/automatic-skinning-transfer.md#special-skinning-transfer-joints) joint are positioned near the eye region of the [inner cage](../avatar/layered-accessories/specifications.md#inner-cage) mesh. The `RBX_Leader` joint controls eye-tracking deformation, so weighted vertices must be close to the actual eye landmarks.</td>
  </tr>
  <tr>
    <td>`Hip rig attachment position is out of the allowed range. Please fix the Attachment.`</td>
    <td>This error fires when the hip rig attachment on a leg part is positioned too far inward (toward the center), which would cause the leg to overlap with the opposite leg when the avatar is assembled.<br /><br />To fix this, move the hip rig attachment outward (away from center) so the leg connects at an appropriate offset from the body midline.</td>
    <td>This check ensures that left and right leg [body parts](../avatar/character-bodies/specifications.md#body-parts) are properly separated from each other so they do not overlap when assembled on an avatar. It validates both the hip attachment positions and the physical bounding boxes of the legs.</td>
  </tr>
  <tr>
    <td>`Could not compute leg bounds. Please ensure all body part meshes are valid and try again.`</td>
    <td>This error fires when the system cannot calculate the bounding box geometry for the leg meshes, typically due to missing or corrupt mesh data.<br /><br />To fix this, ensure all leg-related `Class.MeshParts`, such as `UpperLeg`, `LowerLeg`, and `Foot`, have valid mesh data assigned and retry the upload.</td>
    <td>This check ensures that left and right leg body parts are properly separated from each other so they do not overlap when assembled on an avatar. For full body uploads, it computes combined bounding boxes for each complete leg to measure overlap.</td>
  </tr>
  <tr>
    <td>`The legs overlap on the x axis. Please adjust the legs to reduce overlap.`</td>
    <td>This error fires when the left and right legs overlap more than the allowed percentage of their width on the x-axis.<br /><br />To fix this, adjust the leg meshes or hip attachment positions so the legs have adequate separation between them; either slim the leg meshes or move the hip attachments further apart.</td>
    <td>This check ensures that left and right leg body parts are properly separated from each other so they do not overlap when assembled on an avatar. For full body uploads, it computes the x-axis overlap between the combined left leg bounding box and the combined right leg bounding box.</td>
  </tr>
  <tr>
    <td>`Failed to load texture for SurfaceAppearance. Make sure the texture exists and try again.`</td>
    <td>This error fires when a texture that needs opacity checking cannot be loaded from the `Class.SurfaceAppearance` instance.<br /><br />To fix this, verify that the `Class.SurfaceAppearance.ColorMap|ColorMap` and `Class.SurfaceAppearance.NormalMap|NormalMap` fields reference valid, uploaded texture assets and that they have not been deleted or corrupted.</td>
    <td>This check validates that the `Class.SurfaceAppearance.ColorMap|ColorMap` and `Class.SurfaceAppearance.NormalMap|NormalMap` textures on a rigid accessory's `Class.SurfaceAppearance` instance can be loaded for opacity verification. These textures must be readable so the system can confirm they are fully opaque as required.</td>
  </tr>
  <tr>
    <td>`Texture is not fully opaque. Please use an opaque texture.`</td>
    <td>This error fires when any pixel in `Class.SurfaceAppearance.ColorMap` or `Class.SurfaceAppearance.NormalMap` has an alpha value below `255`.<br /><br />To fix this, edit the texture in your image editor to remove all transparency (set alpha to 100% everywhere) and re-upload.</td>
    <td>This check validates that the `Class.SurfaceAppearance.ColorMap|ColorMap` and `Class.SurfaceAppearance.NormalMap|NormalMap` textures on a rigid accessory's `Class.SurfaceAppearance` instance are completely opaque (no transparent or semi-transparent pixels). Transparency in these base textures can cause rendering inconsistencies and unexpected visual results on rigid accessories.</td>
  </tr>
  <tr>
    <td>`TextureID and SurfaceAppearance are both defined on a MeshPart. Publishing will only use SurfaceAppearance.`</td>
    <td>This error fires when a `Class.MeshPart` has a non-empty `Class.MeshPart.TextureID|TextureID` property and also has a `Class.SurfaceAppearance` child instance.<br /><br />To fix this, remove either the `Class.MeshPart.TextureID|TextureID` value or the `Class.SurfaceAppearance` child to use a single, consistent texturing approach.</td>
    <td>This check validates that a `Class.MeshPart` does not simultaneously define both a `Class.MeshPart.TextureID|TextureID` (legacy texturing) and a `Class.SurfaceAppearance` child. Having both creates ambiguity about which texture system takes precedence and may produce unexpected visual results.</td>
  </tr>
  <tr>
    <td>`MeshPart has an empty TextureID and no child SurfaceAppearance instance. You need to define at least one.`</td>
    <td>This error fires when a `Class.MeshPart` has an empty `Class.MeshPart.TextureID|TextureID` and no `Class.SurfaceAppearance` child.<br /><br />To fix this, add either a valid `Class.MeshPart.TextureID|TextureID` to the `Class.MeshPart` or add a `Class.SurfaceAppearance` child with appropriate PBR [texture maps](../art/modeling/surface-appearance.md#texture-maps).</td>
    <td>This check validates that every `Class.MeshPart` in the asset has at least one form of texturing defined, either a `Class.MeshPart.TextureID|TextureID` or a `Class.SurfaceAppearance` child. A `Class.MeshPart` with neither will render with no texture, appearing as a solid untextured surface which is not acceptable for published assets.</td>
  </tr>
  <tr>
    <td>`Failed to load texture data for SurfaceAppearance map. Make sure the texture exists and try again.`</td>
    <td>This error fires when the system cannot retrieve the image size for a specific texture map on the `Class.SurfaceAppearance` instance.<br /><br />To fix this, verify that all texture map fields reference valid, accessible texture assets and re-upload any missing textures.</td>
    <td>This check validates that the individual PBR [texture maps](../art/modeling/surface-appearance.md#texture-maps) on a `Class.SurfaceAppearance` instance can be loaded for resolution verification. The system must read each texture to check its dimensions against per-map size limits.</td>
  </tr>
  <tr>
    <td>`Texture resolution is higher than the maximum supported size for that SurfaceAppearance map field.`</td>
    <td>This error fires when a texture map's width or height exceeds its specific limit.<br /><br />To fix this, resize the texture in your image editor to meet the per-field maximum before re-uploading.</td>
    <td>This check validates that each PBR [texture map](../art/modeling/surface-appearance.md#texture-maps) on a `Class.SurfaceAppearance` instance does not exceed its per-field maximum resolution. Different maps have different limits to balance quality with performance; for example, `Class.SurfaceAppearance.ColorMap|ColorMap` allows up to 1024px, while `Class.SurfaceAppearance.NormalMap|NormalMap`/`Class.SurfaceAppearance.MetalnessMap|MetalnessMap`/`Class.SurfaceAppearance.RoughnessMap|RoughnessMap` allow 256px.</td>
  </tr>
  <tr>
    <td>`The total surface area of the model mesh exceeds the maximum allowed. Reduce the number and/or size of triangles.`</td>
    <td>This error fires when the computed surface area of a mesh exceeds the configured threshold.<br /><br />To fix this, simplify your mesh by reducing triangle count, shrinking oversized faces, or removing interior/hidden geometry that inflates the total surface area.</td>
    <td>This check validates that the total geometric surface area of a render mesh stays within the allowed maximum. Excessive surface area relative to the bounding volume indicates overly complex or inefficient geometry that wastes rendering resources.</td>
  </tr>
  <tr>
    <td>`SurfaceAppearance has a TexturePack property with an invalid URL. Please fix the URL.`</td>
    <td>This error fires when a `Class.SurfaceAppearance` has a `Class.SurfaceAppearance.TexturePack|TexturePack` field with a malformed or empty URL.<br /><br />To fix this, regenerate the `Class.SurfaceAppearance.TexturePack` using the [Accessory Fitting Tool](../avatar/accessory-fitting-tool.md) or Studio's publishing workflow to obtain a valid URL.</td>
    <td>This check validates that the `Class.SurfaceAppearance.TexturePack|TexturePack` URL property on each `Class.SurfaceAppearance` instance points to a valid, accessible texture pack asset. TexturePacks provide compressed texture bundles for efficient delivery, and an invalid URL means the runtime cannot load the optimized textures.</td>
  </tr>
  <tr>
    <td>`Failed to download TexturePack for SurfaceAppearance.`</td>
    <td>This error fires when the system cannot download the `Class.SurfaceAppearance.TexturePack` asset from the provided URL. This may be a transient network issue;<br /><br />To fix this, try uploading again. If the error persists, regenerate the `Class.SurfaceAppearance.TexturePack` using the [Accessory Fitting Tool](../avatar/accessory-fitting-tool.md).</td>
    <td>This check validates that the `Class.SurfaceAppearance.TexturePack` referenced by a `Class.SurfaceAppearance` can be successfully downloaded and read. Network issues or deleted assets can prevent the pack from loading, blocking the consistency verification.</td>
  </tr>
  <tr>
    <td>`The textures in SurfaceAppearance do not match those in its TexturePack. Please fix the TexturePack.`</td>
    <td>This error fires when the engine detects texture content differences between the `Class.SurfaceAppearance` maps and the `Class.SurfaceAppearance.TexturePack`.<br /><br />To fix this, regenerate the `Class.SurfaceAppearance.TexturePack` from the current `Class.SurfaceAppearance` textures using the [Accessory Fitting Tool](../avatar/accessory-fitting-tool.md).</td>
    <td>This check validates that the individual [texture maps](../art/modeling/surface-appearance.md#texture-maps) on a `Class.SurfaceAppearance` instance are identical to those stored in its associated `Class.SurfaceAppearance.TexturePack|TexturePack`. A mismatch means the packed version is stale or was generated from different source textures, causing visual discrepancies between quality levels.</td>
  </tr>
  <tr>
    <td>`Failed to load texture data. Make sure the texture exists and try again.`</td>
    <td>This error fires when a texture asset cannot be loaded or its size cannot be determined.<br /><br />To fix this, verify that the `Class.MeshPart.TextureID` or `Class.SurfaceAppearance` texture map fields reference valid, uploaded texture assets and re-upload any missing textures.</td>
    <td>This check validates that textures referenced by [body part](../avatar/character-bodies/specifications.md#body-parts) `Class.MeshPart` instances and their `Class.SurfaceAppearance` instances can be loaded for resolution verification. The system must read the image data to check pixel dimensions against the allowed maximum for each asset type and texture field.</td>
  </tr>
  <tr>
    <td>`Texture resolution is higher than the maximum supported size for that field.`</td>
    <td>This error fires when a texture's width or height exceeds the configured limit for that asset type and texture field.<br /><br />To fix this, resize the texture in your image editor to fit within the maximum allowed resolution before re-uploading.</td>
    <td>This check validates that all textures on body parts and accessories do not exceed the maximum allowed pixel dimensions for their specific field and asset type. Oversized textures increase memory usage and download times, impacting performance for all players.</td>
  </tr>
  <tr>
    <td>`Invalid target asset for thumbnail generation. Expected it to be the Handle.`</td>
    <td>This error fires when the `ThumbnailCameraTarget` `Class.ObjectValue` references an instance other than the **Handle** mesh.<br /><br />To fix this, set the `ThumbnailCameraTarget` `Class.ObjectValue` to point to the **Handle** mesh of your accessory in Studio.</td>
    <td>This check validates that the `ThumbnailCameraTarget` in a `ThumbnailConfiguration` points to the accessory's **Handle** part. The thumbnail system uses this reference to frame the camera correctly for the Marketplace preview image.</td>
  </tr>
  <tr>
    <td>`Asset is positioned outside the thumbnail camera view. Reposition the asset at the center of the camera view.`</td>
    <td>This error fires when the engine determines that the mesh geometry does not intersect with the thumbnail camera's viewing frustum.<br /><br />To fix this, adjust the `ThumbnailCameraValue` `Datatype.CFrame` or reposition your mesh so it is centered within the camera's field of view.</td>
    <td>This check validates that the accessory's render mesh is visible within the thumbnail camera frustum defined by the `ThumbnailConfiguration`. If the mesh falls outside the camera view, the Marketplace thumbnail will appear empty or cut off.</td>
  </tr>
  <tr>
    <td>`Joint TposeAdjustment deviates too much from the recommended orientation.`</td>
    <td>This error fires when a joint's `TposeAdjustment` rotation differs from the expected orientation by more than the allowed threshold (typically 30 degrees).<br /><br />To fix this, reduce the rotation offset on the flagged joint to stay within the permitted range.</td>
    <td>This check validates that the T-pose adjustment rotation on each joint defined in a `Class.HumanoidRigDescription` stays within acceptable angular deviation from the expected orientation. T-pose adjustments fine-tune how the avatar's limbs align in rest pose, but excessive rotation breaks animation retargeting and causes visual artifacts.</td>
  </tr>
  <tr>
    <td>`Joint TposeAdjustment position is outside of acceptable bounds.`</td>
    <td>This error fires when a joint's `TposeAdjustment` position exceeds the computed threshold (a percentage of the body part's mesh dimensions).<br /><br />To fix this, reduce the positional offset on the flagged joint to keep it within the acceptable bounds relative to the body part size.</td>
    <td>This check validates that the T-pose adjustment translation on each joint defined in a `Class.HumanoidRigDescription` stays within a position offset proportional to the body part size. Large positional offsets disconnect the visual rig from the animation skeleton, causing limbs to appear detached or misaligned.</td>
  </tr>
  <tr>
    <td>`Detected zero-area triangle in model mesh. Edit the mesh to remove zero-area triangles.`</td>
    <td>This error fires when the engine's triangle area validation detects one or more degenerate triangles.<br /><br />To fix this, open your mesh in a 3D modeling software, select degenerate faces (those with collapsed edges or coincident vertices), and delete or repair them.</td>
    <td>This check validates that no triangles in the render mesh or outer cage mesh have zero geometric area. Zero-area (degenerate) triangles are invisible faces that waste polygon budget, can cause shading errors, and indicate topology problems in the mesh.</td>
  </tr>
  <tr>
    <td>`Model mesh triangle count is higher than the maximum supported value. Retopologize the model and try again.`</td>
    <td>This error fires when a mesh's triangle count exceeds the per-mesh maximum (typically the hat triangle limit).<br /><br />To fix this, retopologize your model in your 3D modeling software using decimation or manual edge loop reduction to bring the count below the limit.</td>
    <td>This check validates that each individual render mesh in an accessory does not exceed the maximum [triangle count](../avatar/rigid-accessories/specifications.md#geometry-and-budgets) allowed for accessories. Keeping triangle counts within budget ensures consistent performance across all devices and prevents any single item from consuming disproportionate rendering resources.</td>
  </tr>
  <tr>
    <td>`Total mesh triangle count for the body part exceeds the maximum supported number. Retopologize to reduce triangle count.`</td>
    <td>This error fires when the summed triangle count of all meshes in the body part exceeds the asset-type-specific maximum (with a small tolerance).<br /><br />To fix this, reduce overall mesh complexity by retopologizing in your 3D modeling software until the total fits within the budget for your body part type.</td>
    <td>This check validates that the combined [triangle count](../avatar/character-bodies/specifications.md#triangle-budgets) across all render meshes in a body part does not exceed the maximum allowed for that asset type. Different body parts have different budgets based on their visual importance and screen coverage.</td>
  </tr>
  <tr>
    <td>`Invalid vertex color found in mesh. Vertex color map must be all white (with no transparency for body parts).`</td>
    <td>This error fires when the engine's vertex color validation detects non-white or (for body parts) non-opaque vertex color values.<br /><br />To fix this, reset all vertex colors to white (RGB `1`, `1`, `1`) in your 3D modeling software before exporting. For body parts, also ensure alpha is set to `1.0`.</td>
    <td>This check validates that all vertex colors in render meshes are set to white and, for body parts, fully opaque. Non-white vertex colors can tint the mesh appearance in unintended ways, and transparent vertex colors on body parts can make portions of the avatar invisible.</td>
  </tr>
  <tr>
    <td>`The maximum vertex density has been exceeded. Reduce the number of vertices that are very close to each other.`</td>
    <td>This error fires when the engine detects too many vertices packed into a localized region of the mesh.<br /><br />To fix this, spread out clustered vertices or reduce local polygon density in your 3D modeling software by merging nearby vertices or simplifying the topology.</td>
    <td>This check validates that the spatial vertex density of a layered accessory mesh does not exceed the allowed threshold. Extremely dense clusters of vertices in a small area waste polygon budget without adding visual detail and can cause deformation artifacts when the clothing conforms to the body.</td>
  </tr>
  <tr>
    <td>`Cage mesh has too many vertices that are too close to each other. Edit to reduce coincident vertices.`</td>
    <td>This error fires when the percentage of similar vertices exceeds the allowed threshold.<br /><br />To fix this, edit your cage meshes in your 3D modeling software to ensure vertices are spatially distributed and not collapsed together, so each vertex contributes to a distinct cage shape.</td>
    <td>This check validates that the inner and outer [cage meshes](../avatar/layered-accessories/specifications.md#cage-meshes) of layered accessories do not have an excessive percentage of coincident or near-coincident vertices. High vertex similarity in cages indicates the mesh was not properly sculpted, which prevents the clothing deformation system from working correctly.</td>
  </tr>
  <tr>
    <td>`No ReferenceCageContent provided for the WrapTextureTransfer.`</td>
    <td>This error fires when `Class.WrapTextureTransfer.ReferenceCageMeshContent` is empty or has no URI.<br /><br />To fix this, assign a valid cage mesh asset to the `Class.WrapTextureTransfer.ReferenceCageMeshContent` in your makeup asset.</td>
    <td>This check validates that the `Class.WrapTextureTransfer` instance on a makeup decal has a `Class.WrapTextureTransfer.ReferenceCageMeshContent|ReferenceCageMeshContent` property pointing to a valid cage mesh. The reference cage defines the UV mapping surface that the makeup texture wraps onto, and without it the system cannot verify UV correctness.</td>
  </tr>
  <tr>
    <td>`Failed to load ReferenceCageContent for the WrapTextureTransfer.`</td>
    <td>This error fires when the referenced cage mesh asset exists but cannot be loaded, possibly because it's corrupted, deleted, or inaccessible.<br /><br />To fix this, re-upload the cage mesh asset or verify that the `Class.WrapTextureTransfer.ReferenceCageMeshContent` points to a valid, accessible mesh asset.</td>
    <td>This check validates that the reference cage mesh specified in `Class.WrapTextureTransfer.ReferenceCageMeshContent` can be successfully loaded and converted to an editable mesh. The cage data is needed to validate UV mappings for makeup texture placement.</td>
  </tr>
  <tr>
    <td>`Failed to load UVs for the WrapTextureTransfer cage. Make sure the UV map exists and try again.`</td>
    <td>This error fires when the system cannot extract UV values from the loaded cage mesh.<br /><br />To fix this, ensure the cage mesh was exported with valid UV coordinates and that the mesh file is not corrupted. Re-export from your 3D modeling software if needed.</td>
    <td>This check validates that the UV coordinates can be read from the reference cage mesh for comparison against the expected template values. UV data is essential for verifying that the makeup texture will map correctly onto the avatar's face.</td>
  </tr>
  <tr>
    <td>`Found invalid UV value for the cage. Edit the UV map to fix this issue.`</td>
    <td>This error fires when the cage mesh UV values do not match the required reference UV template.<br /><br />To fix this, replace the cage mesh with one that uses the standard head cage UV layout, or re-export from the [official cage template](../avatar/makeup/index.md#template-heads).</td>
    <td>This check validates that the UV coordinates in the reference cage mesh match the expected [template](../avatar/makeup/index.md#template-heads) values defined for the head cage. Correct UVs ensure that makeup textures align properly with facial features when applied to any avatar head.</td>
  </tr>
  <tr>
    <td>`WrapTextureTransfer UVMinBound does not match the required value.`</td>
    <td>This error fires when the `Class.WrapTextureTransfer.UVMinBound` property differs from the required value.<br /><br />To fix this, set `Class.WrapTextureTransfer.UVMinBound` to the exact required coordinates (these are fixed values defined by the makeup system specification).</td>
    <td>This check validates that the `Class.WrapTextureTransfer.UVMinBound` property matches the expected minimum UV coordinate for makeup assets. This bound defines the lower corner of the UV space used for texture mapping and must be exact for proper alignment.</td>
  </tr>
  <tr>
    <td>`WrapTextureTransfer UVMaxBound does not match the required value.`</td>
    <td>This error fires when the `Class.WrapTextureTransfer.UVMaxBound` property differs from the required value.<br /><br />To fix this, set `Class.WrapTextureTransfer.UVMaxBound` to the exact required coordinates (these are fixed values defined by the makeup system specification).</td>
    <td>This check validates that the `Class.WrapTextureTransfer.UVMaxBound` property matches the expected maximum UV coordinate for makeup assets. This bound defines the upper corner of the UV space and must be exact for the texture to map correctly across the full face area.</td>
  </tr>
  <tr>
    <td>`Animation is too short ({duration} seconds). Emote animations must be longer than {minLength} seconds.`</td>
    <td>This error triggers when the animation duration falls at or below the configured minimum length threshold, currently sourced from the `FString` flag.<br /><br />To fix it, extend your animation timeline so the total duration exceeds the minimum required seconds.</td>
    <td>This check measures the duration of emote animations to ensure they meet minimum length requirements for a good player experience. Emotes that are too short feel abrupt and fail to convey meaningful expression. </td>
  </tr>
  <tr>
    <td>`Animation is too long ({duration} seconds). Emote animations must be at most {maxLength} seconds long.`</td>
    <td>This error triggers when the animation duration exceeds the configured maximum length threshold.<br /><br />To fix it, trim your animation timeline so the total duration does not exceed the maximum allowed seconds.</td>
    <td>This check measures the duration of emote animations to ensure they stay within the maximum allowed length for Marketplace content. Excessively long emotes disrupt gameplay flow and consume excessive resources. </td>
  </tr>
  <tr>
    <td>`Your body contains small disconnected mesh components (mesh islands). Please remove floating geometry and ensure all mesh parts are properly connected.`</td>
    <td>This error triggers when the ML-based mesh island score falls below the minimum threshold (default `92`), indicating the model has identified significant disconnected components that should not be present.<br /><br />To fix it, inspect each [body part](../avatar/character-bodies/specifications.md#body-parts) mesh for small floating pieces of geometry and either delete them or merge them into the main mesh body.</td>
    <td>This check uses a machine learning model to detect problematic disconnected mesh components in [character body](../avatar/character-bodies/index.md) avatars. Small floating geometry fragments degrade visual quality, waste polygon budget, and can cause physics/collision issues. </td>
  </tr>
  <tr>
    <td>`Asset quality: {partName} has {num_disconnected_components} disconnected components, which exceeds the maximum of {max_disconnected_components}.`</td>
    <td>This error triggers when any `Class.MeshPart` has more disconnected components than the allowed maximum (default `10`).<br /><br />To fix it, merge small floating pieces into the main mesh or delete unnecessary disconnected geometry until the component count is within limits.</td>
    <td>This check counts the number of fully disconnected mesh components in each `Class.MeshPart` and enforces a hard maximum. Too many disconnected components indicate the mesh contains excessive floating geometry that increases complexity without visual benefit. </td>
  </tr>
  <tr>
    <td>`Asset quality: {partName} has {num_small_volume_islands} small disconnected islands out of {num_disconnected_components} components (score: {score}).`</td>
    <td>This error or warning triggers when the mesh island volume score falls below `100`, indicating the presence of small disconnected components relative to the main mesh body.<br /><br />To fix it, identify and remove tiny floating mesh fragments that do not contribute to the intended asset shape.</td>
    <td>This check evaluates the volume distribution of disconnected mesh components, identifying small volume islands that are likely debris or artifacts rather than intentional geometry. Small volume islands waste polygon budget and can cause visual noise or physics issues. </td>
  </tr>
  <tr>
    <td>`Asset quality: {partName} mesh is not watertight ({boundary_edges_percent}% boundary edges).`</td>
    <td>This error or warning triggers when any `Class.MeshPart` has boundary edges present, excluding `Head` parts which intentionally have eye/mouth openings.<br /><br />To fix it, lose all open edges in your mesh by filling holes, merging border vertices, or capping open areas so the mesh forms a complete closed surface.</td>
    <td>This check evaluates whether the mesh is watertight, meaning it has no boundary edges or open holes in its surface. Watertight meshes are required for correct physics simulation, cage-based deformation, and consistent rendering without visible gaps. </td>
  </tr>
</tbody>
</Table>

## Visualization checks

The UGC validation system includes optional visualization tools with checks to help you identify, understand, diagnose, and fix avatar assets that aren't yet ready to be on the Marketplace. When active, the visualization checks provide information on validation errors for non-compliant assets, and quality assessments for compliant assets that could use improvement.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/avatar/validation-system/Validation-Icons.png" width="85%" />
    <figcaption>Red icons provide information on what areas are failing validation and yellow warnings indicate areas of improvement.</figcaption>
  </figure>
  <figure>
    <img src="../assets/avatar/validation-system/Goblin-Validation.png" width="100%" />
    <figcaption>When you select an error or warning, visual elements display in the viewport to help you understand the error or warning.</figcaption>
  </figure>
</GridContainer>

To access the UGC validation system's visualization tools, you must first enable the beta feature. To enable and use the optional visualization checks:

1. In Studio, navigate to **File** > **Beta Features**.
1. Enable **Visualizing UGC Validation**.
1. Restart Studio, then in the mezzanine, click the plus icon to add a custom tab. A new tab displays.

   <img src="../assets/studio/general/Toolbar-Add-Custom-Tab.png" width="800" alt="Button to add custom tab indicated in Studio's mezzanine." />

1. In your custom tab, click the **Add tools** button. The **Add Tools** pop-up window displays.

   <img src="../assets/studio/general/Toolbar-Custom-Tab-Add-Tool.png" width="800" alt="Button to add new tool to a custom tab in Studio's toolbar." />

1. Enable **UGC Validation** to add it to your toolbar, then close the window.
1. Navigate back to your custom tab and select the **UGC Validation** button to run the plugin. A **UGC Validation** window displays.
1. In the **Explorer** window, select a character body, dynamic head, rigid accessory, or layered accessory, then navigate back to the **UGC Validation** window and click the **Run validation** button. A pop-up window displays.
1. In the pop-up window:

   1. Confirm the asset type of the avatar asset that you selected. For example, if you selected a `Enum.AccessoryType.Pants` layered accessory, use the drop-down menu to select **PantsAccessory**.

      <img src="../assets/avatar/validation-system/Validation-Popup.png" width="70%" alt="" />

   1. Click the **Run validation** button.

The validation service will run in the background and report back results in the **UGC Validation** window as a combination of errors and/or warnings, and an asset quality score that measures your asset's technical quality, including its mesh, UVs, and textures. Scores range from `0` to `100`, with higher scores meaning higher technical quality. Scores help identify high-definition assets and support Marketplace discovery, but low scores alone don't prevent you from publishing to the Marketplace.

### Measure_Cage_Distance_Head

`Measure_Cage_Distance_Head` is a validation check that scores how closely the avatar head's outer cage hugs the head mesh, checking that the cage neither floats too far from the mesh nor sinks inside it.

<Table tableStyle={{tableLayout:"fixed", width:"100%", wordBreak:"break-word"}}>
  <thead>
    <tr>
    <th style={{width:"25%"}}>Error message</th>
    <th style={{width:"35%"}}>How to fix</th>
    <th style={{width:"40%"}}>Why is this check important?</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>`Head cage is too far from Head mesh. Maximum distance between head cage and mesh is {max_sdf}, which is above allowed threshold {max_sdf_threshold}.`</td>
    <td>This error triggers when the maximum distance from any cage vertex to the mesh surface exceeds the allowed threshold (default `0.60` units).<br /><br />To fix it, adjust your [head outer cage](../avatar/dynamic-heads/specifications.md#head-cage) vertices so they sit closer to the head mesh surface without large gaps.</td>
    <td>This check measures the spatial distance between the [head outer cage](../avatar/dynamic-heads/specifications.md#head-cage) and the [head render mesh](../avatar/character-bodies/specifications.md#body-parts) using signed distance fields (SDF). The cage must wrap closely around the mesh for layered accessories to deform correctly on the head. For more information on caging dynamic heads, see [Dynamic head caging best practices](../avatar/dynamic-heads/caging-best-practices.md).</td>
  </tr>
  <tr>
    <td>`Head cage intersects with head mesh. {negtiveSDFPercent}% of head cage vertices are inside head mesh.`</td>
    <td>This error triggers when the percentage of cage vertices with negative signed distance (inside the mesh) exceeds the allowed threshold (default `30%`).<br /><br />To fix it, move intruding cage vertices outward so they sit on or outside the head mesh surface.</td>
    <td>This check detects cage vertices that penetrate inside the head mesh rather than wrapping around it. Cage vertices inside the mesh cause layered accessories to clip through the head during deformation. For more information on caging dynamic heads, see [Dynamic head caging best practices](../avatar/dynamic-heads/caging-best-practices.md).</td>
  </tr>
  <tr>
    <td>`Asset quality warning: Head cage distance score is {score}. Max distance between head cage and mesh is {max_distance}, {negative_sdf_percent}% of head cage vertices are inside head mesh.`</td>
    <td>This warning triggers when the cage distance score is below `100`, indicating the cage could be better fitted to the mesh.<br /><br />To address it, review the reported max distance and penetration percentage to identify areas where the cage needs tightening or outward adjustment.</td>
    <td>This check evaluates the overall quality of head cage-to-mesh alignment and produces a composite score. Good cage alignment ensures that layered accessories deform naturally on dynamic heads without gaps or clipping.</td>
  </tr>
</tbody>
</Table>

### Measure_Cage_Mesh_Distance

`Measure_Cage_Mesh_Distance` is a validation check that scores how closely the layered accessory's outer cage tracks the rendered mesh, flagging when a cage drifts too far away or pushes inside the mesh.

<Table tableStyle={{tableLayout:"fixed", width:"100%", wordBreak:"break-word"}}>
  <thead>
    <tr>
    <th style={{width:"25%"}}>Error message</th>
    <th style={{width:"35%"}}>How to fix</th>
    <th style={{width:"40%"}}>Why is this check important?</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>`Outer cage is too far from the render mesh. Maximum distance between outer cage and mesh is {max_sdf}, which is above allowed threshold {max_sdf_threshold}.`</td>
    <td>This error triggers when the maximum distance from any outer cage vertex to the mesh surface exceeds the allowed threshold (default `0.60` units).<br /><br />To fix it, reshape your outer cage so all vertices remain within the allowed distance from the layered accessory mesh.</td>
    <td>This check measures the spatial distance between the [outer cage](../avatar/layered-accessories/specifications.md#outer-cage) and the render mesh for layered accessories. The outer cage defines where clothing layers sit on the avatar, so it must closely follow the accessory mesh.</td>
  </tr>
  <tr>
    <td>`Outer cage intersects with the render mesh. {negtiveSDFPercent}% of outer cage vertices are inside render mesh.`</td>
    <td>This error triggers when the percentage of cage vertices with negative signed distance exceeds the allowed threshold (default `30%`).<br /><br />To fix it, pull intruding outer cage vertices outward so they wrap around the render mesh rather than cutting through it.</td>
    <td>This check detects [outer cage](../avatar/layered-accessories/specifications.md#outer-cage) vertices that have penetrated inside the layered accessory render mesh. Cage vertices inside the mesh cause visual clipping when other clothing layers are worn over the accessory.</td>
  </tr>
  <tr>
    <td>`Asset quality warning: Cage-to-mesh distance score is {score}. Max distance between outer cage and mesh is {max_distance}, {negative_sdf_percent}% of outer cage vertices are inside render mesh.`</td>
    <td>This warning triggers when the cage distance score is below `100`, meaning the cage fit could be improved.<br /><br />To address it, review the max distance and penetration metrics to identify which cage areas need adjustment for better mesh coverage.</td>
    <td>This check evaluates the overall quality of cage-to-mesh alignment for layered accessories and produces a composite score. Proper cage alignment ensures that additional clothing layers deform correctly when worn over the accessory.</td>
  </tr>
</tbody>
</Table>

### Measure_Cage_Mesh_Distance_Avatar

`Measure_Cage_Mesh_Distance_Avatar` is a validation check that scores how closely the full body outer cage follows the body mesh, flagging when a cage floats too far off the surface or intersects it.

<Table tableStyle={{tableLayout:"fixed", width:"100%", wordBreak:"break-word"}}>
  <thead>
    <tr>
    <th style={{width:"25%"}}>Error message</th>
    <th style={{width:"35%"}}>How to fix</th>
    <th style={{width:"40%"}}>Why is this check important?</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>`Body cage is too far from the body mesh. Maximum distance between body cage and mesh is {max_sdf}, which is above allowed threshold {max_sdf_threshold}.`</td>
    <td>This error triggers when the maximum distance from any body cage vertex to the mesh surface exceeds the allowed threshold (default `0.60` units).<br /><br />To fix it, reshape the body cage vertices to follow the body mesh contours more closely.</td>
    <td>This check measures the spatial distance between the [body cage](../avatar/character-bodies/specifications.md#outer-cages) and the [body render mesh](../avatar/character-bodies/specifications.md#body-parts) for full body avatar bundles. The body cage defines the deformation volume for all layered accessories, so it must closely envelop the body mesh.</td>
  </tr>
  <tr>
    <td>`Body cage intersects with the body mesh. {negtiveSDFPercent}% of body cage vertices are inside the body mesh.`</td>
    <td>This error triggers when the percentage of cage vertices with negative signed distance exceeds the allowed threshold (default `30%`).<br /><br />To fix it, move the intruding cage vertices outward so the cage fully wraps around the body mesh without intersecting it.</td>
    <td>This check detects [body cage](../avatar/character-bodies/specifications.md#outer-cages) vertices that have penetrated inside the avatar [body mesh](../avatar/character-bodies/specifications.md#body-parts). Interior cage vertices cause layered accessories to clip through the body during deformation and animation.</td>
  </tr>
  <tr>
    <td>`Asset quality warning: Body cage distance score is {score}. Max distance between body cage and mesh is {max_distance}, {negative_sdf_percent}% of body cage vertices are inside the body mesh.`</td>
    <td>This warning triggers when the body cage distance score is below `100`, indicating the cage could be better fitted.<br /><br />To address it, review the distance and penetration metrics per [body part](../avatar/character-bodies/specifications.md#body-parts) to identify areas needing cage adjustment.</td>
    <td>This check evaluates the overall quality of body cage-to-mesh alignment for full body bundles and produces a composite score. Proper cage fit across all [body parts](../avatar/character-bodies/specifications.md#body-parts) ensures layered accessories deform uniformly without visible gaps or penetration.</td>
  </tr>
</tbody>
</Table>

### Measure_Cage_Relevancy

`Measure_Cage_Relevancy` is a validation check that scores how much of the outer cage you moved actually sits over the accessory, so cage edits stay where the garment needs them.

<Table tableStyle={{tableLayout:"fixed", width:"100%", wordBreak:"break-word"}}>
  <thead>
    <tr>
    <th style={{width:"25%"}}>Error message</th>
    <th style={{width:"35%"}}>How to fix</th>
    <th style={{width:"40%"}}>Why is this check important?</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>`The outer cage has too many irrelevant modified vertices. {outer_cage_face_irrelevant_percent}% of the modified outer cage vertices do not cover the accessory.`</td>
    <td>This error triggers when fewer than `40%` of cage face modifications are relevant to the accessory, meaning that over `60%` of edits are irrelevant.<br /><br />To fix it, reset cage vertices that are far from your layered accessory back to default and only modify vertices directly covering the accessory area.</td>
    <td>This check measures what percentage of [outer cage](../avatar/layered-accessories/specifications.md#outer-cage) vertex modifications actually correspond to the layered accessory shape versus unnecessary edits elsewhere on the cage. Irrelevant cage edits waste deformation budget and can cause unexpected clothing behavior in areas far from the accessory.</td>
  </tr>
  <tr>
    <td>`Asset quality warning: Cage relevancy score is {score}. {irrelevant_percent}% of the modified outer cage vertices do not cover the accessory.`</td>
    <td>This warning triggers when the cage relevancy score is below `100`, meaning some cage edits are not directly serving the layered accessory's shape.<br /><br />To address it, consider reducing cage modifications in areas far from your accessory geometry.</td>
    <td>This check evaluates how well the [outer cage](../avatar/layered-accessories/specifications.md#outer-cage) modifications target the actual layered accessory region and produces a relevancy score. Focused cage edits produce better layered accessory behavior because only the relevant area deforms for the accessory.</td>
  </tr>
</tbody>
</Table>

### Measure_Cage_UV

`Measure_Cage_UV` is a validation check that checks whether the inner and outer cage UVs match the layered accessory template; UVs that don't match the layered accessory template break how the asset wraps over the body.

<Table tableStyle={{tableLayout:"fixed", width:"100%", wordBreak:"break-word"}}>
  <thead>
    <tr>
    <th style={{width:"25%"}}>Error message</th>
    <th style={{width:"35%"}}>How to fix</th>
    <th style={{width:"40%"}}>Why is this check important?</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>`There are {incorrect_uv_count} UV values in cage {cage_name} that are incorrect or do not belong to the template. Please correct the cage UV.`</td>
    <td>This error triggers when the number of incorrect UV values in a cage exceeds the allowed threshold (default `100` incorrect UVs).<br /><br />To fix it, re-export your cage from the [template file](../avatar/resources.md#project-files) without modifying its UV layout, or correct any stray UV values back to template coordinates.</td>
    <td>This check validates that UV coordinates on inner and [outer cage meshes](../avatar/layered-accessories/specifications.md#cage-meshes) match the expected [template](../avatar/resources.md#project-files) values for layered accessories. Cage UVs must precisely match the template for the deformation system to correctly map layered accessory textures and vertices between layers.</td>
  </tr>
  <tr>
    <td>`Asset quality warning: Cage UV score is {score} for {cage_name}. Incorrect UV count: {incorrect_uv_count}.`</td>
    <td>This warning triggers when the cage UV score is below `100`, indicating some UV values deviate from the expected [template](../avatar/resources.md#project-files).<br /><br />To address it, review the flagged cage and verify its UV coordinates match the original template without unintended modifications.</td>
    <td>This check evaluates the accuracy of cage UV coordinates against the [template](../avatar/resources.md#project-files) and produces a quality score per cage. Correct cage UVs are essential for the layered accessory system to properly transfer deformation data between cages.</td>
  </tr>
</tbody>
</Table>

### Measure_Cage_UV_Avatar

`Measure_Cage_UV_Avatar` is a validation check that checks that each [body part](../avatar/character-bodies/specifications.md#body-parts) has a cage that keeps its UVs on the standard template; wrong cage UVs distort how layered accessories wraps over the body.

<Table tableStyle={{tableLayout:"fixed", width:"100%", wordBreak:"break-word"}}>
  <thead>
    <tr>
    <th style={{width:"25%"}}>Error message</th>
    <th style={{width:"35%"}}>How to fix</th>
    <th style={{width:"40%"}}>Why is this check important?</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>`There are {incorrect_uv_count} UV values in cage {cage_name} that are incorrect or do not belong to the template. Please correct the cage UV.`</td>
    <td>This error triggers when any [body part cage](../avatar/character-bodies/specifications.md#outer-cages) has more incorrect UV values than the per-part threshold (default `7` incorrect UVs).<br /><br />To fix it, re-export the affected body part cage from a [standard R15 rig template](../avatar/resources.md#project-files) without altering its UV layout.</td>
    <td>This check validates that UV coordinates on body part cages match the expected [standard R15 rig template](../avatar/resources.md#project-files) values across all body parts in a full body bundle. Each body part cage must preserve template UVs for the deformation system to correctly map clothing across the entire avatar.</td>
  </tr>
  <tr>
    <td>`Asset quality warning: Cage UV score is {score} for {cage_name}. Incorrect UV count: {incorrect_uv_count}.`</td>
    <td>This warning triggers when any body part cage UV score is below `100`, indicating template UV deviations.<br /><br />To address it, check the reported body part cage and verify its UV coordinates match the [standard R15 rig template](../avatar/resources.md#project-files) precisely.</td>
    <td>This check evaluates the accuracy of cage UV coordinates across all body part cages in a full body bundle against the [standard R15 rig template](../avatar/resources.md#project-files). Correct UVs on every body part cage ensure that layered accessories map correctly across the full avatar without seams or distortion.</td>
  </tr>
</tbody>
</Table>

### Measure_Degen_Triangles

`Measure_Degen_Triangles` is a validation check that scores each mesh part for degenerate triangles (faces with zero or near-zero area); degenerate triangles add no surface and can break rendering.

<Table tableStyle={{tableLayout:"fixed", width:"100%", wordBreak:"break-word"}}>
  <thead>
    <tr>
    <th style={{width:"25%"}}>Error message</th>
    <th style={{width:"35%"}}>How to fix</th>
    <th style={{width:"40%"}}>Why is this check important?</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>`Asset quality: {partName} has {degenerate_triangle_percent}% degenerate triangles (score: {score}).`</td>
    <td>This warning triggers when any mesh part contains degenerate triangles that lower its score below `100`.<br /><br />To address it, remove zero-area faces in your 3D modeling software by merging overlapping vertices or deleting collapsed triangles.</td>
    <td>This check measures the percentage of degenerate (zero-area or near-zero-area) triangles in each mesh part. Degenerate triangles add polygon count without contributing visible surface area, waste rendering resources, and can cause shading artifacts or physics issues.</td>
  </tr>
</tbody>
</Table>

### Measure_Dynamic_Head

`Measure_Dynamic_Head` is a validation check that verifies whether a [dynamic head](../avatar/dynamic-heads/index.md) is animatable. Dynamic heads that are animatable have a head cage, FACS data, aligned landmarks, and can close their eyes, open their mouth, and express emotions.

<Table tableStyle={{tableLayout:"fixed", width:"100%", wordBreak:"break-word"}}>
  <thead>
    <tr>
    <th style={{width:"25%"}}>Error message</th>
    <th style={{width:"35%"}}>How to fix</th>
    <th style={{width:"40%"}}>Why is this check important?</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>`Cannot detect left eye close expression for the dynamic head. Please adjust cage landmarks for the left eye to match where the left eye on the head and make sure it can be closed.`</td>
    <td>This error triggers when the left eye close metric falls below the minimum quality threshold, meaning the system cannot detect proper eyelid closure.<br /><br />To fix it, adjust the [cage landmarks](../avatar/dynamic-heads/specifications.md#facial-landmarks) around the left eye so they align with the mesh eye geometry, and allow the eyelid vertices to move into a fully closed position.</td>
    <td>This check verifies that the dynamic head can perform the `LeftEyeClosed` [facial expression](../avatar/dynamic-heads/facs-poses-reference.md#lefteyeclosed) using Facial Action Coding System blendshapes. Dynamic heads must demonstrate functional facial expressions for avatar communication and emotes.</td>
  </tr>
  <tr>
    <td>`Cannot detect right eye close expression for the dynamic head. Please adjust cage landmarks for the right eye to match where the right eye on the head and make sure it can be closed.`</td>
    <td>This error triggers when the right eye close metric falls below the minimum quality threshold, meaning the system cannot detect proper eyelid closure.<br /><br />To fix it, adjust the [cage landmarks](../avatar/dynamic-heads/specifications.md#facial-landmarks) around the right eye so they align with the mesh eye geometry and allow the eyelid vertices to move into a fully closed position.</td>
    <td>This check verifies that the dynamic head can perform the `RightEyeClosed` [facial expression](../avatar/dynamic-heads/facs-poses-reference.md#righteyeclosed) using Facial Action Coding System blendshapes. Dynamic heads must demonstrate functional facial expressions for proper avatar animation and communication.</td>
  </tr>
  <tr>
    <td>`Cannot detect mouth open expression for the dynamic head. Please adjust cage landmarks for mouth to match where the mouth on the head and make sure it can open.`</td>
    <td>This error triggers when the mouth open metric falls below the minimum quality threshold, meaning the system cannot detect proper jaw/lip separation.<br /><br />To fix it, adjust the [cage landmarks](../avatar/dynamic-heads/specifications.md#facial-landmarks) around the mouth so they align with the mesh mouth geometry and allow the jaw vertices to move into an open position.</td>
    <td>This check verifies that the dynamic head can perform [facial expressions](../avatar/dynamic-heads/specifications.md#facs-animation) for opening the mouth using Facial Action Coding System blendshapes. A working mouth open is fundamental for speech animation and emote expressions on avatar heads.</td>
  </tr>
  <tr>
    <td>`Cannot detect smile expression for the dynamic head. Please adjust cage landmarks for the mouth to match where the mouth on the head and make sure it can show smile expression.`</td>
    <td>This error triggers when the happiness/smile metric falls below the minimum quality threshold, meaning the system cannot detect a recognizable smile shape.<br /><br />To fix it, adjust the [cage landmarks](../avatar/dynamic-heads/specifications.md#facial-landmarks) around the mouth corners so they can pull upward and outward into a clear smile position.</td>
    <td>This check verifies that the dynamic head can display a smile expression using Facial Action Coding System blendshapes, such as `LeftLipCornerPuller` and `RightLipCornerPuller`. Emotional expressions like smiling are essential for social interaction and emotes in games.</td>
  </tr>
  <tr>
    <td>`Cannot detect frown expression for the dynamic head. Please adjust cage landmarks for the mouth to match where the mouth on the head and make sure it can show frown expression.`</td>
    <td>This error triggers when the sadness/frown metric falls below the minimum quality threshold, meaning the system cannot detect a recognizable frown shape.<br /><br />To fix it, adjust the [cage landmarks](../avatar/dynamic-heads/specifications.md#facial-landmarks) around the mouth corners so they can pull downward into a clear frown position.</td>
    <td>This check verifies that the dynamic head can display a frown expression using Facial Action Coding System blendshapes, such as `LeftLipCornerDown` and `RightLipCornerDown`. Emotional expressions like frowning provide important emotional range for avatar communication.</td>
  </tr>
  <tr>
    <td>`Dynamic heads on the Marketplace must be properly caged so that the eyes and mouth vertices on the cage line up with the mesh vertices. Please improve your caging and its alignment with the mesh.`</td>
    <td>This error triggers when the Asset Quality Service detects invalid landmarks, indicating the cage control points for eyes and mouth do not correspond to their mesh counterparts.<br /><br />To fix it, [realign the cage](../avatar/dynamic-heads/caging-best-practices.md#enclose-the-cage) so that eye and mouth landmark vertices sit precisely on the matching mesh surface points.</td>
    <td>This check verifies that the [cage landmark](../avatar/dynamic-heads/specifications.md#facial-landmarks) positions align correctly with the corresponding mesh vertices on the dynamic head. Proper landmark alignment is required for the Facial Action Coding System to drive facial expressions accurately by mapping cage deformations to mesh vertices.</td>
  </tr>
  <tr>
    <td>`Dynamic heads on the Marketplace must be animated, but this head has no FACS data.`</td>
    <td>This error triggers when the Asset Quality Service reports `NO_FACS`, meaning no facial animation control data was found in the head asset.<br /><br />To fix it, ensure your dynamic head includes properly configured FACS blendshape data following the Roblox dynamic head template.</td>
    <td>This check verifies that the dynamic head contains Facial Action Coding System data needed to drive facial expressions. Without FACS data, the head cannot animate expressions like blinking, smiling, or talking, which are required for dynamic heads on the Marketplace.</td>
  </tr>
  <tr>
    <td>`Dynamic heads on the Marketplace have no Head cages. Please create Head cage for the dynamic head.`</td>
    <td>This error triggers when the Asset Quality Service reports `MISSING_CAGE_INFO`, meaning no cage geometry was found in the head asset.<br /><br />To fix it, create and include a properly structured [inner and outer cage](../avatar/dynamic-heads/specifications.md#head-cage) for the head that conforms to the head cage template.</td>
    <td>This check verifies that the dynamic head asset includes the required head cage mesh used for facial deformation and layered accessory support. The head cage is essential for mapping FACS expressions and enabling clothing to layer properly on the head.</td>
  </tr>
  <tr>
    <td>`Asset quality warning: Dynamic head expression score is {score}.`</td>
    <td>This warning triggers when the dynamic head expression score is below `100`, meaning one or more expressions could be improved even though they pass the minimum threshold.<br /><br />To address it, review which individual expression metrics are scoring lowest and refine those cage landmark positions.</td>
    <td>This check evaluates the overall expression quality of the dynamic head across all measured facial metrics and produces a composite score. A high score indicates the head can clearly perform all [required facial expressions](../avatar/dynamic-heads/specifications.md#facs-animation).</td>
  </tr>
</tbody>
</Table>

### Measure_Joint_Number

`Measure_Joint_Number` is a validation check that scores the body rig's [joint setup](../avatar/character-bodies/specifications.md#rigging) against the expected configuration. The body rig's joint setup includes the joint counts in the left and right hands for [advanced R15 rigs](../avatar/character-bodies/specifications.md#advanced-r15-rigs).

<Table tableStyle={{tableLayout:"fixed", width:"100%", wordBreak:"break-word"}}>
  <thead>
    <tr>
    <th style={{width:"25%"}}>Error message</th>
    <th style={{width:"35%"}}>How to fix</th>
    <th style={{width:"40%"}}>Why is this check important?</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>`Asset quality: joint configuration scored {score} (joints: {joint_number}, left hand: {left_hand_joint_number}, right hand: {right_hand_joint_number}).`</td>
    <td>This warning triggers when the joint configuration score is below `100`, indicating the skeleton has a non-standard joint count or asymmetric hand joint distribution.<br /><br />To address it, review your rig to ensure it follows the expected [advanced R15 rig](../avatar/character-bodies/specifications.md#advanced-r15-rigs) hierarchy with symmetric hand joints.</td>
    <td>This check evaluates the skeletal joint configuration of a full body avatar bundle, measuring total joint count and hand joint distribution. Proper joint counts ensure the avatar can animate correctly with standard Roblox animations and support features like finger tracking.</td>
  </tr>
</tbody>
</Table>

### Measure_Mesh_Manifold

`Measure_Mesh_Manifold` is a validation check that scores each mesh part for manifold integrity, catching holes, non-manifold edges, and similar topology problems in the geometry.

<Table tableStyle={{tableLayout:"fixed", width:"100%", wordBreak:"break-word"}}>
  <thead>
    <tr>
    <th style={{width:"25%"}}>Error message</th>
    <th style={{width:"35%"}}>How to fix</th>
    <th style={{width:"40%"}}>Why is this check important?</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>`Asset quality: {partName} has mesh manifold issues (score: {score}).`</td>
    <td>This warning triggers when any `Class.MeshPart` has manifold issues that lower its score below `100`.<br /><br />To address it, resolve non-manifold edges in your 3D modeling software by removing internal faces, splitting T-junctions, and ensuring all edges connect exactly two polygons.</td>
    <td>This check evaluates whether the mesh is manifold, meaning every edge is shared by exactly two faces and the surface has a consistent, well-defined inside and outside. Non-manifold geometry (T-junctions, internal faces, edges shared by 3+ faces) causes rendering artifacts, physics simulation errors, and problems with cage-based deformation.</td>
  </tr>
</tbody>
</Table>

### Measure_Mesh_Outside_OuterCage

`Measure_Mesh_Outside_OuterCage` is a validation check that scores how much of an accessory's render mesh stays between its cages; a mesh that pokes outside the outer cage deforms badly when worn.

<Table tableStyle={{tableLayout:"fixed", width:"100%", wordBreak:"break-word"}}>
  <thead>
    <tr>
    <th style={{width:"25%"}}>Error message</th>
    <th style={{width:"35%"}}>How to fix</th>
    <th style={{width:"40%"}}>Why is this check important?</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>`{mesh_outside_outer_cage_percent}% of mesh vertices for the accessory are outside its outer cage. Make adjustments to have more of the accessory placed between the cages.`</td>
    <td>This error triggers when the percentage of mesh vertices outside the [outer cage](../avatar/layered-accessories/specifications.md#outer-cage) exceeds the allowed threshold (default `65%`).<br /><br />To fix it, either expand your outer cage to encompass more of the mesh, or reduce the mesh geometry that extends beyond the cage boundary.</td>
    <td>This check measures what percentage of the layered accessory render mesh vertices lie outside the outer cage boundary. The outer cage defines the maximum volume for the accessory; vertices outside it will not deform correctly with layered accessories and may clip through other layers.</td>
  </tr>
  <tr>
    <td>`Asset quality warning: Mesh containment score is {score}. {mesh_outside_outer_cage_percent}% of mesh vertices are outside the outer cage.`</td>
    <td>This warning triggers when the mesh containment score is below `100`, indicating some mesh vertices extend beyond the [outer cage](../avatar/layered-accessories/specifications.md#outer-cage) even if not enough to fail validation.<br /><br />To address it, consider expanding the outer cage or trimming mesh geometry that protrudes beyond the cage boundary.</td>
    <td>This check evaluates how well the layered accessory mesh is contained within its outer cage and produces a containment score. Full containment ensures proper deformation behavior when multiple clothing layers interact.</td>
  </tr>
</tbody>
</Table>

### Measure_Texture_Complexity

`Measure_Texture_Complexity` is a validation check that scores each texture for visual complexity, flagging flat or near-empty textures that add little detail to the asset.

<Table tableStyle={{tableLayout:"fixed", width:"100%", wordBreak:"break-word"}}>
  <thead>
    <tr>
    <th style={{width:"25%"}}>Error message</th>
    <th style={{width:"35%"}}>How to fix</th>
    <th style={{width:"40%"}}>Why is this check important?</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>`Asset quality: texture {textureName} has low complexity (score: {score}).`</td>
    <td>This warning triggers when any texture on the asset scores below `100` for complexity, suggesting it lacks sufficient detail or variation.<br /><br />To address it, consider adding more visual detail, variation, or hand-painted elements to your textures to improve their quality score.</td>
    <td>This check evaluates the visual complexity and detail level of textures applied to the asset. Low-complexity textures, such as solid colors, minimal detail, or procedural noise with no meaningful content, indicate the asset may not meet Marketplace quality expectations for visual appeal.</td>
  </tr>
</tbody>
</Table>

### Measure_Texture_Resolution

`Measure_Texture_Resolution` is a validation check that scores each texture by its pixel dimensions, rewarding resolution high enough to keep the asset sharp on the body.

<Table tableStyle={{tableLayout:"fixed", width:"100%", wordBreak:"break-word"}}>
  <thead>
    <tr>
    <th style={{width:"25%"}}>Error message</th>
    <th style={{width:"35%"}}>How to fix</th>
    <th style={{width:"40%"}}>Why is this check important?</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>`Asset quality: texture {textureName} has resolution {texture_width}x{texture_height} (score: {score}).`</td>
    <td>This warning triggers when any texture on the asset has a resolution that scores below `100`, indicating it may be too low resolution or an unusual size for its intended use.<br /><br />To address it, consider using higher resolution textures that match the expected dimensions for your asset category, typically `1024`x`1024` or `512`x`512`.</td>
    <td>This check evaluates whether textures are at an appropriate resolution for the asset size and type. Textures that are too small appear blurry and pixelated when viewed in-game, while the system also flags unusual or non-standard resolutions.</td>
  </tr>
</tbody>
</Table>

### Measure_Triangle_Intersection

`Measure_Triangle_Intersection` is a validation check that scores each mesh part for self-intersecting triangles in which faces pass through one another and create overlapping geometry.

<Table tableStyle={{tableLayout:"fixed", width:"100%", wordBreak:"break-word"}}>
  <thead>
    <tr>
    <th style={{width:"25%"}}>Error message</th>
    <th style={{width:"35%"}}>How to fix</th>
    <th style={{width:"40%"}}>Why is this check important?</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>`Asset quality: {partName} has {intersecting_tri_face_percent}% intersecting triangle faces (score: {score}).`</td>
    <td>This warning triggers when any `Class.MeshPart` contains intersecting triangles that lower its score below `100`.<br /><br />To address it, identify overlapping faces in your 3D modeling software and resolve them by repositioning vertices, removing duplicate geometry, or restructuring the mesh topology to eliminate penetrations.</td>
    <td>This check measures the percentage of triangle faces that intersect (overlap/penetrate) other triangles within the same mesh part. Self-intersecting triangles cause z-fighting artifacts, incorrect normals, and problems with physics collision and cage-based deformation.</td>
  </tr>
</tbody>
</Table>

### Measure_UV_Bound

`Measure_UV_Bound` is a validation check that measures how many of a mesh's UV vertices fall outside the 0-1 texture space; it reports a score but never blocks upload.

<Table tableStyle={{tableLayout:"fixed", width:"100%", wordBreak:"break-word"}}>
  <thead>
    <tr>
    <th style={{width:"25%"}}>Error message</th>
    <th style={{width:"35%"}}>How to fix</th>
    <th style={{width:"40%"}}>Why is this check important?</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>`Asset quality: {partName} has {uv_outside_bound_vert_percent}% UV vertices outside bounds (score: {score}).`</td>
    <td>This warning triggers when any `Class.MeshPart` has UV vertices outside bounds that lower its score below `100`.<br /><br />To address it, ensure all UV islands are packed within the `0`-`1` UV space in your UV editor, and reposition any vertices that extend beyond the texture boundary.</td>
    <td>This check measures the percentage of UV vertices that fall outside the standard `0`-`1` UV space bounds. UV coordinates outside the `0`-`1` range cause texture tiling, stretching, or incorrect mapping that produces visual artifacts on the asset.</td>
  </tr>
</tbody>
</Table>

### Measure_Vertex_Similarity

`Measure_Vertex_Similarity` is a validation check that measures the share of near-duplicate vertices in a mesh; it reports a score but never blocks upload.

<Table tableStyle={{tableLayout:"fixed", width:"100%", wordBreak:"break-word"}}>
  <thead>
    <tr>
    <th style={{width:"25%"}}>Error message</th>
    <th style={{width:"35%"}}>How to fix</th>
    <th style={{width:"40%"}}>Why is this check important?</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>`Asset quality: {partName} has {similar_vertex_percent}% similar vertices (score: {score}).`</td>
    <td>This warning triggers when any `Class.MeshPart` has similar vertices that lower its score below `100`.<br /><br />To address it, merge overlapping vertices in your 3D modeling software using a merge-by-distance operation to consolidate redundant points into single vertices.</td>
    <td>This check measures the percentage of vertices that are nearly identical (overlapping or extremely close together) within each `Class.MeshPart`. High vertex similarity indicates redundant geometry where multiple vertices occupy the same position, wasting polygon budget and potentially causing rendering artifacts like z-fighting.</td>
  </tr>
</tbody>
</Table>
