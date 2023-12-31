let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping_cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let calculation = () => {
    let cartItem = document.getElementById("cartAmount");
    cartItem.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
calculation();

let generateCartItem = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemData.find((y) => y.id === id) || [];
            let { img, name, price } = search;
            return `
            <div class="cart_item">
                <img width="100" src=${img} alt="">
                <div class="details">
                    <div class="title_price_x">
                        <h4 class="title_price">
                            <p>${name}</p>
                            <p class="cart_item_price">₹${price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>
                    <div class="buttons">
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        <div id=${id} class="quantity">${item === undefined ? 0 : item}</div>
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    </div>
                    <h3>₹${item * price}</h3>
            </div>
            </div>
            `
        }).join(""))
    } else {
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
         <button class="homeBtn">Back to Home</button>
        </a>
        `
    }
}
generateCartItem();
let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
    if (search === undefined) {
        basket.push({
            id: selectedItem,
            item: 1
        })
    } else {
        search.item += 1;
    }
    generateCartItem();
    update(selectedItem);
    localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
    if (search === undefined) return;
    else if (search.item === 0) {
        return;
    } else {
        search.item -= 1;
    }
    update(selectedItem);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket));
}
let update = (id) => {
    let search = basket.find((x) => x.id === id)
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item
    calculation()
    totalAmount()
}

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem)
    generateCartItem();
    totalAmount()
    calculation()
    localStorage.setItem("data", JSON.stringify(basket));
}
let clearCart = () => {
    basket = [];
    generateCartItem();
    calculation()
    localStorage.setItem("data", JSON.stringify(basket));
}
let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id } = x;
            let search = shopItemData.find((y) => y.id === id) || [];
            return item * search.price
        }).reduce((x, y) => x + y, 0)
        label.innerHTML = `
        <h2>Total Bill :- ₹${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `
    } else return;
}
totalAmount()