---
title: Projects
description: An overview of projects and experiences in Roblox.
---

A project is a collection of places, assets, settings and other resources
that together represent an experience on Roblox. Roblox stores your projects
in the cloud for convenient collaboration, editing, and version control. You
create and manage projects with Roblox Studio, an all-in-one IDE that provides
building, scripting, testing, and publishing tools. The key components of a
Roblox project include:

- **Places** - Every experience has one or more places, or individual 3D worlds.
  Each place is represented by a data model that describes the place's 3D world
  and logic.
- **Assets** - An asset is a resource stored in the Roblox Cloud, which include
  meshes, models, images, audio, video, and more. Because they're stored in the
  cloud, you can share and reference them from anywhere in your experience.
- **Settings** - Your experience settings define metadata about your experience,
  like its description and genre, and other important behavior like who can edit
  the project.

## Places

Experiences contain one or many _places_, which are comparable to scenes
in Unity or maps in Unreal Engine. Every experience must contain one default
place, but can contain many places depending on how you want to structure your
experience.

<Alert severity='info'>
While an experience can consist of multiple places, it's recommended that you
begin with a single place. This approach is ideal for initial development,
grayboxing, and testing how players interact in different environments.
</Alert>

As your experience expands, you can choose to create additional places and
[teleport](../projects/teleporting.md) players between them for
scenarios such as:

- An experience where players gather in a lobby to socialize, then gather into
  teams to be teleported to a specific place for competitive combat or
  cooperative play.
- A futuristic adventure with multiple vast environments that you want to
  compartmentalize with unique world mechanics, such as a "planet surface" with
  heavy gravity and an "orbiting station" with reduced gravity.

### Data Model

Every place is represented by a data model, a hierarchy of objects that describe
everything about the place. The Roblox engine uses the data model as a source of
truth for a place's state, so it can simulate and render it on client devices.
For more information on how the Roblox engine interprets the data model, see
[Client-Server Runtime](../projects/client-server.md).

Proper, intentional object organization within the data model is essential for
functionality and maintenance of your project. For more information on what
objects are available and how to organize and use them, see
[Data Model](../projects/data-model.md).

## Assets

<Alert severity="info">
All assets public and private are subject to Roblox's
high moderation standards for safety and civility.
</Alert>

Roblox is a cloud-based platform and stores all objects that you create and
import in your project as assets with associated asset IDs. You can create
assets directly in Studio, such as models, or import assets like images, audio,
and meshes from other tools.

By default, assets are private to your experience and you can use them in any
place by referencing its ID. You can also publish and share them to the
community in the [Creator Store](https://create.roblox.com/marketplace/),
so others can use them as well.

For more information on how to import and publish assets, see
[Assets](../projects/assets/index.md).

### Packages

Packages are reusable object hierarchies that you can define
and reuse across multiple places across multiple experiences. For any large
project, packages offer the following benefits:

- Packages can be used as asset kits, allowing developers to duplicate a set
  of objects as needed. If an experience also has multiple places, asset kits
  can be reused between places to provide consistency.
- Packages make it easier to update assets. For instance, a package can
  include a tree that's duplicated many times in an environment. If a developer
  needs to make a change, such as swap textures for the tree, it can be updated
  once in the package instead of for each individual instance.
- Packages make grayboxing quicker. A package can start with graybox assets,
  and eventually be replaced with final art assets. When assets are replaced,
  they retain all original positions and orientations.

<Alert severity='info'>
If you decide to create an asset kit with a package, it's a good idea to store
all of your asset kits in a single Roblox
[place](../production/publishing/publishing-experiences-and-places.md) built just for
that purpose.
</Alert>

For more information, see [Packages](../projects/assets/packages.md).

## Settings

Your experience defines settings that you manage in Roblox Studio, which include:

- **Basic Info** - Define basic information about the experience, such as its
  name, description, and genre. Much of the information here is used
  in your experience's listing.
- **Permissions** - Configure who can access your experience. New experiences
  begin as private and can only be edited and joined by you and members of your group with
  the correct permissions. When appropriate, you can release the experience to
  the public.
- **Monetization** - Define how to can earn revenue from your experience, such
  as with badges or developer products.
- **Security** - Set various security settings for your experience.
- **Places** - Create new places associated with your experience.
- **Localization** - Configure different languages and regions.
- **Avatar** - Configure settings related to avatars, such as avatar scaling and
  clothing overrides.
- **World** - Configure settings such as gravity, character jump behavior, and walk speed.
- **Other** - Contains miscellaneous options for your experience, such as
  asynchronous drafts mode editing and spatial voice features.

For more information, see [Managing Projects](../projects/managing.md).

### Collaboration

With Studio's **built-in collaboration tools**, team members can contribute to
experiences independently on their own time, or alongside others. Key features
include:

- Group admins can manage which members have access to collaborate and which do
  not, effectively maintaining proper roles within a large team.
- Collaborators can build alongside other team members in real time and
  automatically see changes made by others.
- Collaborators can independently edit the same scripts that others may be
  editing, test locally, and commit their changes to the cloud-based project
  when ready.

For more information, see [Collaboration](../projects/collaboration.md).

### Spatial Voice

Chat with Spatial Voice is a proximity-based voice chat feature that simulates
realistic communication based on how close you are to other users who are
speaking. The closer you are to another user, the louder their voice;
conversely, the farther away you are from another user, the softer their voice.

For more information, see [Spatial Voice](../chat/spatial-voice.md).

![spatial voice example](../assets/audio/spatial-voice/SpatialVoiceOverview.png)
