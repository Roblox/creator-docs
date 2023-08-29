---
title: Accessibility Guidelines

description: Explains the practice of designing products and services to be usable by people with disabilities.
---

**Accessibility** is the practice of designing products and services to be usable by people with disabilities. Wheelchair ramps, crosswalk sounds, and braille on signs are all accessible accommodations that help more people.

<GridContainer numColumns="3">
  <figure>
    <img src="../../assets/publishing/accessibility/Real-Example-Ramp.jpg" />
    <figcaption>Wheelchair ramp</figcaption>
  </figure>
  <figure>
    <img src="../../assets/publishing/accessibility/Real-Example-Crosswalk.jpg" />
    <figcaption>Crosswalk sound</figcaption>
  </figure>
  <figure>
    <img src="../../assets/publishing/accessibility/Real-Example-Braille.jpg" />
    <figcaption>Braille</figcaption>
  </figure>
</GridContainer>

Accessibility isn't limited to the physical world &mdash; online experiences can be made accessible, too. Recent stats cite that over 26% of people have some type of disability, so making your Roblox experience accessible can help you reach a wider audience.

## Text Size

Users may find it difficult to read small text. Compare the following in-experience shop menu with a blur applied, simulating what it might look like to a user with impaired vision.

<Tabs>
  <TabItem label="Sighted">
    <img src="../../assets/publishing/accessibility/Text-Size-SM.jpg" width="800" />
  </TabItem>
  <TabItem label="Low Vision">
    <img src="../../assets/publishing/accessibility/Text-Size-SM-Blur.jpg" width="800" />
  </TabItem>
</Tabs>

<br />
If you increase the size of the smaller font labels, it will be clearer to all users.

<Tabs>
  <TabItem label="Sighted">
    <img src="../../assets/publishing/accessibility/Text-Size-LG.jpg" width="700" />
  </TabItem>
  <TabItem label="Low Vision">
    <img src="../../assets/publishing/accessibility/Text-Size-LG-Blur.jpg" width="700" />
  </TabItem>
</Tabs>

## Color Contrast

Users might find it difficult to read light text on a light background, or dark text on a dark background. To improve accessibility, it's recommended that you pick text and background colors with sufficient color contrast.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/publishing/accessibility/Color-Contrast-LD.png" />
    <figcaption>Light text on dark background</figcaption>
  </figure>
  <figure>
    <img src="../../assets/publishing/accessibility/Color-Contrast-DL.png" />
    <figcaption>Dark text on light background</figcaption>
  </figure>
</GridContainer>

## Color Non-Reliance

Over 5% of people in the world have some form of **color blindness**. Although it's rare for someone to see **only** in black and white, imagine viewing your experience in grayscale:

<Tabs>
  <TabItem label="No Color Blindness">
    <img src="../../assets/publishing/accessibility/Color-Normal.jpg" width="600" />
  </TabItem>
  <TabItem label="Color Blindness">
    <img src="../../assets/publishing/accessibility/Color-Grayscale.jpg" width="600" />
  </TabItem>
</Tabs>

<br />
By modifying the image to use different **symbols** and colors, more users can tell the difference in gameplay and in other contexts:

<Tabs>
  <TabItem label="No Color Blindness">
    <img src="../../assets/publishing/accessibility/Color-Symbols-Normal.jpg" width="600" />
  </TabItem>
  <TabItem label="Color Blindness">
    <img src="../../assets/publishing/accessibility/Color-Symbols-Grayscale.jpg" width="600" />
  </TabItem>
</Tabs>

## Sound Non-Reliance

Sound is an excellent addition for immersive experiences, but hearing-impaired users or anyone who turns their volume off will be confused by in-experience events that are **only** conveyed with sound.

Consider the following scene where a ringing phone is signalled only by sound, and then signalled with both sound **and** visual aids.

<video src="../../assets/publishing/accessibility/Sound-Reliance.mp4" controls width="100%"></video>

## Volume Controls

Different sounds playing at the same time can be overwhelming, distracting, or difficult to distinguish. Providing users with volume controls for different "groups" of audio such as sound effects, music, and speech lets them customize their experience and focus on what they need to.

Consider the following example of a very noisy game where the user is able to modify music and sound effect volumes separately.

<video src="../../assets/publishing/accessibility/Audio-Volume.mp4" controls width="100%"></video>
