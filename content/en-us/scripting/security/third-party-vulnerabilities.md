---
title: Vulnerabilities from third-party assets
description: Learn about vulnerability vectors from third-party assets.
---

<Alert severity = 'warning'>
The following content covers various concepts and tactics to improve security and mitigate cheating in your Roblox experiences. It's highly recommended that all developers read through these to ensure that your experiences are secure and fair for all users. Check the sidebar for additional security topics.
</Alert>

Third-party assets from the Creator Store (Toolbox) are a common source of security risks, as they can contain malicious scripts called backdoors. These scripts give their creators unauthorized server-side access to your experience, allowing them to manipulate its state, steal sensitive data, or disrupt the experience for your players.

Backdoors are particularly dangerous because they often appear in otherwise legitimate-looking models. A seemingly innocent building or vehicle might contain a script that activates when certain conditions are met, such as when a specific player joins or a particular command is executed. When a model contains scripts, this is indicated in the Toolbox user interface before and during insertion.

Roblox moderates Models for malicious scripts both proactively and in response to reports, but this process is not guaranteed to remove all such scripts.

## Protecting your game

The most effective defense against backdoors is sandboxing. When you insert a model, you should contain its scripts to prevent malicious code from reaching sensitive APIs or affecting systems outside the model itself.

1. Set `SandboxedInstance` to `Experimental` on Workspace.
2. In the Properties window, set the `Sandboxed` property of the model to `true`.
3. Configure the `Capabilities` property to grant only the specific permissions the asset needs to function.

<Alert severity = 'warning'>
Note that during the beta, some features may not function as expected when `Sandboxed`, erroring with a message saying "...lacking Capability Unassigned". These will be fixed as Capabilities rolls out of beta.
</Alert>

Be especially cautious about granting Network, DataStore, AssetRequire, CapabilityControl, or LoadString capabilities to third-party assets unless you understand exactly why the asset needs them. These capabilities provide access to powerful systems that backdoors commonly exploit.

Before using any asset, carefully inspect its scripts. Pay particular attention to obfuscated or unusually complex code. Malicious actors often use deceptive techniques to hide harmful content, such as using whitespace to position malicious code off-screen when viewed in the studio editor. Consider favoring highly-rated community assets that have been vetted by other developers, though remember that popularity doesn't guarantee safety. For comprehensive guidance on configuring script restrictions, see [Script Capabilities](../../scripting/capabilities.md).

<Alert severity ='success'>In the future, we plan to automatically sandbox all assets from the Creator Store with appropriate Capabilities.</Alert>
