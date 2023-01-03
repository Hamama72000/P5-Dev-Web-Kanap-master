// Faire appel au localStorage,  on récupère le contenu du  sous forme de tableau
function getStorage() {
  return JSON.parse(localStorage.getItem("storage"));
}

// Création du DOM
const createCartItems = (storage) => {
  const sectionItems = document.getElementById("cart__items");
  let items = ""

  storage.map(s => {
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
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${s.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>
    `
  })

  sectionItems.innerHTML = items
};

function updateTotal () {
  const storage = getStorage()
  let totalPrice = 0
  let totalQuantity = 0

  storage.map(s =>{
    totalPrice += s.price * s.quantity
    totalQuantity += s.quantity
  })

  document.getElementById('totalPrice').innerText = totalPrice
  document.getElementById('totalQuantity').innerText = totalQuantity
}

function orderProducts () {
  const url = "http://localhost:3000/api/products/order"
  const storage = getStorage()
  const firstName = document.getElementById('firstName').value
  const lastName = document.getElementById('lastName').value
  const address = document.getElementById('address').value
  const city = document.getElementById('city').value
  const email = document.getElementById('email').value
  const products = storage.map(s => s.id)
  
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

async function main() {
  updateTotal()
  createCartItems(getStorage());
  document.getElementById('order').onclick = (e) => {
    e.preventDefault()
    orderProducts()
  }
}

main();
