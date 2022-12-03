const items = document.getElementById("items");

// Fonction pour récupérer les produits depuis l'API
function fetchArticles() {
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })

    .then(function (article) {
      const articles = URL.createObjectURL(article);
      console.log(article);
    })

.catch(function (error) {
      alert(error);
      // Une erreur est survenue
    });
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
  article.appendChild(h3);
  article.appendChild(p);

  const lien = document.createElement("a");
  lien.setAttribute("href", `./product.html?id=${kanap._id}`);
  lien.appendChild(article);

  return lien;
};

// Rendu de la page d'accueil

async function main() {

  const getDatas = await fetchArticles();
  for (article of getDatas) {
    createKanap(article);
    items.appendChild(createKanap(article));
  }
}
main();
