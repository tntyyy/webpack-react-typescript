import webpack from "webpack";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { BuildOptions } from "./types/config";
import { buildCssLoader } from "./loaders/buildCssLoader";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;

    const typescriptLoader: webpack.RuleSetRule = {
        test: /\.tsx?$/,
        use: [
            {
                loader: "ts-loader",
                options: {
                    getCustomTransformers: () => {
                        return {
                            before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
                        }
                    },
                    transpileOnly: isDev
                }
            }
        ],
        exclude: /node_modules/,
    };

    const babelLoader = {
        test: /\.(js|tsx|ts|jsx)$/,
        exclude: '/node_modules/',
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
            },
        },
    };

    const cssLoader = buildCssLoader(isDev);

    const svgLoader: webpack.RuleSetRule = {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
            filename: "./icons/[contenthash].[ext]"
        }
    };

    const imgLoader: webpack.RuleSetRule = {
        test: /\.(png|jpg|jpeg|webp)$/i,
        type: "asset/resource",
        generator: {
            filename: "./images/[contenthash].[ext]"
        }
    }

    return [babelLoader, typescriptLoader, cssLoader, svgLoader,  imgLoader]
}
