import { writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import importmap from './importmap.json' with { type: 'json' };

export const { imports, scope } = importmap;

export const ENCODING = 'utf8';
export const ALGO = 'sha384';
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

export function getImportmapIntegrity({
	importmap = { imports, scope },
	algo = ALGO,
	encoding = ENCODING,
	spaces = 2,
} = {}) {
	const hash = createHash(algo);
	hash.update(JSON.stringify(importmap, null, spaces), encoding);
	return `${algo}-${hash.digest('base64')}`;
}

export function getImportMapScript({
	importmap = { imports, scope },
	algo = ALGO,
	spaces = 2,
} = {}) {
	const integrity = getImportmapIntegrity({ importmap, algo, spaces });
	return `<script type="importmap" integrity="${integrity}">${JSON.stringify(importmap, null, spaces)}</script>`;
}
