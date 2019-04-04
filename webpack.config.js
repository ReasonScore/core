const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'ReasonScoreCore-1.js',
        library: 'ReasonScoreCore',
        path: path.resolve(__dirname, 'dist')
    }
};