const path = require('path')
console.log(path.resolve(__dirname, 'template/js/custom-js/html/TheProduct.html'))
module.exports = () => ({
  resolve: {
    alias: {
      //'./html/APrices.html': path.resolve(__dirname, 'template/js/custom-js/html/APrices.html'),
    }
  }
})