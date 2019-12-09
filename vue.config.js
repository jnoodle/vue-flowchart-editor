module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: process.env.BUILD === 'lib' ? './dist' : 'demo',
  configureWebpack: {
    output: {
      library: 'vue-flowchart-editor',
      libraryTarget: 'umd', // fix export components undefined problems
    },
  },
}
