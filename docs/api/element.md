---
id: element
sidebar_position: 2
---

# `Element`

An `Element` represents a WPF element within the current application visual tree. It can be interacted with and queried in all expected ways. An element is accessible via `GetElement(s)` on the `AppDriver` class.

The properties of an `Element` are automatically updated whenever there is a change in the application's state. For example, if additional text is entered into a field, the value of `input["Text"]` will be updated accordingly.

## Methods

----
`Element Click()`

Issues a full `Click` event using the left mouse button on the underlying WPF element, including `PreviewMouseDown`, `MouseDown` and then `PreviewMouseUp` and `MouseUp`. The `MouseDevice` will be properly hooked to read correct mouse down and mouse up values, as well as the `IsMouseOver` property on each element in the visual tree.

⚠️ The mouse position cannot be hooked and should not be relied on to calculate `IsMouseOver`. You may need to refactor your code to use the `IsMouseOver` property directly instead.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.Click();
```
----
`Element RightClick()`

Issues a full `Click` event using the right mouse button on the underlying WPF element including `PreviewMouseDown`, `MouseDown` and then `PreviewMouseUp` and `MouseUp`. The `MouseDevice` will be properly hooked to read correct mouse down and mouse up values, as well as the `IsMouseOver` property on each element in the visual tree.

⚠️ The mouse position cannot be hooked and should not be relied on to calculate `IsMouseOver`. You may need to refactor your code to use the `IsMouseOver` property directly instead.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.RightClick();
```
----
`Element DoubleClick()`

Raises a `MouseDoubleClickEvent` on the underlying WPF element using the left mouse button. The `MouseDevice` will be properly hooked to read correct mouse down and mouse up values, as well as the `IsMouseOver` property on each element in the visual tree.

⚠️ The mouse position cannot be hooked and should not be relied on to calculate `IsMouseOver`. You may need to refactor your code to use the `IsMouseOver` property directly instead.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.DoubleClick();
```
----
`Element Focus()`

Invokes `Focus()` on the underlying WPF element.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.Focus();
```
----
`Element Select()`

Sets the `IsSelected` property on the underlying WPF element to `true`. If the element is a `ListBoxItem` or the like, a subsequent selected event will be raised.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.Select();
```
----
`Element Expand()`

Sets the `IsExpanded` property on the underlying WPF element to `true`. If the element is a `Expander` or the like, a subsequent expanded event will be raised.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.Expand();
```
----
`Element Collapse()`

Sets the `IsExpanded` property on the underlying WPF element to `false`. If the element is a `Expander` or the like, a subsequent collapsed event will be raised.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.Collapse();
```
----
`Element SelectText(string text)`

Finds the given `text` on the underlying WPF element and sets the `SelectionStart` and the `SelectionLength` to match. If the `text` cannot be found, `SelectedText` is set instead, which appends the given `text` on the control and then selects it. If the element is a `TextBox` or the like, subsequent selection changed events will be raised.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.SelectText("Hello world");
```
----
`Element Check()`

Sets the `IsChecked` property on the underlying WPF element to `true`. If the element is a `CheckBox` or the like, a subsequent checked event will be raised.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.Check();
```
----
`Element Uncheck()`

Sets the `IsChecked` property on the underlying WPF element to `false`. If the element is a `CheckBox` or the like, a subsequent unchecked event will be raised.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.Uncheck();
```
----
`Element ScrollIntoView()`

Invokes `BringIntoView()` on the underlying WPF element.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.ScrollIntoView();
```
----
`Element Type(string text)`

Invokes `Focus()` and then `PreviewTextInputEvent` on the underlying WPF element with the given `text`. For most controls, this will simulate typing.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.Type("My New Username");
```
----
`Element Screenshot(string fileOutputPath)`

Takes a screenshot of the underlying WPF element and saves it to `fileOutputPath`. The code will briefly wait for the element to be visually stable before taking a screenshot.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.Screenshot(@"C:\images\element.png");
element.Screenshot(@"%TEMP%\result.jpg");
```
----
`Element Screenshot(out byte[] screenshotBytes, ImageFormat format = ImageFormat.Jpeg)`

Takes a screenshot of the underlying WPF element as `screenshotBytes`. The code will briefly wait for the element to be visually stable before taking a screenshot.

The current element is returned to allow chaining methods.

**Usage**
```csharp
// jpg
element.Screenshot(out var bytes);
File.WriteAllBytes(@"C:\test-pic.jpg", bytes);

// png
element.Screenshot(out var bytes, ImageFormat.Png);
File.WriteAllBytes(@"C:\result.png", bytes);
```
----
`byte[] Screenshot(ImageFormat format = ImageFormat.Jpeg)`

Takes a screenshot of the underlying WPF element and returns it as an array of `bytes`. The code will briefly wait for the element to be visually stable before taking a screenshot.

**Usage**
```csharp
var bytes = element.Screenshot();
File.WriteAllBytes(@"%TEMP%\output.jpg", bytes);
```
----
`Element RaiseEvent<TInput>(Expression<Func<TInput, RoutedEventArgs>> code)`

Invokes `RaiseEvent` on the underlying WPF element using the given `code` expression to generate the input `RoutedEventArgs`. If the underlying WPF element does not have any handlers for the given event, and it is a `direct` routed event, it will iterate up the visual tree for a more appropriate target. If it cannot find one, the original element is used. The `MouseDevice` and `IsMouseOver` properties will be properly hooked if a mouse event is raised.

`TInput` specifies the type of the underlying WPF element. `UIElement` can be used if it is irrelevant.

The current element is returned to allow chaining methods.

**Usage**
```csharp
// Raise event with `MouseButtonEventArgs`
element.RaiseEvent<UIElement>(_ => new MouseButtonEventArgs(
    Mouse.PrimaryDevice,
    Environment.TickCount,
    MouseButton.Left)
    {
        RoutedEvent = Control.MouseDoubleClickEvent,
    });

// Raise event with `TextCompositionEventArgs` on the underlying `TextBox`.
element.RaiseEvent<TextBox>(x => new TextCompositionEventArgs(
    Keyboard.PrimaryDevice,
    new TextComposition(InputManager.Current, x, x.Text + " Append some text!"))
    {
        RoutedEvent = UIElement.PreviewTextInputEvent,
        Source = Keyboard.PrimaryDevice.FocusedElement,
    });
```
----
`TOutput Invoke<TInput, TOutput>(Expression<Func<TInput, TOutput>> code)`

Invokes the given `code` expression on the underlying WPF element and returns the result if it is serializable, or `null` if it is not.

`TInput` specifies the type of the underlying WPF element.

`TOutput` specifies the type of the result.

**Usage**
```csharp
var formId = element.Invoke<MyCustomControl, Guid>(x => x.GetFormId());
var richText = element.Invoke<RichTextEditor, string>(x => x.NormalizedRichText);

// Execute a private method on the underlying WPF element.
// `Invoke` is a WPF Pilot convenience extension method for executing private methods.
// There is also `Field` and `Property` for private fields and properties.
var registrationDate = element.Invoke<Calendar, DateTime>(x => x.Invoke<DateTime>("GetRegistrationDate"));
```
----
`Element Invoke<TInput, TOutput>(Expression<Func<TInput, TOutput>> code, out TOutput? result)`

Invokes the given `code` expression on the underlying WPF element and returns the result to `result` if it is serializable, or `null` if it is not.

`TInput` specifies the type of the underlying WPF element.

`TOutput` specifies the type of the result.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.Invoke<MyCustomControl, Guid>(x => x.GetFormId(), out var result);
```
----
`Element Invoke(Expression<Action<UIElement>> code)`

Invokes the given `code` expression on the underlying WPF element.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.Invoke(x => x.Focus());
```
----
`Element Invoke<TInput>(Expression<Action<TInput>> code)`

Invokes the given `code` expression on the underlying WPF element.

`TInput` specifies the type of the underlying WPF element.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.Invoke<MyCoolControl>(x => x.ResetState());
```
----
`TOutput InvokeAsync<TInput, TOutput>(Expression<Func<TInput, Task<TOutput>>> code)`

Invokes the given  async `code` expression on the underlying WPF element and returns the awaited result if it is serializable, or `null` if it is not.

`TInput` specifies the type of the underlying WPF element.

`TOutput` specifies the type of the result.

It is not possible to call `await` within an expression, it will be handled by the `Element` for you.

**Usage**
```csharp
var formId = element.InvokeAsync<MyCustomControl, Guid>(x => x.GetFormIdAsync());
var richText = element.InvokeAsync<RichTextEditor, string>(x => x.FetchInitialAsync());
```
----
`Element InvokeAsync<TInput, TOutput>(Expression<Func<TInput, Task<TOutput>>> code, out TOutput? result)`

Invokes the given async `code` expression on the underlying WPF element and returns the awaited result to `result` if it is serializable, or `null` if it is not.

`TInput` specifies the type of the underlying WPF element.

`TOutput` specifies the type of the result.

It is not possible to call `await` within an expression, it will be handled by the `Element` for you.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.InvokeAsync<MyCustomControl, Guid>(x => x.GetFormIdAsync(), out var formId);
```
----
`Element InvokeAsync(Expression<Func<UIElement, Task>> code)`

Invokes the given async `code` expression on the underlying WPF element.

It is not possible to call `await` within an expression, it will be handled by the `Element` for you.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.InvokeAsync(x => x.ResetControlDataAsync());
```
----
`Element InvokeAsync<TInput>(Expression<Func<TInput, Task>> code)`

Invokes the given async `code` expression on the underlying WPF element.

`TInput` specifies the type of the underlying WPF element.

It is not possible to call `await` within an expression, it will be handled by the `Element` for you.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.InvokeAsync<MyCustomControl>(x => x.MyCoolMethodAsync());
```
----
`Element SetProperty(string propertyName, object? value)`

Sets the given `propertyName` to the given `value` on the underlying WPF element. The `value` must be serializable.

The current element is returned to allow chaining methods.

**Usage**
```csharp
element.SetProperty("IsPressed", true);
element.SetProperty("Text", "Hello world!");
```
---
`Element SetProperty<TInput, TOutput>(string propertyName, Expression<Func<TInput, TOutput>> getValue)`

Sets the given `propertyName` to the result of `getValue` on the underlying WPF element.

`TInput` specifies the type of the underlying WPF element.

`TOutput` specifies the type of the result.

The current element is returned to allow chaining methods.

**Usage**
```csharp
// Toggle the check box.
element.SetProperty<CheckBox, bool>("IsChecked", x => !x.IsChecked);
```
----
`Element Assert(Expression<Func<Element, bool?>> predicateExpression)`

Executes the given `predicateExpression` and throws a test framework specific assertion exception if the condition is not met. For example, if the test is run using `NUnit`, an `NUNit` assertion exception will be thrown. If the test is run using `XUnit`, an `XUnit` assertion exception will be thrown.

If the condition is not met, detailed exception info will be generated, including what the values were and what the expected output was.

The current element is returned to allow chaining methods.

**Usage**
```csharp
// Simple `Assert`.
element.Click().Assert(x => x["Text"] == "I was clicked!");
```
---
`bool HasProperty(string propName)`

Returns whether the underlying WPF element has a given property. Note the result is still `true` even if the _value_ is `null`.

**Usage**
```csharp
// False.
var hasProp = element.HasProperty("NonExistentProp");

// True.
var hasProp = element.HasProperty("Text");
```
---
`Primitive this[string propName]`

Returns a `Primitive` representing the underlying property.

**Usage**
```csharp
var text = element["Text"];
var isChecked = element["IsChecked"];

Assert.AreEqual("Hello world", text);
Assert.AreEqual(true, isChecked);
```
----
`string TypeName`

Returns the name of the underlying WPF element type.

**Usage**
```csharp
// True.
Assert.AreEqual(nameof(Button), buttonElement.TypeName);

// True.
Assert.AreEqual(nameof(CustomControl), customControlElement.TypeName);
```
----
`Element? Parent`

Returns the `Parent` element, or `null` if it is the root element.

**Usage**
```csharp
var parentTypeName = element.Parent.TypeName;
element.Parent.Click();
```
----
`IReadOnlyList<Element> Child`

Returns a list of child elements, or an empty list if there are none.

**Usage**
```csharp
element.Child[0].Click();
element.Child[1].Assert(x => x.TypeName == nameof(Border));
```