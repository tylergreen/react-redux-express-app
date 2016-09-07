var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/server/public/');
var APP_DIR = path.resolve(__dirname, 'src/client');
var CSS_DIR = path.resolve(__dirname, 'src/client/css');
var NODE_MODULES_DIR = path.resolve(__dirname, './node_modules');

//var BUILD_DIR = __dirname //path.resolve(__dirname, '.');
//var APP_DIR = __dirname  //path.resolve(__dirname, '.');

module.exports = {
    entry: APP_DIR + '/app.jsx', // this is the main JS file to load
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
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
            },
            {
                test: /\.css$/,
                include: CSS_DIR,
                loaders: [
                    'style?sourceMap',
                   'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
                ]
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader?limit=8192"
            }
        ]
    }
};


