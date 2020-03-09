using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace React.Sample.Webpack.CoreMvc
{
	public class Program
	{
		public static void Main(string[] args)
		{
			BuildWebHost(args).Run();
		}

		public static IWebHost BuildWebHost(string[] args) =>
			WebHost.CreateDefaultBuilder(args)
				.UseStartup<Startup>()
				.ConfigureServices((hostContext, service) =>
				{
					service.AddHostedService<WebpackDevServer>();
				})
				.Build();

		private class WebpackDevServer : BackgroundService
		{
			protected override Task ExecuteAsync(CancellationToken token)
			{
				if (Environment.OSVersion.Platform == PlatformID.Win32NT)
				{
					var devServer = Process.Start(new ProcessStartInfo
					{
						Arguments = "/c npm i && npm run build -- --watch",
						RedirectStandardError = false,
						RedirectStandardInput = false,
						RedirectStandardOutput = false,
						FileName = "cmd.exe"
					});

					token.Register(() => devServer?.Kill(true));
				}

				return Task.Delay(Timeout.Infinite, token);
			}
		}
	}
}
