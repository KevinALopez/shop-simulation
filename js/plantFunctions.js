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

function filterPlants(event) {
    pagesNav.style.display = "none";
    const filter = event.target.value.toLowerCase();

    if (filter === "") {
        pagesNav.style.display = "flex";
        printAllPlants(
            pagesArr.find((page) => page.pageId === currentPageId).items,
            gridSection
        );
        return;
    }

    const filteredPlants = plants.filter((plant) =>
        plant.name.toLowerCase().includes(filter)
    );

    printAllPlants(filteredPlants, gridSection);
}
