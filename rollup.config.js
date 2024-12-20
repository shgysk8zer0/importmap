import json from '@rollup/plugin-json';
const external = ['node:fs/promises', 'commander', 'node:path', '@shgysk8zer0/npm-utils/yaml.js', '@shgysk8zer0/npm-utils/json.js', '@shgysk8zer0/npm-utils/path.js', '@shgysk8zer0/polyfills'];
const plugins = [json({ preferConst: true })];

export default [{
	input: 'index.mjs',
	output: [{
		file: 'index.js',
		format: 'esm'
	}, {
		file: 'index.cjs',
		format: 'cjs'
	}],
	external,
	plugins,
}, {
	input: 'importmap.mjs',
	output: [{
		file: 'importmap.js',
		format: 'esm'
	}, {
		file: 'importmap.cjs',
		format: 'cjs'
	}],
	external,
	plugins,
}, {
	input: 'cli.mjs',
	output: [{
		file: 'cli.js',
		format: 'esm'
	}, {
		file: 'cli.cjs',
		format: 'cjs'
	}],
	external,
	plugins,
}];
