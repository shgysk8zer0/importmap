import { writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { versions } from './versions.js';

export const imports = {
	'@shgysk8zer0/kazoo/': `https://unpkg.com/@shgysk8zer0/kazoo@${versions['@shgysk8zer0/kazoo']}/`,
	'@shgysk8zer0/konami': `https://unpkg.com/@shgysk8zer0/konami@${versions['@shgysk8zer0/konami']}/konami.js`,
	'@shgysk8zer0/polyfills': `https://unpkg.com/@shgysk8zer0/polyfills@${versions['@shgysk8zer0/polyfills']}/all.min.js`,
	'@shgysk8zer0/polyfills/': `https://unpkg.com/@shgysk8zer0/polyfills@${versions['@shgysk8zer0/polyfills']}/`,
	'@shgysk8zer0/components/': `https://unpkg.com/@shgysk8zer0/components@${versions['@shgysk8zer0/components']}/`,
	'@kernvalley/components/': `https://unpkg.com/@shgysk8zer0/components@${versions['@shgysk8zer0/components']}/krv/`,
	'@shgysk8zer0/http-status': `https://unpkg.com/@shgysk8zer0/http-status@${versions['@shgysk8zer0/http-status']}/http-status.js`,
	'leaflet': `https://unpkg.com/leaflet@[${versions.leaflet}]/dist/leaflet-src.esm.js`,
	'firebase/': `https://www.gstatic.com/firebasejs${versions.firebase}/`,
	'url-pattern': `https://unpkg.com/urlpattern-polyfill@${versions['url-pattern']}/index.js`,
	'custom-elements': `https://unpkg.com/@webcomponents/custom-elements@${versions['@webcomponents/custom-elements']}/custom-elements.min.js`,
	'highlight.js': `https://unpkg.com/@highlightjs/cdn-assets@${versions['highlight.js']}/es/highlight.min.js`,
	'highlight.js/': `https://unpkg.com/@highlightjs/cdn-assets@${versions['lighlight.js']}/`,
};

export const scope = {};
export const importmap = { imports, scope };
export const ENCODING = 'utf8';
export const ALGO = 'sha384';

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
	encoding = ENCODING,
	spaces = 2,
} = {}) {
	const integrity = getImportmapIntegrity({ importmap, algo, encoding, spaces });
	const json = JSON.stringify(importmap, null, spaces);
	return `<script type="importmap" integrity="${integrity}">${json}</script>`;
}
