---
title: Photo-to-Avatar generation 
description: Explains how to use AvatarCreationService AvatarGeneration APIs to prompt users to generate Avatars from photos in experience. 
---

<Alert severity = 'success'>
The Photo-to-Avatar feature is currently in alpha. Please refer to the [DevForum announcement](https://devforum.roblox.com/t/early-preview-alpha-release-of-photo-to-avatar-apis/3931624) for latest information.
</Alert>

<Alert severity = 'warning'>
The following guide applies to creators who are familiar with scripting and Roblox Studio and intend to develop experiences that allow user-generated avatar items.
</Alert>

You can create an experience that allows players to generate a fully functional avatar character using a photo and a text prompt.

This process involves the following steps:

1. Request an AvatarGeneration session
2. Prompt the user to take a selfie and generate a 2D preview image of the avatar
3. Generate the full Avatar character using `Class.HumanoidDescription`

### Request an AvatarGeneration session

To start a photo-to-avatar generation, call `Class.AvatarCreationService:RequestAvatarGenerationSessionAsync()` from the server to request a session for the player. A session provides a `Class.Player` with a certain number of Avatar previews and Avatar generations.

As it may take some time for a session to become available, `Class.AvatarCreationService:RequestAvatarGenerationSessionAsync()` returns a `Datatype.RBXScriptConnection` and a waitTime in seconds. The waitTime can be used to provide the `Class.Player` with information on how long it will take them to be able to start their generations.

Once a session is ready, the callback is invoked with a `Dictionary` of information about the session. The `Dictionary` includes:

- `SessionId` — passed as an argument when calling `Class.AvatarCreationService:GenerateAvatar2DPreviewAsync` and `Class.AvatarCreationService:GenerateAvatarAsync`
- `Allowed2DGenerations` — the number of 2D preview generations allowed in a session
- `Allowed3DGenerations` — the number of 3D avatar generations allowed in a session
- `SessionTime` — the maximum time for a session in seconds

### Prompt selfie and generate 2D preview

After a session is started, prompt the user to take a selfie and get the fileId `string` by calling the `Class.AvatarCreationService:PromptSelectAvatarGenerationImageAsync` method on the Server. This fileId will be passed to the `Class.AvatarCreationService:GenerateAvatar2DPreviewAsync` method.

To create a 2D preview image of the Avatar call the following methods:

1. `Class.AvatarCreationService:GenerateAvatar2DPreviewAsync` on the Server
2. `Class.AvatarCreationService:LoadAvatar2DPreviewAsync` on the Client

The `Class.AvatarCreationService:GenerateAvatar2DPreviewAsync` takes the SessionId, fileId and an optional text prompt as input to generate a 2D Avatar preview. This method returns a previewId.

This previewId should be sent to the client and can then be used to retrieve the preview as an `Class.EditableImage`.

If the user is not satisfied with the generated preview this workflow can be repeated.

### Generate the 3D avatar

Once the user is satisfied with the preview, you can generate the complete 3D avatar character.

To generate an avatar character:

1. Call `Class.AvatarCreationService:GenerateAvatarAsync` on the Server with a `Dictionary` containing the SessionId and PreviewId.
   1. This method call returns a `string` generationId.
2. Retrieve the generated avatar data as a `Class.HumanoidDescription` using the `Class.AvatarCreationService:LoadGeneratedAvatarAsync` method on both the experience server and the client.
3. You can use the `Players.CreateHumanoidModelFromDescription` method to create an avatar model from the `Class.HumanoidDescription` to display to the `Class.Player`.

Mesh and texture assets will be provided as `Class.EditableMesh` and `Class.EditableImage` objects, respectively, to allow continued editing of the generated avatar. Edits should be made on both the experience server and the client copy to keep them in sync for publish.

### Publish

If the user is satisfied with the resulting avatar it can be published using the `Class.AvatarCreationService:PromptCreateAvatarAsync` method.

For more details on see [in-experience creation](./in-experience-creation.md).
