import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import '@shgysk8zer0/polyfills';
import { readYAMLFile, writeYAMLFile } from '@shgysk8zer0/npm-utils/yaml.js';
import { readJSONFile, writeJSONFile } from '@shgysk8zer0/npm-utils/json.js';
import { getFileURL } from '@shgysk8zer0/npm-utils/path.js';

const imports$1 = {
	"@node/": "/node_modules/",
	"@shgysk8zer0/kazoo/": "https://unpkg.com/@shgysk8zer0/kazoo@1.0.10/",
	"@shgysk8zer0/konami": "https://unpkg.com/@shgysk8zer0/konami@1.1.1/konami.js",
	"@shgysk8zer0/polyfills": "https://unpkg.com/@shgysk8zer0/polyfills@0.5.5/browser.min.js",
	"@shgysk8zer0/polyfills/": "https://unpkg.com/@shgysk8zer0/polyfills@0.5.5/",
	"@shgysk8zer0/jwk-utils": "https://unpkg.com/@shgysk8zer0/jwk-utils@1.0.20/jwk-utils.min.js",
	"@shgysk8zer0/jwk-utils/": "https://unpkg.com/@shgysk8zer0/jwk-utils@1.0.20/",
	"@shgysk8zer0/jswaggersheets": "https://unpkg.com/@shgysk8zer0/jswaggersheets@1.1.0/swagger.js",
	"@shgysk8zer0/jswaggersheets/": "https://unpkg.com/@shgysk8zer0/jswaggersheets@1.1.0/",
	"@shgysk8zer0/jss/": "https://unpkg.com/@shgysk8zer0/jss@1.0.1/",
	"@shgysk8zer0/consts/": "https://unpkg.com/@shgysk8zer0/consts@1.0.8/",
	"@shgysk8zer0/http/": "https://unpkg.com/@shgysk8zer0/http@1.0.5/",
	"@shgysk8zer0/http-status": "https://unpkg.com/@shgysk8zer0/http-status@1.1.2/http-status.js",
	"@shgysk8zer0/aes-gcm": "https://unpkg.com/@shgysk8zer0/aes-gcm@1.0.8/aes-gcm.min.js",
	"@shgysk8zer0/aes-gcm/": "https://unpkg.com/@shgysk8zer0/aes-gcm@1.0.8/",
	"@shgysk8zer0/squish": "https://unpkg.com/@shgysk8zer0/squish@1.0.2/squish.min.js",
	"@shgysk8zer0/squish/": "https://unpkg.com/@shgysk8zer0/squish@1.0.2/",
	"@shgysk8zer0/suid": "https://unpkg.com/@shgysk8zer0/suid@1.0.0/suid.min.js",
	"@shgysk8zer0/suid/": "https://unpkg.com/@shgysk8zer0/suid@1.0.0/",
	"@shgysk8zer0/geoutils": "https://unpkg.com/@shgysk8zer0/geoutils@1.0.6/geoutils.min.js",
	"@shgysk8zer0/geoutils/": "https://unpkg.com/@shgysk8zer0/geoutils@1.0.6/",
	"@aegisjsproject/trusted-types": "https://unpkg.com/@aegisjsproject/trusted-types@1.0.2/bundle.min.js",
	"@aegisjsproject/trusted-types/": "https://unpkg.com/@aegisjsproject/trusted-types@1.0.2/",
	"@aegisjsproject/parsers": "https://unpkg.com/@aegisjsproject/parsers@0.1.4/bundle.min.js",
	"@aegisjsproject/parsers/": "https://unpkg.com/@aegisjsproject/parsers@0.1.4/",
	"@aegisjsproject/sanitizer": "https://unpkg.com/@aegisjsproject/sanitizer@0.2.4/sanitizer.js",
	"@aegisjsproject/sanitizer/": "https://unpkg.com/@aegisjsproject/sanitizer@0.2.4/",
	"@aegisjsproject/core": "https://unpkg.com/@aegisjsproject/core@0.2.29/core.js",
	"@aegisjsproject/core/": "https://unpkg.com/@aegisjsproject/core@0.2.29/",
	"@aegisjsproject/styles": "https://unpkg.com/@aegisjsproject/styles@0.2.7/styles.js",
	"@aegisjsproject/styles/": "https://unpkg.com/@aegisjsproject/styles@0.2.7/",
	"@aegisjsproject/component": "https://unpkg.com/@aegisjsproject/component@0.1.7/component.js",
	"@aegisjsproject/component/": "https://unpkg.com/@aegisjsproject/component@0.1.7/",
	"@aegisjsproject/markdown": "https://unpkg.com/@aegisjsproject/markdown@0.1.6/markdown.min.js",
	"@aegisjsproject/markdown/": "https://unpkg.com/@aegisjsproject/markdown@0.1.6/",
	"@aegisjsproject/aegis-md": "https://unpkg.com/@aegisjsproject/aegis-md@0.0.4/aegis-md.js",
	"@aegisjsproject/aegis-md/": "https://unpkg.com/@aegisjsproject/aegis-md@0.0.4/",
	"@aegisjsproject/url": "https://unpkg.com/@aegisjsproject/url@1.0.3/url.mjs",
	"@aegisjsproject/url/": "https://unpkg.com/@aegisjsproject/url@1.0.3/",
	"@aegisjsproject/idb/": "https://unpkg.com/@aegisjsproject/idb@1.0.5/",
	"@aegisjsproject/idb": "https://unpkg.com/@aegisjsproject/idb@1.0.5/idb.min.js",
	"@aegisjsproject/otp/": "https://unpkg.com/@aegisjsproject/otp@1.0.1/",
	"@aegisjsproject/otp": "https://unpkg.com/@aegisjsproject/otp@1.0.1/otp.min.js",
	"@aegisjsproject/md-editor": "https://unpkg.com/@aegisjsproject/md-editor@1.0.0/md-editor.js",
	"@aegisjsproject/md-editor/": "https://unpkg.com/@aegisjsproject/md-editor@1.0.0/",
	"@aegisjsproject/barcodescanner": "https://unpkg.com/@aegisjsproject/barcodescanner@1.2.2/scanner.min.js",
	"@aegisjsproject/barcodescanner/": "https://unpkg.com/@aegisjsproject/barcodescanner@1.2.2/",
	"@shgysk8zer0/components/": "https://unpkg.com/@shgysk8zer0/components@0.3.20/",
	"@aegisjsproject/state": "https://unpkg.com/@aegisjsproject/state@1.0.7/state.mjs",
	"@aegisjsproject/state/": "https://unpkg.com/@aegisjsproject/state@1.0.7/",
	"@aegisjsproject/router": "https://unpkg.com/@aegisjsproject/router@1.1.12/router.mjs",
	"@aegisjsproject/router/": "https://unpkg.com/@aegisjsproject/router@1.1.12/",
	"@aegisjsproject/callback-registry": "https://unpkg.com/@aegisjsproject/callback-registry@1.0.3/callbackRegistry.js",
	"@aegisjsproject/callback-registry/": "https://unpkg.com/@aegisjsproject/callback-registry@1.0.3/",
	"@aegisjsproject/attempt": "https://unpkg.com/@aegisjsproject/attempt@1.0.5/attempt.js",
	"@aegisjsproject/attempt/": "https://unpkg.com/@aegisjsproject/attempt@1.0.5/",
	"@aegisjsproject/secret-store": "https://unpkg.com/@aegisjsproject/secret-store@1.0.1/commands.min.js",
	"@aegisjsproject/commands/": "https://unpkg.com/@aegisjsproject/commands@1.0.1/",
	"@aegisjsproject/commands": "https://unpkg.com/@aegisjsproject/commands@1.0.1/commands.min.js",
	"@aegisjsproject/firebase-account-routes": "https://unpkg.com/@aegisjsproject/firebase-account-routes@0.0.5/main.js",
	"@aegisjsproject/firebase-account-routes/": "https://unpkg.com/@aegisjsproject/firebase-account-routes@0.0.5/",
	"@aegisjsproject/secret-store/": "https://unpkg.com/@aegisjsproject/secret-store@1.0.1/",
	"@aegisjsproject/qr-encoder": "https://unpkg.com/@aegisjsproject/qr-encoder@1.0.1/index.min.js",
	"@aegisjsproject/qr-encoder/": "https://unpkg.com/@aegisjsproject/qr-encoder@1.0.1/",
	"@kernvalley/components/": "https://unpkg.com/@kernvalley/components@2.0.9/",
	"@webcomponents/custom-elements": "https://unpkg.com/@webcomponents/custom-elements@1.6.0/custom-elements.min.js",
	leaflet: "https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js",
	"leaflet/": "https://unpkg.com/leaflet@1.9.4/dist/",
	"urlpattern-polyfill": "https://unpkg.com/urlpattern-polyfill@10.1.0/index.js",
	"highlight.js": "https://unpkg.com/@highlightjs/cdn-assets@11.11.1/es/core.min.js",
	"highlight.js/": "https://unpkg.com/@highlightjs/cdn-assets@11.11.1/es/",
	"@highlightjs/cdn-assets": "https://unpkg.com/@highlightjs/cdn-assets@11.11.1/es/core.min.js",
	"@highlightjs/cdn-assets/": "https://unpkg.com/@highlightjs/cdn-assets@11.11.1/es/",
	marked: "https://unpkg.com/marked@17.0.1/lib/marked.esm.js",
	"marked-highlight": "https://unpkg.com/marked-highlight@2.2.3/src/index.js",
	yaml: "https://unpkg.com/yaml@2.8.2/browser/dist/index.js",
	"yaml/": "https://unpkg.com/yaml@2.8.2/browser/dist/",
	"firebase/": "https://www.gstatic.com/firebasejs/10.12.1/",
	"firebase/app": "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js",
	"firebase/app-check": "https://www.gstatic.com/firebasejs/10.12.1/firebase-app-check.js",
	"firebase/auth": "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js",
	"firebase/database": "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js",
	"firebase/firestore": "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js",
	"firebase/functions": "https://www.gstatic.com/firebasejs/10.12.1/firebase-functions.js",
	"firebase/messaging": "https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging.js",
	"firebase/performance": "https://www.gstatic.com/firebasejs/10.12.1/firebase-performance.js",
	"firebase/remote-config": "https://www.gstatic.com/firebasejs/10.12.1/firebase-remote-config.js",
	"firebase/storage": "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js",
	"firebase/analytics": "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js",
	qr: "https://unpkg.com/qr@0.5.3/index.js",
	"qr/": "https://unpkg.com/qr@0.5.3/"
};
const scopes$1 = {
};
var json = {
	imports: imports$1,
	scopes: scopes$1
};

const SHA256 = 'SHA-256';
const SHA384 = 'SHA-384';
const SHA512 = 'SHA-512';
const DEFAULT_ALGO = SHA384;

const BASE64 = 'base64';
const BASE64_URL = 'base64url';
const SRI = 'sri';
const HEX = 'hex';
const BUFFER = 'buffer';

async function hash(data, { algo = DEFAULT_ALGO, output = BUFFER } = {}) {
	const bytes = new TextEncoder().encode(data);
	const hash = await crypto.subtle.digest(algo, bytes);

	switch (output) {
		case BUFFER:
			return hash;

		case HEX:
			return new Uint8Array(hash).toHex();

		case BASE64:
			return new Uint8Array(hash).toBase64({ alphabet: BASE64 });

		case BASE64_URL:
			return new Uint8Array(hash).toBase64({ alphabet: BASE64_URL });

		case SRI: {
			return `${algo.replace('-', '').toLowerCase()}-${new Uint8Array(hash).toBase64({ alphabet: BASE64 })}`;
		}

		default:
			throw new TypeError(`Unsupported output type: "${output}".`);
	}
}

const sri = async(data, { algo = SHA384 } = {}) => hash(data, { algo, output: SRI });

const { imports, scopes } = json;

class Importmap {
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

const importmap = new Importmap({ imports, scopes });

const UNPKG = 'https://unpkg.com/';

const  cache = new Map();

function parseUnpkgURL(src) {
	const url = new URL(src, UNPKG);

	if (! url.hostname === UNPKG || url.pathname.length === 1 || url.pathname === '/[object%20Object]') {
		throw new Error(`${src} is not an unpkg URL.`);
	} else {
		const path = url.pathname.substr(1).split('/');

		if (path.length === 0) {
			throw new Error(`Invalid unpkg URL: ${src}`);
		} else if (path.length !== 1 && path[0].startsWith('@')) {
			const [pkg, version = null] = path[1].split('@');
			return { scope: path[0], pkg, version, module: path.splice(2).join('/') };
		} else {
			const [pkg, version = null] = path[0].split('@');
			return { scope: null, pkg, version,  module: path.splice(1).join('/') };
		}
	}
}

function getUnpkgURL({ scope, pkg, version, module = '' }) {
	if (typeof pkg !== 'string' || pkg.length === 0) {
		throw new TypeError('Package name must be a non-empty string.');
	} else if (typeof version !== 'string' || version.length === 0) {
		throw new TypeError('Version must be a non-empty string.');
	} else if (typeof scope === 'string' && scope.length !== 0) {
		return new URL(`/${scope}/${pkg}@${version}/${module}`, UNPKG).href;
	} else {
		return new URL(`/${pkg}@${version}/${module}`, UNPKG).href;
	}
}

async function getLatestVersion({ scope, pkg, signal } = {}) {
	const path = typeof scope === 'string' ? `/${scope}/${pkg}/` : `/${pkg}/`;

	if (cache.has(path)) {
		return await cache.get(path);
	} else {
		const url = new URL(path, 'https://unpkg.com/');
		url.searchParams.set('meta', '');

		const promise = fetch(url, { method: 'HEAD',  signal }).then(resp => {
			const { version } = parseUnpkgURL(resp.url);
			return version;
		});

		cache.set(path, promise);
		return promise;
	}
}

async function update(imports) {
	let updated = false;

	const entries = await Promise.all(Object.entries(imports)
		.filter(([,val]) => val.startsWith(UNPKG))
		.map(async ([key, val]) => {
			const { scope, pkg, version: oldVersion, module } = parseUnpkgURL(val);
			const version = await getLatestVersion({ scope, pkg });

			if (! updated && version > oldVersion) {
				updated = true;
			}

			return [key, getUnpkgURL({ scope, pkg, version, module })];
		})
	);

	return { imports: Object.fromEntries(entries), updated };
}

async function updateUnpkg(imports) {
	return update(imports);
}

async function updateYAML(file) {
	if (typeof file === 'string')  {
		return await updateJSON(getFileURL(file));
	} else if (file instanceof URL && file.protocol === 'file:') {
		const importmap = await readYAMLFile(file);
		const { updated, imports } = await update(importmap.imports);

		if (updated) {
			await writeYAMLFile(file, {  ...importmap, imports: { ...importmap.imports, ...imports }});
			return true;
		} else {
			return false;
		}
	} else {
		throw new TypeError('File must be a path or file: URL.');
	}

}

async function updateJSON(file) {
	if (typeof file === 'string')  {
		return await updateJSON(getFileURL(file));
	} else if (file instanceof URL && file.protocol === 'file:') {
		const importmap = await readJSONFile(file);
		const { updated, imports } = await update(importmap.imports);

		if (updated) {
			await writeJSONFile(file, {  ...importmap, imports: { ...importmap.imports, ...imports }});
			return true;
		} else {
			return false;
		}
	} else {
		throw new TypeError('File must be a path or file: URL.');
	}
}

var unpkg = /*#__PURE__*/Object.freeze({
  __proto__: null,
  update: update,
  updateJSON: updateJSON,
  updateUnpkg: updateUnpkg,
  updateYAML: updateYAML
});

const ENCODING = 'utf8';

function mergeWithImportmap({ imports = {}, scopes = {}}) {
	return {
		imports: { ...importmap.imports, ...imports },
		scopes: { ...importmap.scope, ...scopes },
	};
}

async function createImportmapJSON(path = 'importmap.json', {
	importmap = { imports, scopes },
	spaces = 2,
	signal,
} = {}) {
	await writeFile(path, JSON.stringify(importmap, null, spaces), { encoding: ENCODING, signal });
}

async function getImportmapIntegrity({
	importmap = { imports, scopes },
	algo = DEFAULT_ALGO,
} = {}) {
	return await sri(JSON.stringify(importmap), { algo });
}

async function getImportmapScript({
	importmap = { imports, scopes },
	algo = DEFAULT_ALGO,
} = {}) {
	const integrity = await getImportmapIntegrity({ importmap, algo });
	return `<script type="importmap" integrity="${integrity}">${JSON.stringify(importmap)}</script>`;
}

export { ENCODING, Importmap, createImportmapJSON, getImportmapIntegrity, getImportmapScript, importmap, imports, mergeWithImportmap, scopes, unpkg };
