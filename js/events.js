// CONSTANTS AND VARIABLES
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
const searchBarInput = document.querySelector(".search input");

let isCartOpen = false;

// Initialization
printPagesNav(pagesNav);

printAllPlants(
    pagesArr.find((page) => page.pageId === currentPageId).items,
    gridSection
);

shoppingCartIcon.addEventListener("click", toggleCart);
emptyCartButton.addEventListener("click", emptyCart);
buyCartButton.addEventListener("click", buyCart);
searchBarInput.addEventListener("input", filterPlants);
