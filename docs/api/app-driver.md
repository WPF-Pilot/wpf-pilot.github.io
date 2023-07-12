---
id: app-driver
sidebar_position: 1
---

# `AppDriver`

The `AppDriver` is responsible for:

- Launching the application being tested.
- Finding `Elements` in the visual tree.
- Providing `Keyboard` access.
- Taking pictures of the application.
- Recording screencaps.
- Executing code within the running app.

## Methods

----
`void Dispose()`

Closes the application under test. `Dispose` is typically not called directly.

**Usage**
```csharp
// Calls Dispose implicitly.
using var appDriver = AppDriver.Launch("./MyApp.exe");

// Calls Dispose directly.
appDriver.Dispose();
```

----
`static AppDriver Launch(string exePath, string? args = null)`

Launches the application using the given `exePath`. Passes the `args` through to the application as standard command-line args. Enviroment variables such as `%temp%` are properly expanded.

**Usage**
```csharp
using var appDriver = AppDriver.Launch(@"..\..\bin\Debug\MyApp.exe", @"--debug --verbose");
using var appDriver = AppDriver.Launch(@"%ProgramFiles%\CoolApp\ACoolApp.exe");
```
----
`static AppDriver Launch(ProcessStartInfo processStartInfo)`

Launches the application using the given `processStartInfo`. This is useful for more complicated scenarios that require setting environment variables and the like.

**Usage**
```csharp
var p = new ProcessStartInfo(@"C:\Path\To\MyApp.exe");
p.Environment.Add("TEST_MODE", "true");
p.WorkingDirectory = @"C:\TestEnvironment";
using var appDriver = AppDriver.Launch(p);
```
----
`static AppDriver AttachTo(int processId)`

Attaches the `AppDriver` to an existing process using the given `processId`. This is useful for scenarios where you want to handle the application launch process yourself.

**Usage**
```csharp
var p = Process.Start(new ProcessStartInfo(@"C:\Path\To\MyApp.exe"));
using var appDriver = AppDriver.AttachTo(p.Id);
```
----
`static AppDriver AttachTo(string processName)`

Attaches the `AppDriver` to an existing process using the given `processName`. This is useful for scenarios where you want to handle the application launch process yourself.

**Usage**
```csharp
using var appDriver = AppDriver.AttachTo("MyCoolAppName");
```
----
`Element GetElement(Func<Element, bool?> matcher, int timeoutMs = 30_000)`

Returns the first element using the given `matcher` function with a time limit of `timeoutMs`. The default timeout is 30 seconds. The application is queried for its visual tree and each element is checked against the given `matcher` function. If none of the elements meet the criteria, the application is given time to update before being queried again.

A `TimeoutException` is thrown if no element matching the criteria is found within the given time limit.

**Usage**
```csharp
// Find the root element.
var root = appDriver.GetElement(x => x.Parent is null);

// Find an input box by text.
var input = appDriver.GetElement(x => x["Text"] == "Enter an email.");

// Find a button by width and height.
var button = appDriver.GetElement(x => x["Width"] == 40 && x["Height"] == 40);

// Find a text box by name.
var textBox = appDriver.GetElement(x => x["Name"] == "AccountStatus");
```
----
`T GetElement<T>(Func<Element, bool?> matcher, int timeoutMs = 30_000)`

Returns the first element using the given `matcher` function with a time limit of `timeoutMs`. The default timeout is 30 seconds. The application is queried for its visual tree and each element is checked against the given `matcher` function. If none of the elements meet the criteria, the application is given time to update before being queried again.

`T` allows plugging in a custom `Element` class, eg `GetElement<MyCustomElement>`.

A `TimeoutException` is thrown if no element matching the criteria is found within the given time limit.

**Usage**
```csharp
// Find the root element.
var root = appDriver.GetElement<MyApp>(x => x.Parent is null);

// Find an input box by text.
var input = appDriver.GetElement<CustomInput>(x => x["Text"] == "Enter an email.");
```
----
`IReadOnlyList<Element> GetElements(Func<Element, bool?> matcher, int timeoutMs = 30_000)`

Returns **all** elements using the given `matcher` function with a time limit of `timeoutMs`. The default timeout is 30 seconds. The application is queried for its visual tree and each element is checked against the given `matcher` function. If none of the elements meet the criteria, the application is given time to update before being queried again. If even a single element matches the given criteria, the result is returned.

An empty list is returned if no elements matching the criteria are found within the given time limit.

**Usage**
```csharp
var elements = appDriver.GetElements(x => x["Name"].StartsWith("ListItem"));
```
----
`IReadOnlyList<T> GetElements<T>(Func<Element, bool?> matcher, int timeoutMs = 30_000)`

Returns **all** elements using the given `matcher` function with a time limit of `timeoutMs`. The default timeout is 30 seconds. The application is queried for its visual tree and each element is checked against the given `matcher` function. If none of the elements meet the criteria, the application is given time to update before being queried again. If even a single element matches the given criteria, the result is returned.

`T` allows plugging in a custom `Element` class, eg `GetElements<MyCustomElement>`.

An empty list is returned if no elements matching the criteria are found within the given time limit.

**Usage**
```csharp
var elements = appDriver.GetElements<ListItem>(x => x["Name"].StartsWith("ListItem"));
```
----
`void Screenshot(string fileOutputPath)`

Takes a screenshot of the app and saves it to the given path. The `AppDriver` will briefly attempt to wait for the app to be idle before taking the screenshot.

**Usage**
```csharp
appDriver.Screenshot(@"C:\pics\app-snap.png");
appDriver.Screenshot(@"%TEMP%\app-snap.png");
```
----
`byte[] Screenshot(ImageFormat format = ImageFormat.Jpeg)`

Takes a screenshot of the app. Returns the bytes of the image. The `AppDriver` will briefly attempt to wait for the app to be idle before taking the screenshot.

**Usage**
```csharp
var bytes = appDriver.Screenshot();
File.WriteAllBytes(@"C:\test-pic.jpg", bytes);
```
----
`static IDisposable Record(string fileOutputPath, string? windowTitle = null)`

Records the window with the given title, or the fullscreen if `null` is passed. Returns an IDisposable that stops recording when disposed.
The recording must be stopped (disposed), or the recording will be corrupt. Only one recording at a time is allowed; multiple calls will end the original recording.

**Usage**
```csharp
using var recordWindow = AppDriver.Record(@"C:\videos\test-vid.mp4", appDriver.Process.MainWindowTitle);
using var recordFullscreen = AppDriver.Record(@"C:\videos\test-vid.mp4");
```
----
`T? RunCode<T>(Expression<Func<Application, T>> code)`

Runs the given expression within the context of the application. Returns the result of the expression if it is serializable, otherwise returns `null`.
The `Application.Current` is passed as the first parameter to the expression.

**Usage**
```csharp
// Get the main window name.
var windowName = appDriver.RunCode(app => app.MainWindow.Name);

// Execute a private method on a global singleton.
// `Invoke` is a WPF Pilot convenience extension method for executing private methods.
var appWarningCount = appDriver.RunCode(_ => MyCustomContext.Invoke<int>("GetWarningCount"));

// Query a private property on a global singleton.
// `Property` is a WPF Pilot convenience extension method for querying private properties.
var appStartTime = appDriver.RunCode(_ => MyCustomContext.Property<DateTime>("StartTime"));

// Query a private field on a global singleton.
// `Field` is a WPF Pilot convenience extension method for querying private fields.
var userId = appDriver.RunCode(_ => GlobalLogger.Field<string>("m_currentUserId"));
```
----
`void RunCode(Expression<Action<Application>> code)`

Runs the given expression within the context of the application.
The `Application.Current` is passed as the first parameter to the expression.

**Usage**
```csharp
appDriver.RunCode(app => app.MainWindow.Focus());
appDriver.RunCode(_ => ScreenManager.SwitchToDarkMode());
appDriver.RunCode(_ => GlobalCache.Clear());
```
----
`T? RunCodeAsync<T>(Expression<Func<Application, Task<T>>> code)`

Runs the given async expression within the context of the application. Returns the awaited result of the expression if it is serializable, otherwise returns `null`.
The `Application.Current` is passed as the first parameter to the expression.

It is not possible to call `await` within an expression, it will be handled by the `AppDriver` for you.

**Usage**
```csharp
var userProfile = appDriver.RunCodeAsync(_ => UserManager.GetUserProfileAsync());
var flushResult = appDriver.RunCodeAsync(_ => DiskManager.FlushCacheAsync());
```
----
`void RunCodeAsync<T>(Expression<Func<Application, Task>> code)`

Runs the given async expression within the context of the application.
The `Application.Current` is passed as the first parameter to the expression.

It is not possible to call `await` within an expression, it will be handled by the `AppDriver` for you.

**Usage**
```csharp
appDriver.RunCodeAsync(_ => AppStartup.DoStepsAsync());
```
----
`Keyboard Keyboard`

Returns the `Keyboard` instance associated with the `appDriver`.

**Usage**
```csharp
appDriver.Keyboard.Type("Hello world");
```
----
`Process Process`

Returns the `Process` associated with the `appDriver`.

**Usage**
```csharp
var processId = appDriver.Process.Id;
```