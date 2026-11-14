---
title: How avatar head validation works on Roblox
description: "Spoken captions; API names can be wrong. This video covers how Roblox's validation works with avatar heads, and common issues creators may encounter when uploading their own heads. Covers: cage landmarks, 17 FACS poses, a cage off the mesh, landmarks that stay still."
date: '2026-02-23'
transcript: true
related:
  - avatar/dynamic-heads/validate.md
  - avatar/dynamic-heads/specifications.md
  - Marketplace/validation-system.md
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/OwhkWzSBnf0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Spoken captions of [How avatar head validation works on Roblox](https://www.youtube.com/watch?v=OwhkWzSBnf0), published on the [Roblox Creators YouTube channel](https://www.youtube.com/@RobloxCreators) on February 23, 2026. API names in these captions can be wrong.

Prefer the written documentation: [Dynamic head validation](../avatar/dynamic-heads/validate.md), [Dynamic head specifications](../avatar/dynamic-heads/specifications.md), [UGC validation system](../marketplace/validation-system.md).

Resources: [devforum.roblox.com/c/bug-reports/10](https://devforum.roblox.com/c/bug-reports/10), [create.roblox.com/docs/art/characters/head-validation](https://create.roblox.com/docs/art/characters/head-validation), [create.roblox.com/docs/art/characters/head-specifications](https://create.roblox.com/docs/art/characters/head-specifications), [create.roblox.com/docs/art/validation-errors](https://create.roblox.com/docs/art/validation-errors).

## How avatar head validation works on Roblox: Introduction ([0:00](https://www.youtube.com/watch?v=OwhkWzSBnf0&t=0s))

Hello! This video is a deep dive into head validation. Heads are the most complex avatar body part and understanding exactly how validation works can save you time in your creation workflow. This video will cover what is validation and why it's important, how Roblox validates dynamic heads, and common issues and best practices when creating and troubleshooting your avatar head.

Whether you're a seasoned creator or you just started working with Roblox avatar items, it's important to understand the validation process for assets destined for the Marketplace. This video is intended for viewers who are familiar with 3D avatar asset creation and already understand the fundamentals of various avatar components, such as base meshes, cages, rigging, facial animation, and more. If any of this is brand new to you, check out these other videos to get up to speed on creating Roblox UGC.

## How avatar head validation works on Roblox: What is validation ([0:50](https://www.youtube.com/watch?v=OwhkWzSBnf0&t=50s))

Validation is the automated process Roblox uses to check your assets before they can be published to the Marketplace. It ensures that your model meets the technical specifications to behave correctly no matter what experience you're in, especially when it comes to animations and equipping other cosmetics.

Like all assets on Roblox's platform-wide Marketplace, Roblox heads must meet a set of general requirements, just like any other avatar body part: appropriate scale, no inverted geometry, meeting texture specifications, and more. Check out the [documentation](../avatar/dynamic-heads/specifications.md) for a comprehensive spec sheet.

Since heads are complex creations, heads require additional validation to ensure that the head is dynamic, meaning that the head can animate and equip accessories and cosmetics correctly.

## How avatar head validation works on Roblox: How validation works ([1:36](https://www.youtube.com/watch?v=OwhkWzSBnf0&t=96s))

So how does Roblox confirm that a head is dynamic? The validation utilizes the head cage to project various points called landmarks onto the surface of the head. Using these landmarks, the validation process can track how much of these key parts of your head surface move during basic animations.

Roblox only checks for five basic facial animations: `LeftEyeClosed`, `RightEyeClosed`, mouth opens, and a happy and sad expression. These five actions are handled by a specific set of 17 FACS poses. During these five animation checks, the validation verifies that these landmarks move as expected when your character blinks, smiles, and frowns. If all of your landmarks move as expected for each animation, then the validation for dynamic heads is successful.

## How avatar head validation works on Roblox: Common issues ([2:23](https://www.youtube.com/watch?v=OwhkWzSBnf0&t=143s))

If you see an error mentioning that the validation could not detect a substantial change in your dynamic head, you should verify that your landmarks and caging are correct. There are a few common issues with validation where the validation is unable to project landmarks from the cage or not detecting movement from the landmarks when testing animations.

Let's dive into the first issue: unable to project landmarks. In this case, the validation tool is unable to use your cage to project all 18 expected landmarks. This is commonly caused because the specific vertices of your cage aren't directly over the surface of your mesh. This can occur in the following ways: the head cage extends beyond the mesh of the head.

## How avatar head validation works on Roblox: Issue 1- Landmark projection ([2:47](https://www.youtube.com/watch?v=OwhkWzSBnf0&t=167s))

The head has gaps or hollow shapes where landmarks can't be projected, the cage is below the surface of your head, and, if you're using separate meshes for your eyeballs or using a mouth bag, the landmarks can apply unexpectedly onto those mesh objects.

## How avatar head validation works on Roblox: Issue 2 - Detecting animations ([3:26](https://www.youtube.com/watch?v=OwhkWzSBnf0&t=206s))

All in all, double-check that your cage is kept close over the surface of your head mesh to ensure that all the landmarks can apply successfully. If you continue to have this issue with validation, try minor cage adjustments to change where the landmarks are positioned onto your head surface and try validating again.

The second common issue is that the validation doesn't detect movement from the landmarks when testing animation. In this scenario, the landmarks are successfully applied, but the tool can't detect movement when trying to animate. This can happen if your landmarks are projected onto an area that doesn't actually animate or maybe the animation doesn't move the landmark positions enough.

In this situation, you should also double-check that your cage vertices, especially the landmark projection points, are directly over the surface of the area of your head meshes that move the most in these animations. It might be the case that these landmarks are in the correct spot anatomically, but that particular surface doesn't move all that much during the actual animations.

## How avatar head validation works on Roblox: General troubleshooting ([4:21](https://www.youtube.com/watch?v=OwhkWzSBnf0&t=261s))

You should also double-check that your animations are complete. Maybe the model's blinking pose doesn't actually close the eyes all the way. Another thing I want to call out is that these actions are driven by a specific set of [17 FACS poses](../avatar/dynamic-heads/specifications.md#facs-poses). When you are creating and mapping your FACS animations, prioritize these animations for the 17 poses to ensure that the proper movement is being applied to the model's face.

These would also be the first 17 FACS poses that I check if I'm failing validation due to facial animation issues. During validation, you may run into other validation issues. Some of them might be more straightforward than others. For more information on these, check out the [documentation](../marketplace/validation-system.md), and for any sticky situations, feel free to post a bug report on the DevForum.

The documentation also has a slew of other best practices and tips, such as tips about positioning the mouth vertices or working with non-humanoids. It's hard to keep a video up to date, so check out the docs and the DevForum if you run into any problems.
