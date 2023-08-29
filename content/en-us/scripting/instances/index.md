---
title: Instances
description: Instances, or objects, are the building block of nearly every feature.
---

The most important data type are Instances, also referred to generally
as objects, because they are the figurative building block of nearly
every other feature. In Studio, they are visible and selectable in the
Explorer window.

## Classes

Each object is a member of a specific class which describes what kind of
object it is and the particular API members that it contains. Like
typical object-oriented inheritance structures, a subclass inherits all
the same API members from the superclass from which it derives.
"Instance" is also the name of the root class which houses the API
members that all objects have.

## Parents

Every instance contains a parent property which may point to a single
instance representing the object which contains it. An Instance is said
to be _parented to_ another Instance if its parent is set to it. For
nearly all kinds of objects, the class of parent matters: certain
objects must have certain parents, such as Attachments needing to be
within some kind of part.

## Hierarchy

The hierarchy of a place refers to the tree-like structure created by
the objects' parent relationships. This hierarchy is described using
parent-child-ancestor terminology. The root object of a place is the
DataModel, referred to in code as game. Objects that are direct children
of the DataModel (top-level) are game services, singletons with one
role, such as the Workspace or ServerScriptService.

## Attributes

Arbitrary named data can be attached to an instance using attributes.
They are edited at the bottom of the Properties window, and they are
saved to file. Attributes also replicate from server to client. The
GetAttribute(name) and SetAttribute(name, value) functions read/write
attributes, respectively. Nearly any kind of value may be an attribute,
but a notable exception is references to other instances.

## Tags

Tagging is a feature which allows you to classify instances using
strings. Unlike attributes, tags have no value: an instance either
**has** or does **not have** a tag. It is easy for scripts to keep track
of all instances with a certain tag. Generally, a tag is used to
describe a behavior so that some script can implement the behavior on
all instances with that tag. For example, a "Deadly" tag might be
applied to any part which kills humanoids that touch it. Tags also
replicate from server to client, but when they do _every_ tag on an
instance replicates, not just the one(s) added/removed.

- Discuss WaitForChild, WaitOnChild

If you use `Class.ReplicatedStorage` for LocalScripts, then you don't need
to use `WaitForChild`when requiring them, but if you put them in
`Class.StarterPlayerScripts` or `Class.StarterGui`, then you do.

If a BindableEvent or BindableFunction is created at runtime - for
instance, if you initially created it in `Class.StarterPlayerScripts` or
`Class.StarterGui` - then you need to use `WaitForChild` because the
