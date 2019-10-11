import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

const variableName = pkg.name.replace('@', '').replace('-', '_').replace('/', '_');
const fileName = 'dist/' + variableName + '-' + pkg.version.split('.')[0]


export default {
  input: './src/index.ts',

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external: [],

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/**/*'] }),
  ],


  output: [{
    file: fileName + '.umd.js',
    format: 'cjs',
  }, {
    file: fileName + '.esm.js',
    format: 'es',
  }, {
    file: fileName + '.js',
    format: 'iife',
    name: variableName,

    // https://rollupjs.org/guide/en#output-globals-g-globals
    globals: {},
  }, {
    file: 'dist/index.js',
    format: 'iife',
    name: variableName,

    // https://rollupjs.org/guide/en#output-globals-g-globals
    globals: {},
  }],
};