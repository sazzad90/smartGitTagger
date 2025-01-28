const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack'); 
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // path for the build
        filename: '[name].js',
    },
    mode: 'production',
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
                            ['@babel/preset-react', {"runtime": "automatic"}]
                        ],
                        plugins: [
                            '@babel/plugin-proposal-private-property-in-object', // Add the missing plugin
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
            Buffer: ['buffer', 'Buffer'] // Polyfill the Buffer global object
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'popup.html',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "public",
                },
            ],
        }),
        new MiniCssExtractPlugin(),
    ],
    
    resolve: {
        fallback: {
            "buffer": require.resolve("buffer/") // Resolves to the installed `buffer` module
        },
        extensions: ['.js', '.jsx'],  // Automatically resolve .js and .jsx
    },
};