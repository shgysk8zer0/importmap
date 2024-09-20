import { writeFile } from 'node:fs/promises';
import * as importmap from './importmap.mjs';
import { sri, DEFAULT_ALGO } from './hash.js';

export const { imports, scope } = importmap;
export const ENCODING = 'utf8';
export { importmap };
export * as unpkg from './unpkg.js';

export function mergeWithImportmap({ imports = {}, scope = {}}) {
	return {
		imports: { ...importmap.imports, ...imports },
		scope: { ...importmap.scope, ...scope },
	};
}

export async function createImportmapJSON(path = 'importmap.json', {
	importmap = { imports, scope },
	spaces = 2,
	signal,
} = {}) {
	await writeFile(path, JSON.stringify(importmap, null, spaces), { encoding: ENCODING, signal });
}

export async function getImportmapIntegrity({
	importmap = { imports, scope },
	algo = DEFAULT_ALGO,
} = {}) {
	return await sri(JSON.stringify(importmap), { algo });
}

export async function getImportmapScript({
	importmap = { imports, scope },
	algo = DEFAULT_ALGO,
} = {}) {
	const integrity = await getImportmapIntegrity({ importmap, algo });
	return `<script type="importmap" integrity="${integrity}">${JSON.stringify(importmap)}</script>`;
}
