---
title: Thumbnails
description: Thumbnail images and videos appear on the Roblox home page and at the top of an experience's detail page to showcase features and share information.
---

Thumbnails appear on Roblox's [Home](https://www.roblox.com/home) page and at the top of your experience's detail page, allowing you to showcase your experience's features and announce updates or events.

<img src="../../assets/publishing/experiences-places-assets/Experience-Page-Example.jpg" width="1120" />

To access your thumbnails:

1. In the [Creator Dashboard](https://create.roblox.com/dashboard/creations), select the experience you want to upload a thumbnail for.
2. Go to **Configure** &rang; **Places** and select a place.
3. Click **Thumbnails & Videos** in the left nav, then use the **Home Page** tab and the **Experience Detail Page** tab to customize your experience's thumbnails for these two spaces.

## Manage thumbnails

You can feature up to 10 images or videos for each of your experiences' detail pages. All uploaded images and videos are moderated to make sure they adhere to the [Community Rules](https://en.help.roblox.com/hc/articles/203313410) and [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846).

<table>
<thead>
  <tr>
    <th>Type</th>
    <th>Description</th>
		<th>Cost / Quota</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Image**</td>
    <td>An [uploaded image](#images) which supplements the experience [icon](../publishing/experience-icons.md) and helps players know what the experience offers.</td>
		<td>Free</td>
  </tr>
	<tr>
    <td>**Uploaded Video**</td>
    <td>An [uploaded authentic video](#videos), useful for displaying gameplay previews and other in-experience features.</td>
		<td>Free, with monthly quota of 3 uploads</td>
  </tr>
	<tr>
    <td>**Auto‑Generated**</td>
    <td>An auto‑generated image based on Studio's camera position for the most recent publish of the place.</td>
		<td>Free</td>
  </tr>
</tbody>
</table>

Uploaded thumbnails appear in the **Experience Detail Page** tab where they can be reordered, deleted, or given "alt" text for improved [accessibility](../../production/publishing/accessibility.md).

<img src="../../assets/creator-dashboard/Manage-Thumbnails.png" width="840" alt="Thumbnails and related actions on the Creator Dashboard" />

### Images

A thumbnail image should be **16:9 aspect ratio** and ideally **1920×1080 pixels** so that it always displays in high resolution across the Roblox site and app. Supported formats include `.jpg`, `.gif`, `.png`, `.tga`, or `.bmp`. See [best practices](#best-practices) for additional design recommendations.

### Videos

<Alert severity="warning">
Xbox , PlayStation, and VR headsets do not currently support video thumbnails.
</Alert>

Video thumbnails should be **authentic** and [accurately portray in‑experience content](#video-accuracy) without misleading alterations. **All videos will be reviewed** to ensure they accurately reflect the experience and do not violate the [Community Rules](https://en.help.roblox.com/hc/articles/203313410) or [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846).

Certain modifications are acceptable, as long as they don't misrepresent the core experience:

<Card>
<CardContent style={{paddingBottom: '0px'}}>
<Alert severity="success" variant="outlined">
**Camera Work** — Using varied camera angles for aesthetic or cinematic purposes is fine, as long as they showcase real gameplay. Studio's [free camera mode](#free-camera-mode) is especially helpful for capturing different vantage points.
</Alert>
<Alert severity="success" variant="outlined">
**Minor Post-Processing** — Small adjustments like brightness, contrast, or minor visual effects are acceptable if they don't fundamentally alter the visual fidelity of the actual experience. It's also acceptable to overlay your experience's logo or branding in a video.
</Alert>
<Alert severity="success" variant="outlined">
**Curated Sequences** — You can showcase optimized or highlight-reel playthroughs. These sequences don't need to be strictly linear but they must display actual gameplay mechanics and interactions.
</Alert>
<Alert severity="success" variant="outlined">
**In-Experience UI Text** — Text that is part of your experience's UI (character names, menus, notifications that appear to the player, etc.) is acceptable because it's part of the authentic in‑experience view.
</Alert>
<Alert severity="success" variant="outlined">
**Music Tracks** — Videos can contain music from Roblox's [catalog](https://create.roblox.com/store/audio) as governed by Roblox's internal licensing arrangements.
</Alert>
</CardContent>
</Card><br />

To prevent misleading players, please adhere to the following policies. Videos which do not adhere to these policies will be **rejected for distribution** and count against the monthly quota of 3 video uploads.

<Card>
<CardContent style={{paddingBottom: '0px'}}>
<Alert severity="error" variant="outlined">
**Misrepresented Gameplay** — Do not display gameplay mechanics, UI elements, or interactions that are not actually available in your experience. For instance, a roleplay experience should not be marketed as a racing game. Also ensure the video accurately reflects the core themes, for example a horror experience should depict horror elements and not misrepresent its theme.
</Alert>
<Alert severity="error" variant="outlined">
**Artificial Visuals** — Graphics shown must be representative of the actual in-experience visuals. Avoid artificially enhancing graphics beyond what a player will experience.
</Alert>
<Alert severity="error" variant="outlined">
**External Content & Overlays** — Don't include real-life footage of people, places, or any other content external to your experience.
</Alert>
<Alert severity="error" variant="outlined">
**Spoken Audio** — Added voice-overs, narration, voice chat conversations, and music with lyrics is **not** permitted.
</Alert>
<Alert severity="error" variant="outlined">
**Text, Claims, and Advertisements** — Overlay text sparingly and only to describe gameplay contexts such as "Collect coins to boost jumps." Do not include any text, visuals, or audio that is an advertisement, promotion, or subjective claim, for example "50% off" or "Free UGC!".
</Alert>
</CardContent>
</Card>

## Free camera mode

Studio's **free camera mode** is a useful tool to capture in-experience screenshots and videos because it allows you to move the camera to vantage points which may not be possible through the default view camera. To enable free camera mode:

1. Go to an experience where you have server-side [Developer Console](../../studio/developer-console.md) access.
2. Initiate a solo [playtesting](../../studio/testing-modes.md#playtesting) session.

   <img src="../../assets/studio/general/Mezzanine-Testing-Mode-Test.png" width="800" alt="Test option in the testing modes dropdown of Studio's mezzanine." />

3. Press <kbd>Left Shift</kbd> and <kbd>P</kbd>.

Once in free camera mode, you can use the following controls:

<table>
<thead>
  <tr>
    <th>Keys/shortcuts</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd></td>
    <td>Moves the camera forward/left/back/right.</td>
  </tr>
  <tr>
    <td><kbd>Q</kbd> <kbd>E</kbd></td>
    <td>Moves the camera down/up.</td>
  </tr>
	<tr>
    <td><kbd>Z</kbd> <kbd>C</kbd></td>
    <td>Tilts the camera left/right (roll).</td>
  </tr>
  <tr>
    <td><kbd>Z</kbd> <kbd>C</kbd></td>
    <td>Tilts the camera left/right (roll).</td>
  </tr>
  <tr>
    <td><kbd>Shift</kbd></td>
    <td>In combination with any movement key, changes the camera speed.</td>
  </tr>
  <tr>
    <td>**Right mouse button**</td>
    <td>When pressed, dragging the mouse moves the camera view around.</td>
  </tr>
  <tr>
    <td>**Mouse scroll wheel**</td>
    <td>Zooms the camera in or out.</td>
  </tr>
  <tr>
    <td><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>G</kbd>&nbsp;(Windows)<br /><kbd>⌘</kbd><kbd>Shift</kbd><kbd>G</kbd> (Mac)</td>
    <td>Disables all `Class.CoreGui|CoreGuis` but not developer-created GUIs.</td>
  </tr>
  <tr>
    <td><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>C</kbd>&nbsp;(Windows)<br /><kbd>⌘</kbd><kbd>Shift</kbd><kbd>C</kbd> (Mac)</td>
    <td>Disables all developer-created GUIs but not `Class.CoreGui|CoreGuis`.</td>
  </tr>
</tbody>
</table>

## Home page personalization

**Thumbnail personalization** helps you attract more users to your experience by showing the most relevant thumbnail to each user on their [Home](https://www.roblox.com/home) page. The goal of thumbnail personalization is to improve your qualified play through rate, which is the percentage of users that actively engage with your experience for a significant amount of time.

<Alert severity="success">
During testing, experiences using thumbnail personalization had an average increase of +8.5% in their qualified play through rate. Some experiences had an increase of +50%.
</Alert>

Thumbnail personalization only starts when you activate 2 or more thumbnails. If only one of your thumbnails is active, all users see that thumbnail for your experience on their home page.

After you set up and activate thumbnail personalization, its algorithm shows each thumbnail to a random set of users to get data on the qualified play through rate for each user group. It then gives more impressions to the winning thumbnail for each group, but still gives the other thumbnails minimal traffic to continue exploration.

<br/>

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/5NvGzKVyKxg" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

### Set up thumbnail personalization

To set up thumbnail personalization:

1. In the **Home Page** tab, click **Edit active thumbnails**.
2. Upload new thumbnails or activate existing thumbnails.
   - To upload new thumbnails, click **Upload thumbnails** and select and confirm the images you want to use. Make sure to keep these images under 3MB and 1920×1080 pixels.
   - To activate existing thumbnails, enable the **Active** checkbox next to 2-5 thumbnails.
3. Click **Save changes**.
4. In the **Start new thumbnail personalization?** dialog, click **Start**. The banner in the **Home Page** tab updates to indicate that thumbnail personalization is active.

<img src="../../assets/publishing/experience-metadata/Thumbnail-Home-Page-Tab.png" alt="Example of the Home Page tab" />

### Keep multiple thumbnails active

<Alert severity="warning">
To get the most out of thumbnail personalization, make sure to **keep multiple thumbnails active** instead of choosing one winner, as this allows personalization to adapt to changing user trends.
</Alert>

For example, if you had removed the thumbnail associated with the green line in the chart below too early, you would have missed future additional impressions for what ended up becoming your second-best performing thumbnail.

<img src="../../assets/publishing/experience-metadata/Thumbnail-Impressions-Graph.png" width="75%" alt="Example of the Impression by Thumbnail graph" />

It's recommended to test multiple new thumbnails with any major experience or content update, and then not make changes to your thumbnails until your experience's next update.

### Analyze thumbnail personalization performance

After a few hours, the **Thumbnail Performance** table in the **Home Page** tab populates with statistics related to each of your active thumbnails:

<table>
<thead>
  <tr>
    <th>Title</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Status**</td>
    <td>Indicates if the thumbnail is active for personalization.</td>
  </tr>
  <tr>
    <td>**Impressions**</td>
    <td>Number of impressions from home page recommendations.</td>
  </tr>
  <tr>
    <td>**Qualified Plays**</td>
    <td>Number of qualified plays from home page recommendations.</td>
  </tr>
  <tr>
    <td>**Average Playtime**</td>
    <td>The average session time in minutes per qualified play.</td>
  </tr>
  <tr>
    <td>**Qualified Play Through Rate**</td>
    <td>The percentage of qualified plays divided by impressions from home page recommendations.</td>
  </tr>
  <tr>
    <td>**Winning Segment**</td>
    <td>The thumbnail with the highest play through rate during the current thumbnail personalization process.</td>
  </tr>
</tbody>
</table>

You can also use the **Impressions by thumbnail** and the **Qualified play through rate by thumbnail** graphs to further analyze the performance of your personalized thumbnails over time.

## Best practices

To create the most positive impact for players looking to play your experience, consider the following best practices.

<Alert severity="warning">
In addition to the practices shown below, avoid placing any essential text or elements at the **bottom** of the thumbnail, as it may potentially be covered by metadata like the player count.
</Alert>

### Quality and aspect ratio

A thumbnail image should be **16:9** aspect ratio and ideally **1920×1080 pixels** so that it always displays in high resolution across the Roblox site and app. Displayed thumbnails will be stretched to 16:9 aspect ratio regardless of the upload's aspect ratio.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/publishing/experience-metadata/Thumbnail-High-Res.jpg" alt="High quality and sharp thumbnail" />
    <figcaption>
      <Alert severity="success">High quality and sharp; upload in 16:9 aspect ratio</Alert>
    </figcaption>
  </figure>
  <figure>
    <img src="../../assets/publishing/experience-metadata/Thumbnail-Not-16-9.jpg" alt="Non-16:9 thumbnail" />
    <figcaption>
      <Alert severity="error">Upload not in 16:9 aspect ratio; displayed thumbnail stretched</Alert>
    </figcaption>
  </figure>
</GridContainer>

### Relevant content

A thumbnail will have a higher impact if it's unique and provides relevant imagery on what players should expect when they join the experience. Thumbnails with ambiguous imagery or graphics may lead to unnecessary confusion.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/publishing/experience-metadata/Thumbnail-Urban-Rush.jpg" alt="Thumbnail portraying a high-action urban racing experience" />
    <figcaption>
      <Alert severity="success">Thumbnail portrays a high‑action urban racing experience</Alert>
    </figcaption>
  </figure>
	<figure>
    <img src="../../assets/publishing/experience-metadata/Thumbnail-Unclear.jpg" alt="Thumbnail with unclear imagery and an ambiguous graphic in the top-right corner" />
    <figcaption>
      <Alert severity="error">Unclear imagery and ambiguous graphic in top‑right corner</Alert>
    </figcaption>
  </figure>
</GridContainer>

### Video accuracy

Video thumbnails should be authentic and portray actual in‑experience content without misleading alterations.

<GridContainer numColumns="2">
  <figure>
    <video src="../../assets/publishing/experience-metadata/Thumbnail-Video-Accurate.mp4" controls width="800" alt="Video showing how separate volume controls for sounds and music can help players focus on what they need to" style={{marginTop: 0}}></video>
    <figcaption>
      <Alert severity="success">Video presents actual gameplay which gives players an accurate and honest expectation of the game</Alert>
    </figcaption>
  </figure>
	<figure>
    <video src="../../assets/publishing/experience-metadata/Thumbnail-Video-Inaccurate.mp4" controls width="800" alt="Video showing how separate volume controls for sounds and music can help players focus on what they need to" style={{marginTop: 0}}></video>
    <figcaption>
      <Alert severity="error">Video presents an exaggerated version of the experience and gameplay which is misleading to players</Alert>
    </figcaption>
  </figure>
</GridContainer>

### Theme and color

You can express your experience's theme through overall theme and colors to help players decide if it's suitable and appealing to them.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/publishing/experience-metadata/Thumbnail-Theme-Comical.jpg" alt="Thumbnail with a comical theme/character and bright colors" />
    <figcaption>Comical theme/character with bright colors</figcaption>
  </figure>
  <figure>
    <img src="../../assets/publishing/experience-metadata/Thumbnail-Theme-Horror.jpg" alt="Thumbnail with a dark and stormy theme for a horror experience" />
    <figcaption>Dark and stormy theme for a horror experience</figcaption>
  </figure>
</GridContainer>
