const plants = [
    {
        id: 1,
        name: "Aloe Vera",
        img: "./assets/img/aloe_vera.jpg",
        description:
            "Planta suculenta conocida por sus propiedades curativas. Lorem. Lorem.",
        price: 150,
        stock: 0,
    },
    {
        id: 2,
        name: "Cactus San Pedro",
        img: "./assets/img/cactus_san_pedro.jpg",
        description:
            "Cactus de crecimiento rápido originario de los Andes. Lorem Lorem.",
        price: 300,
        stock: 15,
    },
    {
        id: 3,
        name: "Helecho Boston",
        img: "./assets/img/helecho_boston.jpg",
        description:
            "Planta colgante con hojas frondosas y verdes. Lorem Lorem Lorem",
        price: 200,
        stock: 25,
    },
    {
        id: 4,
        name: "Orquídea Phalaenopsis",
        img: "./assets/img/orquidea_phalaenopsis.jpg",
        description:
            "Flor elegante y duradera, ideal para interiores. Lorem Lorem Lorem",
        price: 500,
        stock: 10,
    },
    {
        id: 5,
        name: "Bonsái Ficus",
        img: "./assets/img/bonsai_ficus.jpg",
        description:
            "Árbol miniatura perfecto para decorar espacios pequeños. Lorem Lorem Lorem",
        price: 750,
        stock: 0,
    },
    {
        id: 6,
        name: "Suculenta Echeveria",
        img: "./assets/img/echeveria.jpg",
        description:
            "Planta resistente de hojas carnosas y colores variados. Lorem Lorem",
        price: 100,
        stock: 30,
    },
    {
        id: 7,
        name: "Palma Areca",
        img: "./assets/img/palma_areca.jpg",
        description:
            "Planta tropical que purifica el aire de forma natural. Lorem Lorem.",
        price: 400,
        stock: 12,
    },
    {
        id: 8,
        name: "Lavanda",
        img: "./assets/img/lavanda.jpg",
        description:
            "Hierba aromática conocida por su fragancia relajante. Lorem Lorem Lorem",
        price: 180,
        stock: 22,
    },
    {
        id: 9,
        name: "Menta",
        img: "./assets/img/menta.jpg",
        description:
            "Planta aromática perfecta para tés y cócteles. Lorem Lorem. Lorem",
        price: 80,
        stock: 0,
    },
    {
        id: 10,
        name: "Hierba de Limón",
        img: "./assets/img/hierba_limon.jpg",
        description:
            "Planta cítrica ideal para infusiones y cocina. Lorem Lorem Lorem Lorem.",
        price: 120,
        stock: 28,
    },
    {
        id: 11,
        name: "Calathea Orbifolia",
        img: "./assets/img/calathea_orbifolia.jpg",
        description:
            "Planta con hojas grandes y rayadas, de interior. Lorem Lorem.",
        price: 350,
        stock: 10,
    },
    {
        id: 12,
        name: "Monstera Deliciosa",
        img: "./assets/img/monstera_deliciosa.jpg",
        description:
            "Planta exótica con hojas perforadas y gran tamaño. Lorem Lorem",
        price: 600,
        stock: 7,
    },
    {
        id: 13,
        name: "Potus",
        img: "./assets/img/potus.jpg",
        description:
            "Planta trepadora de fácil cuidado y gran belleza. Lorem Lorem.",
        price: 130,
        stock: 25,
    },
    {
        id: 14,
        name: "Agave Azul",
        img: "./assets/img/agave_azul.jpg",
        description:
            "Planta suculenta conocida por ser base del tequila. Lorem Lorem",
        price: 200,
        stock: 18,
    },
    {
        id: 15,
        name: "Rosa Roja",
        img: "./assets/img/rosa_roja.jpg",
        description:
            "Flor clásica que simboliza el amor y la pasión. Lorem Lorem Lorem.",
        price: 50,
        stock: 40,
    },
    {
        id: 16,
        name: "Clavel",
        img: "./assets/img/clavel.jpg",
        description:
            "Flor resistente y colorida, popular en jardines. Lorem Lorem Lorem",
        price: 70,
        stock: 32,
    },
    {
        id: 17,
        name: "Hiedra Inglesa",
        img: "./assets/img/hiedra_inglesa.jpg",
        description:
            "Planta trepadora ideal para cubrir muros. Lorem Lorem. Lorem Lorem",
        price: 150,
        stock: 20,
    },
    {
        id: 18,
        name: "Crotón",
        img: "./assets/img/croton.jpg",
        description:
            "Planta de hojas multicolores y apariencia tropical. Lorem Lorem Lorem",
        price: 250,
        stock: 14,
    },
    {
        id: 19,
        name: "Geranio",
        img: "./assets/img/geranio.jpg",
        description:
            "Planta con flores vibrantes y fácil de cuidar. Lorem Lorem Lorem Lorem.",
        price: 100,
        stock: 27,
    },
    {
        id: 20,
        name: "Hierbabuena",
        img: "./assets/img/hierbabuena.jpg",
        description:
            "Planta aromática utilizada en recetas y bebidas. Lorem Lorem Lorem",
        price: 90,
        stock: 30,
    },
];

const pagesArr = [];
// Cantidad de elementos por pagina
const elementsPerPage = 6;

// Dividir la lista de plantas en páginas alamacenando las paginas en el array pagesArr
// Se utiliza la logica de que el indice de la planta debe ser multiplo de la cantidad de elementos por pagina
// Una vez alcanzado el indice correspondiente, se crea un objeto page y se agrega al array pagesArr
plants.forEach((plant, index) => {
    if (index % elementsPerPage === 0) {
        const page = {
            pageId: Math.floor(index / elementsPerPage) + 1,
            items: plants.slice(index, index + elementsPerPage),
            previousPage:
                Math.floor(index / elementsPerPage) === 0
                    ? null
                    : Math.floor(index / elementsPerPage),
            nextPage:
                index + elementsPerPage <= plants.length - 1
                    ? Math.floor(index / elementsPerPage) + 2
                    : null,
        };

        pagesArr.push(page);
    }
});

//Pagina actual que se usara para mostrar las plantas, se inicia en 1, que es la pagina incial
currentPageId = 1;

let cart = [];
