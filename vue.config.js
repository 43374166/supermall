module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views',
      }
    }
  },
  // devServer: {
  //   host: 'localhost',
  //   public: '192.168.43.99:8080',//该网络地址为你联网的ip地址
  //   port: 8080,
  //   https: false,
  //   hotOnly: false,
  //   disableHostCheck: true,
  // },
}