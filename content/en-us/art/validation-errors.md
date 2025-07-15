---
title: Validation Errors
description: A list of all validation errors that can occur when uploading avatar items to the Marketplace.
---

When [uploading avatar items](../marketplace/publish-to-marketplace.md#upload-an-asset) to the Marketplace, Roblox validates the submission to ensure that the asset meets the appropriate specification for that asset type, such as [clothing specifications](./accessories/clothing-specifications.md).

<Alert severity = 'info'>
Assets that aren't intended for the Marketplace, such as those used only in-experience, do not need to pass this validation process. However, you may find this validation check useful to troubleshoot issues with any custom accessories or bodies.
</Alert>

## Mesh

Mesh validation errors refer to generic issues with your `Class.MeshPart`. This can range between geometry budget issues, size, missing IDs, unexpected data models, and more.

See the following specifications for mesh requirements:

- [Generic mesh specifications](./modeling/specifications.md)
- [Rigid accessory mesh specifications](./accessories/specifications.md#geometry-and-budgets)
- [Clothing mesh specifications](./accessories/clothing-specifications.md#geometry-and-budgets)
- [Body mesh specifications](./characters/specifications.md#triangle-budgets)

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error Message</th>
    <th>Additional notes</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>`%s` asset size is larger than the max allowed bounding size of `%s`. You need to scale down or remodel the asset.<br/><br/>Full body size is larger than the max allowed bounding size of `%s`. You need to scale down or remodel the asset</td>
    <td>Try rescaling your asset to keep the original aspect ratio. If that doesn't resolve the issue, try to scale along the axis that is failing validation.</td>
  </tr>
  <tr>
    <td>`%s` asset size is smaller than the min allowed bounding size of `%s`. You need to scale up or remodel the asset.<br/><br/>Full body size is smaller than the min allowed bounding size of `%s`. You need to scale up or remodel the asset</td>
    <td>Try rescaling your asset to keep the original aspect ratio. If that doesn't resolve the issue, try to scale along the axis that is failing validation.</td>
  </tr>
  <tr>
    <td>`%s` has size larger than max allowed bounding size. The max size for type `%s` is [`%f`, `%f`, `%f`]</td>
    <td>Your model has one or more small pieces of geometry disconnected from your main mesh that contribute to the overall size. This issue is usually associated with small pieces or particles. You need to either remove these small pieces from your model or scale them to become visible.</td>
  </tr>

  <tr>
    <td>Mesh resolution of `%d` for model `%s` is higher than max supported number of triangles `%d`. You need to retopologize your model to reduce the triangle count. </td>
    <td>The resolution of your model mesh is too high. You need to retopologize the model to bring the resolution down below the [allowed limits](../art/modeling/specifications.md#geometry).</td>
  </tr>
  <tr>
    <td>Model mesh `%s` resolution of `%d` is higher than max supported value of `%d`. You need to retopologize your model and try again.<br/><br/>Your mesh exceeds the max triangle limit for UGC upload requirements.</td>
    <td>The resolution of your model (number of triangles) is higher than the maximum [allowed limit](../art/modeling/specifications.md#geometry). You need to retopologize and remove enough triangles to bring the total count below this limit.</td>
  </tr>
  <tr>
    <td>`%s` is not visible enough from the `%s`. The most visible region found scored `%.2f` but needs to be above `%.2f`.<br/><br/>Mesh for `%s` is completely invisible from the `%s`.</td>
    <td>Your accessory or body part is too thin along one dimension (`X`, `Y`, or `Z`) and can become invisible (or hardly visible) during gameplay. You need to scale up your asset along the axis failing validation.</td>
  </tr>
    <tr>
    <td>Model meshId mismatch between `MeshPart.MeshId` and `SpecialMesh.MeshId` for `%s`. You need to match the meshIds and try again.</td>
    <td>Verify `Class.Model` includes a `Class.MeshPart` or `Class.SpecialMesh` with the correct IDs.</td>
  </tr>
    <tr>
    <td>The total surface area of model mesh `%s` is `%f`, it cannot be greater than `%d`. You must reduce the number and/or size of all triangles.<br/><br/>The total surface area of model mesh `%s` is greater than `%d`. You must reduce the number and/or size of all triangles.</td>
    <td>Your model mesh has too many triangles on screen that cannot be culled. This will cause performance problems during gameplay when using lower powered mobile devices. You need to reduce the triangle count of your model.</td>
  </tr>
    <tr>
    <td>Detected zero-area triangle in model mesh `%s`. You need to edit the mesh to remove zero-area triangles.</td>
    <td>Your model mesh has some vertices too close to each other that they create zero area triangles. You need to move these vertices apart to resolve this issue.</td>
  </tr>
    <tr>
    <td>Detected two or more vertices in model mesh `%s` sharing near identical positions. You need to position vertices by at least `%s` apart from each other.</td>
    <td>Make sure there are no coincident vertices in your model mesh.</td>
  </tr>
    <tr>
    <td>Bounds for the mesh `%s` are not centered at the origin. The max allowed distance is `%f`</td>
    <td>The asset model mesh is too far away from the origin. Usually the center of the model and the origin of the coordinate system should coincide. </td>
  </tr>
  <tr>
    <td>`%s` mesh is too small or made of disconnected pieces that are too small. <br /><br />Detected `%s` centered around `%s` that increases `%s` bounding box. Remove the geometry or increase its size so that it is more visible.</td>
    <td>The model mesh is too large. You need to scale it down.</td>
  </tr>
  <tr>
    <td>`%s` is more than max difference `%f` in size compared to the other mesh `%s`. You need to edit the model to adjust its size.</td>
    <td>The model mesh is too big. You need to scale it down.</td>
  </tr>
</tbody>
</table>

## Texture

Texture errors refer to generic issues with your `Class.MeshPart.TextureID` or `Class.SurfaceAppearance`. Depending on the type of asset and texture you are creating, you may need to use a third-party software to fix and re-export.

See the following resources:

- [General texture requirements](./modeling/texture-specifications.md)
- [PBR texture overview](./modeling/surface-appearance.md)
- [Clothing texture requirements](./accessories/clothing-specifications.md#textures)
- [Body texture requirements](./characters/specifications.md#textures)

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error Message</th>
    <th>Additional notes</th>
    </tr>
  </thead>  
  <tbody>
  <tr>
    <td>Failed to execute UV check for `%s`. Make sure the UV map exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to execute texture size check for `%s`. Make sure the textureId is valid and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Model textureId mismatch between `MeshPart.TextureID` and `SpecialMesh.TextureId` for `%s`. You need to match the textureIds and try again.</td>
    <td>Verify textures are properly set up.</td>
  </tr>
  <tr>
    <td>Invalid material setup for `%s`. Accepted values are: `%s`</td>
    <td></td>
  </tr>
  <tr>
    <td>Invalid vertex color found in mesh model `%s`. You need to edit the color map to be all white and try again.<br/><br/>Invalid vertex color found in mesh model `%s`. You need to edit the color map to be all white with no transparency and try again.</td>
    <td></td>
  </tr>
    <tr>
    <td>TextureID and Surface Appearance are both defined for MeshPart `%s`. Publishing will only use Surface Appearance</td>
    <td></td>
  </tr>
  <tr>
    <td>`%s` has an empty TextureID and no child surface appearance instance. You need to define at least one of them. </td>
    <td></td>
  </tr>
  <tr>
    <td>Invalid textureID used in mesh `%s`. Make sure the texture exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Your textures exceeds the max texture size limit for UGC upload requirements.<br/><br/>Texture resolution `%d`x`%d` px found in `%s` is higher than max size supported value of `%d`x`%d` px. You need to reduce the texture resolution.</td>
    <td>You need to change the [resolution of your textures](../art/modeling/specifications.md#textures) to be within the allowed limits.</td>
  </tr>
    <tr>
    <td>Model textureId mismatch with rigid accessory `SpecialMesh.TextureId` for `%s`. You need to match the textureIds and try again.</td>
    <td>Verify textures are properly set up.</td>
  </tr>
  <tr>
    <td>Failed to execute UV mismatch check for `%s`. Make sure UV map exists and try again.</td>
    <td></td>
  </tr>
</tbody>
</table>

## Rigging and skinning

Rigging and skinning errors refer to issues with your rigging and skinning data. Depending on the type of error, you may need to use a third-party software to fix and re-export.

See the following specifications for rigging and skinning requirements:

- [Generic mesh specifications](./modeling/specifications.md#rigging-and-skinning)
- [Clothing rigging specifications](./accessories/clothing-specifications.md#rigging-and-skinning)
- [Body rigging specifications](./characters/specifications.md#rigging)

Skinning is the assignment of vertices of your rendered mesh to the underlying rig. For additional resources, see the rigging and skinning requirements for [clothing](./accessories/clothing-specifications.md#rigging-and-skinning) and [bodies](./characters/specifications.md#rigging).

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error Message</th>
    <th>Additional notes</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>Detected mismatch between model and skinned data for `%s`. You need to re-skin your model to fix this issue.</td>
    <td>The number of vertices in the model mesh do not match the number of skin weights provided. You need to reskin your model.</td>
  </tr>
  <tr>
    <td>Missing skinning data for `%s`. You need to skin your model.</td>
    <td></td>
  </tr>

</tbody>
</table>

## Cage mesh

Cage errors refer to generic issues with your `Class.WrapLayer` or `Class.WrapTarget`. Depending on the type of error, you may need to use a third-party software to fix and re-export.

See the following resources for caging:

- [Caging best practices and video](./accessories/caging-best-practices.md)
- [Clothing caging specifications](./accessories/clothing-specifications.md#cage-meshes)
- [Body outer cage specifications](./characters/specifications.md#outer-cages)

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error Message</th>
    <th>Additional notes</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>WrapTarget `%s` found under `%s` has a CageOrigin position greater than %. You need to set `CageOrigin.Position` to `0`,`0`,`0`.</td>
    <td>Cage origin must be zero to properly align with its corresponding body or accessory.</td>
  </tr>
  <tr id = "cageMeshDistance">
    <td>Average distance between outer cage to mesh is too high. Mesh seems to be outside of the outer cage.<br/><br/>Average distance between outer cage to mesh is too high %. Make adjustment to cage to fit the mesh better.</td>
    <td>The outer cage is too far away from its corresponding body or accessory model mesh. You need to [remodel the outer cage](../art/accessories/caging-best-practices.md) and bring its vertices closer to the model mesh.</td>
  </tr>

  <tr id ="cageInsideMesh">
    <td>Validation detected `%d`% of the accessory is outside its outer cage. Make adjustments to have more of the accessory placed between the cages.</td>
    <td>The outer cage needs to envelop the model mesh of its corresponding accessory. This check has detected a large portion of the model mesh is outside its outer cage. You need to edit the model and/or the cage to fix this issue.</td>
  </tr>
  <tr>
    <td>The average distance between the layered accessory `%s` and its outer cage is too large. You need to edit the cage to be within `%s` from the accessory.</td>
    <td>The outer cage is too far away from its corresponding body or accessory model mesh. You need to [remodel the outer cage](../art/accessories/caging-best-practices.md) and bring its vertices closer to the model mesh.</td>
  </tr>
  <tr>
    <td>There are cage vertices inside the layered accessory mesh `%s`, which could lead to interpenetration issues during fitting. You need to edit the cage mesh to fix this intersection issue.</td>
    <td>The layered accessory mesh vertices need to be positioned between the [inner and outer cages](../art/accessories/caging-best-practices.md). Whenever a mesh vertex passes through the cage mesh it causes rendering issues in the area making the accessory look like it is intersecting the body.</td>
  </tr>
  <tr>
    <td>The meshId reference for cage `%s` is invalid or doesn't exist. Please, verify you are using a valid mesh asset and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Outer cage of `%s` has mesh edits on regions that don't correspond to its current asset type `%s` (i.e. edits on the lower leg cages when asset type is set to 'Head'). You need to check the asset type for the layered accessory `%s`.</td>
    <td>Your outer cage was deformed in regions that don't envelop any part of your accessory. For example, the outer cage for a hat accessory is expected to deform on the head region and not the left foot. Make sure your outer cage is [properly setup](../art/accessories/caging-best-practices.md) and deforms only where is needed.</td>
  </tr>
  <tr>
    <td>Outer cage of `%s` has mesh edits that place vertices too far away from the model mesh. You need to edit the cage and enforce vertices are at most `%s` away from the model.</td>
    <td>Ideally the outer cage of an accessory completely envelops its model mesh. There are cases in which you may [intentionally not want to do that](../art/accessories/caging-best-practices.md#caging-protrusions). For example, if the accessory is a wing, you would want the outer cage to envelop only the base of the wing that connects it to the back of the avatar. If the entire wing is enveloped, it'll cause extreme deformations to any additional layered assets equipped.<br/><br/>This validation checks that the outer cage is enveloping a large enough region of the accessory. You need to edit the outer cage to contain more vertices of the accessory mode mesh. </td>
  </tr>
  <tr>
    <td>Cage `%s` is not watertight (i.e. detected holes in the mesh). You need to edit the mesh and close the holes (may leave eyes and mouth areas open when applicable).</td>
    <td>There are holes in your cage mesh. You need to fix them and make your cage mesh watertight. For example, if you were to pour water inside the mesh it wouldn't leak.</td>
  </tr>
  <tr>
    <td>Failed to execute cage non-manifold check for `%s`. Make sure cage mesh exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Cage `%s` is non-manifold (i.e. there are edges with 3 or more incident faces). Some vertices are likely too close and welded together as a single vertex causing edges to collapse into a non-manifold. You need to edit the cage mesh to have vertices distant by at least `%s` from each other.</td>
    <td>There are edges in your cage model mesh that are connected to more than two faces, possibly caused by stacked or very closely positioned vertices. You need to remodel your cage to fix these issues.</td>
  </tr>
  <tr>
    <td>Failed to execute cage detection for `%s`. Make sure the cage mesh exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Detected too many coplanar triangles intersecting in model mesh `%s`. The maximum is `%d` intersections in a `%d` triangle mesh. Edit your mesh to reduce the number of coplanar triangle intersections.</td>
    <td>Your cage model mesh has an excessive number of triangle faces that are coplanar and intersecting. This causes a visual artifact during gameplay that makes your accessory look like it is blinking in the area of the coplanar triangles. You need to edit the vertex positions of these triangles to untangle the intersections.</td>
  </tr>
  <tr>
    <td>Missing cage for `%s`. You need to provide a cage mesh for each of the 15 body parts making up the R15 body.</td>
    <td></td>
  </tr>
  <tr>
    <td>WrapLayer `ImportOrigin.Position` is `%f` from the origin. The max is `%f`. You should move the Position closer to the origin.</td>
    <td>The import origin position adds an offset between the cage and its corresponding asset. If this offset is too large than the cage will no longer envelope the asset (may end up completely outside the asset). <br/><br/>This breaks the layered clothing system and makes the asset behave unexpectedly. Ensure that your import origin is set at (`0`,`0`,`0`).</td>
  </tr>
  <tr>
    <td>Failed to execute cage relevancy detection for `%s`. Make sure the cage mesh exists and try again.</td>
    <td></td>
  </tr>
  <tr id = "cageRelevancy">
    <td>Validation detected `%d` % of the outer cage edits do not cover the accessory. Make sure you are moving the outer cage only where needed.</td>
    <td>This validation has detected that you moved out many vertices of your outer cage that weren't in the same region as your model geometry. <br/><br/>You need to verify your outer cage is modified only enough to envelop the accessory model mesh, and stays consistent with the inner cage everywhere else.</td>
  </tr>
  <tr>
    <td>WrapLayer `%s` found under `%s`.`%s` has a CageOrigin position greater than `%f`. You need to set `CageOrigin.Position` to `0`,`0`,`0`.</td>
    <td>Cage origin position needs to be set to (`0`,`0`,`0`). Otherwise your cage will be moved out and may no longer envelop the accessory being deformed.</td>
  </tr>

  <tr>
    <td>Cage mesh verts referenced in `%s`.`%s`.`CageMeshId` were found that are `%.2f` studs outside the %s render mesh. `%s` studs is the maximum. Please reduce the size of your cage mesh.</td>
    <td></td>
  </tr>

  <tr>
    <td>Failed to execute testing render mesh inside bounding box of outer cage modified area. Make sure both cage meshes and render mesh exist and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Only `%d%%` of the render mesh verts are situated in the modified %s area of the WrapLayer CageMesh (outer mesh). `%d%%` is required. Move the render mesh to be within the modified `%s` area of the WrapLayer CageMesh (outer mesh).</td>
    <td></td>
  </tr>
  <tr>
    <td>Missing HSR data for `%s`. Please, try again.</td>
    <td>The HSR (Hidden Surface Removal) data is calculated in the cloud server and may take a few minutes to be updated for your assets. Wait some time and try again.</td>
  </tr>
  <tr>
    <td>Failed to execute body max cage distance check. Make sure all render meshes and their WrapTarget cage meshes exist, and try again.</td>
    <td></td>
  </tr>
  <tr id = "bodyCageMaxSize">
    <td>A vertex was found on the `%s`'s cage mesh that is `%.2f` studs away from the closest render mesh. `%s` studs is the maximum. Make the cage mesh more closely match the shape and size of the render mesh.</td>
    <td></td>
  </tr>

</tbody>
</table>

## Cage UV

Cage UV errors relate to cage mesh UV issues for layered accessories and bodies. Roblox recommends never altering or manipulating the UVs of your cage objects, although this may occur accidentally when modeling or within Studio.

See the following for more information and resources:

- [Caging best practices and video](./accessories/caging-best-practices.md)
- [Clothing caging specifications](./accessories/clothing-specifications.md#cage-meshes)
- [Body outer cage specifications](./characters/specifications.md#outer-cages)

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error Message</th>
    <th>Additional notes</th>
    </tr>
  </thead>
<tbody>

  <tr>
    <td>Failed to load UVs for Inner cage of `%s`. Make sure the UV map exists and try again.</td>
    <td></td>
  </tr>
  <tr id = "cageExtraUvs">
    <td>There are `%d` UV values in `%s` cage that do not belong to the template. Please correct the cage UV.</td>
    <td>The cage has an invalid UV map, possibly from using an old or third-party cage. Use the UV map and model mesh templates provided in the [official documentation resources](../avatar/resources.md#project-files).</td>
  </tr>
  <tr>
    <td>Failed to load UVs for `%s`. Make sure the model has a valid UV map and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Detected zero-area triangle in UV map of `%s`. You need to edit the UV map to fix this issue.</td>
    <td>Your UV map has zero area triangles. You need to fix it and verify all triangles connecting UV points have non-zero area.</td>
  </tr>
  <tr>
    <td>Found invalid UV value outside [`0`, `1`] range for `%s`. You need to edit the UV map to fix this issue.</td>
    <td>All UV maps need to have values within the range [`0`, `1`].</td>
  </tr>
  <tr>
    <td>Failed to execute UV check for `%s`. Make sure the UV map exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>`%s`.`%s` ( `%s` ) should have `%d` unique UVs, but has `%d`. Please make sure the mesh has the required number of unique UVs and try again.</td>
    <td>Your UV map has many repeated UV values. Use the UV map and model mesh templates provided in the documentation.</td>
  </tr>
  <tr>
    <td>Inner and Outer cage UV for `%s` are mismatched. The Roblox provided cage template should be used to create inner and outer cages with no modifications to the UV map.</td>
    <td>The UV maps for cages should not be edited. You need to restore the UV map to match that of the templates provided in the documentation.</td>
  </tr>
  <tr>
    <td>Detected modified UV values for mesh `%s`. The original UV map for this model can't be altered.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to execute excluded modified cage UV check. Make sure both cage meshes exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>`%d%%` of modified cage UVs in WrapLayer CageMesh (outer mesh) are outside the expected region of the body. For a `%s` no more than `%d%%` of the modified UVs can be outside the `%s` area. Move your asset to the correct area of the body.</td>
    <td></td>
  </tr>
  <tr>
    <td>The WrapLayer CageMesh (outer mesh) for a %s must modify %d%% of the cage UVs in the `%s` area. Currently only `%d%%` are modified. Move your asset to the correct area of the body.</td>
    <td></td>
  </tr>
</tbody>
</table>

## Accessory

Accessory errors relate to the rigid or layered accessory components of your asset.

See the following for more information:

- [Rigid accessory specifications](./accessories/specifications.md)
- [Clothing specifications](./accessories/clothing-specifications.md)

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error Message</th>
    <th>Additional notes</th>
    </tr>
  </thead>
<tbody>

  <tr>
    <td>Upload of model has too many children assets (Meshes, Textures, etc.) and cannot be processed as is. You need to rearrange the model.</td>
    <td></td>
  </tr>
  
  <tr>
    <td>Asset type `%s` is not a rigid accessory category. It can only be used with layered clothing.</td>
    <td></td>
  </tr>
  <tr>
    <td>Model meshId mismatch with rigid accessory SpecialMesh.MeshId for `%s`. You need to match the meshIds and try again.</td>
    <td>Verify `Class.Model` includes a `Class.MeshPart` or `Class.SpecialMesh` with the correct IDs.</td>
  </tr>
  <tr>
    <td>Accessory MeshPart `%s` must contain a valid meshId. Make sure the mesh referred to by the meshId exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Accessory name must match "Accessory (Name)" format style (i.e. "Accessory (MyAccessory)" if you want to name your accessory ).</td>
    <td></td>
  </tr>
</tbody>
</table>

## Layered clothing

Layered clothing errors refer to the layered accessory components of your asset.

See the following for more information on layered accessories:

- [Clothing overview](./accessories/layered-clothing.md)
- [Clothing specifications](./accessories/clothing-specifications.md)

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error Message</th>
    <th>Additional notes</th>
    </tr>
  </thead>
<tbody>
   <tr id = "cageDensity">
    <td>`%s` has `%d` % of vertices too close to each other. Please edit the vertices to have at most `%d` % coincident or close to one another.</td>
    <td>Your accessory cage has too many vertices close together. This may cause the system to treat them as repeated vertices, or zero area triangles. You need to [edit and move](../art/accessories/caging-best-practices.md) the vertices away from each other in the region(s) they are almost coincident.</td>
  </tr>
  <tr>
    <td>Failed to load layered clothing accessory `%s`. Make sure mesh exists and try again.<br/><br/>Failed to load texture for layered clothing accessory `%s`. Make sure texture exists and try again.<br/><br/>Failed to load children assets (Meshes, Textures, etc.) for `%s`. Make sure the assets exist and try again.</td>
    <td></td>
  </tr>
  <tr>
   <td>Asset type `%s` is not a layered clothing category. It can only be used with rigid accessories.</td>
    <td></td>
  </tr>
  <tr>
    <td>Missing meshId on layered clothing accessory `%s`. Make sure you are using a valid meshId and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Missing WrapLayer on layered clothing accessory `%s`. You need to create a child WrapLayer and try again.</td>
    <td>Make sure you converted your model into a layered accessory (you might have [converted to a rigid accessory](../art/accessories/accessory-fitting-tool.md#rigid-accessories) instead or selected the wrong asset type).</td>
  </tr>
  <tr>
    <td>The maximum vertex density has been exceeded. Reduce the number of vertices that are very close to each other.</td>
    <td>Your accessory cage has too many vertices close together. This may cause the system to treat them as repeated vertices, or zero area triangles. You need to [edit and move the vertices away](../art/accessories/caging-best-practices.md) from each other in the region(s) they are almost coincident.</td>
  </tr>

</tbody>
</table>

## Body

Body errors refer to issues related to body-specific components of your asset.

See the following for more information on various character body components:

- [Body specifications](./characters/specifications.md)

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error Message</th>
    <th>Additional notes</th>
    </tr>
  </thead>
<tbody>
  <tr>

    <td>Detected rotation in Attachment `%s`. You must reset all rotation values for this attachment to zero.<br/><br/>Detected invalid orientation for `%s`. Attachment orientation should be `%s`, but can be rotated up to `%d` degrees in total</td>
    <td>Body attachments, except grip attachments, [should not have an applied rotation](../art/characters/specifications.md#attachments). This would affect all accessories connected to these attachments and can make some accessories look "broken" when equipped to the body.</td>

  </tr>
  <tr>
    <td>Attachment `%s` in `%s` is placed at a position `%s` that is outside the valid range. You need to adjust the attachment position.<br/><br/>Attachment `%s` in `%s` is placed at a position `%s` that is outside the valid range of (`%s` to `%s`). You need to adjust the attachment position.</td>
    <td>Body attachments need to be within reasonable distance from the body[should not have an applied rotation](../art/characters/specifications.md#attachments) to avoid introducing unrealistic gaps when equipping accessories to those attachments.</td>
  </tr>
  <tr>
    <td>Body part `%s` does not follow R15 schema. The specific issues are: `%s`</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to load body part mesh `%s`. Make sure body part exists and try again.</td>
    <td></td>
  </tr>
    <tr>
    <td>Expected `%s` CollisionFidelity to be `%s`.</td>
    <td></td>
  </tr>
  <tr>
    <td>Unable to run full body validation due to previous errors detected while processing individual body parts.</td>
    <td>Too many validation errors already detected and reported. You need to fix the reported ones first to have visibility on the additional ones remaining.</td>
  </tr>
  <tr>
    <td>Full body check did not receive the correct set of body part Asset Types (i.e. Head, Torso, LeftArm, RightArm, LeftLeg, RightLeg). Make sure the body model is valid and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Unable to run full body validation due to previous errors detected while processing individual body parts.</td>
    <td>Too many validation errors already detected and reported. You need to fix the reported ones first to have visibility on the additional ones remaining.</td>
  </tr>
  <tr>
    <td>`%s` is at a `%d` degree angle from the X,Y plane, it must be within `%d` degrees. Make sure the character is in I pose, A pose, or T pose.</td>
    <td>Validation detects that the body is not one of the following supported poses:<br/><br/><ul><li>T-pose (arms are parallel to the floor and perpendicular to the torso)</li><li>A-pose (arms are about 45 degrees with respect to the floor)</li><li>I-pose (arms are perpendicular to the floor and parallel to the torso)</li></ul></td>
  </tr>
  <tr>
    <td>The `AvatarPartScaleType` value in `%s` is invalid. Verify the value you are using is either `Classic`, `ProportionsSlender`, or `ProportionsNormal`.</td>
    <td></td>
  </tr>
  <tr>
    <td>Attribute `%s` has different values in different children folders. You need to use the same value in all folders.</td>
    <td>Verify extra attributes are initialized the same way on all children folders.</td>
  </tr>
  <tr>
    <td>All MeshParts must have the same value in their `AvatarPartScaleType` child. Please verify the values match.</td>
    <td>The `AvatarPartScaleType` property is used to scale the MeshPart. Possible values are: `Classic`, `ProportionsNormal`, `ProportionsSlender`. <br/><br/>Combining MeshParts with different scales (equipping an accessory to an avatar body) results in a visual mismatch that makes them look too large or too small compared to each another.</td>
  </tr>
</tbody>
</table>

## Head

Head errors relate to issues with the head geometry or FACS animation data associated with your head geometry.

See the following for more information on various character head components:

- [Head specifications](./characters/specifications.md#facial-animations)

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error Message</th>
    <th>Additional notes</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>Failed to load model for dynamic head `%s`. Make sure model exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed validation for dynamic head `%s` due to missing FACS information. You need to provide FACS controls for at least 17 poses (see documentation).</td>
    <td>The face controls for dynamic heads need to have [at least 17 poses](../art/characters/specifications.md#facial-animations) connected to the rig. This is necessary to enforce a minimum level of face expressions for avatars during gameplay. You need to setup additional face controls that are missing.</td>
  </tr>
  <tr>
    <td>`%s` is missing FACS controls: `%s`<br/>`%s` has inactive FACS controls: `%s`</td>
    <td>Face controls need to be connected to the face rig. You need to reconnect the inactive controls.</td>
  </tr>
  <tr>
    <td>Unable to capture snapshot of DynamicHead `%s`<br/><br/>Failed to read data from snapshot of DynamicHead `%s`<br/><br/>DynamicHead `%s` when emoting surpasses the expected bounding box</td>
    <td>An animation pose is invalid or may extend past the expected bounding box. You need to recalibrate the face controls connected to the face rig.</td>
  </tr>

</tbody>
</table>

## Data model / runtime

Data model or runtime errors refer to issues with loading parts of the data model or running checks.

These errors can occur from modeling issues, exporting issues, studio importing issues, accidental changes to data model, or generic issues loading and processing parts of the asset.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error Message</th>
    <th>Additional notes</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>Asset could not be loaded</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to execute max total surface area check for `%s`. Make sure mesh exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to execute similarity mesh vertex check for `%s`. Make sure mesh exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to load `meshHandle.Name`'s render mesh data.</td>
    <td></td>
  </tr>
<tr>
    <td>Failed to load detailed information for model assets. Make sure all model assets exist and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to read mesh. Make sure the body part exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to execute cage intersection detection for `%s`. Make sure the cage mesh exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to load model mesh `%s`. Make sure the mesh exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to retrieve mesh data to validate skinned mesh.<br/><br/>Failed to load mesh for `%s`. Make sure mesh exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to load mesh for accessory `%s`. Make sure mesh exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to load model mesh `%s`. Make sure mesh exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to load model mesh `%s`. Make sure the mesh exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to execute triangle count check for `%s`. Make sure mesh exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to load vertex color map for model mesh `%s`. Make sure it exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to execute overlapping mesh vertex check for `%s`. Make sure mesh exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to execute texture size check for `%s`. Make sure the textureId is valid and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to load texture for `%s`. Make sure the texture exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to execute validateUVSpace check on `%s`. Make sure the UV maps exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to load layered clothing accessory `%s`. Make sure mesh exists and try again.<br/><br/>Failed to load texture for layered clothing accessory `%s`. Make sure texture exists and try again.<br/><br/>Failed to load children assets (Meshes, Textures, etc.) for `%s`. Make sure the assets exist and try again.</td>
    <td></td>
  </tr>
<tr>
    <td>`%s` contains attributes in its properties that are not allowed. You need to remove the following attributes: `%s`</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to get triangle face information from model mesh `%s`. Make sure model exists and try again.</td>
    <td></td>
  </tr>

  <tr>
    <td>Detected the following error(s): `%s`<br/>`%s` has an invalid name<br/>`%s` is of type `%s` which is not allowed</td>
    <td></td>
  </tr>

  <tr>
    <td>Deprecated R6 folder for body part `%s` should be empty. You need to clear that folder and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Incorrect hierarchy for `%s` with the following missing folders: `%s`</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to parse package data for model `%s`. Make sure the packageId is valid and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Property `%s` does not exist on type `%s`. Delete the property and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Trying to access property `%s`.`%s` using the incorrect type for it. Expected `%s` to be `%s`.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to execute render mesh inside outer mesh check for `%s` and `%s`. Make sure the meshes exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Selected more than one instance of type `%s`. Please, select a single instance of this type and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to find an instance of the asset type `%s`. Make sure one exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Found the following instance tags which are not allowed: `%s`</td>
    <td></td>
  </tr>
  <tr>
    <td>Invalid target asset for thumbnail generation. Expected it to be `%s`.</td>
    <td></td>
  </tr>
  <tr>
    <td>Asset `%s` is positioned outside the thumbnail's camera view. You need to reposition the asset at the center of the camera view and try again.</td>
    <td>You need to move your asset to the origin of the coordinate system.</td>
  </tr>
  <tr>
    <td>Failed to execute vertex density check for `%s`. Make sure mesh exists and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to execute body part max cage distance check. Make sure `meshHandle.Name`'s render mesh and its WrapTarget's cage mesh exist, and try again.</td>
    <td></td>
  </tr>
</tbody>
</table>

## Permission / moderation

Permission and moderation errors relate to issues with the asset's ownership or moderation review. Many moderation issues resolve after a period of time.

Ensure that you or your group has permission to use all parts of your asset, including the model and texture assets.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error Message</th>
    <th>Additional notes</th>
    </tr>
  </thead>
<tbody>

<tr>
    <td>Asset `%s` is not owned by the current user. You can only validate assets that you or a group you belong to owns.</td>
    <td>You need to own the assets being validated.</td>
  </tr>
  <tr>
    <td>`%s`.`%s` ( `%s` ) being used is not owned by the experience creator or player. You can only publish assets that you own.</td>
    <td>You need to own the assets being validated.</td>
  </tr>
  <tr>
    <td>Asset `%s` is not owned by the current user. You can only validate assets that you or a group you belong to owns.</td>
    <td>You need to own the assets being validated.</td>
  </tr>
  <tr>
    <td>Failed to load asset `%s` that is still going through the review process. Please, wait for a notification of completion from the review process and try again.</td>
    <td>Your asset is currently in moderation queue. Roblox can only validate assets that have already passed moderation.</td>
  </tr>
  <tr>
    <td>Failed to parse feedback from model review for `%s`. Make sure the review process is complete and try again.</td>
    <td></td>
  </tr>
  
  <tr>
    <td>Asset(s) failed to pass moderation: `%s`.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to fetch moderation results for `%s`. Make sure all assets are owned by the current user.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to parse moderation results for `%s`. Make sure moderation process is completed and try again.</td>
    <td></td>
  </tr>
  <tr>
    <td>Failed to validate current user during moderation. Make sure you own the assets being validated and try again.</td>
    <td>You need to own the assets being validated.</td>
  </tr>
</tbody>
</table>
