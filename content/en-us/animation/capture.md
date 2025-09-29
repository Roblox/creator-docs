---
title: Animation capture
description: Animation Capture in the Animation Editor allows you to generate high-quality, realistic animations for faces and bodies.
---

import BetaAlert from '../includes/beta-features/beta-alert.md'

You can record or upload video content to the [Animation Editor](../animation/editor.md) to quickly capture movement and expressions as animation keyframes. These tools can create unique and realistic animations within minutes while providing access to the animation keyframes for additional adjustments.

The Animation Capture tools allow you to:

- [Record your face](#face) with a webcam to puppeteer characters with [animation compatible heads](../art/characters/facial-animation/index.md).
- [Upload full-body video content](#body) to generate high quality realistic animations for an entire character.

## Face

**Animation Capture - Face** allows you to use your camera to puppeteer rigs with [animation compatible heads](../art/characters/facial-animation/index.md) and generate corresponding keyframes to your movement.

With the ability to record up to 60-second animations, you can quickly provide both your playable and nonplayable characters the means to realistically grin, raise their eyebrows, drop their jaw, or any other expression necessary for your experience.

<video src="../assets/animation/face-recorder/Face-Recorder.mp4" controls width="100%"></video>

<BetaAlert betaName="Face Capture" leadIn="To ensure that you are able to utilize your camera to record and create facial animations, you must first enable the beta feature through " leadOut=". If you do not enable the beta, the Animation Editor only displays its default UI options without face recording functionality." components={props.components} />

### Record face animations

Before you begin to record your face, ensure that you're in a well lit room close enough to your camera so that your face is in the center of your camera's recording frame. This increases your camera's ability to distinguish you from your surroundings so that you can accurately puppeteer your avatar and create high-quality animations.

To record your face and create an animation:

1. From the toolbar's **Avatar** tab, click **Animation**. The [Animation Editor](../animation/editor.md) window displays.
2. In the **Explorer** window, select the rig you want your video to animate. A dialog displays.

   <img src="../assets/animation/animation-editor/Create-Animation-Dialog.png"
   width="380" />

3. In the **Animation Name** field, enter a new animation name, then click the **Create** button. The **Animation Editor** window displays the media and playback controls, timeline, and track list.

4. Navigate to the **track list** and click the **Face Capture** button. A pop-up displays asking you to acknowledge that you consent to the collection of your facial movements to enable the feature and camera access.

   <img src="../assets/animation/face-recorder/Face-Recorder-Button.jpg"
   width="80%" />

5. (Optional) If you have multiple cameras, choose which camera you want to use to record.

   1. Select the **…** button. The **Select a camera** dialog displays.

      <img src="../assets/animation/face-recorder/Multiple-Cameras.jpg"
      width="80%" />

   1. Click the dropdown arrow and select a camera.
   1. Click the **Confirm** button.

6. Click the red circle. Your camera begins recording your facial movements.

   <img src="../assets/animation/face-recorder/Ready-Button.jpg" width="150" />

7. When you finish your recording, click either the red square or countdown timer. Keyframes that correspond to your facial movement display within the timeline.

   <img src="../assets/animation/face-recorder/Countdown-Button.jpg" width="150" />

8. (Optional) If you'd like to delete that recording and try again, click the Re-Record button.

   <img src="../assets/animation/face-recorder/Re-Record-Button.jpg" width="150" />

After you finish your recording, you can [fine-tune](../animation/editor.md#keyframes) the keyframes, [save](../animation/editor.md#save-an-animation) your animation, then [export](../animation/editor.md#export-an-animation) it to use across all of your experiences.

## Body

The **Animation Capture - Body** allows you to quickly generate high-quality, realistic full-body animations for your R15 rigs by uploading videos to use to track the body's movement and generate corresponding keyframes. This significantly speeds up the manual process of creating animations, and allows you to personalize your avatars and NPCs with life-like mannerisms in a few minutes.

<video src="../assets/animation/live-animation-creator/Live-Animation-Creator.mp4" controls width="100%"></video>

<BetaAlert betaName="Live Animation Creator" leadIn="To import a video for animation creation, you must first enable the beta feature through " leadOut=". If you do not enable the beta, the Animation Editor only displays its default UI options without live animation creation functionality." components={props.components} />

### Import videos for animation

Before you import a video to the **Animation Editor**, ensure the `.mp4` or `.mov` file meets the following requirements:

- It includes just one person who is well-lit and visible throughout the video.
- It only contains a continuous single shot that's less than 15 seconds from a stable camera.
- It adheres to Roblox's [Community Rules](https://en.help.roblox.com/hc/articles/203313410) and [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846).

To import a video to create an animation:

1. From the toolbar's **Avatar** tab, click **Animation**. The [Animation Editor](../animation/editor.md) window displays.
2. In the **Explorer** window, select the R15 rig you want your video to animate. A dialog displays.

   <img src="../assets/animation/animation-editor/Create-Animation-Dialog.png"
   width="380" />

3. In the **Animation Name** field, enter a new animation name, then click the **Create** button. The editor window displays the media and playback controls, timeline, and track list.
4. Navigate to the **Media and Playback Controls** and click the **…** button. A pop-up menu displays.

   <img src="../assets/animation/live-animation-creator/Media-Playback-Controls.jpg"width="330" />

5. Hover over **Import**, then click **Live Animation Creator** from the contextual menu. A contextual menu displays.

   <img src="../assets/animation/live-animation-creator/Import-Contextual-Menu.jpg"width="60%" />

6. Click the **Choose Video** button.
7. Select the video you want to import from your local machine, then click the **Open** button. After about a minute, keyframes that correspond to movement in your video display within the timeline.

After your import is successful, you can [save](../animation/editor.md#save-an-animation) and [export](../animation/editor.md#export-an-animation) your animation to use across all of your experiences.
