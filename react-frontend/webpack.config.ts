import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import UglifyJsWebpackPlugin from "uglifyjs-webpack-plugin";

import * as path from "path";
import { Configuration } from "webpack";

const isProduction = process.env.NODE_ENV === "production" ? true : false;

export default {
    devServer: {
        historyApiFallback: true,
        proxy: {
            "/api": "http://localhost:8080",
            pathRewrite: { "^/api": "" }
        }
    },
    devtool: !isProduction ? "source-map" : false,
    mode: isProduction ? "production" : "development",
    entry: ["react-hot-loader/patch", path.join(__dirname, "src/index.tsx")],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].[hash].js"
    },
    optimization: {
        minimizer: [
            new UglifyJsWebpackPlugin({
                cache: true,
                parallel: true
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {
            "react-dom": "@hot-loader/react-dom"
        },
        extensions: [".js", ".ts", ".tsx"],
        plugins: [new TsconfigPathsWebpackPlugin()]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin({
            eslint: true,
            eslintOptions: {
                extensions: [".ts", ".tsx"],
                tsconfig: "./tsconfig.json"
            }
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
} as Configuration;
