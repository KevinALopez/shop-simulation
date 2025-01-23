const gridSection = document.querySelector("main section");
const shoppingCart = document.querySelector(".shopping-cart");
const shoppingCartList = document.querySelector(".shopping-cart ul");
const shoppingCartIcon = document.querySelector("#cart-icon");
const cartTotal = document.querySelector(".shopping-cart p span");
const emptyCartButton = document.querySelector(
    ".shopping-cart div button:first-child"
);
const buyCartButton = document.querySelector(
    ".shopping-cart div button:last-child"
);
const pagesNav = document.querySelector(".paginas-nav");

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

function printAllCartItems(dom) {
    dom.innerHTML = "";
    cart.forEach((item) => printCartItem(item, dom));
}

function updateTotal() {
    printAllCartItems(shoppingCartList);
    const total = cart.reduce(
        (sum, plant) => sum + plant.price * plant.quantity,
        0
    );

    cartTotal.innerHTML = total;
}

function addQuantityOnPlant(event) {
    const plantId = parseInt(event.target.dataset.id);
    const indexOfPlantOnCart = cart.findIndex((item) => item.id === plantId);
    const indexOfPlantOnInventory = plants.findIndex(
        (item) => item.id === plantId
    );

    if (
        cart[indexOfPlantOnCart].quantity ===
        plants[indexOfPlantOnInventory].stock
    ) {
        alert(
            "Has alcanzado la cantidad maxima disponible para este producto."
        );
        return;
    }

    cart[indexOfPlantOnCart].quantity += 1;
    updateTotal();
}

function substractQuantityOnPlant(event) {
    const plantId = parseInt(event.currentTarget.dataset.id);

    const indexOfPlant = cart.findIndex((item) => item.id === plantId);

    if (cart[indexOfPlant].quantity === 1) {
        cart.splice(indexOfPlant, 1);
        updateTotal();
        return;
    }

    cart[indexOfPlant].quantity -= 1;
    updateTotal();
}

function removePlantFromCart(event) {
    const plantId = parseInt(event.currentTarget.dataset.id);

    cart = cart.filter((item) => item.id !== plantId);

    updateTotal();
}

function printCartItem(item, dom) {
    const li = document.createElement("li");

    li.innerHTML = `<span>${item.name} - &euro; ${item.price} x ${item.quantity}</span>`;

    const buttons = document.createElement("div");

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Eliminar";
    deleteButton.dataset.id = item.id;
    deleteButton.addEventListener("click", removePlantFromCart);

    const addButton = document.createElement("button");
    addButton.innerHTML = "+";
    addButton.dataset.id = item.id;
    addButton.addEventListener("click", addQuantityOnPlant);

    const substractButton = document.createElement("button");
    substractButton.innerHTML = "-";
    substractButton.dataset.id = item.id;
    substractButton.addEventListener("click", substractQuantityOnPlant);

    buttons.append(deleteButton, addButton, substractButton);

    li.appendChild(buttons);

    dom.appendChild(li);
}

function addPlantToCart(event) {
    const plantId = parseInt(event.currentTarget.dataset.id);
    const plant = getPlantById(plantId);

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

function emptyCart() {
    cart = [];

    shoppingCartList.innerHTML = "";
    cartTotal.innerHTML = 0;
}

function buyCart(event) {
    if (cart.length === 0) {
        alert("El carrito esta vaco");
        return;
    }

    alert("Gracias por su compra!");
}

function previousPage(event) {
    if (currentPageId === 1) return;

    currentPageId -= 1;

    printPagesNav(pagesNav);
    printAllPlants(
        pagesArr.find((page) => page.pageId === currentPageId).items,
        gridSection
    );
}

function nextPage(event) {
    if (currentPageId === pagesArr.length) return;

    currentPageId += 1;

    printPagesNav(pagesNav);
    printAllPlants(
        pagesArr.find((page) => page.pageId === currentPageId).items,
        gridSection
    );
}

function changePage(event) {
    currentPageId = parseInt(event.currentTarget.dataset.page);

    printPagesNav(pagesNav);
    printAllPlants(
        pagesArr.find((page) => page.pageId === currentPageId).items,
        gridSection
    );
}

function printPagesNav(dom) {
    dom.innerHTML = "";

    const previousPageButton = document.createElement("button");
    previousPageButton.innerHTML = `<i class="fa-solid fa-angles-left"></i>`;
    previousPageButton.addEventListener("click", previousPage);

    const nextPageButton = document.createElement("button");
    nextPageButton.innerHTML = `<i class="fa-solid fa-angles-right"></i>`;
    nextPageButton.addEventListener("click", nextPage);

    const ul = document.createElement("ul");

    pagesArr.forEach((page) => {
        const li = document.createElement("li");
        li.dataset.page = page.pageId;
        li.innerHTML = `<a href="#">${page.pageId}</a>`;
        li.addEventListener("click", changePage);

        if (page.pageId === currentPageId) {
            li.classList.add("active");
        } else {
            li.className = "";
        }

        ul.appendChild(li);
    });

    dom.append(previousPageButton, ul, nextPageButton);
}

function printOnePlant(plant, dom) {
    const article = document.createElement("article");

    const button = document.createElement("button");
    button.dataset.id = plant.id;

    button.innerHTML =
        plant.stock === 0
            ? `<span> Agotado </span>`
            : `<span> Agregar al carrito </span>`;

    button.disabled = plant.stock === 0;
    button.className = plant.stock === 0 ? "disabled" : "";
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
    dom.innerHTML = "";

    plantsArr.forEach((plant) => {
        printOnePlant(plant, dom);
    });
}

printPagesNav(pagesNav);

printAllPlants(
    pagesArr.find((page) => page.pageId === currentPageId).items,
    gridSection
);

shoppingCartIcon.addEventListener("click", toggleCart);
emptyCartButton.addEventListener("click", emptyCart);
buyCartButton.addEventListener("click", buyCart);
