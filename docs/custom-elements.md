---
id: custom-elements
sidebar_position: 2
---

# Creating Custom Elements

In this guide, we'll go over a custom `WebView2Element` which will allow us to control an underlying `WebView2` control.

We'll look at the [`WpfWebView2Sample` repo](https://github.com/WPF-Pilot/WpfWebView2Sample).

```sh
git clone https://github.com/WPF-Pilot/WpfWebView2Sample.git
```

The standard `Element` class has many built in methods, such as `Click`, `Type`, and more. If we need more, it is possible to create custom `Elements` by inheriting from `Element<T>` on .NET 5+ or `Element` on older frameworks.

`Element<T>` requires .NET 5+ because it uses covariant types, which is a C# 9.0 feature. However inheriting from `Element` works too, but the interface will not be fluent. This means it will not be possible to chain your custom methods with the base methods, eg `myCustomElement.Click().MyCustomMethod()` will not work, because `Click` will return the base `Element` class.

Looking in `tests/WpfWebView2Sample.UITests/WebView2Element.cs`, we see a barebones implementation,

```csharp
class WebView2Element : Element<WebView2Element>
{
    public WebView2Element(Element element) : base(element)
    {
        if (element.TypeName != nameof(WebView2))
            throw new InvalidOperationException($"Element is not a `{nameof(WebView2)}`.");
    }

    public WebView2Element WaitForElement(string elementId)
    {
        while (true)
        {
            var isElementNull = InvokeAsync<WebView2, string>(x => x.CoreWebView2.ExecuteScriptAsync($@"document.getElementById('{elementId}') == null"));
            if (isElementNull == "false")
                break;
        }

        return this;
    }

    public WebView2Element ClickById(string elementId) =>
        InvokeAsync<WebView2>(x => x.CoreWebView2.ExecuteScriptAsync($"document.getElementById('{elementId}').click()"));

    public WebView2Element GetElementInnerHtmlById(string elementId, out string html) =>
        InvokeAsync<WebView2, string>(x => x.CoreWebView2.ExecuteScriptAsync($"document.getElementById('{elementId}').innerHTML"), out html!);

    public WebView2Element NavigateTo(string url) =>
        Invoke<WebView2>(x => x.CoreWebView2.Navigate(url));
}
```

Going over each part, we start by inheriting from `Element<WebView2Element>`. We need a constructor with the signature `public T(Element element)`, and pass the `element` to the base class. Recall if we want to retrieve our custom element, we use `GetElement<WebView2Element>`. `GetElement` will look for a constructor that matches the above signature, and pass the `element` to it. If it cannot find one, it will throw an exception. We add additional validation in the constructor to make sure the underlying element is the proper type.

Using `Invoke` and `InvokeAsync`, we can construct a cohesive interface that simplifies usage from our tests. This interface and implementation leave a lot to be desired. For example, it is cumbersome to have consumers manage element loading via `WaitForElement`, and `WaitForElement` does not have timeout logic, but it still demonstrates the usefulness of custom `Elements`.

Note the return type of each method is `WebView2Element` to keep the interface fluent and chainable,
```csharp
element.NavigateTo("https://example.com")
    .WaitForElement("cool-element")
    .ClickById("cool-element");
```

This is not strictly necessary, but is generally a more pleasant interface.

Finally, putting it all together, we have a basic UI test in `tests/WpfWebView2Sample.UITests/WpfWebView2SampleTests.cs`,

```csharp
[Test]
public void TestWebView2()
{
    using var appDriver = AppDriver.Launch(@"..\..\..\..\..\src\bin\Debug\net7.0-windows\WpfWebView2Sample.exe");

    var webView2 = appDriver.GetElement<WebView2Element>(x => x["Name"] == "webView");
    webView2.NavigateTo("https://wpfpilot.dev");
    webView2.WaitForElement("get-started");

    // Change the target="_blank" for testing purposes.
    webView2.InvokeAsync<WebView2, string>(x => x.CoreWebView2.ExecuteScriptAsync("document.getElementById('get-started').target = ''"));

    webView2.ClickById("get-started");

    webView2.WaitForElement("tutorial-id");
    webView2.GetElementInnerHtmlById("__docusaurus", out var html);

    Assert.True(html.Contains("Tutorial"));
}
```

If we run the test, it does what we expect and passes. That's all there is to it!