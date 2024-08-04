import '@shgysk8zer0/polyfills';
import * as STATUS from '@shgysk8zer0/consts/status.js';
import { HTTPError } from '@shgysk8zer0/http/error.js';
import 'urlpattern-polyfill';
import '@webcomponents/custom-elements';
import '@shgysk8zer0/components/leaflet/map.js';
import '@shgysk8zer0/components/mark-down.js';
import '@kernvalley/components/events.js';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/messaging';
import { status } from '@shgysk8zer0/http-status';
import { konami } from '@shgysk8zer0/konami';
import { ready } from '@shgysk8zer0/kazoo/dom.js';
import { createSheet } from '@shgysk8zer0/jswaggersheets';

console.log(STATUS, HTTPError);

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
import { AegisComponent, SYMBOLS, TRIGGERS } from '@aegisjsproject/component';
import { html, appendTo } from '@aegisjsproject/core';

class HTMLHelloWorldElement extends AegisComponent {
	async [SYMBOLS.render](type, { shadow }) {
		switch(type) {
			case TRIGGERS.constructed:
				appendTo(shadow, html`<h1>Hello, World!</h1>`);
				break;
		}
	}
}

HTMLHelloWorldElement.register('hello-world');
