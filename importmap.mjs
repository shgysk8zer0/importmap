import json from './importmap.json' with { type: 'json' };
import { SHA256, SHA384, SHA512, DEFAULT_ALGO, BASE64 } from './hash.js';

const { imports, scope } = json;

export class Importmap {
	#imports = {};
	#scope = {};

	constructor({ imports: i = imports, scope: s = scope } = {}) {
		this.#imports = i;
		this.#scope = s;
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
		return { imports: this.#imports, scope: this.#scope };
	}

	toString() {
		return JSON.stringify(this);
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
}

export const importmap = new Importmap({ imports, scope });

export { imports, scope };
export default importmap;
