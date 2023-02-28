// Add your custom JavaScript for storefront pages here.
storefront.on('widget:@ecomplus/widget-tag-manager', () =>{
    setTimeout(() => {
        if (window.storefront) {
            if (window.storefront && window.storefront.context && window.storefront.context.resource === 'products') {
                const productPayment = document.querySelector('.product__prices')
                const modalCalc = document.getElementById('modal-calc')
                productPayment.insertAdjacentElement('afterend', modalCalc)
            }
            const loginUser = window.ecomPassport.checkLogin()
            const userButton = document.getElementById('user-button')
            if (!loginUser) {
                userButton.href = '/app/#/checkout'
                userButton.classList.add('logoff')
                userButton.classList.remove('login')
    
            } else {
                userButton.classList.add('login')
            }
        }
    }, 800);
})

let larg, comp
$('#largura').change(function () {
    larg = $(this).val()
    if (larg && comp) {
        var totalDim = larg * comp
        $('#countMeters').text(totalDim)
    }
})
$('#comprimento').change(function () {
    comp = $(this).val()
    if (larg && comp) {
        var totalDim = larg * comp
        $('#countMeters').text(totalDim)
    }
})
comp = $('#comprimento').val()
larg = $('#largura').val()
if (larg && comp) {
    var totalDim = larg * comp
    $('#countMeters').text(totalDim)
}
setTimeout(function () {
    $('#checked').change(function () {
        var input1 = $('#defaultCheck1')
        var input2 = $('#defaultCheck2')
        var totalAcrescomp = $('#comprimento').val()
        larg = $('#largura').val()
        if (larg && comp) {
            var totalDim = larg * comp
        }
        if (input1[0].checked && input1[0].value) {
            totalAcres = Math.ceil(1.15 * totalDim)
            if (input2[0].checked && input2[0].value) {
                totalAcres = Math.ceil(1.25 * totalDim)
            }
        }
        if (input2[0].checked && input2[0].value) {
            totalAcres = Math.ceil(1.10 * totalDim)
            if (input1[0].checked && input1[0].value) {
                totalAcres = Math.ceil(1.25 * totalDim)
            }
        } if (!input1[0].checked && !input2[0].checked) {
            totalAcres = totalDim
        } $('#countMeters').text(totalAcres)
    })
}, 500)
$('#saveModal').click(function () {
    const nomeProduto = storefront.context.body.name.split(' ')
    var metragem = parseFloat(nomeProduto[nomeProduto.length - 1].replace('m2', '')) || 1
    var meters = parseInt($('#countMeters').text())
    console.log(metragem)
    console.log(meters)
    let quant = Math.ceil(meters / metragem)
    console.log(quant)
    console.log(typeof quant)
    $('.quantity-selector__input').val(Number(quant))
})
$('#clearModal').click(function () {
    document.getElementById('myForm0').reset()
    document.getElementById('myForm1').reset()
    document.getElementById('checked').reset()
    $('#countMeters').text('0')
})