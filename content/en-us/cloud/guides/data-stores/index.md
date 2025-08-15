---
title: Open Cloud data stores
description: Explains how to use Open Cloud APIs to access and modify data stores.
---

In addition to accessing data stores from the Engine API in Studio or live experiences (`Class.DataStoreService`), you can use the Open Cloud APIs to access [standard](/cloud/reference/DataStoreEntry) and [ordered data stores](/cloud/reference/OrderedDataStoreEntry) from external scripts and other tools.

Open Cloud access to your data stores unlocks many potential use cases, including:

- A customer support portal that lets your team directly handle support requests, such as modifying user inventories or issuing refunds
- Global leaderboards that you can display on an external website
- Schema updates with scripts that read entries from the current data store, map it to the new schema, and write entries back to a new data store

The examples on this page demonstrate how to build a [user inventory support portal](#user-inventory-support-portal) and an [external leaderboard](#external-persistent-leaderboard)) with Node.js and Python, but use whichever language you prefer; the Open Cloud APIs support any programming language that can send an HTTP request.

## Differences from the Engine API

Although the Open Cloud APIs access the same underlying data stores and are similar to working with `Class.DataStoreService`, there are a few key differences:

- **Universe ID**: Unlike the Engine API, Open Cloud APIs are stateless and can come from anywhere, so you must always provide the **universe ID**, the unique identifier of your experience.

- **Separate permissions for creating and updating**: The Engine API creates new entries if they don't exist when you call `Class.DataStore:SetAsync()`, but Open Cloud methods for creating and updating entries are separate. Separate permissions can be safer and more flexible in certain situations. For example, you might want your customer support tool to only be able to edit an existing user's profile, not create a new one.

- **Data serialization**: All Open Cloud endpoints require you to serialize data before sending it. Serialization means converting an object into a string. Deserialization is the opposite, converting a string into an object. The Engine API serializes and deserializes entry content automatically, but for Open Cloud, you must generate or parse your entry to and from JSON on your own.

## Permissions

Data stores often store sensitive information, such as user profiles and virtual currency. To maintain security, each Open Cloud method has corresponding permissions, called **scopes**, that you must add to your API key, such as the `universe-datastores.control:list` scope for the [List Data Stores](/cloud/reference/DataStore#Cloud_ListDataStores) method. If you don't add the required permissions, your API call returns an error. See the reference documentation for the required scopes for each endpoint.

For more information on managing permissions, see [Manage API keys](../../auth/api-keys.md).

## User inventory support portal

This example uses a data store named `Inventory` and a schema for each entry of `"userId": {"currency": number, "weapon": string, "level": number}`. The key is `userId`.

### Required scopes

When [creating an API Key](../../auth/api-keys.md) for this example, add the following scopes to your key:

- `universe-datastores.objects:list`
- `universe-datastores.objects:read`
- `universe-datastores.objects:update`

Optionally, add the permissions for only the `Inventory` data store, set an IP address restriction, and set an expiration date.

### Add scripts for the user inventory support portal

After creating the API key with permissions required for the example app, you can create a script to make requests to the endpoints. These scripts get the first 10 entries in the data store, increment the `currency` value for each by 10, and then update each entry. For a larger data store, you would need to deal with [pagination](../../reference/patterns.md#pagination) using the `maxPageSize` and `pageToken` query parameters.

<Tabs>

  <TabItem key = "1" label="Node.js">

```javascript title="incrementCurrency.js"
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error('The API_KEY environment variable is not set.');
}

const apiHeaderKey = 'x-api-key';

const universeId = '';
const dataStoreId = 'Inventory';

const baseUrl = 'https://apis.roblox.com/cloud/v2/';

async function listEntries(universe, dataStore) {
    const listPath = `universes/${universe}/data-stores/${dataStore}/entries`;
    const url = baseUrl + listPath;
    const response = await fetch(url, {
        headers: { [apiHeaderKey]: apiKey }
    });
    return response.json();
}

async function getEntry(path) {
    const url = baseUrl + path;
    const response = await fetch(url, {
        headers: { [apiHeaderKey]: apiKey }
    });
    return response.json();
}

async function updateEntry(path, payload) {
    const url = baseUrl + path;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            [apiHeaderKey]: apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload) // The body must be a string
    });
    return response;
}

(async () => {
    try {
        const entries = await listEntries(universeId, dataStoreId);

        for (const entry of entries.dataStoreEntries) {
            const path = entry.path;
            console.log(`\nProcessing entry: ${path}`);

            const currentData = await getEntry(path);

            currentData.value.currency += 10;

            const payload = { value: currentData.value };

            const updateResponse = await updateEntry(path, payload);

            console.log(`Status: ${updateResponse.status}`);
            console.log(`Response: ${await updateResponse.text()}`);
        }
    } catch (error) {
        console.error('An error occurred during execution:', error);
    }
})();
```

To test, set the `API_KEY` environment variable, install dependencies, and run the script:

```bash
export API_KEY=<your_key>
node incrementCurrency.js
```

  </TabItem>

  <TabItem key = "2" label="Python">

```python title="increment_currency.py"
import json
import os
import requests

apiKey = str(os.environ['API_KEY'])
apiHeaderKey = 'x-api-key'

universe_id = ''
data_store_id = 'Inventory'

base_url = 'https://apis.roblox.com/cloud/v2/'

def list_entries(universe, data_store):
    list_path = f'universes/{universe}/data-stores/{data_store}/entries'
    url = base_url + list_path
    return requests.get(url, params={}, headers={apiHeaderKey: apiKey})

def get_entry(path):
    url = base_url + path
    return requests.get(url, params={},  headers={apiHeaderKey: apiKey})

def update_entry(path, payload):
    url = base_url + path
    return requests.patch(url, params={}, headers={apiHeaderKey: apiKey, 'Content-Type': 'application/json'}, data=payload)

entries = list_entries(universe_id, data_store_id).json()

for entry in entries['dataStoreEntries']:
    path = entry['path']
    get_response = get_entry(path).json()
    get_response['value']['currency'] += 10
    json_payload = json.dumps({'value': get_response['value']})
    update_response = update_entry(path, json_payload)
    print(update_response.status_code)
    print(update_response.text)
    print()
```

To test, set the `API_KEY` environment variable, install dependencies, and run the script:

```bash
export API_KEY=<your_key>
python3 increment_currency.py
```

  </TabItem>

</Tabs>

## External persistent leaderboard

This example creates a predefined list of users for demo purposes, but for it to be useful in a real experience, you would need an actual data store of users.

### Required scopes

When [creating an API Key](../../auth/api-keys.md) for this example, add the following scopes to your key:

- `universe.ordered-data-store.scope.entry:read`
- `universe.ordered-data-store.scope.entry:write`

### Add scripts for the leaderboard

After creating the API key with permissions required for the example app, you can create a script to make requests to the endpoints. These scripts add some sample entries to the ordered data store with random numbers and then retrieve them from highest to lowest value. For a larger data store, you would need to deal with [pagination](../../reference/patterns.md#pagination) using the `maxPageSize` and `pageToken` query parameters.

<Tabs>
  <TabItem key = "1" label="Node.js">

```javascript title="leaderboard.js"
const apiKey = process.env.API_KEY;
const apiHeaderKey = 'x-api-key';

const universeId = '';
const orderedDataStoreId = 'PlayerScores';
const scopeId = 'global';

const baseUrl = 'https://apis.roblox.com/cloud/v2/';

async function createOrderedEntry(universe, orderedDataStore, entryId, payload) {
  const createPath = `universes/${universe}/ordered-data-stores/${orderedDataStore}/scopes/${scopeId}/entries`;

  const url = new URL(baseUrl + createPath);
  url.searchParams.append('id', entryId);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      [apiHeaderKey]: apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText}`);
  }

  return response.text();
}

async function listOrderedEntries(universe, orderedDataStore) {
  const listPath = `universes/${universe}/ordered-data-stores/${orderedDataStore}/scopes/${scopeId}/entries`;

  const url = new URL(baseUrl + listPath);
  url.searchParams.append('orderBy', 'value desc');

  return fetch(url, {
    headers: {
      [apiHeaderKey]: apiKey,
    },
  });
}

async function main() {
  if (!apiKey) {
    console.error('Error: The API_KEY environment variable is not set.');
    process.exit(1);
  }

  const entryNames = ['Ragdoll', 'Balinese', 'Tabby', 'Siamese'];

  console.log('Creating sample data...');
  for (const name of entryNames) {
    try {
      const randomValue = Math.floor(Math.random() * 50) + 1;
      const payload = { value: randomValue };
      const responseText = await createOrderedEntry(universeId, orderedDataStoreId, name, payload);
      console.log(responseText);
    } catch (error) {
      console.error(`Failed to create entry for "${name}": ${error.message}`);
    }
  }

  console.log('\nGetting sorted list of entries...');
  try {
    const playerScoresResponse = await listOrderedEntries(universeId, orderedDataStoreId);

    console.log(playerScoresResponse.status);
    const responseText = await playerScoresResponse.text();
    console.log(responseText);
  } catch (error) {
    console.error(`Failed to list entries: ${error.message}`);
  }
}

main();
```

To test, set the `API_KEY` environment variable, install dependencies, and run the script:

```bash
export API_KEY=<your_key>
node leaderboard.js
```

  </TabItem>
  <TabItem key = "2" label="Python">

```python title="leaderboard.py"
import json
import os
import random
import requests

apiKey = str(os.environ['API_KEY'])
apiHeaderKey = 'x-api-key'

universe_id = ''
ordered_data_store_id = 'PlayerScores'
scope_id = 'global'

base_url = 'https://apis.roblox.com/cloud/v2/'

def create_ordered_entry(universe, ordered_data_store, entry_id, payload):
    create_path = f'universes/{universe}/ordered-data-stores/{ordered_data_store}/scopes/{scope_id}/entries'
    url = base_url + create_path
    return requests.post(url, params={'id': entry_id}, headers={apiHeaderKey: apiKey, 'Content-Type': 'application/json'}, data=payload)

def list_ordered_entries(universe, ordered_data_store):
    list_path = f'universes/{universe}/ordered-data-stores/{ordered_data_store}/scopes/{scope_id}/entries'
    url = base_url + list_path
    return requests.get(url, params={'orderBy': 'value desc'}, headers={apiHeaderKey: apiKey})

# Create sample data
entryNames = ["Ragdoll", "Balinese", "Tabby", "Siamese"]
for name in entryNames:
    random_value = random.randint(1, 50)
    json_payload = json.dumps({'value': random_value})
    create_response = create_ordered_entry(universe_id, ordered_data_store_id, name, json_payload)
    print(create_response.text)

# Get list
player_scores = list_ordered_entries(universe_id, ordered_data_store_id)
print(player_scores.status_code)
print(player_scores.text)
```

To test, set the `API_KEY` environment variable, install dependencies, and run the script:

```bash
export API_KEY=<your_key>
python3 leaderboard.py
```

  </TabItem>
</Tabs>
