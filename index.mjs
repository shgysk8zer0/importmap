import { writeFile } from 'node:fs/promises';
import { Importmap, importmap, imports, scopes } from './importmap.mjs';
import { sri, DEFAULT_ALGO } from './hash.js';

export const ENCODING = 'utf8';
export * as unpkg from './unpkg.js';

export function mergeWithImportmap({ imports = {}, scopes = {}}) {
	return {
		imports: { ...importmap.imports, ...imports },
		scopes: { ...importmap.scope, ...scopes },
	};
}

export async function createImportmapJSON(path = 'importmap.json', {
	importmap = { imports, scopes },
	spaces = 2,
	signal,
} = {}) {
	await writeFile(path, JSON.stringify(importmap, null, spaces), { encoding: ENCODING, signal });
}

export async function getImportmapIntegrity({
	importmap = { imports, scopes },
	algo = DEFAULT_ALGO,
} = {}) {
	return await sri(JSON.stringify(importmap), { algo });
}

export async function getImportmapScript({
	importmap = { imports, scopes },
	algo = DEFAULT_ALGO,
} = {}) {
	const integrity = await getImportmapIntegrity({ importmap, algo });
	return `<script type="importmap" integrity="${integrity}">${JSON.stringify(importmap)}</script>`;
}

export { importmap, imports, scopes, Importmap };
