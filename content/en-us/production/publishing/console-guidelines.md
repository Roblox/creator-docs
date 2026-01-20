---
title: Console development guidelines
description: Explains design requirements to follow for publishing an experience to consoles.
---

With 200M+ Xbox and PlayStation players, consoles present a major opportunity for you to attract more players. Compared to regular devices, designing for controllers and the 10-foot UI experience of consoles has some special guidelines that you can follow to help your experience succeed on consoles.

<Alert severity="info">
Experiences designed for consoles always need to provide [content maturity information](../../production/promotion/content-maturity.md) to ensure smooth releases and minimize the risk of being removed from consoles.
</Alert>

## Build for the 10ft experience

When on consoles, players are typically sitting 8–10 feet away from the screen.

<figure>
<img src="../../assets/publishing/console/10ft-Experience.png" width="60%" />
</figure>

Implement your UI using relative sizes and relative positions to measure everything as percentages of a frame. Incorporate a scale factor to all UI sizes by:

- Developing for lower resolutions first.
- Using relative positions and `Class.UISizeConstraint` to scale the UI.
- Creating designs that take into consideration large screen sizes, based on `Class.GuiService.ViewportDisplaySize`, where `Enum.DisplaySize.Large|Large` represents most TVs or larger.
- Implementing `Class.ScrollingFrame` to reduce clutter on screen as the UI scales up.

Note that some TVs will not show content fully to the edges of the screen due to historical and technical limitations, so you should put UI elements in TV‑safe areas to ensure important experience elements are always visible.

<figure>
<img src="../../assets/publishing/console/TV-Safe-Area.png" width="60%" alt="An example illustration showing the dimensions of the TV-safe and unsafe zone."/>
<figcaption>The blue area represents the TV-unsafe zone</figcaption>
</figure>

## Design for controllers

Console experiences receive commands from players through input controllers, which require special designs for smooth interactions.

<figure>
<img src="../../assets/publishing/console/UI-Navigation.png" width="70%" />
</figure>

Apply the following concepts to simplify the UI design for consoles:

- **Accessible navigation control** — Baseline navigation, including the four directions, select, and back, controls how players get around and interact with your content on consoles. Make sure players can reach all UI elements using these basic navigation controls, so they can easily access every interactive part of your experience.

- **Default controller navigation** — Roblox provides both directional selection and virtual cursor as out‑of‑the‑box solutions, but if you have specific UI layouts, it's recommended that you think about bespoke controller navigation.

- **Minimal controller input complexity** — Unlike tappable or clickable input methods, console players navigate by pressing one button at a time, so an action that takes one move on other devices might take extra moves with a controller. Make sure that key actions in your experience only take a few moves to access.

- **No chat window** — Regardless of how you customize the chat system, [disable the chat window](../../chat/chat-window.md#chat-window-configuration) for console experiences.

<Alert severity="info">
As controllers aren't just for consoles and VR but also are available on devices such as desktop and mobile, minimizing the number of moves needed can enhance the UI for all devices and input types in addition to PlayStation and Xbox.
</Alert>

### Add supplemental control

Unlike mobiles and desktops, navigation is always sequential on consoles, so players can't jump between far away elements as quickly as on other devices. To enhance the speed of navigation, consider adding additional buttons and shortcuts for essential in-experience actions.

### Accommodate dynamic button icons

As your experience expands to more platforms, be sure to show button icons that match different devices. `Class.UserInputService` has two methods available that can achieve this:

- `Class.UserInputService:GetStringForKeyCode()` can convert the US query key codes to console keyboard layouts. It's helpful for showing your custom assets as button icons to match the look and feel of your experience.

- `Class.UserInputService:GetImageForKeyCode()` returns Roblox default icons for the requested `Enum.KeyCode` as easy drop-in replacements.

  <table>
  <thead>
    <tr>
      <th>Key Code</th>
      <th>Xbox Image</th>
      <th>PlayStation Image</th>
      <th>String</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`Enum.KeyCode.ButtonA`</td>
      <td><img src="../../assets/publishing/cross-platform/ButtonA-Xbox.png" width="24" style={{marginBottom: 0, paddingBottom: 0}} /></td>
      <td><img src="../../assets/publishing/cross-platform/ButtonA-PS.png" width="24" style={{marginBottom: 0}} /></td>
      <td>`ButtonA`</td>
    </tr>
    <tr>
      <td>`Enum.KeyCode.ButtonX`</td>
      <td><img src="../../assets/publishing/cross-platform/ButtonX-Xbox.png" width="24" style={{marginBottom: 0}} /></td>
      <td><img src="../../assets/publishing/cross-platform/ButtonX-PS.png" width="24" style={{marginBottom: 0}} /></td>
      <td>`ButtonX`</td>
    </tr>
    <tr>
      <td>`Enum.KeyCode.One`</td>
      <td>n/a</td>
      <td>n/a</td>
      <td>`1`</td>
    </tr>
    <tr>
      <td>`Enum.KeyCode.Five`</td>
      <td>n/a</td>
      <td>n/a</td>
      <td>`5`</td>
    </tr>
  </tbody>
  </table>

## Provide haptic feedback

One unique advantage of controllers is the capability of providing haptic feedback by physically vibrating the controller to engage players' sense of touch. You can use `Class.HapticEffect|HapticEffects` to enhance player immersion and provide useful feedback.

<img src="../../assets/publishing/console/Haptic-Feedback.png" width="60%" />

Examples that can be more immersive with haptic feedback include:

- Physically dramatic events, such as explosions or collisions.
- Events that require player attention, such as a doorbell ring or a new customer entering the shop.
- UI action notifications, such as scrolling to the end of a list or clicking on a disabled button.

`Class.HapticEffect|HapticEffects` also allow you to control the position and radius of vibrations for different purposes and to maintain the consistency with which actions trigger feedback. Design haptics carefully and avoid overuse, as players might find constant vibrations unpleasant and annoying.

## Adapt progressive disclosure

Progressive disclosure defers advanced or rarely used features to a secondary screen. It's one of the best ways to declutter your UI and make it easy to use. For the console UX, it's common and faster to have the player go in and out of screens rather than fitting everything onto one screen like designing for desktops.

<img src="../../assets/publishing/console/Progressive-Disclosure.png" width="100%" />

## Provide audio feedback

Unlike desktop or mobile interfaces, on which interactions are typically silent or rely on subtle haptic feedback, you can add sound effects to improve console interactions. When players navigate through the UI using a controller, consider incorporating sound effects to confirm selections or signal menu traversal, which can elevate the overall experience.
