const items = document.getElementById("items");

// Fonction pour récupérer les produits depuis l'API
function fetchArticles() {
  const fetchResult = fetch("http://localhost:3000/api/products")
  .then(function (res) {

    if (res.ok) {
      return res.json();
    }
  })
  .then((data) => {
    return data
  })
  .catch(function (error) {
    alert('Error')
    console.log('error', error)
    // Une erreur est survenue
  });
  console.log(fetchResult);
  return fetchResult
}

// Création  du modèle produit
const createKanap = (kanap) => {
  const image = document.createElement("img");
  image.setAttribute("src", `${kanap.imageUrl}`);
  image.setAttribute("alt", `${kanap.altTxt}`);

  const title = document.createElement("h3");
  title.classList.add("productName");
  title.textContent = `${kanap.name}`;

  const description = document.createElement("p");
  description.classList.add("productDescription");
  description.textContent = `${kanap.description}`;

  const article = document.createElement("article");
  article.appendChild(image);
  article.appendChild(title);
  article.appendChild(description);

  const lien = document.createElement("a");
  lien.setAttribute("href", `./product.html?id=${kanap._id}`);
  lien.appendChild(article);

  return lien;
};


// Rendu de la page d'accueil

async function main() {

  const getDatas = await fetchArticles();
  for (article of getDatas) {
    items.appendChild(createKanap(article));
  }
}
  
main();
