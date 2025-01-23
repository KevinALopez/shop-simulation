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
