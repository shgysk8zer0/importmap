import { getImportmapIntegrity, getImportmapScript } from '@shgysk8zer0/importmap';

const integrity = await getImportmapIntegrity();
const importmap = await getImportmapScript();

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
	import { onClick, observeEvents } from '@aegisjsproject/callback-registry/events.js';

	document.adoptedStyleSheets = [
		properties, reset, baseTheme, lightTheme, darkTheme, btn, btnPrimary, btnSecondary,
		btnWarning, btnDanger, scrollbar, displays, positions, fonts, colors, utilities,
		transform, transition, animate, keyframes,
	];

	trustedTypes.createPolicy('default', {
		createHTML(input, config) {
			const doc = Document.parseHTML(input, config);
			return doc.body.innerHTML;
		}
	});

	document.getElementById('main').append(html\`
		<button
			type="button"
			class="btn btn-primary animation-fly-in animation-ease-out animation-speed-normal"
			\${onClick}="\${({ currentTarget }) => alert(currentTarget.dataset.message)}"
			data-message="You did the thing!"
		>Click Me!</button>
	\`);

	observeEvents();
`;

const scriptIntegrity = 'sha384-' + await Promise.resolve(new TextEncoder().encode(script))
	.then(encoded => crypto.subtle.digest('SHA-384', encoded))
	.then(hash => new Uint8Array(hash).toBase64());

export default {
	port: 8013,
	pathname: '/test/',
	open: true,
	routes: {
		'/test/': async req => {
			if (req.destination === 'document') {
				const doc = String.dedent`
					<!DOCTYPE html>
					<html>
						<head>
							<meta charset="utf-8" />
							<meta name="viewport" content="width=device-width" />
							<meta name="color-scheme" content="light dark" />
							<title>@shgysk8zer0/importmap test</title>
							${importmap}
							<script integrity="${scriptIntegrity}" type="module">${script}</script>
						</head>
						<body>
							<header id="header"></header>
							<nav id="nav"></nav>
							<main id="main"></main>
							<aside id="sidebar"></aside>
							<footer id="footer"></footer>
						</body>
					</html>
				`;

				const headers = new Headers({
					'Content-Type': 'text/html',
					'Referrer-Policy': 'no-referrer',
					'Content-Security-Policy': `default-src 'self';
						script-src 'self' '${integrity}' '${scriptIntegrity}' https://unpkg.com/;
						style-src 'self' https://unpkg.com/ blob:;
						img-src 'self' blob:;
						trusted-types default aegis-sanitizer#html;
						require-trusted-types-for 'script';`.replaceAll(/\n\t/g, ''),
				});

				return new Response(doc, { headers });
			}
		}
	}
};
