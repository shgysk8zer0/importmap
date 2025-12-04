import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import json from './importmap.json' with { type: 'json' };
import { SHA256, SHA384, SHA512, DEFAULT_ALGO, BASE64 } from './hash.js';

const { imports, scopes } = json;

export class Importmap {
	#imports = {};
	#scopes = {};

	constructor({ imports: i = imports, scopes: s = scopes } = {}) {
		this.#imports = i;
		this.#scopes = s;
	}

	get imports() {
		return structuredClone(this.#imports);
	}

	get scopes() {
		return structuredClone(this.#scopes);
	}

	delete(key) {
		return Reflect.deleteProperty(this.#imports, key);
	}

	get(key) {
		return Reflect.get(this.#imports, key);
	}

	has(key) {
		return Reflect.has(this.#imports, key);
	}

	set(key, newValue) {
		return Reflect.set(this.#imports, key, newValue);
	}

	toJSON() {
		return { imports: this.#imports, scopes: this.#scopes };
	}

	toString() {
		return JSON.stringify(this);
	}

	async importLocalPackage(name = 'package.json', { signal } = {}) {
		const path = join(process.cwd(), name);
		const pkg = await readFile(path, { encoding: 'utf8', signal });

		return this.setLocalPackage(JSON.parse(pkg));
	}

	setLocalPackage({ name, module, exports = {} }) {
		if (typeof name !== 'string') {
			return false;
		} else if (typeof exports === 'string' ) {
			this.set(name, exports);
			return true;
		} else if (typeof exports === 'object') {
			Object.entries(exports).forEach(([key, value]) => {
				if (key.startsWith('.')) {
					const importKey = key === '.' ? name : `${name}${key.substring(1)}`;
					const resolved = typeof value === 'string' ? value : value.import ?? value.default;

					if (typeof resolved === 'string' && resolved.startsWith('./')) {
						if (importKey.includes('*') && resolved.includes('*')) {
							const [prefix, suffix] = importKey.split('*');

							if (resolved.endsWith('*' + suffix)) {
								this.set(prefix, resolved.substring(1).replace('*' + suffix, ''));
							}
						} else {
							this.set(importKey, resolved.substring(1));
						}
					}
				}
			});

			return true;
		} else if (typeof module === 'string') {
			this.set(name, module);
			return true;
		} else {
			this.set(name, '/');
			return true;
		}
	}

	async getScript({ algo = DEFAULT_ALGO, alphabet = BASE64, signal } = {}) {
		const integrity = await this.getIntegrity({ algo, alphabet, signal });

		return `<script type="importmap" integrity="${integrity}">${JSON.stringify(this)}</script>`;
	}

	async getIntegrity({ algo = DEFAULT_ALGO, alphabet = BASE64, signal } = {}) {
		if (signal instanceof AbortSignal && signal.aborted) {
			throw signal.reason;
		} else {
			const prefix = algo.toLowerCase().replace('-', '') + '-';
			const encoded = new TextEncoder().encode(this);
			const hash = await crypto.subtle.digest(algo, encoded);

			return prefix + new Uint8Array(hash).toBase64({ alphabet });
		}
	}

	static get SHA256() {
		return SHA256;
	}

	static get SHA384() {
		return SHA384;
	}

	static get SHA512() {
		return SHA512;
	}

	static async importFromFile(path = 'importmap.json', { signal } = {}) {
		const fullPath = join(process.cwd(), path);
		const importmap = await readFile(fullPath, { encoding: 'utf8', signal });

		return new Importmap(JSON.parse(importmap));
	}
}

export const importmap = new Importmap({ imports, scopes });
export { imports, scopes };
export default { imports, scopes };
