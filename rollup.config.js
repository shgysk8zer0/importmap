export default {
	input: 'index.js',
	external: ['node:fs/promises', 'node:crypto'],
	output: {
		file: 'index.cjs',
		format: 'cjs',
	},
};
