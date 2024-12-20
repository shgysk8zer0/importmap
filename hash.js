import '@shgysk8zer0/polyfills';

export const SHA1 = 'SHA-1';
export const SHA256 = 'SHA-256';
export const SHA384 = 'SHA-384';
export const SHA512 = 'SHA-512';
export const DEFAULT_ALGO = SHA384;
export const SHA = SHA1;

export const BASE64 = 'base64';
export const BASE64_URL = 'base64url';
export const SRI = 'sri';
export const HEX = 'hex';
export const BUFFER = 'buffer';

export async function hash(data, { algo = DEFAULT_ALGO, output = BUFFER } = {}) {
	const bytes = new TextEncoder().encode(data);
	const hash = await crypto.subtle.digest(algo, bytes);

	switch (output) {
		case BUFFER:
			return hash;

		case HEX:
			return new Uint8Array(hash).toHex();

		case BASE64:
			return new Uint8Array(hash).toBase64({ alphabet: BASE64 });

		case BASE64_URL:
			return new Uint8Array(hash).toBase64({ alphabet: BASE64_URL });

		case SRI: {
			return `${algo.replace('-', '').toLowerCase()}-${new Uint8Array(hash).toBase64({ alphabet: BASE64 })}`;
		}

		default:
			throw new TypeError(`Unsupported output type: "${output}".`);
	}
}

export const sri = async(data, { algo = SHA384 } = {}) => hash(data, { algo, output: SRI });
