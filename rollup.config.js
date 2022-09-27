import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const path = require('path');

const basePath = path.resolve(__dirname, '../../../');
const pkg = require(path.join(basePath, 'package.json'));

export default {
	input: 'src/index.ts',
	output: {
		dir: './dist',
		format: 'umd',
		name: 'phaser-spine',
		esModule: false,
		exports: 'named',
		sourcemap: true,
		globals: {
			'phaser-ce': 'Phaser',
		},
	},
	external: [
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {}),
	],
	treeshake: false,
	plugins: [
		typescript({
			rootDir: './src',
			tsconfig: 'tsconfig.json',
			declarationDir: './dist',
			declaration: true,
			declarationMap: false,
			sourceMap: false,
		}),
		terser({
			compress: { keep_classnames: true, keep_fnames: true },
		})
	],
}

