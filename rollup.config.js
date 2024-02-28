import json from '@rollup/plugin-json';

export default {
	input: 'index.js',
	output: [{
		file: 'index.mjs',
		format: 'esm'
	}, {
		file: 'index.cjs',
		format: 'cjs'
	}],
	external: ['node:fs/promises', 'node:crypto', '@shgysk8zer0/npm-utils/yaml.js', '@shgysk8zer0/npm-utils/json.js', '@shgysk8zer0/npm-utils/path.js'],
	plugins: [json({ preferConst: true })],
};
