using System;
using System.IO;
using System.Text;
using JavaScriptEngineSwitcher.ChakraCore;
using JavaScriptEngineSwitcher.Core;
using Newtonsoft.Json.Linq;
using React;
using Xunit;

namespace React.Tests.Integration
{
    public class ServerRenderTests
    {
        [Fact]
        public void RendersSuccessfully()
        {
			Initializer.Initialize(registration => registration.AsSingleton());
			AssemblyRegistration.Container.Register<ICache, NullCache>();
			AssemblyRegistration.Container.Register<IFileSystem, SimpleFileSystem>();
			JsEngineSwitcher.Current.EngineFactories.Add(new ChakraCoreJsEngineFactory());
			JsEngineSwitcher.Current.DefaultEngineName = ChakraCoreJsEngine.EngineName;

			ReactSiteConfiguration.Configuration
				.SetReuseJavaScriptEngines(false)
				.AddScript("Sample.jsx");

			var stringWriter = new StringWriter(new StringBuilder(128));
			ReactEnvironment.GetCurrentOrThrow.CreateComponent("HelloWorld", new { name = "Tester" }, serverOnly: true).RenderHtml(stringWriter, renderServerOnly: true);
			Assert.Equal("<div>Hello Tester!</div>THIS SHOULD FAIL", stringWriter.ToString());
        }
    }
}