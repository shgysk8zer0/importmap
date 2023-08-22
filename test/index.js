import '@shgysk8zer0/polyfills';
import 'urlpattern-polyfill';
import '@webcomponents/custom-elements';
import '@shgysk8zer0/components/leaflet/map.js';
import '@shgysk8zer0/components/mark-down.js';
import '@kernvalley/components/events.js';
import { initializeApp } from 'firebase/firebase-app.js';
import { status } from '@shgysk8zer0/http-status';
import { konami } from '@shgysk8zer0/konami';
import { ready } from '@shgysk8zer0/kazoo/dom.js';
import { createSheet } from '@shgysk8zer0/jswaggersheets';

Promise.all([
	customElements.whenDefined('krv-events'),
	customElements.whenDefined('leaflet-map'),
	customElements.whenDefined('mark-down'),
	createSheet(':root {color-scheme: light dark;}'),
	ready(),
]).then(([KRVEvents, LeafletMap, MarkDown, sheet]) => {
	document.adoptedStyleSheets = [sheet];
	initializeApp();

	console.log(status);

	document.body.append(
		new KRVEvents(),
		new LeafletMap(),
		new MarkDown(),
	);
});

konami().then(() => console.log('Cheat mode activated'));
