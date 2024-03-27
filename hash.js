export const SHA1 = 'SHA-1';
export const SHA256 = 'SHA-256';
export const SHA384 = 'SHA-384';
export const SHA512 = 'SHA-512';
export const DEFAULT_ALGO = SHA384;
export const SHA = SHA1;

export const BASE64 = 'base64';
export const SRI = 'sri';
export const HEX = 'hex';
export const BUFFER = 'buffer';

export async function hash(data, { algo = DEFAULT_ALGO, output = BUFFER } = {}) {
	const buffer = await new TextEncoder().encode(data);
	const hash = await crypto.subtle.digest(algo, buffer);

	switch (output) {
		case BUFFER:
			return hash;

		case HEX:
			return Array.from(
				new Uint8Array(hash),
				byte => byte.toString(16).padStart(2, '0')
			).join('');

		case BASE64:
			return btoa(hash);

		case SRI: {
			const codeUnits = new Uint16Array(hash);
			const charCodes = new Uint8Array(codeUnits.buffer);
			const result = btoa(String.fromCharCode(...charCodes));
			return `${algo.replace('-', '').toLowerCase()}-${result}`;
		}

		default:
			throw new TypeError(`Unsupported output type: "${output}".`);
	}
}

export const sri = async(data, { algo = SHA384 } = {}) => hash(data, { algo, output: SRI });
