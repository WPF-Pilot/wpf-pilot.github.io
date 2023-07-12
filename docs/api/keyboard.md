---
id: keyboard
sidebar_position: 4
---

# `Keyboard`

`Keyboard` is responsible for low level keyboard input. It exists as a property on `AppDriver`, `appDriver.Keyboard`.

## Methods

----
`void Press(params Key[] keys)`

Sends a key press message to the application. For modifier key support such as `Ctrl` and `Shift`, use `Keyboard.Hotkey` instead.

**Usage**
```csharp
appDriver.Keyboard.Press(Key.A, Key.B, Key.C);
```
----
`void Type(string text)`

Triggers a `TextCompositionEventArgs` on the currently focused element. This simulates typing on a keyboard.

**Usage**
```csharp
appDriver.Keyboard.Type("Hello world!");
```
----
`void Hotkey(ModifierKeys modifier, Key key)`

Sends a key press input to the application. Due to implementation details, this will bring the application to the foreground. If modifier key support is unneeded, consider using `Press` instead.

**Usage**
```csharp
appDriver.Keyboard.Hotkey(ModifierKeys.Control, Key.A);
```