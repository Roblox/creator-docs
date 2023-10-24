---
title: Console Development Guidelines
description: Explains design requirements to follow for publishing an experience to consoles.
---

With 200M+ Xbox and PlayStation players, consoles present a major opportunity for you to attract more users. Compared to regular devices, designing for controllers and the 10-foot UI experience of consoles has some special guidelines that you need to follow to help your experience succeed on consoles.

<Alert severity="info">
Experiences designed for consoles always need to provide [Experience Guidelines](../../production/promotion/experience-guidelines.md) to ensure smooth releases and minimize the risk of being removed from consoles.
</Alert>

## Designing for Controllers

Console experiences receive commands from users through input controllers, which require special designs for smooth interactions.

### Simplifying UI

<img src="../../assets/publishing/console/UI-Navigation.png" width="70%" />

Apply the following to simplify the UI design for consoles:

- **Accessible navigation control**: Baseline navigation, including the four directions, select, and back, controls how users get around and interact with your content on consoles. Make sure users can reach all UI elements using these basic navigation controls, so they can easily access every interactive part of your experience.

- **Default controller navigation**: Though users can access UI menus by activating the virtual cursor, since not all users are familiar with the process, you need to support controller navigation of your UI as the default option instead of requiring users to activate the virtual cursor.

- **Minimal controller input complexity**: Unlike tappable or clickable input methods, console users navigate by pressing one button at a time, so an action that takes one move on other devices might take extra moves with a controller. Make sure that key actions in your experience only take a few moves to access.

- **No Chat Window**: Regardless of whether you use the default in-experience text chat system or fork the legacy chat system as your custom chat system, [disable the chat window](../../chat/customizing-in-experience-text-chat.md#chat-window-configuration) for console experiences.

<Alert severity="info">
As controllers aren't just for consoles and VR but also are available on devices such as desktop and mobile, minimizing the number of moves needed can enhance the UI for all devices and input types in addition to PlayStation and Xbox.
</Alert>

### Adding Supplemental Control

Unlike mobiles and desktops, navigation is always sequential on consoles, so users can't jump between far away elements as quickly as on other devices. To enhance the speed of navigation, consider adding additional buttons and shortcuts for essential in-experience actions.

### Accommodating Dynamic Button Icons

<img src="../../assets/publishing/console/Buttons.png" width="50%" />

As your experience expands to more platforms, be sure to show button icons that match different devices. `Class.UserInputService` has two methods available that can achieve this:

- `Class.UserInputService:GetStringForKeyCode()` can convert the US query key codes to console keyboard layouts. It's helpful for showing your custom assets as button icons to match the look and feel of your experience. The following example shows how you can map custom assets for `Enum.KeyCode.ButtonA`:

  ```lua title="Mapping Custom Assets"
  local UserInputService = game:GetService("UserInputService")
  local imageLabel = script.Parent
  local key = Enum.KeyCode.ButtonA

  local mappings = {
      ButtonA = "rbxasset://BUTTON_A_ASSET", -- Replace with the desired ButtonA asset
      ButtonCross = "rbxasset://BUTTON_CROSS_ASSET" -- Replace with the desired ButtonCross asset
  }

  local mappedKey = UserInputService:GetStringForKeyCode(key)
  local image = mappings[mappedKey]

  imageLabel.Image = image
  ```

- `Class.UserInputService:GetImageForKeyCode()` returns Roblox default icons for the requested key code as easy drop-in replacements, like the following example for mapping `Enum.KeyCode.ButtonA` shows:

  ```lua title="Mapping Default Icons"
  local UserInputService = game:GetService("UserInputService")
  local imageLabel = script.Parent
  local key = Enum.KeyCode.ButtonA

  local mappedIcon = UserInputService:GetImageForKeyCode(key)
  imageLabel.Image = mappedIcon
  ```

## Providing Haptic Feedback

<img src="../../assets/publishing/console/Haptic-Feedback.png" width="60%" />

One unique advantage of controllers is the capability of providing haptic feedback by physically vibrating the controller to engage users' sense of touch. You can use `Class.HapticService` to enhance user immersion and provide useful feedback. Examples that can be more immersive with haptic feedback include:

- Physically dramatic events, such as explosions or collisions.
- Events that require user attention, such as a doorbell ring or a new customer entering the shop.
- UI action notifications, such as scrolling to the end of a list or clicking on a disabled button.

`Class.HapticService` also allows you to control the individual motors in a controller to set the intensity and duration of vibrations individually, so you can set different vibrations for different purposes and maintain the consistency with which actions trigger feedback. Design haptics carefully and avoid overuse, as users might find constant vibrations unpleasant and annoying.

## Building for the 10ft Experience

<img src="../../assets/publishing/console/10ft-Experience.png" width="60%" />

When on consoles, users are typically sitting 10 feet away from the screen. A scale factor of 1.5x ensures that the UI is comfortable, easy to navigate, and with legible fonts.

### Considering TV Safe-Area

<figure>
  <img src="../../assets/publishing/console/TV-Safe-Area.png" width="60%" alt="An example illustration showing the dimensions of the TV-safe and unsafe zone."/>
  <figcaption>The blue area represents the TV-unsafe zone.</figcaption>
</figure>

Since not all TVs show content fully to the edges of the screen due to historical and technical limitations, put UI elements in TV-safe areas to ensure important experience elements are visible on various TVs.

### Implementing Dynamically-Sized UI

Implement your UI using relative sizes and relative positions to measure everything as percentages of a frame. Incorporate a scale factor to all UI sizes by:

- Developing for lower resolutions first.
- Using relative positions and `Class.UISizeConstraint` to scale the UI.
- Scaling based on output characteristics with `Class.GuiService:IsTenFootInterface()`.
  <Alert severity="warning">
  Remember that controllers are available on all types of devices, so don't use `Class.GuiService:IsTenFootInterface()` to infer controller input.
  </Alert>
- Implementing `Class.ScrollingFrame` to reduce clutter on screen as the UI scales up.

## Adapting Progressive Disclosure

<img src="../../assets/publishing/console/Progressive-Disclosure.png" width="100%" />

Progressive disclosure defers advanced or rarely used features to a secondary screen. It's one of the best ways to declutter your UI and make it easy to use. For the console UX, it's common and faster to have the user go in and out of screens rather than fitting everything onto one screen like designing for desktops.

## Providing Sound Feedback

Unlike desktop or mobile interfaces, on which interactions are typically silent or rely on subtle haptic feedback, you can add sound effects to improve console interactions. When users navigate through the UI using a controller, consider incorporating sound effects to confirm selections or signal menu traversal, which can elevate the overall experience.
