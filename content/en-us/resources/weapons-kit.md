---
title: Weapons kit
description: The Weapons Kit assists in creating competitive combat-based games.
---

Roblox offers the following prefab weapons to assist in creating competitive combat-based games. The core system features projectile-based weapons with an over-the-shoulder camera, and setting the projectile speed high enough can simulate raycasting weapons like laser guns.

<img src="../assets/resources/weapons-kit/Weapons-Banner.jpeg" width="100%" />

<Alert severity ="info">
The content of this project and documentation can be used under Roblox's [Limited Use License](../resources/limited-use-license.md).
</Alert>

To use a prefab weapon in your game:

1. Select a weapon from below, navigating to the asset library link.

   <GridContainer numColumns="3">
   <figure>
	 [![](../assets/resources/weapons-kit/Weapon-Model-Pistol.jpeg)][Marketplace-Pistol]
	 <figcaption>Pistol</figcaption>
   </figure>
   <figure>
	 [![](../assets/resources/weapons-kit/Weapon-Model-Shotgun.jpeg)][Marketplace-Shotgun]
	 <figcaption>Shotgun</figcaption>
   </figure>
   <figure>
	 [![](../assets/resources/weapons-kit/Weapon-Model-Auto-Rifle.jpeg)][Marketplace-Auto-Rifle]
   <figcaption>Auto Rifle</figcaption>
   </figure>
   <figure>
   [![](../assets/resources/weapons-kit/Weapon-Model-Submachine-Gun.jpeg)][Marketplace-Submachine-Gun]
	 <figcaption>Submachine Gun</figcaption>
   </figure>
   <figure>
   [![](../assets/resources/weapons-kit/Weapon-Model-Sniper-Rifle.jpeg)][Marketplace-Sniper-Rifle]
	 <figcaption>Sniper Rifle</figcaption>
   </figure>
   <figure>
   [![](../assets/resources/weapons-kit/Weapon-Model-Crossbow.jpeg)][Marketplace-Crossbow]
	 <figcaption>Crossbow</figcaption>
   </figure>
   <figure>
   [![](../assets/resources/weapons-kit/Weapon-Model-Grenade-Launcher.jpeg)][Marketplace-Grenade-Launcher]
	 <figcaption>Grenade Launcher</figcaption>
   </figure>
   <figure>
   [![](../assets/resources/weapons-kit/Weapon-Model-Rocket-Launcher.jpeg)][Marketplace-Rocket-Launcher]
	 <figcaption>Rocket Launcher</figcaption>
   </figure>
   <figure>
   [![](../assets/resources/weapons-kit/Weapon-Model-Railgun.jpeg)][Marketplace-Railgun]
	 <figcaption>Railgun</figcaption>
   </figure>
   </GridContainer>

1. On the weapon's item page, click the **Get Model** button and confirm the transaction.
1. In Studio, open the [Toolbox](../projects/assets/toolbox.md) and select your **Inventory** section.

   <img src="../assets/studio/toolbox/Inventory-Tab.png" width="360" />

1. Locate the weapon and click it to add it into the place. When prompted whether to put the tool into the starter pack, click **Yes** if you want players to start with the weapon in their backpack, or click **No** to simply place the weapon in the 3D world as a pickup.

1. If this is the **first time** bringing in a prefab weapon, move its `WeaponsSystem` folder into `Class.ServerScriptService` to serve as the unified [system folder](#system-folder-structure) for all prefab weapons in the game.

   <img src="../assets/resources/weapons-kit/Move-WeaponsSystem-Folder.png" width="320" />

## System folder structure

The `WeaponsSystem` folder is a unified folder that contains assets, configurations, and scripts that power all prefab weapons in the game. If located in `Class.ServerScriptService`, it overrides any equivalent `WeaponsSystem` folders that may reside within individual weapons.

<img src="../assets/resources/weapons-kit/WeaponsSystem-Structure.png" width="320" />

Within the `WeaponsSystem` folder, different aspects are controlled by the following `Class.ModuleScript|ModuleScripts`:

<table>
<thead>
  <tr>
    <th>Aspect</th>
    <th>Handled primarily within...</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Weapons functionality</td>
    <td><ul><li>`WeaponsSystem`</li><li>`Libraries/BaseWeapon`</li><li>`WeaponTypes/BulletWeapon`</li><li>`WeaponTypes/BowWeapon`</li></ul></td>
  </tr>
  <tr>
    <td>[Shoulder camera](#shoulder-camera)</td>
    <td><ul><li>`Libraries/ShoulderCamera`</li></ul></td>
  </tr>
  <tr>
    <td>[Weapons GUI](#weapons-gui)</td>
    <td><ul><li>`Libraries/WeaponsGui`</li><li>`Libraries/DirectionalIndicatorGuiManager`</li><li>`Libraries/DamageBillboardHandler`</li></ul></td>
  </tr>
</tbody>
</table>

## Weapon structure

Prefab weapons are [tools](../players/tools.md) and are named as they will appear in the player's backpack. Each weapon is structured with a similar hierarchy.

### Weapon type

The `WeaponType` `Class.StringValue` corresponds with the `Class.ModuleScript` for the weapon in the `WeaponsSystem/WeaponTypes` folder. The two base values are `BulletWeapon` and `BowWeapon`.

### Weapon model

Each weapon contains a `Class.Model` made up of one or more `Class.BasePart|BaseParts` to form the physical weapon. One of these should be set as the model's `Class.Model.PrimaryPart|PrimaryPart`.

<img src="../assets/resources/weapons-kit/Weapon-Model.png" width="320" />

The model also includes the following important descendants which may be parented to one of the model's `Class.BasePart|BaseParts`:

- `TipAttachment` — `Class.Attachment` whose position on the parent `Class.BasePart` determines where bullets/projectiles come out.
- `HandleAttachment` — `Class.Attachment` whose position on the parent `Class.BasePart` determines where the tool's [handle](../players/tools.md#set-the-handle) is welded.
- `Fired` <Chip label="optional" size="small" variant="outlined" /> — `Class.Sound` that plays when the weapon is fired.
- `Reload` <Chip label="optional" size="small" variant="outlined" /> — `Class.Sound` that plays when the weapon is reloaded.
- Additional descendants for any [specialized options](#specialized-options).

### Configuration

The `Configuration` folder contains specific "value" types for weapon behavior. Beyond the defaults, you can add additional configuration items for [specialized options](#specialized-options) when applicable.

<img src="../assets/resources/weapons-kit/Weapon-Configuration.png" width="320" />

As follows are the base configurations and their default values:

<table>
<thead>
  <tr>
    <th>Item</th>
    <th>Description</th>
	  <th>Default</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`AimTrack`</td>
    <td>Name of the aim animation track in `Assets/Animations` of the [system folder](#system-folder-structure).</td>
	  <td>`RifleAim`</td>
  </tr>
  <tr>
    <td>`AimZoomTrack`</td>
    <td>Name of the aim zooming animation track in `Assets/Animations` of the [system folder](#system-folder-structure).</td>
	  <td>`RifleAimDownSights`</td>
  </tr>
  <tr>
    <td>`AmmoCapacity`</td>
    <td>Number of shots in each "ammo&nbsp;clip" before player must reload. Note that ammo is unlimited and this does not specify how much ammo a player is carrying.</td>
	  <td>`30`</td>
  </tr>
  <tr>
    <td>`BulletSpeed`</td>
    <td>Speed that bullets/projectiles travel when shot. Setting this to a very high value like `20000` simulates raycasting weapons like laser guns.</td>
	  <td>`1000`</td>
  </tr>
  <tr>
    <td>`BurstShotCooldown`</td>
    <td>Time between each shot in a burst; only matters if you set `FireMode` to `Burst`.</td>
	  <td>Value of `ShotCooldown`</td>
  </tr>
  <tr>
    <td>`FiredPlaybackSpeedRange`</td>
    <td>Amount that the pitch can vary for the `Fired` sound of the weapon. Set this to `0` to always play it at the same pitch.</td>
	  <td>`0.1`</td>
  </tr>
  <tr>
    <td>`FireMode`</td>
    <td>Choose from either `Semiautomatic` (one shot per click/tap), `Automatic` (continuous fire), or `Burst` (burst of shots equal to `NumBurstShots` on each click/tap).</td>
	  <td>`Semiautomatic`</td>
  </tr>
  <tr>
    <td>`FullDamageDistance`</td>
    <td>Maximum distance that shots will do full damage. Anything hit beyond this distance will receive less and less damage as the distance nears `ZeroDamageDistance`.</td>
	  <td>`1000`</td>
  </tr>
  <tr>
    <td>`GravityFactor`</td>
    <td>Amount that gravity should influence each bullet/projectile. For example, this value for the [Crossbow][Marketplace-Crossbow] is `1` because arrows arc during flight, but this value for the [Rocket Launcher][Marketplace-Rocket-Launcher] is `0` because propelled rockets travel straight.</td>
	  <td>`0`</td>
  </tr>
  <tr>
    <td>`HasScope`</td>
    <td>Set to `true` if you want to use the scope that's specified in [Weapons GUI](#weapons-gui).</td>
	  <td>`false`</td>
  </tr>
  <tr>
    <td>`HitDamage`</td>
    <td>Amount of damage each direct hit does.</td>
	  <td>`10`</td>
  </tr>
  <tr>
    <td>`MaxDistance`</td>
    <td>Maximum distance bullets/projectiles travel before disappearing.</td>
	  <td>`2000`</td>
  </tr>
  <tr>
    <td>`MaxSpread`</td>
    <td>Maximum amount of spread for the weapon.</td>
	  <td>Value of `MinSpread`</td>
  </tr>
  <tr>
    <td>`MinSpread`</td>
    <td>Minimum amount of spread for the weapon.</td>
	  <td>`0`</td>
  </tr>
  <tr>
    <td>`NumBurstShots`</td>
    <td>Number of shots per click/burst; only matters if you set `FireMode` to `Burst`.</td>
	  <td>`3`</td>
  </tr>
  <tr>
    <td>`NumProjectiles`</td>
    <td>Number of bullets/projectiles that will fire at the same time when you click/tap once. This is useful for weapons like the [Shotgun][Marketplace-Shotgun] that fires multiple bullets at same time. Note that one shot will always use exactly one ammo regardless of this value.</td>
	  <td>`1`</td>
  </tr>
  <tr>
    <td>`RecoilDecay`</td>
    <td>Decay multiplier for recoil; essentially the rate at which recoil diminishes after shooting.</td>
	  <td>`0.825`</td>
  </tr>
  <tr>
    <td>`RecoilDelayTime`</td>
    <td>Waiting time after shooting/clicking before recoil is added to camera.</td>
	  <td>`0.07`</td>
  </tr>
  <tr>
    <td>`RecoilMax`</td>
    <td>Maximum recoil added for each shot.</td>
	  <td>`0.5`</td>
  </tr>
  <tr>
    <td>`RecoilMin`</td>
    <td>Minimum recoil added for each shot.</td>
	  <td>`0.05`</td>
  </tr>
  <tr>
    <td>`ReloadAnimation`</td>
    <td>Name of the reload animation track in `Assets/Animations` of the [system folder](#system-folder-structure).</td>
	  <td>`RifleReload`</td>
  </tr>
  <tr>
    <td>`ShotCooldown`</td>
    <td>Minimum waiting time between clicks. For weapons with `FireMode` of `Automatic`, this is also the time between shots while pressing the fire button or holding click.</td>
	  <td>`0.1`</td>
  </tr>
  <tr>
    <td>`StartupTime`</td>
    <td>Length of time after equipping the weapon before the player can shoot. This prevents players from firing a single shot from multiple different weapons in quick succession.</td>
	  <td>`0.2`</td>
  </tr>
  <tr>
    <td>`TotalRecoilMax`</td>
    <td>Total maximum accumulated recoil. Weapon's current recoil will never exceed this value.</td>
	  <td>`2`</td>
  </tr>
  <tr>
    <td>`ZeroDamageDistance`</td>
    <td>Anything hit at or beyond this distance will receive no damage.</td>
	  <td>`10000`</td>
  </tr>
</tbody>
</table>

## Specialized options

You can add/modify the following options for any weapon. These customizations require modifying either the weapon's `Class.Model`, the weapon's `Class.Configuration`, or both. Some configurations are dependent on others, such as [muzzle particles](#muzzle-particles) which require the necessary children for [projectile/hit effects and sounds](#projectilehit-effects-and-sounds).

### Bolt animations and sounds

A weapon's **bolt** is the part that moves back and forth each time it's fired.

- Descendants of the weapon's [weapon model](#weapon-model):

  - `Bolt` — `Class.BasePart` that moves when the weapon is fired.
  - `BoltMotor` — `Class.Motor6D` used to animate the bolt. Make sure to set the motor's `Class.Motor6D.Part0|Part0` to the weapon model's `Class.Model.PrimaryPart|PrimaryPart` and `Class.Motor6D.Part1|Part1` to the `Bolt` part.
  - `BoltMotorStart` — `Class.Attachment` whose position on the parent `Class.BasePart` determines where the bolt is when it's at rest.
  - `BoltMotorTarget` — `Class.Attachment` whose position on the parent `Class.BasePart` determines where the bolt animates to when shooting.
  - `BoltOpenSound` <Chip label="optional" size="small" variant="outlined" /> — `Class.Sound` that plays when the bolt opens.
  - `BoltCloseSound` <Chip label="optional" size="small" variant="outlined" /> — `Class.Sound` that plays when the bolt closes.

- Descendants of the weapon's [configuration](#configuration) folder:

  - `ActionOpenTime` <Chip label="optional" size="small" variant="outlined" /> — Time it takes for the bolt to animate to open position. Default is `0.025`.
  - `ActionCloseTime` <Chip label="optional" size="small" variant="outlined" /> — Time it takes for the bolt to animate to closed position. Default is `0.075`.

### Ejected bullet casings

Weapons can include physical bullet casings that eject upon firing and fall to the ground.

- Descendants of the weapon's [weapon model](#weapon-model):

  - `CasingEjectPoint` — `Class.Attachment` whose position on the parent `Class.BasePart` determines where you want bullet casings to pop out. Note that its orientation determines the direction that casings pop out.

- Descendants of the weapon's [configuration](#configuration) folder:

  - `CasingEffect` — Name of casing `Class.BasePart` in `Assets/Effects/Casings` of the [system folder](#system-folder-structure).
  - `CasingEjectSpeedMin` <Chip label="optional" size="small" variant="outlined" /> — Minimum eject speed of casings. Default is `15`.
  - `CasingEjectSpeedMax` <Chip label="optional" size="small" variant="outlined" /> — Maximum eject speed of casings. Default is `18`.

- Child of the casing `Class.BasePart` in `Assets/Effects/Casings` of the [system folder](#system-folder-structure):

  - `CasingHitSound` <Chip label="optional" size="small" variant="outlined" /> — `Class.Sound` that plays when casings hit the ground.

### Projectile/hit effects and sounds

You can configure physical projectiles for any weapon, along with `Class.Sound|Sounds`, `Class.Beam|Beams`, and `Class.ParticleEmitter|ParticleEmitters` for hit effects and other special effects.

- Descendants of the weapon's [configuration](#configuration) folder:

  - `ShotEffect` — Name of a shot effect stored within `Assets/Effects/Shots` of the [system folder](#system-folder-structure).
  - `ShouldMovePart` <Chip label="optional" size="small" variant="outlined" /> — Set to `true` if the weapon's `ShotEffect` should move with the projectile or `false` if not. You should only set this to `true` if there's a visible object that moves with each shot, such as an arrow or rocket. Default is `false`.
  - `BeamFadeTime` <Chip label="optional" size="small" variant="outlined" /> — Time it takes for `Beam0` or `Beam1` (see below) to fade after the bullet/projectile hits something. By default, no manual fade will be applied by code. Default is `0`.
  - `BeamWidth0` <Chip label="optional" size="small" variant="outlined" /> — Thickness of `Beam0` or `Beam1` at `Attachment0` (see below). Default is `1.5`.
  - `BeamWidth1` <Chip label="optional" size="small" variant="outlined" /> — Thickness of `Beam0` or `Beam1` at `Attachment1` (see below). Default is `1.8`.
  - `NumHitParticles` <Chip label="optional" size="small" variant="outlined" /> — Number of particles the `HitParticles` (see below) emitter will emit. Default is `3`.
  - `HitParticlesUsePartColor` <Chip label="optional" size="small" variant="outlined" /> — Set to `true` if you want the hit particles to be the color of the hit surface; `false` if you want hit particles to not change color. Default is `true`.

- Descendants of the specified `ShotEffect` noted in the above section:

  - `Flying` <Chip label="optional" size="small" variant="outlined" /> — `Class.Sound` that plays while the bullet/projectile is traveling.
  - `Beam0` <Chip label="optional" size="small" variant="outlined" /> — First slot for a trailing `Class.Beam` behind the bullet/projectile. Don't forget to set `Attachment0` and `Attachment1`.
  - `Beam1` <Chip label="optional" size="small" variant="outlined" /> — Second slot for a trailing `Class.Beam` behind the bullet/projectile. Don't forget to set `Attachment0` and `Attachment1`.
  - `Attachment0` <Chip label="optional" size="small" variant="outlined" /> — `Class.Attachment` whose position on the parent `Class.BasePart` determines the back of trailing beams; make sure to set `Class.Beam.Attachment0` on both `Beam0` and `Beam1` to this.
  - `Attachment1` <Chip label="optional" size="small" variant="outlined" /> — `Class.Attachment` whose position on the parent `Class.BasePart` determines the front of trailing beams; make sure to set `Class.Beam.Attachment1` on both `Beam0` and `Beam1` to this.
  - `TrailParticles` <Chip label="optional" size="small" variant="outlined" /> — `Class.ParticleEmitter` parented as a direct child of `Attachment0`; this will emit while the bullet/projectile is traveling.
  - `LeadingParticles` <Chip label="optional" size="small" variant="outlined" /> — `Class.ParticleEmitter` parented as a direct child of `Attachment1`; this will emit while the bullet/projectile is traveling.
  - `HitEffect` <Chip label="optional" size="small" variant="outlined" /> — `Class.Attachment` whose position will be set to `Class.Beam.Attachment1` of `Beam0` when the bullet/projectile hits. You must specify `Beam0` and its attachments for this to work properly.
  - `HitSound` <Chip label="optional" size="small" variant="outlined" /> — `Class.Sound` parented as a direct child of `HitEffect`; plays when the bullet/projectile hits.
  - `HitParticles` <Chip label="optional" size="small" variant="outlined" /> — `Class.Sound` parented as a direct child of `HitEffect`; emits when the bullet/projectile hits.
  - `Mesh` <Chip label="optional" size="small" variant="outlined" /> — `Class.SpecialMesh` that you want to appear as a physical projectile. Make sure you set `ShouldMovePart` in the weapon's configuration to `true` if you have a visible object here.

### Muzzle particles

This option emits particles from the specified `Class.ParticleEmitter` at the weapon's `TipAttachment` `Class.Attachment` when it's fired. Descendants of the weapon's [configuration](#configuration) folder include:

- `ShotEffect` — Name of a shot effect stored within `WeaponsSystem/Assets/Effects/Shots`. As a child of this shot effect, include a `Class.ParticleEmitter` asset named `MuzzleParticles`.
- `NumMuzzleParticles` <Chip label="optional" size="small" variant="outlined" /> — Number of muzzle particles that will be emitted. Default is `50`.

### Muzzle flashes

This option creates a `Class.Beam` flash effect when the weapon is fired.

- Descendants of the weapon's [weapon model](#weapon-model):

  - `MuzzleFlash0` — `Class.Attachment` used to specify one side of muzzle flash. Position doesn't matter.
  - `MuzzleFlash1` — `Class.Attachment` used to specify opposite side of muzzle flash. Position doesn't matter.
  - `MuzzleFlash` — `Class.Beam` for the muzzle flash effect. Make sure to set the beam's `Class.Beam.Attachment0|Attachment0` to `MuzzleFlash0` and `Class.Beam.Attachment1|Attachment1` to `MuzzleFlash1`.

- Descendants of the weapon's [configuration](#configuration) folder:

  - `MuzzleFlashTime` <Chip label="optional" size="small" variant="outlined" /> — Length of time muzzle flash will show for. Default is `0.03`.
  - `MuzzleFlashRotation0` <Chip label="optional" size="small" variant="outlined" /> — Minimum rotation of muzzle flash. Default is `Library.math.pi|-math.pi`.
  - `MuzzleFlashRotation1` <Chip label="optional" size="small" variant="outlined" /> — Maximum rotation of muzzle flash. Default is `Library.math.pi|math.pi`.
  - `MuzzleFlashSize0` <Chip label="optional" size="small" variant="outlined" /> — Minimum size of muzzle flash. Default is `1`.
  - `MuzzleFlashSize1` <Chip label="optional" size="small" variant="outlined" /> — Maximum size of muzzle flash. Default is `1`.

### Particle trails

This option creates a trail of varying length from the weapon to the projectile impact point. Descendants of the weapon's [configuration](#configuration) folder include:

- `TrailLength` <Chip label="optional" size="small" variant="outlined" /> — Length of trail behind bullet/projectile; default is `nil` which means the trail length will instead be calculated using `TrailLengthFactor`.
- `TrailLengthFactor` <Chip label="optional" size="small" variant="outlined" /> — If specified, the trail length will be set to this value multiplied by the distance the bullet/projectile traveled in the last frame; default is `1`. Note that this will be overridden if you include `TrailLength`.
- `ShowEntireTrailUntilHit` <Chip label="optional" size="small" variant="outlined" /> — Set to `true` to render the trail from the weapon tip all the way to wherever the projectile is; this will override both `TrailLength` and `TrailLengthFactor` and the trail will only disappear once the projectile hits something. Set to `false` to use one of the above two options to calculate trail length. Default is `false`.

### Hit marks

This visual addition appears on the surface where projectiles hit and is useful for arrows, bullet holes, scorch marks, etc. Descendants of the weapon's [configuration](#configuration) folder include:

- `HitMarkEffect` <Chip label="optional" size="small" variant="outlined" /> — Name of a `Class.Part`/`Class.MeshPart`/`Class.SpecialMesh` hit mark effect stored within `WeaponsSystem/Assets/Effects/HitMarks`. Default is `BulletHole`.
- `AlignHitMarkToNormal` <Chip label="optional" size="small" variant="outlined" /> — Set to `true` if the hit mark should always align flat against the surface like a bullet hole, or `false` if the hit mark should appear stuck in the surface from the direction the projectile came from (like an arrow). Default is `true`.

As noted by `HitMarkEffect` above, you can add a part/mesh within `WeaponsSystem/Assets/Effects/HitMarks` to appear as a physical projectile. For example, including an arrow `Class.MeshPart` and setting `AlignHitMarkToNormal` to `false` will make the arrow stick out of the surface from the direction you shot it. This `Class.Part`/`Class.MeshPart`/`Class.SpecialMesh` may contain the following descendants:

- `Glow` <Chip label="optional" size="small" variant="outlined" /> — `Class.Decal` which appears on the hit surface fully opaque, then rapidly gets more transparent, like a glowing effect on the surface that fades quickly. Useful for things like showing a glowing red mark where explosives hit.
- `BulletHole` <Chip label="optional" size="small" variant="outlined" /> — `Class.Decal` which appears on the hit surface fully opaque and, after 4 seconds, fades to transparent over 1 second.
- `ImpactBillboard` <Chip label="optional" size="small" variant="outlined" /> — `Class.BillboardGui` which displays at the hit surface, always facing towards the camera.
- `Impact` <Chip label="optional" size="small" variant="outlined" /> — `Class.ImageLabel` as a direct child of `ImpactBillboard`; this begins fully opaque, grows to the full size of the `ImpactBillboard` over `0.1` seconds, then shrinks to half its size and fades to full transparency over `0.1` seconds.

### Exploding projectiles

Projectiles can include an `Class.Explosion` object to damage player characters in an area around the impact point. Descendants of the weapon's [configuration](#configuration) folder include:

- `ExplodeOnImpact` <Chip label="optional" size="small" variant="outlined" /> — Set to `true` if you want bullets/projectiles for the weapon to explode on impact, `false` otherwise. Default is `false`.
- `BlastRadius` <Chip label="optional" size="small" variant="outlined" /> — `Class.Explosion.BlastRadius|BlastRadius` of explosion; default is `8`.
- `BlastPressure` <Chip label="optional" size="small" variant="outlined" /> — `Class.Explosion.BlastPressure|BlastPressure` of explosion; default is `10000`.
- `BlastDamage` <Chip label="optional" size="small" variant="outlined" /> — Damage dealt to things in the center of the explosion. Note that the explosion does less damage the farther away hit objects are from the center of the explosion. Default is `100`.

### Charging weapon

A charging weapon like the [Railgun][Marketplace-Railgun] must be charged up between shots before it can fire again.

- Descendants of the weapon's [weapon model](#weapon-model):

  - `Charging` <Chip label="optional" size="small" variant="outlined" /> — `Class.Sound` which plays while the weapon is charging.
  - `Discharging` <Chip label="optional" size="small" variant="outlined" /> — `Class.Sound` which plays while the weapon is discharging, for example if you charge the weapon just partially and release the shoot button.
  - `ChargeComplete` <Chip label="optional" size="small" variant="outlined" /> — `Class.Sound` which plays when the weapon has reached full charge.
  - `DischargeComplete` <Chip label="optional" size="small" variant="outlined" /> — `Class.Sound` which plays when the weapon has completely discharged.
  - `ChargeGlow` <Chip label="optional" size="small" variant="outlined" /> — `Class.BasePart` which will get less transparent as the weapon charges up, such that it will be fully opaque at 100% charge.
  - `ChargeCompleteParticles` <Chip label="optional" size="small" variant="outlined" /> — `Class.ParticleEmitter` which emits when the weapon has finished charging. This emitter can be a child of any model `Class.BasePart` or a child of an `Class.Attachment` within the `Class.BasePart`.
  - `DischargeCompleteParticles` <Chip label="optional" size="small" variant="outlined" /> — `Class.ParticleEmitter` which emits when the weapon has completely discharged. This emitter can be a child of any model `Class.BasePart` or a child of an `Class.Attachment` within the `Class.BasePart`.
  - `ChargingParticles` <Chip label="optional" size="small" variant="outlined" /> — `Class.ParticleEmitter` which emits while the weapon is charging. You can include multiple emitters of this name and each will emit while charging. This emitter can be a child of any model `Class.BasePart` or a child of an `Class.Attachment` within the `Class.BasePart`.

- Descendants of the weapon's [configuration](#configuration) folder:

  - `ChargeRate` — Rate at which the weapon will charge. This value must be specified to indicate that the weapon uses charging.
  - `DischargeRate` <Chip label="optional" size="small" variant="outlined" /> — Rate at which the weapon will discharge. Default is `0` which means the weapon will not discharge at all.
  - `ChargePassively` <Chip label="optional" size="small" variant="outlined" /> — Set to `true` if you want the weapon to passively charge so it will shoot instantly when you click, or `false` if you want to click/touch to charge the weapon and have it fire once full charge is reached. Default is `false`.
  - `ChargingParticlesRatePerCharge` <Chip label="optional" size="small" variant="outlined" /> — Number of particles that will emit out of all `ChargingParticles` emitters multiplied by the current charge of the weapon. Default is `20`, meaning that if the weapon charge is at 10%, each `ChargingParticles` emitter will emit 2 particles (`20*0.1`), and if the weapon charge is at 90%, each emitter will emit 18 particles (`20*0.9`).
  - `FireDischarge` <Chip label="optional" size="small" variant="outlined" /> — Amount of charge the weapon will lose after firing a fully charged shot. Default is `1`.
  - `NumChargeCompleteParticles` <Chip label="optional" size="small" variant="outlined" /> — Number of particles the `ChargeCompleteParticles` emitter will emit once the weapon is fully charged. Default is `25`.
  - `NumDischargeCompleteParticles` <Chip label="optional" size="small" variant="outlined" /> — Number of particles the `DischargeCompleteParticles` emitter will emit when the weapon is completely discharged. Default is `25`.

### Bow weapon

A bow weapon like the [Crossbow][Marketplace-Crossbow] can include a realistic string and arms construction, as well as a visual arrow nocked to the string.

In addition to adding model descendants, you need to apply the following:

- Make the weapon into a [charging weapon](#charging-weapon). For example, add the required `ChargeRate` within the weapon's `Class.Configuration` that specifies how fast the string is drawn. Additionally, consider adding optional descendants to the weapon's `Class.Model` such as a `Charging` sound for the string/arms being pulled back.
- Set the `WeaponType` to `BowWeapon` as indicated in [weapon structure](#weapon-structure).

Descendants of the weapon's [weapon model](#weapon-model) include:

- `LeftString` <Chip label="optional" size="small" variant="outlined" /> — `Class.Beam` for the visual left half of the string.
- `RightString` <Chip label="optional" size="small" variant="outlined" /> — `Class.Beam` for the visual right half of the string.
- `Arrow` <Chip label="optional" size="small" variant="outlined" /> — `Class.BasePart` for the arrow that appears when the bow is fully drawn. Note that this is only for visual appearance on the bow (the actual fired arrow will be a `ShotEffect` as outlined in [projectile/hit effects and sounds](#projectilehit-effects-and-sounds)).
- `String1` — `Class.Attachment` for the center point of the string.
- `StringLoose` — `Class.Attachment` point where `String1` should be when the bow is at rest.
- `StringTight` — `Class.Attachment` point where `String1` should be when the bow is fully drawn.
- `Arms` <Chip label="optional" size="small" variant="outlined" /> — `Class.Part` that just serves as an internal indicator that the bow arms will be animated. This may contain the following direct children:
  - `LeftString0` — `Class.Attachment` point where the left side of the string is attached to the bow.
  - `RightString0` — `Class.Attachment` point where the right side of the string is attached to the bow.
  - `LeftLoose` — `Class.Attachment` point where `LeftString0` should be when the bow is at rest.
  - `RightLoose` — `Class.Attachment` point where `RightString0` should be when the bow is at rest.
  - `LeftTight` — `Class.Attachment` point where `LeftString0` should be when the bow is fully drawn.
  - `RightTight` — `Class.Attachment` point where `RightString0` should be when the bow is fully drawn.
  - `Mesh` — `Class.SpecialMesh` part of the bow that will actually bend when the bow is drawn. Note that you must specify the following four `Class.Vector3Value` objects to make this animate.
    - `LooseOffset` — `Class.Vector3Value` offset of the `Class.SpecialMesh` when the bow is at rest.
    - `TightOffset` — `Class.Vector3Value` offset of the `Class.SpecialMesh` when the bow is fully drawn.
    - `LooseScale` — `Class.Vector3Value` scale of the `Class.SpecialMesh` when the bow is at rest.
    - `TightScale` — `Class.Vector3Value` scale of the `Class.SpecialMesh` when the bow is fully drawn.

## Weapons GUI

The core weapons system interfaces with this system to update the GUI based on things like spread of the gun, indicators for when you get hit or hit others, etc.

The `WeaponsSystemGui` is a `Class.ScreenGui` object in `WeaponsSystem/Assets` that is parented to `Class.PlayerGui` when the game starts. `WeaponSystemGui` has four descendants as follows:

- `ScalingElements` is a `Class.Folder` with the following descendants:

  - `DirectionalIndicators` — `Class.Folder` where all [directional indicators](#directional-indicators) are stored.
  - `Crosshair` — A `Class.Frame` containing a `Class.UIAspectRatioConstraint` and image labels for the bottom, left, right, and top elements of the crosshair.
  - `HitMarker` — A `Class.Frame` containing a `Class.UIAspectRatioConstraint` and a `HitMarkerImage` image label that appears and fades when the player successfully hits another player character.

- `LargeTouchscreen` is a `Class.Frame` containing `AimButton` and `FireButton` buttons that display on large touchscreens.

- `Scope` is a `Class.Frame` that contains the `ScopeImage` image label which shows up when zooming on a weapon with `HasScope` enabled (see [weapon structure](#weapon-structure)).

- `SmallTouchscreen` is a `Class.Frame` containing `AimButton` and `FireButton` buttons that display on small touchscreens.

### Directional indicators

Directional indicators are used to show the direction of something around the player's crosshair. For example, if someone shoots you, a red semi-circle can show up around your crosshair in the direction the shot came from. Other examples include indicators to show the direction of footsteps, indirect gunfire, or even environmental objects such as chests.

To create a new indicator, add a new `Class.Frame` in `WeaponsSystemGui/ScalingElements/DirectionalIndicators` with the following structure:

- Indicator (`Class.Frame`)
  - `Class.UIAspectRatioConstraint`
  - `Class.ImageLabel` for the directional indicator. Tweaking the rotation of the image in Studio may be required unless you upload the image so that it's facing down and there's little or no blank space around it. This image label must also contain its own `Class.UIAspectRatioConstraint`.
  - `Class.Configuration` containing optional properties to adjust:
    - `DistanceLevelFromCenter` <Chip label="optional" size="small" variant="outlined" /> — Number of distance levels from the center of the screen (each distance level is about `0.03` screen scale). Default is `6`.
    - `FadeTime` <Chip label="optional" size="small" variant="outlined" /> — Indicator fade time following its activation and the `TimeBeforeFade` time. Default is `1`.
    - `Name` <Chip label="optional" size="small" variant="outlined" /> — Name of the directional indicator as you want to reference it in code. Default is the name of the indicator's top-level `Class.Frame`.
    - `TimeBeforeFade` <Chip label="optional" size="small" variant="outlined" /> — Number of seconds that the indicator will appear for before fading. Default is `1`.
    - `TransparencyBeforeFade` <Chip label="optional" size="small" variant="outlined" /> — Transparency of the indicator before it starts to fade. Default is `0`.
    - `WidthLevel` <Chip label="optional" size="small" variant="outlined" /> — Number of width levels from center (each width level is about `0.03` screen scale). Default is the value of `DistanceLevelFromCenter`.

Once created, you can activate an indicator via the following command inside `WeaponsSystem/Libraries/WeaponsGui` where `indicatorName` is the string name of the indicator to activate and `worldPos` is the world position where the directional indicator should point:

```lua
self.DirectionalIndicatorGuiManager:ActivateDirectionalIndicator(indicatorName, worldPos)
```

<Alert severity="info">
If an indicator is activated an additional time before it has had time to fade completely, a new indicator of that type will be instantiated. This allows an unlimited number of any type of indicator to be activated at the same time.

You can also activate directional indicators from outside of `WeaponsGui` by replacing `self` in the above code with the instance of `WeaponsGui` in your code. However, it's recommended that you activate it from inside `WeaponsGui` and trigger it via a `Class.RemoteEvent` or a `Class.BindableEvent`. For reference, see how `DamageIndicator` is activated within `WeaponsGui`.
</Alert>

### Damage billboard

The damage billboard is used to show numbers above a character's head when they are damaged. These will only show up for the player that damaged another player's character, not for spectating players.

Damage billboards are handled in `WeaponsSystem/Libraries/DamageBillboardHandler` and can be activated from any client-side code as follows, where `damage` is the amount of damage done and `adornmentPart` is the part on which to adorn the billboard, such as the victim's head:

```lua
DamageBillboardHandler:ShowDamageBillboard(damage, adornmentPart)
```

## Shoulder camera

The shoulder camera is a third-person camera that looks over the player character's right shoulder. To customize the shoulder camera, modify the variables under the `-- Configuration parameters (constants)` comment in the `ShoulderCamera.new()` function of `WeaponsSystem/Libraries/ShoulderCamera`. You can modify things such as field of view, offset from the character, walk speed while [sprinting or zooming](#sprint-and-zoom), etc.

## Sprint and zoom

By default, the weapons system adds "sprint" capability so players can sprint by holding the <kbd>Shift</kbd> key, pushing fully up on the dynamic thumbstick (mobile), or pushing fully up on the left joystick (gamepad). If you want to disable sprinting, set the value of `SprintEnabled` within `WeaponsSystem/Configuration` to `false`.

The system also reduces player speed while they're aiming/zooming, but you can disable this behavior by setting the value of `SlowZoomWalkEnabled` within `WeaponsSystem/Configuration` to `false`.

[Marketplace-Pistol]: https://create.roblox.com/store/asset/118912302094201/Pistol
[Marketplace-Shotgun]: https://create.roblox.com/store/asset/104068096273092/Shotgun
[Marketplace-Auto-Rifle]: https://create.roblox.com/store/asset/96131146947811/Auto-Rifle
[Marketplace-Submachine-Gun]: https://create.roblox.com/store/asset/119916677125479/Submachine-Gun
[Marketplace-Sniper-Rifle]: https://create.roblox.com/store/asset/83137776064772/Sniper-Rifle
[Marketplace-Crossbow]: https://create.roblox.com/store/asset/95459776337362/Crossbow
[Marketplace-Grenade-Launcher]: https://create.roblox.com/store/asset/98935651094401/Grenade-Launcher
[Marketplace-Rocket-Launcher]: https://create.roblox.com/store/asset/123935881517645/Rocket-Launcher
[Marketplace-Railgun]: https://create.roblox.com/store/asset/124545474340043/Railgun
