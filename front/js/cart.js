// Faire appel au localStorage,  on récupère le contenu du local  sous forme de tableau
async function getStorage() {
  const products = JSON.parse(localStorage.getItem("storage"))

  const productsFromServer =  await Promise.all(products.map(p => getArticle(p.id)))

  return products.map((p, index) => {
    p.price = productsFromServer[index].price //on passe par le serveur et non le local storage pour le prix

    return p
  })
}

// Création du DOM
const createCartItems = (storage) => {
  const sectionItems = document.getElementById("cart__items");
  let items = ""

  storage.map((s, index) => {
    items += `
<article class="cart__item" data-id="${s.id}" data-color="${s.color}">
      <div class="cart__item__img">
        <img src="${s.image}" alt="${s.alt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${s.name}</h2>
          <p>${s.color}</p>
          <p>${s.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté :     </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${s.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem" onclick="removeProduct(${index})">Supprimer</p>
          </div>
        </div>
      </div>
    </article>
    `
  })

  sectionItems.innerHTML = items
};

/* Fonction pour supprimer les produits */
function removeProduct (index) {
  const products = JSON.parse(localStorage.getItem("storage"))
  
  products.splice(index, 1)
  localStorage.setItem("storage", JSON.stringify(products))
  location.reload()
}

/* Fonction pour calculer le total */
async function updateTotal () {
  const storage = await getStorage()
  let totalPrice = 0
  let totalQuantity = 0

  storage.map(async (s) => {

    totalPrice += s.price * s.quantity
    totalQuantity += s.quantity
  })

  document.getElementById('totalPrice').innerText = totalPrice
  document.getElementById('totalQuantity').innerText = totalQuantity
}

/*Création du formulaire */
async function orderProducts () {
  const url = "http://localhost:3000/api/products/order"
  const storage = await getStorage()
  const firstName = document.getElementById('firstName').value
  const lastName = document.getElementById('lastName').value
  const address = document.getElementById('address').value
  const city = document.getElementById('city').value
  const email = document.getElementById('email').value
  const products = storage.map(s => s.id)

  if (
    (firstName.match(/[0-9]+/) || firstName.match(/[0-9]+/)) ||
    (lastName.match(/[0-9]+/) || lastName.match(/[0-9]+/)) ||
    !address.match(/^[a-zA-Z0-9\s\,\''\-]*$/) ||
    !city.match(/^^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/) ||
    !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  ) {
    return
  }
  
/* Envoyer les données au serveur via le formulaire */
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      contact:  {
        firstName,
        lastName,
        address,
        city,
        email
      },
      products
    }),
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => {
    if (res.ok) return res.json()
  }).then(async res => {
    await localStorage.setItem('storage', `[]`)

    window.location.replace(`confirmation.html?orderId=${res.orderId}`)
  })
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

/*Fonction qui gère vérification du formulaire et du panier */
async function main() {
  updateTotal()
  createCartItems(await getStorage());
  document.getElementById('order').onclick = (e) => {
    e.preventDefault()
    orderProducts()
  }
  
  /* Regex pour message d'erreurs sous les inputs */
  document.getElementById('firstName').onchange = (e) => {
    const value = e.target.value
    
    if (value.match(/[0-9]+/) || value.match(/[0-9]+/)) {
      document.getElementById('firstNameErrorMsg').innerHTML = "Veuillez entrer votre prénom"
    } else {
      document.getElementById('firstNameErrorMsg').innerHTML = ""
    }
  }

  document.getElementById('lastName').onchange = (e) => {
    const value = e.target.value
    
    if (value.match(/[0-9]+/) || value.match(/[0-9]+/)) {
      document.getElementById('lastNameErrorMsg').innerHTML = "Indiquez votre nom"
    } else {
      document.getElementById('lastNameErrorMsg').innerHTML = ""
    }
  }

  document.getElementById('address').onchange = (e) => {
    const value = e.target.value
    
    if (!value.match(/^[a-zA-Z0-9\s\,\''\-]*$/)) {
      document.getElementById('addressErrorMsg').innerHTML = "Merci de préciser votre adresse complète. Par-exemple: 26 rue de Berne"
    } else {
      document.getElementById('addressErrorMsg').innerHTML = ""
    }
  }

  document.getElementById('city').onchange = (e) => {
    const value = e.target.value
    
    if (!value.match(/^^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)) {
      document.getElementById('cityErrorMsg').innerHTML = "Renseignez votre ville. Par-exemple: Paris"
    } else {
      document.getElementById('cityErrorMsg').innerHTML = ""
    }
  }

  document.getElementById('email').onchange = (e) => {
    const value = e.target.value
    
    if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      document.getElementById('emailErrorMsg').innerHTML = "Merci d'indiquer une adresse e.mail valide, par-exemple: marie.dupont@gmail.com"
    } else {
      document.getElementById('emailErrorMsg').innerHTML = ""
    }
  }
}
 
main();
