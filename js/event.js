const gridSection = document.querySelector("main section");
const shoppingCart = document.querySelector(".shopping-cart");
const shoppingCartIcon = document.querySelector("#cart-icon");

let isCartOpen = false;

/**
 * CART FUNCTIONS
 */
function showCart() {
    if (isCartOpen) {
        shoppingCart.style.left = "-25rem";
        isCartOpen = false;
    } else {
        shoppingCart.style.left = "-0.5rem";
        isCartOpen = true;
    }
}

function addPlantToCart(event) {}

function removePlantFromCart(event) {}

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

shoppingCartIcon.addEventListener("click", showCart);
printAllPlants(plants, gridSection);
