const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');

const bundle = {
	entry: {
		main: ['./Content/components/expose-components.js'],
	},
	devtool: 'sourcemap',
	output: {
		filename: '[name].js',
		globalObject: 'this',
		path: path.resolve(__dirname, 'wwwroot/dist'),
		publicPath: 'dist/'
	},
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	optimization: {
		runtimeChunk: {
			name: 'runtime', // necessary when using multiple entrypoints on the same page
		},
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
					name: 'vendor',
					chunks: 'all',
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
	plugins: [
		new ManifestPlugin({
			fileName: 'asset-manifest.json',
			publicPath: 'dist/',
			generate: (seed, files, entrypoints) => {
			  const manifestFiles = files.reduce((manifest, file) => {
				manifest[file.name] = file.path;
				return manifest;
			  }, seed);
			  const entrypointFiles = entrypoints.main.filter(
				fileName => !fileName.endsWith('.map')
			  );
	
			  return {
				files: manifestFiles,
				entrypoints: entrypointFiles,
			  };
			},
		  }),
	]
};

module.exports = [
	{
		...bundle,
		target: 'web'
	},
	{
		devtool: bundle.devtool,
		entry: bundle.entry,
		mode: bundle.mode,
		module: bundle.module,
		target: 'node',
		output: {
			...bundle.output,
			path: path.resolve(__dirname, 'wwwroot/server/dist'),
			libraryTarget: 'commonjs',
		},
	}
]
