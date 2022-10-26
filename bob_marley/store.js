// code that check document is loaded before accessing different parts
// if doc is still loading
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    // if doc read,y page loaded
    ready()
}

// set up event listeners for all of the things thats already in hTML store document
function ready() {
    // remove bottun
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    // loop throw btn object
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        // event listener for btn object, add function removeCartItem
        button.addEventListener('click', removeCartItem)
        console.log("remove btn remove item from parent row")
    }
    // quantity 
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        // add function quantityChanged
        input.addEventListener('change', quantityChanged)
    }
    // add to cart
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        // add function addToCartClicked
        button.addEventListener('click', addToCartClicked)
    }
    // purchase
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

// different events add to cart, remove, update quantity & total, purchase
// purchase order
function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

// remove cart item function
function removeCartItem(event) {
    // btn clicked
    var buttonClicked = event.target
    // event click: cart row btn inside div.div 
    buttonClicked.parentElement.parentElement.remove()
    // update total function
    updateCartTotal()
}

// quantity changed function
function quantityChanged(event) {
    var input = event.target
    // check is a number
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
    console.log("Change item quantity")
}

// add to cart function
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    // get title, price, imageSrc
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    // update total
    updateCartTotal()
    console.log("add to cart clicked")
}

// add new element to doc and connect listeners 
// add item cart function 
function addItemToCart(title, price, imageSrc) {
    console.log("add to cart")
    // create div
    var cartRow = document.createElement('div')
    // styling for cart row
    cartRow.classList.add('cart-row')
    // add to cartItems
    var cartItems = document.getElementsByClassName('cart-items')[0]
    // check if already in cart 
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    // cart row content, using function var: title, price, imageSrc
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    // added content
    cartItems.append(cartRow)
    // remove cart item btn & quantity update
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

// cart update total function
function updateCartTotal() {
    // get cart items row wrpping all rows
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    // get cart row
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    // loop over each cart row
    for (var i = 0; i < cartRows.length; i++) {
        // get current row
        var cartRow = cartRows[i]
        //get price & quantity row
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        // get price as #
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        // get quantity
        var quantity = quantityElement.value
        // calculate total
        total = total + (price * quantity)
    }
    // round number 2 decimal places
    total = Math.round(total * 100) / 100
    // output total
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
    console.log("update total")

}