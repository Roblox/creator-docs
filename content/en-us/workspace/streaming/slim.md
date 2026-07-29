---
title: SLIM
description: SLIM (Scalable Lightweight Interactive Models) automatically generates optimized, cloud-transcoded representations of models and avatars for improved performance and visual quality.
---

**SLIM** (Scalable Lightweight Interactive Models) is an automatic optimization system that generates lightweight, optimized representations of `Class.Model|Models` and platform avatars using cloud-based transcoding (converting assets into more efficient formats). When enabled, SLIM combines multiple parts into fewer draw calls (rendering commands sent to the GPU) and generates multiple levels of detail, allowing the engine to intelligently select the best representation based on distance, device capability, and available resources.

<GridContainer numColumns="2">
	<figure>
		<img src="../../assets/optimization/streaming/SLIM-Disabled.jpg" />
		<figcaption>Without SLIM — streamed-out models are invisible</figcaption>
	</figure>
	<figure>
		<img src="../../assets/optimization/streaming/SLIM-Enabled.jpg" />
		<figcaption>With SLIM — optimized stand-ins remain visible</figcaption>
	</figure>
</GridContainer>

SLIM provides three key benefits:

- <Chip label="Visual Quality" size="small" variant="outlined" color="success" /> — Distant models appear more detailed than the legacy model level‑of‑detail system, maintaining closer fidelity to the original.
- <Chip label="Consistent Transitions" size="small" variant="outlined" color="success" /> — All parts within a model switch detail levels simultaneously, eliminating jarring per-part transitions.
- <Chip label="Performance" size="small" variant="outlined" color="success" /> — Composite meshes dramatically reduce draw calls, triangle counts, and memory usage, enabling richer scenes across all device tiers.

Explore SLIM in these published games:

<GridContainer numColumns="2">
	<figure>
	  [![](../../assets/optimization/streaming/SLIM-Demo-Models.png)](https://www.roblox.com/games/135885449743134/CPC-Slim-Template)
		<figcaption>[**City People Cars SLIM Template**](https://www.roblox.com/games/135885449743134/CPC-Slim-Template) — World models with SLIM enabled</figcaption>
	</figure>
	<figure>
		[![](../../assets/optimization/streaming/SLIM-Demo-Avatars.png)](https://www.roblox.com/games/81704282913046/SLIM-Platform-Avatars)
		<figcaption>[**SLIM Platform Avatars**](https://www.roblox.com/games/81704282913046/SLIM-Platform-Avatars) — 200 animated avatars rendered with SLIM</figcaption>
	</figure>
</GridContainer>

## Prerequisites

SLIM requires the following:

1. `Class.Workspace.StreamingEnabled|StreamingEnabled` must be enabled on the `Class.Workspace` object. See also [streaming properties](./techniques.md#streaming-properties) for related recommended settings.
2. The place must be **saved to Roblox** (not a local `.rbxl` file), as SLIM uses cloud transcoding to generate optimized assets. If you're testing locally, publish the place and then enable SLIM.
3. [Team Create](../../projects/collaboration.md) must be enabled for the game, as SLIM relies on associated properties for cloud asset generation.

## Technical behavior

When you publish or playtest a game with SLIM-enabled models, the engine uploads model data to a cloud service that generates optimized composite meshes with multiple levels of detail. At runtime, clients fetch these assets from the CDN and the engine selects the appropriate detail level based on distance and device capability, classifying each SLIM model into rendering zones based on distance from the camera:

<img src="../../assets/optimization/streaming/SLIM-Zones.jpg" width="720" alt="Diagram showing the four SLIM rendering zones radiating from a player character." />

<table>
<thead>
	<tr>
		<th>Range</th>
		<th>Behavior</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><ColorSwatch value="rgb(191,0,25)" /></td>
		<td>Full instances streamed in; traditional part-by-part rendering.</td>
	</tr>
	<tr>
		<td><ColorSwatch value="rgb(229,55,0)" /></td>
		<td>Full instances streamed in, but the engine renders the SLIM composite when more efficient.</td>
	</tr>
	<tr>
		<td><ColorSwatch value="rgb(229,132,0)" /></td>
		<td>Instances streamed out (only a minimal placeholder exists in the `Class.DataModel`, not the full model hierarchy), SLIM composite rendering.</td>
	</tr>
	<tr>
		<td><ColorSwatch value="rgb(0,173,73)" /></td>
		<td>Minimal placeholder in the `Class.DataModel`, not rendered.</td>
	</tr>
</tbody>
</table>

## SLIM for models

SLIM works best on models that represent **static world geometry** — buildings, props, vehicles, terrain features, and other environment objects that don't change at/during runtime. Adding or removing parts, changing materials, or modifying geometry at runtime prevents SLIM from rendering the model correctly. See [model structure](./techniques.md#model-structure) for general model structure guidance and [limitations](#limitations) for the full list of exclusions.

To enable SLIM on a model, set its `Class.Model.LevelOfDetail|LevelOfDetail` property to `Enum.ModelLevelOfDetail.SLIM|SLIM` in the [Properties](../../studio/properties.md) window.

<img src="../../assets/studio/properties/Model-LevelOfDetail-SLIM.png" width="320" alt="The Properties window with the LevelOfDetail property set to SLIM." />

When SLIM is set on a model, the engine:

1. Serializes the model's rendering-relevant properties (geometry, materials, textures, transforms) into a compact representation. Supported instance types within the model include `Class.Part`, `Class.MeshPart`, `Class.Decal`, `Class.Texture`, `Class.SurfaceAppearance`, `Class.PartOperation`, `Class.NegateOperation`, and `Class.SpecialMesh`.
2. Uploads this data to the cloud transcoding service on first publish or play.
3. The cloud service generates a composited mesh with multiple levels of detail, removing hidden internal geometry and optimizing textures.
4. At runtime, clients fetch the optimized SLIM asset and render it when the engine streams out the original model or when SLIM is more efficient than the full model.

<Alert severity="info">
Initial SLIM generation might take a few moments for complex models. The cloud service processes assets in the background, so if a model doesn't appear as SLIM immediately after enabling, wait 1–2 minutes and rejoin; the transcoded asset persists on the CDN and the client fetches it on the next session.
</Alert>

<BaseAccordion>
<AccordionSummary><Typography variant="subtitle2">Converting from Streaming Mesh</Typography></AccordionSummary>
<AccordionDetails>
If your game uses the legacy `Enum.ModelLevelOfDetail.StreamingMesh|StreamingMesh` setting for `Class.Model.LevelOfDetail`, you can convert individual models by selecting them and changing the property in the [Properties](../../studio/properties.md) window, or you can batch-convert multiple models at once using a script like the following in the [Command&nbsp;Bar](../../studio/ui-overview.md#command-bar). Note that some models which worked with `Enum.ModelLevelOfDetail.StreamingMesh|StreamingMesh` might need adjustments for SLIM, particularly those with overlapping parts or complex `Class.PartOperation` hierarchies.

```lua title="Batch-Convert StreamingMesh to SLIM"
for _, descendant in workspace:GetDescendants() do
    if descendant:IsA("Model") and descendant.LevelOfDetail ==
        Enum.ModelLevelOfDetail.StreamingMesh then
        descendant.LevelOfDetail = Enum.ModelLevelOfDetail.SLIM
    end
end
```

</AccordionDetails>
</BaseAccordion>

## SLIM for avatars

Platform avatars outside of the currently streamed area are not visible by default. Enabling SLIM avatars renders [standard‑rig](../../avatar/character-bodies/specifications.md#standard-rigs) player characters&nbsp;— regardless of how many accessories or clothing layers they have&nbsp;— as lightweight, animated stand‑ins that maintain visual fidelity at a fraction of the rendering cost.

<Tabs>
<TabItem label="Audience in Far Distance">
<GridContainer numColumns="2">
	<figure>
		<img src="../../assets/optimization/streaming/SLIM-Avatars-Enabled-Far.jpg" />
		<Alert severity="success" variant="outlined">
		<AlertTitle>SLIM Enabled</AlertTitle>
		<Chip label="~170,000 triangles" size="medium" variant="outlined" color="success" style={{marginTop: '10px'}} /><br />
		<Chip label="~4,000 client instances" size="medium" variant="outlined" color="success" style={{marginTop: '4px'}} />
		</Alert>
	</figure>
	<figure>
		<img src="../../assets/optimization/streaming/SLIM-Avatars-Disabled-Far.jpg" />
		<Alert severity="error" variant="outlined">
		<AlertTitle>SLIM Disabled</AlertTitle>
		<Chip label="~2,600,000 triangles" size="medium" variant="outlined" color="error" style={{marginTop: '10px'}} /><br />
		<Chip label="~60,000 client instances" size="medium" variant="outlined" color="error" style={{marginTop: '4px'}} />
		</Alert>
	</figure>
</GridContainer>
</TabItem>
<TabItem label="Audience in Near Proximity">
<GridContainer numColumns="2">
	<figure>
		<img src="../../assets/optimization/streaming/SLIM-Avatars-Enabled-Near.jpg" />
		<Alert severity="success" variant="outlined">
		<AlertTitle>SLIM Enabled</AlertTitle>
		<Chip label="~100,000 triangles" size="medium" variant="outlined" color="success" style={{marginTop: '10px'}} /><br />
		<Chip label="~31,000 client instances" size="medium" variant="outlined" color="success" style={{marginTop: '4px'}} />
		</Alert>
	</figure>
	<figure>
		<img src="../../assets/optimization/streaming/SLIM-Avatars-Disabled-Near.jpg" />
		<Alert severity="error" variant="outlined">
		<AlertTitle>SLIM Disabled</AlertTitle>
		<Chip label="~670,000 triangles" size="medium" variant="outlined" color="error" style={{marginTop: '10px'}} /><br />
		<Chip label="~60,000 client instances" size="medium" variant="outlined" color="error" style={{marginTop: '4px'}} />
		</Alert>
	</figure>
</GridContainer>
</TabItem>
</Tabs><br />

The key SLIM-specific property for avatars is `Class.Workspace.EnableSLIMAvatars` which should be set to `Enum.RolloutState.Enabled|Enabled` in the [Properties](../../studio/properties.md) window, alongside `Class.Model.LevelOfDetail|LevelOfDetail` set to `Enum.ModelLevelOfDetail.SLIM|SLIM` on your non‑avatar world models.

<img src="../../assets/studio/properties/Workspace-EnableSLIMAvatars.png" width="320" alt="The Properties window with the EnableSLIMAvatars property set to Enabled." />

With `Class.Workspace.EnableSLIMAvatars|EnableSLIMAvatars` enabled, the engine:

- Renders a SLIM version when an actual avatar model streams out.
- Swaps between SLIM and full-resolution representations based on available resources, even inside the streaming radius.
- Throttles SLIM animations based on scene importance and available bandwidth.

<Alert severity="success">
<AlertTitle>Supported Avatars</AlertTitle>
<ul>
<li style={{marginBottom: '10px'}}>R15 standard‑rig player avatars, including body, head, layered clothing, and accessories.</li>
<li>Avatar changes made between the `Class.Player.CharacterAdded|CharacterAdded` event and `Class.Player.CharacterAppearanceLoaded|CharacterAppearanceLoaded` event.</li>
</ul>
</Alert>

<Alert severity="error">
	<AlertTitle>Excluded Avatars</AlertTitle>
	<ul>
	<li style={{marginBottom: '10px'}}>R6 avatars.</li>
	<li style={{marginBottom: '10px'}}>NPC characters (even R15 standard-rig).</li>
	<li style={{marginBottom: '10px'}}>Avatars with custom proportions, body scaling, or experience-applied avatar settings.</li>
	<li>Avatar changes made after the `Class.Player.CharacterAppearanceLoaded|CharacterAppearanceLoaded` event (equipping tools, accessory changes, `Class.Highlight` additions, etc.).</li>
	</ul>
</Alert>

<BaseAccordion>
<AccordionSummary><Typography variant="subtitle2">Testing SLIM Avatars</Typography></AccordionSummary>
<AccordionDetails>
Unlike [model SLIM](#slim-for-models) which you can test alone by moving far from a model until it streams out, SLIM avatars require multiple players in the game to observe. Use one of these [testing modes](../../studio/testing-modes.md) to test SLIM avatars:

- [Team Test](../../studio/testing-modes.md#collaborative-testing) — Join with friends or alternate accounts to see SLIM avatars at distance.
- [Server and Clients](../../studio/testing-modes.md#multi-client-simulation) — Launch two or more client windows where each client displays avatar copies that the others render as SLIM when at distance.

Note that avatars must have been transcoded in a SLIM-enabled game before they appear as SLIM. If avatars don't render as SLIM in your first test, rejoin the game after a moment to allow transcoding to complete.
</AccordionDetails>
</BaseAccordion>

## Limitations

<table>
<thead>
	<tr>
		<th>Limitation</th>
		<th>Details</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Streaming required**</td>
		<td>SLIM only functions with `Class.Workspace.StreamingEnabled|StreamingEnabled` set to `true`. Without streaming, SLIM‑eligible models fall back to traditional level‑of‑detail rendering.</td>
	</tr>
	<tr>
		<td>**Static models only**</td>
		<td>[Model SLIM](#slim-for-models) does not support models modified at runtime (parts added/removed, properties changed) or models that play animations.</td>
	</tr>
	<tr>
		<td>**Humanoid&nbsp;instances**</td>
		<td>The engine excludes models containing a `Class.Humanoid` from static [model SLIM](#slim-for-models) processing. Use [SLIM avatars](#slim-for-avatars) for animated player characters.</td>
	</tr>
	<tr>
		<td>**Avatar restrictions**</td>
		<td>[SLIM avatars](#slim-for-avatars) only support R15 [standard‑rig](../../avatar/character-bodies/specifications.md#standard-rigs) player characters. R6 rigs, NPCs, and avatars with custom proportions fall back to default rendering.</td>
	</tr>
	<tr>
		<td>**Cloud dependency**</td>
		<td>The cloud service generates and stores SLIM assets on the CDN. Offline or local testing without a published place does not produce SLIM results.</td>
	</tr>
	<tr>
		<td>**Zero-scale models**</td>
		<td>The engine excludes models with a `Class.Model.Scale|Scale` of `0` from SLIM processing.</td>
	</tr>
	<tr>
		<td>**Platform&nbsp;availability**</td>
		<td>On platforms where SLIM is not yet supported, models set to `Enum.ModelLevelOfDetail.SLIM|SLIM` fall back to `Enum.ModelLevelOfDetail.Disabled|Disabled`.</td>
	</tr>
</tbody>
</table>

## Troubleshooting

<BaseAccordion>
<AccordionSummary><Typography variant="subtitle2">SLIM model not appearing</Typography></AccordionSummary>
<AccordionDetails>
- Verify that `Class.Workspace.StreamingEnabled|StreamingEnabled` is `true`.
- Confirm the place is published to Roblox and [Team Create](../../projects/collaboration.md) is enabled.
- Check that `Class.Model.LevelOfDetail|LevelOfDetail` is set to `Enum.ModelLevelOfDetail.SLIM|SLIM` for the model.
- Wait 1–2 minutes after first publish for cloud transcoding to complete, then rejoin.
- Ensure the model doesn't contain a `Class.Humanoid` instance.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary><Typography variant="subtitle2">Solid modeling operations not rendering correctly in SLIM</Typography></AccordionSummary>
<AccordionDetails>
`Class.PartOperation` instances for [solid modeling](../../parts/solid-modeling.md) (unions, intersections, negations) might not render correctly in some SLIM models. If a union appears missing or distorted in the SLIM representation, try separating the affected `Class.PartOperation` into its own model or simplifying the CSG operation.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary><Typography variant="subtitle2">Z-fighting or flickering on SLIM models</Typography></AccordionSummary>
<AccordionDetails>
Z-fighting can occur when parts in the original model have overlapping or coplanar faces. To resolve:

- Move overlapping parts slightly apart (even `0.01` studs is sufficient).
- Avoid perfectly flush surfaces between adjacent parts in the same model.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary><Typography variant="subtitle2">Texture or UV shifts on SLIM models</Typography></AccordionSummary>
<AccordionDetails>
SLIM regenerates UV mappings (how textures are projected onto 3D surfaces) during transcoding. Default Roblox materials might show slightly different tiling patterns compared to the original. To mitigate:

- Use custom textures via `Class.SurfaceAppearance` for important surfaces.
- Group visually related parts into the same model to ensure consistent texturing.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary><Typography variant="subtitle2">SLIM avatars not rendering</Typography></AccordionSummary>
<AccordionDetails>
- Verify `Class.Workspace.EnableSLIMAvatars` is set to `Enum.RolloutState.Enabled|Enabled`.
- Test with multiple clients using [Server and Clients](../../studio/testing-modes.md#multi-client-simulation) test mode (requires at least 2 clients).
- Ensure the avatar uses a standard R15 rig without custom proportions.
- Confirm the game doesn't modify the avatar after the `Class.Player.CharacterAppearanceLoaded` event.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary><Typography variant="subtitle2">Visual glitches on animated SLIM avatars</Typography></AccordionSummary>
<AccordionDetails>
Full-body or finger animations might occasionally show visual artifacts due to bone replication timing. This is a known issue being actively improved. If the issue is severe, verify that animation scripts aren't modifying bone transforms outside of the standard animation pipeline.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary><Typography variant="subtitle2">Inaccurate triangle count in rendering stats</Typography></AccordionSummary>
<AccordionDetails>
The rendering stats panel might report incorrect triangle counts when SLIM avatars are enabled. This is a known reporting bug and does not affect actual rendering performance.
</AccordionDetails>
</BaseAccordion>
