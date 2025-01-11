---
title: Sound design
next: /resources/beyond-the-dark/user-interface
prev: /resources/beyond-the-dark/layered-clothing
description: Explains the design concepts for sound in Beyond The Dark.
---

<img
alt="Sound Design Banner"
src="../../assets/resources/beyond-the-dark/sound-design/Sound-Banner.jpeg"
width="80%" />

The approach we used to fill the space station with audio was to implement a 2D omnipresent soundbed as our base sound and use 3D sounds attached to objects (spot ambiences) to pull the user's ear in different directions as they explore the ship. We focused a lot on immersion and making the ship feel as real as possible when creating and placing these sounds. The result is a vibrant environment that's full of sonic diversity with pockets of fun audio discovery.

The DSR-14 spaceship contains the following audio that were sent through a custom mix hierarchy that lowers and raises the volume level of each sound group dynamically:

- One 2D soundbed
- Two dialogue tracks
- Three custom music tracks
- 10 scripted audio events
- 50 3D sounds

## Design sound assets and effects

The space station's fish tank emits some of our favorite sounds in the experience. It's a perfect encapsulation of the design philosophy that we employed, using spot ambiences to make the space feel dynamic and fresh every time you enter or exit a distinct area. Other places we did this included neon light buzzes, fans, and the black hole rumble.

As seen in the following screenshot, the looping fish tank sound is a child of a part inside the tank to give it a location in the scene to play from.

<img
alt="Sound Design In-Studio Location Example"
src="../../assets/resources/beyond-the-dark/sound-design/In-Studio-Sound.jpeg"
width="80%" />

The fish tank sound uses two main layers: a saw-wave synthesizer loop and a recording of a river in the Catskill Mountains in New York. This created the feeling of a high-tech motor pushing water through the tank. We applied an `Class.EqualizerSoundEffect` to the river sound to eliminate high frequencies and give it a more "underwater" feeling.

<img
alt="Sound Design In-Studio Location Example"
src="../../assets/resources/beyond-the-dark/sound-design/In-Explorer-Sound.png"
width="320" />

We applied a `Class.ChorusSoundEffect` on the synthesizer loop to make it sound more other-worldly. This chorus adds a warbly de-tuned effect to whatever content you pass through it. It is a great way to make something sound strange or unnatural, and it's also a common effect used in music. Here, we've picked a rate of 16 cycles per second, and a fairly mild chorus depth of 0.21. With these settings, some of the original character of the sound still comes through.

<img
alt="Sound Design In-Studio Location Example"
src="../../assets/resources/beyond-the-dark/sound-design/Sound-Properties.png"
width="320" />

When we layer these sounds together, it fits the object and space very well. However, you might be wondering why we didn't export a looping sound that sounds like this from the beginning and implement it as one object. There are two main benefits to layering the sound like this:

- We get more uses from the same content by reusing the river sound in the rainforest room.
- We get real-time randomness that keeps the sound varied and interesting over long stretches of time. Two layered sound loops become as long as their least common multiple. In other words, a six second loop and a five second loop remains unique for 30 seconds, increasing audio variety for free.

Other sound assets were created for multiple scripted sequences on the ship, for example the black hole triggering the anti-gravity effect. These assets were largely made from recordings of a toaster oven door, pitched down and run through various reverb and EQ effects. Pitching this source material down implies the large size of the ship, and the reverb does a great job of continuing to reinforce that effect, by making the whole thing feel like a cave. Some synthesized laser elements were also generated and added for additional accent and impact on the events.

## The mix

The mix uses a nested bus structure with sound groups, and two sidechain compressors. The main goal of the mix was to create clarity and listener interest.

<img
alt="Sound Design In-Studio Location Example"
src="../../assets/resources/beyond-the-dark/sound-design/Sound-Structure.png"
width="320" />

When creating a mix for an environment with as much excitement and ambient activity as this ship, it's important not to let things get out of hand sonically. This means creating priority through sidechains. Let's take a look at one of the sidechain compressors on the generic ambience `Class.SoundGroup`.

<img
alt="Sound Design In-Studio Location Example"
src="../../assets/resources/beyond-the-dark/sound-design/Sound-Structure-Properties.png"
width="320" />

A sidechain compressor allows one audio source to duck the volume of another based on its current volume. This is an effect commonly used in podcasts, music, games, and other audio media. As you can see in the above image, the Ambience Generic bed is receiving compression from Ambience Local. This means when the player walks up to a local ambience like the waterfall, the generic spaceship soundbed is ducked. This creates a feeling of audio "freshness" around the ship. All of the sounds and interesting areas are creating room for each other to breathe and be the focus of attention.

<Alert severity="info">
The actual settings on this compressor in the image shown, while instructive, are highly specific to these sounds and will be different depending on how loud your source audio and target both are. They cannot be copied and pasted and used with different content to deliver the same effect. Everything is relative to the volume of your content!
</Alert>

A general overview of the three most important settings in the compressor, and how they behave in the sidechain:

1. **Attack / Release** — This is how quickly in seconds that the compressor begins ducking, and how slowly it returns to normal volume after being ducked.
2. **Threshold** — This value determines the minimum volume level at which point the compressor will start to work.
3. **Ratio** — This refers to how intensely the sidechained material will be ducked; a higher ratio indicates more severe ducking.
