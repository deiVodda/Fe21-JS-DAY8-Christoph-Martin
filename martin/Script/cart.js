/**
 * JavaScricpt Shopping Cart
 */
var products = [{
    name: "Zarter Ton",
    image: "Images/1.jpg",
    price: 34.90,
    qtty: 1
}, {
    name: "Großes Herz",
    image: "Images/2.jpg",
    price: 34.90,
    qtty: 1
}, {
    name: "Zarte Blümchen",
    image: "Images/3.jpg",
    price: 35.90,
    qtty: 1
}];

for (let val of products) {
    document.getElementsByClassName("products")[0].innerHTML += `<div class="product col-12 col-md-6 col-lg-4 text-center fw-bold">
    <p class="product-title h3 m-3">${val.name}</p>
    <img class="product-image" src="${val.image}" width="200" height="200">
    <div class="product-details">
        <p class="product-price h4 m-3">${val.price} €</p>
        <button class="btn btn-primary product-button" type="button">ADD TO CART</button>
    </div>
    </div>
    `
}

var cart = [];

function addToCart(product, index) {
     if (cart.find((val) => val.name == product.name)) {
        product.qtty++;
    } else {
        cart.push(product);
    }
    console.table(cart);
    createRows();
    Total();
    amountOfItems();
}


let btns = document.getElementsByClassName("product-button");

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        addToCart(products[i], i);
    })
}

function createRows() {
    var result = "";

    for (let val of cart) {
        result += `
    <div class="cart-row row d-flex">
        <div class="cart-item col-6 my-3 ">
            <img class="cart-item-image" src="${val.image}" width="100" height="100">
            <span class="cart-item-title h5 ">${val.name}</span>
        </div>
        
        <span class="cart-price col-3 h4 my-3">${val.price} €</span>
       
        <div class="cart-qtty-action col-3 d-flex">            
            <i class="minus fa fa-minus-circle my-auto" ></i>            
            <div class="cart-quantity p-4 h4">${val.qtty}</div>            
            <i class="plus fa fa-plus-circle my-auto"></i>         
            <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> X </button>            
        </div>
    </div>
    `;
    }
    document.getElementById("cart-items").innerHTML = result;

    let plus = document.getElementsByClassName("plus");
    let minus = document.getElementsByClassName("minus");
    let del = document.getElementsByClassName("del");

    for (let i = 0; i < plus.length; i++) {
        plus[i].addEventListener("click", function() {
            plusQtty(i);
            Total();
            amountOfItems();
        });
        minus[i].addEventListener("click", function() {
            minusQtty(i);
            Total();
            amountOfItems();
        });
        del[i].addEventListener("click", function() {
            deleteItem(i);
            Total();
            amountOfItems();
        });
    }
}

let totalElement = document.getElementById("price");

function Total() {
    let discount;
    let total = 0;
    for (let val of cart) {
        total = total + (val.price * val.qtty);
    }
    if (total >= 100) {
        discount = (10 / 100) * total;
        let newPrice = total - discount;
        totalElement.innerHTML = `Your Price is over 100€ so you get ${discount.toFixed(2)}€ discount (10%), your new Price is ${newPrice.toFixed(2)}€ `; 
    } else {
        totalElement.innerHTML = total.toFixed(2) + " €";
    }
    
}

function plusQtty(i) {
    cart[i].qtty++;
    document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
}

function minusQtty(i) {
    if (cart[i].qtty == 1) {
        cart.splice(i, 1);
        createRows();
    } else {
        cart[i].qtty -= 1;
        document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
    }
}

function deleteItem(i) {
    cart[i].qtty = 1;
    cart.splice(i, 1);
    createRows();
}

function amountOfItems() {
    let amount = 0;
    for (let val of cart) {
        amount = amount + val.qtty;
    }
    document.getElementById("amount").innerHTML = amount;
}
