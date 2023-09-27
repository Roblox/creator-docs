---
title: Types
description: Explains the different data types of Open Cloud web APIs.
---

Open Cloud represents request and response payloads as [standard
JSON](https://www.ecma-international.org/publications-and-standards/standards/ecma-404/).
The standards JSON types are text, values, objects, arrays, numbers, and
strings. Some types have special considerations for representing specific kinds
of data, which are described in the following sections.

## Timestamp

Uses RFC 3339, where generated output will always be Z-normalized and uses 0, 3,
6 or 9 fractional digits. Offsets other than "Z" are also accepted.

```json title='Example Timestamp'
{ "timestamp": "1972-01-01T10:00:20.021Z" }
```

## Duration

Generated output always contains 0, 3, 6, or 9 fractional digits, depending on
required precision, followed by the suffix "s". Accepted are any fractional
digits (also none) as long as they fit into nano-seconds precision and the
suffix "s" is required.

```json title='Example Durations'
{
  "duration-9": "1.000340012s",
  "duration-0": "1s"
}
```

## Bytes

Byte data are encoded as a string using standard base64 encoding with paddings.
Either standard or URL-safe base64 encoding with or without paddings are
supported.

```json title='Example Bytes'
{
  "bytes": "YWJjMTIzIT8kKiYoKSctRbLx+"
}
```

## FieldMask

A FieldMask is a string that describes the fields to act on when making a
request. To construct a field mask, you specify comma delimited JSON field names
in a string. For example, given the following resource:

```json title='Example JSON resource'
{
  "foo": {
    "a": "c",
    "b": "d"
  },
  "bar": "x",
  "baz": "y"
}
```

If you wanted to specify a field mask to update the values of only `foo.b` and
`bar`, the field mask would look like: `foo.b, bar`

In Open Cloud, update methods that support a field mask have a parameter named
`updateMask`, where you can specify a field mask as a value.
