const {defineConfig} = require("@vue/cli-service");
// const path = require("path");
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        host: 'localhost',
        port: 8080,
        open: true,
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    lintOnSave: false,
});
