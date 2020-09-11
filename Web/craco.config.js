/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
*/
const CracoLessPlugin = require('craco-less');
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    webpack: {
        plugins: [
            new TerserPlugin({
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                    ecma: undefined,
                    warnings: false,
                    parse: {},
                    compress: {
                        drop_console: process.env.NODE_ENV === "production",
                        drop_debugger: false,
                        pure_funcs:
                            process.env.NODE_ENV === "production" ? ["console.log"] : "",
                    },
                },
            })
        ]
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ]
};