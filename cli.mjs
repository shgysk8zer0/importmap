#!/usr/bin/env node
/* eslint-env node */

import { readJSONFile, writeJSONFile } from '@shgysk8zer0/npm-utils/json';
import { readYAMLFile, writeYAMLFile } from '@shgysk8zer0/npm-utils/yaml';
import { program } from 'commander';
import { extname } from 'node:path';
import { importmap } from './index.js';

function guessFileType(file) {
	const ext = extname(file).toLowerCase();

	switch(ext) {
		case '.yml':
		case '.yaml':
			return 'yaml';

		case '.json':
			return 'json';

		default:
			throw new TypeError(`"${ext}" is not a supported file extension for file ${file}.`);
	}
}

async function parse(file, { encoding, signal } = {}) {
	switch(guessFileType(file)) {
		case 'yaml':
			return readYAMLFile(file, { encoding, signal });

		case 'json':
			return readJSONFile(file, { encoding, signal });

	}
}

async function init() {
	const { version: VERSION } = await readJSONFile(new URL('./package.json', import.meta.url).pathname);

	program
		.name('importmap-utils')
		.version(VERSION)
		.description('CLI utility for updating importmap files')
		.option('-i, --input [input]', 'local JSON or YAML importmap file')
		.option('-e, --encoding [encoding]', 'encoding', 'utf8')
		.option('-f, --format [format]', 'output format') // Migrate opt
		.option('-o, --output <output>', 'output file')
		.parse(process.argv);

	return {
		args: program.args,
		opts: program.opts(),
	};
}

init().then(async ({ opts: { input, encoding, format, output }}) => {
	console.log({ input, encoding, format, output });
	const mod = typeof input === 'string'
		? await parse(input, { encoding }).then(({ imports, scope = {}, ...rest }) => ({
			...rest,
			imports: { ...imports, ...importmap.imports },
			scope: { ...scope, ...importmap.scope },
		}))
		: importmap;

	console.log(mod);

	switch(format ?? guessFileType(output)) {
		case 'json':
			await writeJSONFile(output, mod, { encoding });
			break;

		case 'yaml':
			await writeYAMLFile(output, mod, { encoding });
			break;
	}
});
