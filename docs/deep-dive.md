---
id: deep-dive
sidebar_position: 3
---

# WPF Pilot Deep Dive

This reference document will go over how the WPF Pilot life cycle works from end to end, as well as interesting things of note along the way.

We'll go over, in detail, how a simple test like this runs,
```csharp
[Test]
public void EndToEndTest()
{
    using var appDriver = AppDriver.Launch(@"..\MyApp.exe");
    var screen = appDriver.GetElement(x => x["Name"] == "Screen");
    screen.Invoke<Screen>(x => x.ClearForms())
        .Click()
        .Assert(x => x.IsFocused);
}
```

First, we note none of the methods in the entire `WpfPilot` library are `async` or return `Tasks`. Not even `InvokeAsync`, or `RunCodeAsync`, they are called like so,
```csharp
var result = element.InvokeAsync<MyCustomControl>(x => x.MyAsyncMethod());
appDriver.RunCodeAsync(_ => AppManager.InitializeAsync());
```

This is a deliberate design decision to keep the mental model simple. Concurrent and parallel models are more prone to bugs from the added complexity.

1. `AppDriver.Launch` will launch the given exe using the standard `Process` module. The `AppDriver` will then attempt to inject the `WpfPilot.dll` payload into the launched process. This uses a technique called [DLL injection](https://en.wikipedia.org/wiki/DLL_injection) which allows arbitrary code execution in the given process, as well as access to all of the objects and memory of the process. The steps are a bit more convulated due to inherient complexity.
    1. The `AppDriver` will launch `WpfPilot.Injector.exe` from the `WpfPilotResources` folder, compiled in either `x86` or `x64` depending on the process's underlying architecture. The injector needs to match the process's architecture to successfully inject the `dll` payload.
    1. The initial `dll` injected is a compiled C++ `dll`, either `injector.x64.dll` or `injector.x86.dll`.
    1. The above `dll` then injects the `WpfPilot.dll` and is unloaded from the process.
1. Once the `WpfPilot.dll` is injected, it loads all its required dependencies into the process. This includes things like `Newtonsoft.Json` and `Lib.Harmony`.
1. `WpfPilot.dll` then sets up a `NamedPipeServer` and a command loop. The test suite can now connect to this `NamedPipe` and issue commands.
1. `GetElement` issues a `GetVisualTreeCommand` to the app using the above `NamedPipe`. The `GetVisualTreeCommand` serializes the entire WPF visual tree and sends it over the `NamedPipe`. This may sound slow, but is incredibly fast, usually within tens of milliseconds on small apps, or hundreds of milliseconds on larger apps.
1. Once the visual tree is received, the matcher is applied to all elements. If there is a match, it is returned, otherwise subsequent `GetVisualTreeCommands` are issued until a `TimeoutException` is thrown. All returned elements are tracked by `AppDriver` and refreshed anytime an action is taken. This means if the text of some element is changed, there is no need to call another `GetElement` to get the updated text.
    ```csharp
    var textBox = GetElement(x => x["Name"] == "MyTextBox");
    var textInitial = textBox["Text"]; // Empty string.
    textBox.Type("Hello world!");
    var textNow = textBox["Text"]; // `Hello world!` string.
    ```
1. Now that we have a reference to the `screen` element, we can issue commands on it using our existing `NamedPipe`. `Invoke` issues an `InvokeCommand` on the target element and is one of the most flexible and useful methods in WPF Pilot. `Invoke` expects a `LambdaExpression`, which will typically look like a plain old function call, as seen in the example. There are many flavors of `Invoke` depending on if we care about the result, if we need to specify a custom element, or if we need to call an `async` method. The `LambdaExpression` is serialized into a JSON representation and sent over the `NamedPipe`. The app then compiles the `LambdaExpression` and invokes it on the element. The result is then serialized and returned over the `NamedPipe` back to the client. Most standard classes will be serializable by `Newtonsoft.Json`, but not all are, in which case `null` is returned.
    ```csharp
    // If we know the underlying element is a `MyControl` and we want the result.
    var userId = element.Invoke<MyControl, int>(x => x.CurrentUserId);

    // Alternate version for chaining.
    element.Invoke<MyControl, int>(x => x.CurrentUserId, out var userId);

    // If we know the underlying element is a `MyControl`,
    // and the result is `void` or we do not care about it.
    element.Invoke<MyControl>(x => x.RefreshPixels());

    // The default is a `UIElement` with no result.
    element.Invoke(x => x.Focus());
    ```
1. `Click` issues a `ClickCommand` on the `screen` element. The `ClickCommand` is a little complicated. WPF uses the mouse coordinates on some elements, such as `Button` and `MenuItem`, to determine if a click event should be raised. Because mouse coordinates cannot be mocked in WPF for security reasons, WPF Pilot hooks the methods of many built-in WPF controls using `Lib.Harmony` and rewrites them to not check the mouse coordinates. WPF Pilot also hooks the `MouseDevice` class to fake the mouse button statuses, as they are also commonly checked in event handlers. By hooking, we are referring to rewriting the IL code at runtime, which is a powerful method to change program behavior. It is typically used by game mods to change behavior of video games without direct access to the source code. The `ClickCommand` then issues the standard mouse down and mouse up events on the target element.
1. Once the `ClickCommand` is done executing, `AppDriver` refreshes all elements, as the click action may have changed the UI in some way. `AppDriver` will always refresh the UI elements after an action is taken, as it keeps the `Element` properties and app in sync. If you need to force a re-sync you can issue any command and the visual tree will refresh.
1. Finally we chain an `Assert` to the end. `Assert` is a useful utility method that checks the given expression and throws a test framework specific assertion failure if it does not pass. It uses reflection to determine the current test framework context, which is typically `NUnit`, `xUnit`, or the like. If the assertion does not pass, detailed result information is printed, including what the value was, what it was expected to be, and more. The biggest drawback of `Assert` is it requires an expression, not a standard lambda, so not all modern C# features are supported within. The compiler will warn about such cases.

For an even deeper look, the complete source code is available [here](https://github.com/WPF-Pilot/WpfPilot).