const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    mode: 'development',
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,  // Fixed regex for .js and .jsx files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            ['@babel/preset-react', { "runtime": "automatic" }]
                        ],
                        plugins: [
                            '@babel/plugin-proposal-private-property-in-object',
                        ],
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.svg$/i,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ]
            }
        ]
    },
    plugins: [ 
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
          }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'popup.html',  // Adjust the filename if necessary
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "public",
                },
            ],
        }),
        new MiniCssExtractPlugin(),
        new NodePolyfillPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.mjs'],
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
        alias: {
            '@kurkle/color': path.resolve(__dirname, 'node_modules/@kurkle/color'),
        },
        fallback: {
            "fs": false,  // Disable fs module in the browser
            // "path": require.resolve("path-browserify"),
            // "stream": require.resolve("stream-browserify"),
            // "crypto": require.resolve("crypto-browserify"),
            // "canvas": require.resolve("canvas")
          }          
    },
};
