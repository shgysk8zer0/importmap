import { getConfig } from '@shgysk8zer0/js-utils/rollup';

export default getConfig('./index.js', {
	external: ['node:fs/promises', 'node:crypto'],
	format: 'cjs',
	sourcemap: false,
	minify: false,
});
