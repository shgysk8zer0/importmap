#!/usr/bin/env node

import { readJSONFile, writeJSONFile } from '@shgysk8zer0/npm-utils/json.js';
import { readYAMLFile, writeYAMLFile } from '@shgysk8zer0/npm-utils/yaml.js';
import { readFile } from 'node:fs/promises';
import { program } from 'commander';
import { extname } from 'node:path';
import { IMPORTMAP_EXP } from './consts.js';
import pkg from './package.json' with { type: 'json' };
import importmap from './importmap.json' with { type: 'json' };

function guessFileType(file) {
	const ext = extname(file).toLowerCase();

	switch(ext) {
		case '.yml':
		case '.yaml':
			return 'yaml';

		case '.json':
			return 'json';

		case '.html':
			return 'html';

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

		case 'html':
			return readFile(file, { encoding, signal }).then(html => {
				const match = IMPORTMAP_EXP.exec(html);
				return JSON.parse(match?.groups?.content ?? '{}');
			});

	}
}

async function init() {
	program
		.name(Object.keys(pkg.bin)[0])
		.version(pkg.version)
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
	const mod = typeof input === 'string'
		? await parse(input, { encoding }).then(({ imports, scopes = {}, ...rest }) => ({
			...rest,
			imports: { ...imports, ...importmap.imports },
			scopes: { ...scopes, ...importmap.scopes },
		}))
		: importmap;

	switch(format ?? guessFileType(output)) {
		case 'json':
			await writeJSONFile(output, mod, { encoding });
			break;

		case 'yaml':
			await writeYAMLFile(output, mod, { encoding });
			break;
	}
});
