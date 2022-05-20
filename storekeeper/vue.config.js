module.exports = {
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://localhost:5000/'
      },
      '/uploads/*': {
        target: 'http://localhost:5000/'
      }
    }
  }
}