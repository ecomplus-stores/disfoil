// Add your custom JavaScript for storefront pages here.
storefront.on('widget:@ecomplus/widget-tag-manager', () =>{
    setTimeout(() => {
        const loginUser = window.ecomPassport.checkLogin()
        if (!loginUser) {
            console.log('entrei')
            document.getElementById('user-button').href = '/app/#/checkout'
            document.getElementById('user-button').classList.add('logoff').remove('login')

        } else {
            console.log('sai')
            document.getElementById('user-button').classList.add('login')
        }
    }, 800);
})
