// Création d'une constante pour récupérer les produits (articles) 
const articles = getArticles();

// Fonction pour récupérer les produits depuis l'API
function getArticles() {
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })

    .then(function (articles) {
      displayArticles(articles)

    // console.log(articles);
    })

    .catch(function (error) {
      alert(error);
      // Une erreur est survenue
    });
}


// Pour afficher les articles
function displayArticles(articles) {
  console.log(articles);
 
  for(let i=0; i < articles.length;i++) {   // Accolades pour faire plusieurs fonctions
    let affichage = ("détails de chaque canapé", articles[i].name, articles[i].price, articles[i].imageUrl );
  
      const item = document.getElementById("items");
        item.textContent =  articles[i].name;
    }
}


  
 