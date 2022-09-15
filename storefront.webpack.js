const path = require('path')
console.log(path.resolve(__dirname, 'template/js/custom-js/html/TheProduct.html'))
module.exports = () => ({
  resolve: {
    alias: {
      // './html/ShippingCalculator.html': path.resolve(__dirname, 'template/js/custom-js/html/ShippingCalculator.html'),
      // './js/ShippingCalculator.js': path.resolve(__dirname, 'template/js/custom-js/html/ShippingCalculator.js'),
      // './js/TheProduct.js': path.resolve(__dirname, 'template/js/custom-js/js/TheProduct.js'),
      // './js/EcCheckout.js': path.resolve(__dirname, 'template/js/custom-js/js/EcCheckout.js'),
      // './html/TheProduct.html': path.resolve(__dirname, 'template/js/custom-js/html/TheProduct.html')
    }
  }
})