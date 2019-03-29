import TypescriptPlugin from 'rollup-plugin-typescript2';
import { resolve } from 'path';
import rollup from 'rollup';
import pkg from './package.json';

const banner =
`/**
  * vue-storage-decorator v${pkg.version}
  * @license ISC
  */`;

function local(file) { return resolve(__dirname, file); }
var copyDesc = {verbose: true};
copyDesc[local('./index.d.ts')] = local('dist/index.d.ts');
export default {
	input: local('src/index.ts'),
	output: {
		dir: local('dist'),
		file: 'vue-storage-decorator.js',
		format: 'umd',
		banner,
		name: 'VueStorageDecorator',
		exports: 'named',
		sourcemap: true
	},
	external: [
		'vue',
		'vue-class-component'
	],
	plugins: [
		TypescriptPlugin({
			tsconfig: local('src/tsconfig.json')
		})
	]
  }