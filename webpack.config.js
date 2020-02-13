'use strict';

const path = require("path");
const fs = require("fs");

let webpack = require('webpack');

let APP = __dirname + '/';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
let styleExtractorProd = new ExtractTextPlugin({ filename:'styles.css', allChunks: true });
let hotSwap = new webpack.HotModuleReplacementPlugin();

const config = {
    devtool: "source-map",
    context: APP,
    entry: {
        app: ['./src/client/index.js',
            './src/scss/root.scss'
        ],
    },
    plugins: [
        hotSwap,
        styleExtractorProd
    ],
    output: {
        path: APP+'public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader:"babel-loader",
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0', 'react'],
                }
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /src\\scss\\root.scss/,
                loader:
                    styleExtractorProd.extract({
                        fallback:'style-loader',
                        use: ['css-loader?modules', 'sass-loader']
                    })
            }
        ]
    },
    node: {
        fs: "empty",
        child_process: 'empty',
        tls: "empty"
    }
};

module.exports = config;

