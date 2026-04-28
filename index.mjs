import '@shgysk8zer0/polyfills';
import { readFile, writeFile } from 'node:fs/promises';
import { Importmap } from './imap.js';
import data from './importmap.json' with { type: 'json' };
import { sri, DEFAULT_ALGO } from './hash.js';
import { IMPORTMAP_EXP } from './consts.js';

export const imports = data.imports;
export const scopes = data.scopes;
export const importmap = new Importmap(data);

/**
 * @typedef {Object<string, string>} ImportMapSpecifiers
 */

/**
 * @typedef {Object} ImportMap
 * @property {ImportMapSpecifiers} [imports]
 * @property {Object<string, ImportMapSpecifiers>} [scopes]
 */

/**
 * @typedef {((this: any, key: string, value: any) => any) | (number | string)[] | null} JSONReplacer
 * @typedef {string | number | null} JSONSpace
 */

export const ENCODING = 'utf8';
export * as unpkg from './unpkg.js';

/**
 *
 * @param {ImportMap} importmap
 * @returns {ImportMap}
 */
export function mergeWithImportmap({ imports = {}, scopes = {}}) {
	return {
		imports: { ...importmap.imports, ...imports },
		scopes: { ...importmap.scopes, ...scopes },
	};
}

/**
 * @async
 * @param {string} path
 * @param {object} options
 * @param {ImportMap} [options.importmap]
 * @param {JSONReplacer} [options.replacer=null]
 * @param {JSONSpace} [options.spaces=2]
 * @param {AbortSignal} [options.signal]
 */
export async function createImportmapJSON(path = 'importmap.json', {
	importmap = { imports, scopes },
	replacer = null,
	spaces = 2,
	signal,
} = {}) {
	await writeFile(path, JSON.stringify(importmap, replacer, spaces), { encoding: ENCODING, signal });
}

/**
 *
 * @param {object} options
 * @param {ImportMap} [options.importmap]
 * @param {HashAlgorithmIdentifier} [options.algo="SHA-384"]
 * @param {JSONReplacer} [options.replacer=null]
 * @param {JSONSpace} [options.spaces]
 * @param {AbortSignal} [options.signal]
 * @returns {Promise<string>}
 */
export async function getImportmapIntegrity({
	importmap = { imports, scopes },
	algo = DEFAULT_ALGO,
	replacer,
	spaces,
} = {}) {
	return await sri(JSON.stringify(importmap, replacer, spaces), { algo });
}

/**
 *
 * @param {object} options
 * @param {ImportMap} [options.importmap]
 * @param {HashAlgorithmIdentifier} [options.algo="SHA-384"]
 * @param {string} [options.nonce]
 * @param {JSONReplacer} [options.replacer=null]
 * @param {JSONSpace} [options.spaces]
 * @param {AbortSignal} [options.signal]
 * @returns {Promise<string>}
 */
export async function getImportmapScript({
	importmap = { imports, scopes },
	algo = DEFAULT_ALGO,
	nonce = null,
	replacer,
	spaces,
} = {}) {
	const integrity = await getImportmapIntegrity({ importmap, algo, replacer, spaces });

	return typeof nonce === 'string' && nonce.length !== 0
		? `<script type="importmap" integrity="${integrity}" nonce="${nonce}">${JSON.stringify(importmap, replacer, spaces)}</script>`
		: `<script type="importmap" integrity="${integrity}">${JSON.stringify(importmap, replacer, spaces)}</script>`;
}

/**
 * Updates a `<script type="importmap" from an HTML file, writing the updated file back to disk
 *
 * @param {string} fileName The name of the file to update
 * @param {object} options
 * @param {HashAlgorithmIdentifier} [options.algo="SHA-384"] The algorithm to use for the `integrity` hash
 * @param {ImportMap} [options.importmap] Optional source immportmap object, defaults to library defined importmap
 * @param {JSONReplacer} [options.replacer]
 * @param {JSONSpace} [options.spaces]
 * @param {AbortSignal} [options.signal] Optional `AbortSignal` to abort during the read/write of the file
 * @returns {Promise<boolean>} Whether or not the upate was successful
 */
export async function updateImportmap(fileName = 'index.html', {
	algo = 'SHA-384',
	importmap,
	replacer,
	spaces,
	signal,
} = {}) {
	signal?.throwIfAborted();
	const file = await readFile(fileName, { encoding: 'utf-8', signal });
	const match = IMPORTMAP_EXP.exec(file);

	if (Array.isArray(match) && typeof match[0] === 'string') {
		const script = await getImportmapScript({ nonce: match.groups?.nonce, algo, importmap, replacer, spaces });
		await writeFile(fileName, file.replace(match[0], script), { signal });

		return true;
	} else {
		return false;
	}
}

export { Importmap };
