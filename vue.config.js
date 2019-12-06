module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'demo',
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  },
}
