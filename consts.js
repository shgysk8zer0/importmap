// export const IMPORTMAP_EXP = /<script\b(?=[^>]*\btype=["']importmap["'])(?:[^>]*?\bnonce=["'](?<nonce>[^"']*)["'])?[^>]*>[\s\S]*?<\/script>/i;
export const IMPORTMAP_EXP = /<script\b(?=[^>]*\btype=["']importmap["'])(?:[^>]*?\bnonce=["'](?<nonce>[^"']*)["'])?[^>]*>(?<content>[\s\S]*?)<\/script>/i;
