const path = require('path');
var PACKAGE = require('./package.json');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'ReasonScoreCore-' + PACKAGE.version.split('.')[0] + '.js',
        library: 'ReasonScoreCore',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8000
    },
};