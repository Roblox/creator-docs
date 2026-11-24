---
title: Roblox Archive (.rbx) format
description: Learn the structure and manifest format of the Roblox Archive (.rbx) file.
noindex: true
---

<Alert severity="warning">
<AlertTitle>Disclaimer</AlertTitle>
This specification describes the new Roblox Archive (`.rbx`) format, which will be introduced as part of an upcoming announcement. We're sharing it ahead of time to give creators and tool maintainers time to prepare for the transition, particularly those with custom tooling or CI/CD workflows.

This document is not yet part of our official Creator documentation, but reflects the format we're implementing. We'll communicate any changes as the rollout progresses.
</Alert>

## Overview

The Roblox Archive (`.rbx`) is a ZIP-based file format for packaging places, models, and other Roblox content into a single file. An archive can contain references to other assets, and content embedded in an object-store.

## Archive Structure

Archives use the standard ZIP format.

```plaintext
Example.rbx
├── manifest.jsonl
└── objects/
    ├── <content-digest>
    ├── <content-digest>
    └── ...
```

The format consists of two components:

| Component      | Description                                              |
| -------------- | -------------------------------------------------------- |
| manifest.jsonl | Required. Defines the package and its content.           |
| objects/       | Contains embedded content, identified by content digest. |

### ZIP Requirements

| Requirement               | Specification                    |
| ------------------------- | -------------------------------- |
| Extension                 | .rbx                             |
| Container                 | Standard ZIP, with ZIP64 support |
| Compression               | None (ZIP STORE method)          |
| Filename encoding         | UTF-8                            |
| Path separator            | Forward slash (/)                |
| Maximum entry path length | 128 characters                   |
| Case sensitivity          | Case-sensitive                   |
| Reserved components       | . and .. are prohibited          |

Embedded content is stored as its original bytes, without additional ZIP compression. Individual content formats may use their own compression.

## Archive Manifest

Every archive must contain a `manifest.jsonl` at its root. The manifest uses JSON Lines (JSONL), with each record representing a distinct piece of information. Three record types are defined:

| Kind    | Description                                                       |
| ------- | ----------------------------------------------------------------- |
| header  | Defines the archive format and configuration.                     |
| package | Describes the package and its metadata.                           |
| content | Describes embedded content, an external asset reference, or both. |

Records are processed sequentially. The first record must be a `header`, followed by a `package` record and zero or more `content` records.

### Header

The header defines the archive format and its configuration. It must appear exactly once, as the first record of the manifest.

```plaintext
{"kind":"header", "version":1, "digestAlgorithm":"<algorithm>"}
```

| Field           | Type    | Description                                  |
| --------------- | ------- | -------------------------------------------- |
| kind            | String  | Must be header.                              |
| version         | Integer | Archive format version, initially 1.         |
| digestAlgorithm | String  | Algorithm used to calculate content digests. |

All embedded objects within an archive use the same hashing algorithm.

### Package

The package record describes the content represented by the archive, including its type and associated metadata. For example, a place package:

```plaintext
{"kind":"package", "type":"place", "place":"Place.rbxl"}
```

Or a model package:

```plaintext
{"kind": "package", "type":"model"}
```

| Field             | Type    | Description                                                         |
| ----------------- | ------- | ------------------------------------------------------------------- |
| kind              | String  | Must be package.                                                    |
| type              | String  | Type of content represented by the package, such as place or model. |
| place             | String? | Logical path of the serialized place, when applicable.              |
| Additional fields | Various | Package-specific metadata, determined by its type.                  |

The package record may contain additional metadata depending on the type of content it represents.

### Content

Content records describe files or asset references belonging to the package.

```plaintext
{"kind":"content", "path":"Scripts/Main.luau", "objectDigest":"abc..."}
```

| Field        | Type    | Description                                    |
| ------------ | ------- | ---------------------------------------------- |
| kind         | String  | Must be content.                               |
| path         | String? | Optional logical path within the package.      |
| objectDigest | String? | Content digest identifying embedded bytes.     |
| asset        | Object? | Reference to a Roblox asset.                   |
| metadata     | Object? | Optional metadata associated with the content. |

Each content record must specify at least one of `object` or `asset`.

### Asset Structure

| Field   | Type    | Description                                        |
| ------- | ------- | -------------------------------------------------- |
| id      | Number  | Roblox asset identifier.                           |
| version | Number? | Optional version of the referenced asset.          |
| tag     | String? | Optional tag associated with the referenced asset. |

## Content Paths

Paths describe the logical organization of content within the package.

- Paths are relative to the package root.
- Paths use forward slashes and are case-sensitive.
- Each path must be unique within the package.
- Paths are independent of the physical location of content within the ZIP.

Content without a path is permitted. This includes resources that do not belong to the logical project hierarchy, such as dependencies identified through content inspection or at runtime, or engine-generated data.

## Object Storage

Embedded content is stored in the `objects/` directory using its content digest as the filename. The hashing algorithm is defined by the archive header.

```plaintext
objects/<content-digest>
```

### Deduplication

Identical bytes produce identical content digests and share the same object. Multiple content records may reference the same object, allowing content to be deduplicated throughout the archive.

## Example

A place contains a serialized place file (.rbxl), a script (.luau), and references to additional assets hosted on Roblox.

```plaintext
Place.rbx
├── manifest.jsonl
└── objects/
    ├── <place-digest>
    ├── <script-digest>
    └── <texture-digest>
```

manifest.jsonl

```plaintext
{"kind":"header","version":1,"digestAlgorithm":"<algorithm>"}
{"kind":"package","type":"place","place":"Place.rbxl"}
{"kind":"content","path":"Place.rbxl","objectDigest":"aaa..."}
{"kind":"content","path":"Scripts/Main.luau","objectDigest":"bbb..."}
{"kind":"content","path":"Models/Tree","asset":{"id":1818,"version":3}}
{"kind":"content","asset":{"id":2020,"version":1},"objectDigest":"ccc..."}
```

In this example:

- `Place.rbxl` identifies the serialized place content referenced by the package metadata.
- `Scripts/Main.luau` contains script source embedded within the archive.
- `Models/Tree` references a model hosted in the Roblox asset system.
- The final entry identifies an asset whose content is also embedded in the archive.

## Validation

Archive readers must validate:

- The ZIP container conforms to the archive requirements.
- `manifest.jsonl` is present and contains valid JSONL.
- The first record is a header, appearing exactly once.
- The header declares a supported version and hashing algorithm.
- A package record follows the header.
- All remaining records are content records.
- Content paths are valid and unique.
- Referenced embedded objects exist and match their content digests.
- Asset references are valid.

Archive readers must also enforce limits on decompressed size, entry count, and resource consumption to protect against ZIP-bombs and other resource-exhaustion attacks.

## Versioning and Extensibility

The header's `version` field identifies the archive manifest schema. Future versions may introduce additional record types or properties without changing the underlying ZIP container. Package metadata is specific to its content type, allowing places, models, experiences, and future content types to define their own requirements. The archive format does not prescribe how individual package types interpret their contents beyond the common package and content representation.
