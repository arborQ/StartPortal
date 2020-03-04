module.exports = {
  'transpileDependencies': [
    'vuetify'
  ],
  devServer: {
    proxy: 'http://backoffice_api:4000'
  }
}
