import { test, describe } from 'node:test';
import assert from 'node:assert';
import { sri, SHA256, SHA384, SHA512 } from './hash.js';
import { Importmap } from './importmap.mjs';

describe('Test SRI hashing', () => {
	const data = 'Hello, World!';

	test('Check importmap.resolve()', async () => {
		const importmap = new Importmap();
		await importmap.importLocalPackage();
		importmap.baseUrl = 'https://localhost/';
		assert.strictEqual(importmap.resolve('@shgysk8zer0/importmap'), importmap.baseUrl + importmap.imports['@shgysk8zer0/importmap'].substring(1));
		assert.strictEqual(importmap.resolve('@aegisjsproject/core/parsers/html.js'), importmap.imports['@aegisjsproject/core/'] + 'parsers/html.js');
	});

	test('Check SHA-256 SRI', async () => {
		const integrity = await sri(data, { algo: SHA256 });

		assert.strictEqual(typeof integrity, 'string');
		assert.strictEqual(integrity, 'sha256-3/1gIbsr1bCvZ2KQgJ7DpTGR3YHH9wpLKGiKNiGCmG8=', 'Should match known SHA-256 hash.');
	});

	test('Check SHA-384 SRI', async () => {
		const integrity = await sri(data, { algo: SHA384 });

		assert.strictEqual(typeof integrity, 'string');
		assert.strictEqual(integrity, 'sha384-VIXMmzNltDBd+06DN+ClmKV0+CQr8XKJ4N1sIKPNRKCJ3harSrMI9j5EsRcOtfUV', 'Should match known SHA-284 hash.');
	});

	test('Check SHA-512 SRI', async () => {
		const integrity = await sri(data, { algo: SHA512 });

		assert.strictEqual(typeof integrity, 'string');
		assert.strictEqual(integrity, 'sha512-N015SpXNz9izWZMYX++bo2jxYNja9DLQi6nx7R5avmzGkpHg+i/gAGpSVw7xjBne9OYXwzzlLvCm5fvjGMsDhw==', 'Should match known SHA-512 hash.');
	});

	test('Check default SRI', async () => {
		const integrity = await sri(data);

		assert.strictEqual(typeof integrity, 'string');
		assert.strictEqual(integrity, 'sha384-VIXMmzNltDBd+06DN+ClmKV0+CQr8XKJ4N1sIKPNRKCJ3harSrMI9j5EsRcOtfUV', 'Should match known SHA-284 hash.');
	});

	test('Check unsupported algorithm', async () => {
		await assert.rejects(sri(data, { algo: 'unsupported' }), {
			name: 'NotSupportedError',
			message: 'Unrecognized algorithm name'
		}, 'Should throw NotSupportedError for unsupported algorithm.');
	});
});
