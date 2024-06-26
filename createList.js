const pizza_window = document.querySelector("#pizza-list");
const filters = document.querySelectorAll("#filters>p");

for(const filter of filters){
    filter.addEventListener("click", e => {
        for(const filter of filters){
            filter.classList.remove("active");
        }
        filter.classList.add("active");
        updatePizzaList(filter.getAttribute("data-filter"));
    });
}

updatePizzaList();

function updatePizzaList(currentFilter){
    pizza_window.innerHTML = "";

    for(let pizza of pizza_info){
        switch(currentFilter){
        case "all":
            break;
        case "meat":
            if(pizza.type == "М’ясна піца") break;
            else continue;
        case "vega":
            if(pizza.type == "Вегетаріанська піца") break;
            else continue;
        case "fish":
            if(pizza.type == "Морська піца") break;
            else continue;
        case "mushroom":
            if(pizza.content.mushroom != null) break;
            else continue;
        case "pineapple":
            if(pizza.content.pineapple != null) break;
            else continue;
        }

        const section = document.createElement("section");
        section.classList.add("pizza-section");
        section.setAttribute("pizza_id", pizza.id);
    
        // Creates a description of pizzas ingredients
        let description = "";
        for(let property in pizza.content){
            for(let ingredient of pizza.content[property]){
                description = description.concat(ingredient).concat(", ");
            }
        }
        description = description.concat("!");
        description = description.replace(", !", "");
        
        let small_size;
        let small_weight;
        let small_price;
        let smallExistence;
        if(pizza.small_size != undefined){
            small_size = pizza.small_size.size;
            small_weight = pizza.small_size.weight;
            small_price = pizza.small_size.price;
        } else {
            smallExistence = "none";
        }
    
        let big_size;
        let big_weight;
        let big_price;
        let bigExistence;
        if(pizza.big_size != undefined){
            big_size = pizza.big_size.size;
            big_weight = pizza.big_size.weight;
            big_price = pizza.big_size.price;
        } else {
            bigExistence = "none";
        }
    
        let special = "none";
        let specialText;
        if(pizza.is_popular){
            special = "popular";
            specialText = "Популярна";
        }
        if(pizza.is_new){
            special = "new";
            specialText = "Нова";
        }
    
        section.innerHTML =
        `<img class="full-pizza" src=${pizza.icon} alt="Вид згори на запашну піцу">
        <h2 class="pizza-name">${pizza.title}</h2>
        <h3 class="pizza-properties">${pizza.type}</h3>
        <p class="pizza-ingredients">${description}</p>
        <div class="pricing">
            <div class="pizza-small  ${smallExistence}">
                <p class="diameter">&empty; ${small_size}</p>
                <p class="weight">&#9878; ${small_weight}</p>
                <p class="price">${small_price}</p>
                <button class="buy-button">Купити</button>
            </div>
            <div class="pizza-big ${bigExistence}">
                <p class="diameter">&empty; ${big_size}</p>
                <p class="weight">&#9878; ${big_weight}</p>
                <p class="price">${big_price}</p>
                <button class="buy-button">Купити</button>
            </div>
            
        </div>
        <div class="${special}">${specialText}</div>`
        pizza_window.append(section);

        const pizzas = document.querySelectorAll(".pizza-section");
        document.querySelector("#all-pizzas>div").innerText = pizzas.length;
    }
}
