export const UNPKG = 'https://unpkg.com/';

const  cache = new Map();

export function parseUnpkgURL(src) {
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

export function getUnpkgURL({ scope, pkg, version, module = '' }) {
	// console.log({ scope, pkg, version });
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

export async function getLatestVersion({ scope, pkg, signal } = {}) {
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
