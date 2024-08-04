const VERSION_PATTERN = /^[0-9]+\.[0-9]+\.[0-9]+$/;
const FIREBASE = /^https:\/www\.gstatic.com\/firebasejs\/\d+\.\d+\.\d+\//;

export async function getLatestVersion() {
	const { versions } = await fetch('https://registry.npmjs.org/firebase').then(resp => resp.json());

	return Object.keys(versions)
		.filter(v => VERSION_PATTERN.test(v))
		.sort((a, b) => parseFloat(a) > parseFloat(b)).at(-1);

}

export async function updateFirebase(importmap) {
	const version = await getLatestVersion();
	const { imports = {}, scope = {}, ...rest } = importmap;

	const firebase = Object.fromEntries(
		Object.entries(importmap.imports)
			.filter(([key]) => key.startsWith('firebase/'))
			.map(([key, value]) => [key, value.replace(FIREBASE, `https://www.gstatic.com/firebasejs/${version}/`)])
	);

	return { imports: { ...imports, ...firebase }, scope, ...rest };
}
