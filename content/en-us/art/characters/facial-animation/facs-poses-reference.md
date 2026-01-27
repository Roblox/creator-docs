---
title: FACS poses reference
description: The Facial Action Coding System (FACS) ensures that all face animations have a common pose reference and can create similar face animations.
---

The [Facial Action Coding System](https://en.wikipedia.org/wiki/Facial_Action_Coding_System) (FACS) is a comprehensive, anatomically-based system for describing all visually discernible facial movement. This system breaks down all facial expressions into individual types of muscle movement, such as `LeftEyeClosed` or `MouthLeft`. You can [configure](../../../art/characters/facial-animation/create-basic-heads.md#pose) and store these muscle movements, or **poses**, within the head model through a third-party modeling software, such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview). When you import the head model into Studio, you can then access and [animate](../../../art/characters/facial-animation/animate-heads.md) these poses to create lively facial expressions.

The following is a list of 50 base poses that you can use in Roblox to portray a wide range of face emotions. Except for the first neutral pose, the order of poses you save to your character model doesn't matter since this information is set during the [mapping](../../../art/characters/facial-animation/create-basic-heads.md#map) process as a custom property.

<Alert severity = 'warning'>
If you intend to publish your avatar to the Marketplace, your avatar head must include the required [17 facial base poses](../../../art/characters/specifications.md#facial-animations). Marketplace validation rejects assets that do not include these 17 required base poses.
</Alert>

You can combine multiple FACS base poses together in one animation frame to create complex facial expressions. However, some combinations of poses might collide unless you also add a [corrective](../../../art/characters/facial-animation/create-basic-heads.md#combination-poses) to their full default values.

## LeftEyeClosed

<Alert severity = 'warning'>
 If publishing to the Marketplace, your avatar asset must include this pose.
</Alert>

`Class.FaceControls.LeftEyeClosed|LeftEyeClosed` closes the character's left eyelid.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftEyeClosedA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftEyeClosedB.mp4" width="70%"></video>
</GridContainer>

## RightEyeClosed

<Alert severity = 'warning'>
 If publishing to the Marketplace, your avatar asset must include this pose.
</Alert>

`Class.FaceControls.RightEyeClosed|RightEyeClosed` closes the character's right eyelid.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightEyeClosedA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightEyeClosedB.mp4" width="70%"></video>
</GridContainer>

## EyesLookDown

<Alert severity = 'warning'>
 If publishing to the Marketplace, your avatar asset must include this pose.
</Alert>

`Class.FaceControls.EyesLookDown|EyesLookDown` makes the eyes gaze down.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/EyesLookDownA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/EyesLookDownB.mp4" width="70%"></video>
</GridContainer>

## JawDrop

<Alert severity = 'warning'>
 If publishing to the Marketplace, your avatar asset must include this pose.
</Alert>

`Class.FaceControls.JawDrop|JawDrop` lowers the jaw downward, opening the mouth.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/JawDropA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/JawDropB.mp4" width="70%"></video>
</GridContainer>

## Pucker

<Alert severity = 'warning'>
 If publishing to the Marketplace, your avatar asset must include this pose.
</Alert>

`Class.FaceControls.Pucker|Pucker` makes a kiss-like shape with the mouth.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/PuckerA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/PuckerB.mp4" width="70%"></video>
</GridContainer>

## LeftLipCornerPuller

<Alert severity = 'warning'>
 If publishing to the Marketplace, your avatar asset must include this pose.
</Alert>

`Class.FaceControls.LeftLipCornerPuller|LeftLipCornerPuller` raises the corners of the mouth upwards in a smile.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftLipCornerPullerA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftLipCornerPullerB.mp4" width="70%"></video>
</GridContainer>

## RightLipCornerPuller

<Alert severity = 'warning'>
 If publishing to the Marketplace, your avatar asset must include this pose.
</Alert>

`Class.FaceControls.RightLipCornerPuller|RightLipCornerPuller` raises the corners of the mouth upwards in a smile.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightLipCornerPullerA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightLipCornerPullerB.mp4" width="70%"></video>
</GridContainer>

## ChinRaiser

<Alert severity = 'warning'>
 If publishing to the Marketplace, your avatar asset must include this pose.
</Alert>

`Class.FaceControls.ChinRaiser|ChinRaiser` raises the chin up; moves the lower lip upwards.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/ChinRaiserA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/ChinRaiserB.mp4" width="70%"></video>
</GridContainer>

When you use `Class.FaceControls.ChinRaiser|ChinRaiser` and the character's mouth is closed, the character's lower lip collides with their upper lip. When you need to keep the mouth closed while raising the chin, use [`ChinRaiserUpperLip`](#chinraiserupperlip) and `Class.FaceControls.ChinRaiser|ChinRaiser` together to raise both the lower and upper lip, and avoid a collision. Note that if you use this method, you must set both `Class.FaceControls.ChinRaiser|ChinRaiser` and [`ChinRaiserUpperLip`](#chinraiserupperlip) to the same value so the lips move the same distance upwards.

## ChinRaiserUpperLip

<Alert severity = 'warning'>
 If publishing to the Marketplace, your avatar asset must include this pose.
</Alert>

`Class.FaceControls.ChinRaiserUpperLip|ChinRaiserUpperLip` raises the upper lip up when ChinRaiser is engaged and it is touching the upper lip.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/ChinRaiserUpperLipA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/ChinRaiserUpperLipB.mp4" width="70%"></video>
</GridContainer>

## LeftCheekRaiser

<Alert severity = 'warning'>
 If publishing to the Marketplace, your avatar asset must include this pose.
</Alert>

`Class.FaceControls.LeftCheekRaiser|LeftCheekRaiser` squints the character's left eye.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftCheekRaiserA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftCheekRaiserB.mp4" width="70%"></video>
</GridContainer>

## RightCheekRaiser

<Alert severity = 'warning'>
 If publishing to the Marketplace, your avatar asset must include this pose.
</Alert>

`Class.FaceControls.RightCheekRaiser|RightCheekRaiser` squints the character's right eye.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightCheekRaiserA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightCheekRaiserB.mp4" width="70%"></video>
</GridContainer>

## LeftInnerBrowRaiser

<Alert severity = 'warning'>
 If publishing to the Marketplace, your avatar asset must include this pose.
</Alert>

`Class.FaceControls.LeftInnerBrowRaiser|LeftInnerBrowRaiser` raises the interior half of the character's left brow upwards.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftInnerBrowRaiserA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftInnerBrowRaiserB.mp4" width="70%"></video>
</GridContainer>

## RightInnerBrowRaiser

<Alert severity = 'warning'>
 If publishing to the Marketplace, your avatar asset must include this pose.
</Alert>

`Class.FaceControls.RightInnerBrowRaiser|RightInnerBrowRaiser` raises the interior half of the character's right brow upwards.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightInnerBrowRaiserA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightInnerBrowRaiserB.mp4" width="70%"></video>
</GridContainer>

## LeftLipCornerDown

<Alert severity = 'warning'>
 If publishing to the Marketplace, your avatar asset must include this pose.
</Alert>

`Class.FaceControls.LeftLipCornerDown|LeftLipCornerDown` lowers the corners of the mouth downwards in a frown.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftLipCornerDownA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftLipCornerDownB.mp4" width="70%"></video>
</GridContainer>

## RightLipCornerDown

<Alert severity = 'warning'>
 If publishing to the Marketplace, your avatar asset must include this pose.
</Alert>

`Class.FaceControls.RightLipCornerDown|RightLipCornerDown` lowers the corners of the mouth downwards in a frown.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightLipCornerDownA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightLipCornerDownB.mp4" width="70%"></video>
</GridContainer>

## LeftLowerLipDepressor

<Alert severity = 'warning'>
 If publishing to the Marketplace, your avatar asset must include this pose.
</Alert>

`Class.FaceControls.LeftLowerLipDepressor|LeftLowerLipDepressor` lowers the lower lip downwards away from the upper lip, revealing the lower teeth.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftLowerLipDepressorA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftLowerLipDepressorB.mp4" width="70%"></video>
</GridContainer>

## RightLowerLipDepressor

<Alert severity = 'warning'>
 If publishing to the Marketplace, your avatar asset must include this pose.
</Alert>

`Class.FaceControls.RightLowerLipDepressor|RightLowerLipDepressor` lowers the lower lip down away from the upper lip revealing the lower teeth.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightLowerLipDepressorA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightLowerLipDepressorB.mp4" width="70%"></video>
</GridContainer>

## EyesLookLeft

`Class.FaceControls.EyesLookLeft|EyesLookLeft` makes the eyes gaze left.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/EyesLookLeftA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/EyesLookLeftB.mp4" width="70%"></video>
</GridContainer>

## EyesLookRight

`Class.FaceControls.EyesLookRight|EyesLookRight` makes the eyes gaze right.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/EyesLookRightA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/EyesLookRightB.mp4" width="70%"></video>
</GridContainer>

## EyesLookUp

`Class.FaceControls.EyesLookUp|EyesLookUp` makes the eyes gaze up.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/EyesLookUpA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/EyesLookUpB.mp4" width="70%"></video>
</GridContainer>

## LeftLipStretcher

`Class.FaceControls.LeftLipStretcher|LeftLipStretcher` stretches the corners of the mouth apart.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftLipStretcherA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftLipStretcherB.mp4" width="70%"></video>
</GridContainer>

## LeftUpperLipRaiser

`Class.FaceControls.LeftUpperLipRaiser|LeftUpperLipRaiser` raises the character's left upper lip away from the lower lip revealing the upper teeth.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftUpperLipRaiserA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftUpperLipRaiserB.mp4" width="70%"></video>
</GridContainer>

## LipsTogether

`Class.FaceControls.LipsTogether|LipsTogether` brings the character's lips together. However, if the character's mouth is closed, their lips are already together and they collide.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LipsTogetherA-1.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LipsTogetherB-1.mp4" width="70%"></video>
</GridContainer>

This pose's main use case is in connection with the [`JawDrop`](#jawdrop) property. If you set [`JawDrop`](#jawdrop) and `Class.FaceControls.LipsTogether|LipsTogether` to 100% of their default values, the character's lips stay together as the jaw drops.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LipsTogetherA-2.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LipsTogetherB-2.mp4" width="70%"></video>
</GridContainer>

In addition, if you set [`JawDrop`](#jawdrop) to 100% of its default value, and ease `Class.FaceControls.LipsTogether|LipsTogether` in and out of 100% of its default value, the character's lips open and close.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LipsTogetherA-3.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LipsTogetherB-3.mp4" width="70%"></video>
</GridContainer>

## RightLipStretcher

`Class.FaceControls.RightLipStretcher|RightLipStretcher` stretches the corners of the mouth apart.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightLipStretcherA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightLipStretcherB.mp4" width="70%"></video>
</GridContainer>

## RightUpperLipRaiser

`Class.FaceControls.RightUpperLipRaiser|RightUpperLipRaiser` raises the right upper lip away from the lower lip, revealing the upper teeth.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightUpperLipRaiserA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightUpperLipRaiserB.mp4" width="70%"></video>
</GridContainer>

## FlatPucker

`Class.FaceControls.FlatPucker|FlatPucker` brings the corners of the mouth inward and presses the lips back against the teeth. This pose is also known as lip tightener.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/FlatPuckerA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/FlatPuckerB.mp4" width="70%"></video>
</GridContainer>

## Funneler

`Class.FaceControls.Funneler|Funneler` makes an 'O' shape with the mouth.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/FunnelerA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/FunnelerB.mp4" width="70%"></video>
</GridContainer>

## LowerLipSuck

`Class.FaceControls.LowerLipSuck|LowerLipSuck` rolls the lower lip up over the teeth.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LowerLipSuckA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LowerLipSuckB.mp4" width="70%"></video>
</GridContainer>

## LipPresser

`Class.FaceControls.LipPresser|LipPresser` presses the lips together.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LipPresserA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LipPresserB.mp4" width="70%"></video>
</GridContainer>

## MouthLeft

`Class.FaceControls.MouthLeft|MouthLeft` moves the mouth to the character's left. This property doesn't move the character's jaw, teeth, or tongue, only their mouth. If you want to move those additional facial features, use [`JawLeft`](#jawleft) instead.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/MouthLeftA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/MouthLeftB.mp4" width="70%"></video>
</GridContainer>

## MouthRight

`Class.FaceControls.MouthRight|MouthRight` moves the mouth to the character's right. This property doesn't move the character's jaw, teeth, or tongue to the right, only their mouth. If you want to move those additional facial features, use [`JawRight`](#jawright) instead.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/MouthRightA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/MouthRightB.mp4" width="70%"></video>
</GridContainer>

## UpperLipSuck

`Class.FaceControls.UpperLipSuck|UpperLipSuck` rolls the upper lip around the teeth.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/UpperLipSuckA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/UpperLipSuckB.mp4" width="70%"></video>
</GridContainer>

## LeftCheekPuff

`Class.FaceControls.LeftCheekPuff|LeftCheekPuff` puffs up the character's left cheek.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftCheekPuffA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftCheekPuffB.mp4" width="70%"></video>
</GridContainer>

## LeftDimpler

`Class.FaceControls.LeftDimpler|LeftDimpler` moves the corners of the left side of the mouth back toward the teeth.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftDimplerA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftDimplerB.mp4" width="70%"></video>
</GridContainer>

## RightCheekPuff

`Class.FaceControls.RightCheekPuff|RightCheekPuff` puffs up the character's right cheek.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightCheekPuffA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightCheekPuffB.mp4" width="70%"></video>
</GridContainer>

## RightDimpler

`Class.FaceControls.RightDimpler|RightDimpler` moves the corners of the right side of the mouth back toward the teeth.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightDimplerA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightDimplerB.mp4" width="70%"></video>
</GridContainer>

## JawLeft

`Class.FaceControls.JawLeft|JawLeft` moves the character's jaw, teeth, tongue, and lower lip to their left. If you just want to move the character's mouth to their left, use [`MouthLeft`](#mouthleft) instead.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/JawLeftA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/JawLeftB.mp4" width="70%"></video>
</GridContainer>

## JawRight

`Class.FaceControls.JawRight|JawRight` moves the character's jaw, teeth, tongue, and lower lip to their right. If you just want to move the character's mouth to their right, use [`MouthRight`](#mouthright) instead.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/JawRightA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/JawRightB.mp4" width="70%"></video>
</GridContainer>

## Corrugator

`Class.FaceControls.Corrugator|Corrugator` brings the left and right brows inward together.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/CorrugatorA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/CorrugatorB.mp4" width="70%"></video>
</GridContainer>

## LeftBrowLowerer

`Class.FaceControls.LeftBrowLowerer|LeftBrowLowerer` lowers the character's left brow down.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftBrowLowererA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftBrowLowererB.mp4" width="70%"></video>
</GridContainer>

## LeftOuterBrowRaiser

`Class.FaceControls.LeftOuterBrowRaiser|LeftOuterBrowRaiser` raises the outer part of the character's left brow upwards.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftOuterBrowRaiserA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftOuterBrowRaiserB.mp4" width="70%"></video>
</GridContainer>

## LeftNoseWrinkler

`Class.FaceControls.LeftNoseWrinkler|LeftNoseWrinkler` raises the character's left nostril, pulls the brow down slightly, and wrinkles the left side of the nose.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftNoseWrinklerA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftNoseWrinklerB.mp4" width="70%"></video>
</GridContainer>

## RightBrowLowerer

`Class.FaceControls.RightBrowLowerer|RightBrowLowerer` lowers the character's right brow down.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightBrowLowererA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightBrowLowererB.mp4" width="70%"></video>
</GridContainer>

## RightOuterBrowRaiser

`Class.FaceControls.RightOuterBrowRaiser|RightOuterBrowRaiser` raises the outer part of the character's right brow upwards.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightOuterBrowRaiserA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightOuterBrowRaiserB.mp4" width="70%"></video>
</GridContainer>

## RightNoseWrinkler

`Class.FaceControls.RightNoseWrinkler|RightNoseWrinkler` raises the character's right nostril, pulls the brow down slightly, and wrinkles the right side of the nose.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightNoseWrinklerA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightNoseWrinklerB.mp4" width="70%"></video>
</GridContainer>

## LeftEyeUpperLidRaiser

`Class.FaceControls.LeftEyeUpperLidRaiser|LeftEyeUpperLidRaiser` raises the character's left eyelid upwards to reveal more of the eye white above the iris.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftEyeUpperLidRaiserA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/LeftEyeUpperLidRaiserB.mp4" width="70%"></video>
</GridContainer>

## RightEyeUpperLidRaiser

`Class.FaceControls.RightEyeUpperLidRaiser|RightEyeUpperLidRaiser` raises the character's right eyelid upwards to reveal more of the eye white above the iris.

<GridContainer numColumns="2">
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightEyeUpperLidRaiserA.mp4" width="70%"></video>
  <video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/RightEyeUpperLidRaiserB.mp4" width="70%"></video>
</GridContainer>

## TongueDown

`Class.FaceControls.TongueDown|TongueDown` bends the tongue down. This pose is only visible if you combine it with [`TongueOut`](#tongueout), otherwise the tongue only bends down within the character's mouth.

<video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/TongueDown.mp4" width="30%"></video>

## TongueOut

`Class.FaceControls.TongueOut|TongueOut` sticks the tip of the tongue out of the mouth.

<video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/TongueOut.mp4" width="30%"></video>

## TongueUp

`Class.FaceControls.TongueUp|TongueUp` bends the tongue up. This pose is only visible if you combine it with [`TongueOut`](#tongueout), otherwise the tongue only bends up within the character's mouth.

<video controls muted src="../../../assets/avatar/dynamic-heads/facs-pose-reference/TongueUp.mp4" width="30%"></video>
