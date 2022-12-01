const articles = document.getElementById('items');


// Fonction pour récupérer les produits depuis l'API
function getArticles() {
  fetch("http://localhost:3000/api/products")
    .then(res => res.json()) //recupération du résultat
    .then(articles=> articles) //recuperation de la vraie valeur du résultat(permettra dexploiter l'api)
    .catch(err => console.log(err)) 
}



// Création  du modèle produit
const createKanap = (kanap) => {
  const image =  document.createElement('img');
    image.setAttribute('src', `${kanap.imageUrl}`);
    image.setAttribute('alt', `${kanap.altTxt}`);

  const title = document.createElement('h3');
    title.classList.add('productName');
    title.textContent = `${kanap.name}`;

  const description = document.createElement('p');
    description.classList.add('productDescription');
    description.textContent = `${kanap.description}`;

  const article = document.createElement('article');
    article.appendChild(image);
    article.appendChild(h3);
    article.appendChild(p);
  
  const lien = document.createElement('a');
    lien.setAttribute('href', `./product.html?id=${kanap._id}`);
    lien.appendChild(article);
 
  return lien;
}

 // Rendu de la page d'accueil
const article = getArticles(articles) => {
 
  // Destination des éléments
  document.getElementsByClassName("item__img")[0].appendChild(img);
  document.getElementById("title").innerText = product.name;
  document.getElementById("price").innerText = product.price + " ";
  document.getElementById("description").innerText = product.description;

  // Boucle forEach pour ajouter toutes les couleurs en option du select en HTML
  product.colors.forEach(function (color) {
    const option = document.createElement("option");
    const select = document.getElementById("colors");

    // Récupération des données de l'API
    option.value = color;
    option.innerText = color;
  });
}
