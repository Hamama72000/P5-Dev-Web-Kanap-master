function getArticleID() {
  return new URL(window.location.href).searchParams.get("id")
}

// Récupération de l'id au niveau de l'URL
async function getArticle(id) {
  return await fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then((article) => {
      return article
    })
    .catch(function (error) {
      alert('Error')
      console.log('error', error)
    }); 
}

function showArticle (article) {

  //  Pour cibler l'élément
  document.querySelector('#title').textContent = article.title
  document.querySelector('#price').textContent = article.price
  document.querySelector('#description').textContent = article.description

  // Pour afficher le titre
  title.innerText =  article.name;
 
  // Pour accéder aux valeurs dc des couleurs du produit (marche que sur les tableaux, pour parcourir les éléments)
  const colorInput = document.querySelector('#colors')
    
    for (let color of article.colors) {
     const option = document.createElement('option');
     option.value = color;
     option.innerText = color;
     colorInput.appendChild(option);
    }

  //Pour créer limage et l'afficher
    const img = document.createElement("img");
    img.src = article.imageUrl; 
    img.alt = article.altTxt;

    document.querySelector('.item__img').appendChild(img)
}

function changeEventHandler(e) {
  console.log("target", e.target.value)
}

// Pour enregistrer dans le localStorage
function saveStorage(storage) {
  localStorage.setItem("storage", JSON.stringify(storage))
}

// Pour récupérer le localStorage
function getStorage(){
  const storage = localStorage.getItem("storage")
  /* Si le localStorage est vide on retourne quand meme un tableau vide sinon... permet d'ajouter et d'afficher les ajouts*/
    if (storage == null) {
    return[]
  } else {
    return JSON.parse(storage)
  }
}

function ajoutProduit(produit){
  console.log('-->', produit)
  if (!produit.color) {
    alert("Veuillez sélectionner une couleur")
    return
  }
  if (produit.quantity < 1 || produit.quantity > 100){
    alert("Veuillez sélectionner une quantité entre 1 et 100")
    return
  }
  let storage = getStorage();
  /*let product permet de chercher par id si le produit est dans le local storage et de l'enregistrer */
  let product = storage.find(p => p.id == produit.id && p.color === produit.color) 

  if (product != undefined){             /*si le produit est different de indefini on ajoute la quantité*/
  product.quantity += produit.quantity 
  } else {                              /* sinon */
    storage.push(produit);                /* ajoute le produit si on trouve un element ajouter*/
  }
  alert('Votre produit a bien été ajouté à votre panier!')
  saveStorage(storage)   /* on sauvegarde*/
  window.location.reload();/* mettre à zéro */
}


async function main() {
  console.log('------> showArticle')
  // get articles id
  const articleID = getArticleID();
  // get articles
  const article = await getArticle(articleID)
  // show articles 
  showArticle(article)
  let color = null
  let quantity = null

  document.getElementById("colors")
  .addEventListener("change", function(e) {
    color = e.target.value;
  });

  document.getElementById("quantity")
  .addEventListener("change", function(e) {
    quantity= e.target.value;
  });


  const button = document.getElementById('addToCart') 
  button.addEventListener("click", function() {  

    const articleStorage = {
      id : articleID, 
      color: color,
      quantity: parseInt(quantity || 0), /* pour que la quantité soit traduite en number*/
      image: article.imageUrl,
      alt: article.altTxt,
      name: article.name
    }

    ajoutProduit(articleStorage)
  });

}




main()


