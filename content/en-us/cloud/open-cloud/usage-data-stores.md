---
title: Usage Guide for Data Stores
description: Explains how to use Open Cloud Web APIs to access and modify data stores by HTTP calls.
---

In addition to accessing [data stores](../../cloud-services/data-stores) using Lua `Class.DataStoreService` in Studio or live servers, you can use Open Cloud APIs to access and utilize [standard](../../reference/cloud/datastores-api/v1.json) and [ordered data stores](../../reference/cloud/datastores-api/ordered-v1.json) from external scripts and tools with granular access and security control.

<Alert severity="warning">
Open Cloud APIs for ordered data stores are beta APIs that might be subject to changes for future releases.
</Alert>

## Usage

You can improve several areas of your workflow by accessing your data with these APIs, such as:

- **Customer Support Portal**: Data stores are useful for storing persistent user resources, such as items in user inventories or skill points. Sometimes you need to update these resources for customer support. Rather than using Studio or joining an experience every time manually, you can build a web application to allow your customer service agents to directly handle customer support requests, such as viewing and modifying user inventories and issuing refunds.

- **LiveOps Dashboard**: You can build a LiveOps dashboard using the APIs to improve the efficiency of live operations, such as scheduling in-experience events. You can code an event in advance, hide it under a feature flag as part of the configuration data in a data store, and set a time to flip the flag for publishing the event. Your experience servers can detect this change by reading the flag to launch the event.

- **External Leaderboard**: To promote your experiences outside of Roblox, you can pull the information of your experience, such as the leaderboard of a race, in real-time and display it on an external website. You can grant read-only access to your ordered data stores for the website to periodically request the latest data through HTTP and update the web page.

- **Data Migration Automation**: Data might change or update as your experience evolves, such as upgrading data schemas to accommodate new features. To avoid losing existing user data, sometimes you need to migrate your data stores from the old schema to a new one. You can write an external script that reads each entry from current data stores, maps the data to the new schema, and writes the entry back to a new data store to automate the data migration.

## Differences with the Lua API

Although Open Cloud APIs are similar to the Lua `Class.DataStoreService`, there are a few different requirements to be aware of:

- **Universe ID and data store name**: Unlike the Lua API, Open Cloud APIs are stateless and can come from anywhere, so you need to always provide the **Universe ID**, the unique identifier of your experience, and the data store **name** when sending the requests. For more information on how to get a Universe ID, see [Universe ID](../../cloud/open-cloud/data-store-api-handling.md#universe-id).

- **Separate permissions for creating and updating**: The Lua API creates new entries if they don't exist when you call `Class.GlobalDataStore:SetAsync()`, but Open Cloud methods for creating and updating entries are separate. Separate permissions can be safer and more flexible in certain situations. For example, you can create a customer support tool that can edit an existing user's profile but can't create a new user's profile.

- **Data serialization**: All Open Cloud endpoints require you to serialize all data before network transportation. Serialization means to convert an object into that string, and deserialization is its inverse operation (convert a string to an object). The Lua API serializes and deserializes entry content automatically, but for Open Cloud you need to generate or parse your entry data with JSON on your own.

## Security Permissions

Data stores usually store sensitive information, such as user profiles and virtual currency. To maintain security, each Open Cloud API has corresponding required permissions that you must add to your API key, such as the `List Keys` permission for the listing API. If you don't add the required permissions, your API call returns an error. For the specific permissions that are required for each operation, see the API reference of [standard](../../reference/cloud/datastores-api/v1.json) and [ordered data stores](../../reference/cloud/datastores-api/ordered-v1.json).

When [configuring your API keys](./api-keys.md#creating-an-api-key), you can set granular permissions, such as read, write, and list entry, for each data store within a specific experience, or you can give a key to read or write all data stores within an experience. You can also limit access to a subset of data stores needed for your tool instead of exposing all data stores. This mitigates the impact in case your key gets leaked.

## Building Tools

You can use the language of your choice to build tools with [Open Cloud APIs for data stores](../../reference/cloud/datastores-api/v1.json) to fulfill your operation needs. The following examples walk through the processes of building a [user inventory support portal](#user-inventory-support-portal) in Python with standard data stores and an [External Persistent Leaderboard](#external-persistent-leaderboard) using ordered data stores.

### User Inventory Support Portal

This section provides a concrete example of building a user inventory support portal in Python, in which you can list and read a subset of your users' inventory, make edits, and then update back to an experience's data store.

For this example, assume the following:

- The name of the data store that stores the user inventory is `Inventory`.

- The data schema for each data entry is `"userId": {"currency": number, "weapon": string, "level": number}`. The key is just `userId`.

- The Python script lists a subset of user inventories based on prefixes, increase their virtual currency by 10 for a promotion, and update the data.

From a high level, you can build your Python app by adding API key permissions and then adding scripts.

#### Adding API Key Permissions for Data Stores

When [creating an API Key](./api-keys.md) for this example, make sure you perform the following settings:

1. From the **Select API System** menu in the **Access Permissions** section, select **universe-datastores**.

1. **(Optional)** In the **Data Stores** section, select API operations for specific data stores.

   1. Enable the **Specific Data Store Operations** toggle. By default, five data stores automatically load, but you can add additional data stores through the **+ Add Data Store to List** button.
   1. Select the dropdown arrow next to a data store's name, then select the API operations you want the data store to have access to.

1. Select API operations for the entire experience.

   1. Click the **Select Experience to Add** dropdown and select an experience.
   2. In the **Experience Operations**, click the dropdown arrow and select the operations you want to add to your API. This example selects **Read Entry**, **Update Entry**, and **List Entry Keys** for the entire experience.
      <Alert severity="info">
      You don't need the `create entries` API key permission since the app doesn't create new user inventories.
      </Alert>

1. In the **Security** section, explicitly set IP access to the key using [CIDR notation](./api-keys.md#cidr-format), and set an explicit expiration date so your key automatically stops working after that date. For this example, if you plan to do local testing first, you can remove the IP restriction by setting it to **0.0.0.0/0** and let it expire in **30 days**.

#### Adding Scripts for the User Inventory Support Portal

After creating the API key with permissions required for the example app, you need to add Python scripts to perform app functionalities. The `data_stores_methods.py` file shows how to define [`List Entries`](../../reference/cloud/datastores-api/v1.json#list-entries), [`Get Entry`](../../reference/cloud/datastores-api/v1.json#get-entry), and [`Increment Entry`](../../reference/cloud/datastores-api/v1.json#increment-entry) methods. The `update_inventory` file uses the defined methods to list a subset of user inventories, increase the virtual currency for each user, and update the data.

```python title='data_stores_methods.py'
import hashlib
import requests
import json
import base64

class DataStores:

    def __init__(self):
        self._base_url = "https://apis.roblox.com/datastores/v1/universes/{universeId}"
        # API Key is saved in an environment variable signified by 'API_KEY'
        self._apiKey = str(os.environ['API_KEY'])
        self._universeId = "UNIVERSE_ID"
        self.ATTR_HDR = 'Roblox-entry-Attributes'
        self.USER_ID_HDR = 'Roblox-entry-UserIds'
        self._objects_url = self._base_url +self._universeId+'/standard-datastores/datastore/entries/entry'
        self._increment_url = self._objects_url + '/increment'
        self._version_url = self._objects_url + '/versions/version'
        self._list_objects_url = self._base_url +self._universeId+'/standard-datastores/datastore/entries'

    def _H(self):
        return { 'x-api-key' : self._apiKey }
    def _get_url(self, path_format: str):
        return f"{self._config['base_url']}/{path_format.format(self._config['universe_id'])}"

        return r, attributes, user_ids

def get_entry(self, datastore, object_key, scope = None):
        self._objects_url = self._base_url +self._universeId+'/standard-datastores/datastore/entries/entry'
        headers = { 'x-api-key' : self._apiKey }
        params={"datastoreName" : datastore, "entryKey" : object_key}
        if scope:
            params["scope"] = scope
        r = requests.get(self._objects_url, headers=headers, params=params)
        if 'Content-MD5' in r.headers:
            expected_checksum = r.headers['Content-MD5']
            checksum = base64.b64encode(hashlib.md5(r.content).digest())
            #print(f'Expected {expected_checksum},  got {checksum}')

        attributes = None
        if self.ATTR_HDR in r.headers:
            attributes = json.loads(r.headers[self.ATTR_HDR])
        user_ids = []
        if self.USER_ID_HDR in r.headers:
            user_ids = json.loads(r.headers[self.USER_ID_HDR])

        return r

    def list_entries(self, datastore, scope = None, prefix="", limit=100, allScopes = False, exclusive_start_key=None):
        self._objects_url = self._base_url +self._universeId+'/standard-datastores/datastore/entries'
        headers = { 'x-api-key' : self._apiKey }
        r = requests.get(self._objects_url, headers=headers, params={"datastoreName" : datastore, "scope" : scope, "allScopes" : allScopes, "prefix" : prefix, "limit" : 100, "cursor" : exclusive_start_key})
        return r

    def increment_entry(self, datastore, object_key, incrementBy, scope = None, attributes=None, user_ids=None):
        self._objects_url = self._base_url +self._universeId+'/standard-datastores/datastore/entries/entry/increment'
        headers = { 'x-api-key' : self._apiKey, 'Content-Type': 'application/octet-stream' }
        params={"datastoreName" : datastore, "entryKey" : object_key, "incrementBy" : incrementBy}
        if scope:
            params["scope"] = scope

        r = requests.post(self._objects_url, headers=headers, params=params)
        attributes = None
        if self.ATTR_HDR in r.headers:
            attributes = json.loads(r.headers[self.ATTR_HDR])
        user_ids = []
        if self.USER_ID_HDR in r.headers:
            user_ids = json.loads(r.headers[self.USER_ID_HDR])

        return r
```

```python title='update_inventory'
import tutorialFunctions

DatastoresApi = tutorialFunctions.DataStores()

# Set up
datastoreName = "Inventory"

# List keys for a subset of users (you might need to use the nextPageCursor to view other entries)
keys = DatastoresApi.list_entries(datastoreName)
print(keys.content)

# Read inventory for each user
for x in range(5):
    updatedObjectKey = "User_"+str(x+1)
    value = DatastoresApi.get_entry(datastoreName, updatedObjectKey)
    # change response type to a string
    updatedValue = value.json()
    print(updatedObjectKey + " has "+str(updatedValue)+" gems in their inventory")
# Update the currency of each user by 10
for x in range(5):
    updatedObjectKey = "User_"+str(x+1)
    value = DatastoresApi.increment_entry(datastoreName, updatedObjectKey, 10)
    # change response type to a string
    updatedValue = value.json()
    print(updatedObjectKey + " now has "+str(updatedValue)+" robux in their inventory")
```

To test, set the `API_KEY` environment variable and run `update_inventory` file:

```bash
export API_KEY=... \
python update_inventory
```

### External Persistent Leaderboard

This section walks through a concrete example of creating an external persistent leaderboard in Python, in which you can list and read your users information stored in ordered data stores, make edits, and then publish to an external website for promotion.

For this example, assume the following:

- The code sample creates a predefined list of usernames for the demo purpose. For your own application, you should use the list of actual users in your experience.

- The code sample adds 50 points to each user joining the experience for the demo purpose. For your own application, you should define the rule based on your experience's design.

From a high level, you can build your Python app by adding API key permissions and then adding scripts.

#### Adding API Key Permissions for Ordered Data Stores

The example app requires four methods to achieve its functionalities: [`List`](../../reference/cloud/datastores-api/ordered-v1.json#list), [`Create`](../../reference/cloud/datastores-api/ordered-v1.json#create), [`Update`](../../reference/cloud/datastores-api/ordered-v1.json#update) and [`Increment`](../../reference/cloud/datastores-api/ordered-v1.json#increment), so you need to add the following API key permissions:

- **Read** for the `list` method.
- **Write** for `Create`, `Update`, and `Increment` methods.

When [creating an API Key](./api-keys.md) for this example, make sure you perform the following operations:

1. From the **Select API System** menu in the **Access Permissions** section, select **Ordered Data Stores**.

1. Add permissions of API operations to read and write ordered data stores in the target experience.

   1. Click the **Select Experience to Add** dropdown and select the target experience.
   2. In the **Experience Operations**, expand the dropdown to select **Read** and **Write** operations.

1. In the **Security** section, explicitly set IP access to the key using [CIDR notation](./api-keys.md#cidr-format), and set an explicit expiration date so your key automatically stops working after that date. For this example, if you plan to do local testing first, you can remove the IP restriction by setting it to **0.0.0.0/0** and let it expire in **30 days**.

#### Adding Scripts for the Leaderboard

After creating the API key with permissions required for the example app, you need to add Python scripts to perform app functionalities.

The `ordered_data_stores.py` file shows how to define [`List`](../../reference/cloud/datastores-api/ordered-v1.json#list), [`Create`](../../reference/cloud/datastores-api/ordered-v1.json#create), [`Update`](../../reference/cloud/datastores-api/ordered-v1.json#update) and [`Increment`](../../reference/cloud/datastores-api/ordered-v1.json#increment) methods. The `leaderboard` file uses the defined methods to create entries of users in ordered data stores, display scores, increment scores of winning users, and update the leaderboard. The `leaderboard` file also imports a `config` JSON file for configuring the Universe ID, API domain, and your API key.

```python title='ordered_data_stores.py'
import hashlib
import requests
import json

class DataStores:
    def __init__(self, config_file):
        with open(config_file) as f:
            self._config = json.load(f)

    def _H(self):
        return { 'x-api-key' : self._config["api_key"], 'Content-Type': 'application/json'}
    def _get_url(self, path_format: str):
        return f"{self._config['base_url']}/{path_format.format(self._config['universe_id'])}"

    def list(self, datastore, scope, pageSize = 10, orderBy = "", filter = "", exclusiveStartKey = ""):
        self._objects_url = self._config['api_key_url']+"universes/"+self._config["universe_id"]+"/orderedDataStores/"+datastore+"/scopes/"+scope+"/entries"
        headers = { 'x-api-key' : self._config["api_key"] }
        r = requests.get(self._objects_url, headers=headers, params={"max_page_size": pageSize, "order_by" : orderBy, "filter" : filter, "page_token" : ""})
        return r

    def create(self, datastore, scope, entry, data):
        self._objects_url = self._config['api_key_url']+"universes/"+self._config["universe_id"]+"/orderedDataStores/"+datastore+"/scopes/"+scope+"/entries"
        headers = self._H()
        payload = json.dumps({
            "value": 11
            })
        return requests.post(self._objects_url, params = {"id": entry }, data=payload, headers=headers)

    def increment(self, datastore, scope, entry, incrementBy):
        self._objects_url = self._config['api_key_url']+"universes/"+self._config["universe_id"]+"/orderedDataStores/"+datastore+"/scopes/"+scope+"/entries/"+entry+":increment"
        headers = { 'x-api-key' : self._config["api_key"] }
        payload = json.dumps({
            "amount": 1
            })
        r = requests.post(self._objects_url, headers=headers, data=payload)
        return r
```

```python title='leaderboard.py'
import leaderboardEndpoints

# input config file here
datastores = leaderboardEndpoints.DataStores("config.json")

# Variables
orderedDataStore = "PlayerScores"
scope = "global"
entryNames = ["Ragdoll", "Balinese", "Tabby", "Siamese"]

# Create an entry and give each new player 50 points for joining the game
for x in range(len(entryNames)):
    r = datastores.create(orderedDataStore, scope, entryNames[x], 50)

# Display the players scores
playerScores = datastores.list(orderedDataStore, scope)
print(playerScores.content)

# Increment the first players score for winning the game
datastores.increment(orderedDataStore, scope, entryNames[0], 100)
# Increment all the players scores for participating in the game
for x in range(len(entryNames)):
    datastores.increment(orderedDataStore, scope, entryNames[x], 10)

# Display the leaderboard with the updated scores
playerScores = datastores.list(orderedDataStore, scope)
print(playerScores.content)
```

```json title='config'
{
  "universe_id": "",
  "api_key_url": "https://apis.roblox.com/datastores/ordered-v1/",
  "api_key": ""
}
```

To test, set the `API_KEY` environment variable and run the `leaderboard` file:

```bash
export API_KEY=... \
python leaderboard
```

After completing testing, you can publish or embed the leaderboard to websites outside of Roblox for more reach.
