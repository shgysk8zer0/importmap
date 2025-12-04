import { Importmap } from '@shgysk8zer0/importmap';
const importmap = await Importmap.importFromFile();
await importmap.importLocalPackage();
const integrity = await importmap.getIntegrity();

const icon =  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
	<rect x="0" y="0" width="100" height="100" rx="10" ry="10" fill="#${crypto.getRandomValues(new Uint8Array(3)).toHex()}"></rect>
</svg>`;

const script = String.dedent`
	import '@shgysk8zer0/polyfills';
	import { reset } from '@aegisjsproject/styles/reset.js';
	import { properties } from '@aegisjsproject/styles/properties.js';
	import { baseTheme, lightTheme, darkTheme } from '@aegisjsproject/styles/theme.js';
	import { btn, btnPrimary, btnSecondary, btnWarning, btnDanger } from '@aegisjsproject/styles/button.js';
	import { forms } from '@aegisjsproject/styles/forms.js';
	import { scrollbar } from '@aegisjsproject/styles/scrollbar.js';
	import { displays, positions, fonts, colors, utilities } from '@aegisjsproject/styles/misc.js';
	import { transform, transition, animate, keyframes } from '@aegisjsproject/styles/animations.js';
	import { html } from '@aegisjsproject/core/parsers/html.js';
	import { css } from '@aegisjsproject/core/parsers/css.js';
	import { onClick, observeEvents } from '@aegisjsproject/callback-registry/events.js';
	import { HTMLAegisMDElement } from '@aegisjsproject/aegis-md';
	import javascript from 'highlight.js/languages/javascript.min.js';

	console.log(import.meta.resolve('@shgysk8zer0/importmap/importmap'));

	const custom = css\`[popover] {
		border: none;

		&::backdrop {
			background-color: rgba(0, 0, 0, 0.7);
			backdrop-filter: blur(4px);
		}
	\`;

	document.adoptedStyleSheets = [
		properties, reset, baseTheme, lightTheme, darkTheme, btn, btnPrimary, btnSecondary,
		btnWarning, btnDanger, scrollbar, displays, positions, fonts, colors, utilities,
		transform, transition, animate, keyframes, custom,
	];

	trustedTypes.createPolicy('default', {
		createHTML(input, config) {
			// Part of the Sanitizer API
			const doc = Document.parseHTML(input, config);
			return doc.body.innerHTML;
		}
	});

	HTMLAegisMDElement.registerLanguages({ javascript });

	document.getElementById('main').prepend(html\`
		<button
			type="button"
			class="btn btn-primary animation-fly-in animation-ease-out animation-speed-normal"
			\${onClick}="\${({ currentTarget }) => alert(currentTarget.dataset.message)}"
			data-message="You did the thing!"
		>Click Me!</button>
	\`);

	observeEvents();
`;

const iconIntegrity = 'sha384-' + await Promise.resolve(new TextEncoder().encode(icon))
	.then(encoded => crypto.subtle.digest('SHA-384', encoded))
	.then(hash => new Uint8Array(hash).toBase64());

const scriptIntegrity = 'sha384-' + await Promise.resolve(new TextEncoder().encode(script))
	.then(encoded => crypto.subtle.digest('SHA-384', encoded))
	.then(hash => new Uint8Array(hash).toBase64());

const doc = String.dedent`
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width" />
			<meta name="color-scheme" content="light dark" />
			<title>@shgysk8zer0/importmap test</title>
			<link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" referrerpolicy="no-referrer" integrity="${iconIntegrity}" />
			${await importmap.getScript()}
			<script integrity="${scriptIntegrity}" type="module">${script}</script>
		</head>
		<body>
			<header id="header"></header>
			<nav id="nav">
				<button type="button" class="btn btn-secondary animation-fly-in animation-ease-in animation-speed-fast" popovertarget="md-test">Show Markdown</button>
			</nav>
			<main id="main"></main>
			<aside id="sidebar"></aside>
			<footer id="footer"></footer>
			<aegis-md id="md-test" popover="auto">
				<div slot="markdown">
					## Hello, World!

					\`\`\`js
					alert(1);
					\`\`\`
				</div>
			</aegis-md>
		</body>
	</html>
`;

const headers = new Headers({
	'Content-Type': 'text/html',
	'Referrer-Policy': 'no-referrer',
	'Content-Security-Policy': `default-src 'self';
		script-src 'self' ${Object.values(importmap.imports).join(' ')} '${integrity}' '${scriptIntegrity}';
		style-src 'self' https://unpkg.com/ blob:;
		img-src 'self' blob: '${iconIntegrity}';
		trusted-types default aegis-sanitizer#html;
		require-trusted-types-for 'script';`.replaceAll(/\n\t/g, ''),
});

export default {
	port: 8013,
	pathname: '/test/',
	open: true,
	routes: {
		'/favicon.svg': req => req.destination === 'image'
			? new Response(icon, { headers: { 'Content-Type': 'image/svg+xml' }})
			: Response.error(),
		'/test/': async req => {
			return req.destination === 'document'
				? new Response(doc, { headers })
				: Response.error();
		}
	}
};
