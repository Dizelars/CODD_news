const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
// const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;
// const autoprefixer = require('autoprefixer');
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
    mode,
    // target,
    devtool,
    devServer: {
        open: true,
    },
    entry: {
        index: './src/index.js',
        'index-style': './src/style/style.css',
        // amarok: './src/js/pages/oneScriptVectary.js',
        // 'amarok-style': './src/style/style.css',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'javascript/[name].[contenthash].js',
        assetModuleFilename: "images/[name][hash][ext][query]",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: 'index.html',
            chunks: ['index', 'index-style'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
        }),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, 'src/pages', 'amarok.html'),
        //     filename: 'amarok.html',
        //     chunks: ['amarok', 'amarok-style'],
        //     minify: {
        //         collapseWhitespace: true,
        //         removeComments: true,
        //         removeRedundantAttributes: true,
        //         removeScriptTypeAttributes: true,
        //         removeStyleLinkTypeAttributes: true,
        //         useShortDoctype: true,
        //     },
        // }),
        new MiniCssExtractPlugin({
            filename: 'style/[name].[contenthash].css',
            chunkFilename: 'style/[id].[contenthash].css',
            ignoreOrder: false,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    // {
                    //     loader: "postcss-loader",
                    //     options: {
                    //         postcssOptions: {
                    //             config: path.resolve(__dirname, "postcss.config.js")
                    //         },
                    //     }
                    // },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg)$/i,
                type: "asset/resource",
                generator: {
                    filename: 'images/[name][hash][ext][query]',
                },
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /\.otf?$/i,
                type: "asset/resource",
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin(), // Минификация JS
            // new CssMinimizerPlugin(), // Минификация CSS
        ],
        splitChunks: {
            cacheGroups: {
                default: false,
                styles: {
                    name: 'styles',
                    type: 'css/mini-extract',
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
};



