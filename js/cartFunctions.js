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
        addQuantityOnPlant(event);
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
