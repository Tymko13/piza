const pizza_list = document.querySelector("#pizza-list");
const order_list = document.querySelector("#order-list");
const order_header = document.querySelector("#order-header");

const confirm_order = document.querySelector("#order-confirm-button");
confirm_order.addEventListener("click", function(){
    const order = createOrder();
    localStorage.setItem("order", JSON.stringify(order));
    window.location.href = "table.html";
});

function createOrder(){
    const res = [];
    res.push(["Піца", "К-ть", "Ціна"]);

    const pizzas = order_list.querySelectorAll(".order-item");
    for(const pizza of pizzas){
        const name = pizza.querySelector(".pizza-name").innerText;
        const num = pizza.querySelector(".order-item-num").innerText;
        const sum = pizza.querySelector(".order-item-price").innerText;
        res.push([name, num, sum]);
    }
    if(res.length < 3) res.push(["","",""]);
    return res;
}

loadOrderFromStorage();

pizza_list.addEventListener("click", e => {
    const target = e.target;
    if(target.classList.contains("buy-button")){
        const pizza_id = target.parentElement.parentElement.parentElement.getAttribute("pizza_id");
        const pizza_size = target.parentElement.classList[0];
        addToCart(pizza_id, pizza_size);
    }
    updateOrderPrice();
    updateStorage();
});

order_list.addEventListener("click", e => {
    const target = e.target;
    if(target.classList.contains("inc")){
        const pizza = target.parentElement.parentElement.parentElement;
        incNumberOf(pizza);
    } else if (target.classList.contains("dec")){
        const pizza = target.parentElement.parentElement.parentElement;
        decNumberOf(pizza);
    } else if (target.classList.contains("delete-order-item-button")){
        const pizza = target.parentElement.parentElement.parentElement;
        pizza.remove();
        document.querySelector("#order-num").innerText--;
    }
    
    updateOrderPrice();
    updateStorage();
});

order_header.addEventListener("click", e => {
    const target = e.target;
    if(target.id == "clear-order-button"){
        const pizzas = order_list.querySelectorAll(".order-item");
        for(const pizza of pizzas){
            pizza.remove();
        }
        updateOrderPrice();
        updateStorage();
    }
});

function loadOrderFromStorage(){
    for(let i = 0; i < localStorage.length; i++){
        const pizza = localStorage.key(i);
        const pizza_id = pizza.charAt(0);
        const pizza_size = pizza.slice(1, pizza.length);
        const num = localStorage.getItem(pizza);
        addToCart(pizza_id, pizza_size, num);
    }
    updateOrderPrice();
}

function updateStorage(){
    localStorage.clear();
    const pizzas = order_list.querySelectorAll(".order-item");
    for(const pizza of pizzas){
        const pizza_id = pizza.getAttribute("pizza_id");
        const pizza_size = pizza.getAttribute("pizza_size");
        const num = pizza.querySelector(".order-item-num").innerText;
        const name = pizza_id.concat(pizza_size);
        localStorage.setItem(name, num);
    }
}

function findDuplicate(target){
    const pizzas = order_list.querySelectorAll(".order-item");
    for(const pizza of pizzas){
        if(pizza.querySelector(".pizza-name").innerText == target.querySelector(".pizza-name").innerText){
            return pizza;
        }
    }
    return null;
}

function updateOrderPrice(){
    const order_price = document.querySelector("#order-sum");
    const pizzas = order_list.querySelectorAll(".order-item");

    let price = 0;
    for(const pizza of pizzas){
        const item_price = pizza.querySelector(".order-item-price");
        price += parseInt(item_price.innerText);
    }
    order_price.innerText = price + " грн";
}

function incNumberOf(pizza){
    const num = pizza.querySelector(".order-item-num");
    const price = pizza.querySelector(".order-item-price");
    const initPrice = price.innerText / num.innerText;
    num.innerText++;
    price.innerText = parseInt(price.innerText) + initPrice;
}

function decNumberOf(pizza){
    const num = pizza.querySelector(".order-item-num");
    const price = pizza.querySelector(".order-item-price");
    const initPrice = price.innerText / num.innerText;
    num.innerText--;
    if(num.innerText==0){
        pizza.remove();
        document.querySelector("#order-num").innerText--;
    } else price.innerText = parseInt(price.innerText) - initPrice;
}

function addToCart(pizza_id, pizza_size, num){
    if(num == null) num = 1;
    let pizza;
    for(const currentPizza of pizza_info){
        if(currentPizza.id == pizza_id){
            pizza = currentPizza;
            break;
        }
    }

    let sizeText;
    let size;
    let weight;
    let price;
    if(pizza_size === "pizza-big"){
        sizeText = "(Велика)";
        size = pizza.big_size.size;
        weight = pizza.big_size.weight;
        price = pizza.big_size.price;
    } else {
        sizeText = "(Мала)";
        size = pizza.small_size.size;
        weight = pizza.small_size.weight;
        price = pizza.small_size.price;
    }

    const order = document.createElement("section");
    order.setAttribute("pizza_id", pizza_id);
    order.setAttribute("pizza_size", pizza_size);
    order.classList.add("order-item");
    order.innerHTML =
    `<div class="order-item-info">
        <h4 class="pizza-name">${pizza.title} ${sizeText}</h4>
        <div class="pizza-size">
            <p class="diameter">&empty; ${size}</p>
            <p class="weight">&#9878; ${weight}</p>
        </div>
        <div class="act">
            <p class = "order-item-price">${price * num}</p>
            <button class="dec">&#8722;</button>
            <p class="order-item-num">${num}</p>
            <button class="inc">+</button>
            <button class="delete-order-item-button">&#10539;</button>
        </div>
    </div>
    <img class="order-pic" src=${pizza.icon} alt="Вид згори на половину запашної піци">`

    const duplicate = findDuplicate(order);
    if(duplicate) incNumberOf(duplicate);
    else{
        order_list.append(order);
        document.querySelector("#order-num").innerText++;
    } 
}