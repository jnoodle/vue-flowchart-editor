module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: process.env.BUILD === 'lib' ? './dist' : 'demo',
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  },
}
