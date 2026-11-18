---
title: How Lua became Luau
description: Roblox chose Lua because it was small, fast, and easy to learn. Twenty years later, keeping it that way has become a surprisingly complicated engineering job.
template: editorial
hideBreadcrumbs: true
contentsTitle: In this article
figureSize: compact
lede: "You're building a disco-themed obby in Studio. You've lined up floating platforms over a pit of lava, scattered a few spinning mirror balls along the way, and saved the best part for the finish line: a dance floor. Every tile should change color when someone steps on it."
cover:
  src: ../../assets/resources/luau/cover-collage.jpg
  alt: A collage of snapshots on a disco dance floor, including Roblox Studio and flag stands from 2007, Dave Baszucki at a 2007 job fair, the 2019 Roblox homepage, key art for Remedy's Alan Wake 2, two Luau code snippets from the article, and Hina, the Luau mascot.
  subtitle: Roblox chose Lua because it was small, fast, and easy to learn. Twenty years later, keeping it that way has become a surprisingly complicated engineering job.
  ctas:
    - label: Try Luau
      href: https://play.luau.org/
      tone: primary
    - label: View on GitHub
      href: https://github.com/luau-lang/luau
      tone: secondary
---

![An animated disco dance floor under a spinning mirror ball. Tiles light up in new colors as they're touched, while colored light beams sweep across the floor.](../../assets/resources/luau/opening-dance-floor.mp4 'Every tile on the dance floor runs the same four lines of code.')

You start with one tile and four lines of code:

```lua
local tile = script.Parent
tile.Touched:Connect(function()
    tile.BrickColor = BrickColor.random()
end)
```

You hit **Play**, make it across the lava, and hop onto the tile. It turns blue. You hop off and land again, and this time it's yellow. Then pink. There isn't much of a game here yet, but it's surprisingly satisfying to watch something happen just because you told it to.

You haven't declared what kind of value `tile` is, managed any memory, or given much thought to how the script actually runs — you've been too busy trying not to fall into lava. Roblox, meanwhile, has to worry about all of those things while the rest of the game carries on, whether the code belongs to a beginner's dance floor or a sprawling experience built by a professional team.

The language doing the work is Luau, Roblox's descendant of Lua. What began as a way to give behavior to a world of parts, the blocks creators build with, now runs everything from gameplay to user interfaces. It also helps power Roblox's own app and Studio tools, and has even found its way into games made by other studios, including _Alan Wake 2_ and, more recently, _Control Resonant_. The language has become considerably more sophisticated over the years, even if writing those first four lines hasn't gotten any harder.

## Why Roblox picked Lua

<ChapterHero
  id="small-language"
  navLabel="Why Lua"
  description="Roblox needed a way for creators to write their own game rules, and a small language from Brazil fit the job."
/>

Lua began in Rio de Janeiro in 1993, when three researchers at a computer graphics group — Roberto Ierusalimschy, Luiz Henrique de Figueiredo, and Waldemar Celes — needed a programming language they could put inside other programs. They called it Lua, Portuguese for moon.

It was designed to be a good guest. Lua supplied the language, while the program hosting it supplied the interesting things to work with. Put it inside a game engine, for example, and scripts could interact with characters, sounds, and physics without having to run the engine themselves. By the early 2000s, game developers had found plenty of uses for something that was small, fast, and relatively easy to learn.

Roblox had a particularly good reason to be interested. Its early worlds were made of parts and physics: you could build a tower and knock it down or put together a car and see whether it survived the trip downhill. However, physics wasn't enough to make every kind of game.

![Dave Baszucki stands beside a Roblox booth at a Stanford job fair, next to a poster that reads "We're looking for great software developers."](../../assets/resources/luau/stanford-job-fair-2007.jpg 'Roblox co-founder and CEO Dave Baszucki recruiting at a Stanford startup job fair in March 2007.')

Take Capture the Flag, where somebody has to notice when a player picks up the flag, award points, and put the flag back. Roblox initially supplied that behavior as an engine feature, a class called `FlagStand`, which worked perfectly well for Capture the Flag but wasn't going to help much with a pet simulator, a shop, or a game whose entire premise involved turning people into bananas.

![Four flag stands in red, blue, yellow, and green, each holding a flag with the Roblox logo.](../../assets/resources/luau/flag-stands-2007.png (Flag stands from Roblox's Capture the Flag release in June 2007, which let creators build a CTF game with "no scripting required."))

Around 2006, Roblox adopted Lua 5.1, giving creators a way to invent their own rules instead of waiting for the engine team to build them. If somebody wanted to make a game about bananas, they could go right ahead.

![Roblox Studio in February 2007, with a player standing at a door in the game view and the Output window repeatedly printing "Human touched door" from a creator's script.](../../assets/resources/luau/studio-door-script-2007.png (Roblox Studio in February 2007, from a scripting tutorial on the Roblox blog. A creator's script prints "Human touched door" each time a player touches it.))

## Rebuilding how scripts run

<ChapterHero
  id="new-engine"
  navLabel="How scripts run"
  description="Bigger, more ambitious games meant scripts were taking up more of each frame. In 2019, Roblox replaced the code that runs them and tried not to break a single one along the way."
/>

Creators made good use of that freedom, and as Roblox experiences grew into games with elaborate inventories, economies, and all sorts of systems running behind the scenes, the old Lua interpreter found itself with considerably more work to do. Roblox's engineers had been speeding up other parts of the engine, too, which meant the time spent running scripts was becoming increasingly difficult to ignore.

![Four in-game views of the Bloxy Theater, packed with avatars seated at round tables, with a golden Bloxy statue on the stage.](../../assets/resources/luau/bloxy-awards-2019.jpg "Players packed into the Bloxy Theater for Roblox's 6th annual Bloxy Awards in 2019.")

In June 2019, Arseny Kapoulkine, an engineer who helped lead the development of Luau, announced that Roblox was testing a faster implementation of Lua. The team had considered several options and eventually decided to build a new one because, he wrote, "we're crazy."

There were alternatives, including LuaJIT, an exceptionally fast implementation of Lua, but adopting any of them wasn't as simple as swapping out a component and calling it a day. Roblox had made its own changes to Lua 5.1, such as tighter security and an expanded global environment. It also needed to support a wide range of devices and wanted enough control over the implementation to keep improving it. Moving to a newer version of ordinary Lua wasn't an easy way out, either — Roblox already had years of scripts written against Lua 5.1, and newer versions didn't always behave the same way.

Arseny started with a prototype of a new compiler and interpreter, borrowing ideas from other fast language runtimes and experimenting with a few approaches suited to Lua itself. It understood only a small subset of the language, but on the code it could run, it was considerably faster than Roblox's existing implementation. The encouraging part was that the idea seemed to work. The less encouraging part was that the team now had to support the rest of Lua, reproduce years of obscure behavior, and deploy the replacement across a live platform — a task Arseny described as "daunting, but more or less 'just' engineering."

> "Daunting, but more or less 'just' engineering."
>
> Arseny Kapoulkine

Rather than rebuild the entire runtime at once, the team concentrated on the parts responsible for turning scripts into instructions and carrying them out: the compiler, bytecode format, and interpreter. Much of the existing machinery, including the libraries and garbage collector, stayed where it was for the time being. There would be plenty of opportunities to improve those later, assuming they could first get the new implementation to run everyone's code without breaking anything.

![A script passes through the compiler into bytecode and then to the runtime on the player's device. The type checker sits beside the script in Studio, and the garbage collector runs in the background.](../../assets/resources/luau/life-of-a-script.svg "The path a script takes from Studio to the player's device. The type checker helps while you edit but never changes how the script runs.")

And that was the difficult part. Lua's flexibility was one of the reasons Roblox had chosen it in the first place, but it also meant developers could write perfectly valid code that made certain optimizations surprisingly awkward.

### Fastcall

One of Arseny's favorite examples is _fastcall_, an optimization for calling familiar functions like `math.sqrt`. You might think calculating a square root would be a straightforward thing to make faster, except Lua lets scripts replace built-in functions with their own versions, so `math.sqrt` doesn't necessarily mean what its name suggests. Luau gets around this by checking whether the function is still the original one before taking a faster route through the interpreter. If somebody has replaced it, the call runs normally instead, preserving behavior that developers might already depend on.

![A math.sqrt call reaches a check that asks whether math.sqrt is still the original. If yes, it takes the fast path; if no, it makes an ordinary call.](../../assets/resources/luau/fastcall.svg "Same result either way. The shortcut only applies when it can't change what the script means.")

<h4>Try it: compare the bytecode</h4>

Here's what that shortcut looks like from the compiler's side. The two functions below both calculate the distance between two points. One finds the square root with `math.sqrt`, and the other uses `customSqrt`, a function that gets the same answer a different way. Both print the same number, but they don't compile to the same instructions.

Luau marks the shortcut with a special instruction called `FASTCALL`, which tells the interpreter it may be able to skip the usual function-call work.

Both functions print `5`. Compare their bytecode. Which one uses `FASTCALL`, and why can't Luau take the same shortcut for `customSqrt`?

<LuauPlayground title="Compare math.sqrt with a custom square root" bytecode>

```lua
local function customSqrt(n: number): number
    return n ^ 0.5
end

local function builtinDistance(x: number, y: number): number
    return math.sqrt(x * x + y * y)
end

local function customDistance(x: number, y: number): number
    return customSqrt(x * x + y * y)
end

print(builtinDistance(3, 4))
print(customDistance(3, 4))
```

</LuauPlayground>

Somewhere along the way, the project also acquired a name. Luau began as an internal codename suggested by engineer Andy Friesen's wife, who apparently has a gift for word games. He remembers Luau as her slightly silly take on "Lua, but a bit extra," which turned out to be just about right for a language that was still recognizably Lua but was gradually becoming something of its own. The team also liked that the name didn't tie the project permanently to Roblox, and by the time they needed to settle on something official, everyone had already gotten used to calling it Luau. At RDC 2019, Arseny joked that the story behind the name was "complicated."

### The rollout

The rollout, on the other hand, really was complicated.

Roblox couldn't run the old and new virtual machines side by side in the same process, and switching off the new one wouldn't do anything for servers that were already running it. A full rollback could mean a grid reset, disconnecting players across the platform, while testing every creator's script beforehand wasn't realistic either. Scripts often depended on the experiences around them, and Roblox was understandably reluctant to inspect creators' unpublished code without their permission.

During the first rollout, an extraordinarily long chain of method calls exposed a limit nobody on the team had anticipated. Arseny remembers a script, possibly generated by a custom animation editor, that stored something like a thousand keyframes in one enormous expression. It was essentially `animation:AddKeyframe(...)` repeated over and over, with each call feeding into the next until the whole thing became a single, very long line of code.

There was nothing particularly unusual about any individual call, but the new compiler was reserving a temporary register for each one, and the virtual machine had a limit of 256 registers. Eventually, the compiler ran out of room, leaving the script unable to compile and the animations depending on it unable to work.

![A chain of animation:AddKeyframe calls feeding into a 16-by-16 grid of 256 registers that fills up one register per call, with the last row in red.](../../assets/resources/luau/rollout-register-limit.svg 'Each call in the chain reserved another temporary register until the compiler ran out at 256.')

Nobody had promised support for a thousand chained method calls, but developers don't write software according only to what the documentation promises. They write against what actually works, and sometimes what works is a thousand method calls strung together in a way nobody thought to test.

The team fixed the compiler and tried again. Other edge cases would surface as developers explored the new implementation's boundaries, but on August 28, 2019, the new Luau virtual machine was live across Roblox's client and server platforms, with the overwhelming majority of existing scripts continuing to work as they always had.

For all the effort involved in replacing the machinery behind every Roblox script, Arseny later recalled that most creators barely noticed the transition. Roblox co-founder Dave Baszucki called it "the ultimate kind of touchless feature."

> "Luau, like Lua before it, is a relatively simple, imperative, dynamically typed programming language."
>
> Andy Friesen

## Teaching Studio to spot mistakes

<ChapterHero
  id="type-checker"
  navLabel="Spotting mistakes"
  description="Luau's type checker can catch some bugs while you're still writing code. The hard part was learning when not to warn."
/>

Making scripts faster was one problem. Helping developers figure out what was wrong with their code was another.

As Roblox's biggest games grew from hobby projects into productions maintained by teams of full-time developers, both those games and Roblox's own app were getting harder to maintain. "We all had a problem with bugs that should have been easy to spot before they reached customers," says Andy ([@fun_enthusiast](https://www.roblox.com/users/671461758/profile)), who joined Roblox in 2018. Lua's flexibility had made it wonderfully easy to get started, but the script editor wasn't always much help once a project got complicated — autocomplete could be unreliable, and developers often had to work out for themselves what kind of value a variable was supposed to contain.

A type checker could help with that. If you accidentally typed `scroe` instead of `score`, for example, Studio could point out the mistake while you were editing instead of leaving you to discover it when the game ran. Better still, it could often work out what kind of value you were dealing with without asking you to declare a type first, which meant beginners could continue writing ordinary Lua-style scripts while developers maintaining larger projects could opt into stricter checks.

> "We all had a problem with bugs that should have been easy to spot before they reached customers."
>
> Andy Friesen

<h4>Try it: find the bug</h4>

Here's a bug you can try to track down yourself. A dancer starts with 10 points and earns a 5-point bonus with a multiplier of 2, so they should finish with 20. Run the script, work out where the problem is, and then take a look at what the type checker has to say.

The dancer should finish with 20 points. Is the problem in the scoring, the multiplier, or the line that prints the result? Before you fix it, delete the `-⁠-!strict` line at the top and run the script again to see what the type checker says without strict mode. Then put the line back, find the bug, and fix it.

<LuauPlayground title="Find the bug in the Disco King score" mode="nonstrict" solver="new">

```lua
--!strict

local dancer = {
    name = "Disco King",
    points = 10,
    multiplier = 2,
}

local function awardPoints(bonus: number)
    dancer.points += bonus * dancer.multiplier
end

awardPoints(5)

print(`{dancer.name}: {dancer.poins} points`)
```

</LuauPlayground>

An ordinary table returns `nil` when you try to read a field that doesn't exist, so the script doesn't crash — it just gives you the wrong answer. The checker, meanwhile, can see that `dancer` has a `points` field and no `poins` field, even though you haven't told it what type of value `dancer` is supposed to be.

Catching a typo like that is relatively easy. Knowing when not to warn somebody turned out to be a much harder problem.

Say a script looks up a player's score, which might be a number or might be `nil` if the player hasn't earned anything yet. The script checks whether the score exists before doing any arithmetic, so a person reading the code can see that the dangerous case has already been handled. A type checker that can't follow the program's logic closely enough, however, might still insist that the score could be missing, leaving the developer staring at a warning for a problem they've already fixed.

According to Andy, Luau's original type solver had been built around a largely top-down, single-pass design that worked reasonably well for simpler cases but became increasingly difficult to extend as developers asked it to understand more complicated code. The limitations affected autocomplete, too, because if the checker couldn't work out what a variable was at a particular point in a script, Studio couldn't reliably suggest its properties or methods. Andy remembers repeatedly trying to improve inference for common Lua object-oriented patterns without forcing developers to add casts or annotations, only to find that the results weren't accurate or reliable enough.

### The New Type Solver

Eventually, the team decided to rebuild the solver rather than continue working around its limitations. The new approach could follow how a script narrowed down the possible types of a value, a process called _type refinement_, so something that might have been `nil` earlier wouldn't necessarily remain uncertain after an `if` check or a default assignment. The difference might not sound especially dramatic, but to a developer trying to understand why Studio keeps underlining perfectly valid code, it matters quite a lot.

<h4>Try it: follow the missing score</h4>

Here's an example. A function calculates a dancer's final score, but their existing score might be missing, and a combo multiplier can increase it before a 5-point finishing bonus. The script supplies a default value first, and Luau follows that change: by the time any arithmetic happens, the score is a number.

Remove `score = score or 0`. Which lines does the checker flag? Then try handling the missing score with `if score == nil then score = 0 end`, or move the default into the `return` line instead.

<LuauPlayground title="Follow a score that might be missing" mode="strict" solver="new">

```lua
--!strict

local function finalScore(score: number?, combo: number): number
    score = score or 0

    if combo > 1 then
        score *= combo
    end

    return score + 5
end

print(finalScore(nil, 3))
print(finalScore(10, 2))
```

</LuauPlayground>

The team also had to decide how demanding the checker should be. Hunter Goldstein ([@MercuryBromine0](https://www.roblox.com/users/7329002687/profile)), an engineer on the type-system team, describes nonstrict as focusing on errors the checker can determine will happen at runtime, while strict makes a more ambitious promise: "types don't lie." That can mean rejecting code that might run successfully if the checker can't prove it's safe, which is a reasonable tradeoff for a developer who wants stronger guarantees but potentially frustrating for somebody who's only just figured out how to make a block change color.

> "Types don't lie."
>
> Hunter Goldstein

In November 2025, the New Type Solver reached general release, becoming the default for scripts using nocheck and nonstrict modes, while strict-mode projects could opt in at that point.

## Luau outside Roblox

<ChapterHero
  id="beyond-roblox"
  navLabel="Outside Roblox"
  description="After Roblox made Luau open source, other studios started using it in their own games."
/>

Luau wasn't initially built with other game studios in mind. Arseny simply wanted to avoid the way Roblox's modified version of Lua had become tangled with the rest of the engine, to the point where even building the language on its own meant dragging in Roblox code that had nothing to do with it. When he started work on Luau, he made a point of keeping the language separate, mostly because it made the project easier to develop and maintain.

That decision turned out to have an unexpected benefit. As the team added features such as `continue` and a type system, Arseny began to think it would be a shame if nobody outside Roblox could use the result. In November 2021, Luau became [open source](https://github.com/luau-lang/luau) under the MIT License, giving other developers the chance to put it inside their own software.

![Hina, a blue cartoon Hawaiian monk seal.](../../assets/resources/luau/hina.png 'Hina, a Hawaiian monk seal and the official mascot of the Luau language.')

<h4>Try it: skip the broken tiles</h4>

Some of Luau's additions are easier to appreciate than others. Take `continue`, which lets a script skip the rest of one pass through a loop and move on to the next. In the example below, a dancer earns points from each tile they step on, but broken tiles don't count.

The dancer finishes with 25 points. Repair the pink tile by setting `broken` to `false`, add a tile of your own, or change the condition so it skips tiles worth fewer than 10 points instead.

<LuauPlayground title="Skip the broken tiles">

```lua
local tiles = {
    { name = "Blue", broken = false, points = 5 },
    { name = "Pink", broken = true, points = 10 },
    { name = "Gold", broken = false, points = 20 },
}

local score = 0

for _, tile in ipairs(tiles) do
    if tile.broken then
        continue
    end

    score += tile.points
    print(`Stepped on {tile.name}: {score} points`)
end
```

</LuauPlayground>

### Other studios

Remedy Entertainment found a use for Luau in _Alan Wake 2_, replacing a proprietary scripting language in its Northlight engine with Luau so that gameplay and visual-effects teams could experiment without having to ask an engine programmer to implement every change. One example was a weather system that could be adjusted through a debug panel, letting artists and designers play around with the atmosphere of a scene without touching the underlying engine. Remedy said the move also allowed it to retire roughly 80,000 lines of code it no longer needed to maintain.

<GridContainer numColumns="2">

![Alan Wake 2 key art: the writer Alan Wake's face looms over a red-lit forest, where FBI agent Saga Anderson stands holding a flashlight.](../../assets/resources/luau/alan-wake-2.jpg)

![Control Resonant key art: a man in a worn coat swings a large hammer over a red, ruined city skyline.](../../assets/resources/luau/control-resonant.jpg)

</GridContainer>

Linden Lab had a different problem: Second Life needed a runtime for user-written scripts that could be safely sandboxed, paused, and moved between servers, and after considering other options, its developers chose Luau as the foundation for their SLua work.

The relationship has started working in both directions, too. According to Andy, a developer at Remedy contributed a few small language features while working on _Alan Wake 2_, meaning some of the decisions shaping Luau now come from people making games outside Roblox.

Back in Studio, the first tile on your disco floor has turned pink. There are more tiles to wire up, a score counter to finish, and a pretty good chance somebody will find a way to jump over all the platforms you've just spent the afternoon arranging.

You open the script editor again.
