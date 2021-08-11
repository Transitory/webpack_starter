// Webpack uses this to work with directories
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {
    watch: true,

    // Path to your entry point. From this file Webpack will begin its work
    entry: './assets/main.js',

    // Path and filename of your result bundle.
    // Webpack will bundle all JavaScript into this file
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        filename: '[name].bundle.js',
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './assets/templates/index.html'), // template file
            filename: 'index.html', // output file
        }),
        new HtmlWebpackInlineSVGPlugin({
            runPreEmit: true,
        }),
        // Deletes everything in dist folder before rebuilding it
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, './assets/img'),
                to: path.resolve(__dirname, 'dist/img')
            },],
        }),
    ],

    // Modules/Loaders
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // Fonts & SVGs
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    // Finally, we inject CSS in HTML thanks to JS
                    'style-loader',
                    // This loader resolves url() and @imports inside CSS
                    'css-loader',
                    // Then we apply postCSS fixes like autoprefixer and minifying
                    'postcss-loader',
                    // First we transform SASS to standard CSS
                    'sass-loader'],
            },
        ]
    },

    // Default mode for Webpack is production.
    // Depending on mode Webpack will apply different things
    // on the final bundle. For now, we don't need production's JavaScript 
    // minifying and other things, so let's set mode to development
    mode: 'development'
};