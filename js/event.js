const gridSection = document.querySelector("main section");
const shoppingCart = document.querySelector(".shopping-cart");
const shoppingCartIcon = document.querySelector("#cart-icon");

let isCartOpen = false;

/**
 * PLANT CRUD
 */
function getPlantById(id) {
    return plants.find((plant) => plant.id === id);
}
/**
 * PLANT CRUD
 */

/**
 * CART FUNCTIONS
 */
function closeCart() {
    if (
        navigator.userAgent.includes("iPhone") ||
        navigator.userAgent.includes("Android")
    ) {
        shoppingCart.style.bottom = "-15rem";
    } else {
        shoppingCart.style.left = "-25rem";
    }
}

function openCart() {
    if (
        navigator.userAgent.includes("iPhone") ||
        navigator.userAgent.includes("Android")
    ) {
        shoppingCart.style.bottom = "0";
    } else {
        shoppingCart.style.left = "-0.5rem";
    }
}

function toggleCart() {
    console.log(navigator.userAgent);
    if (isCartOpen) {
        closeCart();
        isCartOpen = false;
    } else {
        openCart();
        isCartOpen = true;
    }
}

function addPlantToCart(event) {
    const plantId = Number(event.target.dataset.plantId);
    const plant = getPlantById(plantId);

    cart.push(plant);
    updateTotal();
}

function removePlantFromCart(event) {}

function updateTotal() {}

function emptyCart(event) {}

function buyCart(event) {}
/**
 * CART FUNCTIONS
 */

/**
 * PRINT FUNCTIONS
 */
function printOnePlant(plant, dom) {
    const article = document.createElement("article");

    const button = document.createElement("button");
    button.innerHTML = `<span> Agregar al carrito </span>`;
    button.dataset.plantId = plant.id;
    button.addEventListener("click", addPlantToCart);

    article.innerHTML = `<figure>
                            <img src="${plant.img}" alt="${plant.name} Imagen">
                            <figurecaption>${plant.name}</figurecaption>
                        </figure>
                        <div>
                            <p>${plant.description}</p>
                            <p>Precio: &euro;${plant.price}</p>
                        </div>`;

    article.appendChild(button);

    dom.appendChild(article);
}

function printAllPlants(plantsArr, dom) {
    plantsArr.forEach((plant) => {
        printOnePlant(plant, dom);
    });
}
/**
 * PRINT FUNCTIONS
 */

shoppingCartIcon.addEventListener("click", toggleCart);
printAllPlants(plants, gridSection);
