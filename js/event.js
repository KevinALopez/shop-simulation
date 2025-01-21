const gridSection = document.querySelector("main section");
const shoppingCart = document.querySelector(".shopping-cart");
const shoppingCartList = document.querySelector(".shopping-cart ul");
const shoppingCartIcon = document.querySelector("#cart-icon");
const cartTotal = document.querySelector(".shopping-cart p span");
const emptyCartButton = document.querySelector(
    ".shopping-cart button:first-child"
);

let isCartOpen = false;

function getPlantById(id) {
    return plants.find((plant) => plant.id === id);
}

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
    if (isCartOpen) {
        closeCart();
        isCartOpen = false;
    } else {
        openCart();
        isCartOpen = true;
    }
}

function addQuantityOnPlant(event) {
    const plantId = parseInt(event.target.dataset.plantId);

    if (plantId === undefined) {
        return;
    }

    const indexOfPlant = cart.findIndex((item) => item.id === plantId);

    cart[indexOfPlant].quantity += 1;
}

function substractQuantityOnPlant(event) {
    const plantId = parseInt(event.target.dataset.plantId);

    if (plantId === undefined) {
        return;
    }

    const indexOfPlant = cart.findIndex((item) => item.id === plantId);

    if (cart[indexOfPlant].quantity === 1) {
        cart.splice(indexOfPlant, 1);
        return;
    }

    cart[indexOfPlant].quantity -= 1;
}

function removePlantFromCart(event) {
    const plantId = parseInt(event.target.dataset.plantId);

    if (plantId === undefined) {
        return;
    }

    cart = cart.filter((item) => item.id !== plantId);

    updateTotal();
}

function printCartItem(item, dom) {
    const li = document.createElement("li");

    li.innerHTML = `<span>${item.name} - &euro; ${item.price} x ${item.quantity}</span>`;

    const buttons = document.createElement("div");

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Eliminar";
    deleteButton.dataset.plantId = item.id;
    deleteButton.addEventListener("click", removePlantFromCart);

    const addButton = document.createElement("button");
    addButton.innerHTML = "+";
    addButton.dataset.plantId = item.id;
    addButton.addEventListener("click", addQuantityOnPlant);

    const substractButton = document.createElement("button");
    substractButton.innerHTML = "-";
    substractButton.dataset.plantId = item.id;
    substractButton.addEventListener("click", substractQuantityOnPlant);

    buttons.append(deleteButton, addButton, substractButton);

    li.appendChild(buttons);

    dom.appendChild(li);
}

function printAllCartItems(dom) {
    dom.innerHTML = "";
    cart.forEach((item) => printCartItem(item, dom));
}

function addPlantToCart(event) {
    const plantId = parseInt(event.target.dataset.plantId);
    const plant = getPlantById(plantId);

    if (plant === undefined) {
        return;
    }

    const indexOfPlant = cart.findIndex((item) => item.id === plant.id);

    if (indexOfPlant !== -1) {
        cart[indexOfPlant].quantity += 1;
        updateTotal();
        return;
    }

    cart.push({
        id: plant.id,
        name: plant.name,
        price: plant.price,
        quantity: 1,
    });

    updateTotal();
}

function updateTotal() {
    printAllCartItems(shoppingCartList);
    const total = cart.reduce(
        (sum, plant) => sum + plant.price * plant.quantity,
        0
    );

    cartTotal.innerHTML = total;
}

function emptyCart() {
    cart = [];
    cartTotal.innerHTML = 0;
}

function buyCart(event) {}

function printOnePlant(plant, dom) {
    const article = document.createElement("article");

    const button = document.createElement("button");
    button.dataset.plantId = plant.id;

    button.innerHTML = `<span> Agregar al carrito </span>`;
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

printAllPlants(plants, gridSection);

shoppingCartIcon.addEventListener("click", toggleCart);
emptyCartButton.addEventListener("click", emptyCart);
