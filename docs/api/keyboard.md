---
id: keyboard
sidebar_position: 4
---

# `Keyboard`

`Keyboard` is responsible for low level keyboard input. It exists as a property on `AppDriver`, `appDriver.Keyboard`.

## Methods

----
`void Press(params Key[] keys)`

Simulates sending the given keys to the application. This is especially useful for non-WPF UI that `AppDriver` cannot access. For example, a usual Win32 dialog triggered by the application can be interacted with using `appDriver.Keyboard.Press(Key.Tab)` to tab through options and `appDriver.Keyboard.Press(Key.Enter)` to select one.

**Usage**
```csharp
appDriver.Keyboard.Press(Key.A, Key.B, Key.C);
appDriver.Keyboard.Press(Key.LeftCtrl, Key.B); // Holds control for the other keys.
```
----
`void Type(string text)`

Simulates typing on a keyboard.

**Usage**
```csharp
appDriver.Keyboard.Type("Hello world!");
```
