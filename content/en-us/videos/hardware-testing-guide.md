---
title: Hardware Testing Guide
description: 'Spoken captions; API names can be wrong. Covers: the emulator misses performance and memory, 2 to 4 GB phones, the performance overlay, MicroProfiler frame time, comparing MicroProfiler dumps, display size versus draw size, thermal throttling, notches and the 60 FPS cap.'
date: '2026-06-16'
transcript: true
related:
  - performance-optimization/test-on-hardware.md
  - performance-optimization/microprofiler/index.md
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/m6zSJpk6neU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Spoken captions of [Hardware Testing Guide](https://www.youtube.com/watch?v=m6zSJpk6neU), published on the [Roblox Creators YouTube channel](https://www.youtube.com/@RobloxCreators) on June 16, 2026. API names in these captions can be wrong.

Prefer the written documentation: [Test on hardware](../performance-optimization/test-on-hardware.md), [MicroProfiler](../performance-optimization/microprofiler/index.md).

Resources: [create.roblox.com/docs/performance-optimization](https://create.roblox.com/docs/performance-optimization).

## Hardware Testing Guide: Introduction ([0:00](https://www.youtube.com/watch?v=m6zSJpk6neU&t=0s))

Hello. This video is about how and why to test Roblox games on a variety of devices, what to expect, and what to look for. Roblox runs on everything from phones to desktop computers, which means different screen sizes, resolutions, primary and secondary control schemes, thermal characteristics, power usage, performance levels, and more.

Let's get into it. Hey, everyone. It's Andrew from Roblox. You just heard from my friend and colleague, Haan. The two of us dug up a handful of test devices, and today we're going to look at all of them. Along the way, we'll cover how to think about device testing on Roblox in general. Here's the agenda.

## Hardware Testing Guide: Why test on hardware? ([0:42](https://www.youtube.com/watch?v=m6zSJpk6neU&t=42s))

Why test on hardware? While Roblox has a ton of tools to test, monitor, and analyze performance, getting your hands on the actual devices, especially devices that mirror those of your target user base, is essential to understanding how your game actually plays. We're not just talking about FPS, memory usage, crash rates, but also user experience, input and controls, visuals, and even just figuring out if your game is enjoyable in a different form factor.

The [Device Simulator](../studio/device-simulator.md) in Studio is great for checking user interface and controls, but it doesn't simulate performance, and it has dramatically inflated memory numbers. It is no substitute for testing on a real device. Absolutely. Device testing must be an ongoing process throughout development. If you wait to test on a real device until your game is feature complete, you'll almost assuredly have to redo work that you were happy with. The best path is to build and test, build and test, and build and test.

## Hardware Testing Guide: Popular devices and real world examples ([1:36](https://www.youtube.com/watch?v=m6zSJpk6neU&t=96s))

Most Roblox players are on mobile, and in nearly all games and experiences, low-end mobile devices are a huge chunk of the ecosystem. Let me pull some numbers from various real-world games. In both popular and growing games, the most prevalent devices are Android phones and tablets with between 2 and 4 GB of RAM.

Here are a handful of examples from some games with over 1,000 concurrent players. These aren't exact figures and vary by game, but roughly speaking, 65% of a game's players might be on Android with 60% of those players having between 2 and 4 GB of RAM. Then maybe 35% have between 4 and 8 GB of RAM and 5% have more than 8 GB. The remaining players are typically iOS, followed by Windows, and then other platforms.

There are exceptions, of course, such as highly competitive games, or games built specifically for VR or console, but these are useful generalizations. For today, we have the following array of devices: a low-end Android phone, mid-range iOS phone, high-end iOS tablet, Windows gaming handheld, and a high-end macOS laptop.

## Hardware Testing Guide: Performance testing ([2:40](https://www.youtube.com/watch?v=m6zSJpk6neU&t=160s))

The first stop when testing performance is the overlay. On mobile devices, you can see that the overlay is quite limited, though. On Windows and macOS, seen here, we've got some additional detail, particularly <kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>F2</kbd>, which shows not just FPS, but draw calls. For more information on draw calls, see our [performance optimization](https://www.youtube.com/watch?v=VDO_amtWfDw) video.

Some people are incredibly sensitive to drops in frame rate, whereas other people barely notice, so even the basic overlay is useful for finding problems in your experience. If you get persistent dips below your target frame rate in one area after performing a certain action or even just when looking in a particular direction, you should probably investigate further. But, of course, a frame rate dip only tells you that there might be a problem.

## Hardware Testing Guide: The MicroProfiler ([3:29](https://www.youtube.com/watch?v=m6zSJpk6neU&t=209s))

It doesn't tell you where the problem is or what the problem could be. To investigate further, you need more granular information. You need to know each task that ran as a part of a frame and how long it took to run. That's right, you need my favorite tool: the [MicroProfiler](../performance-optimization/microprofiler/index.md). But first, using the MicroProfiler requires an understanding of the difference between frame rate and frame time.

Frame time is how long it took a frame to render on screen, generally measured in milliseconds. Frame rate is the number of frames rendered on screen, generally measured in frames per second (FPS). Lower frame time means higher frame rate. Divide 1,000 milliseconds, 1 second, by frame time to get frame rate.

The MicroProfiler deals entirely with frame time. In general, you want the bars to be a nice, even height. Tall bars indicate frame time spikes, where you'll feel a hitch when you play. We're looking at [Beyond the Dark](../resources/beyond-the-dark/index.md) here largely because it's challenging to run. In fact, the developers explicitly recommend against running it on mobile devices, and you can probably see why. This Samsung Galaxy S8 from 2017 is, well, struggling.

## Hardware Testing Guide: The MicroProfiler ([4:33](https://www.youtube.com/watch?v=m6zSJpk6neU&t=273s))

Frame rate tends to be between 10 and 20 FPS, which means frame times of around 50 to 100 milliseconds. When we check the MicroProfiler from a powerful laptop, it's night and day. It's basically locked at 60 FPS, which means frame times of 16.67 milliseconds. If I can interject quickly? Interject away, Andrew.

To be clear, we're not dunking on this phone. It was state-of-the-art at time of release, and its screen still looks terrific to this day. We're playing a demanding game at maximum settings, and the phone is using less than 10 watts of power. Nine years later, it still feels very modern and very capable.

Unlike mobile devices, you can run the MicroProfiler directly on Windows and macOS with <kbd>Control</kbd> + <kbd>F6</kbd> or <kbd>Command</kbd> + <kbd>F6</kbd>. Rather than pausing and trying to navigate it here, though, consider using the dump menu and examining the HTML files at your leisure.

## Hardware Testing Guide: Compare MP logs ([5:20](https://www.youtube.com/watch?v=m6zSJpk6neU&t=320s))

Within these files, you can find device information in the Info menu. But, we recommend organizing your MicroProfiler dumps in folders and hanging on to them for a while. Maybe rename them to indicate the scene. And after you make an optimization or change something about your game, you can drag and drop the old file into the new one to compare the two.

Wait, wait, say more about that. Andrew, didn't you show me this? When you compare two files, you get a flame graph that shows the difference in CPU and memory usage between two scenes. It's easy to see if your change helped or hurt your frame times. You had a [whole video](https://www.youtube.com/watch?v=eWf-6Sh-9Os) on this. I did, yes. Just making sure you watched it.

## Hardware Testing Guide: Display size vs Draw size ([5:53](https://www.youtube.com/watch?v=m6zSJpk6neU&t=353s))

Despite the name, the Miscellaneous section of the Info menu has some very interesting information, specifically display size and draw size. Display size indicates the output resolution, which is usually the same as the device's screen resolution, but not always. And draw size indicates the resolution that Roblox is rendering at.

In addition to graphics quality, Roblox automatically lowers its internal render resolution to improve performance. See here how the iPhone 13 mini is rendering at 1218 by 562, which is a little more than a quarter of its display resolution, indicating that it, too, is struggling to stay at a consistent frame rate.

Most players use the automatic graphics quality setting, which scales graphics up and down quite drastically to try to maintain device performance. Lighting, shadows, draw distance, texture quality, and particles can all take a big hit during these swings.

If you're trying to get an apples-to-apples comparison as you make changes to your game, choose a specific manual quality level. Otherwise, you might make changes, test, and think the changes didn't improve performance when the reality is that your performance gains were obscured by the automatic improvements to graphics.

## Hardware Testing Guide: Thermals ([6:58](https://www.youtube.com/watch?v=m6zSJpk6neU&t=418s))

Another important point to account for when testing is device thermals. Most devices that don't have fans, such as phones, tablets, and slim laptops, are able to run at their highest performance levels for anywhere from 30 seconds to 30 minutes, but eventually they struggle to dissipate all that heat and they slow down, sometimes by as much as 40%.

A good example is the Galaxy S8, where our frame rate started around 16 and dropped to about 14 after 5 minutes of play. It might not seem like much, but it's a drop of about 12%. Actively cooled devices, like our Windows handheld, can maintain their performance levels more consistently. Here's some quick footage on how this game looks and runs on a variety of devices.

## Hardware Testing Guide: Thermals ([8:01](https://www.youtube.com/watch?v=m6zSJpk6neU&t=481s))

Haan said it earlier, but it's the most important point in this video. Testing must be an ongoing process throughout development, where you change something, test, encounter a problem, troubleshoot using the MicroProfiler, and repeat.

Looking at the MicroProfiler dump for each device, the big takeaway for this experience is that it's super heavy, especially the lighting and shadows. It's not a competitive game and has a fairly slow pace, so we can get it into a playable state on the iPhone 13 mini if we use the automatic quality setting, but a lot of the ambience is lost. See here how it's just brighter and less atmospheric as quality drops.

## Hardware Testing Guide: User experience testing ([8:38](https://www.youtube.com/watch?v=m6zSJpk6neU&t=518s))

If you were testing this game on a low-end device during development, you'd have to make some choices around what devices you wanted to support and at what level of fidelity. Besides performance, it's important to test how your game feels across multiple form factors. If the screen size makes it impossible to read anything, or if your controls are stuck behind your UI, or if your game's just really uncomfortable to play on mobile, none of your performance metrics really matter.

As Andrew mentioned, Studio's Device Simulator is a great tool to quickly check your screen size ratios of how your game might look, but emulation can tell you something's visible, and only physical testing can tell you if it's playable. It's easy enough to optimize for a mouse and keyboard when testing in Studio, so in this section we'll focus on things to look out for with your mobile devices.

Think about the following: the average session time for some of the popular games we looked at is between 10 and 15 minutes, and this holds true across different genres and different player sizes. Can you comfortably play your game for more than 10 minutes at a time on a mobile device? Consider your button placement, where your UI elements are, how often you might need to reach across the screen. The standard mobile button UI often feels very natural to players.

## Hardware Testing Guide: User experience testing ([9:44](https://www.youtube.com/watch?v=m6zSJpk6neU&t=584s))

Does your experience introduce any UI elements or menus that deviate from that standard? What Andrew is getting at is that user experience is your priority. Besides inputs and menus, check if you can easily read your UI on different devices. The in-Studio Device Simulator can help here, but nothing helps you understand the look and feel better than the real thing.

There may also be some rare cases of your UI or text elements loading in at different times on slower devices, which could be difficult to catch on your development computer. You'll also want to test in real-world environments, so try testing on slow Wi-Fi or cellular data to get a sense of how the majority of players will be interacting with your experience.

Make sure to verify that elements, even basic ones like movements, input controls, interaction with the world, look and feel the way they should. Check that any calls to the server or updates to data stores or network calls work.

## Hardware Testing Guide: Device specific callouts ([10:31](https://www.youtube.com/watch?v=m6zSJpk6neU&t=631s))

And if they don't work or are delayed, think about ways they can gracefully fail that won't impact the player's experience. Since a majority of users are on lower-end devices, you'll also want to ensure that your rejoining logic is fairly painless for that user.

Any other gems of advice, Andrew? We should also call out some quirks we found during testing on these devices that felt important to flag. Keep in mind that these and other unique situations can occur when you try to test on a wide range of devices.

Oh, definitely. When I was testing on the iPhone, I noticed the notches and dynamic islands could obscure parts of the screen. Both the iPads and iPhones also had rounded corners, which might affect the elements that are close to the edges. The iPhone and the iPad have a lot of system menus that are accessible by swiping from various sides and corners. You should refrain from implementing buttons or interfaces that might accidentally trigger these system menus.

Those are great points, Andrew. There are similar system menus on the Samsung as well. And what was interesting to note for this device is that the display extends all the way through the phone bezel. Any buttons or text near the left and right sides of the screen might be unreadable, distorted, or cut off. A good rule of thumb is to ensure that you include a safety margin away from the screen edges for any important elements.

## Hardware Testing Guide: Device specific callouts ([11:41](https://www.youtube.com/watch?v=m6zSJpk6neU&t=701s))

For the ROG Ally, I found that the right stick was sometimes treated as a mouse cursor when I had it set to auto, and that I would have to manually move into game pad control mode. It might be useful to have a mouse option on these handheld devices from time to time, but players would typically use the game pad for any extended sessions.

## Hardware Testing Guide: Key takeaways ([12:00](https://www.youtube.com/watch?v=m6zSJpk6neU&t=720s))

Roblox also has a default FPS cap of 60, despite the device's 120 Hz display, and sometimes defaulted to windowed mode rather than full screen, which can artificially improve performance due to the lower resolution. Even though you should get to know the quirks of your testing devices, it's important to understand how that device fits into the wider Roblox ecosystem. You should use that information to inform your testing strategies.

Let's run through our big takeaways. Prioritize getting a low-end, that's 2 to 4 GB of RAM, test device. It's the bread and butter of the Roblox user base. Leverage the MicroProfiler on your devices. Check out Andrew's many great videos on performance and MicroProfiler to really up your game on optimization. And keep in mind how performance differs between graphics quality, and how performance can degrade over a long play session.

And finally, remember that testing isn't something you do last. It's an iterative process you should be thinking about throughout development. It'll just save you time and headaches to catch these things early. We know that's a lot to keep track of. Thank you so much for staying with us until the end.
