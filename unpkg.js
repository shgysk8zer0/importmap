import { readYAMLFile, writeYAMLFile } from '@shgysk8zer0/npm-utils/yaml.js';
import { readJSONFile, writeJSONFile } from '@shgysk8zer0/npm-utils/json.js';
import { getFileURL } from '@shgysk8zer0/npm-utils/path.js';
import { parseUnpkgURL, getUnpkgURL, getLatestVersion, UNPKG } from './utils.js';

export async function update(imports) {
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

export async function updateUnpkg(imports) {
	return update(imports);
}

export async function updateYAML(file) {
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

export async function updateJSON(file) {
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
