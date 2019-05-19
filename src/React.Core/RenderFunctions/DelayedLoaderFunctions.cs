using System;
using System.Collections.ObjectModel;
using System.IO;
using System.Text;
using Newtonsoft.Json;

namespace React.RenderFunctions
{
	///
	public class DelayedLoaderFunctions : RenderFunctionsBase
	{
		///
		public ReadOnlyCollection<string> RenderedScripts { get; private set; }


		///
		public override void PreRender(Func<string, string> executeJs)
		{
			executeJs($"var extractor = new ChunkExtractor({{ stats: {File.ReadAllText("./wwwroot/react-loadable.json")} }});");
		}

		///
		public override string WrapComponent(string componentToRender)
		{
			return $"extractor.collectChunks({componentToRender})";
		}

		///
		public override void PostRender(Func<string, string> executeJs)
		{
			// Hack
			executeJs($"var loadableJson = {File.ReadAllText("./wwwroot/react-loadable.json")};");
			RenderedScripts = JsonConvert.DeserializeObject<ReadOnlyCollection<string>>(executeJs(@"extractor.getScriptTags()"));
		}

	}
}
