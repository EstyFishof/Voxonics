const {defineConfig} = require('@vue/cli-service');
const { web } = require('webpack');
require('dotenv').config()
const { ModuleFederationPlugin } = require('webpack').container;


module.exports = defineConfig({
    // publicPath: process.env.CLIENT_URL,
    productionSourceMap: false,
    configureWebpack: {
        optimization: {
            runtimeChunk: 'single'
        },
        plugins: [
            new ModuleFederationPlugin({
                name: 'Voxonics',
                remotes: {
                    admin: `admin@${process.env.VUE_APP_REMOTE_ADMIN_URL}/remoteEntry.js`,
                }
            }),
        ],
    },
    devServer: {
        port: 8080,
        /*client: {
            /*webkitURL
            webkitURL: {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
            },
        }, */
        historyApiFallback: true
    },
    transpileDependencies: true,
})
