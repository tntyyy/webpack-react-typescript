import * as webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    return {
        mode: options.mode,
        entry: options.paths.entry,
        output: {
            filename: "[name].[contenthash].js",
            path: options.paths.build,
            clean: true,
            assetModuleFilename: "[hash][ext][query]",
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        devtool: options.isDev ? "inline-source-map" : undefined,
        devServer: options.isDev ? buildDevServer(options) : undefined,
    }
}
