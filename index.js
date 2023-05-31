import { writeFile } from 'node:fs/promises';
import { versions } from './versions.js';
import { createHash } from 'node:crypto';

export const ENCODING = 'utf8';
export const ALGO = 'sha384';

export const imports = {
	'@shgysk8zer0/kazoo/': `https://unpkg.com/@shgysk8zer0/kazoo@${versions['@shgysk8zer0/kazoo']}/`,
	'@shgysk8zer0/konami': `https://unpkg.com/@shgysk8zer0/konami@${versions['@shgysk8zer0/konami']}/konami.js`,
	'@shgysk8zer0/polyfills': `https://unpkg.com/@shgysk8zer0/polyfills@${versions['@shgysk8zer0/polyfills']}/all.min.js`,
	'@shgysk8zer0/polyfills/': `https://unpkg.com/@shgysk8zer0/polyfills@${versions['@shgysk8zer0/polyfills']}/`,
	'@shgysk8zer0/components/': `https://unpkg.com/@shgysk8zer0/components${versions['@shgysk8zer0/components']}/`,
	'@kernvalley/components/': `https://unpkg.com/@shgysk8zer0/components${versions['@shgysk8zer0/components']}/krv/`,
	'@shgysk8zer0/http-status': `https://unpkg.com/@shgysk8zer0/http-status@${versions['@shgysk8zer0/http-status']}/http-status.js`,
	'leaflet': `https://unpkg.com/leaflet@[${versions.leaflet}]/dist/leaflet-src.esm.js`,
	'firebase/': `https://www.gstatic.com/firebasejs${versions.firebase}/`,
	'url-pattern': `https://unpkg.com/urlpattern-polyfill@${versions['url-pattern']}/index.js`,
	'custom-elements': `https://unpkg.com/@webcomponents/custom-elements@${versions['@webcomponents/custom-elements']}/custom-elements.min.js`,
	'highlight.js': `https://unpkg.com/@highlightjs/cdn-assets@${versions['highlight.js']}/es/highlight.min.js`,
	'highlight.js/': `https://unpkg.com/@highlightjs/cdn-assets@${versions['lighlight.js']}/`,
};

export const scope = {};

export async function createImportmapJSON(path = 'importmap.json', { signal, spaces = 2 } = {}) {
	await writeFile(path, JSON.stringify({ imports, scope }, null, spaces), { encoding: ENCODING, signal });
}

export function getImportmapIntegrity({ algo = ALGO, spaces = 0 } = {}) {
	const hash = createHash(algo);
	hash.update(JSON.stringify({ imports, scope }, null, spaces), 'utf8');
	return `${algo}-${hash.digest('base64')}`;
}

export function getImportMapScript({ algo = ALGO, spaces = 0 } = {}) {
	const integrity = getImportmapIntegrity({ algo, spaces });
	const json = JSON.stringify({ imports, scope }, null, spaces);
	return `<script type="importmap" integrity="${integrity}">${json}</script>`;
}
