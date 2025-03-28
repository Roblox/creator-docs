---
title: Changelog
description: Learn about updates to all feature packages.
---

## Core

<h3 style={{marginBottom: 24, marginTop: 48}}>Version 4 -> Version 5</h3>

- **ModalManager**
  - **[BREAKING CHANGE]** HUD buttons for all packages are now stored in a centralized location, in a `ScreenGui` under `FeaturePackagesCore`. This `ScreenGui` can be fetched with `ModalManager.getHudGui()`. It contains two frames, which are used to store HUD buttons in different locations on the screen. All packages need to be updated to use the new centralized HUD button locations.
  - Added `ModalManager.toggleOpen` method to toggle the visibility of a given modal.

- **UITimer, SharedConstants**
  - **[BREAKING CHANGE]** Renamed `CircularIndicator` to `RoundProgressBar` to be more consistent with the name of the linear `ProgressBar`. This includes the CollectionServiceTag and instances of the same name.

- **playPurchaseEffect**
  - Fixed animated ImageLabels not getting cleaned up after the collection animation completes
  - Fixed animation loop exiting early after the first item when overrideTransparency is true
  - Animated ImageLabels now always have `ImageTransparency` of `0` to allow for better visibility when animating icons that are not opaque
  - Reduced `Hover` animation duration from `0.5` to `0.3` seconds for a slightly snappier feel
  - Adjusted `UIHover` animations to clarify logic and avoid resizing TextButtons and TextLabels, opting to adjust the `TextTransparency` and `BackgroundTransparency` instead. Other instance types still get resized.

- **UITween**
  - Made `playTween` function public as `UITween.play` to allow for more custom tweening of multiple properties

- **UITimer, Attributes**
  - Time is now based on `Workspace:GetServerTimeNow()` instead of `DateTime.now()` to allow for better synchronization between the client and server timers
  - Fixed `FeaturePackagesTimerExpired` attribute not getting set when the timer expires

- **TranslationStrings**
  - Added a couple strings used in the new Engagement Rewards package

## Bundles

<h3 style={{marginBottom: 24, marginTop: 48}}>Version 8 -> Version 9</h3>

- **UIController**
  - **[BREAKING CHANGE]** Refactored HUD button creation to go through the new centralized `FeaturePackagesCore.ModalManager` location
  - **[BREAKING CHANGE]** Updated the styling of the HUD buttons to achieve a more consistent look across all packages
  - **[BREAKING CHANGE]** Major refactor of logic controlling the HUD button collapsible behavior to be more intuitive with smoother animations

## Missions

<h3 style={{marginBottom: 24, marginTop: 48}}>Version 9 -> Version 10</h3>

- **UIController**
  - **[BREAKING CHANGE]** Refactored HUD button creation to go through the new centralized `FeaturePackagesCore.ModalManager` location
  - **[BREAKING CHANGE]** Updated the styling of the HUD buttons to achieve a more consistent look across all packages
  
- **MissionsUI**
  - Added a HUD button getter `getMissionsHudButton` to decouple the HUD button hierarchy from the Season Passes package

- **Server.Missions**
  - Fixed a potential infinite loop when initializing data for a new player

- **MissionsExample**
  - Fixed walking detection not working very well when the player walks at a consistent speed
  - Removed jump detection to simplify the example, since listening for jumps on the server is inconsistent

- **Configs.Missions**
  - Fixed a typo `startImmeadiately` -> `startImmediately`. The package still checks for the typo'd value, but new work should use the corrected name. Also fixed various typos in internal code across various scripts.
  - Renamed example missions requirement from `Walks` to `Steps` for better grammar
  - Updated example missions to use `Walking` instead of `Jumping` for all metrics
  - Updated example numeric values to allow for slightly more time to test in studio
  - Updated example mission rewards to add XP instead of coins to better integrate the Season Passes example

- UI button instances:
  - Added padding, corner radius, UIHover tag, and adjusted text positioning to slightly improve styling

## Season Passes

<h3 style={{marginBottom: 24, marginTop: 48}}>Version 5 -> Version 6</h3>

- **UIController**
  - **[BREAKING CHANGE]** Updated the reference to Missions HUD button to use the new `MissionsUI.getMissionsHudButton` method

- **Configs.Season**
  - Updated the example season `startUtc` and `endUtc` to be relative to the current time in order to allow testing in studio to work regardless of when the package is being tested. For most purposes, you would still want to use an absolute time in your own season configuration.

- **UI button instances**
  - Added padding, corner radius, and UIHover tag to match the slightly improved styling of the Missions panel
  