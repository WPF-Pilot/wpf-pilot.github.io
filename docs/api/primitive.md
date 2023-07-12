---
id: primitive
sidebar_position: 3
---

# `Primitive`

A `Primitive` represents a property on the underlying WPF element. It could be a `string`, `int`, `bool`, `Guid`, `DateTime`, or similar low level type.

Common WPF types such as `FontWeight`, `Size`, `Thickness`, `Brush`, etc will be converted to their string representation.

## Methods

----
`+`, `-`, `*`, `!`, `<`, …

`Primitive` supports all standard operators, if the underlying type supports it.

**Usage**
```
var widthWithPadding = element["Width"] + 10;
var totalArea = element["Width"] * element["Height"];
var switchedToggle = !element["IsChecked"];
```
----
`T? To<T>()`

Casts the underlying `Primitive` value to `T?`. An exception is thrown if the underlying value cannot be cast to `T?`. In most cases, the `Primitive` can be used without casting it via `To`.

**Usage**
```
var username = element["UsernameText"].To<string>();
var isChecked = element["IsChecked"].To<bool>();
var visibility = element["Visibility"].To<Visibility>();
```