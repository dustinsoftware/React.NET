export const loaded = {};

export function init() {
	import('styled-components').then(loadedFile => {
		loaded.styled = loadedFile.default;
		global.Styled = loadedFile;
	});

	import('emotion-server').then(loadedFile => {
		loaded.EmotionServer = loadedFile.default;
		global.EmotionServer = loadedFile;
	});

	import('react-jss').then(loadedFile => {
		loaded.ReactJss = loadedFile.default;
		global.ReactJss = loadedFile;
	});
}
