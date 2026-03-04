# @shgysk8zer0/importmap
Front-End dependencies based on [`<script type="importmap">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)

Intended for use with [`rollup`](https://rollupjs.org/) and [`@shgysk8zer0/rollup-import`](https://www.npmjs.com/package/@shgysk8zer0/rollup-import).

- - -
[![CodeQL](https://github.com/shgysk8zer0/importmap/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/shgysk8zer0/importmap/actions/workflows/codeql-analysis.yml)
![Node CI](https://github.com/shgysk8zer0/importmap/workflows/Node%20CI/badge.svg)
![Lint Code Base](https://github.com/shgysk8zer0/importmap/workflows/Lint%20Code%20Base/badge.svg)

[![GitHub license](https://img.shields.io/github/license/shgysk8zer0/importmap.svg)](https://github.com/shgysk8zer0/importmap/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/shgysk8zer0/importmap.svg)](https://github.com/shgysk8zer0/importmap/commits/master)
[![GitHub release](https://img.shields.io/github/release/shgysk8zer0/importmap?logo=github)](https://github.com/shgysk8zer0/importmap/releases)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/shgysk8zer0?logo=github)](https://github.com/sponsors/shgysk8zer0)

[![npm](https://img.shields.io/npm/v/@shgysk8zer0/importmap)](https://www.npmjs.com/package/@shgysk8zer0/importmap)
![node-current](https://img.shields.io/node/v/@shgysk8zer0/importmap)
![npm bundle size gzipped](https://img.shields.io/bundlephobia/minzip/@shgysk8zer0/importmap)
[![npm](https://img.shields.io/npm/dw/@shgysk8zer0/importmap?logo=npm)](https://www.npmjs.com/package/@shgysk8zer0/importmap)

[![GitHub followers](https://img.shields.io/github/followers/shgysk8zer0.svg?style=social)](https://github.com/shgysk8zer0)
![GitHub forks](https://img.shields.io/github/forks/shgysk8zer0/importmap.svg?style=social)
![GitHub stars](https://img.shields.io/github/stars/shgysk8zer0/importmap.svg?style=social)
[![Twitter Follow](https://img.shields.io/twitter/follow/shgysk8zer0.svg?style=social)](https://twitter.com/shgysk8zer0)

[![Donate using Liberapay](https://img.shields.io/liberapay/receives/shgysk8zer0.svg?logo=liberapay)](https://liberapay.com/shgysk8zer0/donate "Donate using Liberapay")
- - -

- [Code of Conduct](./.github/CODE_OF_CONDUCT.md)
- [Contributing](./.github/CONTRIBUTING.md)
<!-- - [Security Policy](./.github/SECURITY.md) -->

## Installation

```bash
npm i @shgysk8zer0/importmap
```

## Example

```js
// rollup.config.js
import { rollupImport } from '@shgysk8zer0/rollup-import';
import { imports } from '@shgysk8zer0/importmap';

export default {
	input: 'index.js',
	output: {
		file: 'index.min.js',
		format: 'iife',
		sourcemap: true,
	},
	plugins: [rollupImport({ imports })],
};
```

## For `<script type="importmap">`

The module exports `getImportMapScript()`, which can be used to generate the
required importmap `<script>`:

```js
import { getImportMapScript } from '@shgysk8zer0/importmap';

getImportMapScript();
```

Which results in:

```html
<script type="importmap" integrity="sha384-...">{"imports": {}, "scope": {}}</script>
```

## CLI


### `importmap-utils`

Create / update local importmap JSON or YAML files.

```
Usage: importmap-utils [options]

CLI utility for updating importmap files

Options:
  -V, --version              output the version number
  -i, --input [input]        local JSON or YAML importmap file
  -e, --encoding [encoding]  encoding (default: "utf8")
  -f, --format [format]      output format
  -o, --output <output>      output file
  -h, --help                 display help for command
```

### `importmap-html`

Updates the `<script type="importmap">` in an HTML file
```
Usage: importmap-html [options] <html-file>

CLI utility for updating `<script type="importmap">` in HTML files

Options:
  -V, --version                output the version number
  -a, --algo [algo]            Hashing algorigthm to use for `integrity` (default: "SHA-384")
  -s, --spaces [spaces]        Spaces to indent with
  -i, --importmap [importmap]  Source importmap.json file.
  -h, --help                   display help for command
```

### CLI Example

```bash
importmap-utils -o importmap.json

# Or...

importmap-utils -i importmap.json -o importmap.yml -f yaml

importmap-html index.html

importmap index.html -i imports.json -a sha-512
```
