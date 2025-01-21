const section = document.querySelector("main section");

function addPlantToCart(event) {}

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

printAllPlants(plants, section);
