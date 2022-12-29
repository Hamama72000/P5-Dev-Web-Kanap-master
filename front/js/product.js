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
  
  if (storage == null) {
    return[]
  } else {
    return JSON.parse(storage)
  }
}

function ajoutProduit(produit){
  let storage = getStorage();
  let product = storage.find(p => p.id == produit.id) 
    if (product!= undefined){
    product.quantity += produit.quantity
    } else {
    storage.push(produit);
    } 
    saveStorage(storage)
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
    console.log(color);
    const articleStorage = {
      id : articleID + "." + color, 
      color: color,
      quantity: parseInt(quantity),
      image: article.imageUrl,
      alt: article.altTxt
    }

    ajoutProduit(articleStorage)
  });

}



main()