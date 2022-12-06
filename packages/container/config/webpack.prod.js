const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN; // should be  a string value of domain and needs to be set up at the time of CI/CD pipeline setup

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/container/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@h${domain}/marketing/remoteEntry.js` // assuming remotrEntry will be localted inside marketing folder
            },
            shared: packageJson.dependencies, // all the dev dependencies will be shared
        }),
    ]
}

module.exports = merge(commonConfig, prodConfig);