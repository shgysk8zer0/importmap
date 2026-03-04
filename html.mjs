#!/usr/bin/env node

import { program } from 'commander';
import { updateImportmap } from '@shgysk8zer0/importmap';
import { readFile } from 'node:fs/promises';
import pkg from './package.json' with { type: 'json' };

async function init() {
	program
		.name(Object.keys(pkg.bin)[1])
		.version(pkg.version)
		.argument('<html-file>')
		.description('CLI utility for updating `<script type="importmap">` in HTML files')
		.option('-a, --algo [algo]', 'Hashing algorigthm to use for `integrity`', 'SHA-384')
		.option('-s, --spaces [spaces]', 'Spaces to indent with', (spaces) => parseInt(spaces) || 0)
		.option('-i, --importmap [importmap]', 'Source importmap.json file.', file => readFile(file, { encoding: 'utf8' }).then(data => JSON.parse(data)))
		.parse(process.argv);

	return {
		args: program.args,
		opts: program.opts(),
	};
}

init().then(async ({
	args: [file],
	opts: { algo = 'SHA-384', importmap = Promise.resolve(), spaces } = {}
} = {}) => {
	await updateImportmap(file, { algo, spaces, importmap: await importmap });
});
