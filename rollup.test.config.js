/* eslint-env node */
import { getConfig } from '@shgysk8zer0/js-utils/rollup';
import { rollupImport, rollupImportMeta } from '@shgysk8zer0/rollup-import';
import { importmap } from './index.js';

export default getConfig('./test/index.js', {
	plugins: [
		rollupImport(importmap),
		rollupImportMeta({ baseURL: 'https://example.com/' }),
	],
	format: 'iife',
	minify: true,
	sourcemap: true,
});