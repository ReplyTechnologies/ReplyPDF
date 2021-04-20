import { default as path } from 'path';

export default {
  mode: 'production',
  entry: './easy-docs.js',
  output: {
    //type: 'umd',
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'bundle.js',
  },
};