---
title: Localizing with Scripting
description: Explains how to use localization APIs for specialized translation tasks.
---

You can use localization APIs for specialized translation tasks that are not automatically handled by [adding translations](../../production/localization/manual-translations.md) to the localization table. Roblox provides a `Class.LocalizationService` to handle all localization scripting needs. Use the `Class.LocalizationService` for the following tasks:

- [**Localizing images and sounds**.](#localizing-images-and-sounds)
- [**Translating part of individual strings**.](#translating-individual-strings)
- [**Applying translations from multiple languages**.](#switching-languages)

If you use any localization APIs when translating your experience, listen for any changes to the user's LocaleID to [react to users switching their language](#reacting-to-users-switching-languages) while in an experience.

When reusing translation code, you should use a [**TranslationHelper ModuleScript**](#creating-a-translationhelper-module) to handle errors and missing translations.

## Localizing Images and Sounds

Add localization beyond text in your experience by providing unique images and sounds based off of a user's locale. To localize assets, first add the **source** and **target** asset IDs to your experience's [localization table](../../production/localization/manual-translations.md#cloud-localization-table) then use the localization API to fetch the different assets.

<GridContainer numColumns="3">
  <figure>
    <img src="../../assets/localization/Localized-Image-English.png" />
    <figcaption>English (Source) - rbxassetid://2957093606</figcaption>
  </figure>
  <figure>
    <img src="../../assets/localization/Localized-Image-Spanish.png" />
    <figcaption>Spanish (es) - rbxassetid://2957093671</figcaption>
  </figure>
  <figure>
    <img src="../../assets/localization/Localized-Image-Portuguese.png" />
    <figcaption>Portuguese (pt) - rbxassetid://2957093727</figcaption>
  </figure>
</GridContainer>

To start localizing images and sounds, add your [**source** and **target**](../../production/localization/manual-translations.md) asset IDs to your localization table. Asset ID entries on the localization table must include a **Key** as an identifier to be called by the API.

The following is an example entry on a localization table using asset IDs:

<table>
<thead>
  <tr>
    <th>Key</th>
    <th>Source</th>
    <th>es</th>
    <th>pt</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Key_JewelsImage</td>
    <td>2957093606</td>
    <td>2957093671</td>
    <td>2957093727</td>
  </tr>
</tbody>
</table>

The following code will replace the asset ID of an `Class.ImageLabel` with the Spanish asset&nbsp;ID provided in the localization table:

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local LocalizationService = game:GetService("LocalizationService")

-- Local variables
local localizedImageID
local localizedImage = Instance.new("ImageLabel")

-- Load Translator for "es". Wrap the function within a pcall() to protect against failures.
local res, translator = pcall(function()
	return LocalizationService:GetTranslatorForLocaleAsync("es")
end)

if res then
	-- Get asset ID from localization table by referencing the Key
	localizedImageID = translator:FormatByKey("Key_JewelsImage")
	-- Set the image
	localizedImage.Image = "rbxassetid://" .. localizedImageID
else
	print('GetTranslatorForPlayerAsync failed: ' .. translator)
end
```

<Alert severity="warning">
`Class.LocalizationService:GetTranslatorForPlayerAsync()|GetTranslatorForPlayerAsync()` and `Class.LocalizationService:GetTranslatorForLocaleAsync()|GetTranslatorForLocaleAsync()` are asynchronous and may occasionally fail due to poor connectivity or other issues. It is recommended to create a <a href = "#creating-a-translationhelper-module">TranslationHelper ModuleScript</a> to catch errors and provide fallback translation instructions.
</Alert>

## Translating Individual Strings

In some circumstances, you may want to target individual strings for translation. `Class.Translator:Translate()` can fetch individual entries on the localization table based on the source string.

In the next example, the following localization entry is used:

<table>
<thead>
  <tr>
    <th>Source</th>
    <th>es</th>
    <th>es</th>
    <th>pt</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Screen</td>
    <td>Pantalla</td>
    <td>295093671</td>
    <td>2957093727</td>
  </tr>
</tbody>
</table>

The following script will print the Spanish translation of "Screen" to the **Output** window:

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local LocalizationService = game:GetService("LocalizationService")

-- Load Translator for "es". Wrap the function within a pcall() to protect against failures.
local res, translator = pcall(function()
	return LocalizationService:GetTranslatorForLocaleAsync("es")
end)

if res then
	-- Use Translate function, providing object context and string
	local sourceTranslation = translator:Translate(game, "Screen")
	print(sourceTranslation) -- Expected Output: "Pantalla"
else
	print('GetTranslatorForPlayerAsync failed: ' .. translator)
end
```

### Using Context Overrides

There are some cases where the same string may have multiple meanings. For example, the word "Screen" can indicate both a computer screen and a window screen, but the Spanish translations are completely different.

The **Context** column of the localization table is for specifying translations through context overrides. Specify the in-game object on your localization table as in the following example:

<table>
<thead>
  <tr>
    <th>Context</th>
    <th>Source</th>
    <th>es</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>workspace.WindowScreen.SurfaceGui.TextLabel</td>
    <td>Screen</td>
    <td>Mosquitero</td>
  </tr>
  <tr>
    <td></td>
    <td>Screen</td>
    <td>Pantalla</td>
  </tr>
</tbody>
</table>

The following script uses a context override to prioritize a specific translation:

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local LocalizationService = game:GetService("LocalizationService")

-- Load Translator for "es". Wrap the function within a pcall() to protect against failures.
local res, translator = pcall(function()
	return LocalizationService:GetTranslatorForLocaleAsync("es")
end)

if res then
	-- use Translate function, providing object context and string
	local sourceTranslation = translator:Translate( workspace.WindowScreen.SurfaceGui.TextLabel, "Screen")
	print(sourceTranslation) -- Expected Output: Mosquitero
else
	print('GetTranslatorForPlayerAsync failed: ' .. translator)
end
```

#### Multiple Contexts

In the case of multiple contexts, the localization service compares object relationships in the Context field from **right to left**, using the closest match.

For example, a localization table in your experience may have the following shared Source strings entries:

<table>
<thead>
  <tr>
    <th>Context</th>
    <th>Source</th>
    <th>es</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>workspace.WindowScreen.SurfaceGui.TextLabel</td>
    <td>Screen</td>
    <td>Mosquitero</td>
  </tr>
  <tr>
    <td>playerGui.ScreenGui.TextButton</td>
    <td>Screen</td>
    <td>Pantalla</td>
  </tr>
</tbody>
</table>

If the string "Screen" is added to a `playerGui.ScreenGui.TextLabel` object in your experience, the localization service displays "Mosquitero" as the Spanish translation as the closest context match.

### Substituting Parameters

When using parameters to translate [dynamic content](./translating-dynamic-content.md), set the values to a [table](../../luau/tables.md) and pass the table as an argument through the API.

In this example, the experience has a localization table with the following entries:

<table>
<thead>
  <tr>
    <th>Key</th>
    <th>Source</th>
    <th>es</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Key_Prize_1</td>
    <td>&#123;1:int} jewels</td>
    <td>&#123;1:int} joyas</td>
  </tr>
  <tr>
    <td>Key_Prize_2</td>
    <td>$&#123;AmountCash:fixed} cash and &#123;NumJewels:int} jewels</td>
    <td>$&#123;AmountCash:fixed} dinero y &#123;NumJewels:int} joyas</td>
  </tr>
</tbody>
</table>

Use the following code sample to translate these strings with parameter values:

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local LocalizationService = game:GetService("LocalizationService")

-- Load Translator for "es". Wrap the function within a pcall() to protect against failures.
local res, translator = pcall(function()
	return LocalizationService:GetTranslatorForLocaleAsync("es")
end)

if res then
	-- Set the parameter value in "Key_Prize_1" to 100
	local keyTranslation1 = translator:FormatByKey("Key_Prize_1", {100})
	print(keyTranslation1) -- Expected Output: 100 joyas

	-- Set multiple parameters to 500 and 100 by name
	local keyTranslation2 = translator:FormatByKey("Key_Prize_2", {AmountCash=500, NumJewels=100})
	print(keyTranslation2) -- Expected Output: $500.00 dinero y 100 joyas
else
	print('GetTranslatorForPlayerAsync failed: ' .. translator)
end
```

## Switching Languages

In some cases, you may want to display translations of other languages in your experience. You can set a new translator with a different country code using `Class.LocalizationService:GetTranslatorForLocaleAsync()`.

The following code sample sets one translator with a manual country code and an additional translator based off of the user's global locale settings:

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local LocalizationService = game:GetService("LocalizationService")
local Players = game:GetService("Players")

-- Local variables
local player = Players.LocalPlayer

-- Load Translator for "pt". Wrap translator functions within a pcall() to protect against failures.
local res1, translator = pcall(function()
	return LocalizationService:GetTranslatorForLocaleAsync("pt")
end)

-- Load second Translator with Player's locale, in this example "es"
local res2, fallbackTranslator = pcall(function()
	return LocalizationService:GetTranslatorForPlayerAsync(player)
end)

-- Use Translate function with first Translator
if res1 then
	local translate1 = translator:Translate(game, "jewels")
	print(translate1) -- Expected Output in pt: joyas
else
	print('GetTranslatorForPlayerAsync failed: ' .. translator)
end

-- Use Translate function with second Translator
if res2 then
	local translate2 = fallbackTranslator:Translate(game, "jewels")
	print(translate2) -- Expected Output in if user is set to 'es': jóias
else
	print('GetTranslatorForPlayerAsync failed: ' .. fallbackTranslator)
end
```

## Reacting to Users Switching Languages

Users can change their language settings at any time using their in-experience Settings menu. This user setting change automatically updates non-scripting localization assets, such as strings handled by [automatic translation](../../production/localization/automatic-translations.md), but may not update scripted localization changes that have already rendered, such as GUI images or sounds.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/localization/In-Experience-Language-Switcher.png" />
    <figcaption>In-Experience Language Setting</figcaption>
  </figure>
  <figure>
    <img src="../../assets/localization/In-Experience-Language-Switcher-Modal.png" />
    <figcaption>Users can choose available languages set in the experience</figcaption>
  </figure>
</GridContainer>

To ensure that your scripted localized assets update correctly, listen to the `Class.Instance.GetPropertyChangedSignal|GetPropertyChangedSignal` event for changes in the LocaleID property of the `Class.Translator` instance returned by `Class.LocalizationService.GetTranslatorForPlayerAsync`. When using `Class.LocalizationService.GetTranslatorForPlayerAsync`, wrap the function within a `Global.LuaGlobals.pcall()` in case of errors.

The following code sample prints the Locale ID of the user and the Locale ID of the Translator instance for the user when the user switches languages:

```lua
local LocalizationService = game:GetService("LocalizationService")
local Players = game:GetService("Players")
local player = Players.LocalPlayer

-- If GetTranslatorForPlayerAsync succeeds, it will return a Translator for player's current locale
local res, translator = pcall(function()
	return LocalizationService:GetTranslatorForPlayerAsync(player)
end)

-- Function that gets called when change in player's locale ID is detected
local function OnLocaleIdChanged()
	print("Translator has changed to: " .. translator.LocaleId)
	-- You should re-translate any assets translated with Localization APIs to the player's new language here
end

-- Check if GetTranslatorForPlayerAsync succeeded
if res then
	-- If succeeded, translate assets here using translator
	-- Listen for a change in player's locale ID
	translator:GetPropertyChangedSignal("LocaleId"):Connect(OnLocaleIdChanged)
else
	print('GetTranslatorForPlayerAsync failed: ' .. translator)
end
```

## Creating a TranslationHelper Module

When you load translators based on the player's default locale, you might reuse code. To reuse code, set up a helper `Class.ModuleScript` that safely loads translators based on the player's default locale and includes functions for providing specific translations and switching languages.

The following code sample implements a TranslationHelper which you can copy into your own project as a `Class.ModuleScript` in `Class.ReplicatedStorage`:

```lua
local TranslationHelper = {}

local LocalizationService = game:GetService("LocalizationService")
local Players = game:GetService("Players")

-- Local variables
local player = Players.LocalPlayer
local sourceLanguageCode = "en"

-- Get translators
local playerTranslator, fallbackTranslator
local foundPlayerTranslator = pcall(function()
	playerTranslator = LocalizationService:GetTranslatorForPlayerAsync(player)
end)
local foundFallbackTranslator = pcall(function()
	fallbackTranslator = LocalizationService:GetTranslatorForLocaleAsync(sourceLanguageCode)
end)

-- Create a method TranslationHelper.setLanguage to load a new translation for the TranslationHelper
function TranslationHelper.setLanguage(newLanguageCode)
	if sourceLanguageCode ~= newLanguageCode then
		local success, newPlayerTranslator = pcall(function()
			return LocalizationService:GetTranslatorForLocaleAsync(newLanguageCode)
		end)

		--Only override current playerTranslator if the new one is valid (fallbackTranslator remains as experience's source language)
		if success and newPlayerTranslator then
			playerTranslator = newPlayerTranslator
			return true
		end
	end
	return false
end

-- Create a Translate function that uses a fallback translator if the first fails to load or return successfully. You can also set the referenced object to default to the generic game object

function TranslationHelper.translate(text, object)
	if not object then
		object = game
	end
	if foundPlayerTranslator then
		return playerTranslator:Translate(object, text)
	end
	if foundFallbackTranslator then
		return fallbackTranslator:Translate(object, text)
	end
	return false
end

-- Create a FormatByKey() function that uses a fallback translator if the first fails to load or return successfully

function TranslationHelper.translateByKey(key, arguments)
	local translation = ""
	local foundTranslation = false

	-- First tries to translate for the player's language (if a translator was found)
	if foundPlayerTranslator then
		foundTranslation = pcall(function()
			translation = playerTranslator:FormatByKey(key, arguments)
		end)
	end
	if foundFallbackTranslator and not foundTranslation then
		foundTranslation = pcall(function()
			translation = fallbackTranslator:FormatByKey(key, arguments)
		end)
	end
	if foundTranslation then
		return translation
	else
		return false
	end
end

return TranslationHelper
```

<Alert severity="info">
If your experience's source language is not English, change the value of the  <InlineCode>sourceLanguageCode</InlineCode> variable to the country code of the experience's source language.
</Alert>

Once the module is in `Class.ReplicatedStorage`, require it from a `Class.LocalScript` to call the module's functions. The following code uses this module's helper function to translate an individual string:

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Require translation module
local TranslationHelper = require(ReplicatedStorage:WaitForChild("TranslationHelper"))

-- Use the functions provided in TranslationHelper
TranslationHelper.setLanguage("es")
local sourceTranslation = TranslationHelper.translate("Screen")
print(sourceTranslation) -- Expected Output in 'es': "Pantalla"
```
