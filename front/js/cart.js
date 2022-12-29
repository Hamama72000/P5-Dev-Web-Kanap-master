// Faire appel au localStorage,  on récupère le contenu du localStorage
function getStorage(){
    return JSON.parse(localStorage.getItem("article"))
}

// On récupère les infos depuis l'API



// Création du DOM
const createCartItems = (storage) => {
    const sectionItems = document.getElementById("cart__items");

    const article = document.createElement("article");
    article.classList.add("cart__item")
    article.setAttribute("data-id", `${storage.id}`);
    article.setAttribute("data-color", `${storage.color}`);

    const divImage = document.createElement("div");

}

async function main() {
}
    
main();
