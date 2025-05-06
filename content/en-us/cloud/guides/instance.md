---
title: Engine instances
description: Explains how to use Open Cloud APIs to access the Roblox Engine Instances.
---

The Engine Open Cloud APIs let you manage `Class.Instance` objects in your Roblox experiences from the web.

## Beta restrictions

These APIs are currently in beta and have the following restrictions:

- You can only read and update `Class.Script`, `Class.LocalScript`, and
  `Class.ModuleScript` objects.

- You can't update scripts that are currently open in Roblox Studio.

- You can't update scripts that are part of a [package](../../projects/assets/packages.md).

- You can only use API key authentication. Create an
  [API key](../auth/api-keys.md) with **universe-place-instances** added as an API system.

  You must specify the experiences you want the key to have access to as well as the desired read and write permission scopes.

  ![The Creator Hub API key screen](../../assets/open-cloud/instance-api.png)

- You must have a [collaborative](../../projects/collaboration.md) session enabled for the experience that you want to access.

- Request bodies, such as to [Update Instance](/cloud/reference/Instance#Cloud_UpdateInstance), are limited to 200 KB.

## List children

List all children of a specific instance by specifying an instance ID and
calling the [List Instance Children](/cloud/reference/Instance#Cloud_ListInstanceChildren)
method.

<Alert severity="info">
The first time you use these methods, specify `root` for the instance ID. After
you receive the list of top-level children and their IDs, you can make
additional calls to find instances deeper within your place's instance
hierarchy.
</Alert>

<Tabs>
  <TabItem key = "1" label="Python">

```python
import requests

# Generate at https://create.roblox.com/dashboard/credentials
apiKey = "<API_KEY>"
# Find at https://create.roblox.com/dashboard/creations in the overflow menu of an experience tile
universeId = "<UNIVERSE_ID>"
# Find Start Place ID at https://create.roblox.com/dashboard/creations in the overflow menu of an experience tile
placeId = "<PLACE_ID>"
# The default ID for the root of any place's data model
instanceId = "root"

# Request header
apiKeyHeaderKey = "x-api-key"
# Endpoint URL for List Children method
listChildrenUrl = "https://apis.roblox.com/cloud/v2/universes/%s/places/%s/instances/%s:listChildren"

def ListChildren():
  url = listChildrenUrl % (universeId, placeId, instanceId)
  headerData = {apiKeyHeaderKey: apiKey}
  results = requests.get(url, headers = headerData)
  return results

response = ListChildren()
print("Operation Results:", response.status_code, response.text)

# Parse the Operation object's path to later obtain the Instance resource. See the Polling for Results section for more information.
operationPath = response.json()['path']
```

  </TabItem>
  <TabItem key = "2" label="cURL">

```bash
curl --include --location --request GET "https://apis.roblox.com/cloud/v2/universes/<universeId>/places/<placeId>/instances/<instanceId>:listChildren" --header "x-api-key: <api-key>"
```

  </TabItem>
</Tabs>

Rather than just listing the children, the response includes an `Operation`
object with a different endpoint. [Poll this endpoint](#poll-for-results) to
asynchronously retrieve the actual list of children. A more complete code sample
looks like this:

```python
import requests
import time

apiKey = "<API_KEY>"
universeId = "<UNIVERSE_ID>"
placeId = "<PLACE_ID>"
instanceId = "root"

apiKeyHeaderKey = "x-api-key"

listChildrenUrl = "https://apis.roblox.com/cloud/v2/universes/%s/places/%s/instances/%s:listChildren"
getOperationUrl = "https://apis.roblox.com/cloud/v2/%s"

numberOfRetries = 10
retryPollingCadence = 5

doneJSONKey = "done"

def ListChildren():
  url = listChildrenUrl % (universeId, placeId, instanceId)
  headerData = {apiKeyHeaderKey: apiKey}
  results = requests.get(url, headers = headerData)
  return results

def GetOperation(operationPath):
  url = getOperationUrl % (operationPath)
  headerData = {apiKeyHeaderKey: apiKey}
  results = requests.get(url, headers = headerData)
  return results

def PollForResults(operationPath):
  currentRetries = 0
  while (currentRetries < numberOfRetries):
    time.sleep(retryPollingCadence)
    results = GetOperation(operationPath)
    currentRetries += 1

    if (results.status_code != 200 or results.json()[doneJSONKey]):
      return results

response = ListChildren()
print("Operation Results:", response.status_code, response.text)
# Parse the Operation object's path to use in polling for the instance resource.
operationPath = response.json()['path']
response = PollForResults(operationPath)
print("Response:", response.status_code, response.text)
```

The final response might look something like this:

```json
{
  "path": "universes/1234567890/places/98765432109/instances/root/operations/a1a2a3a4-a1a2-a1a2-a1a2-a1a2a3a4a5a6",
  "done": true,
  "response": {
    "@type": "type.googleapis.com/roblox.open_cloud.cloud.v2.ListInstanceChildrenResponse",
    "instances": [
      {
        "path": "universes/1234567890/places/98765432109/instances/b1b2b3b4-b1b2-b1b2-b1b2-b1b2b3b4b5b6",
        "hasChildren": true,
        "engineInstance": {
          "Id": "b1b2b3b4-b1b2-b1b2-b1b2-b1b2b3b4b5b6",
          "Parent": "a1a2a3a4-a1a2-a1a2-a1a2-a1a2a3a4a5a6",
          "Name": "Workspace",
          "Details": {}
        }
      },

      ...

    ]
  }
}
```

You can then iterate over the JSON to find a particular instance ID:

```python
instances = response.json()['response']['instances']
replicatedStorageId = ""
for i in instances:
  if i['engineInstance']['Name'] == "ReplicatedStorage":
    replicatedStorageId = i['engineInstance']['Id']

if replicatedStorageId:
  # You now have an instance ID and can get or update it.
else:
  # The name wasn't found.
```

Scripts contain some additional information in the `Details` object, such as the script type, source, and whether they're enabled.

## Get an instance

This method returns a single [Instance](/cloud/reference/Instance).

<Tabs>
  <TabItem key = "1" label="Python">

```python
import requests

# Generate at https://create.roblox.com/dashboard/credentials
apiKey = "<API_KEY>"
# Find at https://create.roblox.com/dashboard/creations in the overflow menu of an experience tile
universeId = "<UNIVERSE_ID>"
# Find Start Place ID at https://create.roblox.com/dashboard/creations in the overflow menu of an experience tile
placeId = "<PLACE_ID>"
# The default ID for the root of any place's data model
instanceId = "<INSTANCE_ID>"

# Request header
apiKeyHeaderKey = "x-api-key"
# Endpoint URL for Get Instance method
getInstanceUrl = "https://apis.roblox.com/cloud/v2/universes/%s/places/%s/instances/%s"

def GetInstance():
  url = getInstanceUrl % (universeId, placeId, instanceId)
  headerData = {apiKeyHeaderKey: apiKey}
  return requests.get(url, headers = headerData)

response = GetInstance()
print("Response:", response.status_code, response.text)

# Parse the Operation object's path from response. See the Polling for Results section for more information.
operationPath = response.json()['path']
```

  </TabItem>
  <TabItem key = "2" label="cURL">

```bash
curl --include --location --request GET "https://apis.roblox.com/cloud/v2/universes/<universeId>/places/<placeId>/instances/<instanceId>" --header "x-api-key: <api-key>"
```

  </TabItem>
</Tabs>

Just like the List Instance Children method, the response includes an
`Operation` object that you poll to retrieve the actual instance. See
[Poll for results](#poll-for-results) for more information.

## Update instances

After you obtain the appropriate instance ID, you can update it.
[Poll for results](#poll-for-results) after making the initial update
request.

<Tabs>
  <TabItem key = "1" label="Python">

```python
import json
import requests

# Generate at https://create.roblox.com/dashboard/credentials
apiKey = "<API_KEY>"
# Find at https://create.roblox.com/dashboard/creations in the overflow menu of an experience tile
universeId = "<UNIVERSE_ID>"
# Find Start Place ID at https://create.roblox.com/dashboard/creations in the overflow menu of an experience tile
placeId = "<PLACE_ID>"
instanceId = "<INSTANCE_ID>"
instanceType = ""
propertyName = ""
propertyValue = ""

# Request header
apiKeyHeaderKey = "x-api-key"
contentTypeHeaderKey = "Content-type"
contentTypeHeaderValue = "application/json"
# Endpoint URL for Update Instance method
updateInstanceUrl = "https://apis.roblox.com/cloud/v2/universes/%s/places/%s/instances/%s"
# JSON keys
detailsJSONKey = "Details"
engineInstanceJSONKey = "engineInstance"

def GeneratePostData():
  propertiesDict = {propertyName: propertyValue}
  detailsDict = {instanceType: propertiesDict}
  instanceDict = {detailsJSONKey: detailsDict}
  outerDict = {engineInstanceJSONKey: instanceDict}
  return json.dumps(outerDict)

def UpdateInstance(postData):
    url = updateInstanceUrl % (universeId, placeId, instanceId)
    headerData = {apiKeyHeaderKey: apiKey,
    contentTypeHeaderKey: contentTypeHeaderValue}
    return requests.patch(url, headers = headerData, data = postData)

postData = GeneratePostData()
response = UpdateInstance(postData)
print("Response:", response.status_code, response.text)

# Parse the Operation object's path from response. Poll for results to perform
# the update.
operationPath = response.json()['path']
```

  </TabItem>
  <TabItem key = "2" label="cURL">

```bash
curl --include --location --request PATCH "https://apis.roblox.com/cloud/v2/universes/<universeId>/places/<placeId>/instances/<instanceId>" --header "x-api-key: <api key>" --header "Content-Type: application/json" --data '{"engineInstance": {"details": {"<instanceType>": {"<propertyName>": "<propertyValue>"}}}}'
```

  </TabItem>
</Tabs>

<Alert severity="info">
If you receive a `TypeError` when attempting to update a script, verify that the script isn't open in Roblox Studio. If it is, close its Script Editor tab. You can also check the Studio output for additional errors, such as `Engine_OC_API: Processing Error - Live scripting session is active`.
</Alert>

## Poll for results

All current [Instance](/cloud/reference/Instance) methods return an
`Operation` object instead of the resource you requested. This object lets you
asynchronously perform the original operation. Use the `Operation` object's
path (included in the initial response) to poll for when the resource is ready.

You can use a variety of polling strategies, such as using exponential backoff
or a fixed delay in between requests. The following example polls every five
seconds, up to 10 times.

<Tabs>
  <TabItem key = "1" label="Python">

```python
import requests
import time

# Generate at https://create.roblox.com/dashboard/credentials
apiKey = "<API_KEY>"
# Use the Operation path from your initial request
# Takes the form of "universes/<UNIVERSE_ID>/places/<PLACE_ID>/instances/<INSTANCE_ID>/operations/<OPERATION_ID>"
operationPath = "<OPERATION_PATH>"

# Polling constants
numberOfRetries = 10
retryPollingCadence = 5

# Request header
apiKeyHeaderKey = "x-api-key"
# Endpoint URL for long-running operation polling
getOperationUrl = "https://apis.roblox.com/cloud/v2/%s"
# JSON keys
doneJSONKey = "done"

def GetOperation(operationPath):
  url = getOperationUrl % (operationPath)
  headerData = {apiKeyHeaderKey: apiKey}
  results = requests.get(url, headers = headerData)
  return results

def PollForResults(operationPath):
  currentRetries = 0
  while (currentRetries < numberOfRetries):
    time.sleep(retryPollingCadence)
    results = GetOperation(operationPath)
    currentRetries += 1

    if (results.status_code != 200 or results.json()[doneJSONKey]):
      return results

response = PollForResults(operationPath)
print("Response:", response.status_code, response.text)
```

  </TabItem>
  <TabItem key = "2" label="cURL">

```bash
curl --include --location --request GET "https://apis.roblox.com/cloud/v2/universes/<universeId>/places/<placeId>/instances/<instanceId>/operations/<operationId>" --header "x-api-key:<api key>"
```

  </TabItem>
</Tabs>

## Potion Shop demo

The Potion Shop Google Sheets demo shows you to update an experience's script
from the web. The demo consists of the following:

- An uncopylocked place with a mock UI that displays various potions and their
  prices.
- A `.ods` file that you import into Google Sheets. This spreadsheet lets you
  specify and update values for properties within the experience.
- Code for a Google Apps Script that reads data from the Google Sheet and
  updates the **ReplicatedStorage > ItemList** script in the Potion Shop
  experience.

### Set up the demo

1. Go to the [Potion Shop Demo](https://www.roblox.com/games/14215142052/Potion-Shop-Demo)
   Discover page. Click on the overflow menu, and then **Edit in Studio**.
   Studio opens with a copy of the place.

1. Click **File** &rarr; **Save to Roblox** and fill out the necessary information to
   save the Potion Shop Demo as the default place for your experience. Test the
   experience. You should see the UI for the Potion Shop Demo. Make a note of
   the name, cost, and colors of the potions. You'll change them later using
   Open Cloud!

### Set up the sheet

1. [Download](../../assets/open-cloud/open-cloud-potion-shop-demo.ods) the
   Potion Shop spreadsheet file.
1. Go to [Google Sheets](https://sheets.google.com/) and click **Blank
   Spreadsheet**.
1. In the sheet that appears, click **File > Import**, and click the
   **Upload** tab.
1. Drag the Potion Shop spreadsheet file into the upload window.
1. Choose **Replace spreadsheet** and then **Import data**.
1. In the AppScript tab of the sheet, copy the code in cell A1.
1. Click the **Extensions > Apps Script** menu and paste the code into the
   `Code.gs` file. Then save the project.
1. Back in the spreadsheet, select the **Update Potion Shop** tab. Click the
   **Update Script** button, click the overflow menu, and select **Assign script**.
1. In the **Assign script** window, enter `UpdateScript` and click **OK**.

### Create an API key

1.  Go to the [Creator Hub Open Cloud API Keys](https://create.roblox.com/dashboard/credentials?activeTab=ApiKeysTab) page and click **Create API Key**.
1.  Fill out the form with the following information.

    - **Name**: PotionShop
    - **API System**: Add the **universe-place-instances** API system. Add your Potion Shop experience to the system. For **Experience Operations**, add read and write access.
    - **Accepted IP Addresses**: Add 0.0.0.0/0 as an IP Address
    - **Expiration**: No Expiration
    - Click **Save & Generate Key** and then **Copy Key to Clipboard**.

1.  Paste the API key to the API Key cell (D2) on the Intro tab of your Google
    Sheet.

### Obtain the universe and place ID

1. Go to the [Creator Hub Creations](https://create.roblox.com/dashboard/creations) page, hover over
   the Potion Shop's experience tile, and click the overflow menu.
1. Select **Copy Universe ID** and paste it into the **Universe ID** cell
   (E2) on the Intro tab of your Google Sheet.
1. Select **Copy Start Place ID** and paste it into the **Place ID** cell
   (F2) on the Intro tab of your Google Sheet.

### Update the script values

1. In the **Update Potion Shop** tab of the sheet, modify any values you'd
   like and click the **Update Script** button.
1. If Google Sheets prompts you to for authorization, click **OK** and allow
   your account to run the script.
1. In Studio, playtest the Potion Shop to see any reflected changes. From the
   **Explorer** window, you can also open the **ReplicatedStorage >
   ItemList** script to inspect the changes.
