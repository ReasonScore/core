const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'reason-score-core.js',
    library: 'reason-score-core.js',
    path: path.resolve(__dirname, 'dist')
  }
};