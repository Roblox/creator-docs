---
title: Test on hardware
description: Explains why and how to test your game on real devices to catch performance and usability issues before your players do.
---

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/m6zSJpk6neU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe><br />

Roblox Studio provides useful emulation tools for [testing different devices](../studio/testing-modes.md), but emulation can't fully replicate what happens on real hardware. Frame rates, memory pressure, thermal throttling, and input latency all behave differently on physical devices. Testing on hardware helps you catch issues that only surface under real-world constraints.

## Why test on devices

Studio runs the client and server together on your development machine, which is typically far more powerful than the devices your players use. This creates blind spots with the devices your player base typically uses:

- **Memory** — The [device emulator](../studio/testing-modes.md) is useful for checking aspect ratios and controls, but isn't accurate for memory usage. On a real device, the operating system, background apps, and the Roblox engine itself all compete for limited RAM.
- **Frame rate** — A high-end PC can process inefficient code or other issues that cause severe frame drops on mobile or low-end hardware. Problems are easier to notice (and reproduce) on constrained devices.
- **Thermal throttling** — Phones, tablets, and even thin laptops reduce CPU and GPU clock speeds if they overheat during sustained gameplay.
- **Input and latency** — Touch responsiveness, gamepad polling rates, and network behavior over cellular connections can only be validated on real hardware.

## Popular devices in the player base

The majority of Roblox players are on lower-spec mobile devices, with some exceptions for specific genres or competitive games. Understanding the device landscape helps you prioritize what to test, and you can use the [Performance Dashboard](../production/analytics/performance.md) to get more accurate metrics of your player base.

Roblox is inherently cross-play, which means that it supports a vast range of devices, and device demographics differ between countries, age groups, genres, and more. To reach the widest audience, your game needs to perform well across the full range of devices.

The following are general device statistics across the user base:

- **Android** represents roughly 65% of a typical game's player base.
  - ~60% of those players have **2–4 GB** of RAM.
  - ~35% have **4–8 GB** of RAM.
  - ~5% have more than 8 GB of RAM.
- Over 50% of the Roblox player base plays on devices scoring between **10,000–20,000** on [Passmark](https://www.passmark.com/) benchmarks.

If you're only testing on your development machine, you're testing for the minority of your audience. Prioritize [cross-platform compatibility](../projects/cross-platform.md) and pick at least one low-end baseline device that represents your target player demographic.

<Alert severity="success">
For a broader set of Android test devices that covers more of the player base, choose devices at a variety of performance levels from several manufacturers. For example, you might test on an Infinix Smart 9, a Motorola Moto G05, an Oppo A18, an Amazon Fire HD 10 (2023), and a Samsung Galaxy S22 Ultra.
</Alert>

## Testing strategies

Testing strategies depend on your game and your development workflow — there's no single approach that fits every project. The following provide a solid baseline for integrating hardware testing into your process.

Multi-input devices can increase your testing coverage without requiring a full device lab. For example, a handheld gamepad with a touchscreen lets you validate both touch and gamepad inputs on a single piece of hardware. Phones with USB-C gamepad adapters or touchscreen-equipped laptops can serve the same purpose.

### Performance

Performance testing on hardware focuses on three areas: frame rate (compute), memory, and load time. For a full breakdown of diagnostic tools, see [Identify performance issues](./identify.md).

For guidance on picking a baseline and staying within its limits, see [Design for performance](./design.md#low-end-devices).

#### Profile on device

The [MicroProfiler](./microprofiler/index.md) and [Developer Console](../studio/developer-console.md) both run on client devices, not just in Studio. Use them directly on hardware to get accurate frame time breakdowns and memory readings.

- Open the Developer Console with <kbd>F9</kbd> (or the in-game menu) to check memory consumption under the **Memory** tab.
- Use the MicroProfiler (<kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>F6</kbd> / <kbd>⌘</kbd><kbd>⌥</kbd><kbd>F6</kbd>) to capture frame dumps on device, then analyze them on your development machine.
- Enable **Performance Stats** from the settings menu to see an overlay of FPS, memory, and ping.

#### Test for thermal throttling

Run your game on a mobile device for an extended session (10–15 minutes of active gameplay). Watch for frame rate degradation over time — a steady decline often indicates the device is thermal throttling. If you see this, focus on reducing sustained GPU or CPU load in hot code paths identified by the MicroProfiler.

#### Validate network conditions

Players on mobile networks experience higher latency, jitter, and packet loss than wired connections. Use [network simulation](../studio/testing-modes.md#network-simulation) in Studio for quick iteration, but confirm behavior on a real device over cellular or constrained Wi-Fi.

#### Monitor after publish

Once your game is live, use the [Performance Dashboard](./monitor.md) to track client frame rate, memory usage, and crash rates across device categories over time. A sudden uptick in crashes after an update often points to a memory regression on low-end devices.

### User experience

Performance numbers don't tell the full story. A game can hit 60 FPS on a device and still feel broken if touch targets are too small or UI is unreadable. For comprehensive cross-platform UI guidance, see [Cross-platform development](../projects/cross-platform.md).

<Alert severity="info">
Windows handhelds like the ROG Xbox Ally offer a lot of utility in user experience testing. In addition to built-in controllers, these devices generally have touchscreens and support input from a mouse and keyboard (most useful when connected to an external display). Windows handhelds tend to have dramatically faster hardware than a midrange phone, though, so they're less valuable for performance testing.
</Alert>

#### Touch targets and gestures

Test on actual phone screens, not just emulated resolutions. Buttons that seem comfortably sized on a desktop monitor can be frustratingly small on a 5-inch display. Confirm that:

- Interactive elements are large enough to tap reliably on varying screen sizes.
- Gestures like pinch-to-zoom and swipe don't conflict with your gameplay controls.
- On-screen thumbsticks and action buttons are positioned within comfortable reach zones.

#### Screen readability

UI elements that look crisp at 1440p can become illegible on a low-resolution mobile screen. Test text size, icon clarity, and contrast on your lowest-supported device at arm's-length viewing distance. For guidance on adaptive layouts, see [Adaptive design](../production/publishing/adaptive-design.md).

#### Input switching

Players frequently switch input methods mid-session — a tablet player might connect a Bluetooth controller, or a laptop player might switch from trackpad to mouse. Confirm that your experience responds correctly to [input type changes](../projects/cross-platform.md#input-type-detection) and updates any [assistive hints](../projects/cross-platform.md#assistive-hints) accordingly.

#### Loading and streaming

First impressions matter. Time the full join-to-gameplay flow on your baseline device over a typical connection. If load times exceed a few seconds, consider enabling [instance streaming](../workspace/streaming/index.md) to reduce initial join times and memory footprint. Test that streaming doesn't cause visible pop-in that breaks immersion during normal gameplay movement.

#### Audio

Test with both the device speaker and headphones. Mobile speakers have limited frequency range and volume — sound effects or voice lines that are clear on desktop headphones can be muddy or inaudible on a phone speaker.
