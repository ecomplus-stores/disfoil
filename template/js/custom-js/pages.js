// Add your custom JavaScript for storefront pages here.
storefront.on('widget:@ecomplus/widget-tag-manager', () =>{
    setTimeout(() => {
        if (window.storefront) {
            if (window.storefront && window.storefront.context && window.storefront.context.resource === 'products') {
                const productPayment = document.querySelector('.product__prices')
                console.log(productPayment)
                const modalCalc = document.getElementById('modal-calc')
                productPayment.insertAdjacentElement('afterend', modalCalc)
            }
            const loginUser = window.ecomPassport.checkLogin()
            const userButton = document.getElementById('user-button')
            if (!loginUser) {
                console.log('entrei')
                console.log(userButton)
                userButton.href = '/app/#/checkout'
                userButton.classList.add('logoff').remove('login')
    
            } else {
                console.log('sai')
                userButton.classList.add('login')
            }
        }
    }, 800);
})