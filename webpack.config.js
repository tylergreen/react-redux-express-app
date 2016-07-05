var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/server/public/');
var APP_DIR = path.resolve(__dirname, 'src/client');

//var BUILD_DIR = __dirname //path.resolve(__dirname, '.');
//var APP_DIR = __dirname  //path.resolve(__dirname, '.');

module.exports = {
   entry: APP_DIR + '/app.jsx', // this is the main JS file to load
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?$/,
                loader : 'babel-loader',
                include : APP_DIR,
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
};


