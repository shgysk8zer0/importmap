import { node } from '@shgysk8zer0/eslint-config';
// import parser from '@babel/eslint-parser';

export default node({ ignores: ['*.cjs'] });
// export default [
// 	ignoreFile,
// 	{
// 		rules,
// 		// files: ['cli.mjs', 'index.mjs', '*.config.js', '*.test.js', 'unpkg.js', 'update.js', 'utils.js'],
// 		ignores: ['*.cjs'],
// 		languageOptions: {
// 			ecmaVersion: 'latest',
// 			sourceType: 'module',
// 			globals: globals.node,
// 		// 	parser,
// 		// 	parserOptions: {
// 		// 		requireConfigFile: false,
// 		// 		babelOptions: {
// 		// 		  plugins: ['@babel/plugin-syntax-import-assertions']
// 		// 		}
// 		//   },
// 		}
// 	}
// ];
