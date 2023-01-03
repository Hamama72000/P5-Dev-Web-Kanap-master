
// Faire appel au localStorage,  on récupère le contenu du  sous forme de tableau
function getStorage(){
    return JSON.parse(localStorage.getItem("article"))
}

// Création du DOM
const createCartItems = (storage) => {
    const sectionItems = document.getElementById("cart__items");

    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.setAttribute("data-id", `${storage.id}`);
    article.setAttribute("data-color", `${storage.color}`);
        /* Article est le parent de DivImage et de divContent*/
        article.appendChild(divImage, divContent);
        

    const divImage = document.createElement("div");
    divImage.classList.add("cart__item__img");
    divImage.setAttribute("src",`${storage.imageURL}`); 
    divImage.setAttribute("alt",`${storage.altText}`); 


    const divContent = document.createElement("div");
    divContent.classList.add("cart__item__content");
    /* divContent est le parent de divContentDescription et divSettings*/ 
        divContent.appendChild(divContentDescription, divSettings)

        const divContentDescription = document.createElement("div");
        divContentDescription.classList.add("cart__item__content__description");
            /* divContentDescription parent de : title + color + price*/
            divContentDescription.appendChild(title, color, price)

            const title = document.createElement("h2");
            title.textContent = `${storage.name}`;

            const color = document.createElement("p");
            color.textContent = `${storage.color}`;

            const price = document.createElement("p");
            price.textContent = `${storage.price}`;

        const divSettings = document.createElement("div");
        divSettings.classList.add("cart__item__content__settings");
        /*divSettings parent de divSettingsQuantity et de divSettingsDelete*/
        divSettings.appendChild(divSettingsQuantity, divSettingsDelete)

            const divSettingsQuantity = document.createElement("div");
            divSettingsQuantity.classList.add("cart__item__content__settings__quantity");
                const quantity = document.createElement("p");
                quantity.textContent = `${storage.quantity}`;

                const input = document.createElement("input");
                input.classList.add("itemQuantity");
                // input.textContent = ? 

            const divSettingsDelete = document.createElement("div");
            divSettingsDelete.classList.add("cart__item__content__settings__delete");
                const delet = document.createElement("p");
                delet.classList.add("deleteItem");
                delet.textContent = `${storage.delet}`;

}

async function main() {
}
    
main();
