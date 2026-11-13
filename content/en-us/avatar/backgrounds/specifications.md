---
title: Background specifications
description: File requirements for avatar background images, including resolution, format, color, and file size.
---

Backgrounds for avatars require specific configuration standards to ensure all backgrounds work as expected across the platform. Before you start the export process from your 2D editing software, verify that your image meets the following file and content specifications and guidelines to display correctly in the 3D avatar viewer and on profile pages.

## File requirements

<table>
	<thead>
		<tr>
			<th>Requirement</th>
			<th>Specifications</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>**Resolution**</td>
			<td>Exactly 2560 x 1440 pixels</td>
		</tr>
		<tr>
			<td>**Color**</td>
			<td>sRGB</td>
		</tr>
		<tr>
			<td>**Alpha channel**</td>
			<td>None, export flattened RGB with no transparency.<br /><br /><Alert severity="warning">Many art tools export a `.png` with an alpha channel, even when the image contains no transparent pixels. It's important to turn off the alpha channel in the export settings, or flatten the image and export a `.jpg` instead.</Alert></td>
		</tr>
		<tr>
			<td>**File format**</td>
			<td>`.jpg`, `.png`, `.tga`, or `.bmp`</td>
		</tr>
		<tr>
			<td>**File size**</td>
			<td>20 MB or smaller</td>
		</tr>
	</tbody>
</table>

<Alert severity="info">
Roblox applies an edge fade so the background blends into surrounding UI, so it's important to export the image without a fade of your own. For information on where you should place detail inside the frame, see [Template zones](./index.md#template-zones).
</Alert>

## Content requirements

Like all avatar assets, backgrounds must follow Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards) and [Marketplace policies](../../marketplace/marketplace-policy.md).
