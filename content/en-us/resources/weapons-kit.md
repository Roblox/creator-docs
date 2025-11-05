---
title: Weapons kit
description: The Weapons Kit assists in creating competitive combat-based experiences.
---

To assist in creating competitive combat-based experiences, several endorsed weapons are available for use in any experience. The core system features projectile-based weapons with an over-the-shoulder camera, and setting the projectile speed high enough can simulate raycasting weapons like laser guns.

<img src="../assets/resources/weapons-kit/Endorsed-Weapons-Banner.jpeg" width="100%" />

<Alert severity ="info">
The content of this project and documentation can be used under Roblox's [Limited Use License](../resources/limited-use-license.md).
</Alert>

To use an endorsed weapon in your experience:

1. Select a weapon from below, navigating to the asset library link.

  <GridContainer numColumns="3">
  <figure>
  <a href="https://www.roblox.com/library/4842197274/Pistol" target="_blank" rel="noopener"><img src="../assets/resources/weapons-kit/Endorsed-Weapon-Pistol.jpeg" /></a>
  <figcaption>Pistol</figcaption>
  </figure>
  <figure>
  <a href="https://www.roblox.com/library/4842215723/Shotgun" target="_blank" rel="noopener"><img src="../assets/resources/weapons-kit/Endorsed-Weapon-Shotgun.jpeg" /></a>
  <figcaption>Shotgun</figcaption>
  </figure>
  <figure>
  <a href="https://www.roblox.com/library/4842207161/Auto-Rifle" target="_blank" rel="noopener"><img src="../assets/resources/weapons-kit/Endorsed-Weapon-AR.jpeg" /></a>
  <figcaption>Auto Rifle</figcaption>
  </figure>
  <figure>
  <a href="https://www.roblox.com/library/4842212980/Submachine-Gun" target="_blank" rel="noopener"><img src="../assets/resources/weapons-kit/Endorsed-Weapon-Submachine-Gun.jpeg" /></a>
  <figcaption>Submachine Gun</figcaption>
  </figure>
  <figure>
  <a href="https://www.roblox.com/library/4842218829/Sniper-Rifle" target="_blank" rel="noopener"><img src="../assets/resources/weapons-kit/Endorsed-Weapon-Sniper-Rifle.jpeg" /></a>
  <figcaption>Sniper Rifle</figcaption>
  </figure>
  <figure>
  <a href="https://www.roblox.com/library/4842204072/Crossbow" target="_blank" rel="noopener"><img src="../assets/resources/weapons-kit/Endorsed-Weapon-Crossbow.jpeg" /></a>
  <figcaption>Crossbow</figcaption>
  </figure>
  <figure>
  <a href="https://www.roblox.com/library/4842201032/Grenade-Launcher" target="_blank" rel="noopener"><img src="../assets/resources/weapons-kit/Endorsed-Weapon-Grenade-Launcher.jpeg" /></a>
  <figcaption>Grenade Launcher</figcaption>
  </figure>
  <figure>
  <a href="https://www.roblox.com/library/4842186817/Rocket-Launcher" target="_blank" rel="noopener"><img src="../assets/resources/weapons-kit/Endorsed-Weapon-Rocket-Launcher.jpeg" /></a>
  <figcaption>Rocket Launcher</figcaption>
  </figure>
  <figure>
  <a href="https://www.roblox.com/library/4842190633/Railgun" target="_blank" rel="noopener"><img src="../assets/resources/weapons-kit/Endorsed-Weapon-Railgun.jpeg" /></a>
  <figcaption>Railgun</figcaption>
  </figure>
  </GridContainer>

1. On the weapon's item page, click the green **Get** button and confirm the transaction.
1. In Studio, open the [Toolbox](../projects/assets/toolbox.md).
1. Select your toolbox **Inventory** section.
1. Locate the weapon and click it to add it into the place. When prompted whether to put the tool into the starter pack, click **Yes** if you want players to start with the weapon in their backpack, or click **No** to simply place the weapon in the 3D world as a pickup.
1. If this is the **first time** bringing in an endorsed weapon, move its **WeaponsSystem** folder into **ServerScriptService** to serve as the unified [system folder](#system-folder-structure) for all endorsed weapons in the experience.

   <img src="../assets/resources/weapons-kit/Move-WeaponsSystem-Folder.png" width="320" />

## System folder structure

The **WeaponsSystem** folder is a unified folder that contains assets, configurations, and scripts that power all endorsed weapons in the experience. If located in **ServerScriptService**, it overrides any equivalent **WeaponsSystem** folders that may reside within individual weapons.

<img src="../assets/resources/weapons-kit/WeaponsSystem-Structure.png" width="320" />

The **WeaponsSystem** folder contains the following instances:

- **Assets** (`Class.Folder`)
  - **Animations** (`Class.Folder`) &ndash; Storage for animations used in the weapons systems.
  - **Effects** (`Class.Folder`) - **Casings** (`Class.Folder`) &ndash; Storage for all bullet casing assets. - **HitMarks** (`Class.Folder`) &ndash; Storage for all hit mark effects. - **Shots** (`Class.Folder`) &ndash; Storage for all shot effects.
  - **WeaponsSystemGui** (`Class.ScreenGui`) &ndash; Settings for the [Weapons System GUI](#weapons-system-gui).
- **Configuration** (`Class.Folder`) &ndash; Configuration values for the weapons system.
  - **SlowZoomWalkEnabled** (`Class.BoolValue`) &ndash; Setting for [sprint control](#sprint-and-zoom-control).
  - **SprintEnabled** (`Class.BoolValue`) &ndash; Setting for [sprint control](#sprint-and-zoom-control).
- **Libraries** (`Class.Folder`) &ndash; Stores all other `Class.ModuleScript|ModuleScripts` used in the weapons system.
- **WeaponTypes** (`Class.Folder`) &ndash; Specifies all weapon types.
- **ServerWeaponsScript** (`Class.Script`)
- **Version** (`Class.IntValue`)
- **ClientWeaponScript** (`Class.LocalScript`)
- **NetworkingCallbacks** (`Class.ModuleScript`)
- **WeaponData** (`Class.RemoteEvent`)
- **WeaponsSystem** (`Class.ModuleScript`)

Within the **WeaponsSystem** folder, different aspects are controlled by the following `Class.ModuleScript|ModuleScripts`:

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
    <td><ul><li>[WeaponsSystem](#system-folder-structure)</li><li>**Libraries**/**BaseWeapon**</li><li>**WeaponTypes**/**BulletWeapon**</li><li>**WeaponTypes**/**BowWeapon**</li></ul></td>
  </tr>
  <tr>
    <td>[Shoulder camera](#shoulder-camera)</td>
    <td><ul><li>**Libraries**/**ShoulderCamera**</li></ul></td>
  </tr>
  <tr>
    <td>[Weapons GUI](#weapons-system-gui)</td>
    <td><ul><li>**Libraries**/**WeaponsGui**</li><li>**Libraries**/**DirectionalIndicatorGuiManager**</li><li>**Libraries**/**DamageBillboardHandler**</li></ul></td>
  </tr>
</tbody>
</table>

## Weapon structure

Endorsed weapons are `Class.Tool|Tools` and are named as they will appear in the player's backpack. Each weapon is structured with a similar hierarchy.

### Weapon type

The **WeaponType** `Class.StringValue` corresponds with the `Class.ModuleScript` for the weapon in the **WeaponsSystem**/**WeaponTypes** folder. The two base values are **BulletWeapon** and **BowWeapon**.

### Weapon model

Each weapon contains a `Class.Model` made up of one or more `Class.BasePart|BaseParts` to form the physical weapon. One of these should be set as the model's `Class.Model.PrimaryPart|PrimaryPart`.

<img src="../assets/resources/weapons-kit/Weapon-Model-BaseParts.png" width="320" />

The model also includes the following important descendants which may be parented to one of the model's `Class.BasePart|BaseParts`:

- **TipAttachment** &ndash; `Class.Attachment` whose position on the parent `Class.BasePart` determines where bullets/projectiles come out.
- **HandleAttachment** &ndash; `Class.Attachment` whose position on the parent `Class.BasePart` determines where the **Handle** is welded.
- **Fired** <Chip label="optional" size="small" variant="outlined" /> &ndash; `Class.Sound` that plays when the weapon is fired.
- **Reload** <Chip label="optional" size="small" variant="outlined" /> &ndash; `Class.Sound` that plays when the weapon is reloaded.
- Additional descendants for any [specialized options](#specialized-options).

### Weapon handle

The **Handle** part determines where a player character holds the weapon. This must be a `Class.Part`, it must be named **Handle**, and it must be a direct child of the weapon (tool).

### Configuration folder

The **Configuration** folder contains specific "value" types for weapon behavior. Beyond the defaults, you can add additional configuration items for [specialized options](#specialized-options) when applicable.

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
    <td>**AmmoCapacity**</td>
    <td>Number of shots in each "ammo&nbsp;clip" before player must reload. Note that ammo is unlimited and this does not specify how much ammo a player is carrying.</td>
	<td>30</td>
  </tr>
  <tr>
    <td>**FireMode**</td>
    <td>Choose from either **Semiautomatic** (one shot per click/tap), **Automatic** (continuous fire), or **Burst** (burst of shots equal to **NumBurstShots** on each click/tap).</td>
	<td>**Semiautomatic**</td>
  </tr>
  <tr>
    <td>**ShotCooldown**</td>
    <td>Minimum waiting time between clicks. For weapons with **FireMode** of **Automatic**, this is also the time between shots while pressing the fire button or holding click.</td>
	<td>0.1</td>
  </tr>
  <tr>
    <td>**BurstShotCooldown**</td>
    <td>Time between each shot in a burst; only matters if you set **FireMode** to **Burst**.</td>
	<td>Value of **ShotCooldown**</td>
  </tr>
  <tr>
    <td>**NumBurstShots**</td>
    <td>Number of shots per click/burst; only matters if you set **FireMode** to **Burst**.</td>
	<td>3</td>
  </tr>
  <tr>
    <td>**HitDamage**</td>
    <td>Amount of damage each direct hit does.</td>
	<td>10</td>
  </tr>
  <tr>
    <td>**FullDamageDistance**</td>
    <td>Maximum distance that shots will do full damage. Anything hit beyond this distance will receive less and less damage as the distance nears **ZeroDamageDistance**.</td>
	<td>1000</td>
  </tr>
  <tr>
    <td>**ZeroDamageDistance**</td>
    <td>Anything hit at or beyond this distance will receive no damage.</td>
	<td>10000</td>
  </tr>
  <tr>
    <td>**BulletSpeed**</td>
    <td>Speed that bullets/projectiles travel when shot. Setting this to a very high value like 20000 simulates raycasting weapons like laser guns.</td>
	<td>1000</td>
  </tr>
  <tr>
    <td>**MaxDistance**</td>
    <td>Maximum distance bullets/projectiles travel before disappearing.</td>
	<td>2000</td>
  </tr>
  <tr>
    <td>**MinSpread**</td>
    <td>Minimum amount of spread for the weapon.</td>
	<td>0</td>
  </tr>
  <tr>
    <td>**MaxSpread**</td>
    <td>Maximum amount of spread for the weapon.</td>
	<td>Value of **MinSpread**</td>
  </tr>
  <tr>
    <td>**GravityFactor**</td>
    <td>Amount that gravity should influence each bullet/projectile. For example, this value for the <a href="https://www.roblox.com/library/4842204072/Crossbow" target="_blank" rel="noopener">Crossbow</a> is 1 because arrows arc during flight, but this value for the <a href="https://www.roblox.com/library/4842186817/Rocket-Launcher" target="_blank" rel="noopener">Rocket&nbsp;Launcher</a> is 0 because propelled rockets travel straight.</td>
	<td>0</td>
  </tr>
  <tr>
    <td>**HasScope**</td>
    <td>Set to **true** if you want to use the scope that's specified in [Weapons System GUI](#weapons-system-gui).</td>
	<td>false</td>
  </tr>
  <tr>
    <td>**ReloadAnimation**</td>
    <td>Name of the reload animation track in **Assets**/**Animations** of the [system folder](#system-folder-structure).</td>
	<td>**RifleReload**</td>
  </tr>
  <tr>
    <td>**AimTrack**</td>
    <td>Name of the aim animation track in **Assets**/**Animations** of the [system folder](#system-folder-structure).</td>
	<td>**RifleAim**</td>
  </tr>
  <tr>
    <td>**AimZoomTrack**</td>
    <td>Name of the aim zooming animation track in **Assets**/**Animations** of the [system folder](#system-folder-structure).</td>
	<td>**RifleAimDownSights**</td>
  </tr>
  <tr>
    <td>**RecoilMin**</td>
    <td>Minimum recoil added for each shot.</td>
	<td>0.05</td>
  </tr>
  <tr>
    <td>**RecoilMax**</td>
    <td>Maximum recoil added for each shot.</td>
	<td>0.5</td>
  </tr>
  <tr>
    <td>**TotalRecoilMax**</td>
    <td>Total maximum accumulated recoil. Weapon's current recoil will never exceed this value.</td>
	<td>2</td>
  </tr>
  <tr>
    <td>**RecoilDecay**</td>
    <td>Decay multiplier for recoil; essentially the rate at which recoil diminishes after shooting.</td>
	<td>0.825</td>
  </tr>
  <tr>
    <td>**RecoilDelayTime**</td>
    <td>Waiting time after shooting/clicking before recoil is added to camera.</td>
	<td>0.07</td>
  </tr>
  <tr>
    <td>**StartupTime**</td>
    <td>Length of time after equipping the weapon before the player can shoot. This prevents players from firing a single shot from multiple different weapons in quick succession.</td>
	<td>0.2</td>
  </tr>
  <tr>
    <td>**FiredPlaybackSpeedRange**</td>
    <td>Amount that the pitch can vary for the **Fired** sound of the weapon. Set this to 0 to always play it at the same pitch.</td>
	<td>0.1</td>
  </tr>
  <tr>
    <td>**NumProjectiles**</td>
    <td>Number of bullets/projectiles that will fire at the same time when you click/tap once. This is useful for weapons like the <a href="https://www.roblox.com/library/4842215723/Shotgun" target="_blank" rel="noopener">Shotgun</a> that fires multiple bullets at same time. Note that one shot will always use exactly one ammo regardless of this value.</td>
	<td>1</td>
  </tr>
</tbody>
</table>

## Specialized options

You can add/modify the following options for any weapon. These customizations require modifying either the weapon's `Class.Model`, the weapon's `Class.Configuration`, or both. Some configurations are dependent on others, such as [Muzzle Particles](#muzzle-particles) which require the necessary children for [Projectile/Hit Effects and Sounds](#projectilehit-effects-and-sounds).

### Bolt animations and sounds

A weapon's **bolt** is the part that moves back and forth each time it's fired.

- Descendants of the weapon's [Weapon Model](#weapon-model)

<table>
<tbody>
<tr>
	<td>**Bolt**</td>
	<td>`Class.BasePart` that moves when the weapon is fired.</td>
	<td></td>
</tr>
<tr>
	<td>**BoltMotor**</td>
	<td colspan='2'>`Class.Motor6D` used to animate the bolt. Make sure to set the motor's `Class.Motor6D.Part0|Part0` to the weapon model's `Class.Model.PrimaryPart|PrimaryPart` and `Class.Motor6D.Part1|Part1` to the **Bolt** part.</td>
</tr>
<tr>
	<td>**BoltMotorStart**</td>
	<td colspan='2'>`Class.Attachment` whose position on the parent `Class.BasePart` determines where the bolt is when it's at rest.</td>
</tr>
<tr>
	<td>**BoltMotorTarget**</td>
	<td colspan='2'>`Class.Attachment` whose position on the parent `Class.BasePart` determines where the bolt animates to when shooting.</td>
</tr>
<tr>
	<td>**BoltOpenSound**</td>
	<td>`Class.Sound` that plays when the bolt opens.</td>
	<td><Chip label="optional" size="small" variant="outlined" /></td>
</tr>
<tr>
	<td>**BoltCloseSound**</td>
	<td>`Class.Sound` that plays when the bolt closes.</td>
	<td><Chip label="optional" size="small" variant="outlined" /></td>
</tr>
</tbody>
</table>

- Children of the weapon's [Configuration](#configuration-folder) folder

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
	<td>**ActionOpenTime**</td>
	<td>Time it takes for the bolt to animate to open position.</td>
	<td>0.025</td>
</tr>
<tr>
	<td>**ActionCloseTime**</td>
	<td>Time it takes for the bolt to animate to closed position.</td>
	<td>0.075</td>
</tr>
</tbody>
</table>

### Eject bullet casings

Weapons can include physical bullet casings that eject upon firing and fall to the ground.

- Descendants of the weapon's [Weapon Model](#weapon-model)

<table>
<tbody>
<tr>
	<td>**CasingEjectPoint**</td>
	<td>`Class.Attachment` whose position on the parent `Class.BasePart` determines where you want bullet casings to pop out. Note that its orientation determines the direction that casings pop out.</td>
</tr>
</tbody>
</table>

- Children of the weapon's [Configuration](#configuration-folder) folder

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
	<td>**CasingEffect**</td>
	<td>Name of casing `Class.BasePart` in **Assets**/**Effects**/**Casings** of the [system folder](#system-folder-structure).</td>
	<td></td>
</tr>
<tr>
	<td>**CasingEjectSpeedMin**</td>
	<td>Minimum eject speed of casings</td>
	<td>15</td>
</tr>
<tr>
	<td>**CasingEjectSpeedMax**</td>
	<td>Maximum eject speed of casings</td>
	<td>18</td>
</tr>
</tbody>
</table>

- Child of the casing `Class.BasePart` in **Assets**/**Effects**/**Casings** of the [system folder](#system-folder-structure)

<table>
<tbody>
<tr>
	<td>**CasingHitSound**</td>
	<td>`Class.Sound` that plays when casings hit the ground.</td>
	<td><Chip label="optional" size="small" variant="outlined" /></td>
</tr>
</tbody>
</table>

### Projectile/hit effects and sounds

You can configure physical projectiles for any weapon, along with `Sounds`, `Beams`, and `ParticleEmitters` for hit effects and other special effects.

- Children of the weapon's [Configuration](#configuration-folder) folder

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
	<td>**ShotEffect**</td>
	<td>Name of a shot effect stored within **Assets**/**Effects**/**Shots** of the [system folder](#system-folder-structure).</td>
	<td></td>
</tr>
<tr>
	<td>**ShouldMovePart**</td>
	<td>Set to **true** if the weapon's **ShotEffect** should move with the projectile or **false** if not. You should only set this to **true** if there's a visible object that moves with each shot, such as an arrow or rocket.</td>
	<td>false</td>
</tr>
<tr>
	<td>**BeamFadeTime**</td>
	<td>Time it takes for **Beam0** or **Beam1** ([see&nbsp;below](#shoteffect-descendants)) to fade after the bullet/projectile hits something. By default, no manual fade will be applied by code.</td>
	<td>0</td>
</tr>
<tr>
	<td>**BeamWidth0**</td>
	<td>Thickness of **Beam0** or **Beam1** at **Attachment0** ([see&nbsp;below](#shoteffect-descendants)).</td>
	<td>1.5</td>
</tr>
<tr>
	<td>**BeamWidth1**</td>
	<td>Thickness of **Beam0** or **Beam1** at **Attachment1** ([see&nbsp;below](#shoteffect-descendants)).</td>
	<td>1.8</td>
</tr>
<tr>
	<td>**NumHitParticles**</td>
	<td>Number of particles the **HitParticles** ([see&nbsp;below](#shoteffect-descendants)) emitter will emit.</td>
	<td>3</td>
</tr>
<tr>
	<td>**HitParticlesUsePartColor**</td>
	<td>Set to **true** if you want the hit particles to be the color of the hit surface; **false** if you want hit particles to not change color.</td>
	<td>true</td>
</tr>
</tbody>
</table>

#### ShotEffect Descendants

Descendants of the specified **ShotEffect** noted in the previous section

<table>
<tbody>
<tr>
	<td>**Flying**</td>
	<td>`Class.Sound` that plays while the bullet/projectile is traveling.</td>
	<td><Chip label="optional" size="small" variant="outlined" /></td>
</tr>
<tr>
	<td>**Beam0**</td>
	<td>First slot for a trailing `Class.Beam` behind the bullet/projectile. Don't forget to set **Attachment0** and **Attachment1**.</td>
	<td><Chip label="optional" size="small" variant="outlined" /></td>
</tr>
<tr>
	<td>**Beam1**</td>
	<td>Second slot for a trailing `Class.Beam` behind the bullet/projectile. Don't forget to set **Attachment0** and **Attachment1**.</td>
	<td><Chip label="optional" size="small" variant="outlined" /></td>
</tr>
<tr>
	<td>**Attachment0**</td>
	<td>`Class.Attachment` whose position on the parent `Class.BasePart` determines the back of trailing beams; make sure to set `Class.Beam.Attachment0` on both **Beam0** and **Beam1** to this.</td>
	<td><Chip label="optional" size="small" variant="outlined" /></td>
</tr>
<tr>
	<td>**Attachment1**</td>
	<td>`Class.Attachment` whose position on the parent `Class.BasePart` determines the front of trailing beams; make sure to set `Class.Beam.Attachment1` on both **Beam0** and **Beam1** to this.</td>
	<td><Chip label="optional" size="small" variant="outlined" /></td>
</tr>
<tr>
	<td>**TrailParticles**</td>
	<td>`Class.ParticleEmitter` parented as a direct child of **Attachment0**; this will emit while the bullet/projectile is traveling.</td>
	<td><Chip label="optional" size="small" variant="outlined" /></td>
</tr>
<tr>
	<td>**LeadingParticles**</td>
	<td>`Class.ParticleEmitter` parented as a direct child of **Attachment1**; this will emit while the bullet/projectile is traveling.</td>
	<td><Chip label="optional" size="small" variant="outlined" /></td>
</tr>
<tr>
	<td>**HitEffect**</td>
	<td>`Class.Attachment` whose position will be set to `Class.Beam.Attachment1` of **Beam0** when the bullet/projectile hits. You must specify **Beam0** and its attachments for this to work properly.</td>
	<td><Chip label="optional" size="small" variant="outlined" /></td>
</tr>
<tr>
	<td>**HitSound**</td>
	<td>`Class.Sound` parented as a direct child of **HitEffect**; plays when the bullet/projectile hits.</td>
	<td><Chip label="optional" size="small" variant="outlined" /></td>
</tr>
<tr>
	<td>**HitParticles**</td>
	<td>`Class.Sound` parented as a direct child of **HitEffect**; emits when the bullet/projectile hits.</td>
	<td><Chip label="optional" size="small" variant="outlined" /></td>
</tr>
<tr>
	<td>**[ProjectilePart]**</td>
	<td>Any `Class.Part` or `Class.MeshPart` that you want to appear as a physical projectile. Make sure you set **ShouldMovePart** noted in the previous section to **true** if you have a visible object here.</td>
	<td><Chip label="optional" size="small" variant="outlined" /></td>
</tr>
</tbody>
</table>

#### Muzzle particles

This option emits particles from the specified `Class.ParticleEmitter` at the weapon's **TipAttachment** `Class.Attachment` when it's fired.

Configuration descendants:
<img src="../assets/resources/weapons-kit/Weapon-Configuration-Children.png"
   width="35%" />

- **ShotEffect** (`Class.StringValue`) — Name of a shot effect stored within `WeaponsSystem/Assets/Effects/Shots`.
- **NumMuzzleParticles** (`Class.IntValue`) (optional) — Number of muzzle particles that will be emitted; default is **50**.

For the specified shot effect, add a ParticleEmitter asset within `WeaponsSystem/Assets/Effects/Shots` named **MuzzleParticles**.

<img src="../assets/resources/weapons-kit/Weapon-MuzzleParticles.png"
   width="35%" />

### Muzzle flashes

This option creates a `Class.Beam` flash effect when the weapon is fired.

Model descendants:
<img src="../assets/resources/weapons-kit/Weapon-Model-Descendants.png"
   width="35%" />

- **MuzzleFlash0** (`Class.Attachment`) — Used to specify one side of muzzle flash. Position doesn't matter.
- **MuzzleFlash1** (`Class.Attachment`) — Used to specify opposite side of muzzle flash. Position doesn't matter.
- **MuzzleFlash** (`Class.Beam`) — Make sure to set `Attachment0` to **MuzzleFlash0** and `Attachment1` to **MuzzleFlash1**.

Configuration descendants:
<img src="../assets/resources/weapons-kit/Weapon-Configuration-Children.png"
   width="35%" />

- **MuzzleFlashTime** (`Class.NumberValue`) (optional) — Length of time muzzle flash will show for; default is **0.03**.
- **MuzzleFlashRotation0** (`Class.NumberValue`) (optional) — Minimum rotation of muzzle flash; default is **-math.pi**.
- **MuzzleFlashRotation1** (`Class.NumberValue`) (optional) — Maximum rotation of muzzle flash; default is **math.pi**.
- **MuzzleFlashSize0** (`Class.NumberValue`) (optional) — Minimum size of muzzle flash; default is **1**.
- **MuzzleFlashSize1** (`Class.NumberValue`) (optional) — Maximum size of muzzle flash; default is **1**.

### Particle trails

This option creates a trail of varying length from the weapon to the projectile impact point.

Configuration descendants:
<img src="../assets/resources/weapons-kit/Weapon-Configuration-Children.png"
   width="35%" />

- **TrailLength** (`Class.NumberValue`) (optional) — Length of trail behind bullet/projectile; default is `nil` which means the trail length will instead be calculated using **TrailLengthFactor**.
- **TrailLengthFactor** (`Class.NumberValue`) (optional) — The trail length will be set to this value multiplied by the distance the bullet/projectile traveled in the last frame; default is **1**. Note that this will be overridden if you include **TrailLength**.
- **ShowEntireTrailUntilHit** (`Class.BoolValue`) (optional) — Set to **true** to render the trail from the weapon tip all the way to wherever the projectile is; this will override both **TrailLength** and **TrailLengthFactor** and the trail will only disappear once the projectile hits something. Set to **false** to use one of the above two options to calculate trail length. Default is **false**.

### Hit marks

This visual addition appears on the surface where projectiles hit and is useful for arrows, bullet holes, scorch marks, etc.

Configuration descendants:
<img src="../assets/resources/weapons-kit/Weapon-Configuration-Children.png"
   width="35%" />

- **HitMarkEffect** (`Class.StringValue`) (optional) — Name of hit mark effect stored within `WeaponsSystem/Assets/Effects/HitMarks`; default is **BulletHole**.
- **AlignHitMarkToNormal** (`Class.BoolValue`) (optional) — Set to **true** if the hit mark should always align flat against the surface like a bullet hole, or **false** if the hit mark should appear stuck in the surface from the direction the projectile came from (like an arrow). Default is **true**.

You can add the following optional asset within `WeaponsSystem/Assets/Effects/HitMarks`:

<img src="../assets/resources/weapons-kit/Weapon-BulletHole.png"
   width="35%" />

- **Glow** (`Class.Decal`) (optional) — Appears on the hit surface fully opaque, then rapidly gets more transparent, like a glowing effect on the surface that fades quickly. Useful for things like showing a glowing red mark where explosives hit.
- **BulletHole** (`Class.Decal`) (optional) — Appears on the hit surface fully opaque and, after 4 seconds, fades to transparent over 1 second.
- **ImpactBillboard** (`Class.BillboardGui`) (optional) — Displays at the hit surface, always facing towards the camera.
  - **Impact** (`Class.ImageLabel`) (optional) — Direct child of **ImpactBillboard**; this begins fully opaque, grows to the full size of the **ImpactBillboard** over 0.1 seconds, then shrinks to half its size and fades to full transparency over 0.1 seconds.
- Any `Class.Part`/`Class.MeshPart`/`Class.SpecialMesh` that you want to appear as a physical projectile (optional). For example, including an arrow `Class.MeshPart` and setting **AlignHitMarkToNormal** noted above to **false** will make the arrow stick out of the surface from the direction you shot it.

### Exploding projectiles

Projectiles can include an Explosion object to damage player characters in an area around the impact point.

Configuration descendants:
<img src="../assets/resources/weapons-kit/Weapon-Configuration-Children-Grenade-Launcher.png"
   width="35%" />

- **ExplodeOnImpact** (`Class.BoolValue`) (optional) — Set to **true** if you want bullets/projectiles for the weapon to explode on impact, **false** otherwise. Default is **false**.
- **BlastRadius** (`Class.NumberValue`) (optional) — BlastRadius of explosion; default is **8**.
- **BlastPressure** (`Class.NumberValue`) (optional) — BlastPressure of explosion; default is **10000**.
- **BlastDamage** (`Class.NumberValue`) (optional) — Damage dealt to things in the center of the explosion. Note that the explosion does less damage the farther away hit objects are from the center of the explosion. Default is **100**.

### Charging weapon

A charging weapon like the Railgun must be charged up between shots before it can fire again.

Model descendants:
<img src="../assets/resources/weapons-kit/Weapon-Model-Descendants-Railgun.png"
   width="35%" />

- **Charging** (`Class.Sound`) (optional) — Plays while the weapon is charging.
- **Discharging** (`Class.Sound`) (optional) — Plays while the weapon is discharging, for example if you charge the weapon just partially and release the shoot button.
- **ChargeComplete** (`Class.Sound`) (optional) — Plays when the weapon has reached full charge.
- **DischargeComplete** (`Class.Sound`) (optional) — Plays when the weapon has completely discharged.
- **ChargeGlow** (`Class.BasePart`) (optional) — This object will get less transparent as the weapon charges up, such that it will be fully opaque at 100% charge.
- **ChargeCompleteParticles** (`Class.ParticleEmitter`) (optional) — Emits when the weapon has finished charging. This emitter can be a child of any model `Class.BasePart` or a child of an `Class.Attachment` within the `Class.BasePart`.
- **DischargeCompleteParticles** (`Class.ParticleEmitter`) (optional) — Emits when the weapon has completely discharged. This emitter can be a child of any model `Class.BasePart` or a child of an `Class.Attachment` within the `Class.BasePart`.
- **ChargingParticles** (`Class.ParticleEmitter`) (optional) — Emits while the weapon is charging. You can include multiple emitters of this name and each will emit while charging. This emitter can be a child of any model `Class.BasePart` or a child of an `Class.Attachment` within the `Class.BasePart`.

Configuration descendants:
<img src="../assets/resources/weapons-kit/Weapon-Configuration-Children-Railgun.png"
   width="35%" />

- **ChargeRate** (`Class.NumberValue`) — Rate at which the weapon will charge. This value must be specified to indicate that the weapon uses charging.
- **DischargeRate** (`Class.NumberValue`) (optional) — Rate at which the weapon will discharge; default is **0** which means the weapon will not discharge at all.
- **ChargePassively** (`Class.BoolValue`) (optional) — Set to **true** if you want the weapon to passively charge so it will shoot instantly when you click, or **false** if you want to click/touch to charge the weapon and have it fire once full charge is reached. Default is **false**.
- **ChargingParticlesRatePerCharge** (`Class.IntValue`) (optional) — Number of particles that will emit out of all **ChargingParticles** emitters multiplied by the current charge of the weapon. Default is **20**, meaning that if the weapon charge is at 10%, each ChargingParticles emitter will emit 2 particles (20×0.1), and if the weapon charge is at 90%, each emitter will emit 18 particles (20×0.9).
- **FireDischarge** (`Class.NumberValue`) (optional) — Amount of charge the weapon will lose after firing a fully charged shot; default is **1**.
- **NumChargeCompleteParticles** (`Class.IntValue`) (optional) — Number of particles the - ChargeCompleteParticles emitter will emit once the weapon is fully charged. Default is **25**.
- **NumDischargeCompleteParticles** (`Class.IntValue`) (optional) — Number of particles the - **DischargeCompleteParticles** emitter will emit when the weapon is completely discharged. Default is **25**.

### Bow weapon

A bow weapon like the Crossbow can include a realistic string and arms construction, as well as a visual arrow nocked to the string.

In addition to adding model descendants, you need to apply the following:

- Make the weapon into a [charging weapon](#charging-weapon). For example, add the required **ChargeRate** within the weapon's `Class.Configuration` that specifies how fast the string is drawn. Additionally, consider adding optional descendants to the weapon's `Class.Model` such as a **Charging** sound for the string/arms being pulled back.
- Set the **WeaponType** to **BowWeapon** as indicated in [Weapon Structure](#weapon-structure).

Model descendants:
<img src="../assets/resources/weapons-kit/Weapon-Model-Descendants-Crossbow.png"
   width="35%" />

- **LeftString** (`Class.Beam`) (optional) — The visual left half of the string.
- **RightString** (`Class.Beam`) (optional) — The visual right half of the string.
- **Arrow** (`Class.BasePart`) (optional) — The arrow that appears when the bow is fully drawn. Note that this is only for visual appearance on the bow (the actual fired arrow will be a **ShotEffect** as outlined in [Projectile/Hit Effects and Sounds](#projectilehit-effects-and-sounds)).
- **String1** (`Class.Attachment`) (optional) — The center point of the string.
- **StringLoose** (`Class.Attachment`) (optional) — Point where **String1** should be when the bow is at rest.
- **StringTight** (`Class.Attachment`) (optional) — Point where **String1** should be when the bow is fully drawn.
- **Arms** (`Class.Part`) (optional) — A part that just serves as an internal indicator that the bow arms will be animated. This may contain the following direct children:
- **LeftString0** (`Class.Attachment`) (optional) — Point where the left side of the string is attached to the bow.
- **RightString0** (`Class.Attachment`) (optional) — Point where the right side of the string is attached to the bow.
- **LeftLoose** (`Class.Attachment`) (optional) — Point where **LeftString0** should be when the bow is at rest.
- **RightLoose** (`Class.Attachment`) (optional) — Point where **RightString0** should be when the bow is at rest.
- **LeftTight** (`Class.Attachment`) (optional) — Point where **LeftString0** should be when the bow is fully drawn.
- **RightTight** (`Class.Attachment`) (optional) — Point where **RightString0** should be when the bow is fully drawn.
- [SpecialMesh] (`Class.SpecialMesh`) (optional) — The part of the bow that will actually bend when the bow is drawn. Note that you must specify the following four `Class.Vector3Value` objects to make this animate.
- **LooseOffset** (`Class.Vector3Value`) (optional) — Offset of the `Class.SpecialMesh` when the bow is at rest.
- **TightOffset** (`Class.Vector3Value`) (optional) — Offset of the `Class.SpecialMesh` when the bow is fully drawn.
- **LooseScale** (`Class.Vector3Value`) (optional) — Scale of the `Class.SpecialMesh` when the bow is at rest.
- **TightScale** (`Class.Vector3Value`) (optional) — Scale of the `Class.SpecialMesh` when the bow is fully drawn.

## Weapons system GUI

The core weapons system interfaces with this system to update the GUI based on things like spread of the gun, indicators for when you get hit or hit others, etc.

The **WeaponsSystemGui** is a `Class.ScreenGui` object in `WeaponsSystem/Assets` that is parented to `Class.PlayerGui` when the experience starts. WeaponSystemGui has 4 descendants:

- [ScalingElements](#scaling-elements) - A `Class.Folder` of on-screen elements.
- [LargeTouchscreen](#largetouchscreen) - A `Class.Frame` for buttons on large touchscreens.
- [Scope](#scope) - A `Class.Frame` for zooming in with weapons that use a scope.
- [SmallTouchscreen](#smalltouchscreen) - A `Class.Frame` for buttons on small touchscreens.

### Scaling elements

ScalingElements is a `Class.Folder` parented under WeaponsSystemGui with the following descendants:

<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Instance type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>DirectionalIndicators</td>
    <td>`Class.Folder`</td>
    <td>A `Class.Folder` where all [directional indicators](#create-a-directional-indicator) are stored.</td>
  </tr>
  <tr>
    <td>Crosshair</td>
    <td>`Class.Frame`</td>
    <td>A `Class.Frame` containing the following objects:<br /><br />[UIAspectRationConstraint] - `Class.UIAspectRatioConstraint`<br />**Bottom** - `Class.ImageLabel`<br />**Left** - `Class.ImageLabel`<br />**Right** - `Class.ImageLabel`<br />**Top** - `Class.ImageLabel`</td>
  </tr>
  <tr>
    <td>HitMarker</td>
    <td>`Class.Frame`</td>
    <td>A `Class.Frame` containing the following objects:<br /><br />[UIAspectRatioConstraint] - `Class.UIAspectRatioConstraint`<br />**HitMarkerImage** - `Class.ImageLabel` that appears and fades when the player successfully hits another player character.</td>
  </tr>
</tbody>
</table>

### LargeTouchscreen

LargeTouchscreen is a `Class.Frame` containing buttons that display on large touchscreens. LargeTouchscreen has the following descendants:

- AimButton (`Class.ImageButton`)
- FireButton (`Class.ImageButton`)

### Scope

Scope is a `Class.Frame` that contains **ScopeImage** (`Class.ImageLabel`) which shows up when zooming on a weapon with HasScope enabled (see [Weapon Structure](#weapon-structure)).

**Scope** has the following descendants:

<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Instance type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>ScopeInstance</td>
    <td>`Class.Frame`</td>
    <td>A `Class.Frame` containing the following assets used when zooming on a weapon with HasScope enabled:<br /><br />[UIAspectRationConstraint] - `Class.UIAspectRatioConstraint`<br />**BottomBlack** - `Class.Frame`<br />**LeftBlack** - `Class.Frame`<br />**RightBlack** - `Class.Frame`<br />**TopBlack** - `Class.Frame`</td>
  </tr>
</tbody>
</table>

### SmallTouchscreen

SmallTouchScreen is a `Class.Frame` containing buttons that display on small touchscreens. SmallTouchscreen has the following descendants:

- AimButton (`Class.ImageButton`)
- FireButton (`Class.ImageButton`)

### Create a directional indicator

Directional indicators are used to show the direction of something around the player's crosshair. For example, if someone shoots you, a red semi-circle can show up around your crosshair in the direction the shot came from. Other examples include indicators to show the direction of footsteps, indirect gunfire, or even environmental objects such as chests.

To create a new indicator, add a new Indicator `Class.Frame` in `WeaponsSystemGui/ScalingElements/DirectionalIndicators` with the following structure:

<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Instance type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>[UIAspectRationConstraint] </td>
    <td>`Class.UIAspectRatioConstraint`</td>
    <td></td>
  </tr>
  <tr>
    <td>[ImageLabel]</td>
    <td>`Class.ImageLabel`</td>
    <td>Image of the directional indicator. Tweaking the rotation of the image in Studio may be required unless you upload the image so that it's facing down and there's little or no blank space around it.<br />This image label must also contain its own <br />`Class.UIAspectRatioConstraint`.</td>
  </tr>
  <tr>
    <td>[Configuration]</td>
    <td>`Class.Configuration`</td>
    <td>Contains optional properties to adjust. See [Indicator Configuration](#indicator-configuration) for more information.</td>
  </tr>
</tbody>
</table>

Once created, you can activate an indicator via the following command inside `WeaponsSystem/Libraries/WeaponsGui` where `indicatorName` is the string name of the indicator to activate and worldPos is the world position where the directional indicator should point:

```lua
self.DirectionalIndicatorGuiManager:ActivateDirectionalIndicator(indicatorName, worldPos)
```

<Alert severity="info">
If an indicator is activated an additional time before it has had time to fade completely, a new indicator of that type will be instantiated. This allows an unlimited number of any type of indicator to be activated at the same time.

You can also activate directional indicators from outside of WeaponsGui by replacing self in the above code with the instance of `WeaponsGui` in your code. However, it's recommended that you activate it from inside `WeaponsGui` and trigger it via a `Class.RemoteEvent` or a `Class.BindableEvent`. For reference, see how `DamageIndicator` is activated within `WeaponsGui`.
</Alert>

#### Indicator configuration

The DirectionalIndicators can be further modified by adjusting the `Class.Configuration` object parented under the `[Indicator]`. All of these settings have a default value, so there is no need to set configurations when not modifying a setting.

The following configurations can be set:

<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Instance type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>DistanceLevelFromCenter</td>
    <td>`Class.NumberValue`</td>
    <td>Number of distance levels from the center of the screen (each distance level is about 0.03 screen scale); default is **6**.</td>
  </tr>
  <tr>
    <td>FadeTime</td>
    <td>`Class.NumberValue`</td>
    <td>Indicator fade time following its activation and the `TimeBeforeFade` time; default is **1**. </td>
  </tr>
  <tr>
    <td>Name</td>
    <td>`Class.StringValue`</td>
    <td>Name of the directional indicator as you want to reference it in code; default is the name of the indicator's top level `Class.Frame`.</td>
  </tr>
  <tr>
    <td>TimeBeforeFade</td>
    <td>`Class.NumberValue`</td>
    <td>Number of seconds that the indicator will appear for before fading; default is **1**.</td>
  </tr>
  <tr>
    <td>TransparencyBeforeFade</td>
    <td>`Class.NumberValue`</td>
    <td>Transparency of the indicator before it starts to fade; default is **0**.</td>
  </tr>
  <tr>
    <td>WidthLevel</td>
    <td>`Class.NumberValue`</td>
    <td>Number of width levels from center (each width level is about 0.03 screen scale); default is the value of **DistanceLevelFromCenter**.</td>
  </tr>
</tbody>
</table>

### Show damage billboard

The damage billboard is used to show little numbers above a character's head when they are damaged. These will only show up for the player that damaged another player's character, not for spectating players.

Damage billboards are handled in `WeaponsSystem/Libraries/DamageBillboardHandler` and can be activated from any client-side code as follows, where damage is the amount of damage done and adornmentPart is the part on which to adorn the billboard, such as the victim's head:

```lua
DamageBillboardHandler:ShowDamageBillboard(damage, adornmentPart)
```

## Shoulder camera

The shoulder camera is a third-person camera that looks over the player character's right shoulder. To customize the shoulder camera, modify the variables under the -- Configuration parameters (constants) comment in the `ShoulderCamera.new()` function of `WeaponsSystem/Libraries/ShoulderCamera`. You can modify things such as field of view, offset from the character, walk speed while [sprinting or zooming](#sprint-and-zoom-control), etc.

## Sprint and zoom control

By default, the weapons system adds "sprint" capability, so players can sprint by holding the <kbd>Shift</kbd> key, pushing fully up on the dynamic thumbstick (mobile), or pushing fully up on the left joystick (gamepad). If you want to disable sprinting, set the value of **SprintEnabled** within **WeaponsSystem**/**Configuration** to **false**.

The system also reduces player speed while they're aiming/zooming, but you can disable this behavior by setting the value of **SlowZoomWalkEnabled** to **false**.

<img src="../assets/resources/weapons-kit/Sprint-Zoom-Configurations.png" width="320" />
