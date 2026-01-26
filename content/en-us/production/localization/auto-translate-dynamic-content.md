---
title: Automatically translate dynamic content
description: Explain how to generate translations in real time for dynamic content.
---

<Alert severity = 'warning'>
The following feature is currently in early development and is subject to change. For the latest updates and changes, see the [announcement](https://devforum.roblox.com/t/introducing-the-real-time-translation-api/3550206).
</Alert>

The standard translation workflow detects strings in your experience based on how frequently they're viewed by players and adds them to your localization table for translation. It might miss uncommon strings and/or strings generated during gameplay, such as dynamically generated text or text created by players. You can use the translate text API to generate translations for these strings in real time, ensuring that your experience is fully localized.

## Translate text into a player's language

To translate text into a player's language, pass their `Class.Player.LocaleId` as the target language code. Below is an example of how you can get the player's locale ID in a client script and then pass it to a `Class.Script` in `Class.ServerScriptService` to make the translation request.

- The translation API is an [Open Cloud API](../../cloud/index.md), meaning you need a [path](../../cloud/reference/patterns.md) to make a request. In this case, you need the universe ID, which can be found in the overflow menu of the experience tile on the [Creator Hub](https://create.roblox.com/dashboard/creations).
- You must also include the [Open Cloud client package](../../production/promotion/experience-notifications.md#include-the-package) in your experience; the server script requires it.

```lua title="Client script"
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local httpRequestFunction = ReplicatedStorage:WaitForChild("TranslateTextFunction")

-- Text to translate
local textToTranslate = "This is the example text to translate"

-- Get the player's locale
local Players = game:GetService("Players")
local player = Players.LocalPlayer

-- get the locale ID for the local player's locale or set to any supported locale string
local locale = player.LocaleId

local translatedText = httpRequestFunction:InvokeServer(textToTranslate, locale)

print("Translated text: ", translatedText)
```

```lua title="Server script in ServerScriptService"
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerScriptService = game:GetService("ServerScriptService")
local oc = require(ServerScriptService.OpenCloud.V2)

-- Find at https://create.roblox.com/dashboard/creations in the overflow menu of an experience tile
local universeID = <your_universe_id>

-- Create RemoteFunction
local remoteFunction = Instance.new("RemoteFunction")
remoteFunction.Name = "TranslateTextFunction"
remoteFunction.Parent = ReplicatedStorage

remoteFunction.OnServerInvoke = function(player, text, locale, uni)

    print(player.Name .. " requested translation for text: " .. text .. " to locale: " .. locale)

    -- Prepare the translation request

    local request : oc.TranslateTextRequest = {
        path = oc:UniversePath(universeID),
        text = text,
	      -- target language codes supports a list of multiple locales to translate to.
	      -- Here we are passing just one language:
        --The player locale retrieved in the local script
        target_language_codes = {locale}
    }

    local result = oc:TranslateText(request)

    if result.Error == nil then
        return result.Response.translations[locale] -- Assuming translations[locale] contains the translated text
    else
        return "Error: " .. result.Error.message
    end
end
```

## Testing

The real-time translation API currently only supports RCC authentication. As a result, you must deploy your code to a test instance in order to test the API from Studio. Use [collaborative testing](../../studio/testing-modes.md#collaborative-testing) to deploy the script to a test instance and test your changes.

## Translation API reference

### API request parameters

<table>
<thead>
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>path</td>
    <td>string</td>
    <td>The path of the universe. Required.</td>
  </tr>
  <tr>
    <td>text</td>
    <td>string</td>
    <td>The text to be translated. Required.</td>
  </tr>
  <tr>
    <td>source_language_code</td>
    <td>string</td>
    <td>The IETF BCP-47 language code representing the language of the input text. If not provided, the system will automatically detect the source language.</td>
  </tr>
  <tr>
    <td>target_language_codes</td>
    <td>`Array<string>`</td>
    <td>A list of target language codes in IETF BCP-47 format for translation.</td>
  </tr>
</tbody>
</table>

### API response fields

<table>
<thead>
  <tr>
    <th>Field Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>source_language_code</td>
    <td>string</td>
    <td>The IETF BCP-47 language code representing the detected or user-specified language of the source text.</td>
  </tr>
  <tr>
    <td>translations</td>
    <td>`Dictionary<string, string>`</td>
    <td>A map containing the requested translations. The key is the IETF BCP-47 language code, and the value is the translated text for that language. The map will contain all requested translations. If the source text was filtered, this map will be empty. </td>
  </tr>
</tbody>
</table>

## Limits

Roblox uses the following formula to throttle requests for this API based on the number of players in your experience:

`max requests per minute per experience = 600 + (1.5 * number_of_concurrent_users)`

There is also a combined limit of 150 requests per minute, per experience server for all Open Cloud APIs.

## Supported languages

The real-time translation API currently supports the following languages, which differ slightly from [supported languages for automatic translation](../../production/localization/automatic-translations.md#supported-languages).

<table>
<thead>
  <tr>
    <th>Language</th>
    <th>Language Code</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Chinese (Simplified)</td>
    <td>zh-cn</td>
  </tr>
  <tr>
    <td>Chinese (Traditional)</td>
    <td>zh-tw</td>
  </tr>
  <tr>
    <td>English</td>
    <td>en-us</td>
  </tr>
  <tr>
    <td>French</td>
    <td>fr-fr</td>
  </tr>
  <tr>
    <td>German</td>
    <td>de-de</td>
  </tr>
  <tr>
    <td>Indonesian</td>
    <td>id-id</td>
  </tr>
  <tr>
    <td>Italian</td>
    <td>it-it</td>
  </tr>
  <tr>
    <td>Japanese</td>
    <td>ja-jp</td>
  </tr>
  <tr>
    <td>Korean</td>
    <td>ko-kr</td>
  </tr>
  <tr>
    <td>Polish</td>
    <td>pl-pl</td>
  </tr>
  <tr>
    <td>Portuguese</td>
    <td>pt-br</td>
  </tr>
  <tr>
    <td>Russian</td>
    <td>ru-ru</td>
  </tr>
  <tr>
    <td>Spanish</td>
    <td>es-es</td>
  </tr>
  <tr>
    <td>Thai</td>
    <td>th-th</td>
  </tr>
  <tr>
    <td>Turkish</td>
    <td>tr-tr</td>
  </tr>
  <tr>
    <td>Vietnamese</td>
    <td>vi-vn</td>
  </tr>
</tbody>
</table>
