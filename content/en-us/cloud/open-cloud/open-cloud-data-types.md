---
title: Open Cloud data types
description: Explains the different data types of Open Cloud web APIs.
---

Open Cloud APIs use JSON to pass in data in the body and support the following data types.

## String

The **string** data type is a sequence of characters, such a `scope` of a data store and a `message` for publishing to the server. Check the API reference before you pass a string value because some Open Cloud APIs do not support special symbols for strings. You must enclose string values in double quotes like the following example:

```json title='Example String'
{ "message": "Hello" }
```

## Number

The **number** data type is an integer or floating point, such as a `universeId` and a `placeId`.

```json title='Example Number'
{ "universeId": 123456 }
```

## Boolean

The **boolean** data type can have a value of either `false` or `true`.

```json title='Example Boolean'
{ "allScopes": true }
```

## Object

The **object** data type is a set of key-value pairs. The key must be strings, and the value can be simple data types such as strings, numbers, and booleans. Use curly braces to enclose an object and separate each key-value pair with a comma. Examples of objects in Open Cloud APIs include a `DataStore` and an `Entrykey`.

```json title='Example Object'
{
  "DataStore": { "name": "DataStore1", "createdTime": "2022-01-01" }
}
```

## Array

The **array** data type is an ordered collection of elements such as strings, numbers, and objects. Enclose arrays with brackets and separate each value of an array with a comma.

```json title='Example Array'
{ "roblox-entry-userids": [123456, 234567, 345678] }
```
