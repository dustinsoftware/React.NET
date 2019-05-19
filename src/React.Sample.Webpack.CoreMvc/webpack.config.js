const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin')

const componentBundle = {
	entry: {
		components: './Content/components/expose-components.js',
	},
	devtool: 'source-map',
	output: {
		filename: '[name].js',
		globalObject: 'this',
		path: path.resolve(__dirname, 'wwwroot/dist'),
		publicPath: 'dist/',
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
		new LoadablePlugin({
			filename: 'react-loadable.json',
			writeToDisk: true,
			publicPath: 'dist',
		}),
	],
};

const serverPolyfill = {
	entry: {
		['server-polyfill']: './Content/components/server-polyfill.js',
	},
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	devtool: 'source-map',
	output: {
		filename: '[name].js',
		globalObject: 'this',
		path: path.resolve(__dirname, 'wwwroot/server'),
	},
	node: {
		fs: 'empty' // this will break loadable-components inlining styles
	}
}

module.exports = [componentBundle, serverPolyfill];
