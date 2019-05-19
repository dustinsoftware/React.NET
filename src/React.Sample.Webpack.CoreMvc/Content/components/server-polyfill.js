import ChunkExtractor from '@loadable/server';

global.ChunkExtractor = ChunkExtractor;

function importScripts(filename) {
	// This might break if the file is huge
	Function(WebpackHelper.ReadFile(filename))();
}

global.importScripts = importScripts;

// // Allow local script debugging with Node
// global.WebpackHelper = global.WebpackHelper || {
// 	ReadFile: function(filename) {
// 		var fs = typeof require === 'function' ? require('fs') : null;
// 		var vm = typeof require === 'function' ? require('vm') : null;
// 		var code = fs.readFileSync(filename, 'utf-8');
// 		vm.runInThisContext(code, filename);
// 	},
// };
