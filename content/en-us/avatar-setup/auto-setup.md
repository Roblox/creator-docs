---
title: Auto-setup
description: The Avatar setup tool previews animations, clothing, accessories, and body constructs on avatar rigs, directly in Studio.
---

<Alert severity = 'warning'>
Auto-setup is currently in [active development](https://devforum.roblox.com/t/avatar-auto-setup-now-supports-clothing-and-accessories/3709128) with many improvements on the roadmap. Note that some inputs might work better than others and your results can vary over time as additional training and improvements are made.
</Alert>

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/Hp9pr2FpZa8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> <br />

If [Avatar Setup](./index.md) detects that the input model is an incomplete avatar asset model, the **auto-setup** feature attempts to convert the model into an avatar asset with all the advanced components that allow characters to interact with the world and express themselves with accessories and clothing. <br />

For characters, accessories, and clothing, auto-setup can perform the following:

- **Rigging** — Adds an R15 armature to your body model to enable movement and animation.
- **Skinning** — Adds weights and influences to various surfaces of your mesh, ensuring an organic and natural flexibility during movement.
- **Facial animation** — Generates the FACS poses, facial rigging, skinning, and animation data required for facial animation and avatar chat.
- **Caging** — Adds the required cages to your asset, enabling it to support layered clothing.
- **Partitioning** — Separates the body mesh into the appropriate R15 parts.
- **Creating attachments** — Adds the appropriate attachment points enabling the character to wear rigid accessories.

If the selected model already contains all the required components for a Roblox avatar, the Avatar Setup tool skips auto-setup and immediately opens the selected model in the [Avatar Setup test interface](./index.md#test-and-edit).

## Supported asset types

Auto-setup supports the conversion of following asset types from a base `Class.Model`:

<figure>
<table><thead>
  <tr>
    <th>Asset type</th>
    <th>Input object</th>
    <th>Output object</th>
  </tr></thead>
<tbody>
  <tr>
    <td>Avatar body</td>
    <td>`Class.Model` containing one or more `Class.MeshPart` objects that meets auto-setup's supported [body inputs](./auto-setup-requirements.md#body).</td>
    <td>`Class.Model` parenting associated 15 `Class.MeshPart` objects and other expected [avatar components](../art/characters/index.md#components-of-an-avatar).</td>
  </tr>
  <tr>
    <td>Accessory</td>
    <td>`Class.Model` containing one or more `Class.MeshPart` objects that meet's auto-setup's supported [accessory inputs](./auto-setup-requirements.md#accessories). <br /> <br />Must [bundle](./auto-setup-requirements.md#bundle-multiple-assets) with an avatar body `Class.Model` for auto-setup.</td>
    <td>`Class.Accessory` that includes all expected [rigid accessory components](../art/accessories/index.md#components-of-a-rigid-accessory).</td>
  </tr>
  <tr>
    <td>Layered clothing</td>
    <td>`Class.Model` containing one or more `Class.MeshPart` objects that meet's auto-setup's supported [accessory inputs](./auto-setup-requirements.md#accessories-and-clothing). <br /> <br />Can optionally [bundle](./auto-setup-requirements.md#bundle-multiple-assets) with an avatar body `Class.Model` for auto-setup.</td>
    <td>`Class.Accessory` that includes all expected [layered accessory components](../art/accessories/layered-clothing.md#components-of-a-layered-clothing-accessory).</td>
  </tr>
  <tr>
    <td>Multiple accessories and clothing with single body</td>
    <td>`Folder` [bundle](./auto-setup-requirements.md#bundle-multiple-assets) containing one or more `Class.Model` that meet supported inputs for accessories, clothing, or body. <br /> <br />Must [bundle](./auto-setup-requirements.md#bundle-multiple-assets) with an avatar body `Class.Model` for auto-setup.</td>
    <td>`Class.Model` character body and any `Class.Accessory` equipable items. <br /> <br />All generated assets include expected avatar item components.</td>
  </tr>
</tbody>
</table>
</figure>

For more in-depth information on supported input configurations, see the individual asset specifications on [auto-setup requirements](./auto-setup-requirements.md).

## Auto-setup settings

The following settings provides additional controls to your auto-setup output.

### Platform and Development

You can configure auto-setup to generate avatars for either **Platform** or **Development** use.

- **Platform** — Auto-setup attempts to configure the input asset into a Marketplace-ready asset that users can purchase and use across the Roblox platform. Marketplace-ready assets have more restrictive requirements than assets used in-experience.
- **Development** — Auto-setup attempts to configure the input asset into an avatar asset usable in-experience. You can use development assets in your experience, such as non-playable characters, or in-experience UGC items. Auto-setup doesn't apply the same Marketplace requirements on development assets.

### Manually Align Front

Auto-setup attempts to determine the front direction of the input avatar and aligns it with the negative Z-axis in world space. You can skip this pre-processing step and do the alignment yourself.

### Improve Facial Caging

Enables an additional post-processing step that significantly improves the alignment of the head cage with the head model. Currently, this step takes about 30 seconds.

### Reduce Triangle Count

By default, auto-setup attempts to reduce triangle count of the input mesh using auto-decimation. If Reduce Triangle Count is disabled, auto-setup skips the decimation process. This setting is only accessible for [Development](#platform-and-development) setups allowing you to create assets with triangle counts above the Marketplace requirement.

## Reference models

Studio supports `.gltf`, `.fbx`, and `.obj` models using the 3D Importer. If you are exporting your model from a third-party tool, see [Export Settings](../art/characters/export-settings.md) for export configurations.

For an asset that meets all of these model requirements, download one of the following auto-setup templates for your own reference and testing:

<Grid container alignItems="stretch" style={{ margin: -6 }}>

  <Grid item XSmall={12} Medium={6} Large={4} style={{ padding: 6 }}>
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flex: 1 }}>
        <center>Nature Girl - Auto-Setup</center>
        <figure>
          <center>
            <img
              src="../assets/art/resources/Archer-Girl-Preview.png"
              width="100%"
            />
          </center>
        </figure>
        <figure>
          A comprehensive <code>.zip</code> folder of an{' '}
          <a href="./auto-setup-requirements.md">Avatar auto-setup</a> ready
          character model, including clothing and rigid accessory assets and PBR
          texture assets.
          <br /><br />
          This auto-setup template is not compatible with the traditional avatar
          creation workflow.
        </figure>
      </CardContent>
      <CardActions>
        <Button
          href="../assets/art/reference-files/NatureArcherGirl-AutoSetup.zip"
          fullWidth
          size="large"
          color="primary"
          variant="contained"
        >
          Download
        </Button>
      </CardActions>
    </Card>
  </Grid>

  <Grid item XSmall={12} Medium={6} Large={4} style={{ padding: 6 }}>
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flex: 1 }}>
        <center>Stylish Male - Auto-Setup</center>
        <figure>
          <center>
            <img
              src="../assets/art/resources/StylizedMale-Preview.png"
              width="100%"
            />
          </center>
        </figure>
        <figure>
          A comprehensive <code>.zip</code> folder of an{' '}
          <a href="./index.md">Avatar auto-setup</a> ready character model,
          including the base body and associated PBR textures.
          <br /><br />
          This auto-setup template is not compatible with the traditional avatar
          creation workflow.
        </figure>
      </CardContent>
      <CardActions>
        <Button
          href="../assets/art/reference-files/StylizedMale-AutoSetup.zip"
          fullWidth
          size="large"
          color="primary"
          variant="contained"
        >
          Download
        </Button>
      </CardActions>
    </Card>
  </Grid>

</Grid>
